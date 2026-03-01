"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import CitizenButton from "@/components/ui/CitizenButton";
import { Save } from "lucide-react";

const TABS = [
    { id: "signalements", label: "Signalements" },
    { id: "alertes", label: "Alertes" },
    { id: "application", label: "Application" },
];

export default function ConfigurationPage() {
    const [activeTab, setActiveTab] = useState("signalements");

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-extrabold text-text">Configuration</h1>
                <p className="text-sm text-text-muted">Paramètres du système AGASA-Citoyen</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-bg-muted rounded-lg p-1">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors",
                            activeTab === tab.id ? "bg-white text-text shadow-sm" : "text-text-muted"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-xl border border-border p-5 space-y-5">
                {activeTab === "signalements" && (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-text text-sm">Signalements anonymes autorisés</p>
                                <p className="text-xs text-text-muted">Les citoyens peuvent signaler sans créer de compte</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-border peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-emerald peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                            </label>
                        </div>
                        <hr className="border-border" />
                        <div>
                            <label className="text-sm font-medium text-text">Max signalements/jour/citoyen</label>
                            <p className="text-xs text-text-muted mb-2">Limite anti-abus par utilisateur</p>
                            <input type="number" defaultValue={5} className="w-20 h-10 px-3 rounded-lg border border-border text-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text">Seuil auto-bannissement</label>
                            <p className="text-xs text-text-muted mb-2">Nombre de signalements abusifs avant bannissement proposé</p>
                            <input type="number" defaultValue={3} className="w-20 h-10 px-3 rounded-lg border border-border text-sm" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text">Délai traitement cible</label>
                            <p className="text-xs text-text-muted mb-2">Objectif de traitement des signalements (en heures)</p>
                            <input type="number" defaultValue={72} className="w-20 h-10 px-3 rounded-lg border border-border text-sm" />
                            <span className="text-sm text-text-muted ml-2">heures</span>
                        </div>
                    </>
                )}

                {activeTab === "alertes" && (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-text text-sm">Notifications push actives</p>
                                <p className="text-xs text-text-muted">Envoyer des notifications push pour les alertes rappels</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-border peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-emerald peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                            </label>
                        </div>
                        <hr className="border-border" />
                        <div>
                            <label className="text-sm font-medium text-text">Portée par défaut</label>
                            <p className="text-xs text-text-muted mb-2">Zone géographique par défaut pour les nouvelles alertes</p>
                            <select defaultValue="national" className="h-10 px-3 rounded-lg border border-border text-sm bg-white">
                                <option value="national">National</option>
                                <option value="provincial">Provincial</option>
                            </select>
                        </div>
                    </>
                )}

                {activeTab === "application" && (
                    <>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-text text-sm">Mode maintenance</p>
                                <p className="text-xs text-text-muted">Rend l&apos;application indisponible pour les citoyens</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" />
                                <div className="w-11 h-6 bg-border peer-focus:ring-2 peer-focus:ring-green-300 rounded-full peer peer-checked:bg-red-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all" />
                            </label>
                        </div>
                        <hr className="border-border" />
                        <div>
                            <label className="text-sm font-medium text-text">Message de maintenance</label>
                            <p className="text-xs text-text-muted mb-2">Affiché aux utilisateurs pendant la maintenance</p>
                            <textarea
                                defaultValue="AGASA-Citoyen est temporairement indisponible pour maintenance. Veuillez réessayer plus tard."
                                rows={3}
                                className="w-full px-3 py-2 rounded-lg border border-border text-sm resize-none"
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-text">Version affichée</label>
                            <p className="text-xs text-text-muted mb-2">Numéro de version visible dans l&apos;application</p>
                            <input type="text" defaultValue="1.0.0" className="w-32 h-10 px-3 rounded-lg border border-border text-sm" />
                        </div>
                    </>
                )}

                <div className="pt-2">
                    <CitizenButton size="sm" icon={<Save className="w-4 h-4" />}>
                        Sauvegarder les modifications
                    </CitizenButton>
                </div>
            </div>
        </div>
    );
}
