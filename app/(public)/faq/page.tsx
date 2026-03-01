import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import FAQAccordion from "@/components/public/FAQAccordion";
import { FAQ_ITEMS } from "@/lib/public/faq";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AGASA-Citoyen | FAQ",
    description: "Retrouvez les réponses aux questions fréquentes sur AGASA-Citoyen : utilisation, anonymat, données et alertes.",
};

export default function FAQPage() {
    // JSON-LD for SEO
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQ_ITEMS.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
            },
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <PageHero
                badge="Support"
                title="Questions fréquentes"
                description="Les réponses essentielles pour utiliser AGASA-Citoyen de façon simple et fiable."
                primaryAction={{ label: "Ouvrir le scanner", href: "/scanner" }}
                secondaryAction={{ label: "Nous contacter", href: "/contact" }}
            />

            <div className="py-16 lg:py-24 bg-bg-card dark:bg-bg">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <FAQAccordion />

                    {/* Contact bloc */}
                    <div className="mt-14 p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 text-center">
                        <h3 className="font-serif text-lg font-bold text-text dark:text-text mb-2">
                            Besoin d&apos;une réponse personnalisée ?
                        </h3>
                        <p className="text-sm text-text-muted dark:text-text-muted mb-4">
                            Utilisez le formulaire de contact si votre demande ne figure pas dans la FAQ.
                        </p>
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold text-sm shadow-lg hover:-translate-y-0.5 transition-all"
                        >
                            Contacter AGASA <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
