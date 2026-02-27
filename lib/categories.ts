// Categories d'établissements — AGASA-Citoyen

export interface Categorie {
    id: string;
    label: string;
    icone: string;
    description: string;
}

export const CATEGORIES: Categorie[] = [
    { id: "restaurant", label: "Restaurant", icone: "🍽️", description: "Restaurants et maquis" },
    { id: "boucherie", label: "Boucherie", icone: "🥩", description: "Boucheries et charcuteries" },
    { id: "poissonnerie", label: "Poissonnerie", icone: "🐟", description: "Poissonneries et fruits de mer" },
    { id: "boulangerie", label: "Boulangerie", icone: "🍞", description: "Boulangeries et pâtisseries" },
    { id: "supermarche", label: "Supermarché", icone: "🛒", description: "Supermarchés et grandes surfaces" },
    { id: "epicerie", label: "Épicerie", icone: "🏪", description: "Épiceries et alimentation générale" },
    { id: "transport", label: "Transport", icone: "🚚", description: "Transport alimentaire" },
    { id: "marche", label: "Marché", icone: "🌾", description: "Marchés et étals" },
];

export const CATEGORIES_MAP = Object.fromEntries(
    CATEGORIES.map((c) => [c.id, c])
);

export function getCategorieLabel(id: string): string {
    return CATEGORIES_MAP[id]?.label ?? id;
}

export function getCategorieIcone(id: string): string {
    return CATEGORIES_MAP[id]?.icone ?? "🏢";
}

// Catégories AGASA officielles
export const CATEGORIES_AGASA = [
    { id: "AS_CAT_1", label: "AS CAT 1 — Grande distribution", description: "Supermarchés, importateurs" },
    { id: "AS_CAT_2", label: "AS CAT 2 — Restauration", description: "Restaurants, hôtels, traiteurs" },
    { id: "AS_CAT_3", label: "AS CAT 3 — Commerce de proximité", description: "Épiceries, boucheries, marchés" },
    { id: "TRANSPORT", label: "Transport", description: "Transport de denrées alimentaires" },
];
