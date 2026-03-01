import Link from "next/link";
import { Shield, MapPin, Phone, Mail, ArrowRight, BadgeCheck } from "lucide-react";

const NAV_LINKS = [
    { href: "/", label: "Accueil" },
    { href: "/comment-ca-marche", label: "Comment ça marche" },
    { href: "/securite-alimentaire", label: "Sécurité alimentaire" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/demo", label: "Démo" },
];

const RESOURCE_LINKS = [
    { href: "/manuels", label: "Manuels pratiques" },
    { href: "/alertes", label: "Alertes rappels" },
    { href: "/scanner", label: "Scanner QR" },
    { href: "/signaler", label: "Faire un signalement" },
];

export default function Footer() {
    return (
        <footer className="bg-bg-muted dark:bg-bg-muted border-t border-border dark:border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center">
                                <Shield size={20} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-serif font-bold text-text dark:text-text">AGASA-Citoyen</h3>
                                <p className="text-[10px] text-text-muted dark:text-text-muted uppercase tracking-wider">Sécurité alimentaire</p>
                            </div>
                        </div>
                        <p className="text-sm text-text-muted dark:text-text-muted leading-relaxed mb-3">
                            Plateforme citoyenne de sécurité alimentaire de l&apos;Agence Gabonaise de Sécurité Alimentaire.
                        </p>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                            <BadgeCheck size={12} /> Service public officiel
                        </span>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="font-semibold text-text dark:text-text mb-4 text-sm uppercase tracking-wider">Navigation</h4>
                        <ul className="space-y-2.5">
                            {NAV_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-text-muted dark:text-text-muted hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-text dark:text-text mb-4 text-sm uppercase tracking-wider">Ressources</h4>
                        <ul className="space-y-2.5">
                            {RESOURCE_LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-text-muted dark:text-text-muted hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-semibold text-text dark:text-text mb-4 text-sm uppercase tracking-wider">Contact</h4>
                        <ul className="space-y-2.5 text-sm text-text-muted dark:text-text-muted">
                            <li className="flex items-center gap-2"><MapPin size={14} className="shrink-0" /> Libreville, Estuaire</li>
                            <li className="flex items-center gap-2"><Phone size={14} className="shrink-0" /> +241 01 XX XX XX</li>
                            <li className="flex items-center gap-2"><Mail size={14} className="shrink-0" /> contact@agasa.ga</li>
                        </ul>
                        <Link
                            href="/contact"
                            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300"
                        >
                            Envoyer un message <ArrowRight size={14} />
                        </Link>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-border dark:border-border flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-text-muted dark:text-text-muted">© 2026 AGASA — République Gabonaise</p>
                    <p className="text-xs text-text-muted dark:text-text-muted">Fait au 🇬🇦 Gabon pour la sécurité alimentaire</p>
                </div>
            </div>
        </footer>
    );
}
