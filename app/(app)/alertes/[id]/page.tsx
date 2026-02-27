"use client";

import { use, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// DÉTAIL ALERTE — Page complète
// Motif, Que faire, Zone, Partage
// ============================================

const URGENCE_DISPLAY: Record<string, { label: string; color: string; bg: string }> = {
    critique: { label: "🔴 ALERTE CRITIQUE", color: "text-red-700", bg: "bg-red-50 border-red-200" },
    importante: { label: "🟠 ALERTE IMPORTANTE", color: "text-orange-700", bg: "bg-orange-50 border-orange-200" },
    moderee: { label: "🟡 ALERTE MODÉRÉE", color: "text-yellow-700", bg: "bg-yellow-50 border-yellow-200" },
    information: { label: "🔵 INFORMATION", color: "text-blue-700", bg: "bg-blue-50 border-blue-200" },
};

const DEMO_ALERTES: Record<string, {
    id: string; urgence: string; titre: string; lot: string; marque: string;
    motif: string; motifDetail: string;
    queFaire: string[];
    zone: string; dateEmission: string; source: string; statut: string;
}> = {
    "ALE-2026-001": {
        id: "ALE-2026-001", urgence: "critique",
        titre: "Rappel : Lait concentré \"Marque X\"",
        lot: "2026A-FR-1234", marque: "Marque X",
        motif: "Contamination par Listeria monocytogenes",
        motifDetail: "Contamination par Listeria monocytogenes détectée lors d'un contrôle de routine au laboratoire de l'AGASA.",
        queFaire: [
            "Ne consommez pas ce produit",
            "Rapportez-le au magasin pour remboursement",
            "Si vous l'avez consommé et avez des symptômes, consultez un médecin",
        ],
        zone: "National (tout le Gabon)", dateEmission: "26/02/2026", source: "AGASA / Laboratoire LAA", statut: "active",
    },
    "ALE-2026-002": {
        id: "ALE-2026-002", urgence: "importante",
        titre: "Retrait : Jus d'ananas \"Tropical\"",
        lot: "MAR-2026-4567", marque: "Tropical",
        motif: "Concentration en sucre hors norme",
        motifDetail: "Concentration en sucre dépassant de 40% la norme maximale autorisée, détectée lors d'un contrôle aléatoire.",
        queFaire: [
            "Rapportez le produit au magasin pour remboursement",
            "Si vous avez des doutes sur votre santé, consultez un professionnel",
        ],
        zone: "Estuaire", dateEmission: "25/02/2026", source: "AGASA / Contrôle qualité", statut: "active",
    },
    "ALE-2026-003": {
        id: "ALE-2026-003", urgence: "moderee",
        titre: "Précaution : Farine de manioc",
        lot: "Y-2025-8901", marque: "Farine Nationale",
        motif: "Taux de cyanure légèrement supérieur à la norme",
        motifDetail: "Le lot testé présente un taux de cyanure de 12 mg/kg contre 10 mg/kg maximum autorisé. Le risque est faible mais une précaution est recommandée.",
        queFaire: [
            "Faites tremper le produit 48h avant utilisation",
            "Cuisez toujours à haute température (>100°C)",
            "Ne consommez pas cru",
        ],
        zone: "National (tout le Gabon)", dateEmission: "23/02/2026", source: "AGASA", statut: "active",
    },
    "ALE-2026-004": {
        id: "ALE-2026-004", urgence: "information",
        titre: "Avis : Contrôle renforcé sur poulets importés",
        lot: "N/A", marque: "Divers",
        motif: "Vérification des normes d'importation en cours",
        motifDetail: "Suite à des alertes internationales, l'AGASA renforce les contrôles sur les poulets importés. Aucun problème détecté à ce jour au Gabon.",
        queFaire: [
            "Aucune action requise pour le consommateur",
            "Continuez à vérifier les dates de péremption",
            "Privilégiez les produits locaux certifiés",
        ],
        zone: "National (tout le Gabon)", dateEmission: "21/02/2026", source: "AGASA / Direction des importations", statut: "active",
    },
    "ALE-2026-005": {
        id: "ALE-2026-005", urgence: "critique",
        titre: "Rappel : Conserves de thon \"OcéanPlus\"",
        lot: "12-2025-3456", marque: "OcéanPlus",
        motif: "Présence de fragment métallique dans le lot",
        motifDetail: "Fragments métalliques microscopiques détectés dans 3 boîtes du lot. Risque de blessure buccale ou digestive.",
        queFaire: [
            "Ne consommez pas ce produit",
            "Rapportez-le immédiatement au magasin",
            "Si vous l'avez consommé et ressentez une gêne, contactez le SAMU",
        ],
        zone: "Estuaire, Ogooué-Maritime", dateEmission: "19/02/2026", source: "AGASA / Laboratoire LAA", statut: "resolue",
    },
};

export default function AlerteDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const alerte = DEMO_ALERTES[id];

    const handleShare = useCallback(async () => {
        if (!alerte) return;
        const text = `⚠️ AGASA — ${alerte.titre}. ${alerte.motif}. Zone : ${alerte.zone}. https://agasa-citoyen.ga/alertes/${alerte.id}`;
        if (navigator.share) {
            try { await navigator.share({ title: `AGASA Alerte — ${alerte.titre}`, text }); } catch { }
        } else {
            await navigator.clipboard.writeText(text);
            alert("Lien copié !");
        }
    }, [alerte]);

    if (!alerte) {
        return (
            <div className="min-h-dvh bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-3">❓</p>
                    <p className="text-gray-600 font-semibold">Alerte introuvable</p>
                    <Link href="/alertes" className="text-sm text-citoyen-green mt-2 block">← Retour aux alertes</Link>
                </div>
            </div>
        );
    }

    const style = URGENCE_DISPLAY[alerte.urgence];

    return (
        <div className="min-h-dvh bg-white pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
                <Link href="/alertes" className="text-gray-500"><ArrowLeft className="w-5 h-5" /></Link>
                <h1 className="text-sm font-bold text-gray-900 truncate">🔔 Détail alerte</h1>
            </div>

            <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
                {/* Urgency badge */}
                <div className={cn("rounded-xl p-3 border text-center", style.bg)}>
                    <p className={cn("text-base font-bold", style.color)}>{style.label}</p>
                </div>

                {/* Product info */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2">
                    <h2 className="text-lg font-bold text-gray-900">⚠️ {alerte.titre}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Lot : <strong className="text-gray-700">{alerte.lot}</strong></span>
                        <span>Marque : <strong className="text-gray-700">{alerte.marque}</strong></span>
                    </div>
                </div>

                {/* Motif */}
                <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="text-sm font-bold text-gray-800 mb-1">MOTIF :</h3>
                    <p className="text-sm text-gray-600">{alerte.motifDetail}</p>
                </div>

                {/* Que faire */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <h3 className="text-sm font-bold text-red-800 mb-2">🚫 QUE FAIRE :</h3>
                    <ul className="space-y-1.5">
                        {alerte.queFaire.map((item, i) => (
                            <li key={i} className="text-sm text-red-700 flex items-start gap-1.5">
                                <span className="text-red-400 mt-0.5">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Metadata */}
                <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-2 text-sm text-gray-600">
                    <p>📍 Zone concernée : <strong>{alerte.zone}</strong></p>
                    <p>📅 Date d&apos;émission : <strong>{alerte.dateEmission}</strong></p>
                    <p>Source : <strong>{alerte.source}</strong></p>
                </div>

                {/* Status */}
                <div className={cn(
                    "rounded-xl p-3 text-center text-sm font-semibold",
                    alerte.statut === "active" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-600"
                )}>
                    Statut : {alerte.statut === "active" ? "🔴 Active" : "✅ Résolue"}
                </div>

                {/* Share */}
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-citoyen-green/10 text-citoyen-green rounded-xl text-sm font-semibold hover:bg-citoyen-green/20 transition-colors"
                >
                    <Share2 className="w-4 h-4" /> 📤 Partager cette alerte
                </button>
            </div>
        </div>
    );
}
