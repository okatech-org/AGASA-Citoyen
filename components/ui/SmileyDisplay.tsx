"use client";

import { cn } from "@/lib/utils";

// ============================================
// SmileyDisplay — Composant Smiley réutilisable
// 6 niveaux : 0 (inconnu) à 5 (excellent)
// ============================================

export interface SmileyConfig {
    score: number;
    emoji: string;
    label: string;
    color: string;
    bgColor: string;
    stars: string;
}

export const SMILEY_LEVELS: Record<number, SmileyConfig> = {
    5: { score: 5, emoji: "😄", label: "Excellent", color: "#2E7D32", bgColor: "bg-green-600", stars: "⭐⭐⭐⭐⭐" },
    4: { score: 4, emoji: "🙂", label: "Bon", color: "#43A047", bgColor: "bg-green-500", stars: "⭐⭐⭐⭐" },
    3: { score: 3, emoji: "😐", label: "Acceptable", color: "#F9A825", bgColor: "bg-yellow-500", stars: "⭐⭐⭐" },
    2: { score: 2, emoji: "😟", label: "À améliorer", color: "#EF6C00", bgColor: "bg-orange-500", stars: "⭐⭐" },
    1: { score: 1, emoji: "😡", label: "Mauvais", color: "#C62828", bgColor: "bg-red-600", stars: "⭐" },
    0: { score: 0, emoji: "❓", label: "Non évalué", color: "#757575", bgColor: "bg-gray-500", stars: "" },
};

interface SmileyDisplayProps {
    score: number;
    size?: "sm" | "md" | "lg" | "xl";
    showLabel?: boolean;
    showStars?: boolean;
    animate?: boolean;
}

const SIZES = {
    sm: { circle: "w-10 h-10", number: "text-lg", label: "text-[10px]", stars: "text-[10px]" },
    md: { circle: "w-16 h-16", number: "text-2xl", label: "text-xs", stars: "text-xs" },
    lg: { circle: "w-24 h-24", number: "text-4xl", label: "text-sm", stars: "text-sm" },
    xl: { circle: "w-36 h-36", number: "text-6xl", label: "text-xl", stars: "text-lg" },
};

export default function SmileyDisplay({ score, size = "md", showLabel = true, showStars = true, animate = false }: SmileyDisplayProps) {
    const config = SMILEY_LEVELS[score] || SMILEY_LEVELS[0];
    const s = SIZES[size];

    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className={cn(
                    "rounded-full flex items-center justify-center text-white font-extrabold shadow-lg",
                    config.bgColor,
                    s.circle,
                    animate && "animate-bounce-in"
                )}
                style={{ backgroundColor: config.color }}
            >
                <span className={s.number}>{config.score}</span>
            </div>
            {showStars && config.stars && (
                <p className={cn(s.stars, "text-center")}>{config.emoji} {config.stars}</p>
            )}
            {showLabel && (
                <p className={cn(s.label, "font-semibold text-center")} style={{ color: config.color }}>
                    {config.label}
                </p>
            )}
        </div>
    );
}
