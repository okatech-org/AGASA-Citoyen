"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Camera, AlertTriangle, Home } from "lucide-react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// ============================================
// PAGE CONFIRMATION — Après envoi signalement
// Affiche la référence + options de suivi
// ============================================

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const ref = searchParams.get("ref") || "SIG-2026-000000";

    return (
        <div className="min-h-dvh bg-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm text-center space-y-5">
                {/* Success icon */}
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                </div>

                <div>
                    <h1 className="text-xl font-bold text-text">Signalement envoyé !</h1>
                    <p className="text-sm text-text-muted mt-1">Merci pour votre vigilance citoyenne</p>
                </div>

                {/* Reference */}
                <div className="bg-bg-muted rounded-xl p-4">
                    <p className="text-xs text-text-muted mb-1">Référence</p>
                    <p className="text-lg font-mono font-bold text-text">{ref}</p>
                </div>

                {/* Info */}
                <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700 text-left">
                    <p>L&apos;AGASA va examiner votre signalement dans les <strong>72 heures</strong>.</p>
                    <p className="mt-1">🔔 Vous serez notifié de l&apos;avancement.</p>
                </div>

                {/* Track link */}
                <Link
                    href="/mes-signalements"
                    className="block w-full bg-emerald/10 text-emerald py-3 rounded-xl text-sm font-semibold hover:bg-emerald/20 transition-colors"
                >
                    📋 Suivre dans &quot;Mes signalements&quot;
                </Link>

                {/* Action buttons */}
                <div className="space-y-2">
                    <Link
                        href="/scanner"
                        className="flex items-center justify-center gap-2 w-full h-11 bg-bg-muted text-text rounded-xl text-sm font-medium hover:bg-border transition-colors"
                    >
                        <Camera className="w-4 h-4" /> Scanner un QR
                    </Link>
                    <Link
                        href="/signaler"
                        className="flex items-center justify-center gap-2 w-full h-11 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors"
                    >
                        <AlertTriangle className="w-4 h-4" /> Faire un autre signalement
                    </Link>
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full h-11 text-text-muted text-sm hover:text-text-muted transition-colors"
                    >
                        <Home className="w-4 h-4" /> Retour à l&apos;accueil
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function ConfirmationPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-20"><LoadingSpinner text="Chargement..." /></div>}>
            <ConfirmationContent />
        </Suspense>
    );
}
