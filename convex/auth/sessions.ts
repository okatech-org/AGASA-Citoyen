import { query, mutation } from "../_generated/server";
import { v } from "convex/values";

// ============================================
// SESSIONS — AGASA-Citoyen
// Citoyens : 30 jours | Admin/Modérateur : 8 heures
// ============================================

const SESSION_DURATION_CITOYEN = 30 * 24 * 60 * 60 * 1000; // 30 jours
const SESSION_DURATION_ADMIN = 8 * 60 * 60 * 1000; // 8 heures

function generateToken(): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

export const createSession = mutation({
    args: {
        citoyenId: v.id("citoyens"),
        role: v.string(),
    },
    handler: async (ctx, args) => {
        const token = generateToken();
        const isAdmin = args.role === "admin_systeme" || args.role === "moderateur";
        const duration = isAdmin ? SESSION_DURATION_ADMIN : SESSION_DURATION_CITOYEN;

        // Supprimer les anciennes sessions de ce citoyen
        const oldSessions = await ctx.db
            .query("sessions")
            .withIndex("by_citoyen", (q) => q.eq("citoyenId", args.citoyenId))
            .collect();
        for (const session of oldSessions) {
            await ctx.db.delete(session._id);
        }

        const sessionId = await ctx.db.insert("sessions", {
            citoyenId: args.citoyenId,
            token,
            role: args.role,
            expireA: Date.now() + duration,
            creeLe: Date.now(),
        });

        return { token, sessionId };
    },
});

export const getSession = query({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        if (!args.token) return null;

        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();

        if (!session) return null;

        // Vérifier expiration
        if (session.expireA < Date.now()) {
            return null;
        }

        return session;
    },
});

export const deleteSession = mutation({
    args: { token: v.string() },
    handler: async (ctx, args) => {
        const session = await ctx.db
            .query("sessions")
            .withIndex("by_token", (q) => q.eq("token", args.token))
            .first();

        if (session) {
            await ctx.db.delete(session._id);
        }
    },
});

export const cleanExpiredSessions = mutation({
    args: {},
    handler: async (ctx) => {
        const allSessions = await ctx.db.query("sessions").collect();
        let count = 0;
        for (const session of allSessions) {
            if (session.expireA < Date.now()) {
                await ctx.db.delete(session._id);
                count++;
            }
        }
        return { cleaned: count };
    },
});
