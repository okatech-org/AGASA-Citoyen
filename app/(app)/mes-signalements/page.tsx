"use client";

import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { cn, formatRelativeDate } from "@/lib/utils";

// ============================================
// MES SIGNALEMENTS — Suivi par le citoyen
// Liste avec barre de progression 4 étapes
// ============================================

const STATUS_STEPS = [
    { key: "recu", label: "Reçu", emoji: "📬" },
    { key: "verification", label: "En vérification", emoji: "🔍" },
    { key: "inspection", label: "Inspection", emoji: "📋" },
    { key: "resolu", label: "Résolu", emoji: "✅" },
];

const STATUS_BADGES: Record<string, { label: string; color: string }> = {
    recu: { label: "📬 Reçu", color: "bg-bg-muted text-text-muted" },
    verification: { label: "🔍 En vérification", color: "bg-blue-100 text-blue-700" },
    inspection: { label: "📋 Inspection programmée", color: "bg-orange-100 text-orange-700" },
    resolu: { label: "✅ Résolu", color: "bg-green-100 text-green-700" },
    rejete: { label: "❌ Rejeté", color: "bg-red-100 text-red-700" },
};

const CATEGORY_BADGES: Record<string, { label: string; emoji: string; color: string }> = {
    consommateur: { label: "Consommateur", emoji: "🛒", color: "bg-blue-50 text-blue-600" },
    intoxication_alimentaire: { label: "Intoxication", emoji: "🤢", color: "bg-red-50 text-red-600" },
    utilisation_pesticides: { label: "Pesticides", emoji: "🧪", color: "bg-amber-50 text-amber-600" },
    nutrivigilance: { label: "Nutrivigilance", emoji: "⚕️", color: "bg-purple-50 text-purple-600" },
};

const DEMO_SIGNALEMENTS = [
    {
        ref: "SIG-2026-000046", type: "produits_perimes", emoji: "🦠", label: "Produits périmés",
        lieu: "Marché Mont-Bouët", date: Date.now() - 86400000 * 2, statut: "inspection",
        stepIndex: 2, categorie: "consommateur",
    },
    {
        ref: "SIG-2026-000039", type: "nausees_vomissements", emoji: "🤮", label: "Nausées / Vomissements",
        lieu: "Grillade Mama Nyota", date: Date.now() - 86400000 * 8, statut: "resolu",
        stepIndex: 3, categorie: "intoxication_alimentaire",
    },
    {
        ref: "SIG-2026-000031", type: "irritation_cutanee", emoji: "🖐️", label: "Irritation cutanée",
        lieu: "Exploitation agricole PK12", date: Date.now() - 86400000 * 15, statut: "rejete",
        stepIndex: -1, motifRejet: "Informations insuffisantes", categorie: "utilisation_pesticides",
    },
    {
        ref: "SIG-2026-000025", type: "complement_alimentaire", emoji: "💊", label: "Complément alimentaire",
        lieu: "Pharmacie du Centre, Libreville", date: Date.now() - 86400000 * 22, statut: "verification",
        stepIndex: 1, categorie: "nutrivigilance",
    },
];

export default function MesSignalementsPage() {
    return (
        <div className="min-h-dvh bg-bg-muted pb-20">
            {/* Header */}
            <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3">
                <Link href="/scanner" className="text-text-muted"><ArrowLeft className="w-5 h-5" /></Link>
                <h1 className="text-base font-bold text-text">📋 Mes signalements</h1>
            </div>

            <div className="px-4 py-4 space-y-3">
                {DEMO_SIGNALEMENTS.map((sig) => {
                    const badge = STATUS_BADGES[sig.statut];
                    const catBadge = CATEGORY_BADGES[sig.categorie];
                    return (
                        <div key={sig.ref} className="bg-white rounded-xl border border-border p-4 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-text-muted font-mono">{sig.ref}</p>
                                    <p className="text-sm font-semibold text-text mt-0.5">
                                        {sig.emoji} {sig.label}
                                    </p>
                                    <p className="text-xs text-text-muted flex items-center gap-1 mt-0.5">
                                        📍 {sig.lieu}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", badge.color)}>
                                        {badge.label}
                                    </span>
                                    <p className="text-[10px] text-text-muted mt-1">{formatRelativeDate(sig.date)}</p>
                                </div>
                            </div>

                            {/* Category badge */}
                            {catBadge && (
                                <div className="flex">
                                    <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", catBadge.color)}>
                                        {catBadge.emoji} {catBadge.label}
                                    </span>
                                </div>
                            )}

                            {/* Progress bar — only for non-rejected */}
                            {sig.statut !== "rejete" ? (
                                <div className="flex items-center gap-1">
                                    {STATUS_STEPS.map((s, i) => (
                                        <div key={s.key} className="flex items-center flex-1">
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                i <= sig.stepIndex
                                                    ? "bg-emerald text-white"
                                                    : "bg-border text-text-muted"
                                            )}>
                                                {i <= sig.stepIndex ? "✓" : ""}
                                            </div>
                                            {i < STATUS_STEPS.length - 1 && (
                                                <div className={cn(
                                                    "flex-1 h-0.5 mx-0.5",
                                                    i < sig.stepIndex ? "bg-emerald" : "bg-border"
                                                )} />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-red-50 rounded-lg p-2 text-xs text-red-600">
                                    Motif : {sig.motifRejet}
                                </div>
                            )}

                            {/* Step labels */}
                            {sig.statut !== "rejete" && (
                                <div className="flex text-[8px] text-text-muted">
                                    {STATUS_STEPS.map((s) => (
                                        <span key={s.key} className="flex-1 text-center">{s.label}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* New signalement CTA */}
                <Link
                    href="/signaler"
                    className="flex items-center justify-center gap-2 w-full h-12 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                    <AlertTriangle className="w-4 h-4" /> Nouveau signalement
                </Link>
            </div>
        </div>
    );
}


