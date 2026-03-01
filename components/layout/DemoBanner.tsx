"use client";

import { useContext, useCallback, useState, useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

/**
 * DemoBanner — Bannière persistante en haut de l'écran en mode démo
 * Affiche le profil actif et permet de changer ou quitter
 *
 * Uses useOptionalAuth internally to avoid crashing when rendered
 * outside of AuthProvider (e.g. during SSR or in public routes).
 */
export default function DemoBanner() {
    const [demoProfil, setDemoProfil] = useState<string | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("agasa-demo-profil");
        setDemoProfil(stored);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem("agasa-session-token");
        localStorage.removeItem("agasa-demo-profil");
        window.location.href = "/";
    }, []);

    if (!demoProfil) return null;

    const profilLabels: Record<string, string> = {
        citoyen: "👤 Citoyen",
        moderateur: "🔍 Modérateur",
        admin: "🛡️ Admin",
    };

    return (
        <div className="bg-amber-400 text-amber-900 px-4 py-2 flex items-center justify-between text-sm font-medium z-50 sticky top-0 w-full">
            <span>
                🎮 DÉMONSTRATION — {profilLabels[demoProfil || ""] || demoProfil}
            </span>
            <div className="flex items-center gap-3">
                <Link
                    href="/demo"
                    className="underline underline-offset-2 text-amber-800 hover:text-amber-950 text-xs"
                >
                    Changer de profil
                </Link>
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-600 text-white rounded-lg px-2 py-1 text-xs transition-colors"
                >
                    <X className="w-3 h-3" />
                    Quitter
                </button>
            </div>
        </div>
    );
}
