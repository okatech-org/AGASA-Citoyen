"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CitizenButton from "@/components/ui/CitizenButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { PROVINCES_GABON } from "@/lib/utils";
import {
    User,
    Phone,
    MapPin,
    Bell,
    FileText,
    LogOut,
    ChevronRight,
    Shield,
} from "lucide-react";
import { cn, formatTelephone, maskTelephone, formatDate } from "@/lib/utils";
import Link from "next/link";

export default function ProfilPage() {
    const router = useRouter();
    const { user, isAuthenticated, isLoading, isAdmin, isModerator, isDemo, logout, demoProfil } = useAuth();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner text="Chargement du profil..." />
            </div>
        );
    }

    // Not authenticated → show registration CTA
    if (!isAuthenticated || !user) {
        return (
            <div className="space-y-6 py-8">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Mode anonyme</h2>
                    <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        Vous utilisez AGASA-Citoyen sans compte. Créez un compte gratuit pour suivre vos signalements.
                    </p>
                </div>

                <div className="bg-green-50 rounded-2xl p-4 mx-4">
                    <h3 className="font-semibold text-citoyen-green mb-2">Avantages d&apos;un compte</h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                        <li className="flex items-center gap-2">📋 Suivre vos signalements</li>
                        <li className="flex items-center gap-2">🔔 Recevoir les alertes de votre zone</li>
                        <li className="flex items-center gap-2">⭐ Historique de vos scans</li>
                        <li className="flex items-center gap-2">🏷️ Pseudo sur vos signalements</li>
                    </ul>
                </div>

                <div className="px-4">
                    <CitizenButton onClick={() => router.push("/inscription")}>
                        📱 Créer un compte (30 secondes)
                    </CitizenButton>
                </div>

                <p className="text-center text-xs text-gray-400 px-4">
                    Inscription 100% gratuite — Numéro de téléphone uniquement
                </p>
            </div>
        );
    }

    // Authenticated
    return (
        <div className="space-y-4 pb-safe">
            {/* Avatar + Info */}
            <div className="bg-white rounded-2xl p-5 mx-4 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-citoyen-green flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">
                        {(user.pseudo || "C")[0].toUpperCase()}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 truncate">
                        {user.pseudo || "Citoyen anonyme"}
                    </h2>
                    {user.telephone && (
                        <p className="text-sm text-gray-500">{maskTelephone(formatTelephone(user.telephone))}</p>
                    )}
                    <div className="flex items-center gap-1 mt-1">
                        {isAdmin && (
                            <span className="badge bg-citoyen-red text-white text-[10px]">ADMIN</span>
                        )}
                        {isModerator && (
                            <span className="badge bg-citoyen-orange text-white text-[10px]">MODÉRATEUR</span>
                        )}
                        {isDemo && (
                            <span className="badge bg-citoyen-blue text-white text-[10px]">DÉMO ({demoProfil})</span>
                        )}
                        {!isAdmin && !isModerator && !isDemo && (
                            <span className="badge bg-citoyen-green text-white text-[10px]">CITOYEN</span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 px-4">
                <div className="bg-white rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-citoyen-green">{user.nombreSignalements}</p>
                    <p className="text-[11px] text-gray-500">Signalements</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-citoyen-blue">{user.zonesAlerte?.length || 0}</p>
                    <p className="text-[11px] text-gray-500">Zones alertes</p>
                </div>
                <div className="bg-white rounded-xl p-3 text-center">
                    <p className="text-2xl font-bold text-gray-600">
                        {user.creeLe ? formatDate(user.creeLe) : "—"}
                    </p>
                    <p className="text-[11px] text-gray-500">Membre depuis</p>
                </div>
            </div>

            {/* Menu Items */}
            <div className="px-4 space-y-2">
                <MenuItem
                    icon={<FileText className="w-5 h-5" />}
                    label="Mes signalements"
                    href="/mes-signalements"
                    badge={user.nombreSignalements > 0 ? `${user.nombreSignalements}` : undefined}
                />

                <MenuItem
                    icon={<Bell className="w-5 h-5" />}
                    label="Alertes de ma zone"
                    href="/alertes"
                    description={user.zonesAlerte?.join(", ") || "Aucune zone configurée"}
                />

                <MenuItem
                    icon={<MapPin className="w-5 h-5" />}
                    label="Province"
                    description={user.province || "Non renseignée"}
                />

                <MenuItem
                    icon={<Phone className="w-5 h-5" />}
                    label="Téléphone"
                    description={user.telephone ? maskTelephone(formatTelephone(user.telephone)) : "Non vérifié"}
                />

                {(isAdmin || isModerator || isDemo) && (
                    <MenuItem
                        icon={<Shield className="w-5 h-5" />}
                        label="Espace Administration"
                        href="/admin"
                        highlight
                    />
                )}
            </div>

            {/* Logout */}
            <div className="px-4 pt-4">
                {showLogoutConfirm ? (
                    <div className="bg-red-50 rounded-2xl p-4 space-y-3">
                        <p className="text-sm text-gray-700 text-center">
                            Vous êtes sûr(e) de vouloir vous déconnecter ?
                        </p>
                        <div className="flex gap-3">
                            <CitizenButton variant="ghost" onClick={() => setShowLogoutConfirm(false)} size="sm">
                                Annuler
                            </CitizenButton>
                            <CitizenButton
                                variant="danger"
                                onClick={async () => {
                                    await logout();
                                    router.push("/");
                                }}
                                size="sm"
                            >
                                Se déconnecter
                            </CitizenButton>
                        </div>
                    </div>
                ) : (
                    <CitizenButton variant="ghost" onClick={() => setShowLogoutConfirm(true)} icon={<LogOut className="w-5 h-5" />}>
                        Se déconnecter
                    </CitizenButton>
                )}
            </div>

            <p className="text-center text-xs text-gray-400 pb-4">
                AGASA-Citoyen v0.1.0 — © 2026 AGASA
            </p>
        </div>
    );
}

// ── MenuItem Component ──

interface MenuItemProps {
    icon: React.ReactNode;
    label: string;
    description?: string;
    href?: string;
    badge?: string;
    highlight?: boolean;
}

function MenuItem({ icon, label, description, href, badge, highlight }: MenuItemProps) {
    const content = (
        <div
            className={cn(
                "flex items-center gap-3 bg-white rounded-xl p-4 touch-feedback",
                highlight && "border-2 border-citoyen-green"
            )}
        >
            <span className={cn("text-gray-500", highlight && "text-citoyen-green")}>{icon}</span>
            <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-medium", highlight ? "text-citoyen-green" : "text-gray-900")}>
                    {label}
                </p>
                {description && (
                    <p className="text-xs text-gray-400 truncate">{description}</p>
                )}
            </div>
            {badge && (
                <span className="bg-citoyen-green text-white text-xs rounded-full px-2 py-0.5 font-bold">
                    {badge}
                </span>
            )}
            {href && <ChevronRight className="w-5 h-5 text-gray-300 flex-shrink-0" />}
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
}
