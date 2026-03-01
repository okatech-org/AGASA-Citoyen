"use client";

import { useState, useMemo } from "react";
import { Search, X, Clock, BookOpen, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ============================================
// MANUELS — Fiches éducatives sécurité alimentaire
// Catégories, recherche, illustrations emoji
// Slugs alignés avec [slug]/page.tsx
// ============================================

const CATEGORIES = [
    { id: "all", label: "Toutes", emoji: "📚" },
    { id: "hygiene", label: "Hygiène", emoji: "🧼" },
    { id: "conservation", label: "Conservation", emoji: "🧊" },
    { id: "achat", label: "Achat", emoji: "🛒" },
    { id: "preparation", label: "Préparation", emoji: "🍳" },
    { id: "dates_peremption", label: "Dates", emoji: "📋" },
    { id: "sante", label: "Santé", emoji: "🏥" },
];

const FICHES = [
    {
        slug: "manipulation-manioc",
        titre: "Manipulation sûre du manioc",
        description: "Le manioc amer contient des composés cyanogènes qui peuvent provoquer un empoisonnement grave si le produit n'est pas correctement préparé. Apprenez les bonnes pratiques.",
        categorie: "preparation",
        emoji: "🌾",
        tempsLecture: 5,
        difficulte: "important",
        couleur: "from-amber-500 to-orange-600",
        bgLight: "bg-amber-50",
        points: ["Éplucher et laver abondamment le manioc", "Tremper 24 à 48 heures minimum", "Cuire à haute température (> 100°C)", "Ne jamais consommer cru"],
    },
    {
        slug: "conservation-poisson",
        titre: "Conservation du poisson",
        description: "Le poisson est l'un des aliments les plus périssables. Au Gabon, avec les températures élevées, la rupture de la chaîne du froid est un risque majeur.",
        categorie: "conservation",
        emoji: "🐟",
        tempsLecture: 5,
        difficulte: "moyen",
        couleur: "from-cyan-400 to-teal-600",
        bgLight: "bg-cyan-50",
        points: ["Yeux clairs et brillants = poisson frais", "Conserver au frigo dans les 30 minutes", "Consommer dans les 24h ou congeler", "Ne jamais recongeler un poisson décongelé"],
    },
    {
        slug: "conservation-domicile",
        titre: "Conservation des aliments au domicile",
        description: "La bonne conservation des aliments au domicile est la première barrière contre les toxi-infections alimentaires. Adoptez les bons réflexes.",
        categorie: "conservation",
        emoji: "🏡",
        tempsLecture: 4,
        difficulte: "facile",
        couleur: "from-blue-400 to-blue-600",
        bgLight: "bg-blue-50",
        points: ["Frigo entre 0°C et 4°C", "Séparer cru et cuit", "Restes au frigo dans les 2h", "Ne jamais recongeler un aliment décongelé"],
    },
    {
        slug: "hygiene-rue",
        titre: "Hygiène de l'alimentation de rue",
        description: "La nourriture de rue est un élément essentiel de la culture gabonaise. Apprenez à repérer un étal propre et sain pour vous protéger.",
        categorie: "hygiene",
        emoji: "🍢",
        tempsLecture: 4,
        difficulte: "facile",
        couleur: "from-green-400 to-emerald-600",
        bgLight: "bg-green-50",
        points: ["Cuisinier avec des gants ou ustensiles propres", "Aliments cuits devant vous", "Point d'eau pour lavage des mains", "Agrément AGASA (QR code visible)"],
    },
    {
        slug: "lavage-fruits-legumes",
        titre: "Lavage des fruits et légumes",
        description: "Les fruits et légumes peuvent être contaminés par des pesticides, bactéries ou parasites. Un lavage correct élimine la majorité de ces contaminants.",
        categorie: "hygiene",
        emoji: "🥬",
        tempsLecture: 4,
        difficulte: "facile",
        couleur: "from-lime-400 to-green-600",
        bgLight: "bg-lime-50",
        points: ["Laver TOUS les fruits, même ceux qu'on épluche", "Frotter 30 secondes sous l'eau courante", "Tremper les feuilles dans l'eau vinaigrée", "Sécher avec un tissu propre"],
    },
    {
        slug: "dlc-dluo",
        titre: "DLC vs DLUO : comprendre les dates",
        description: "\"À consommer avant le...\" ou \"de préférence avant le...\" : ces deux mentions n'ont PAS la même signification. Apprenez à ne plus confondre.",
        categorie: "dates_peremption",
        emoji: "📋",
        tempsLecture: 4,
        difficulte: "facile",
        couleur: "from-violet-400 to-purple-600",
        bgLight: "bg-violet-50",
        points: ["DLC = IMPÉRATIF, ne pas dépasser", "DLUO = INDICATIF, qualité peut baisser", "Vérifier les dates avant d'acheter", "En cas de doute sur un produit frais : jeter"],
    },
    {
        slug: "intoxication-alimentaire",
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
        slug: "bien-choisir-restaurant",
        titre: "Bien choisir son restaurant au Gabon",
        description: "Comment repérer un établissement qui respecte les normes d'hygiène ? Utilisez le score Smiley AGASA et ces critères simples.",
        categorie: "achat",
        emoji: "🍽️",
        tempsLecture: 3,
        difficulte: "facile",
        couleur: "from-indigo-400 to-blue-600",
        bgLight: "bg-indigo-50",
        points: ["Vérifier le score Smiley AGASA", "Observer la propreté du comptoir", "Vérifier que l'agrément est affiché", "Scanner le QR code de l'établissement"],
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
        <div className="min-h-dvh bg-bg-muted pb-24">
            {/* Header */}
            <div className="bg-white border-b border-border px-4 py-4">
                <div className="flex items-center justify-between mb-3">
                    <div>
                        <h1 className="text-lg font-extrabold text-text tracking-tight">
                            📚 Bonnes pratiques
                        </h1>
                        <p className="text-xs text-text-muted mt-0.5">
                            Protégez votre santé et celle de votre famille
                        </p>
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
                        <BookOpen className="w-3.5 h-3.5 text-emerald" />
                        <span className="text-[11px] font-semibold text-emerald">{FICHES.length} fiches</span>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un sujet..."
                        className="w-full h-11 pl-10 pr-10 rounded-xl bg-bg-muted text-sm text-text placeholder-text-muted border border-border focus:outline-none focus:ring-2 focus:ring-emerald/50 focus:border-emerald transition-all"
                    />
                    {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-muted"><X className="w-4 h-4" /></button>}
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
                                    ? "bg-emerald text-white shadow-sm"
                                    : "bg-bg-muted text-text-muted hover:bg-border"
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
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-bg-muted flex items-center justify-center">
                            <BookOpen className="w-8 h-8 text-text-muted" />
                        </div>
                        <p className="text-sm font-medium text-text-muted">Aucune fiche trouvée</p>
                        <p className="text-xs text-text-muted mt-1">Essayez un autre sujet</p>
                    </div>
                ) : (
                    filteredFiches.map((fiche, index) => {
                        const diff = DIFFICULTE_BADGE[fiche.difficulte];
                        return (
                            <Link
                                key={fiche.slug}
                                href={`/manuels/${fiche.slug}`}
                                className="block bg-white rounded-2xl border border-border/80 overflow-hidden hover:shadow-lg transition-all duration-200 animate-fade-in group"
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
                                    <p className="text-xs text-text-muted leading-relaxed mb-3">
                                        {fiche.description}
                                    </p>

                                    {/* Key points preview */}
                                    <div className={cn("rounded-xl p-3 mb-3", fiche.bgLight)}>
                                        <p className="text-[10px] font-semibold text-text-muted uppercase tracking-wider mb-1.5">Points clés</p>
                                        <ul className="space-y-1">
                                            {fiche.points.slice(0, 3).map((point, j) => (
                                                <li key={j} className="text-xs text-text flex items-start gap-1.5">
                                                    <span className="text-emerald mt-0.5">•</span>
                                                    {point}
                                                </li>
                                            ))}
                                            {fiche.points.length > 3 && (
                                                <li className="text-xs text-text-muted italic">
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
                                            <span className="flex items-center gap-1 text-[10px] text-text-muted">
                                                <Clock className="w-3 h-3" /> {fiche.tempsLecture} min
                                            </span>
                                        </div>
                                        <span className="flex items-center gap-1 text-[11px] text-emerald font-semibold group-hover:gap-2 transition-all">
                                            Lire <ChevronRight className="w-3.5 h-3.5" />
                                        </span>
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
