export interface FAQItem {
    category: "utilisation" | "anonymat" | "donnees" | "alertes";
    question: string;
    answer: string;
}

export type ContactSujet = "question" | "suggestion" | "support" | "autre";

export interface ContactFormInput {
    nom: string;
    contact: string;
    sujet: ContactSujet;
    message: string;
    website?: string;
}

export interface ContactSubmitResult {
    success: boolean;
    reference: string;
    creeLe: number;
}

export interface PublicMetrics {
    etablissementsActifs: number;
    alertesActives: number;
    signalements30j: number;
    manuelsActifs: number;
    provincesCouvertes: number;
    updatedAt: number;
}
