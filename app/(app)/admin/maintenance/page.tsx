"use client";

import { Database, Trash2, RefreshCw, AlertTriangle } from "lucide-react";
import CitizenButton from "@/components/ui/CitizenButton";

export default function MaintenancePage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Maintenance</h1>
                <p className="text-sm text-gray-500">Outils de maintenance système</p>
            </div>

            {/* DB Stats */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 text-sm mb-4 flex items-center gap-2">
                    <Database className="w-4 h-4" /> Statistiques base de données
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                    {[
                        { label: "Citoyens", count: "2 847" },
                        { label: "Signalements", count: "1 234" },
                        { label: "Établissements", count: "13 700" },
                        { label: "Alertes", count: "45" },
                        { label: "Manuels", count: "6" },
                    ].map((s) => (
                        <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
                            <p className="text-xl font-extrabold text-gray-900">{s.count}</p>
                            <p className="text-[11px] text-gray-500">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Actions */}
            <section className="bg-white rounded-xl border border-gray-100 p-5 space-y-4">
                <h2 className="font-bold text-gray-900 text-sm">🔧 Actions de maintenance</h2>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <Trash2 className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">Nettoyer les signalements résolus</p>
                        <p className="text-xs text-gray-400">Supprimer les signalements résolus de plus d&apos;1 an</p>
                    </div>
                    <CitizenButton size="sm" variant="ghost">Exécuter</CitizenButton>
                </div>

                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <RefreshCw className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-medium text-gray-900 text-sm">Réinitialiser les données démo</p>
                        <p className="text-xs text-gray-400">Recréer l&apos;ensemble des données fictives de démonstration</p>
                    </div>
                    <CitizenButton size="sm" variant="ghost">Exécuter</CitizenButton>
                </div>

                <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg border border-red-100">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                        <p className="font-medium text-red-800 text-sm">Mode maintenance</p>
                        <p className="text-xs text-red-500">Rend l&apos;application inaccessible à tous les utilisateurs</p>
                    </div>
                    <CitizenButton size="sm" variant="danger">Activer</CitizenButton>
                </div>
            </section>

            {/* System Info */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 text-sm mb-3">ℹ️ Informations système</h2>
                <div className="text-xs text-gray-500 space-y-1">
                    <p>Version : <span className="font-mono text-gray-700">1.0.0</span></p>
                    <p>Framework : <span className="font-mono text-gray-700">Next.js 16</span></p>
                    <p>Backend : <span className="font-mono text-gray-700">Convex</span></p>
                    <p>Environnement : <span className="font-mono text-gray-700">Développement</span></p>
                    <p>Dernière mise à jour : <span className="font-mono text-gray-700">26/02/2026</span></p>
                </div>
            </section>
        </div>
    );
}
