"use client";

import { useState } from "react";
import { cn, formatRelativeDate } from "@/lib/utils";
import { Camera, MapPin, Eye, CheckCircle, XCircle, Clock } from "lucide-react";

const TABS = [
    { id: "recu", label: "À traiter", count: 12 },
    { id: "en_cours", label: "En cours", count: 5 },
    { id: "traites", label: "Traités", count: 28 },
];

const TYPE_ICONS: Record<string, string> = {
    produits_perimes: "🦠",
    insalubrite: "🪳",
    sans_agrement: "🚫",
    chaine_froid: "🧊",
    autre: "❓",
};

const DEMO_SIGNALEMENTS = [
    { id: "SIG-2026-000045", type: "produits_perimes", typeLabel: "Produits périmés en vente", lieu: "Marché Mont-Bouët, Libreville (Estuaire)", photos: 2, date: Date.now() - 3600000 * 3, statut: "recu", anonymous: true },
    { id: "SIG-2026-000044", type: "insalubrite", typeLabel: "Insalubrité constatée", lieu: "Restaurant Le Palmier, Port-Gentil (Ogooué-Maritime)", photos: 1, date: Date.now() - 3600000 * 8, statut: "recu", anonymous: false, pseudo: "MarieNdong" },
    { id: "SIG-2026-000043", type: "sans_agrement", typeLabel: "Sans agrément sanitaire", lieu: "Grillade de rue — Akanda (Estuaire)", photos: 3, date: Date.now() - 3600000 * 12, statut: "recu", anonymous: true },
    { id: "SIG-2026-000042", type: "chaine_froid", typeLabel: "Chaîne du froid rompue", lieu: "Supermarché Géant, Franceville (Haut-Ogooué)", photos: 2, date: Date.now() - 86400000, statut: "en_verification" },
    { id: "SIG-2026-000041", type: "produits_perimes", typeLabel: "Produits périmés", lieu: "Boutique Ali, Oyem (Woleu-Ntem)", photos: 1, date: Date.now() - 86400000 * 2, statut: "en_verification" },
    { id: "SIG-2026-000038", type: "insalubrite", typeLabel: "Insalubrité grave", lieu: "Poissonnerie Port-Gentil", photos: 4, date: Date.now() - 86400000 * 5, statut: "resolu" },
    { id: "SIG-2026-000035", type: "produits_perimes", typeLabel: "Produits périmés", lieu: "Marché Nkembo, Libreville", photos: 1, date: Date.now() - 86400000 * 8, statut: "rejete", motifRejet: "doublon" },
];

const STATUT_COLORS: Record<string, string> = {
    recu: "bg-red-100 text-red-700",
    en_verification: "bg-blue-100 text-blue-700",
    inspection_programmee: "bg-yellow-100 text-yellow-700",
    resolu: "bg-green-100 text-green-700",
    rejete: "bg-gray-100 text-gray-600",
};

export default function SignalementsAdminPage() {
    const [activeTab, setActiveTab] = useState("recu");
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const filtered = DEMO_SIGNALEMENTS.filter((s) => {
        if (activeTab === "recu") return s.statut === "recu";
        if (activeTab === "en_cours") return ["en_verification", "inspection_programmee"].includes(s.statut);
        return ["resolu", "rejete"].includes(s.statut);
    });

    const selected = DEMO_SIGNALEMENTS.find((s) => s.id === selectedId);

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Modération des signalements</h1>
                <p className="text-sm text-gray-500">Page centrale de l&apos;administration</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setSelectedId(null); }}
                        className={cn(
                            "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                            activeTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
                        )}
                    >
                        {tab.label} <span className="ml-1 text-xs text-gray-400">({tab.count})</span>
                    </button>
                ))}
            </div>

            <div className="flex gap-4">
                {/* List */}
                <div className={cn("space-y-2 flex-1", selectedId && "hidden md:block md:max-w-[40%]")}>
                    {filtered.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 text-sm">
                            Aucun signalement dans cette catégorie
                        </div>
                    ) : (
                        filtered.map((sig) => (
                            <button
                                key={sig.id}
                                onClick={() => setSelectedId(sig.id)}
                                className={cn(
                                    "w-full text-left bg-white rounded-xl border p-4 hover:shadow-sm transition-all",
                                    selectedId === sig.id ? "border-citoyen-green shadow-sm" : "border-gray-100"
                                )}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <span className="text-xs font-mono text-gray-400">🚨 {sig.id}</span>
                                    <span className="text-[11px] text-gray-400">{formatRelativeDate(sig.date)}</span>
                                </div>
                                <p className="text-sm font-medium text-gray-900 mb-1">
                                    {TYPE_ICONS[sig.type]} {sig.typeLabel}
                                </p>
                                <p className="text-xs text-gray-500 flex items-center gap-1">
                                    <MapPin className="w-3 h-3" /> {sig.lieu}
                                </p>
                                <div className="flex items-center gap-2 mt-2">
                                    {sig.photos > 0 && (
                                        <span className="text-[11px] text-gray-400 flex items-center gap-0.5">
                                            <Camera className="w-3 h-3" /> {sig.photos} photo{sig.photos > 1 ? "s" : ""}
                                        </span>
                                    )}
                                    <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", STATUT_COLORS[sig.statut])}>
                                        {sig.statut.replace("_", " ").toUpperCase()}
                                    </span>
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div className="flex-1 bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                        <button onClick={() => setSelectedId(null)} className="md:hidden text-sm text-citoyen-green font-medium">
                            ← Retour à la liste
                        </button>
                        <div>
                            <span className="text-xs font-mono text-gray-400">🚨 {selected.id}</span>
                            <h2 className="text-lg font-bold text-gray-900 mt-1">
                                {TYPE_ICONS[selected.type]} {selected.typeLabel}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin className="w-4 h-4" /> {selected.lieu}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                                Soumis {formatRelativeDate(selected.date)} {selected.anonymous ? "— Anonyme" : `— par ${selected.pseudo}`}
                            </p>
                        </div>

                        {/* Photos placeholder */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">📷 Photos ({selected.photos})</h3>
                            <div className="grid grid-cols-2 gap-2">
                                {Array.from({ length: selected.photos }).map((_, i) => (
                                    <div key={i} className="bg-gray-100 rounded-lg h-32 flex items-center justify-center text-gray-400 text-xs">
                                        Photo {i + 1}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        {selected.statut === "recu" && (
                            <div className="space-y-2 border-t border-gray-100 pt-4">
                                <h3 className="text-sm font-semibold text-gray-700">Actions du modérateur</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <button className="h-10 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-1.5">
                                        <CheckCircle className="w-4 h-4" /> Prendre en charge
                                    </button>
                                    <button className="h-10 bg-yellow-500 text-white text-sm rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-1.5">
                                        <Clock className="w-4 h-4" /> Programmer inspection
                                    </button>
                                    <button className="h-10 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-1.5">
                                        <CheckCircle className="w-4 h-4" /> Marquer résolu
                                    </button>
                                    <button className="h-10 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-1.5">
                                        <XCircle className="w-4 h-4" /> Rejeter
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
