// General utilities — AGASA-Citoyen

/**
 * Combine class names (lightweight clsx alternative)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

/**
 * Formatte une date en français
 */
export function formatDate(timestamp: number): string {
    return new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(new Date(timestamp));
}

/**
 * Formatte une date relative (il y a X)
 */
export function formatRelativeDate(timestamp: number): string {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "À l'instant";
    if (minutes < 60) return `il y a ${minutes} min`;
    if (hours < 24) return `il y a ${hours}h`;
    if (days < 7) return `il y a ${days}j`;
    return formatDate(timestamp);
}

/**
 * Formatte un numéro de téléphone gabonais
 */
export function formatTelephone(tel: string): string {
    if (!tel) return "";
    const clean = tel.replace(/\D/g, "");
    if (clean.length === 9 && clean.startsWith("0")) {
        return `+241 ${clean.slice(1, 3)} ${clean.slice(3, 5)} ${clean.slice(5, 7)} ${clean.slice(7)}`;
    }
    if (clean.length === 8) {
        return `+241 ${clean.slice(0, 2)} ${clean.slice(2, 4)} ${clean.slice(4, 6)} ${clean.slice(6)}`;
    }
    return tel;
}

/**
 * Masque partiellement un numéro de téléphone
 */
export function maskTelephone(tel: string): string {
    if (!tel || tel.length < 4) return tel;
    return tel.slice(0, -4).replace(/\d/g, "•") + tel.slice(-4);
}

/**
 * Génère un ID court unique
 */
export function generateShortId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
}

/**
 * Provinces du Gabon
 */
export const PROVINCES_GABON = [
    "Estuaire",
    "Haut-Ogooué",
    "Moyen-Ogooué",
    "Ngounié",
    "Nyanga",
    "Ogooué-Ivindo",
    "Ogooué-Lolo",
    "Ogooué-Maritime",
    "Woleu-Ntem",
];
