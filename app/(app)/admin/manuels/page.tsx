"use client";

import { useState } from "react";
import { cn, formatDate } from "@/lib/utils";
import { Plus, Eye, EyeOff } from "lucide-react";
import CitizenButton from "@/components/ui/CitizenButton";

const CATEGORIES = [
    { value: "conservation", label: "🧊 Conservation" },
    { value: "hygiene", label: "🧼 Hygiène" },
    { value: "dates_peremption", label: "📅 Dates de péremption" },
    { value: "preparation", label: "🍳 Préparation" },
    { value: "achat", label: "🛒 Achat" },
    { value: "general", label: "📖 Général" },
];

const DEMO_MANUELS = [
    { id: "1", titre: "Manipulation sûre du manioc", categorie: "preparation", ordre: 1, actif: true, vues: 345, modifieLe: Date.now() - 86400000 * 3 },
    { id: "2", titre: "Vérifier les dates de péremption", categorie: "dates_peremption", ordre: 2, actif: true, vues: 621, modifieLe: Date.now() - 86400000 * 5 },
    { id: "3", titre: "Conserver le poisson frais", categorie: "conservation", ordre: 3, actif: true, vues: 187, modifieLe: Date.now() - 86400000 * 10 },
    { id: "4", titre: "Hygiène en cuisine domestique", categorie: "hygiene", ordre: 4, actif: true, vues: 412, modifieLe: Date.now() - 86400000 * 7 },
    { id: "5", titre: "Bien choisir sa viande au marché", categorie: "achat", ordre: 5, actif: true, vues: 98, modifieLe: Date.now() - 86400000 * 15 },
    { id: "6", titre: "Les bons gestes alimentaires", categorie: "general", ordre: 6, actif: false, vues: 56, modifieLe: Date.now() - 86400000 * 30 },
];

export default function ManuelsAdminPage() {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-text">Manuels éducatifs</h1>
                    <p className="text-sm text-text-muted">{DEMO_MANUELS.filter(m => m.actif).length} fiches publiées</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-1.5 text-sm bg-teal-600 text-white px-3 py-2 rounded-lg hover:bg-teal-700 transition-colors"
                >
                    <Plus className="w-4 h-4" /> Nouvelle fiche
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="bg-white rounded-xl border border-border p-4 space-y-3">
                    <h3 className="font-bold text-sm text-text">Créer une fiche éducative</h3>
                    <input placeholder="Titre" className="w-full h-10 px-3 rounded-lg border border-border text-sm" />
                    <input placeholder="Sous-titre (optionnel)" className="w-full h-10 px-3 rounded-lg border border-border text-sm" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <select className="h-10 px-3 rounded-lg border border-border text-sm bg-white">
                            <option value="">Catégorie...</option>
                            {CATEGORIES.map((c) => (
                                <option key={c.value} value={c.value}>{c.label}</option>
                            ))}
                        </select>
                        <input placeholder="Ordre d'affichage" type="number" className="h-10 px-3 rounded-lg border border-border text-sm" />
                    </div>
                    <textarea placeholder="Contenu (Markdown)" rows={8} className="w-full px-3 py-2 rounded-lg border border-border text-sm font-mono resize-none" />
                    <input placeholder="URL vidéo YouTube (optionnel)" className="w-full h-10 px-3 rounded-lg border border-border text-sm" />
                    <div className="flex gap-2">
                        <CitizenButton size="sm">Publier la fiche</CitizenButton>
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
                                <th className="text-center px-3 py-3 font-medium w-12">#</th>
                                <th className="text-left px-4 py-3 font-medium">Titre</th>
                                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Catégorie</th>
                                <th className="text-center px-4 py-3 font-medium">Actif</th>
                                <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">Vues</th>
                                <th className="text-right px-4 py-3 font-medium">Modifié le</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {DEMO_MANUELS.map((m) => {
                                const cat = CATEGORIES.find((c) => c.value === m.categorie);
                                return (
                                    <tr key={m.id} className="hover:bg-bg-muted/50">
                                        <td className="text-center px-3 py-3 text-text-muted text-xs">{m.ordre}</td>
                                        <td className="px-4 py-3 font-medium text-text">{m.titre}</td>
                                        <td className="px-4 py-3 text-sm text-text-muted hidden md:table-cell">{cat?.label}</td>
                                        <td className="px-4 py-3 text-center">
                                            {m.actif ? (
                                                <Eye className="w-4 h-4 text-green-500 mx-auto" />
                                            ) : (
                                                <EyeOff className="w-4 h-4 text-text-muted mx-auto" />
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-center text-text-muted hidden sm:table-cell">{m.vues}</td>
                                        <td className="px-4 py-3 text-right text-xs text-text-muted">{formatDate(m.modifieLe)}</td>
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
