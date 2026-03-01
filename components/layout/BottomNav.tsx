"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Map, AlertTriangle, Bell, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// BOTTOM NAV — Enhanced Glassmorphic Design
// FAB central pour signalement, micro-animations
// ============================================

const NAV_ITEMS = [
    { href: "/scanner", label: "Scanner", icon: Camera },
    { href: "/carte", label: "Carte", icon: Map },
    { href: "/signaler", label: "Signaler", icon: AlertTriangle, isCenter: true },
    { href: "/alertes", label: "Alertes", icon: Bell, hasBadge: true },
    { href: "/manuels", label: "Manuels", icon: BookOpen },
];

interface BottomNavProps {
    alertCount?: number;
}

export default function BottomNav({ alertCount = 0 }: BottomNavProps) {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 lg:hidden"
            style={{ height: "76px" }}
        >
            {/* Glass background */}
            <div className="absolute inset-0 glass dark:bg-bg-card/85 border-t border-border dark:border-border shadow-[0_-4px_24px_rgba(0,0,0,0.06)]" />

            <div className="relative flex items-center justify-around h-full max-w-3xl mx-auto px-2 safe-bottom">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    if (item.isCenter) {
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="flex flex-col items-center justify-center -mt-5 relative"
                            >
                                <div
                                    className={cn(
                                        "flex items-center justify-center rounded-full shadow-lg transition-all duration-300 touch-feedback",
                                        "w-[56px] h-[56px]",
                                        isActive
                                            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-red-200/50 dark:shadow-red-900/30 scale-105"
                                            : "bg-rose hover:shadow-red-200/50"
                                    )}
                                >
                                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                                </div>
                                <span
                                    className={cn(
                                        "text-[11px] mt-1 font-semibold tracking-tight transition-colors",
                                        isActive ? "text-rose" : "text-text-muted dark:text-text-muted"
                                    )}
                                >
                                    {item.label}
                                </span>
                            </Link>
                        );
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex flex-col items-center justify-center py-1 px-3 relative touch-feedback group"
                        >
                            <div className="relative">
                                <Icon
                                    className={cn(
                                        "w-6 h-6 transition-all duration-200",
                                        isActive
                                            ? "text-emerald animate-scale-in"
                                            : "text-text-muted dark:text-text-muted group-hover:text-text-muted dark:group-hover:text-text"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                    fill={isActive ? "currentColor" : "none"}
                                />
                                {/* Alert badge */}
                                {item.hasBadge && alertCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-rose text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm border-2 border-white dark:border-border">
                                        {alertCount > 9 ? "9+" : alertCount}
                                    </span>
                                )}
                                {/* Active glow */}
                                {isActive && (
                                    <div className="absolute -inset-2 bg-emerald/10 rounded-full -z-10" />
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-[11px] mt-0.5 transition-colors duration-200 tracking-tight",
                                    isActive ? "text-emerald font-bold" : "text-text-muted dark:text-text-muted group-hover:text-text-muted"
                                )}
                            >
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="active-dot mt-0.5 animate-scale-in" />
                            )}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
