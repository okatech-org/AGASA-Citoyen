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
    recu: { label: "📬 Reçu", color: "bg-gray-100 text-gray-600" },
    verification: { label: "🔍 En vérification", color: "bg-blue-100 text-blue-700" },
    inspection: { label: "📋 Inspection programmée", color: "bg-orange-100 text-orange-700" },
    resolu: { label: "✅ Résolu", color: "bg-green-100 text-green-700" },
    rejete: { label: "❌ Rejeté", color: "bg-red-100 text-red-700" },
};

const DEMO_SIGNALEMENTS = [
    {
        ref: "SIG-2026-000046", type: "produits_perimes", emoji: "🦠", label: "Produits périmés",
        lieu: "Marché Mont-Bouët", date: Date.now() - 86400000 * 2, statut: "inspection",
        stepIndex: 2,
    },
    {
        ref: "SIG-2026-000039", type: "insalubrite", emoji: "🪳", label: "Insalubrité",
        lieu: "Grillade Mama Nyota", date: Date.now() - 86400000 * 8, statut: "resolu",
        stepIndex: 3,
    },
    {
        ref: "SIG-2026-000031", type: "chaine_froid", emoji: "🧊", label: "Rupture chaîne du froid",
        lieu: "Poissonnerie du Lac", date: Date.now() - 86400000 * 15, statut: "rejete",
        stepIndex: -1, motifRejet: "Doublon avec SIG-2026-000028",
    },
    {
        ref: "SIG-2026-000025", type: "sans_agrement", emoji: "📋", label: "Absence d'agrément",
        lieu: "Restaurant sans nom, PK5", date: Date.now() - 86400000 * 22, statut: "verification",
        stepIndex: 1,
    },
];

export default function MesSignalementsPage() {
    return (
        <div className="min-h-dvh bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3">
                <Link href="/scanner" className="text-gray-500"><ArrowLeft className="w-5 h-5" /></Link>
                <h1 className="text-base font-bold text-gray-900">📋 Mes signalements</h1>
            </div>

            <div className="px-4 py-4 space-y-3">
                {DEMO_SIGNALEMENTS.map((sig) => {
                    const badge = STATUS_BADGES[sig.statut];
                    return (
                        <div key={sig.ref} className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-xs text-gray-400 font-mono">{sig.ref}</p>
                                    <p className="text-sm font-semibold text-gray-900 mt-0.5">
                                        {sig.emoji} {sig.label}
                                    </p>
                                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                        📍 {sig.lieu}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", badge.color)}>
                                        {badge.label}
                                    </span>
                                    <p className="text-[10px] text-gray-400 mt-1">{formatRelativeDate(sig.date)}</p>
                                </div>
                            </div>

                            {/* Progress bar — only for non-rejected */}
                            {sig.statut !== "rejete" ? (
                                <div className="flex items-center gap-1">
                                    {STATUS_STEPS.map((s, i) => (
                                        <div key={s.key} className="flex items-center flex-1">
                                            <div className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0",
                                                i <= sig.stepIndex
                                                    ? "bg-citoyen-green text-white"
                                                    : "bg-gray-200 text-gray-400"
                                            )}>
                                                {i <= sig.stepIndex ? "✓" : ""}
                                            </div>
                                            {i < STATUS_STEPS.length - 1 && (
                                                <div className={cn(
                                                    "flex-1 h-0.5 mx-0.5",
                                                    i < sig.stepIndex ? "bg-citoyen-green" : "bg-gray-200"
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
                                <div className="flex text-[8px] text-gray-400">
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
