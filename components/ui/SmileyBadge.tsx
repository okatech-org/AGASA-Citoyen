"use client";

import { getSmileyInfo } from "@/lib/smiley";
import { cn } from "@/lib/utils";

interface SmileyBadgeProps {
    score: number;
    className?: string;
}

export default function SmileyBadge({ score, className }: SmileyBadgeProps) {
    const info = getSmileyInfo(score);

    return (
        <div
            className={cn(
                "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-white text-xs font-bold",
                className
            )}
            style={{ backgroundColor: info.couleur }}
        >
            <span>{info.score}/5</span>
            <span>{info.emoji}</span>
        </div>
    );
}
