"use client";

import Link from "next/link";
import { Scan, Eye, AlertTriangle, ChevronRight, BadgeCheck, Zap, ArrowRight, Camera } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import SectionTitle from "@/components/public/SectionTitle";
import SmileyLegend from "@/components/public/SmileyLegend";
import PublicMetricsPanel from "@/components/public/PublicMetricsPanel";
import PublicCtaPanel from "@/components/public/PublicCtaPanel";
import { useInView } from "@/hooks/useInView";

// ==================== TRUST BAR ====================

function TrustBar() {
    const items = [
        { icon: BadgeCheck, text: "Service public gratuit" },
        { icon: BadgeCheck, text: "AGASA — République Gabonaise" },
        { icon: Zap, text: "Données temps réel" },
    ];
    return (
        <section className="py-5 bg-emerald-500/5 dark:bg-emerald-500/5 border-b border-emerald-100 dark:border-emerald-900/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-3">
                    {items.map((it, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                            <it.icon size={16} className="shrink-0" /> {it.text}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==================== HOW IT WORKS ====================

function HomeHowItWorks() {
    const [ref, vis] = useInView();
    const steps = [
        {
            num: "01", icon: Scan, color: "from-blue-500 to-indigo-600",
            title: "Scanner",
            desc: "Scannez le QR code officiel affiché par l'établissement pour accéder instantanément aux données d'hygiène.",
            cta: "Ouvrir le scanner", href: "/scanner",
        },
        {
            num: "02", icon: Eye, color: "from-amber-500 to-orange-500",
            title: "Comprendre",
            desc: "Consultez la note Smiley, le statut de l'agrément et l'historique complet des inspections.",
            cta: "Voir le guide", href: "/comment-ca-marche",
        },
        {
            num: "03", icon: AlertTriangle, color: "from-red-500 to-rose-600",
            title: "Signaler",
            desc: "Envoyez un signalement avec photos si vous constatez un risque sanitaire dans un établissement.",
            cta: "Faire un signalement", href: "/signaler",
        },
    ];

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-bg-card dark:bg-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <SectionTitle
                        eyebrow="Parcours"
                        title="Comment AGASA-Citoyen"
                        titleAccent="fonctionne"
                        description="Un parcours simple en trois étapes conçu pour vous donner l'information en quelques secondes."
                        align="center"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                    {steps.map((s, i) => (
                        <div
                            key={i}
                            className={`group relative transition-all duration-500 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                            style={{ transitionDelay: `${i * 150}ms` }}
                        >
                            {i < 2 && (
                                <div className="hidden md:block absolute top-14 left-[calc(50%+3.5rem)] right-[calc(-50%+3.5rem)] h-[2px] bg-gradient-to-r from-gray-200 dark:from-gray-700 to-transparent" />
                            )}

                            <div className="relative p-8 rounded-3xl bg-bg-muted dark:bg-bg-muted/60 border border-border dark:border-border hover:bg-white dark:hover:bg-gray-800 hover:shadow-xl hover:shadow-emerald-500/5 hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg shrink-0`}>
                                        <s.icon size={24} className="text-white" />
                                    </div>
                                    <span className="font-serif text-5xl font-bold text-gray-100 dark:text-gray-800 select-none">{s.num}</span>
                                </div>
                                <h3 className="font-serif text-xl font-bold text-text dark:text-text mb-3">{s.title}</h3>
                                <p className="text-text-muted dark:text-text-muted leading-relaxed mb-5 flex-1">{s.desc}</p>
                                <Link
                                    href={s.href}
                                    className="group/btn inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors"
                                >
                                    {s.cta}
                                    <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==================== SMILEY SECTION ====================

function HomeSmiley() {
    const [ref, vis] = useInView();
    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-bg-muted dark:bg-bg-muted">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-14 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <SectionTitle
                        eyebrow="Transparence"
                        title="Lecture rapide du score Smiley"
                        description="Le score de 0 à 5 vous donne une vision immédiate du niveau d'hygiène observé lors des contrôles officiels AGASA."
                        align="center"
                    />
                </div>
                <SmileyLegend />
            </div>
        </section>
    );
}

// ==================== INDICATORS ====================

function HomeIndicators() {
    const [ref, vis] = useInView();
    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-16 lg:py-20 bg-bg-card dark:bg-bg">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-12 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <SectionTitle
                        eyebrow="Indicateurs"
                        title="Vue d'ensemble du dispositif citoyen"
                        description="Ces indicateurs se mettent à jour automatiquement lorsque les données sont disponibles."
                        align="center"
                    />
                </div>
                <PublicMetricsPanel />
            </div>
        </section>
    );
}

// ==================== WHY US ====================

const WHY_CARDS = [
    { emoji: "⚡", title: "Instant", desc: "Résultat en 2 secondes après un scan QR" },
    { emoji: "🔒", title: "Données vérifiées", desc: "Données officielles issues des inspections AGASA" },
    { emoji: "🌍", title: "9 provinces", desc: "Couverture progressive de tout le territoire gabonais" },
    { emoji: "📱", title: "Mobile & Desktop", desc: "Accès depuis n'importe quel appareil, sans installation" },
    { emoji: "🆓", title: "100% gratuit", desc: "Service public financé par l'État gabonais" },
    { emoji: "🛡️", title: "Signalement anonyme", desc: "Signalez un risque sanitaire en toute confidentialité" },
];

function HomeWhyUs() {
    const [ref, vis] = useInView();
    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-bg-muted dark:bg-bg-muted">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`text-center mb-16 transition-all duration-600 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <SectionTitle
                        eyebrow="Pourquoi nous"
                        title="Conçu pour les citoyens"
                        titleAccent="gabonais"
                        description="AGASA-Citoyen est la première plateforme numérique publique dédiée à la sécurité alimentaire au Gabon."
                        align="center"
                    />
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {WHY_CARDS.map((c, i) => (
                        <div
                            key={i}
                            className={`group p-6 rounded-2xl bg-white dark:bg-bg-card/60 border border-border dark:border-border hover:shadow-lg hover:shadow-emerald-500/5 hover:-translate-y-1 transition-all duration-300 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                                }`}
                            style={{ transitionDelay: `${i * 80}ms` }}
                        >
                            <span className="text-3xl block mb-3 group-hover:scale-110 transition-transform origin-left">{c.emoji}</span>
                            <h3 className="font-serif text-lg font-bold text-text dark:text-text mb-1.5">{c.title}</h3>
                            <p className="text-sm text-text-muted dark:text-text-muted leading-relaxed">{c.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==================== HOME PAGE ====================

export default function HomePage() {
    return (
        <>
            <PageHero
                badge="Service public AGASA"
                title="Scannez avant"
                titleAccent="de consommer."
                description="AGASA-Citoyen vous aide à vérifier l'hygiène alimentaire en quelques secondes et à agir rapidement en cas de risque. Gratuit, immédiat, officiel."
                primaryAction={{ label: "Ouvrir le scanner", href: "/scanner" }}
                secondaryAction={{ label: "Comment ça marche", href: "/comment-ca-marche" }}
                showPhone
            />
            <TrustBar />
            <HomeHowItWorks />
            <HomeSmiley />
            <HomeIndicators />
            <HomeWhyUs />
            <PublicCtaPanel
                title="Prêt à vérifier un établissement ?"
                description="Ouvrez le scanner pour une vérification immédiate, ou explorez la démo guidée avant de commencer. C'est simple, gratuit et instantané."
                primary={{ href: "/scanner", label: "Lancer le scanner" }}
                secondary={{ href: "/demo", label: "Voir la démo" }}
            />
        </>
    );
}
