"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

// Pages that show a back button
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

export default function AppHeader() {
    const router = useRouter();
    const pathname = usePathname();

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

    return (
        <header
            className={cn(
                "sticky top-0 z-40 w-full",
                "flex items-center px-4 safe-top",
                "bg-white/80 backdrop-blur-xl border-b border-gray-100/50",
                "shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
            )}
            style={{ height: "56px" }}
        >
            {isSecondary && (
                <button
                    onClick={() => router.back()}
                    className="mr-3 p-1.5 -ml-1 touch-feedback rounded-xl hover:bg-gray-100 transition-colors"
                    aria-label="Retour"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
            )}

            <h1 className="text-[17px] font-bold text-gray-900 flex-1 truncate tracking-tight">
                {title}
            </h1>

            {/* AGASA mini logo */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
                <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                        background: "linear-gradient(135deg, #1B5E20, #43A047)",
                    }}
                >
                    <span className="text-white text-[11px] font-extrabold tracking-tighter">AG</span>
                </div>
            </div>
        </header>
    );
}
