"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Download, Filter } from "lucide-react";

const DEMO_LOGS = [
    { date: Date.now() - 60000 * 5, utilisateur: "Patrick ENGONE", action: "Création alerte", module: "alertes", details: "ALRT-2026-0012 — Rappel lait concentré" },
    { date: Date.now() - 3600000, utilisateur: "Sylvie NDONG", action: "Modération signalement", module: "signalements", details: "SIG-2026-000045 → en_verification" },
    { date: Date.now() - 3600000 * 3, utilisateur: "Patrick ENGONE", action: "Bannissement utilisateur", module: "auth", details: "JeanM — Signalements abusifs répétés" },
    { date: Date.now() - 86400000, utilisateur: "Sylvie NDONG", action: "Rejet signalement", module: "signalements", details: "SIG-2026-000035 — Motif : doublon" },
    { date: Date.now() - 86400000 * 2, utilisateur: "Patrick ENGONE", action: "Publication manuel", module: "manuels", details: "Manipulation sûre du manioc" },
    { date: Date.now() - 86400000 * 3, utilisateur: "Patrick ENGONE", action: "Modification config", module: "admin", details: "max_signalements_jour: 5 → 10" },
    { date: Date.now() - 86400000 * 4, utilisateur: "Sylvie NDONG", action: "Résolution signalement", module: "signalements", details: "SIG-2026-000038 — Inspection effectuée" },
    { date: Date.now() - 86400000 * 5, utilisateur: "Patrick ENGONE", action: "Création compte", module: "auth", details: "Modérateur: sylvie@agasa.ga" },
];

const MODULE_COLORS: Record<string, string> = {
    alertes: "bg-orange-100 text-orange-700",
    signalements: "bg-red-100 text-red-700",
    auth: "bg-blue-100 text-blue-700",
    manuels: "bg-teal-100 text-teal-700",
    admin: "bg-purple-100 text-purple-700",
};

export default function AuditPage() {
    const [moduleFilter, setModuleFilter] = useState("all");

    const filtered = DEMO_LOGS.filter((log) => {
        if (moduleFilter !== "all" && log.module !== moduleFilter) return false;
        return true;
    });

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">Journal d&apos;audit</h1>
                    <p className="text-sm text-gray-500">Historique des actions administratives</p>
                </div>
                <button className="flex items-center gap-1.5 text-sm bg-gray-100 text-gray-600 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-4 h-4" /> Export CSV
                </button>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                <select
                    value={moduleFilter}
                    onChange={(e) => setModuleFilter(e.target.value)}
                    className="h-10 px-3 rounded-lg border border-gray-200 text-sm bg-white"
                >
                    <option value="all">Tous les modules</option>
                    <option value="auth">Authentification</option>
                    <option value="signalements">Signalements</option>
                    <option value="alertes">Alertes</option>
                    <option value="manuels">Manuels</option>
                    <option value="admin">Admin</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-gray-500">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">Date</th>
                                <th className="text-left px-4 py-3 font-medium">Utilisateur</th>
                                <th className="text-left px-4 py-3 font-medium">Action</th>
                                <th className="text-center px-4 py-3 font-medium">Module</th>
                                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Détails</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((log, i) => (
                                <tr key={i} className="hover:bg-gray-50/50">
                                    <td className="px-4 py-3 text-xs text-gray-400 whitespace-nowrap">{formatDate(log.date)}</td>
                                    <td className="px-4 py-3 font-medium text-gray-900 text-xs">{log.utilisateur}</td>
                                    <td className="px-4 py-3 text-gray-700">{log.action}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", MODULE_COLORS[log.module])}>
                                            {log.module.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-gray-500 text-xs hidden md:table-cell max-w-[250px] truncate">{log.details}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
