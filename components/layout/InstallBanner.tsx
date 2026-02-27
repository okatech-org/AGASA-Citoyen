"use client";

import { useState, useEffect } from "react";
import { X, Download } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallBanner() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if already installed
        if (window.matchMedia("(display-mode: standalone)").matches) {
            return;
        }

        // Track visits
        const visitCount = parseInt(localStorage.getItem("agasa-visit-count") || "0", 10);
        localStorage.setItem("agasa-visit-count", String(visitCount + 1));

        // Show on 2nd visit
        const dismissed = localStorage.getItem("agasa-install-dismissed");
        if (visitCount >= 1 && !dismissed) {
            setShowBanner(true);
        }

        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstall);
        return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    }, []);

    const handleInstall = async () => {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setShowBanner(false);
            }
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setShowBanner(false);
        localStorage.setItem("agasa-install-dismissed", "true");
    };

    if (!showBanner) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-citoyen-green text-white z-[60] animate-slide-down safe-top">
            <div className="flex items-center justify-between px-4 py-3 max-w-lg mx-auto">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-lg">📱</span>
                    <p className="text-sm font-medium truncate">
                        Installez AGASA-Citoyen pour un accès rapide !
                    </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <button
                        onClick={handleInstall}
                        className="bg-white text-citoyen-green px-3 py-1.5 rounded-lg text-sm font-semibold touch-feedback flex items-center gap-1"
                    >
                        <Download className="w-4 h-4" />
                        Installer
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="p-1 touch-feedback rounded-lg hover:bg-white/20"
                        aria-label="Fermer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
