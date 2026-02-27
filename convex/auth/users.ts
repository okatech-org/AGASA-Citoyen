import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// ============================================
// UTILISATEURS — AGASA-Citoyen
// Inscription optionnelle par téléphone + OTP
// Admin par email + mot de passe
// ============================================

// OTP stockés temporairement (en mémoire via table)
// En prod : envoyer via SMS gateway
// En dev/démo : le code est toujours 1234

function generateOTP(): string {
    return String(Math.floor(1000 + Math.random() * 9000));
}

function generateToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// Durées de session
const SESSION_DURATION_CITOYEN = 30 * 24 * 60 * 60 * 1000; // 30 jours
const SESSION_DURATION_ADMIN = 8 * 60 * 60 * 1000; // 8 heures

// ── INSCRIPTION CITOYEN ──

export const registerCitoyen = mutation({
    args: { telephone: v.string() },
    handler: async (ctx, args) => {
        const tel = args.telephone.trim();
        if (!tel) throw new Error("Numéro de téléphone requis");

        // Vérifier si le citoyen existe déjà
        const existing = await ctx.db
            .query("citoyens")
            .withIndex("by_telephone", (q) => q.eq("telephone", tel))
            .first();

        if (existing) {
            // Citoyen existe, on envoie un nouveau OTP
            const otp = generateOTP();
            // En dev/démo, on loggue l'OTP
            console.log(`[OTP] ${tel} → ${otp} (dev: use 1234)`);
            return { success: true, isNewUser: false, telephone: tel };
        }

        // Nouveau citoyen
        const otp = generateOTP();
        console.log(`[OTP] ${tel} → ${otp} (dev: use 1234)`);
        return { success: true, isNewUser: true, telephone: tel };
    },
});

export const verifyOTP = mutation({
    args: {
        telephone: v.string(),
        code: v.string(),
    },
    handler: async (ctx, args) => {
        const tel = args.telephone.trim();
        const code = args.code.trim();

        // En dev/démo : le code est toujours 1234
        if (code !== "1234") {
            throw new Error("Code incorrect. En mode démo, utilisez 1234.");
        }

        // Chercher ou créer le citoyen
        let citoyen = await ctx.db
            .query("citoyens")
            .withIndex("by_telephone", (q) => q.eq("telephone", tel))
            .first();

        if (!citoyen) {
            // Créer le citoyen
            const citoyenId = await ctx.db.insert("citoyens", {
                telephone: tel,
                zonesAlerte: [],
                notificationsActives: false,
                nombreSignalements: 0,
                statut: "actif",
                role: "citoyen",
                creeLe: Date.now(),
                derniereConnexion: Date.now(),
            });
            citoyen = await ctx.db.get(citoyenId);
        } else {
            // Mettre à jour dernière connexion
            await ctx.db.patch(citoyen._id, {
                derniereConnexion: Date.now(),
            });
        }

        if (!citoyen) throw new Error("Erreur création compte");

        // Créer une session
        const token = generateToken();
        await ctx.db.insert("sessions", {
            citoyenId: citoyen._id,
            token,
            role: citoyen.role,
            expireA: Date.now() + SESSION_DURATION_CITOYEN,
            creeLe: Date.now(),
        });

        return {
            success: true,
            token,
            user: {
                _id: citoyen._id,
                telephone: citoyen.telephone,
                pseudo: citoyen.pseudo,
                role: citoyen.role,
                statut: citoyen.statut,
            },
        };
    },
});

// ── MISE À JOUR PSEUDO ──

export const updatePseudo = mutation({
    args: {
        sessionToken: v.string(),
        pseudo: v.string(),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", args.sessionToken))
            .first();

        if (!session || session.expireA < Date.now()) {
            throw new Error("Session invalide ou expirée");
        }

        await ctx.db.patch(session.citoyenId, {
            pseudo: args.pseudo.trim() || undefined,
        });

        return { success: true };
    },
});

// ── CONNEXION ADMIN ──

export const loginAdmin = mutation({
    args: {
        email: v.string(),
        motDePasse: v.string(),
    },
    handler: async (ctx, args) => {
        const email = args.email.trim().toLowerCase();
        const mdp = args.motDePasse;

        // Chercher l'admin par email
        const admin = await ctx.db
            .query("citoyens")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        if (!admin) {
            throw new Error("Email ou mot de passe incorrect");
        }

        // Vérifier le rôle
        if (admin.role !== "admin_systeme" && admin.role !== "moderateur" && admin.role !== "demo") {
            throw new Error("Accès non autorisé");
        }

        // Vérifier le mot de passe (stocké en clair pour la démo — en prod : bcrypt)
        if (admin.motDePasse !== mdp) {
            throw new Error("Email ou mot de passe incorrect");
        }

        // Vérifier statut
        if (admin.statut === "banni") {
            throw new Error("Compte suspendu");
        }

        // Mettre à jour dernière connexion
        await ctx.db.patch(admin._id, {
            derniereConnexion: Date.now(),
        });

        // Créer session
        const token = generateToken();
        const isAdmin = admin.role === "admin_systeme" || admin.role === "moderateur";
        await ctx.db.insert("sessions", {
            citoyenId: admin._id,
            token,
            role: admin.role,
            expireA: Date.now() + (isAdmin ? SESSION_DURATION_ADMIN : SESSION_DURATION_CITOYEN),
            creeLe: Date.now(),
        });

        return {
            success: true,
            token,
            user: {
                _id: admin._id,
                email: admin.email,
                pseudo: admin.pseudo,
                role: admin.role,
                statut: admin.statut,
            },
        };
    },
});

// ── CONNEXION DÉMO ──

export const loginDemo = mutation({
    args: {
        profil: v.union(v.literal("citoyen"), v.literal("moderateur"), v.literal("admin")),
    },
    handler: async (ctx, args) => {
        let email: string;
        switch (args.profil) {
            case "citoyen":
                email = "demo-citoyen@agasa.ga";
                break;
            case "moderateur":
                email = "demo-moderateur@agasa.ga";
                break;
            case "admin":
                email = "demo-admin@agasa.ga";
                break;
        }

        // Chercher le compte démo
        let demoUser = await ctx.db
            .query("citoyens")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();

        // Si le compte n'existe pas encore, le créer
        if (!demoUser) {
            const pseudos: Record<string, string> = {
                citoyen: "Citoyen241",
                moderateur: "Sylvie NDONG",
                admin: "Patrick ENGONE",
            };
            const demoId = await ctx.db.insert("citoyens", {
                email,
                pseudo: pseudos[args.profil],
                telephone: args.profil === "citoyen" ? "077000001" : undefined,
                zonesAlerte: ["Estuaire"],
                notificationsActives: false,
                nombreSignalements: args.profil === "citoyen" ? 3 : 0,
                statut: "actif",
                role: "demo",
                motDePasse: "demo-citoyen-2026",
                creeLe: Date.now(),
                derniereConnexion: Date.now(),
            });
            demoUser = await ctx.db.get(demoId);
        }

        if (!demoUser) throw new Error("Erreur création compte démo");

        // Créer session
        const token = generateToken();
        await ctx.db.insert("sessions", {
            citoyenId: demoUser._id,
            token,
            role: "demo",
            expireA: Date.now() + SESSION_DURATION_CITOYEN,
            creeLe: Date.now(),
        });

        return {
            success: true,
            token,
            demoProfil: args.profil,
            user: {
                _id: demoUser._id,
                email: demoUser.email,
                pseudo: demoUser.pseudo,
                role: demoUser.role,
                statut: demoUser.statut,
            },
        };
    },
});

// ── QUERIES ──

export const getCurrentUser = query({
    args: { sessionToken: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return null;
        const sessionToken = args.sessionToken;

        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", sessionToken))
            .first();

        if (!session || session.expireA < Date.now()) return null;

        const user = await ctx.db.get(session.citoyenId);
        if (!user || user.statut === "banni") return null;

        return {
            _id: user._id,
            telephone: user.telephone,
            email: user.email,
            pseudo: user.pseudo,
            province: user.province,
            zonesAlerte: user.zonesAlerte,
            notificationsActives: user.notificationsActives,
            nombreSignalements: user.nombreSignalements,
            role: user.role,
            statut: user.statut,
            creeLe: user.creeLe,
            derniereConnexion: user.derniereConnexion,
        };
    },
});

export const isAuthenticated = query({
    args: { sessionToken: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return false;
        const sessionToken = args.sessionToken;

        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", sessionToken))
            .first();

        if (!session || session.expireA < Date.now()) return false;

        const user = await ctx.db.get(session.citoyenId);
        return !!user && user.statut !== "banni";
    },
});

// ── DÉCONNEXION ──

export const logout = mutation({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", args.sessionToken))
            .first();

        if (session) {
            await ctx.db.delete(session._id);
        }
        return { success: true };
    },
});

// ── MISE À JOUR PROFIL ──

export const updateProfile = mutation({
    args: {
        sessionToken: v.string(),
        pseudo: v.optional(v.string()),
        province: v.optional(v.string()),
        zonesAlerte: v.optional(v.array(v.string())),
        notificationsActives: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", args.sessionToken))
            .first();

        if (!session || session.expireA < Date.now()) {
            throw new Error("Session invalide ou expirée");
        }

        const updates: Record<string, unknown> = {};
        if (args.pseudo !== undefined) updates.pseudo = args.pseudo;
        if (args.province !== undefined) updates.province = args.province;
        if (args.zonesAlerte !== undefined) updates.zonesAlerte = args.zonesAlerte;
        if (args.notificationsActives !== undefined) updates.notificationsActives = args.notificationsActives;

        if (Object.keys(updates).length > 0) {
            await ctx.db.patch(session.citoyenId, updates);
        }

        return { success: true };
    },
});
