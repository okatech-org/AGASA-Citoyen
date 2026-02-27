import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// ==========================================
// API GATEWAY — OUTBOUND (F5: Citoyen -> Core)
// ==========================================

async function logGateway(
    ctx: any,
    endpoint: string,
    statut: "succes" | "erreur",
    dureeMs: number,
    payload?: any,
    reponse?: any,
    erreur?: string
) {
    await ctx.db.insert("gatewayLogs", {
        flux: "F5_OUTBOUND",
        endpoint,
        statut,
        dureeMs,
        payload,
        reponse,
        erreur,
        date: Date.now(),
    });
}

// F5.1 - Envoyer un signalement (Simulation)
export const sendSignalement = mutation({
    args: { signalementId: v.id("signalements") },
    handler: async (ctx: any, args: any) => {
        const start = Date.now();
        try {
            const signalement = await ctx.db.get(args.signalementId);
            if (!signalement) throw new Error("Signalement non trouvé");

            // SIMULATION: Réseau simulé (sans delai — mutations Convex ne supportent pas setTimeout)

            const payload = {
                reference: signalement.reference,
                type: signalement.typeInfraction,
                gps: { lat: signalement.gpsLatitude, lng: signalement.gpsLongitude },
                etab_id: signalement.etablissementId ? String(signalement.etablissementId) : null,
            };

            const duree = Date.now() - start;
            await logGateway(ctx, "POST https://api.core.agasa.ga/v1/signalements", "succes", duree, payload, { ack: true, id_core: "SIG-CORE-123" });
            return { success: true };
        } catch (e: any) {
            const duree = Date.now() - start;
            await logGateway(ctx, "POST https://api.core.agasa.ga/v1/signalements", "erreur", duree, args, undefined, e.message);
            return { success: false, error: e.message };
        }
    },
});

// F5.2 - Envoyer des statistiques d'usage (Simulation)
export const sendStats = mutation({
    args: {},
    handler: async (ctx: any) => {
        const start = Date.now();
        try {
            // SIMULATION: Agregation de fausses données (ou compte réel)
            const signalementsCount = (await ctx.db.query("signalements").collect()).length;

            const payload = {
                period: "DAILY",
                date: new Date().toISOString().split("T")[0],
                metrics: {
                    scans: Math.floor(Math.random() * 500) + 100,
                    signalements: signalementsCount,
                    active_users: Math.floor(Math.random() * 2000) + 500
                }
            };

            // SIMULATION: Réseau simulé (sans delai — mutations Convex ne supportent pas setTimeout)

            const duree = Date.now() - start;
            await logGateway(ctx, "POST https://api.core.agasa.ga/v1/metrics/citoyen", "succes", duree, payload, { status: "ingested" });
            return { success: true, payload };
        } catch (e: any) {
            const duree = Date.now() - start;
            await logGateway(ctx, "POST https://api.core.agasa.ga/v1/metrics/citoyen", "erreur", duree, undefined, undefined, e.message);
            return { success: false, error: e.message };
        }
    },
});

// Requête pour voir les logs gateway (F5)
export const getOutboundLogs = query({
    args: {},
    handler: async (ctx: any) => {
        return await ctx.db.query("gatewayLogs")
            .withIndex("by_flux", (q: any) => q.eq("flux", "F5_OUTBOUND"))
            .order("desc")
            .take(50);
    }
});
