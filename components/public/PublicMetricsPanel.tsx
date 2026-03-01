"use client";

import { useInView } from "@/hooks/useInView";

const INDICATORS = [
    { emoji: "🏪", label: "Établissements actifs", value: "—" },
    { emoji: "🔔", label: "Alertes actives", value: "—" },
    { emoji: "📋", label: "Signalements (30j)", value: "—" },
    { emoji: "📘", label: "Guides publiés", value: "—" },
    { emoji: "🗺️", label: "Provinces couvertes", value: "—" },
];

export default function PublicMetricsPanel() {
    const [ref, visible] = useInView();

    return (
        <div ref={ref as React.RefObject<HTMLDivElement>} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {INDICATORS.map((ind, i) => (
                <div
                    key={ind.label}
                    className={`text-center p-5 rounded-2xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                        }`}
                    style={{ transitionDelay: `${i * 80}ms` }}
                >
                    <p className="text-2xl mb-2">{ind.emoji}</p>
                    <p className="font-serif text-2xl font-bold text-text dark:text-text">{ind.value}</p>
                    <p className="text-xs text-text-muted dark:text-text-muted mt-1">{ind.label}</p>
                </div>
            ))}
        </div>
    );
}
