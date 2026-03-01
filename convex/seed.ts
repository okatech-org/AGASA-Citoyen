import { mutation } from "./_generated/server";
import { v } from "convex/values";

// ==========================================
// SEED SCRIPT — AGASA-Citoyen
// Idempotent : efface et recrée les démos
// ==========================================

export const populate = mutation({
    args: {},
    handler: async (ctx) => {
        console.log("🌱 Début du seed data AGASA-Citoyen...");

        // ==========================================
        // 1. CITOYENS DÉMO
        // ==========================================
        const existCitoyen = await ctx.db
            .query("citoyens")
            .filter((q) => q.eq(q.field("pseudo"), "Citoyen241"))
            .first();

        let citoyenId;
        if (!existCitoyen) {
            citoyenId = await ctx.db.insert("citoyens", {
                telephone: "077000001",
                motDePasse: "$2b$10$TbcCqKzP8W1Q0p7L0R3z8e.sT5gX57Q/qLw0JpK.CXY5rN.6V5W0W", // "123456" hashé
                pseudo: "Citoyen241",
                province: "Estuaire",
                zonesAlerte: ["Estuaire", "National"],
                notificationsActives: true,
                nombreSignalements: 15,
                statut: "actif",
                role: "demo",
                creeLe: Date.now() - 30 * 86400000,
            });
            console.log("✅ Compte Citoyen241 créé");
        } else {
            citoyenId = existCitoyen._id;
        }

        const existMod = await ctx.db
            .query("citoyens")
            .filter((q) => q.eq(q.field("email"), "demo-moderateur@agasa.ga"))
            .first();

        if (!existMod) {
            await ctx.db.insert("citoyens", {
                email: "demo-moderateur@agasa.ga",
                motDePasse: "$2b$10$TbcCqKzP8W1Q0p7L0R3z8e.sT5gX57Q/qLw0JpK.CXY5rN.6V5W0W", // "123456" hashé
                pseudo: "NDONG Sylvie",
                province: "National",
                zonesAlerte: ["National"],
                notificationsActives: true,
                nombreSignalements: 0,
                statut: "actif",
                role: "moderateur",
                creeLe: Date.now() - 60 * 86400000,
            });
            console.log("✅ Compte Modérateur créé");
        }

        const existAdmin = await ctx.db
            .query("citoyens")
            .filter((q) => q.eq(q.field("email"), "demo-admin@agasa.ga"))
            .first();

        if (!existAdmin) {
            await ctx.db.insert("citoyens", {
                email: "demo-admin@agasa.ga",
                motDePasse: "$2b$10$TbcCqKzP8W1Q0p7L0R3z8e.sT5gX57Q/qLw0JpK.CXY5rN.6V5W0W", // "123456" hashé
                pseudo: "ENGONE Patrick",
                province: "National",
                zonesAlerte: ["National"],
                notificationsActives: true,
                nombreSignalements: 0,
                statut: "actif",
                role: "demo",
                creeLe: Date.now() - 90 * 86400000,
            });
            console.log("✅ Compte Admin créé");
        }

        // ==========================================
        // 2. ÉTABLISSEMENTS (120)
        // ==========================================
        const etabsCount = await ctx.db.query("etablissements").collect();
        if (etabsCount.length < 120) {
            console.log("🗑️ Purge des anciens établissements...");
            for (const e of etabsCount) await ctx.db.delete(e._id);

            console.log("🏭 Génération de 120 établissements...");
            const provincesDist = [
                ...Array(50).fill({ p: "Estuaire", v: "Libreville", lat: 0.39, lng: 9.45 }),
                ...Array(25).fill({ p: "Ogooué-Maritime", v: "Port-Gentil", lat: -0.72, lng: 8.78 }),
                ...Array(20).fill({ p: "Haut-Ogooué", v: "Franceville", lat: -1.63, lng: 13.58 }),
                ...Array(15).fill({ p: "Woleu-Ntem", v: "Oyem", lat: 1.6, lng: 11.58 }),
                ...Array(10).fill({ p: "Moyen-Ogooué", v: "Lambaréné", lat: -0.7, lng: 10.22 }),
            ];

            const nomsRestos = ["Chez Mama Ngoué", "Le Palmier", "La Terrasse", "Grillade du Port", "Maquis L'Étoile", "Le Baobab", "Chez Tonton Paul", "Le Petit Parisien", "L'Estuaire", "Braise & Go"];
            const nomsBoucheries = ["Boucherie Ndong", "Viandes Fraîches", "Charcuterie du Centre", "Boucherie Halal"];
            const nomsBoulangeries = ["Le Blé d'Or", "Boulangerie du Centre", "La Mie Chaude", "Pain Quotidien"];
            const nomsSupermarches = ["Super U", "Casino", "Prix Import", "CKdo", "Mbolo"];
            const nomsEpiceries = ["Épicerie du Carrefour", "Mini-Prix", "Alimentation Générale", "Dépôt Boissons"];

            const cats = [
                ...Array(8).fill("AS_CAT_1"),
                ...Array(40).fill("AS_CAT_2"),
                ...Array(55).fill("AS_CAT_3"),
                ...Array(17).fill("TRANSPORT"),
            ];

            for (let i = 0; i < 120; i++) {
                const prov = provincesDist[i];
                const cat = cats[i];

                // Random name based on category
                let nom = "Établissement";
                let activite = "Restauration";
                let icon = "🍽️";

                if (cat === "AS_CAT_1") {
                    nom = nomsSupermarches[i % nomsSupermarches.length] + " " + prov.v;
                    activite = "Supermarché";
                    icon = "🛒";
                } else if (cat === "AS_CAT_2") {
                    nom = i % 2 === 0 ? nomsBoucheries[i % nomsBoucheries.length] : nomsBoulangeries[i % nomsBoulangeries.length];
                    activite = i % 2 === 0 ? "Boucherie" : "Boulangerie";
                    icon = i % 2 === 0 ? "🥩" : "🥖";
                } else if (cat === "AS_CAT_3") {
                    nom = i % 3 === 0 ? nomsEpiceries[i % nomsEpiceries.length] : nomsRestos[i % nomsRestos.length];
                    activite = i % 3 === 0 ? "Épicerie" : "Restaurant";
                    icon = i % 3 === 0 ? "🏪" : "🍽️";
                } else {
                    nom = "Camion Frigo " + prov.p + " #" + i;
                    activite = "Transport Frigorifique";
                    icon = "🚛";
                }

                // Random Smiley (0-5) with weighted distribution
                const r = Math.random();
                let smiley = 4;
                if (r < 0.05) smiley = 0;
                else if (r < 0.15) smiley = 1;
                else if (r < 0.3) smiley = 2;
                else if (r < 0.55) smiley = 3;
                else if (r < 0.85) smiley = 4;
                else smiley = 5;

                let couleur = "#059669"; let texte = "Très bon"; let emoji = "🤩";
                if (smiley === 4) { couleur = "#10b981"; texte = "Bon"; emoji = "🙂"; }
                if (smiley === 3) { couleur = "#FDD835"; texte = "Acceptable"; emoji = "😐"; }
                if (smiley === 2) { couleur = "#f59e0b"; texte = "Insuffisant"; emoji = "😟"; }
                if (smiley === 1) { couleur = "#f43f5e"; texte = "Mauvais"; emoji = "😡"; }
                if (smiley === 0) { couleur = "#212121"; texte = "Fermé"; emoji = "⛔"; }

                // Random status
                const rs = Math.random();
                let status = "valide";
                if (rs > 0.7 && rs <= 0.85) status = "expire";
                else if (rs > 0.85 && rs <= 0.95) status = "aucun";
                else if (rs > 0.95) status = "suspendu";

                const hist = [];
                for (let j = 12; j >= 0; j--) {
                    hist.push({
                        date: Date.now() - j * 30 * 86400000,
                        score: Math.max(0, Math.min(5, smiley + (Math.floor(Math.random() * 3) - 1)))
                    });
                }

                await ctx.db.insert("etablissements", {
                    nom,
                    categorie: cat as any,
                    typeActivite: activite,
                    typeActiviteIcone: icon,
                    adresse: "Quartier " + ["Centre", "Nord", "Sud", "Est", "Ouest"][i % 5],
                    ville: prov.v,
                    province: prov.p,
                    latitude: prov.lat + (Math.random() - 0.5) * 0.05,
                    longitude: prov.lng + (Math.random() - 0.5) * 0.05,
                    telephone: "0770" + String(i).padStart(5, '0'),
                    smiley, smileyCouleur: couleur, smileyTexte: texte, smileyEmoji: emoji,
                    agrementStatut: status as any,
                    agrementReference: status === "valide" ? `AGR-${2025}-${String(i).padStart(4, '0')}` : undefined,
                    derniereInspection: Date.now() - Math.floor(Math.random() * 180) * 86400000,
                    historiqueSmileys: hist,
                    qrCodeId: `ETB-${prov.p.substring(0, 3).toUpperCase()}-${String(i).padStart(4, '0')}`,
                    nombreSignalements: Math.floor(Math.random() * 5),
                    actif: true,
                    creeLe: Date.now() - 365 * 86400000,
                    modifieLe: Date.now(),
                });
            }
            console.log("✅ 120 Établissements générés");
        }

        // ==========================================
        // 3. SIGNALEMENTS (25)
        // ==========================================
        const sigsCount = await ctx.db.query("signalements").collect();
        if (sigsCount.length < 25) {
            console.log("🗑️ Purge des anciens signalements...");
            for (const s of sigsCount) await ctx.db.delete(s._id);

            console.log("🚨 Génération de 25 signalements...");
            const etabs = await ctx.db.query("etablissements").take(25);

            const types = [
                ...Array(8).fill({ t: "produits_perimes", l: "Produits périmés", c: "consommateur" }),
                ...Array(6).fill({ t: "insalubrite", l: "Insalubrité", c: "consommateur" }),
                ...Array(4).fill({ t: "absence_agrement", l: "Absence d'agrément", c: "consommateur" }),
                ...Array(3).fill({ t: "produits_suspects", l: "Produits suspects / Contrefaçon", c: "consommateur" }),
                ...Array(2).fill({ t: "chaine_froid", l: "Rupture chaîne du froid", c: "consommateur" }),
                ...Array(2).fill({ t: "autre", l: "Autre infraction", c: "nutrivigilance" }),
            ];

            const statuses = [
                ...Array(5).fill("recu"),
                ...Array(5).fill("en_verification"),
                ...Array(5).fill("inspection_programmee"),
                ...Array(7).fill("resolu"),
                ...Array(1).fill("doublon"),
                ...Array(2).fill("rejete"),
            ];

            for (let i = 0; i < 25; i++) {
                const type = types[i];
                const status = statuses[i];
                const etab = etabs[i];
                const isAnon = i < 10;

                await ctx.db.insert("signalements", {
                    reference: `SIG-${2026}-${String(i + 1).padStart(6, '0')}`,
                    citoyenId: isAnon ? undefined : citoyenId,
                    anonyme: isAnon,
                    gpsLatitude: etab ? etab.latitude : 0.4,
                    gpsLongitude: etab ? etab.longitude : 9.45,
                    province: etab ? etab.province : "Estuaire",
                    ville: etab ? etab.ville : "Libreville",
                    etablissementId: etab ? etab._id : undefined,
                    nomEtablissement: etab ? etab.nom : "Inconnu",
                    categorieSignalement: type.c as any,
                    typeInfraction: type.t as any,
                    typeInfractionLabel: type.l,
                    description: "Description de l'infraction constatée pour " + type.l,
                    photos: [{ url: "https://images.unsplash.com/photo-1628102491629-778571d893a3", datePrise: Date.now() - i * 86400000 }],
                    statut: status as any,
                    motifRejet: status === "rejete" ? "Preuves insuffisantes" : undefined,
                    dateSoumission: Date.now() - (i * 2 + 1) * 86400000,
                    signaleCommeAbusif: false,
                    nombreSignalementsAbusifs: 0,
                });
            }
            console.log("✅ 25 Signalements générés");
        }

        // ==========================================
        // 4. ALERTES (8)
        // ==========================================
        const alertesCount = await ctx.db.query("alertesRappels").collect();
        if (alertesCount.length < 8) {
            console.log("🗑️ Purge des anciennes alertes...");
            for (const a of alertesCount) await ctx.db.delete(a._id);

            console.log("🔔 Génération de 8 alertes...");
            const alertesList = [
                { u: "critique", t: "Lait concentré Marque X — Lot 2026A", m: "Listeria", c: "contamination", stat: "active", p: "National", a: "Ne pas consommer." },
                { u: "critique", t: "Poulet surgelé Import Y", m: "Salmonelle", c: "contamination", stat: "active", p: "Estuaire", a: "Détruire ou rapporter." },
                { u: "importante", t: "Jus de fruits Marque Z", m: "Corps étranger", c: "corps_etranger", stat: "active", p: "National", a: "Ne pas consommer." },
                { u: "importante", t: "Farine de manioc locale", m: "Taux cyanure élevé", c: "chimique", stat: "active", p: "Woleu-Ntem", a: "Restituer au point de vente." },
                { u: "moderee", t: "Conserves de poisson Marque W", m: "Étiquetage défectueux", c: "etiquetage", stat: "active", p: "National", a: "Vigilance sur les dates." },
                { u: "information", t: "Rappel volontaire chocolat", m: "Allergène non déclaré", c: "allergene", stat: "resolue", p: "National", a: "Attention allergiques." },
                { u: "moderee", t: "Huile de palme artisanale", m: "Non conforme", c: "autre", stat: "resolue", p: "Haut-Ogooué", a: "Retrait qualitatif." },
                { u: "critique", t: "Eau minérale Marque U", m: "Contamination chimique", c: "chimique", stat: "resolue", p: "National", a: "Risque aigu." },
            ];

            for (let i = 0; i < 8; i++) {
                const al = alertesList[i];
                await ctx.db.insert("alertesRappels", {
                    reference: `ALE-2026-00${i + 1}`,
                    titre: al.t,
                    produit: "Produit XYZ", // Placeholder
                    motif: al.m,
                    categorieMotif: al.c as any,
                    actionRecommandee: al.a,
                    portee: al.p === "National" ? "national" : "provincial",
                    provinces: al.p === "National" ? ["Estuaire", "Ogooué-Maritime", "Haut-Ogooué", "Woleu-Ntem", "Moyen-Ogooué"] : [al.p],
                    urgence: al.u as any,
                    statut: al.stat as any,
                    source: "agasa_core",
                    dateEmission: Date.now() - (i + 1) * 86400000,
                    dateResolution: al.stat === "resolue" ? Date.now() - i * 4000000 : undefined,
                    creeLe: Date.now() - (i + 1) * 86400000,
                    modifieLe: Date.now(),
                });
            }
            console.log("✅ 8 Alertes générées");
        }

        // ==========================================
        // 5. MANUELS ÉDUCATIFS (6)
        // ==========================================
        const manuelsCount = await ctx.db.query("manuelsEducatifs").collect();
        if (manuelsCount.length < 6) {
            console.log("🗑️ Purge des anciens manuels...");
            for (const m of manuelsCount) await ctx.db.delete(m._id);

            console.log("📚 Génération de 6 manuels...");
            const manuels = [
                {
                    s: "manipulation-manioc", t: "Manipulation sûre du manioc", sub: "Risques liés au cyanure et bonnes pratiques",
                    c: "conservation", cl: "Conservation", ci: "🧊", o: 1,
                    content: "Le manioc amer contient des composés cyanogènes (linamarine)...",
                    quiz: [
                        { question: "Combien de temps faut-il tremper le manioc amer ?", options: ["2 heures", "12 heures", "24 à 48 heures", "Pas besoin"], bonneReponse: 2, explication: "Le trempage prolongé élimine la linamarine." }
                    ]
                },
                {
                    s: "conservation-poisson", t: "Conservation du poisson", sub: "Chaîne du froid et signes de fraîcheur",
                    c: "conservation", cl: "Conservation", ci: "🧊", o: 2,
                    content: "Le poisson est très périssable. Vérifiez les branchies et l'odeur...",
                    quiz: [
                        { question: "Un signe de poisson frais ?", options: ["Odeur forte", "Yeux clairs", "Chair molle", "Couleur terne"], bonneReponse: 1, explication: "Les yeux doivent être clairs et bombés." }
                    ]
                },
                {
                    s: "hygiene-rue", t: "Hygiène de l'alimentation de rue", sub: "Repérer un étal propre",
                    c: "hygiene", cl: "Hygiène", ci: "🧼", o: 3,
                    content: "La nourriture de rue est délicieuse mais attention à l'hygiène...",
                    quiz: [
                        { question: "Critère principal d'un bon étal ?", options: ["Points d'eau", "Prix bas", "Vendeur souriant", "Musique"], bonneReponse: 0, explication: "L'accès à l'eau est crucial pour laver mains et ustensiles." }
                    ]
                },
                {
                    s: "dlc-dluo", t: "DLC vs DLUO : comprendre les dates", sub: "Différence, quand jeter",
                    c: "dates_peremption", cl: "Dates péremption", ci: "📅", o: 4,
                    content: "DLC = Date Limite de Consommation. DLUO = Date de Durabilité...",
                    quiz: [
                        { question: "DLC dépassée d'un jour ?", options: ["Manger", "Jeter", "Cuire et manger", "Congeler"], bonneReponse: 1, explication: "Une DLC est impérative, risque sanitaire." }
                    ]
                },
                {
                    s: "conservation-domicile", t: "Conservation des aliments au domicile", sub: "Frigo, congélation",
                    c: "conservation", cl: "Conservation", ci: "🧊", o: 5,
                    content: "Réglez votre réfrigérateur entre 0°C et 4°C...",
                    quiz: [
                        { question: "Température idéale d'un frigo ?", options: ["10°C", "0°C - 4°C", "-5°C", "20°C"], bonneReponse: 1, explication: "Entre 0 et 4°C freine la prolifération bactérienne." }
                    ]
                },
                {
                    s: "lavage-fruits-legumes", t: "Lavage des fruits et légumes", sub: "Pourquoi et comment",
                    c: "preparation", cl: "Préparation", ci: "🍳", o: 6,
                    content: "Même s'ils vont être épluchés, lavez vos fruits...",
                    quiz: [
                        { question: "Faut-il laver un fruit qu'on va éplucher ?", options: ["Oui", "Non", "Seulement si terreux", "Jamais"], bonneReponse: 0, explication: "Pour éviter que le couteau n'entraîne les bactéries de la peau vers la chair." }
                    ]
                }
            ];

            for (const m of manuels) {
                await ctx.db.insert("manuelsEducatifs", {
                    slug: m.s, titre: m.t, sousTitre: m.sub,
                    categorie: m.c as any, categorieLabel: m.cl, categorieIcone: m.ci,
                    contenu: m.content, ordre: m.o,
                    illustrations: [{ url: "https://images.unsplash.com/photo-1542838132-92c53300491e", legende: "Illustration" }],
                    quiz: m.quiz,
                    telechargeableHorsLigne: true, actif: true, creeLe: Date.now(), modifieLe: Date.now(),
                });
            }
            console.log("✅ 6 Manuels générés");
        }

        console.log("✨ Seed data terminé avec succès !");
        return "Seed OK";
    }
});
