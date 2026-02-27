"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Search, X, Bell, BellOff, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// ALERTES RAPPELS PRODUITS — Liste filtrée
// Cartes couleur urgence, badges NOUVEAU
// ============================================

const URGENCE_LEVELS = [
    { id: "all", label: "Toutes", emoji: "" },
    { id: "critique", label: "Critique", emoji: "🔴", color: "#C62828" },
    { id: "importante", label: "Importante", emoji: "🟠", color: "#EF6C00" },
    { id: "moderee", label: "Modérée", emoji: "🟡", color: "#F9A825" },
    { id: "information", label: "Info", emoji: "🔵", color: "#1565C0" },
];

const PORTEE_FILTERS = [
    { id: "all", label: "Tout le pays" },
    { id: "zone", label: "Ma zone" },
    { id: "national", label: "National" },
];

const DEMO_ALERTES = [
    {
        id: "ALE-2026-001", urgence: "critique", titre: "Rappel : Lait concentré \"Marque X\" — Lot 2026A",
        motif: "Contamination bactérienne (Listeria)", action: "Ne pas consommer. Rapporter en magasin.",
        zone: "National", dateEmission: Date.now() - 7200000, statut: "active", nouveau: true,
        marque: "Marque X", lot: "2026A-FR-1234",
    },
    {
        id: "ALE-2026-002", urgence: "importante", titre: "Retrait : Jus d'ananas \"Tropical\" — Lot MAR-2026",
        motif: "Concentration en sucre hors norme détectée", action: "Rapporter en magasin pour remboursement.",
        zone: "Estuaire", dateEmission: Date.now() - 86400000, statut: "active", nouveau: true,
        marque: "Tropical", lot: "MAR-2026-4567",
    },
    {
        id: "ALE-2026-003", urgence: "moderee", titre: "Précaution : Farine de manioc — Lot Y-2025",
        motif: "Taux de cyanure légèrement supérieur à la norme", action: "Faire tremper le produit 48h puis cuire à haute température.",
        zone: "National", dateEmission: Date.now() - 86400000 * 3, statut: "active", nouveau: false,
        marque: "Farine Nationale", lot: "Y-2025-8901",
    },
    {
        id: "ALE-2026-004", urgence: "information", titre: "Avis : Contrôle renforcé sur poulets importés",
        motif: "Vérification des normes d'importation en cours", action: "Aucune action requise pour le consommateur.",
        zone: "National", dateEmission: Date.now() - 86400000 * 5, statut: "active", nouveau: false,
        marque: "Divers", lot: "N/A",
    },
    {
        id: "ALE-2026-005", urgence: "critique", titre: "Rappel : Conserves de thon \"OcéanPlus\" — Lot 12-2025",
        motif: "Présence de fragment métallique dans le lot", action: "Ne pas consommer. Rapporter immédiatement.",
        zone: "Estuaire, Ogooué-Maritime", dateEmission: Date.now() - 86400000 * 7, statut: "resolue", nouveau: false,
        marque: "OcéanPlus", lot: "12-2025-3456",
    },
];

const URGENCE_STYLES: Record<string, { border: string; badge: string; badgeText: string; icon: string; bgTint: string }> = {
    critique: { border: "border-l-red-700", badge: "bg-red-100 text-red-800", badgeText: "🔴 CRITIQUE", icon: "bg-red-600", bgTint: "bg-red-50/50" },
    importante: { border: "border-l-orange-600", badge: "bg-orange-100 text-orange-800", badgeText: "🟠 IMPORTANTE", icon: "bg-orange-500", bgTint: "bg-orange-50/50" },
    moderee: { border: "border-l-yellow-500", badge: "bg-yellow-100 text-yellow-800", badgeText: "🟡 MODÉRÉE", icon: "bg-yellow-500", bgTint: "bg-yellow-50/50" },
    information: { border: "border-l-blue-600", badge: "bg-blue-100 text-blue-800", badgeText: "🔵 INFORMATION", icon: "bg-blue-600", bgTint: "bg-blue-50/50" },
};

function formatRelativeTime(ts: number): string {
    const diff = Date.now() - ts;
    if (diff < 3600000) return `il y a ${Math.max(1, Math.floor(diff / 60000))} min`;
    if (diff < 86400000) return `il y a ${Math.floor(diff / 3600000)}h`;
    const days = Math.floor(diff / 86400000);
    if (days === 1) return "hier";
    return `il y a ${days}j`;
}

export default function AlertesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [urgenceFilter, setUrgenceFilter] = useState("all");
    const [porteeFilter, setPorteeFilter] = useState("all");
    const [pushEnabled, setPushEnabled] = useState(false);
    const [showPushBanner, setShowPushBanner] = useState(false);

    // Show push banner on second visit
    useEffect(() => {
        const visits = Number(localStorage.getItem("agasa_alert_visits") || "0");
        localStorage.setItem("agasa_alert_visits", String(visits + 1));
        if (visits >= 1 && !localStorage.getItem("agasa_push_dismissed")) {
            setShowPushBanner(true);
        }
        if (localStorage.getItem("agasa_push_enabled")) setPushEnabled(true);
    }, []);

    const handleEnablePush = () => {
        setPushEnabled(true);
        setShowPushBanner(false);
        localStorage.setItem("agasa_push_enabled", "true");
        localStorage.setItem("agasa_push_dismissed", "true");
    };
    const handleDismissPush = () => {
        setShowPushBanner(false);
        localStorage.setItem("agasa_push_dismissed", "true");
    };

    const filteredAlertes = useMemo(() => {
        return DEMO_ALERTES.filter((a) => {
            if (urgenceFilter !== "all" && a.urgence !== urgenceFilter) return false;
            if (porteeFilter === "national" && !a.zone.includes("National")) return false;
            if (porteeFilter === "zone" && a.zone === "National") return false;
            if (searchQuery.length >= 2 && !a.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !a.marque.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [urgenceFilter, porteeFilter, searchQuery]);

    const newCount = DEMO_ALERTES.filter((a) => a.nouveau).length;

    return (
        <div className="min-h-dvh bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">
                            🔔 Alertes Rappels
                        </h1>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Produits rappelés ou retirés de la vente au Gabon
                        </p>
                    </div>
                    {newCount > 0 && (
                        <span className="bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full animate-pulse shadow-sm">
                            {newCount} NEW
                        </span>
                    )}
                </div>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un produit, une marque..."
                        className="w-full h-11 pl-10 pr-10 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-citoyen-green/50 focus:border-citoyen-green transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                </div>

                {/* Urgency Filters */}
                <div className="mb-2">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Niveau d&apos;urgence</p>
                    <div className="flex gap-1.5 overflow-x-auto scrollbar-none">
                        {URGENCE_LEVELS.map((u) => (
                            <button
                                key={u.id}
                                onClick={() => setUrgenceFilter(u.id)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200",
                                    urgenceFilter === u.id
                                        ? "bg-gray-900 text-white shadow-sm"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {u.emoji} {u.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Scope Filters */}
                <div>
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Portée géographique</p>
                    <div className="flex gap-1.5">
                        {PORTEE_FILTERS.map((p) => (
                            <button
                                key={p.id}
                                onClick={() => setPorteeFilter(p.id)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200",
                                    porteeFilter === p.id
                                        ? "bg-citoyen-green text-white shadow-sm"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                )}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Push notification banner */}
            {showPushBanner && (
                <div className="mx-4 mt-3 glass-card p-4 border border-blue-200/60 animate-slide-down">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <Bell className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-gray-900">Recevez une alerte immédiate</p>
                            <p className="text-xs text-gray-500 mt-0.5">Si un produit dangereux est rappelé dans votre zone.</p>
                            <div className="flex gap-2 mt-3">
                                <button onClick={handleEnablePush} className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm">
                                    🔔 Activer
                                </button>
                                <button onClick={handleDismissPush} className="px-4 py-2 text-gray-500 text-xs font-medium hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors">
                                    Plus tard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Push enabled confirmation */}
            {pushEnabled && !showPushBanner && (
                <div className="mx-4 mt-3 bg-green-50 border border-green-100 rounded-xl p-3 flex items-center gap-2 text-xs text-green-700 animate-fade-in">
                    <Bell className="w-4 h-4" /> ✅ Notifications activées — vous serez alerté en temps réel.
                </div>
            )}

            {/* Alerts list */}
            <div className="px-4 py-3 space-y-3">
                {filteredAlertes.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <BellOff className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">Aucune alerte pour ces filtres</p>
                        <p className="text-xs text-gray-300 mt-1">Essayez de modifier vos critères</p>
                    </div>
                ) : (
                    filteredAlertes.map((alerte, index) => {
                        const style = URGENCE_STYLES[alerte.urgence];
                        return (
                            <Link href={`/alertes/${alerte.id}`} key={alerte.id} className="block animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                                <div className={cn(
                                    "bg-white rounded-2xl border border-gray-100/80 overflow-hidden border-l-4 hover:shadow-lg transition-all duration-200 group",
                                    style.border
                                )}>
                                    <div className="p-4">
                                        {/* Top row */}
                                        <div className="flex items-center justify-between mb-2">
                                            <span className={cn("text-[10px] font-bold px-2.5 py-1 rounded-full", style.badge)}>
                                                {style.badgeText}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                {alerte.nouveau && (
                                                    <span className="bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse shadow-sm">
                                                        NOUVEAU
                                                    </span>
                                                )}
                                                <span className="text-[10px] text-gray-400">{formatRelativeTime(alerte.dateEmission)}</span>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-sm font-bold text-gray-900 mt-1.5 leading-snug">
                                            ⚠️ {alerte.titre}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
                                            Motif : {alerte.motif}
                                        </p>
                                        <p className="text-xs text-red-600 font-semibold mt-1.5 leading-relaxed">
                                            🚫 {alerte.action}
                                        </p>

                                        {/* Bottom */}
                                        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-50">
                                            <span className="text-[11px] text-gray-400 font-medium">📍 {alerte.zone}</span>
                                            <span className="flex items-center gap-1 text-[11px] text-citoyen-green font-semibold group-hover:gap-2 transition-all">
                                                Voir détail <ChevronRight className="w-3.5 h-3.5" />
                                            </span>
                                        </div>

                                        {/* Resolved badge */}
                                        {alerte.statut === "resolue" && (
                                            <div className="mt-2 bg-green-50 rounded-lg px-3 py-1.5 text-[11px] text-green-600 font-semibold">
                                                ✅ Alerte résolue
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        );
                    })
                )}
            </div>
        </div>
    );
}
