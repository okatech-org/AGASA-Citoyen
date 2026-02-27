"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { Search, X, Navigation, Filter } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================
// CARTE INTERACTIVE — Établissements Smiley
// Marqueurs colorés, filtres, recherche, GPS
// ============================================

const CATEGORIES = [
    { id: "all", label: "Tous", emoji: "📍" },
    { id: "restaurant", label: "Restaurants", emoji: "🍽️" },
    { id: "boucherie", label: "Boucheries", emoji: "🥩" },
    { id: "poissonnerie", label: "Poissonneries", emoji: "🐟" },
    { id: "boulangerie", label: "Boulangeries", emoji: "🍞" },
    { id: "supermarche", label: "Supermarchés", emoji: "🛒" },
    { id: "epicerie", label: "Épiceries", emoji: "🏪" },
];

const DISTANCES = [
    { value: 500, label: "500m" },
    { value: 1000, label: "1km" },
    { value: 5000, label: "5km" },
    { value: 99999, label: "Toute la ville" },
];

// Demo establishments with coordinates
const DEMO_ETABS = [
    { id: "ETB-LBV-00042", nom: "Restaurant Le Palmier", adresse: "Rue des Bananiers", ville: "Libreville", categorie: "restaurant", smiley: 4, lat: 0.4162, lng: 9.4673, agrement: "valide", derniereInspection: "15/01/2026" },
    { id: "ETB-LBV-00015", nom: "Supermarché Géant Prix", adresse: "Boulevard Triomphal", ville: "Libreville", categorie: "supermarche", smiley: 5, lat: 0.3924, lng: 9.4543, agrement: "valide", derniereInspection: "01/02/2026" },
    { id: "ETB-LBV-00028", nom: "Marché Mont-Bouët", adresse: "Quartier Mont-Bouët", ville: "Libreville", categorie: "epicerie", smiley: 3, lat: 0.3980, lng: 9.4380, agrement: "valide", derniereInspection: "10/12/2025" },
    { id: "ETB-POG-00008", nom: "Boulangerie du Port", adresse: "Avenue du Port", ville: "Port-Gentil", categorie: "boulangerie", smiley: 4, lat: -0.7193, lng: 8.7815, agrement: "valide", derniereInspection: "05/01/2026" },
    { id: "ETB-FCV-00011", nom: "Grillade Mama Nyota", adresse: "Centre-ville", ville: "Franceville", categorie: "restaurant", smiley: 2, lat: -1.6333, lng: 13.5833, agrement: "expire", derniereInspection: "20/09/2025" },
    { id: "ETB-LAM-00005", nom: "Poissonnerie du Lac", adresse: "Bord du lac", ville: "Lambaréné", categorie: "poissonnerie", smiley: 1, lat: -0.7000, lng: 10.2333, agrement: "suspendu", derniereInspection: "01/06/2025" },
    { id: "ETB-LBV-00055", nom: "Boucherie Halal de l'Estuaire", adresse: "Centre commercial", ville: "Libreville", categorie: "boucherie", smiley: 5, lat: 0.4050, lng: 9.4450, agrement: "valide", derniereInspection: "18/02/2026" },
    { id: "ETB-LBV-00062", nom: "Épicerie Wongo", adresse: "Quartier Glass", ville: "Libreville", categorie: "epicerie", smiley: 3, lat: 0.4200, lng: 9.4300, agrement: "valide", derniereInspection: "22/01/2026" },
    { id: "ETB-LBV-00071", nom: "Restaurant Le Rocher", adresse: "Bord de mer", ville: "Libreville", categorie: "restaurant", smiley: 4, lat: 0.4100, lng: 9.4800, agrement: "valide", derniereInspection: "12/02/2026" },
    { id: "ETB-LBV-00088", nom: "Supermarché Ckdo", adresse: "Centre commercial Okala", ville: "Libreville", categorie: "supermarche", smiley: 4, lat: 0.4300, lng: 9.4100, agrement: "valide", derniereInspection: "08/02/2026" },
];

const SMILEY_COLORS: Record<number, { bg: string; text: string; ring: string; gradient: string }> = {
    5: { bg: "bg-green-600", text: "text-white", ring: "ring-green-300", gradient: "from-green-500 to-green-700" },
    4: { bg: "bg-green-500", text: "text-white", ring: "ring-green-200", gradient: "from-green-400 to-green-600" },
    3: { bg: "bg-yellow-500", text: "text-white", ring: "ring-yellow-200", gradient: "from-yellow-400 to-yellow-600" },
    2: { bg: "bg-orange-500", text: "text-white", ring: "ring-orange-200", gradient: "from-orange-400 to-orange-600" },
    1: { bg: "bg-red-600", text: "text-white", ring: "ring-red-200", gradient: "from-red-500 to-red-700" },
    0: { bg: "bg-gray-500", text: "text-white", ring: "ring-gray-200", gradient: "from-gray-400 to-gray-600" },
};

const SMILEY_LABELS: Record<number, string> = {
    5: "Excellent", 4: "Bon", 3: "Acceptable", 2: "À améliorer", 1: "Mauvais", 0: "Non évalué"
};

const AGREMENT_BADGE: Record<string, { label: string; color: string }> = {
    valide: { label: "✅ Valide", color: "bg-green-100 text-green-700" },
    expire: { label: "⚠️ Expiré", color: "bg-orange-100 text-orange-700" },
    suspendu: { label: "❌ Suspendu", color: "bg-red-100 text-red-700" },
};

export default function CartePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [smiley4Plus, setSmiley4Plus] = useState(false);
    const [selectedDistance, setSelectedDistance] = useState(5000);
    const [selectedEtab, setSelectedEtab] = useState<string | null>(null);

    // Filtered establishments
    const filteredEtabs = useMemo(() => {
        return DEMO_ETABS.filter((e) => {
            if (selectedCategory !== "all" && e.categorie !== selectedCategory) return false;
            if (smiley4Plus && e.smiley < 4) return false;
            if (searchQuery.length >= 2 && !e.nom.toLowerCase().includes(searchQuery.toLowerCase()) && !e.adresse.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [selectedCategory, smiley4Plus, searchQuery, selectedDistance]);

    const activeFilterCount = (selectedCategory !== "all" ? 1 : 0) + (smiley4Plus ? 1 : 0) + (selectedDistance !== 5000 ? 1 : 0);

    const selected = selectedEtab ? DEMO_ETABS.find((e) => e.id === selectedEtab) : null;

    return (
        <div className="min-h-dvh bg-white pb-20 flex flex-col">
            {/* Search + Filters */}
            <div className="sticky top-0 bg-white/90 backdrop-blur-xl z-20 border-b border-gray-100/50">
                {/* Search */}
                <div className="px-4 pt-3 pb-2">
                    <div className="relative">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher un restaurant, une boucherie..."
                            className="w-full h-11 pl-10 pr-10 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-citoyen-green/50 focus:border-citoyen-green transition-all"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Category filters - horizontal scroll */}
                <div className="overflow-x-auto scrollbar-none px-4 pb-2">
                    <div className="flex gap-2 w-max">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={cn(
                                    "flex items-center gap-1 px-3.5 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200",
                                    selectedCategory === cat.id
                                        ? "bg-citoyen-green text-white shadow-sm"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {cat.emoji} {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Extra filters row */}
                <div className="flex items-center gap-2 px-4 pb-2.5">
                    <button
                        onClick={() => setSmiley4Plus(!smiley4Plus)}
                        className={cn(
                            "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                            smiley4Plus ? "bg-yellow-100 text-yellow-700 ring-1 ring-yellow-300 shadow-sm" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                        )}
                    >
                        ⭐ 4+ uniquement
                    </button>
                    <div className="w-px h-4 bg-gray-200 mx-0.5" />
                    {DISTANCES.map((d) => (
                        <button
                            key={d.value}
                            onClick={() => setSelectedDistance(d.value)}
                            className={cn(
                                "px-2.5 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200",
                                selectedDistance === d.value
                                    ? "bg-citoyen-green/10 text-citoyen-green ring-1 ring-citoyen-green/30"
                                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                            )}
                        >
                            {d.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Map Area */}
            <div className="flex-1 relative min-h-[400px]" style={{ background: "linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 30%, #a5d6a7 60%, #81c784 100%)" }}>
                {/* Map tiles simulation */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#666" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                {/* OSM attribution */}
                <div className="absolute bottom-1 right-1 bg-white/80 px-1.5 py-0.5 rounded text-[8px] text-gray-500 z-10">
                    © OpenStreetMap
                </div>

                {/* User position marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-md animate-pulse" />
                    <div className="absolute inset-0 bg-blue-400/30 rounded-full animate-ping" />
                </div>

                {/* Smiley markers */}
                {filteredEtabs.map((etab, i) => {
                    const color = SMILEY_COLORS[etab.smiley];
                    // Spread markers across the visible area
                    const positions = [
                        { top: "20%", left: "30%" }, { top: "35%", left: "65%" }, { top: "55%", left: "25%" },
                        { top: "15%", left: "75%" }, { top: "70%", left: "50%" }, { top: "45%", left: "15%" },
                        { top: "30%", left: "45%" }, { top: "60%", left: "70%" }, { top: "40%", left: "85%" },
                        { top: "75%", left: "35%" },
                    ];
                    const pos = positions[i % positions.length];

                    return (
                        <button
                            key={etab.id}
                            onClick={() => setSelectedEtab(etab.id === selectedEtab ? null : etab.id)}
                            className={cn(
                                "absolute z-10 w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg ring-2 transition-all duration-300 hover:scale-110",
                                `bg-gradient-to-br ${color.gradient}`, color.ring,
                                selectedEtab === etab.id && "scale-125 ring-4 shadow-xl"
                            )}
                            style={{ top: pos.top, left: pos.left, transform: "translate(-50%, -50%)", animationDelay: `${i * 0.05}s` }}
                        >
                            {etab.smiley}
                        </button>
                    );
                })}

                {/* Recenter button */}
                <button className="absolute bottom-4 right-4 z-10 w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center text-citoyen-green hover:bg-gray-50 hover:shadow-xl transition-all">
                    <Navigation className="w-5 h-5" />
                </button>

                {/* Result count */}
                <div className="absolute top-3 left-3 z-10 glass-card px-3.5 py-2 shadow-sm text-xs font-semibold text-gray-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-citoyen-green animate-pulse" />
                    {filteredEtabs.length} établissement{filteredEtabs.length > 1 ? "s" : ""}
                    {activeFilterCount > 0 && (
                        <span className="bg-citoyen-green text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full ml-1">
                            {activeFilterCount} filtre{activeFilterCount > 1 ? "s" : ""}
                        </span>
                    )}
                </div>
            </div>

            {/* Selected establishment popup */}
            {selected && (
                <div className="fixed bottom-24 left-4 right-4 z-30 glass-card shadow-2xl p-4 animate-slide-up border border-white/40">
                    <button onClick={() => setSelectedEtab(null)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100">
                        <X className="w-4 h-4" />
                    </button>

                    <div className="flex items-start gap-3">
                        {/* Smiley badge */}
                        <div className="flex flex-col items-center gap-1">
                            <div className={cn(
                                "w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0 shadow-lg bg-gradient-to-br",
                                SMILEY_COLORS[selected.smiley].gradient
                            )}>
                                {selected.smiley}
                            </div>
                            <span className="text-[10px] font-semibold text-gray-500">
                                {SMILEY_LABELS[selected.smiley]}
                            </span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold text-gray-900 truncate">{selected.nom}</h3>
                            <p className="text-xs text-gray-500 mt-0.5">{selected.adresse}, {selected.ville}</p>
                            <div className="flex items-center gap-2 mt-2 flex-wrap">
                                <span className={cn("text-[10px] px-2 py-0.5 rounded-full font-medium", AGREMENT_BADGE[selected.agrement].color)}>
                                    {AGREMENT_BADGE[selected.agrement].label}
                                </span>
                                <span className="text-[10px] text-gray-400 flex items-center gap-1">📅 {selected.derniereInspection}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-2 mt-4">
                        <Link
                            href={`/carte/${selected.id}`}
                            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 rounded-xl text-xs font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-sm"
                        >
                            📋 Voir la fiche
                        </Link>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${selected.lat},${selected.lng}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-blue-600 py-2.5 rounded-xl text-xs font-semibold hover:bg-blue-100 transition-all"
                        >
                            📍 Itinéraire
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}
