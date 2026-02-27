import { query } from "../_generated/server";
import { v } from "convex/values";

export const getEtablissementsProches = query({
    args: {
        latitude: v.number(),
        longitude: v.number(),
        rayon: v.optional(v.number()),
        categorie: v.optional(v.string()),
        smileyMin: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        // TODO: Prompt 8
        return [];
    },
});

export const getEtablissement = query({
    args: { id: v.id("etablissements") },
    handler: async (ctx, args) => {
        return await ctx.db.get(args.id);
    },
});

export const searchEtablissements = query({
    args: {
        texte: v.string(),
        province: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // TODO: Prompt 6/8
        return [];
    },
});
