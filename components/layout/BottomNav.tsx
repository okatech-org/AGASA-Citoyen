"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Camera, Map, AlertTriangle, Bell, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { href: "/scanner", label: "Scanner", icon: Camera },
    { href: "/carte", label: "Carte", icon: Map },
    { href: "/signaler", label: "Signaler", icon: AlertTriangle, isCenter: true },
    { href: "/alertes", label: "Alertes", icon: Bell },
    { href: "/manuels", label: "Manuels", icon: BookOpen },
];

interface BottomNavProps {
    alertCount?: number;
}

export default function BottomNav({ alertCount = 0 }: BottomNavProps) {
    const pathname = usePathname();

    return (
        <nav
            className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-50 border-x border-gray-200/50 safe-bottom"
            style={{ height: "72px" }}
        >
            {/* Glass background */}
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-2px_16px_rgba(0,0,0,0.06)]" />

            <div className="relative flex items-center justify-around h-full max-w-3xl mx-auto px-2">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname?.startsWith(item.href);
                    const Icon = item.icon;

                    if (item.isCenter) {
                        // FAB-like central button for "Signaler"
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
                                            ? "bg-gradient-to-br from-red-500 to-red-700 shadow-red-200 scale-105"
                                            : "bg-citoyen-red hover:shadow-red-200"
                                    )}
                                >
                                    <Icon className="w-7 h-7 text-white" strokeWidth={2.5} />
                                </div>
                                <span
                                    className={cn(
                                        "text-[11px] mt-1 font-semibold tracking-tight transition-colors",
                                        isActive ? "text-citoyen-red" : "text-gray-500"
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
                                            ? "text-citoyen-green"
                                            : "text-gray-400 group-hover:text-gray-600"
                                    )}
                                    strokeWidth={isActive ? 2.5 : 1.8}
                                    fill={isActive ? "currentColor" : "none"}
                                />
                                {item.href === "/alertes" && alertCount > 0 && (
                                    <span className="absolute -top-1.5 -right-2 bg-citoyen-red text-white text-[9px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 shadow-sm">
                                        {alertCount > 9 ? "9+" : alertCount}
                                    </span>
                                )}
                            </div>
                            <span
                                className={cn(
                                    "text-[11px] mt-0.5 transition-colors duration-200 tracking-tight",
                                    isActive ? "text-citoyen-green font-bold" : "text-gray-500 group-hover:text-gray-600"
                                )}
                            >
                                {item.label}
                            </span>
                            {/* Active indicator dot */}
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
