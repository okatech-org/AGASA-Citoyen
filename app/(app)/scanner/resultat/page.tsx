"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Shield, Calendar, Share2, AlertTriangle, Map } from "lucide-react";
import SmileyDisplay, { SMILEY_LEVELS } from "@/components/ui/SmileyDisplay";
import { cn, formatDate } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// ============================================
// PAGE RÉSULTAT SMILEY — La plus importante
// Smiley GÉANT + infos + historique + actions
// ============================================

// Demo data (sera remplacé par query Convex)
const DEMO_DB: Record<string, {
    id: string; nom: string; adresse: string; ville: string; province: string;
    categorie: string; smiley: number; agrement: { statut: string; expiration?: number };
    derniereInspection: number; historique: number[];
}> = {
    "ETB-LBV-00042": {
        id: "ETB-LBV-00042", nom: "Restaurant Le Palmier", adresse: "Rue des Bananiers",
        ville: "Libreville", province: "Estuaire", categorie: "AS CAT 2 — Restaurant",
        smiley: 4, agrement: { statut: "valide", expiration: Date.now() + 86400000 * 900 },
        derniereInspection: Date.now() - 86400000 * 30,
        historique: [3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    },
    "ETB-LBV-00015": {
        id: "ETB-LBV-00015", nom: "Supermarché Géant Prix", adresse: "Boulevard Triomphal",
        ville: "Libreville", province: "Estuaire", categorie: "AS CAT 1 — Grande surface",
        smiley: 5, agrement: { statut: "valide", expiration: Date.now() + 86400000 * 600 },
        derniereInspection: Date.now() - 86400000 * 15,
        historique: [4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    },
    "ETB-LBV-00028": {
        id: "ETB-LBV-00028", nom: "Marché Mont-Bouët", adresse: "Quartier Mont-Bouët",
        ville: "Libreville", province: "Estuaire", categorie: "AS CAT 3 — Marché",
        smiley: 3, agrement: { statut: "valide", expiration: Date.now() + 86400000 * 200 },
        derniereInspection: Date.now() - 86400000 * 60,
        historique: [2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3],
    },
    "ETB-POG-00008": {
        id: "ETB-POG-00008", nom: "Boulangerie du Port", adresse: "Avenue du Port",
        ville: "Port-Gentil", province: "Ogooué-Maritime", categorie: "AS CAT 2 — Boulangerie",
        smiley: 4, agrement: { statut: "valide", expiration: Date.now() + 86400000 * 400 },
        derniereInspection: Date.now() - 86400000 * 45,
        historique: [3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4],
    },
    "ETB-FCV-00011": {
        id: "ETB-FCV-00011", nom: "Grillade Mama Nyota", adresse: "Centre-ville",
        ville: "Franceville", province: "Haut-Ogooué", categorie: "AS CAT 3 — Grillade",
        smiley: 2, agrement: { statut: "expire", expiration: Date.now() - 86400000 * 30 },
        derniereInspection: Date.now() - 86400000 * 120,
        historique: [3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    },
    "ETB-LAM-00005": {
        id: "ETB-LAM-00005", nom: "Poissonnerie du Lac", adresse: "Bord du lac",
        ville: "Lambaréné", province: "Moyen-Ogooué", categorie: "AS CAT 3 — Poissonnerie",
        smiley: 1, agrement: { statut: "suspendu" },
        derniereInspection: Date.now() - 86400000 * 180,
        historique: [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    },
};

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const SCORE_COLORS: Record<number, string> = {
    5: "#059669", 4: "#10b981", 3: "#F9A825", 2: "#f59e0b", 1: "#f43f5e", 0: "#757575",
};

const AGREMENT_DISPLAY: Record<string, { icon: string; text: string; color: string }> = {
    valide: { icon: "✅", text: "VALIDE", color: "text-green-600" },
    expire: { icon: "⚠️", text: "EXPIRÉ", color: "text-orange-600" },
    suspendu: { icon: "❌", text: "SUSPENDU", color: "text-red-600" },
    aucun: { icon: "⛔", text: "AUCUN", color: "text-text-muted" },
};

function ResultContent() {
    const searchParams = useSearchParams();
    const id = searchParams.get("id");
    const etab = id ? DEMO_DB[id] : null;

    const handleShare = useCallback(async () => {
        if (!etab) return;
        const config = SMILEY_LEVELS[etab.smiley];
        const shareText = `J'ai vérifié ${etab.nom} sur AGASA-Citoyen : Smiley ${etab.smiley}/5 ${config.stars} — ${config.label} ! Téléchargez l'app : https://agasa-citoyen.ga`;

        if (navigator.share) {
            try {
                await navigator.share({ title: `AGASA — ${etab.nom}`, text: shareText });
            } catch { /* user cancelled */ }
        } else {
            await navigator.clipboard.writeText(shareText);
            alert("Lien copié dans le presse-papiers !");
        }
    }, [etab]);

    // QR non reconnu
    if (!etab) {
        return (
            <div className="max-w-md mx-auto px-4 py-12 text-center">
                <div className="w-20 h-20 mx-auto bg-bg-muted rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl">❓</span>
                </div>
                <h1 className="text-xl font-bold text-text mb-2">QR code non reconnu</h1>
                <p className="text-sm text-text-muted mb-1">Ce QR code ne fait pas partie du registre AGASA.</p>
                <p className="text-xs text-text-muted mb-6">Il peut s&apos;agir d&apos;un QR code obsolète ou falsifié.</p>
                <div className="space-y-2">
                    <Link href="/scanner" className="block w-full bg-emerald text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-800 transition-colors">
                        📷 Scanner un autre QR
                    </Link>
                    <Link href="/scanner" className="block w-full bg-bg-muted text-text-muted py-3 rounded-xl text-sm font-medium hover:bg-border transition-colors">
                        🔍 Rechercher par nom
                    </Link>
                </div>
            </div>
        );
    }

    const agrStatus = AGREMENT_DISPLAY[etab.agrement.statut] || AGREMENT_DISPLAY.aucun;

    return (
        <div className="max-w-md mx-auto px-4 pb-8">
            {/* Back */}
            <Link href="/scanner" className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-text py-3 transition-colors">
                <ArrowLeft className="w-4 h-4" /> Retour au scanner
            </Link>

            {/* Smiley Géant */}
            <div className="text-center py-6">
                <SmileyDisplay score={etab.smiley} size="xl" animate />
            </div>

            <hr className="border-border mb-4" />

            {/* Établissement Info */}
            <div className="space-y-2 mb-4">
                <h1 className="text-xl font-bold text-text">🏢 {etab.nom}</h1>
                <p className="text-sm text-text-muted flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 flex-shrink-0" /> {etab.adresse}, {etab.ville} ({etab.province})
                </p>
                <p className="text-sm text-text-muted">📋 {etab.categorie}</p>
            </div>

            {/* Agrément */}
            <div className="bg-bg-muted rounded-xl p-3 mb-3">
                <p className={cn("text-sm font-semibold flex items-center gap-1.5", agrStatus.color)}>
                    <Shield className="w-4 h-4" />
                    {agrStatus.icon} Agrément : {agrStatus.text}
                    {etab.agrement.expiration && ` (expire le ${formatDate(etab.agrement.expiration)})`}
                </p>
            </div>

            {/* Dernière inspection */}
            <div className="bg-bg-muted rounded-xl p-3 mb-5">
                <p className="text-sm text-text-muted flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    📅 Dernière inspection : {formatDate(etab.derniereInspection)}
                </p>
            </div>

            {/* Historique Sparkline */}
            <div className="bg-white rounded-xl border border-border p-4 mb-5">
                <h3 className="text-sm font-bold text-text mb-3">📈 Historique de conformité (12 mois)</h3>
                <div className="flex items-end gap-1">
                    {etab.historique.map((score, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                            <div
                                className="w-full rounded-t min-h-[8px] transition-all"
                                style={{
                                    height: `${(score / 5) * 60}px`,
                                    backgroundColor: SCORE_COLORS[score],
                                    opacity: 0.7 + (i / 12) * 0.3,
                                }}
                            />
                            <span className="text-[9px] text-text-muted">{MONTHS[i]}</span>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between mt-2 text-[10px] text-text-muted">
                    <span>
                        Tendance : {etab.historique[11] > etab.historique[0] ? "↑ Amélioration" : etab.historique[11] < etab.historique[0] ? "↓ Dégradation" : "→ Stable"}
                    </span>
                    <span>{etab.historique[11]}/5 actuel</span>
                </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
                <Link
                    href="/carte"
                    className="flex items-center justify-center gap-2 w-full h-12 bg-bg-muted text-text rounded-xl text-sm font-medium hover:bg-border transition-colors"
                >
                    <Map className="w-4 h-4" /> 🗺️ Voir sur la carte
                </Link>
                <Link
                    href={`/signaler?etablissement=${etab.id}`}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
                >
                    <AlertTriangle className="w-4 h-4" /> 🚨 Signaler un problème
                </Link>
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-emerald/10 text-emerald rounded-xl text-sm font-semibold hover:bg-emerald/20 transition-colors"
                >
                    <Share2 className="w-4 h-4" /> 📤 Partager ce résultat
                </button>
            </div>
        </div>
    );
}

export default function ResultatPage() {
    return (
        <div className="min-h-dvh bg-white">
            <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                    <LoadingSpinner text="Chargement..." />
                </div>
            }>
                <ResultContent />
            </Suspense>
        </div>
    );
}
