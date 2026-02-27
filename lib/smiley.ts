// Smiley utilities — AGASA-Citoyen

export interface SmileyInfo {
    score: number;
    couleur: string;
    texte: string;
    description: string;
    emoji: string;
    etoiles: string;
    etoilesCount: number;
}

export const SMILEY_DATA: Record<number, SmileyInfo> = {
    5: {
        score: 5,
        couleur: "#1B5E20",
        texte: "Excellent",
        description: "Hygiène exemplaire",
        emoji: "😊",
        etoiles: "⭐⭐⭐⭐⭐",
        etoilesCount: 5,
    },
    4: {
        score: 4,
        couleur: "#43A047",
        texte: "Bon",
        description: "Améliorations mineures",
        emoji: "🙂",
        etoiles: "⭐⭐⭐⭐",
        etoilesCount: 4,
    },
    3: {
        score: 3,
        couleur: "#FDD835",
        texte: "Acceptable",
        description: "À surveiller",
        emoji: "😐",
        etoiles: "⭐⭐⭐",
        etoilesCount: 3,
    },
    2: {
        score: 2,
        couleur: "#EF6C00",
        texte: "Insuffisant",
        description: "À éviter",
        emoji: "😟",
        etoiles: "⭐⭐",
        etoilesCount: 2,
    },
    1: {
        score: 1,
        couleur: "#C62828",
        texte: "Mauvais",
        description: "Risque sanitaire",
        emoji: "😡",
        etoiles: "⭐",
        etoilesCount: 1,
    },
    0: {
        score: 0,
        couleur: "#212121",
        texte: "Fermé / Sans agrément",
        description: "Établissement non autorisé",
        emoji: "⛔",
        etoiles: "—",
        etoilesCount: 0,
    },
};

export function getSmileyInfo(score: number): SmileyInfo {
    const clampedScore = Math.max(0, Math.min(5, Math.round(score)));
    return SMILEY_DATA[clampedScore];
}

export function getSmileyColor(score: number): string {
    return getSmileyInfo(score).couleur;
}

export function getSmileyText(score: number): string {
    const info = getSmileyInfo(score);
    return `${info.texte} — ${info.description}`;
}
