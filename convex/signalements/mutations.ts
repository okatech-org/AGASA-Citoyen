import { mutation } from "../_generated/server";
import { v } from "convex/values";

export const creerSignalement = mutation({
    args: {
        citoyenId: v.optional(v.id("citoyens")),
        anonyme: v.boolean(),
        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        gpsPrecision: v.optional(v.number()),
        adresseApproximative: v.optional(v.string()),
        province: v.string(),
        ville: v.string(),
        etablissementId: v.optional(v.id("etablissements")),
        nomEtablissement: v.optional(v.string()),
        categorieSignalement: v.union(
            v.literal("consommateur"),
            v.literal("intoxication_alimentaire"),
            v.literal("utilisation_pesticides"),
            v.literal("nutrivigilance")
        ),
        typeInfraction: v.string(),
        typeInfractionLabel: v.string(),
        description: v.optional(v.string()),
        photos: v.array(
            v.object({
                url: v.string(),
                thumbnail: v.optional(v.string()),
                gpsLatitude: v.optional(v.number()),
                gpsLongitude: v.optional(v.number()),
                datePrise: v.number(),
            })
        ),
    },
    handler: async (ctx, args) => {
        // Generate reference
        const now = Date.now();
        const year = new Date(now).getFullYear();
        const rand = String(Math.floor(Math.random() * 999999)).padStart(6, "0");
        const reference = `SIG-${year}-${rand}`;

        const id = await ctx.db.insert("signalements", {
            reference,
            citoyenId: args.citoyenId,
            anonyme: args.anonyme,
            gpsLatitude: args.gpsLatitude,
            gpsLongitude: args.gpsLongitude,
            gpsPrecision: args.gpsPrecision,
            adresseApproximative: args.adresseApproximative,
            province: args.province,
            ville: args.ville,
            etablissementId: args.etablissementId,
            nomEtablissement: args.nomEtablissement,
            categorieSignalement: args.categorieSignalement,
            typeInfraction: args.typeInfraction as never,
            typeInfractionLabel: args.typeInfractionLabel,
            description: args.description,
            photos: args.photos,
            statut: "recu",
            dateSoumission: now,
            signaleCommeAbusif: false,
            nombreSignalementsAbusifs: 0,
        });

        return { id, reference };
    },
});
