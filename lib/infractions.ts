// Types d'infractions citoyens — AGASA-Citoyen

export interface TypeInfraction {
    id: string;
    label: string;
    icone: string;
    description: string;
}

export const TYPES_INFRACTIONS: TypeInfraction[] = [
    {
        id: "produits_perimes",
        label: "Produits périmés en vente",
        icone: "🦠",
        description: "Produits dont la date de péremption est dépassée",
    },
    {
        id: "insalubrite",
        label: "Insalubrité des locaux",
        icone: "🪳",
        description: "Locaux sales, présence d'insectes ou de rongeurs",
    },
    {
        id: "absence_agrement",
        label: "Absence d'agrément visible",
        icone: "📋",
        description: "Pas d'agrément AGASA affiché",
    },
    {
        id: "produits_suspects",
        label: "Produits suspects",
        icone: "🍖",
        description: "Goût, odeur ou aspect suspect",
    },
    {
        id: "chaine_froid",
        label: "Rupture chaîne du froid",
        icone: "🧊",
        description: "Produits frais non réfrigérés",
    },
    {
        id: "autre",
        label: "Autre problème",
        icone: "❓",
        description: "Autre type de problème sanitaire",
    },
];

export const INFRACTIONS_MAP = Object.fromEntries(
    TYPES_INFRACTIONS.map((t) => [t.id, t])
);

export function getInfractionLabel(id: string): string {
    return INFRACTIONS_MAP[id]?.label ?? id;
}

export function getInfractionIcone(id: string): string {
    return INFRACTIONS_MAP[id]?.icone ?? "❓";
}
