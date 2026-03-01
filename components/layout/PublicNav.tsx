"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shield, Camera, Eye, Sun, Moon, Menu, X, ChevronRight } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/", label: "Accueil" },
    { href: "/comment-ca-marche", label: "Comment ça marche" },
    { href: "/securite-alimentaire", label: "Sécurité alimentaire" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
];

export default function PublicNav() {
    const pathname = usePathname();
    const scrolled = useScrolled();
    const [mobileOpen, setMobileOpen] = useState(false);

    const toggleDark = () => {
        document.documentElement.classList.toggle("dark");
    };

    return (
        <header
            className={cn(
                "sticky top-0 z-50 transition-all duration-500",
                scrolled
                    ? "backdrop-blur-xl bg-bg-card/75 dark:bg-bg/75 shadow-[0_4px_30px_rgba(0,0,0,0.06)]"
                    : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-[72px]">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
                            <Shield size={22} className="text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="text-lg font-serif font-bold text-text dark:text-text leading-tight tracking-tight">AGASA-Citoyen</h1>
                            <p className="text-[10px] text-text-muted dark:text-text-muted uppercase tracking-widest -mt-0.5">Sécurité alimentaire</p>
                        </div>
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                    pathname === link.href
                                        ? "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50"
                                        : "text-text-muted dark:text-text-muted hover:text-text dark:hover:text-white hover:bg-gray-100/80 dark:hover:bg-gray-800/50"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={toggleDark}
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-text-muted dark:text-text-muted hover:bg-bg-muted dark:hover:bg-bg-muted transition-colors"
                            aria-label="Basculer mode sombre"
                        >
                            <Sun size={18} className="hidden dark:block" />
                            <Moon size={18} className="block dark:hidden" />
                        </button>
                        <Link
                            href="/demo"
                            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white dark:bg-bg-card border border-border dark:border-border text-text dark:text-text text-sm font-semibold hover:border-emerald-300 dark:hover:border-emerald-700 transition-all"
                        >
                            <Eye size={16} /> Démo
                        </Link>
                        <Link
                            href="/scanner"
                            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <Camera size={16} /> Scanner
                        </Link>
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="lg:hidden w-10 h-10 rounded-xl flex items-center justify-center text-text-muted dark:text-text-muted hover:bg-bg-muted dark:hover:bg-bg-muted transition-colors"
                            aria-label="Menu"
                        >
                            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-bg-card/95 dark:bg-bg/95 backdrop-blur-xl border-t border-border dark:border-border">
                    <div className="p-4 space-y-1">
                        {[...NAV_LINKS, { href: "/demo", label: "Démo" }].map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className={cn(
                                    "block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                                    pathname === link.href
                                        ? "bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400"
                                        : "text-text-muted dark:text-text-muted hover:bg-bg-muted dark:hover:bg-bg-muted"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/scanner"
                            onClick={() => setMobileOpen(false)}
                            className="block w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold text-sm text-center"
                        >
                            📷 Ouvrir le Scanner
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
