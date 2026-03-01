import type { FAQItem } from "@/lib/public/types";

export const FAQ_ITEMS: FAQItem[] = [
    {
        category: "utilisation",
        question: "L'application AGASA-Citoyen est-elle gratuite ?",
        answer:
            "Oui. AGASA-Citoyen est un service public gratuit. Aucun abonnement et aucun paiement ne sont requis pour scanner, consulter les fiches et signaler.",
    },
    {
        category: "utilisation",
        question: "Dois-je créer un compte pour scanner un établissement ?",
        answer:
            "Non. Le scan, la consultation de la carte et des ressources sont accessibles sans compte. Le compte reste optionnel pour un suivi personnalisé.",
    },
    {
        category: "utilisation",
        question: "Comment lire le score Smiley ?",
        answer:
            "Le score varie de 0 à 5. 5 indique un niveau d'hygiène excellent, 3 un niveau acceptable avec améliorations, et 0 une situation non conforme.",
    },
    {
        category: "anonymat",
        question: "Mon signalement est-il anonyme ?",
        answer:
            "Oui. Les signalements citoyens sont traités de manière confidentielle par les équipes AGASA. L'établissement concerné n'a pas accès à votre identité.",
    },
    {
        category: "anonymat",
        question: "Quelles informations personnelles sont demandées ?",
        answer:
            "Le minimum nécessaire. Vous pouvez utiliser l'application en mode anonyme. Certaines fonctionnalités avancées peuvent demander un contact volontaire.",
    },
    {
        category: "donnees",
        question: "Les données affichées sont-elles officielles ?",
        answer:
            "Les informations Smiley et d'agrément proviennent des inspections et synchronisations AGASA. En mode démo, les données sont explicitement fictives.",
    },
    {
        category: "donnees",
        question: "Que se passe-t-il quand la connexion est instable ?",
        answer:
            "L'application est conçue pour un contexte réseau variable. Certaines vues utilisent des données de secours et se resynchronisent automatiquement.",
    },
    {
        category: "alertes",
        question: "Comment fonctionnent les alertes produits ?",
        answer:
            "Les alertes rappels sont publiées selon leur niveau d'urgence et leur zone d'impact. Vous pouvez consulter les alertes actives directement dans l'application.",
    },
    {
        category: "alertes",
        question: "Puis-je suivre l'état de mon signalement ?",
        answer:
            "Oui si vous utilisez un compte. Vous pouvez voir les changements d'état, de la réception à la résolution.",
    },
];

export const FAQ_CATEGORY_LABELS: Record<FAQItem["category"], string> = {
    utilisation: "Utilisation",
    anonymat: "Anonymat",
    donnees: "Données",
    alertes: "Alertes",
};
