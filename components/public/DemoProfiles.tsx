"use client";

import Link from "next/link";
import { ArrowRight, AlertTriangle } from "lucide-react";

const DEMO_PROFILES = [
    {
        role: "Espace Citoyen",
        icon: "👤",
        pseudo: "Citoyen241",
        color: "from-emerald-500 to-green-600",
        desc: "Scanner les QR codes, consulter les notes Smiley et envoyer des signalements.",
        cta: "Entrer en mode citoyen",
        href: "/scanner",
        tags: ["Scanner", "Carte", "Signalements"],
    },
    {
        role: "Espace Modérateur",
        icon: "🔍",
        pseudo: "Sylvie NDONG",
        color: "from-blue-500 to-indigo-600",
        desc: "Vérifier les signalements, prioriser les cas et suivre le traitement opérationnel.",
        cta: "Entrer en mode modérateur",
        href: "/admin",
        tags: ["Validation", "Priorisation", "Suivi"],
    },
    {
        role: "Espace Administrateur",
        icon: "🛡️",
        pseudo: "Patrick ENGONE",
        color: "from-amber-500 to-orange-600",
        desc: "Piloter la plateforme, la configuration globale, les contenus et la supervision.",
        cta: "Entrer en mode admin",
        href: "/admin",
        tags: ["Pilotage", "Configuration", "Audit"],
    },
];

export default function DemoProfiles() {
    return (
        <div className="space-y-8">
            {/* Warning */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-center gap-3 justify-center">
                <AlertTriangle size={18} className="text-amber-600 shrink-0" />
                <p className="text-sm text-amber-700 dark:text-amber-300 font-medium">
                    Données fictives : aucune action effectuée en mode démo n&apos;impacte la production.
                </p>
            </div>

            {/* Profiles */}
            <div id="profils-demo" className="grid md:grid-cols-3 gap-6">
                {DEMO_PROFILES.map((d) => (
                    <div
                        key={d.role}
                        className="group p-6 rounded-2xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                    >
                        <div className="text-center mb-4">
                            <div className="text-4xl mb-2">{d.icon}</div>
                            <h3 className="font-serif text-lg font-bold text-text dark:text-text">{d.role}</h3>
                            <p className="text-xs text-text-muted dark:text-text-muted mt-1">{d.pseudo}</p>
                        </div>
                        <p className="text-sm text-text-muted dark:text-text-muted leading-relaxed mb-4 flex-1">{d.desc}</p>
                        <div className="flex flex-wrap gap-1.5 mb-5">
                            {d.tags.map((t) => (
                                <span
                                    key={t}
                                    className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-gray-700 text-[11px] text-text-muted dark:text-text-muted border border-border dark:border-gray-600 font-medium"
                                >
                                    {t}
                                </span>
                            ))}
                        </div>
                        <Link
                            href={d.href}
                            className={`w-full py-3 rounded-xl bg-gradient-to-r ${d.color} text-white font-semibold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2`}
                        >
                            {d.cta} <ArrowRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
