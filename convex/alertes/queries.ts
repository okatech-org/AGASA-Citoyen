import { query } from "../_generated/server";
import { v } from "convex/values";

export const getAlertesActives = query({
    args: {
        province: v.optional(v.string()),
        urgence: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        let q = ctx.db.query("alertesRappels").withIndex("by_statut", (q) => q.eq("statut", "active"));
        return await q.order("desc").collect();
    },
});

export const getAlerte = query({
    args: { id: v.id("alertesRappels") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const countAlertesNonLues = query({
    args: {},
    handler: async (ctx) => {
        // TODO: Prompt 9 — tracking des alertes lues
        return 0;
    },
});
