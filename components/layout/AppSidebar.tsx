"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    Camera,
    Map,
    AlertTriangle,
    Bell,
    BookOpen,
    FileText,
    User,
    ShieldCheck,
    LogOut,
    Sun,
    Moon,
    X,
    HelpCircle,
    Info,
    Phone,
    ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useOptionalAuth } from "@/hooks/useAuth";

// ============================================
// APP SIDEBAR — Premium Neumorphic Design
// Profil utilisateur, navigation, liens utiles
// Mobile slide-in + Desktop permanent
// ============================================

const NAV_ITEMS = [
    { href: "/scanner", label: "Scanner", icon: Camera },
    { href: "/carte", label: "Carte", icon: Map },
    { href: "/signaler", label: "Signaler", icon: AlertTriangle, accent: true },
    { href: "/alertes", label: "Alertes", icon: Bell },
    { href: "/manuels", label: "Manuels", icon: BookOpen },
    { href: "/mes-signalements", label: "Mes signalements", icon: FileText },
    { href: "/profil", label: "Mon profil", icon: User },
];

const USEFUL_LINKS = [
    { href: "#", label: "À propos d'AGASA", icon: Info, color: "text-blue" },
    { href: "#", label: "FAQ", icon: HelpCircle, color: "text-amber-500" },
    { href: "#", label: "Contact", icon: Phone, color: "text-emerald" },
];

interface AppSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
    const pathname = usePathname();
    const router = useRouter();
    const { user, isAuthenticated } = useOptionalAuth();
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        setIsDark(document.documentElement.classList.contains("dark"));
    }, []);

    const toggleTheme = useCallback(() => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            setIsDark(true);
        }
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem("agasa-session-token");
        localStorage.removeItem("agasa-demo-profil");
        window.location.href = "/";
    }, []);

    const handleNavClick = useCallback(() => {
        if (onClose) onClose();
    }, [onClose]);

    // User profile info
    const initials = user?.pseudo
        ? user.pseudo.slice(0, 2).toUpperCase()
        : user?.telephone
            ? user.telephone.slice(-2)
            : "AG";

    const userName = user?.pseudo || "Citoyen";
    const userRole = user?.role === "admin_systeme" ? "Administrateur"
        : user?.role === "moderateur" ? "Modérateur"
            : user?.role === "demo" ? "Mode Démo"
                : "Citoyen";

    return (
        <>
            {/* ── Mobile Overlay ── */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden overlay-enter"
                    onClick={onClose}
                />
            )}

            {/* ── Sidebar ── */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 flex flex-col",
                    "bg-white dark:bg-bg",
                    "border-r border-border/60 dark:border-border",
                    "transition-transform duration-300 ease-in-out",
                    // Desktop: always visible
                    "lg:relative lg:translate-x-0 lg:shadow-none",
                    // Mobile: slide in/out
                    isOpen
                        ? "translate-x-0 shadow-elegant sidebar-enter"
                        : "-translate-x-full"
                )}
            >
                {/* ─── A. Profil Section ─── */}
                <div className="p-5 border-b border-border dark:border-border">
                    <div className="flex items-center gap-3">
                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full bg-emerald/15 flex items-center justify-center flex-shrink-0">
                            <span className="text-emerald font-bold text-lg">
                                {initials}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-text dark:text-text truncate">
                                {userName}
                            </p>
                            <p className="text-[11px] text-text-muted dark:text-text-muted">
                                {userRole}
                            </p>
                        </div>
                        {/* Close button (mobile only) */}
                        <button
                            onClick={onClose}
                            className="lg:hidden p-1.5 rounded-lg hover:bg-bg-muted dark:hover:bg-bg-muted text-text-muted transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* ─── B. Navigation Principale ─── */}
                <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-none">
                    <p className="text-[10px] font-semibold text-text-muted dark:text-text-muted uppercase tracking-wider mb-2 px-3">
                        Navigation
                    </p>
                    <div className="space-y-1">
                        {NAV_ITEMS.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href || pathname?.startsWith(item.href + "/");

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={handleNavClick}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? item.accent
                                                ? "neu-inset text-rose"
                                                : "neu-inset text-emerald"
                                            : "neu-raised text-text-muted dark:text-text-muted hover:text-text dark:hover:text-white"
                                    )}
                                >
                                    <Icon
                                        className={cn(
                                            "w-[18px] h-[18px] shrink-0",
                                            isActive
                                                ? item.accent
                                                    ? "text-rose"
                                                    : "text-emerald"
                                                : "text-text-muted dark:text-text-muted"
                                        )}
                                        strokeWidth={isActive ? 2.2 : 1.8}
                                    />
                                    {item.label}
                                    {isActive && (
                                        <ChevronRight className={cn(
                                            "ml-auto w-4 h-4",
                                            item.accent ? "text-rose/50" : "text-emerald/50"
                                        )} />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* ─── C. Séparateur + Liens utiles ─── */}
                    <div className="my-4 border-t border-border dark:border-border" />

                    <p className="text-[10px] font-semibold text-text-muted dark:text-text-muted uppercase tracking-wider mb-2 px-3">
                        Liens utiles
                    </p>
                    <div className="space-y-1">
                        {USEFUL_LINKS.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    onClick={handleNavClick}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-text-muted dark:text-text-muted hover:bg-bg-muted dark:hover:bg-slate-800 transition-colors"
                                >
                                    <Icon className={cn("w-4 h-4", link.color)} />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* ─── E. Actions du Bas ─── */}
                <div className="p-3 border-t border-border dark:border-border space-y-1">
                    {/* Toggle Thème */}
                    <button
                        onClick={toggleTheme}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-text-muted dark:text-text-muted hover:bg-bg-muted dark:hover:bg-slate-800 transition-colors"
                    >
                        {isDark ? (
                            <Sun className="w-4 h-4 text-amber-400" />
                        ) : (
                            <Moon className="w-4 h-4 text-indigo-400" />
                        )}
                        {isDark ? "Mode clair" : "Mode sombre"}
                    </button>

                    {/* Déconnexion */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Se déconnecter
                        </button>
                    )}

                    {/* Footer */}
                    <div className="pt-2 flex items-center gap-2 px-3 text-[10px] text-text-muted dark:text-slate-600">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Service public AGASA</span>
                    </div>
                </div>
            </aside>
        </>
    );
}
