"use client";

import { useState, useMemo } from "react";
import { Search, X, Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================
// MANUELS — Fiches éducatives sécurité alimentaire
// Catégories, recherche, illustrations emoji
// ============================================

const CATEGORIES = [
    { id: "all", label: "Toutes", emoji: "📚" },
    { id: "hygiene", label: "Hygiène", emoji: "🧼" },
    { id: "conservation", label: "Conservation", emoji: "🧊" },
    { id: "achat", label: "Achat", emoji: "🛒" },
    { id: "preparation", label: "Préparation", emoji: "🍳" },
    { id: "sante", label: "Santé", emoji: "🏥" },
];

const FICHES = [
    {
        id: "fiche-01",
        titre: "Les 5 règles d'or de l'hygiène alimentaire",
        description: "Découvrez les gestes essentiels pour manipuler et préparer vos aliments en toute sécurité. Du lavage des mains à la cuisson, suivez le guide.",
        categorie: "hygiene",
        emoji: "🧼",
        tempsLecture: 3,
        difficulte: "facile",
        couleur: "from-green-400 to-emerald-600",
        bgLight: "bg-green-50",
        points: ["Se laver les mains 20 secondes", "Séparer les aliments crus et cuits", "Cuire à température suffisante", "Réfrigérer rapidement", "Utiliser de l'eau potable"],
    },
    {
        id: "fiche-02",
        titre: "Conserver ses aliments : guide pratique",
        description: "Au frigo, au congélateur ou à température ambiante ? Apprenez les bonnes durées de conservation pour ne jamais risquer une intoxication.",
        categorie: "conservation",
        emoji: "🧊",
        tempsLecture: 5,
        difficulte: "moyen",
        couleur: "from-blue-400 to-blue-600",
        bgLight: "bg-blue-50",
        points: ["Température du frigo : 4°C max", "Ne jamais recongeler un produit décongelé", "Couvrir tous les aliments", "Respecter la chaîne du froid"],
    },
    {
        id: "fiche-03",
        titre: "Reconnaître un aliment périmé ou suspect",
        description: "Changement de couleur, d'odeur, de texture ? Apprenez à détecter les signes d'un aliment qui n'est plus consommable.",
        categorie: "achat",
        emoji: "🔍",
        tempsLecture: 4,
        difficulte: "facile",
        couleur: "from-amber-400 to-orange-600",
        bgLight: "bg-amber-50",
        points: ["Vérifier la DLC et la DLUO", "Sentir : odeur aigre = danger", "Observer : moisissure, changement de couleur", "Toucher : texture visqueuse = à jeter"],
    },
    {
        id: "fiche-04",
        titre: "Cuisiner le poisson en toute sécurité",
        description: "Le poisson est un aliment fragile. Apprenez à le choisir, le conserver et le préparer pour protéger votre famille au Gabon.",
        categorie: "preparation",
        emoji: "🐟",
        tempsLecture: 6,
        difficulte: "moyen",
        couleur: "from-cyan-400 to-teal-600",
        bgLight: "bg-cyan-50",
        points: ["Choisir un poisson aux yeux brillants", "Conserver au frais immédiatement", "Cuire à cœur (63°C minimum)", "Ne pas garder plus de 24h au frigo"],
    },
    {
        id: "fiche-05",
        titre: "Intoxication alimentaire : que faire ?",
        description: "Vomissements, diarrhée, fièvre ? Identifiez les symptômes d'une intoxication et agissez immédiatement pour protéger votre santé.",
        categorie: "sante",
        emoji: "🏥",
        tempsLecture: 4,
        difficulte: "important",
        couleur: "from-red-400 to-rose-600",
        bgLight: "bg-red-50",
        points: ["S'hydrater abondamment", "Ne pas forcer à manger", "Consulter un médecin si fièvre > 38.5°C", "Garder le produit suspect comme preuve"],
    },
    {
        id: "fiche-06",
        titre: "Bien choisir son restaurant au Gabon",
        description: "Comment repérer un établissement qui respecte les normes d'hygiène ? Utilisez le score Smiley AGASA et ces critères simples.",
        categorie: "achat",
        emoji: "🍽️",
        tempsLecture: 3,
        difficulte: "facile",
        couleur: "from-violet-400 to-purple-600",
        bgLight: "bg-violet-50",
        points: ["Vérifier le score Smiley AGASA", "Observer la propreté du comptoir", "Regarder si l'agrément est affiché", "Scanner le QR code de l'établissement"],
    },
];

const DIFFICULTE_BADGE: Record<string, { label: string; color: string }> = {
    facile: { label: "Facile", color: "bg-green-100 text-green-700" },
    moyen: { label: "Intermédiaire", color: "bg-blue-100 text-blue-700" },
    important: { label: "Important", color: "bg-red-100 text-red-700" },
};

export default function ManuelsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredFiches = useMemo(() => {
        return FICHES.filter((f) => {
            if (selectedCategory !== "all" && f.categorie !== selectedCategory) return false;
            if (searchQuery.length >= 2 && !f.titre.toLowerCase().includes(searchQuery.toLowerCase()) && !f.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
            return true;
        });
    }, [selectedCategory, searchQuery]);

    return (
        <div className="min-h-dvh bg-gray-50 pb-24">
            {/* Header */}
            <div className="bg-white border-b border-gray-100 px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-extrabold text-gray-900 tracking-tight">
                            📚 Bonnes pratiques
                        </h1>
                        <p className="text-xs text-gray-500 mt-0.5">
                            Protégez votre santé et celle de votre famille
                        </p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
                        <BookOpen className="w-3.5 h-3.5 text-citoyen-green" />
                        <span className="text-[11px] font-semibold text-citoyen-green">{FICHES.length} fiches</span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un sujet..."
                        className="w-full h-11 pl-10 pr-10 rounded-xl bg-gray-50 text-sm text-gray-800 placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-citoyen-green/50 focus:border-citoyen-green transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X className="w-4 h-4" /></button>}
                </div>

                {/* Category filters */}
                <div className="flex gap-2 overflow-x-auto scrollbar-none">
                    {CATEGORIES.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={cn(
                                "flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200",
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

            {/* Fiches list */}
            <div className="px-4 py-4 space-y-3">
                {filteredFiches.length === 0 ? (
                    <div className="text-center py-16 animate-fade-in">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-gray-300" />
                        </div>
                        <p className="text-sm font-medium text-gray-400">Aucune fiche trouvée</p>
                        <p className="text-xs text-gray-300 mt-1">Essayez un autre sujet</p>
                    </div>
                ) : (
                    filteredFiches.map((fiche, index) => {
                        const diff = DIFFICULTE_BADGE[fiche.difficulte];
                        return (
                            <div
                                key={fiche.id}
                                className="bg-white rounded-2xl border border-gray-100/80 overflow-hidden hover:shadow-lg transition-all duration-200 animate-fade-in group"
                                style={{ animationDelay: `${index * 0.06}s` }}
                            >
                                {/* Gradient header */}
                                <div className={cn("bg-gradient-to-r p-4 flex items-center gap-3", fiche.couleur)}>
                                    <span className="text-3xl">{fiche.emoji}</span>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-bold text-sm leading-snug">
                                            {fiche.titre}
                                        </h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <p className="text-xs text-gray-600 leading-relaxed mb-3">
                                        {fiche.description}
                                    </p>

                                    {/* Key points preview */}
                                    <div className={cn("rounded-xl p-3 mb-3", fiche.bgLight)}>
                                        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Points clés</p>
                                        <ul className="space-y-1">
                                            {fiche.points.slice(0, 3).map((point, j) => (
                                                <li key={j} className="text-xs text-gray-700 flex items-start gap-1.5">
                                                    <span className="text-citoyen-green mt-0.5">•</span>
                                                    {point}
                                                </li>
                                            ))}
                                            {fiche.points.length > 3 && (
                                                <li className="text-xs text-gray-400 italic">
                                                    +{fiche.points.length - 3} autres conseils...
                                                </li>
                                            )}
                                        </ul>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className={cn("text-[10px] font-medium px-2 py-0.5 rounded-full", diff.color)}>
                                                {diff.label}
                                            </span>
                                            <span className="flex items-center gap-1 text-[10px] text-gray-400">
                                                <Clock className="w-3 h-3" /> {fiche.tempsLecture} min
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1 text-[11px] text-citoyen-green font-semibold group-hover:gap-2 transition-all">
                                            Lire <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
