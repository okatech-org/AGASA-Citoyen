import { query } from "../_generated/server";
import { v } from "convex/values";

export const getManuels = query({
    args: { categorie: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (args.categorie) {
            return await ctx.db
                .query("manuelsEducatifs")
                .withIndex("by_categorie", (q) => q.eq("categorie", args.categorie as "conservation" | "hygiene" | "dates_peremption" | "preparation" | "achat" | "general"))
                .collect();
        }
        return await ctx.db.query("manuelsEducatifs").withIndex("by_ordre").collect();
    },
});

export const getManuel = query({
    args: { slug: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("manuelsEducatifs")
            .withIndex("by_slug", (q) => q.eq("slug", args.slug))
            .first();
    },
});
