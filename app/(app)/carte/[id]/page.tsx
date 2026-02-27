"use client";

import { use } from "react";
import { useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Shield, Calendar, Phone, Map, AlertTriangle, Share2 } from "lucide-react";
import SmileyDisplay from "@/components/ui/SmileyDisplay";
import { cn, formatDate } from "@/lib/utils";

// ============================================
// FICHE ÉTABLISSEMENT (/carte/[id])
// Smiley + infos + historique + mini carte + actions
// ============================================

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
const SCORE_COLORS: Record<number, string> = {
    5: "#2E7D32", 4: "#43A047", 3: "#F9A825", 2: "#EF6C00", 1: "#C62828", 0: "#757575",
};

const AGREMENT_DISPLAY: Record<string, { icon: string; text: string; color: string; detail: string }> = {
    valide: { icon: "✅", text: "VALIDE", color: "text-green-600", detail: "Agrément en règle" },
    expire: { icon: "⚠️", text: "EXPIRÉ", color: "text-orange-600", detail: "Agrément expiré" },
    suspendu: { icon: "❌", text: "SUSPENDU", color: "text-red-600", detail: "Agrément suspendu" },
};

const DEMO_DB: Record<string, {
    id: string; nom: string; adresse: string; ville: string; province: string;
    categorie: string; smiley: number; telephone: string;
    agrement: { statut: string; expiration: string };
    derniereInspection: string; historique: number[];
    lat: number; lng: number;
}> = {
    "ETB-LBV-00042": {
        id: "ETB-LBV-00042", nom: "Restaurant Le Palmier", adresse: "Rue des Bananiers",
        ville: "Libreville", province: "Estuaire", categorie: "AS CAT 2 — Restaurant",
        smiley: 4, telephone: "+241 01 72 34 56",
        agrement: { statut: "valide", expiration: "15/09/2028" },
        derniereInspection: "15/01/2026", historique: [3, 3, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        lat: 0.4162, lng: 9.4673,
    },
    "ETB-LBV-00015": {
        id: "ETB-LBV-00015", nom: "Supermarché Géant Prix", adresse: "Boulevard Triomphal",
        ville: "Libreville", province: "Estuaire", categorie: "AS CAT 1 — Grande surface",
        smiley: 5, telephone: "+241 01 44 55 66",
        agrement: { statut: "valide", expiration: "20/06/2029" },
        derniereInspection: "01/02/2026", historique: [4, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 5],
        lat: 0.3924, lng: 9.4543,
    },
    "ETB-LBV-00028": {
        id: "ETB-LBV-00028", nom: "Marché Mont-Bouët", adresse: "Quartier Mont-Bouët",
        ville: "Libreville", province: "Estuaire", categorie: "AS CAT 3 — Marché",
        smiley: 3, telephone: "+241 01 33 22 11",
        agrement: { statut: "valide", expiration: "10/03/2027" },
        derniereInspection: "10/12/2025", historique: [2, 2, 3, 3, 3, 3, 2, 3, 3, 3, 3, 3],
        lat: 0.3980, lng: 9.4380,
    },
    "ETB-POG-00008": {
        id: "ETB-POG-00008", nom: "Boulangerie du Port", adresse: "Avenue du Port",
        ville: "Port-Gentil", province: "Ogooué-Maritime", categorie: "AS CAT 2 — Boulangerie",
        smiley: 4, telephone: "+241 04 55 66 77",
        agrement: { statut: "valide", expiration: "01/12/2027" },
        derniereInspection: "05/01/2026", historique: [3, 3, 3, 4, 4, 4, 4, 3, 4, 4, 4, 4],
        lat: -0.7193, lng: 8.7815,
    },
    "ETB-FCV-00011": {
        id: "ETB-FCV-00011", nom: "Grillade Mama Nyota", adresse: "Centre-ville",
        ville: "Franceville", province: "Haut-Ogooué", categorie: "AS CAT 3 — Grillade",
        smiley: 2, telephone: "+241 06 12 34 56",
        agrement: { statut: "expire", expiration: "30/11/2025" },
        derniereInspection: "20/09/2025", historique: [3, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
        lat: -1.6333, lng: 13.5833,
    },
    "ETB-LAM-00005": {
        id: "ETB-LAM-00005", nom: "Poissonnerie du Lac", adresse: "Bord du lac",
        ville: "Lambaréné", province: "Moyen-Ogooué", categorie: "AS CAT 3 — Poissonnerie",
        smiley: 1, telephone: "+241 07 88 99 00",
        agrement: { statut: "suspendu", expiration: "—" },
        derniereInspection: "01/06/2025", historique: [3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        lat: -0.7000, lng: 10.2333,
    },
};

export default function FicheEtablissementPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const etab = DEMO_DB[id];

    const agr = etab ? AGREMENT_DISPLAY[etab.agrement.statut] || AGREMENT_DISPLAY.valide : null;

    const handleShare = useCallback(async () => {
        if (!etab) return;
        const text = `${etab.nom} — Smiley ${etab.smiley}/5 sur AGASA-Citoyen. Vérifiez avant de manger ! https://agasa-citoyen.ga/carte/${etab.id}`;
        if (navigator.share) {
            try { await navigator.share({ title: etab.nom, text }); } catch { }
        } else {
            await navigator.clipboard.writeText(text);
            alert("Lien copié !");
        }
    }, [etab]);

    if (!etab) {
        return (
            <div className="min-h-dvh bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-3">❓</p>
                    <p className="text-gray-600 font-semibold">Établissement introuvable</p>
                    <Link href="/carte" className="text-sm text-citoyen-green mt-2 block">← Retour à la carte</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dvh bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
                <Link href="/carte" className="text-gray-500"><ArrowLeft className="w-5 h-5" /></Link>
                <h1 className="text-sm font-bold text-gray-900 truncate">🏢 {etab.nom}</h1>
            </div>

            <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
                {/* Establishment info */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-2">
                    <h2 className="text-lg font-bold text-gray-900">🏢 {etab.nom}</h2>
                    <p className="text-sm text-gray-500 flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 flex-shrink-0" /> {etab.adresse}, {etab.ville} ({etab.province})
                    </p>
                    <p className="text-sm text-gray-500">📋 {etab.categorie}</p>
                </div>

                {/* Smiley */}
                <div className="bg-white rounded-2xl p-6 border border-gray-100 text-center">
                    <SmileyDisplay score={etab.smiley} size="lg" animate />
                </div>

                {/* Details */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100 space-y-3">
                    <div className={cn("flex items-center gap-2 text-sm font-semibold", agr!.color)}>
                        <Shield className="w-4 h-4" /> {agr!.icon} Agrément : {agr!.text}
                        {etab.agrement.expiration !== "—" && ` — Expire le ${etab.agrement.expiration}`}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" /> 📅 Dernière inspection : {etab.derniereInspection}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" /> 📞 {etab.telephone}
                    </div>
                </div>

                {/* History */}
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                    <h3 className="text-sm font-bold text-gray-900 mb-3">📈 Évolution du Smiley (12 mois)</h3>
                    <div className="flex items-end gap-1">
                        {etab.historique.map((score, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1">
                                <div
                                    className="w-full rounded-t min-h-[8px]"
                                    style={{
                                        height: `${(score / 5) * 60}px`,
                                        backgroundColor: SCORE_COLORS[score],
                                        opacity: 0.7 + (i / 12) * 0.3,
                                    }}
                                />
                                <span className="text-[9px] text-gray-400">{MONTHS[i]}</span>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] text-gray-400 mt-2">
                        {etab.historique[11] > etab.historique[0] ? "📈 Amélioration" : etab.historique[11] < etab.historique[0] ? "📉 Dégradation" : "→ Stable"} sur la période
                    </p>
                </div>

                {/* Mini map placeholder */}
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="h-40 relative" style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 100%)" }}>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg", `bg-green-${etab.smiley >= 4 ? "600" : "500"}`)}>
                                {etab.smiley}
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-white/80 px-1.5 py-0.5 rounded text-[8px] text-gray-500">© OpenStreetMap</div>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                    <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${etab.lat},${etab.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full h-12 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-100 transition-colors"
                    >
                        <Map className="w-4 h-4" /> 📍 Itinéraire (Google Maps)
                    </a>
                    <Link
                        href={`/signaler?etablissement=${etab.id}`}
                        className="flex items-center justify-center gap-2 w-full h-12 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition-colors"
                    >
                        <AlertTriangle className="w-4 h-4" /> 🚨 Signaler un problème
                    </Link>
                    <button
                        onClick={handleShare}
                        className="flex items-center justify-center gap-2 w-full h-12 bg-citoyen-green/10 text-citoyen-green rounded-xl text-sm font-semibold hover:bg-citoyen-green/20 transition-colors"
                    >
                        <Share2 className="w-4 h-4" /> 📤 Partager
                    </button>
                </div>
            </div>
        </div>
    );
}
