import { mutation, query } from "../_generated/server";
import { v } from "convex/values";

// ==========================================
// API GATEWAY — INBOUND (F6: Core -> Citoyen)
// ==========================================

// Helper pour logger
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
        flux: "F6_INBOUND",
        endpoint,
        statut,
        dureeMs,
        payload,
        reponse,
        erreur,
        date: Date.now(),
    });
}

// F6.1 - Synchronisation Établissements (Simulation)
export const syncEtablissements = mutation({
    args: { fullSync: v.optional(v.boolean()) },
    handler: async (ctx: any, args: any) => {
        const start = Date.now();
        try {
            // Simulation: on met à jour la date modifieLe du premier établissement
            const etab = await ctx.db.query("etablissements").first();
            let count = 0;
            if (etab) {
                await ctx.db.patch(etab._id, { modifieLe: Date.now() });
                count = 1;
            }

            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/sync/etablissements", "succes", duree, args, { upserted: count });
            return { success: true, count };
        } catch (e: any) {
            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/sync/etablissements", "erreur", duree, args, undefined, e.message);
            throw e;
        }
    },
});

// F6.2 - Réception Alerte Rappel Produit (Simulation)
export const receiveAlerte = mutation({
    args: { payload: v.any() },
    handler: async (ctx: any, args: any) => {
        const start = Date.now();
        try {
            // Simulation: on insère direct si on a un payload valide, sinon on crée un mock pour les tests
            const data = args.payload || {
                reference: `ALE-SIM-${Date.now()}`,
                titre: "Alerte de simulation API",
                produit: "Produit Test",
                motif: "Test API Gateway",
                categorieMotif: "autre",
                actionRecommandee: "Test",
                portee: "national",
                provinces: ["Estuaire"],
                urgence: "information",
                statut: "active",
                source: "agasa_core",
            };

            const newId = await ctx.db.insert("alertesRappels", {
                ...data,
                creeLe: Date.now(),
                modifieLe: Date.now(),
                dateEmission: Date.now(),
            });

            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/alertes/push", "succes", duree, args, { id: newId });
            return { success: true, id: newId };
        } catch (e: any) {
            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/alertes/push", "erreur", duree, args, undefined, e.message);
            throw e;
        }
    },
});

// F6.3 - Mise à jour Smiley (Simulation)
export const updateSmiley = mutation({
    args: { etablissementId: v.id("etablissements"), score: v.number() },
    handler: async (ctx: any, args: any) => {
        const start = Date.now();
        try {
            // Calcul couleurs emoji text etc.
            let couleur = "#059669"; let texte = "Très bon"; let emoji = "🤩";
            if (args.score === 4) { couleur = "#10b981"; texte = "Bon"; emoji = "🙂"; }
            if (args.score === 3) { couleur = "#FDD835"; texte = "Acceptable"; emoji = "😐"; }
            if (args.score === 2) { couleur = "#f59e0b"; texte = "Insuffisant"; emoji = "😟"; }
            if (args.score === 1) { couleur = "#f43f5e"; texte = "Mauvais"; emoji = "😡"; }
            if (args.score === 0) { couleur = "#212121"; texte = "Fermé"; emoji = "⛔"; }

            const etab = await ctx.db.get(args.etablissementId);
            if (etab) {
                const h = etab.historiqueSmileys || [];
                h.push({ date: Date.now(), score: etab.smiley });

                await ctx.db.patch(args.etablissementId, {
                    smiley: args.score,
                    smileyCouleur: couleur,
                    smileyTexte: texte,
                    smileyEmoji: emoji,
                    derniereInspection: Date.now(),
                    historiqueSmileys: h,
                    modifieLe: Date.now()
                });
            }

            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/etablissements/smiley", "succes", duree, args, { updated: !!etab });
            return { success: true };
        } catch (e: any) {
            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/etablissements/smiley", "erreur", duree, args, undefined, e.message);
            throw e;
        }
    },
});

// F6.4 - Statut Signalement (Simulation)
export const updateStatutSignalement = mutation({
    args: { reference: v.string(), statut: v.string() },
    handler: async (ctx: any, args: any) => {
        const start = Date.now();
        try {
            const signalement = await ctx.db.query("signalements")
                .withIndex("by_reference", (q: any) => q.eq("reference", args.reference))
                .first();

            if (signalement) {
                await ctx.db.patch(signalement._id, {
                    statut: args.statut as any,
                    dateModification: Date.now()
                });
                // En vrai: envoyer une notif push au citoyen
            }

            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/signalements/statut", "succes", duree, args, { updated: !!signalement });
            return { success: !!signalement };
        } catch (e: any) {
            const duree = Date.now() - start;
            await logGateway(ctx, "/api/v1/signalements/statut", "erreur", duree, args, undefined, e.message);
            throw e;
        }
    },
});

// Requête pour voir les logs gateway (F6)
export const getInboundLogs = query({
    args: {},
    handler: async (ctx: any) => {
        return await ctx.db.query("gatewayLogs")
            .withIndex("by_flux", (q: any) => q.eq("flux", "F6_INBOUND"))
            .order("desc")
            .take(50);
    }
});
