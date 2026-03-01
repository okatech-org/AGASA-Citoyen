"use client";

import { useState } from "react";
import { Search, Filter, UserPlus, Shield, Ban, Eye } from "lucide-react";
import { cn, maskTelephone, formatDate, formatTelephone } from "@/lib/utils";
import CitizenButton from "@/components/ui/CitizenButton";

// Demo data
const DEMO_USERS = [
    { id: "1", pseudo: "Citoyen241", telephone: "077123456", role: "citoyen", province: "Estuaire", signalements: 5, statut: "actif", inscription: Date.now() - 86400000 * 30, derniereConnexion: Date.now() - 3600000 },
    { id: "2", pseudo: "MarieNdong", telephone: "066987654", role: "citoyen", province: "Haut-Ogooué", signalements: 2, statut: "actif", inscription: Date.now() - 86400000 * 60 },
    { id: "3", pseudo: "PatrickE", telephone: "", role: "admin_systeme", province: "Estuaire", signalements: 0, statut: "actif", inscription: Date.now() - 86400000 * 180, email: "patrick@agasa.ga" },
    { id: "4", pseudo: "SylvieN", telephone: "", role: "moderateur", province: "Estuaire", signalements: 0, statut: "actif", inscription: Date.now() - 86400000 * 90, email: "sylvie@agasa.ga" },
    { id: "5", pseudo: "JeanM", telephone: "074555666", role: "citoyen", province: "Ngounié", signalements: 12, statut: "banni", inscription: Date.now() - 86400000 * 120 },
    { id: "6", pseudo: "AliceO", telephone: "062111222", role: "citoyen", province: "Ogooué-Maritime", signalements: 1, statut: "actif", inscription: Date.now() - 86400000 * 15 },
];

const ROLE_COLORS: Record<string, string> = {
    citoyen: "bg-green-100 text-green-700",
    admin_systeme: "bg-red-100 text-red-700",
    moderateur: "bg-blue-100 text-blue-700",
    demo: "bg-yellow-100 text-yellow-700",
};

export default function UtilisateursPage() {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [showCreateForm, setShowCreateForm] = useState(false);

    const filtered = DEMO_USERS.filter((u) => {
        if (search && !u.pseudo.toLowerCase().includes(search.toLowerCase())) return false;
        if (roleFilter !== "all" && u.role !== roleFilter) return false;
        return true;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-text">Utilisateurs</h1>
                    <p className="text-sm text-text-muted">{DEMO_USERS.length} comptes enregistrés</p>
                </div>
                <button
                    onClick={() => setShowCreateForm(!showCreateForm)}
                    className="flex items-center gap-1.5 text-sm bg-emerald text-white px-3 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                    <UserPlus className="w-4 h-4" />
                    Créer Modérateur
                </button>
            </div>

            {/* Create Form */}
            {showCreateForm && (
                <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                    <h3 className="font-bold text-sm text-text">Créer un compte modérateur/admin</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input placeholder="Nom complet" className="h-10 px-3 rounded-lg border border-border text-sm" />
                        <input placeholder="Email" type="email" className="h-10 px-3 rounded-lg border border-border text-sm" />
                        <input placeholder="Mot de passe" type="password" className="h-10 px-3 rounded-lg border border-border text-sm" />
                        <select className="h-10 px-3 rounded-lg border border-border text-sm bg-white">
                            <option value="moderateur">Modérateur</option>
                            <option value="admin_systeme">Administrateur</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <CitizenButton size="sm">Créer le compte</CitizenButton>
                        <CitizenButton size="sm" variant="ghost" onClick={() => setShowCreateForm(false)}>Annuler</CitizenButton>
                    </div>
                </div>
            )}

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un utilisateur..."
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-sm"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="h-10 px-3 rounded-lg border border-border text-sm bg-white"
                >
                    <option value="all">Tous les rôles</option>
                    <option value="citoyen">Citoyen</option>
                    <option value="moderateur">Modérateur</option>
                    <option value="admin_systeme">Admin</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-bg-muted text-text-muted">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">Pseudo</th>
                                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Téléphone</th>
                                <th className="text-left px-4 py-3 font-medium">Rôle</th>
                                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Province</th>
                                <th className="text-center px-4 py-3 font-medium">Signalements</th>
                                <th className="text-center px-4 py-3 font-medium">Statut</th>
                                <th className="text-right px-4 py-3 font-medium">Inscription</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((user) => (
                                <tr key={user.id} className="hover:bg-bg-muted/50 transition-colors">
                                    <td className="px-4 py-3 font-medium text-text">{user.pseudo}</td>
                                    <td className="px-4 py-3 text-text-muted hidden sm:table-cell">
                                        {user.telephone ? maskTelephone(formatTelephone(user.telephone)) : "—"}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", ROLE_COLORS[user.role])}>
                                            {user.role.replace("_", " ").toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-text-muted hidden md:table-cell">{user.province}</td>
                                    <td className="px-4 py-3 text-center text-text-muted">{user.signalements}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={cn(
                                            "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                                            user.statut === "actif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                        )}>
                                            {user.statut.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-right text-text-muted text-xs">
                                        {formatDate(user.inscription)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
