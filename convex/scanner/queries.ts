import { query } from "../_generated/server";
import { v } from "convex/values";

export const lookupQR = query({
    args: { qrCodeId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("etablissements")
            .withIndex("by_qrCodeId", (q) => q.eq("qrCodeId", args.qrCodeId))
            .first();
    },
});

export const searchEtablissement = query({
    args: {
        texte: v.string(),
        province: v.optional(v.string()),
        categorie: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        if (!args.texte || args.texte.length < 2) return [];
        const results = await ctx.db
            .query("etablissements")
            .withSearchIndex("search_nom", (q) => q.search("nom", args.texte))
            .take(10);
        return results;
    },
});
