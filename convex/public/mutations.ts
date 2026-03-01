import { mutation } from "../_generated/server";
import { v } from "convex/values";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidGabonPhone(value: string): boolean {
    const digits = value.replace(/\D/g, "");
    if (!digits) return false;

    if (digits.startsWith("241")) {
        const local = digits.slice(3);
        if (local.length === 8) return true;
        return local.length === 9 && local.startsWith("0");
    }

    if (digits.length === 8) return true;
    return digits.length === 9 && digits.startsWith("0");
}

function isValidContact(value: string): boolean {
    return EMAIL_REGEX.test(value) || isValidGabonPhone(value);
}

function buildReference(timestamp: number): string {
    const random = Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, "0");
    return `MSG-${timestamp.toString().slice(-8)}-${random}`;
}

export const createContactMessage = mutation({
    args: {
        nom: v.optional(v.string()),
        contact: v.string(),
        sujet: v.union(
            v.literal("question"),
            v.literal("suggestion"),
            v.literal("support"),
            v.literal("autre")
        ),
        message: v.string(),
        website: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const now = Date.now();
        const reference = buildReference(now);

        if (args.website?.trim()) {
            return {
                success: true,
                reference,
                creeLe: now,
            };
        }

        const cleanContact = args.contact.trim();
        const cleanMessage = args.message.trim();
        const cleanNom = args.nom?.trim();

        if (!isValidContact(cleanContact)) {
            throw new Error("Contact invalide. Utilisez un email ou un numéro gabonais valide.");
        }

        if (cleanMessage.length < 10) {
            throw new Error("Le message doit contenir au moins 10 caractères.");
        }

        if (cleanMessage.length > 2000) {
            throw new Error("Le message dépasse la limite de 2000 caractères.");
        }

        if (cleanNom && cleanNom.length > 80) {
            throw new Error("Le nom ne peut pas dépasser 80 caractères.");
        }

        await ctx.db.insert("messagesContact", {
            nom: cleanNom || undefined,
            contact: cleanContact,
            sujet: args.sujet,
            message: cleanMessage,
            statut: "nouveau",
            creeLe: now,
            source: "public_contact",
        });

        return {
            success: true,
            reference,
            creeLe: now,
        };
    },
});
