import { query } from "../_generated/server";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export const getPublicMetrics = query({
    args: {},
    handler: async (ctx) => {
        const now = Date.now();

        const [activeEtablissements, activeAlertes, recentSignalements, activeManuels] =
            await Promise.all([
                ctx.db
                    .query("etablissements")
                    .withIndex("by_actif", (q) => q.eq("actif", true))
                    .collect(),
                ctx.db
                    .query("alertesRappels")
                    .withIndex("by_statut", (q) => q.eq("statut", "active"))
                    .collect(),
                ctx.db
                    .query("signalements")
                    .withIndex("by_date", (q) => q.gte("dateSoumission", now - THIRTY_DAYS_MS))
                    .collect(),
                ctx.db
                    .query("manuelsEducatifs")
                    .filter((q) => q.eq(q.field("actif"), true))
                    .collect(),
            ]);

        const provincesCouvertes = new Set(activeEtablissements.map((item) => item.province));

        return {
            etablissementsActifs: activeEtablissements.length,
            alertesActives: activeAlertes.length,
            signalements30j: recentSignalements.length,
            manuelsActifs: activeManuels.length,
            provincesCouvertes: provincesCouvertes.size,
            updatedAt: now,
        };
    },
});

export const getDemoMetrics = query({
    args: {},
    handler: async (ctx) => {
        const now = Date.now();

        const [etablissementsDemo, signalementsDemo, alertesDemo, manuelsDemo] = await Promise.all([
            ctx.db.query("etablissements").collect(),
            ctx.db.query("signalements").collect(),
            ctx.db.query("alertesRappels").collect(),
            ctx.db.query("manuelsEducatifs").collect(),
        ]);

        return {
            etablissementsDemo: etablissementsDemo.length,
            signalementsDemo: signalementsDemo.length,
            alertesDemo: alertesDemo.length,
            manuelsDemo: manuelsDemo.length,
            updatedAt: now,
        };
    },
});
