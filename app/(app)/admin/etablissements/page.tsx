"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Search, QrCode, MapPin } from "lucide-react";

const SMILEY_COLORS: Record<number, { bg: string; text: string }> = {
    5: { bg: "bg-green-100", text: "text-green-700" },
    4: { bg: "bg-lime-100", text: "text-lime-700" },
    3: { bg: "bg-yellow-100", text: "text-yellow-700" },
    2: { bg: "bg-orange-100", text: "text-orange-700" },
    1: { bg: "bg-red-100", text: "text-red-700" },
    0: { bg: "bg-border", text: "text-text-muted" },
};

const DEMO_ETABLISSEMENTS = [
    { id: "1", nom: "Restaurant Le Palmier", categorie: "restaurant", smiley: 5, ville: "Libreville", province: "Estuaire", agrement: "valid", signalements: 0 },
    { id: "2", nom: "Supermarché Géant Prix", categorie: "supermarche", smiley: 4, ville: "Libreville", province: "Estuaire", agrement: "valid", signalements: 1 },
    { id: "3", nom: "Marché Mont-Bouët", categorie: "marche", smiley: 3, ville: "Libreville", province: "Estuaire", agrement: "valid", signalements: 5 },
    { id: "4", nom: "Boulangerie du Port", categorie: "boulangerie", smiley: 4, ville: "Port-Gentil", province: "Ogooué-Maritime", agrement: "valid", signalements: 0 },
    { id: "5", nom: "Grillade Mama Nyota", categorie: "restaurant", smiley: 2, ville: "Franceville", province: "Haut-Ogooué", agrement: "expire", signalements: 3 },
    { id: "6", nom: "Poissonnerie du Lac", categorie: "poissonnerie", smiley: 1, ville: "Lambaréné", province: "Moyen-Ogooué", agrement: "valid", signalements: 7 },
    { id: "7", nom: "Alimentation Générale", categorie: "epicerie", smiley: 3, ville: "Oyem", province: "Woleu-Ntem", agrement: "valid", signalements: 2 },
    { id: "8", nom: "Restaurant Le Baobab", categorie: "restaurant", smiley: 5, ville: "Mouila", province: "Ngounié", agrement: "valid", signalements: 0 },
];

export default function EtablissementsAdminPage() {
    const [search, setSearch] = useState("");
    const [catFilter, setCatFilter] = useState("all");

    const filtered = DEMO_ETABLISSEMENTS.filter((e) => {
        if (search && !e.nom.toLowerCase().includes(search.toLowerCase())) return false;
        if (catFilter !== "all" && e.categorie !== catFilter) return false;
        return true;
    });

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-extrabold text-text">Établissements</h1>
                <p className="text-sm text-text-muted">{DEMO_ETABLISSEMENTS.length} établissements enregistrés</p>
            </div>

            {/* Filters */}
            <div className="flex gap-2 flex-wrap">
                <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Rechercher un établissement..."
                        className="w-full h-10 pl-9 pr-3 rounded-lg border border-border text-sm"
                    />
                </div>
                <select
                    value={catFilter}
                    onChange={(e) => setCatFilter(e.target.value)}
                    className="h-10 px-3 rounded-lg border border-border text-sm bg-white"
                >
                    <option value="all">Toutes catégories</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="supermarche">Supermarché</option>
                    <option value="marche">Marché</option>
                    <option value="boulangerie">Boulangerie</option>
                    <option value="poissonnerie">Poissonnerie</option>
                    <option value="epicerie">Épicerie</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-bg-muted text-text-muted">
                            <tr>
                                <th className="text-left px-4 py-3 font-medium">Établissement</th>
                                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Catégorie</th>
                                <th className="text-center px-4 py-3 font-medium">Smiley</th>
                                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Province</th>
                                <th className="text-center px-4 py-3 font-medium hidden md:table-cell">Agrément</th>
                                <th className="text-center px-4 py-3 font-medium">Signalements</th>
                                <th className="text-center px-4 py-3 font-medium">QR</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.map((e) => {
                                const smiley = SMILEY_COLORS[e.smiley];
                                return (
                                    <tr key={e.id} className="hover:bg-bg-muted/50">
                                        <td className="px-4 py-3">
                                            <p className="font-medium text-text">{e.nom}</p>
                                            <p className="text-xs text-text-muted flex items-center gap-0.5 sm:hidden">
                                                <MapPin className="w-3 h-3" /> {e.ville}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-text-muted capitalize hidden md:table-cell">{e.categorie}</td>
                                        <td className="px-4 py-3 text-center">
                                            <span className={cn("text-sm font-bold px-2 py-1 rounded-lg", smiley.bg, smiley.text)}>
                                                {e.smiley} {"⭐".repeat(e.smiley)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-text-muted hidden sm:table-cell">{e.province}</td>
                                        <td className="px-4 py-3 text-center hidden md:table-cell">
                                            <span className={cn(
                                                "text-[11px] px-2 py-0.5 rounded-full font-medium",
                                                e.agrement === "valid" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                            )}>
                                                {e.agrement === "valid" ? "VALIDE" : "EXPIRÉ"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            {e.signalements > 0 ? (
                                                <span className="text-sm font-semibold text-red-600">{e.signalements}</span>
                                            ) : (
                                                <span className="text-text-muted">0</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <button className="text-text-muted hover:text-emerald transition-colors">
                                                <QrCode className="w-4 h-4 mx-auto" />
                                            </button>
                                        </td>
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
