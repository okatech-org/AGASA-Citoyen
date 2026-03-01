"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Plus, Bell } from "lucide-react";
import CitizenButton from "@/components/ui/CitizenButton";

const URGENCE_STYLES: Record<string, { bg: string; text: string; label: string }> = {
    critique: { bg: "bg-red-100", text: "text-red-700", label: "🔴 Critique" },
    importante: { bg: "bg-orange-100", text: "text-orange-700", label: "🟠 Importante" },
    moderee: { bg: "bg-yellow-100", text: "text-yellow-700", label: "🟡 Modérée" },
    information: { bg: "bg-blue-100", text: "text-blue-700", label: "🔵 Information" },
};

const DEMO_ALERTES = [
    { id: "ALRT-2026-0012", titre: "Rappel : Lait concentré Nestlé — Lot L2025-C", produit: "Lait concentré", marque: "Nestlé", urgence: "critique", portee: "national", statut: "active", dateEmission: Date.now() - 86400000 * 2 },
    { id: "ALRT-2026-0011", titre: "Défaut étiquetage — Huile végétale Palmor", produit: "Huile végétale", marque: "Palmor", urgence: "moderee", portee: "Estuaire", statut: "active", dateEmission: Date.now() - 86400000 * 5 },
    { id: "ALRT-2026-0010", titre: "Contamination — Poisson fumé artisanal", produit: "Poisson fumé", marque: "", urgence: "importante", portee: "Ogooué-Maritime", statut: "active", dateEmission: Date.now() - 86400000 * 8 },
    { id: "ALRT-2026-0008", titre: "Allergène non déclaré — Biscuits X", produit: "Biscuits", marque: "Marque X", urgence: "importante", portee: "national", statut: "resolue", dateEmission: Date.now() - 86400000 * 30 },
];

export default function AlertesAdminPage() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-text">Alertes rappels produits</h1>
                    <p className="text-sm text-text-muted">{DEMO_ALERTES.filter(a => a.statut === "active").length} alertes actives</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1.5 text-sm bg-amber text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Nouvelle alerte
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                    <h3 className="font-bold text-sm text-text">Créer une alerte rappel</h3>
                    <input placeholder="Titre de l'alerte" className="w-full h-10 px-3 rounded-lg border border-border text-sm" />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input placeholder="Produit" className="h-10 px-3 rounded-lg border border-border text-sm" />
                        <input placeholder="Marque (optionnel)" className="h-10 px-3 rounded-lg border border-border text-sm" />
                        <input placeholder="Lot (optionnel)" className="h-10 px-3 rounded-lg border border-border text-sm" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select className="h-10 px-3 rounded-lg border border-border text-sm bg-white">
                            <option value="">Motif...</option>
                            <option value="contamination">Contamination</option>
                            <option value="etiquetage">Étiquetage</option>
                            <option value="corps_etranger">Corps étranger</option>
                            <option value="allergene">Allergène</option>
                            <option value="chimique">Chimique</option>
                            <option value="autre">Autre</option>
                        </select>
                        <select className="h-10 px-3 rounded-lg border border-border text-sm bg-white">
                            <option value="critique">🔴 Critique</option>
                            <option value="importante">🟠 Importante</option>
                            <option value="moderee">🟡 Modérée</option>
                            <option value="information">🔵 Information</option>
                        </select>
                    </div>
                    <textarea placeholder="Action recommandée (ex: Ne pas consommer. Rapporter en magasin.)" rows={2} className="w-full px-3 py-2 rounded-lg border border-border text-sm resize-none" />
                    <div className="flex gap-2">
                        <CitizenButton size="sm" variant="danger" icon={<Bell className="w-4 h-4" />}>Publier l&apos;alerte</CitizenButton>
                        <CitizenButton size="sm" variant="ghost" onClick={() => setShowForm(false)}>Annuler</CitizenButton>
                    </div>
                </div>
            )}

            {/* Table */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-bg-muted text-text-muted">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">Référence</th>
                                <th className="text-left px-4 py-3 font-medium">Titre</th>
                                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Produit</th>
                                <th className="text-center px-4 py-3 font-medium">Urgence</th>
                                <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">Portée</th>
                                <th className="text-center px-4 py-3 font-medium">Statut</th>
                                <th className="text-right px-4 py-3 font-medium">Émise le</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {DEMO_ALERTES.map((alerte) => {
                                const urg = URGENCE_STYLES[alerte.urgence];
                                return (
                                    <tr key={alerte.id} className="hover:bg-bg-muted/50">
                                        <td className="px-4 py-3 font-mono text-xs text-text-muted">{alerte.id}</td>
                                        <td className="px-4 py-3 font-medium text-text max-w-[200px] truncate">{alerte.titre}</td>
                                        <td className="px-4 py-3 text-text-muted hidden md:table-cell">{alerte.produit}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={cn("text-[11px] font-semibold px-2 py-0.5 rounded-full", urg.bg, urg.text)}>
                                                {urg.label}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center text-xs text-text-muted hidden sm:table-cell">{alerte.portee}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={cn(
                                                "text-[11px] font-semibold px-2 py-0.5 rounded-full",
                                                alerte.statut === "active" ? "bg-green-100 text-green-700" : "bg-bg-muted text-text-muted"
                                            )}>
                                                {alerte.statut.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right text-xs text-text-muted">{formatDate(alerte.dateEmission)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
