"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Network, Database, ArrowUpRight, ArrowDownLeft, CheckCircle2, XCircle, RefreshCw, Send, Bell } from "lucide-react";
import { useState } from "react";

export default function ApiGatewayAdminPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-text tracking-tight flex items-center gap-2">
                        <Network className="w-6 h-6 text-emerald" />
                        API Gateway (Citoyen ↔ Core)
                    </h1>
                    <p className="text-text-muted text-sm mt-1">
                        Monitoring des flux F5 (sortant) et F6 (entrant) avec AGASA-Core.
                    </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-800 text-xs px-3 py-1.5 rounded-full font-medium border border-amber-200">
                    <Database className="w-3.5 h-3.5" />
                    Mode Simulation Activé
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section>
                    <GatewayPanel
                        title="Flux F6 (Entrant : Core → Citoyen)"
                        icon={<ArrowDownLeft className="w-5 h-5 text-blue-600" />}
                        bgColor="bg-blue-50 border-blue-100"
                        titleColor="text-blue-900"
                        fluxType="F6_INBOUND"
                    />
                </section>
                <section>
                    <GatewayPanel
                        title="Flux F5 (Sortant : Citoyen → Core)"
                        icon={<ArrowUpRight className="w-5 h-5 text-purple-600" />}
                        bgColor="bg-purple-50 border-purple-100"
                        titleColor="text-purple-900"
                        fluxType="F5_OUTBOUND"
                    />
                </section>
            </div>
        </div>
    );
}

function GatewayPanel({
    title, icon, bgColor, titleColor, fluxType
}: {
    title: string; icon: React.ReactNode; bgColor: string; titleColor: string; fluxType: "F5_OUTBOUND" | "F6_INBOUND"
}) {
    // Determine queries/mutations based on fluxType
    const inLogs = useQuery(api.gateway.inbound.getInboundLogs);
    const outLogs = useQuery(api.gateway.outbound.getOutboundLogs);
    const logs = fluxType === "F6_INBOUND" ? inLogs : outLogs;

    const syncEtabs = useMutation(api.gateway.inbound.syncEtablissements);
    const receiveAlerte = useMutation(api.gateway.inbound.receiveAlerte);
    const sendStats = useMutation(api.gateway.outbound.sendStats);

    const [loading, setLoading] = useState(false);

    const handleAction = async (actionFn: () => Promise<any>, successMsg: string) => {
        setLoading(true);
        try {
            await actionFn();
            alert(successMsg);
        } catch (e: any) {
            alert("Erreur: " + e.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`rounded-xl border ${bgColor} overflow-hidden shadow-sm`}>
            <div className="p-4 flex items-center justify-between border-b border-black/5 bg-white/50 backdrop-blur-sm">
                <div className="flex items-center gap-2">
                    {icon}
                    <h2 className={`font-bold ${titleColor}`}>{title}</h2>
                </div>
            </div>

            <div className="p-4 bg-white space-y-4">
                {/* Actions simulées */}
                <div className="flex flex-wrap gap-2 pb-4 border-b border-border">
                    {fluxType === "F6_INBOUND" ? (
                        <>
                            <button
                                onClick={() => handleAction(() => syncEtabs({ fullSync: false }), "Synchro établissements simulée !")}
                                disabled={loading}
                                className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                            >
                                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                                Sync Établissements (F6.1)
                            </button>
                            <button
                                onClick={() => handleAction(() => receiveAlerte({ payload: null }), "Alerte reçue par le gateway !")}
                                disabled={loading}
                                className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                            >
                                <Bell className="w-3.5 h-3.5" />
                                Recevoir Alerte (F6.2)
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => handleAction(() => sendStats(), "Statistiques envoyées vers Core !")}
                                disabled={loading}
                                className="px-3 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors disabled:opacity-50"
                            >
                                <Send className={`w-3.5 h-3.5 ${loading ? 'animate-bounce' : ''}`} />
                                Envoyer Stats Usage (F5.2)
                            </button>
                            <p className="text-xs text-text-muted mt-2 block w-full">Note: Les signalements F5.1 sont envoyés automatiquement par les citoyens.</p>
                        </>
                    )}
                </div>

                {/* Logs Table */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Derniers Journaux (50)</h3>
                    {logs === undefined ? (
                        <div className="animate-pulse space-y-2">
                            <div className="h-10 bg-bg-muted rounded-lg"></div>
                            <div className="h-10 bg-bg-muted rounded-lg"></div>
                            <div className="h-10 bg-bg-muted rounded-lg"></div>
                        </div>
                    ) : logs.length === 0 ? (
                        <p className="text-sm text-text-muted text-center py-4 bg-bg-muted rounded-lg">Aucun journal enregistré.</p>
                    ) : (
                        <div className="max-h-96 overflow-y-auto space-y-1">
                            {logs.map((log: any) => (
                                <div key={log._id} className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg border border-border hover:bg-bg-muted text-xs gap-2 transition-colors">
                                    <div className="flex items-center gap-2 overflow-hidden">
                                        {log.statut === "succes" ? (
                                            <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        ) : (
                                            <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                                        )}
                                        <span className="font-mono text-text truncate" title={log.endpoint}>{log.endpoint}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-text-muted flex-shrink-0">
                                        <span className="bg-bg-muted px-1.5 py-0.5 rounded text-[10px]">{log.dureeMs}ms</span>
                                        <span>{new Date(log.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
