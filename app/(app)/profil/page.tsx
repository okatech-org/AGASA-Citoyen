"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    User,
    Phone,
    Mail,
    MapPin,
    Bell,
    BellOff,
    Shield,
    Edit3,
    Check,
    X,
    LogOut,
    FileText,
    Calendar,
    ChevronRight,
    AlertTriangle,
    Activity,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { RequireAuth } from "@/components/auth/RouteGuard";
import CitizenButton from "@/components/ui/CitizenButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { cn, formatDate, formatTelephone, maskTelephone, PROVINCES_GABON } from "@/lib/utils";

// ============================================
// MON PROFIL — Neumorphic Premium Design
// ============================================

const ROLE_BADGES: Record<string, { label: string; color: string; emoji: string }> = {
    citoyen: { label: "Citoyen", color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400", emoji: "🇬🇦" },
    demo: { label: "Mode Démo", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400", emoji: "🧪" },
    admin_systeme: { label: "Admin", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400", emoji: "⚙️" },
    moderateur: { label: "Modérateur", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400", emoji: "🛡️" },
};

function ProfilContent() {
    const router = useRouter();
    const { user, logout, updateProfile, isDemo } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [saving, setSaving] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    // Edit state
    const [editPseudo, setEditPseudo] = useState(user?.pseudo || "");
    const [editProvince, setEditProvince] = useState(user?.province || "");
    const [editZones, setEditZones] = useState<string[]>(user?.zonesAlerte || []);
    const [editNotifications, setEditNotifications] = useState(user?.notificationsActives || false);

    const handleStartEdit = useCallback(() => {
        setEditPseudo(user?.pseudo || "");
        setEditProvince(user?.province || "");
        setEditZones(user?.zonesAlerte || []);
        setEditNotifications(user?.notificationsActives || false);
        setIsEditing(true);
        setError(null);
        setSuccess(null);
    }, [user]);

    const handleCancelEdit = useCallback(() => {
        setIsEditing(false);
        setError(null);
    }, []);

    const handleSave = useCallback(async () => {
        setSaving(true);
        setError(null);
        try {
            await updateProfile({
                pseudo: editPseudo.trim() || undefined,
                province: editProvince || undefined,
                zonesAlerte: editZones,
                notificationsActives: editNotifications,
            });
            setIsEditing(false);
            setSuccess("Profil mis à jour ✓");
            setTimeout(() => setSuccess(null), 3000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de la sauvegarde");
        } finally {
            setSaving(false);
        }
    }, [editPseudo, editProvince, editZones, editNotifications, updateProfile]);

    const handleLogout = useCallback(async () => {
        setLoggingOut(true);
        try {
            await logout();
            router.push("/");
        } catch {
            setLoggingOut(false);
        }
    }, [logout, router]);

    const toggleZone = useCallback((zone: string) => {
        setEditZones((prev) =>
            prev.includes(zone) ? prev.filter((z) => z !== zone) : [...prev, zone]
        );
    }, []);

    if (!user) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner text="Chargement du profil..." />
            </div>
        );
    }

    const roleBadge = ROLE_BADGES[user.role] || ROLE_BADGES.citoyen;
    const initials = user.pseudo
        ? user.pseudo.slice(0, 2).toUpperCase()
        : user.telephone
            ? user.telephone.slice(-2)
            : "?";

    return (
        <div className="min-h-dvh pb-24">
            {/* Header actions */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-text dark:text-text">👤 Mon profil</h2>
                {!isEditing && (
                    <button
                        onClick={handleStartEdit}
                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald bg-emerald/10 px-3 py-1.5 rounded-full hover:bg-emerald/20 transition-colors"
                    >
                        <Edit3 className="w-3.5 h-3.5" />
                        Modifier
                    </button>
                )}
                {isEditing && (
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleCancelEdit}
                            className="flex items-center gap-1 text-xs font-medium text-text-muted dark:text-text-muted bg-bg-muted dark:bg-slate-800 px-3 py-1.5 rounded-full hover:bg-border dark:hover:bg-slate-700 transition-colors"
                        >
                            <X className="w-3.5 h-3.5" />
                            Annuler
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald px-3 py-1.5 rounded-full hover:bg-emerald transition-colors disabled:opacity-50"
                        >
                            {saving ? (
                                <LoadingSpinner size="sm" />
                            ) : (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    Enregistrer
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>

            {/* Status banners */}
            {success && (
                <div className="mb-4 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 rounded-xl p-3 text-xs text-green-700 dark:text-green-400 font-medium animate-fade-in">
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl p-3 text-xs text-rose font-medium animate-fade-in">
                    {error}
                </div>
            )}

            <div className="space-y-4">
                {/* ─── Avatar Card ─── */}
                <div className="neu-card p-5 flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald to-emerald flex items-center justify-center text-white text-xl font-black" style={{ boxShadow: "0 8px 24px rgba(46, 125, 50, 0.3)" }}>
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-extrabold text-text dark:text-text truncate">
                            {user.pseudo || "Citoyen anonyme"}
                        </h2>
                        <div className="flex items-center gap-2 mt-1">
                            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full", roleBadge.color)}>
                                {roleBadge.emoji} {roleBadge.label}
                            </span>
                            {isDemo && (
                                <span className="text-[10px] font-medium text-amber-500 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded-full">
                                    🧪 Démo
                                </span>
                            )}
                        </div>
                    </div>
                </div>

                {/* ─── Informations ─── */}
                <div className="neu-card overflow-hidden">
                    <div className="px-4 py-3 border-b border-border/50 dark:border-border">
                        <h3 className="text-xs font-bold text-text-muted dark:text-text-muted uppercase tracking-wider">
                            Informations
                        </h3>
                    </div>

                    <div className="divide-y divide-gray-50 dark:divide-slate-800">
                        {/* Pseudo */}
                        <div className="px-4 py-3 flex items-center gap-3">
                            <User className="w-4.5 h-4.5 text-text-muted dark:text-text-muted flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-text-muted dark:text-text-muted font-medium uppercase tracking-wider">Pseudo</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={editPseudo}
                                        onChange={(e) => setEditPseudo(e.target.value)}
                                        placeholder="ex: Citoyen241"
                                        maxLength={30}
                                        className="w-full mt-1 h-9 px-3 rounded-lg neu-inset text-sm dark:text-text focus:outline-none focus:ring-2 focus:ring-emerald/50 transition-all"
                                    />
                                ) : (
                                    <p className="text-sm font-semibold text-text dark:text-text truncate">
                                        {user.pseudo || "—"}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Téléphone */}
                        {user.telephone && (
                            <div className="px-4 py-3 flex items-center gap-3">
                                <Phone className="w-4.5 h-4.5 text-text-muted dark:text-text-muted flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-text-muted dark:text-text-muted font-medium uppercase tracking-wider">Téléphone</p>
                                    <p className="text-sm font-semibold text-text dark:text-text">
                                        {maskTelephone(formatTelephone(user.telephone))}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Email */}
                        {user.email && (
                            <div className="px-4 py-3 flex items-center gap-3">
                                <Mail className="w-4.5 h-4.5 text-text-muted dark:text-text-muted flex-shrink-0" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-text-muted dark:text-text-muted font-medium uppercase tracking-wider">Email</p>
                                    <p className="text-sm font-semibold text-text dark:text-text truncate">
                                        {user.email}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Province */}
                        <div className="px-4 py-3 flex items-center gap-3">
                            <MapPin className="w-4.5 h-4.5 text-text-muted dark:text-text-muted flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-text-muted dark:text-text-muted font-medium uppercase tracking-wider">Province</p>
                                {isEditing ? (
                                    <select
                                        value={editProvince}
                                        onChange={(e) => setEditProvince(e.target.value)}
                                        className="w-full mt-1 h-9 px-3 rounded-lg neu-inset text-sm dark:text-text bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald/50 transition-all"
                                    >
                                        <option value="">Sélectionner...</option>
                                        {PROVINCES_GABON.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                ) : (
                                    <p className="text-sm font-semibold text-text dark:text-text">
                                        {user.province || "Non définie"}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Membre depuis */}
                        <div className="px-4 py-3 flex items-center gap-3">
                            <Calendar className="w-4.5 h-4.5 text-text-muted dark:text-text-muted flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-text-muted dark:text-text-muted font-medium uppercase tracking-wider">Membre depuis</p>
                                <p className="text-sm font-semibold text-text dark:text-text">
                                    {formatDate(user.creeLe)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Zones d'alerte ─── */}
                <div className="neu-card overflow-hidden">
                    <div className="px-4 py-3 border-b border-border/50 dark:border-border flex items-center justify-between">
                        <h3 className="text-xs font-bold text-text-muted dark:text-text-muted uppercase tracking-wider">
                            Zones d&apos;alerte
                        </h3>
                        {!isEditing && (
                            <span className="text-[10px] text-text-muted dark:text-text-muted font-medium">
                                {user.zonesAlerte.length} zone{user.zonesAlerte.length > 1 ? "s" : ""}
                            </span>
                        )}
                    </div>

                    <div className="px-4 py-3">
                        {isEditing ? (
                            <div className="grid grid-cols-2 gap-2">
                                {PROVINCES_GABON.map((province) => (
                                    <button
                                        key={province}
                                        onClick={() => toggleZone(province)}
                                        className={cn(
                                            "text-left text-xs font-medium px-3 py-2 rounded-xl transition-all duration-200",
                                            editZones.includes(province)
                                                ? "neu-inset text-emerald"
                                                : "neu-raised text-text-muted dark:text-text-muted"
                                        )}
                                    >
                                        {editZones.includes(province) ? "✓ " : ""}{province}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-1.5">
                                {user.zonesAlerte.length > 0 ? (
                                    user.zonesAlerte.map((zone) => (
                                        <span
                                            key={zone}
                                            className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald/10 text-emerald"
                                        >
                                            📍 {zone}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-xs text-text-muted dark:text-text-muted italic">Aucune zone configurée</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* ─── Notifications ─── */}
                <div className="neu-card overflow-hidden">
                    <div className="px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {(isEditing ? editNotifications : user.notificationsActives) ? (
                                <Bell className="w-5 h-5 text-emerald" />
                            ) : (
                                <BellOff className="w-5 h-5 text-text-muted dark:text-text-muted" />
                            )}
                            <div>
                                <p className="text-sm font-semibold text-text dark:text-text">Notifications push</p>
                                <p className="text-[11px] text-text-muted dark:text-text-muted">
                                    Alertes rappels produits dans vos zones
                                </p>
                            </div>
                        </div>
                        {isEditing ? (
                            <button
                                onClick={() => setEditNotifications(!editNotifications)}
                                className={cn(
                                    "relative w-11 h-6 rounded-full transition-colors duration-200",
                                    editNotifications ? "bg-emerald" : "bg-gray-300 dark:bg-slate-600"
                                )}
                            >
                                <span
                                    className={cn(
                                        "absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200",
                                        editNotifications ? "translate-x-5.5" : "translate-x-0.5"
                                    )}
                                />
                            </button>
                        ) : (
                            <span
                                className={cn(
                                    "text-[10px] font-bold px-2 py-0.5 rounded-full",
                                    user.notificationsActives
                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                        : "bg-bg-muted text-text-muted dark:bg-slate-800 dark:text-text-muted"
                                )}
                            >
                                {user.notificationsActives ? "Activées" : "Désactivées"}
                            </span>
                        )}
                    </div>
                </div>

                {/* ─── Statistiques (Neumorphic Inset) ─── */}
                <div className="neu-card overflow-hidden">
                    <div className="px-4 py-3 border-b border-border/50 dark:border-border flex items-center gap-2">
                        <Activity className="w-4 h-4 text-text-muted dark:text-text-muted" />
                        <h3 className="text-xs font-bold text-text-muted dark:text-text-muted uppercase tracking-wider">
                            Activité
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3 p-4">
                        <div className="neu-inset p-4 text-center">
                            <p className="text-2xl font-black text-emerald">
                                {user.nombreSignalements}
                            </p>
                            <p className="text-[10px] text-text-muted dark:text-text-muted font-semibold uppercase mt-0.5 tracking-wider">
                                Signalements
                            </p>
                        </div>
                        <div className="neu-inset p-4 text-center">
                            <p className="text-sm font-bold text-text dark:text-text">
                                {user.derniereConnexion ? formatDate(user.derniereConnexion) : "—"}
                            </p>
                            <p className="text-[10px] text-text-muted dark:text-text-muted font-semibold uppercase mt-0.5 tracking-wider">
                                Dernière connexion
                            </p>
                        </div>
                    </div>
                </div>

                {/* ─── Quick Links ─── */}
                <div className="neu-card overflow-hidden">
                    <Link
                        href="/mes-signalements"
                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-bg-muted dark:hover:bg-slate-800 transition-colors group"
                    >
                        <FileText className="w-5 h-5 text-text-muted dark:text-text-muted" />
                        <span className="flex-1 text-sm font-medium text-text dark:text-text">
                            Mes signalements
                        </span>
                        <ChevronRight className="w-4 h-4 text-text-muted dark:text-slate-600 group-hover:text-text-muted dark:group-hover:text-slate-400 transition-colors" />
                    </Link>
                    <div className="border-t border-gray-50 dark:border-border" />
                    <Link
                        href="/alertes"
                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-bg-muted dark:hover:bg-slate-800 transition-colors group"
                    >
                        <Bell className="w-5 h-5 text-text-muted dark:text-text-muted" />
                        <span className="flex-1 text-sm font-medium text-text dark:text-text">
                            Alertes & rappels
                        </span>
                        <ChevronRight className="w-4 h-4 text-text-muted dark:text-slate-600 group-hover:text-text-muted dark:group-hover:text-slate-400 transition-colors" />
                    </Link>
                    <div className="border-t border-gray-50 dark:border-border" />
                    <Link
                        href="/signaler"
                        className="flex items-center gap-3 px-4 py-3.5 hover:bg-bg-muted dark:hover:bg-slate-800 transition-colors group"
                    >
                        <AlertTriangle className="w-5 h-5 text-rose" />
                        <span className="flex-1 text-sm font-semibold text-rose">
                            Faire un signalement
                        </span>
                        <ChevronRight className="w-4 h-4 text-text-muted dark:text-slate-600 group-hover:text-red-400 transition-colors" />
                    </Link>
                </div>

                {/* ─── Déconnexion ─── */}
                <div className="pt-2">
                    <CitizenButton
                        variant="ghost"
                        onClick={handleLogout}
                        disabled={loggingOut}
                        icon={loggingOut ? <LoadingSpinner size="sm" /> : <LogOut className="w-4.5 h-4.5" />}
                    >
                        {loggingOut ? "Déconnexion..." : "Se déconnecter"}
                    </CitizenButton>
                </div>

                {/* ─── Footer ─── */}
                <div className="text-center pt-2 pb-4">
                    <div className="flex items-center justify-center gap-1.5 text-[10px] text-text-muted dark:text-slate-600">
                        <Shield className="w-3 h-3" />
                        <span>AGASA-Citoyen · Vos données sont protégées</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ProfilPage() {
    return (
        <RequireAuth>
            <ProfilContent />
        </RequireAuth>
    );
}
