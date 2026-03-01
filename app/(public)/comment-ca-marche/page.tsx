"use client";

import Link from "next/link";
import { Scan, Star, AlertTriangle, CheckCircle, ChevronRight, ArrowRight } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import SectionTitle from "@/components/public/SectionTitle";
import SmileyLegend from "@/components/public/SmileyLegend";
import { useInView } from "@/hooks/useInView";

const STEPS = [
    {
        title: "Scannez le QR code officiel",
        desc: "Chaque établissement conforme affiche un QR code AGASA. Le scan donne accès à la fiche d'hygiène en quelques secondes.",
        bullets: ["Ouverture rapide depuis mobile", "Résultat immédiat", "Aucune inscription obligatoire"],
        icon: Scan,
        color: "from-blue-500 to-indigo-600",
    },
    {
        title: "Interprétez le score Smiley",
        desc: "Le score Smiley synthétise les points de contrôle : hygiène, conservation, préparation et conformité administrative.",
        bullets: ["Échelle claire de 0 à 5", "Compréhension instantanée", "Même barème sur tout le territoire"],
        icon: Star,
        color: "from-amber-500 to-orange-500",
    },
    {
        title: "Signalez toute anomalie",
        desc: "En cas de risque visible, vous pouvez transmettre un signalement contextualisé pour accélérer la réaction des services AGASA.",
        bullets: ["Transmission encadrée", "Confidentialité du signalement", "Suivi possible avec compte"],
        icon: AlertTriangle,
        color: "from-red-500 to-rose-600",
    },
];

export default function CommentCaMarchePage() {
    const [ref, vis] = useInView();

    return (
        <>
            <PageHero
                badge="Guide d'utilisation"
                title="Comprendre le parcours"
                titleAccent="en 3 étapes"
                description="AGASA-Citoyen est conçu pour un usage quotidien : vérifier vite, décider mieux et signaler de manière responsable."
                primaryAction={{ label: "Tester le scanner", href: "/scanner" }}
                secondaryAction={{ label: "Accéder à la démo", href: "/demo" }}
            />

            {/* Steps section */}
            <section ref={ref as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-bg-card dark:bg-bg">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className={`text-center mb-16 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                        <SectionTitle
                            eyebrow="Étapes"
                            title="Du scan au signalement"
                            description="Chaque étape est pensée pour être claire même avec une connexion limitée."
                            align="center"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {STEPS.map((s, i) => (
                            <div
                                key={i}
                                className={`flex flex-col items-start p-6 rounded-2xl bg-bg-muted dark:bg-bg-muted/60 border border-border dark:border-border transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
                                style={{ transitionDelay: `${i * 120}ms` }}
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg mb-4`}>
                                    <s.icon size={24} className="text-white" />
                                </div>
                                <p className="text-xs font-mono text-text-muted dark:text-text-muted mb-1">ÉTAPE {String(i + 1).padStart(2, "0")}</p>
                                <h3 className="font-serif text-xl font-bold text-text dark:text-text mb-2">{s.title}</h3>
                                <p className="text-sm text-text-muted dark:text-text-muted mb-4 leading-relaxed">{s.desc}</p>
                                <ul className="space-y-1.5 mt-auto">
                                    {s.bullets.map((b, j) => (
                                        <li key={j} className="flex items-center gap-2 text-sm text-text-muted dark:text-text-muted">
                                            <CheckCircle size={15} className="text-emerald-500 shrink-0" /> {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Smiley scale */}
            <section className="py-16 lg:py-20 bg-bg-muted dark:bg-bg-muted">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <SectionTitle
                            eyebrow="Smiley"
                            title="Échelle de lecture officielle"
                            description="La même échelle est utilisée pour faciliter la comparaison entre établissements."
                            align="center"
                        />
                    </div>
                    <SmileyLegend />
                    <p className="text-center text-xs text-text-muted dark:text-text-muted mt-5">
                        Pour plus de détails sur les critères, consultez la page{" "}
                        <Link href="/securite-alimentaire" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                            Sécurité alimentaire
                        </Link>
                        .
                    </p>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 lg:py-20 bg-bg-card dark:bg-bg">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-text dark:text-text mb-3">Passez à l&apos;action</h2>
                    <p className="text-text-muted dark:text-text-muted mb-8 max-w-lg mx-auto">
                        Utilisez le scanner pour vérifier un établissement autour de vous, ou lancez un signalement si nécessaire.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href="/scanner"
                            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            Ouvrir le scanner <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/signaler"
                            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-border dark:border-border text-text dark:text-text font-semibold hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
                        >
                            🚨 Signaler un problème
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
