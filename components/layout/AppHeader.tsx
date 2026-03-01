"use client";

import { usePathname } from "next/navigation";
import { ArrowLeft, Menu, Search, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOptionalAuth } from "@/hooks/useAuth";

// ============================================
// APP HEADER — Glassmorphic Premium Design
// Desktop: search bar + actions
// Mobile: hamburger + title + mini logo
// ============================================

const SECONDARY_PAGES = [
    "/scanner/resultat",
    "/carte/",
    "/signaler/confirmation",
    "/alertes/",
    "/manuels/",
    "/mes-signalements",
    "/profil",
];

const PAGE_TITLES: Record<string, string> = {
    "/scanner": "Scanner QR",
    "/scanner/resultat": "Résultat",
    "/carte": "Carte",
    "/signaler": "Signaler",
    "/signaler/confirmation": "Confirmation",
    "/alertes": "Alertes",
    "/manuels": "Manuels",
    "/mes-signalements": "Mes signalements",
    "/profil": "Mon profil",
    "/admin": "Administration",
};

interface AppHeaderProps {
    onMenuToggle?: () => void;
}

export default function AppHeader({ onMenuToggle }: AppHeaderProps) {
    const pathname = usePathname();
    const { user } = useOptionalAuth();

    const isSecondary = SECONDARY_PAGES.some(
        (p) => pathname !== p.replace(/\/$/, "") && pathname?.startsWith(p)
    );

    // Find matching title
    let title = "AGASA-Citoyen";
    for (const [path, t] of Object.entries(PAGE_TITLES)) {
        if (pathname === path || (pathname?.startsWith(path + "/") && path !== "/")) {
            title = t;
        }
    }

    // For scanner page, hide header (full screen)
    if (pathname === "/scanner") {
        return null;
    }

    const initials = user?.pseudo
        ? user.pseudo.slice(0, 2).toUpperCase()
        : "AG";

    return (
        <header
            className={cn(
                "sticky top-0 z-30 w-full",
                "glass dark:bg-slate-900/80",
                "border-b border-gray-200/50 dark:border-slate-800/50",
            )}
        >
            <div className="flex items-center h-16 px-4 lg:px-8 gap-4">
                {/* ── Mobile: Hamburger / Back ── */}
                <div className="flex items-center gap-2 lg:hidden">
                    {isSecondary ? (
                        <button
                            onClick={() => window.history.back()}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors touch-feedback"
                            aria-label="Retour"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                        </button>
                    ) : (
                        <button
                            onClick={onMenuToggle}
                            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors touch-feedback"
                            aria-label="Menu"
                        >
                            <Menu className="w-5 h-5 text-gray-700 dark:text-slate-300" />
                        </button>
                    )}
                </div>

                {/* ── Title (mobile) ── */}
                <h1 className="text-[17px] font-bold text-gray-900 dark:text-white truncate tracking-tight lg:hidden flex-1 text-center">
                    {title}
                </h1>

                {/* ── Desktop: Search bar ── */}
                <div className="hidden lg:flex flex-1 max-w-md group">
                    <div className="relative w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-emerald transition-colors" />
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full h-10 pl-10 pr-4 rounded-xl neu-inset text-sm text-gray-700 dark:text-slate-300 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald/40 transition-all"
                        />
                    </div>
                </div>

                {/* ── Spacer ── */}
                <div className="hidden lg:block flex-1" />

                {/* ── Actions (all sizes) ── */}
                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <button className="neu-icon-btn relative" aria-label="Notifications">
                        <Bell className="w-[18px] h-[18px]" />
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 bg-rose rounded-full border-2 border-white dark:border-slate-900" />
                    </button>

                    {/* Desktop mini avatar */}
                    <div className="hidden lg:flex w-9 h-9 rounded-full bg-emerald/15 items-center justify-center flex-shrink-0 cursor-pointer hover:bg-emerald/25 transition-colors">
                        <span className="text-emerald font-bold text-xs">
                            {initials}
                        </span>
                    </div>
                </div>

                {/* ── Mobile: AGASA mini logo ── */}
                <div className="flex items-center gap-1.5 flex-shrink-0 lg:hidden">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center"
                        style={{
                            background: "linear-gradient(135deg, #1B5E20, #43A047)",
                        }}
                    >
                        <span className="text-white text-[11px] font-extrabold tracking-tighter">AG</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
