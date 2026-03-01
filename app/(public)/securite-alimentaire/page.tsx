import Link from "next/link";
import { CheckCircle, ShieldCheck, AlertCircle, AlertTriangle, BookOpen, MessageSquare, Mail, ArrowRight } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import SectionTitle from "@/components/public/SectionTitle";

const AGREMENT_ITEMS = [
    "Contrôle des conditions d'hygiène",
    "Suivi des procédures de conservation",
    "Vérification des pratiques du personnel",
];

const RIGHTS = [
    "Demander l'affichage de l'agrément sanitaire.",
    "Refuser un produit impropre ou suspect.",
    "Signaler anonymement un risque observé.",
    "Consulter les alertes rappels en cours.",
];

const RISKS = [
    { risk: "Produits périmés", detail: "Vérifiez systématiquement les dates limites et l'état de l'emballage avant achat." },
    { risk: "Rupture de la chaîne du froid", detail: "Surveillez la température de conservation pour les produits frais et surgelés." },
    { risk: "Hygiène de manipulation", detail: "Le port d'équipements et la propreté des surfaces réduisent les risques de contamination." },
    { risk: "Traçabilité insuffisante", detail: "L'absence d'information claire sur l'origine ou le lot est un signal de vigilance." },
];

const RESOURCES = [
    { label: "Consulter les manuels pratiques", href: "/manuels", icon: BookOpen },
    { label: "Lire les questions fréquentes", href: "/faq", icon: MessageSquare },
    { label: "Contacter l'équipe AGASA", href: "/contact", icon: Mail },
];

export default function SecuriteAlimentairePage() {
    return (
        <>
            <PageHero
                badge="Éducation citoyenne"
                title="Les bases de la"
                titleAccent="sécurité alimentaire"
                description="Comprenez les exigences sanitaires, identifiez les risques courants et utilisez vos droits pour protéger votre santé."
                primaryAction={{ label: "Consulter les manuels", href: "/manuels" }}
                secondaryAction={{ label: "Voir la FAQ", href: "/faq" }}
            />

            <div className="py-16 lg:py-24 bg-bg-card dark:bg-bg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
                    {/* Agrément */}
                    <div>
                        <SectionTitle
                            eyebrow="Agrément"
                            title="Pourquoi l'agrément sanitaire compte"
                            description="L'agrément confirme qu'un établissement répond à un socle de conformité vérifié par inspection."
                        />
                        <div className="mt-6 space-y-3">
                            {AGREMENT_ITEMS.map((t) => (
                                <div key={t} className="flex items-center gap-3 p-4 rounded-xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border">
                                    <CheckCircle size={18} className="text-emerald-500 shrink-0" />
                                    <span className="text-sm text-text dark:text-text font-medium">{t}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Droits */}
                    <div>
                        <SectionTitle
                            eyebrow="Droits"
                            title="Vos droits comme consommateur"
                            description="Un consommateur informé améliore la prévention collective."
                        />
                        <div className="mt-6 grid sm:grid-cols-2 gap-3">
                            {RIGHTS.map((r) => (
                                <div key={r} className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                                    <ShieldCheck size={18} className="text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                                    <span className="text-sm text-text dark:text-text">{r}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Risques */}
                    <div>
                        <SectionTitle
                            eyebrow="Vigilance"
                            title="Risques fréquemment observés"
                            description="Ces situations demandent une attention particulière lors de l'achat ou de la consommation."
                        />
                        <div className="mt-6 space-y-3">
                            {RISKS.map((r) => (
                                <div key={r.risk} className="p-5 rounded-xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border">
                                    <h4 className="font-semibold text-text dark:text-text mb-1 flex items-center gap-2">
                                        <AlertCircle size={16} className="text-amber-500" /> {r.risk}
                                    </h4>
                                    <p className="text-sm text-text-muted dark:text-text-muted">{r.detail}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Warning */}
                    <div className="p-5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                        <div className="flex items-start gap-3">
                            <AlertTriangle size={18} className="text-amber-600 mt-0.5 shrink-0" />
                            <div>
                                <p className="text-sm font-semibold text-amber-800 dark:text-amber-200 mb-1">Sources et limites</p>
                                <p className="text-sm text-amber-700 dark:text-amber-300/80">
                                    Cette page fournit une information de prévention générale. Elle ne remplace pas un avis médical ni les textes réglementaires officiels. Les données peuvent évoluer après de nouvelles inspections.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Ressources */}
                    <div>
                        <h3 className="font-serif text-lg font-bold text-text dark:text-text mb-4">Ressources utiles</h3>
                        <div className="grid sm:grid-cols-3 gap-3">
                            {RESOURCES.map((r) => (
                                <Link
                                    key={r.href}
                                    href={r.href}
                                    className="group flex items-center gap-3 p-4 rounded-xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border hover:bg-white dark:hover:bg-bg-card hover:shadow-md transition-all text-left"
                                >
                                    <r.icon size={18} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    <span className="text-sm text-text dark:text-text font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{r.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8">
                        <h2 className="font-serif text-2xl font-bold text-text dark:text-text mb-3">Contribuez à une alimentation plus sûre</h2>
                        <p className="text-text-muted dark:text-text-muted mb-6">Vérifiez un établissement avant consommation ou signalez une situation à risque.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                href="/scanner"
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold shadow-lg hover:-translate-y-0.5 transition-all"
                            >
                                Vérifier avec le scanner <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/signaler"
                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-border dark:border-border text-text dark:text-text font-semibold hover:border-red-300 transition-all"
                            >
                                🚨 Faire un signalement
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
