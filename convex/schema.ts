import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    // --- CITOYENS (utilisateurs optionnels) ---
    citoyens: defineTable({
        telephone: v.optional(v.string()),
        email: v.optional(v.string()),
        motDePasse: v.optional(v.string()),
        pseudo: v.optional(v.string()),
        province: v.optional(v.string()),
        zonesAlerte: v.array(v.string()),
        notificationsActives: v.boolean(),
        pushSubscription: v.optional(v.string()),
        nombreSignalements: v.number(),
        statut: v.union(v.literal("actif"), v.literal("inactif"), v.literal("banni")),
        role: v.union(
            v.literal("citoyen"),
            v.literal("admin_systeme"),
            v.literal("moderateur"),
            v.literal("demo")
        ),
        creeLe: v.number(),
        derniereConnexion: v.optional(v.number()),
    })
        .index("by_telephone", ["telephone"])
        .index("by_email", ["email"])
        .index("by_role", ["role"])
        .index("by_statut", ["statut"]),

    // --- SESSIONS ---
    sessions: defineTable({
        citoyenId: v.id("citoyens"),
        token: v.string(),
        role: v.string(),
        expireA: v.number(),
        creeLe: v.number(),
    })
        .index("by_token", ["token"])
        .index("by_citoyen", ["citoyenId"]),

    // --- ÉTABLISSEMENTS (synchronisés depuis Core) ---
    etablissements: defineTable({
        coreId: v.optional(v.string()),
        nom: v.string(),
        categorie: v.union(
            v.literal("AS_CAT_1"),
            v.literal("AS_CAT_2"),
            v.literal("AS_CAT_3"),
            v.literal("TRANSPORT")
        ),
        typeActivite: v.string(),
        typeActiviteIcone: v.string(),
        adresse: v.string(),
        ville: v.string(),
        province: v.string(),
        latitude: v.number(),
        longitude: v.number(),
        telephone: v.optional(v.string()),

        // Smiley
        smiley: v.number(),
        smileyCouleur: v.string(),
        smileyTexte: v.string(),
        smileyEmoji: v.string(),

        // Agrément
        agrementStatut: v.union(
            v.literal("valide"),
            v.literal("expire"),
            v.literal("suspendu"),
            v.literal("aucun")
        ),
        agrementReference: v.optional(v.string()),
        agrementExpiration: v.optional(v.number()),

        // Inspection
        derniereInspection: v.optional(v.number()),
        historiqueSmileys: v.array(
            v.object({
                date: v.number(),
                score: v.number(),
            })
        ),

        // QR Code
        qrCodeId: v.string(),
        qrCodeUrl: v.optional(v.string()),

        // Signalements
        nombreSignalements: v.number(),

        // Métadonnées
        actif: v.boolean(),
        creeLe: v.number(),
        modifieLe: v.number(),
    })
        .index("by_qrCodeId", ["qrCodeId"])
        .index("by_province", ["province"])
        .index("by_categorie", ["categorie"])
        .index("by_ville", ["ville"])
        .index("by_smiley", ["smiley"])
        .index("by_actif", ["actif"])
        .searchIndex("search_nom", {
            searchField: "nom",
            filterFields: ["province", "categorie", "actif"],
        }),

    // --- SIGNALEMENTS CITOYENS ---
    signalements: defineTable({
        reference: v.string(),
        citoyenId: v.optional(v.id("citoyens")),
        anonyme: v.boolean(),

        // Localisation
        gpsLatitude: v.number(),
        gpsLongitude: v.number(),
        gpsPrecision: v.optional(v.number()),
        adresseApproximative: v.optional(v.string()),
        province: v.string(),
        ville: v.string(),

        // Établissement ciblé
        etablissementId: v.optional(v.id("etablissements")),
        nomEtablissement: v.optional(v.string()),

        // Type d'infraction
        typeInfraction: v.union(
            v.literal("produits_perimes"),
            v.literal("insalubrite"),
            v.literal("absence_agrement"),
            v.literal("produits_suspects"),
            v.literal("chaine_froid"),
            v.literal("autre")
        ),
        typeInfractionLabel: v.string(),
        description: v.optional(v.string()),

        // Photos
        photos: v.array(
            v.object({
                url: v.string(),
                thumbnail: v.optional(v.string()),
                gpsLatitude: v.optional(v.number()),
                gpsLongitude: v.optional(v.number()),
                datePrise: v.number(),
            })
        ),

        // Statut workflow
        statut: v.union(
            v.literal("recu"),
            v.literal("en_verification"),
            v.literal("inspection_programmee"),
            v.literal("resolu"),
            v.literal("rejete"),
            v.literal("doublon")
        ),
        motifRejet: v.optional(v.string()),

        // Traitement AGASA
        assigneA: v.optional(v.string()),
        inspectionDeclenchee: v.optional(v.boolean()),
        inspectionReference: v.optional(v.string()),
        dateTraitement: v.optional(v.number()),
        commentaireModerateur: v.optional(v.string()),

        // Audit
        dateSoumission: v.number(),
        dateModification: v.optional(v.number()),
        signaleCommeAbusif: v.boolean(),
        nombreSignalementsAbusifs: v.number(),
    })
        .index("by_reference", ["reference"])
        .index("by_citoyen", ["citoyenId"])
        .index("by_statut", ["statut"])
        .index("by_province", ["province"])
        .index("by_etablissement", ["etablissementId"])
        .index("by_date", ["dateSoumission"]),

    // --- ALERTES RAPPELS PRODUITS ---
    alertesRappels: defineTable({
        reference: v.string(),
        titre: v.string(),
        produit: v.string(),
        marque: v.optional(v.string()),
        lot: v.optional(v.string()),
        motif: v.string(),
        categorieMotif: v.union(
            v.literal("contamination"),
            v.literal("etiquetage"),
            v.literal("corps_etranger"),
            v.literal("allergene"),
            v.literal("chimique"),
            v.literal("autre")
        ),
        actionRecommandee: v.string(),
        photoUrl: v.optional(v.string()),

        // Zone
        portee: v.union(v.literal("national"), v.literal("provincial"), v.literal("local")),
        provinces: v.array(v.string()),

        // Urgence
        urgence: v.union(
            v.literal("critique"),
            v.literal("importante"),
            v.literal("moderee"),
            v.literal("information")
        ),

        // Statut
        statut: v.union(v.literal("active"), v.literal("resolue"), v.literal("annulee")),
        dateEmission: v.number(),
        dateResolution: v.optional(v.number()),

        // Source
        source: v.union(v.literal("agasa_core"), v.literal("cemac"), v.literal("admin")),

        creeLe: v.number(),
        modifieLe: v.number(),
    })
        .index("by_reference", ["reference"])
        .index("by_statut", ["statut"])
        .index("by_urgence", ["urgence"])
        .index("by_date", ["dateEmission"]),

    // --- MANUELS ÉDUCATIFS ---
    manuelsEducatifs: defineTable({
        slug: v.string(),
        titre: v.string(),
        sousTitre: v.optional(v.string()),
        categorie: v.union(
            v.literal("conservation"),
            v.literal("hygiene"),
            v.literal("dates_peremption"),
            v.literal("preparation"),
            v.literal("achat"),
            v.literal("general")
        ),
        categorieLabel: v.string(),
        categorieIcone: v.string(),
        contenu: v.string(),
        imageHeader: v.optional(v.string()),
        illustrations: v.array(
            v.object({
                url: v.string(),
                legende: v.string(),
            })
        ),
        quiz: v.optional(
            v.array(
                v.object({
                    question: v.string(),
                    options: v.array(v.string()),
                    bonneReponse: v.number(),
                    explication: v.string(),
                })
            )
        ),
        videoUrl: v.optional(v.string()),
        ordre: v.number(),
        telechargeableHorsLigne: v.boolean(),
        actif: v.boolean(),
        creeLe: v.number(),
        modifieLe: v.number(),
    })
        .index("by_slug", ["slug"])
        .index("by_categorie", ["categorie"])
        .index("by_ordre", ["ordre"]),

    // --- AUDIT LOGS ---
    auditLogs: defineTable({
        userId: v.optional(v.string()),
        action: v.string(),
        module: v.string(),
        cible: v.optional(v.string()),
        details: v.optional(v.string()),
        ipAddress: v.optional(v.string()),
        userAgent: v.optional(v.string()),
        timestamp: v.number(),
    })
        .index("by_timestamp", ["timestamp"])
        .index("by_module", ["module"])
        .index("by_userId", ["userId"]),

    // --- CONFIGURATION SYSTÈME ---
    configSysteme: defineTable({
        cle: v.string(),
        valeur: v.string(),
        categorie: v.string(),
        description: v.string(),
        modifiePar: v.string(),
        modifieLe: v.number(),
    })
        .index("by_cle", ["cle"])
        .index("by_categorie", ["categorie"]),

    // --- API GATEWAY LOGS (Citoyen <-> Core) ---
    gatewayLogs: defineTable({
        flux: v.union(v.literal("F5_OUTBOUND"), v.literal("F6_INBOUND")),
        endpoint: v.string(),
        statut: v.union(v.literal("succes"), v.literal("erreur")),
        dureeMs: v.number(),
        payload: v.optional(v.any()),
        reponse: v.optional(v.any()),
        erreur: v.optional(v.string()),
        date: v.number(),
    })
        .index("by_date", ["date"])
        .index("by_flux", ["flux"])
        .index("by_statut", ["statut"]),
});
