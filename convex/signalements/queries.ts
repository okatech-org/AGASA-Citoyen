import { query } from "../_generated/server";
import { v } from "convex/values";

export const getMesSignalements = query({
    args: { citoyenId: v.id("citoyens") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("signalements")
            .withIndex("by_citoyen", (q) => q.eq("citoyenId", args.citoyenId))
            .order("desc")
            .collect();
    },
});

export const getSignalement = query({
    args: { reference: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("signalements")
            .withIndex("by_reference", (q) => q.eq("reference", args.reference))
            .first();
    },
});

export const getStatutSignalement = query({
    args: { reference: v.string() },
    handler: async (ctx, args) => {
        const sig = await ctx.db
            .query("signalements")
            .withIndex("by_reference", (q) => q.eq("reference", args.reference))
            .first();
        return sig ? { statut: sig.statut, reference: sig.reference } : null;
    },
});
