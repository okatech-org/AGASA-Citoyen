"use client";

import { Star } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const SMILEY_DATA = [
    { score: 5, color: "#059669", text: "Excellent", detail: "Hygiène exemplaire", emoji: "😄", stars: 5 },
    { score: 4, color: "#10b981", text: "Bon", detail: "Écarts mineurs", emoji: "🙂", stars: 4 },
    { score: 3, color: "#FDD835", text: "Acceptable", detail: "Améliorations attendues", emoji: "😐", stars: 3 },
    { score: 2, color: "#f59e0b", text: "Insuffisant", detail: "Risque modéré", emoji: "😟", stars: 2 },
    { score: 1, color: "#f43f5e", text: "Mauvais", detail: "Risque élevé", emoji: "😠", stars: 1 },
    { score: 0, color: "#212121", text: "Non conforme", detail: "Fermeture ou suspension", emoji: "🚫", stars: 0 },
];

function StarRating({ count }: { count: number }) {
    return (
        <span className="inline-flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={14}
                    className={i <= count ? "fill-amber-400 text-amber-400" : "text-text-muted dark:text-text-muted"}
                />
            ))}
        </span>
    );
}

export default function SmileyLegend() {
    const [ref, visible] = useInView();

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-3 sm:grid-cols-6 gap-5 sm:gap-6">
            {SMILEY_DATA.map((s, i) => (
                <div
                    key={s.score}
                    className={`flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-white dark:bg-bg-card/80 border border-border dark:border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                >
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg mb-5"
                        style={{ backgroundColor: s.color }}
                    >
                        {s.emoji}
                    </div>
                    <span className="font-serif text-3xl font-bold text-text dark:text-text">{s.score}/5</span>
                    <div className="mt-2 mb-3"><StarRating count={s.stars} /></div>
                    <span className="text-sm font-semibold text-text dark:text-text">{s.text}</span>
                    <p className="text-xs text-text-muted dark:text-text-muted mt-1.5">{s.detail}</p>
                </div>
            ))}
        </div>
    );
}
