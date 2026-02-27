"use client";

// ============================================
// STATISTIQUES — Dashboard analytique admin
// ============================================

export default function StatistiquesPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Statistiques</h1>
                <p className="text-sm text-gray-500">Analytics d&apos;adoption et d&apos;impact</p>
            </div>

            {/* Adoption */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 text-sm mb-4">📱 Adoption</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { label: "Installations cette semaine", value: "142", trend: "+12%" },
                        { label: "Utilisateurs actifs ce mois", value: "1 847", trend: "+24%" },
                        { label: "Taux rétention 30j", value: "64%", trend: "+3%" },
                        { label: "Sessions/jour moyenne", value: "2.3", trend: "+0.4" },
                    ].map((s) => (
                        <div key={s.label} className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-2xl font-extrabold text-gray-900">{s.value}</p>
                            <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
                            <p className="text-[10px] text-green-600 font-medium mt-0.5">{s.trend}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Scanner */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 text-sm mb-4">📷 Scanner QR</h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-xs text-gray-500 mb-2">Scans/jour (30 derniers jours)</h3>
                        <div className="h-40 bg-gray-50 rounded-lg flex items-end gap-0.5 p-4">
                            {[150, 180, 160, 200, 245, 220, 190, 270, 250, 300, 280, 310, 295, 340, 320, 290, 350, 330, 370, 360, 400, 380, 420, 410, 450, 430, 460, 440, 470, 480].map((v, i) => (
                                <div key={i} className="flex-1 bg-citoyen-green/60 rounded-t min-w-[4px]" style={{ height: `${(v / 500) * 100}%` }} />
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xs text-gray-500 mb-2">Top 5 établissements scannés</h3>
                        <div className="space-y-2">
                            {[
                                { nom: "Supermarché Géant Prix", scans: 487 },
                                { nom: "Restaurant Le Palmier", scans: 341 },
                                { nom: "Marché Mont-Bouët", scans: 289 },
                                { nom: "Boulangerie du Port", scans: 215 },
                                { nom: "Restaurant Le Baobab", scans: 178 },
                            ].map((e, i) => (
                                <div key={e.nom} className="flex items-center gap-2 text-sm">
                                    <span className="w-5 h-5 rounded-full bg-citoyen-green/10 text-citoyen-green text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                                    <span className="flex-1 text-gray-700 truncate">{e.nom}</span>
                                    <span className="text-gray-400 text-xs">{e.scans} scans</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Signalements */}
            <section className="bg-white rounded-xl border border-gray-100 p-5">
                <h2 className="font-bold text-gray-900 text-sm mb-4">🚨 Signalements</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    {[
                        { label: "Soumis ce mois", value: "45" },
                        { label: "Traités", value: "33" },
                        { label: "Rejetés", value: "7" },
                        { label: "Délai moyen traitement", value: "38h" },
                    ].map((s) => (
                        <div key={s.label} className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-xl font-extrabold text-gray-900">{s.value}</p>
                            <p className="text-[11px] text-gray-500 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
                <div>
                    <h3 className="text-xs text-gray-500 mb-2">Répartition par type</h3>
                    <div className="space-y-1.5">
                        {[
                            { label: "Produits périmés", pct: 35, color: "bg-red-400" },
                            { label: "Insalubrité", pct: 25, color: "bg-orange-400" },
                            { label: "Sans agrément", pct: 18, color: "bg-amber-400" },
                            { label: "Chaîne du froid", pct: 12, color: "bg-blue-400" },
                            { label: "Autres", pct: 10, color: "bg-gray-400" },
                        ].map((t) => (
                            <div key={t.label} className="flex items-center gap-2 text-xs">
                                <span className="w-24 text-gray-600 text-right">{t.label}</span>
                                <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${t.color} rounded-full`} style={{ width: `${t.pct}%` }} />
                                </div>
                                <span className="w-8 text-gray-500">{t.pct}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Export */}
            <div className="text-center">
                <button className="text-sm bg-gray-100 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    📄 Exporter le rapport mensuel (PDF)
                </button>
            </div>
        </div>
    );
}
