"use client";

import { Users, AlertTriangle, Building, Camera, Bell, BookOpen, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";

// ============================================
// ADMIN DASHBOARD — AGASA-Citoyen
// 6 KPI cards + 2 chart placeholders
// ============================================

// Demo data → sera remplacé par des queries Convex
const KPI_DATA = [
    {
        icon: Users,
        label: "Utilisateurs inscrits",
        value: "2 847",
        sub: "+124 ce mois",
        trend: "up" as const,
        color: "bg-blue-50 text-blue-600",
        href: "/admin/utilisateurs",
    },
    {
        icon: AlertTriangle,
        label: "Signalements",
        value: "45",
        sub: "12 en attente",
        trend: "up" as const,
        color: "bg-red-50 text-red-600",
        badge: "12",
        href: "/admin/signalements",
    },
    {
        icon: Building,
        label: "Établissements",
        value: "13 700",
        sub: "Couverture : 67% avec Smiley",
        trend: "neutral" as const,
        color: "bg-green-50 text-green-600",
        href: "/admin/etablissements",
    },
    {
        icon: Camera,
        label: "Scans QR",
        value: "8 234",
        sub: "+18% vs mois dernier",
        trend: "up" as const,
        color: "bg-purple-50 text-purple-600",
    },
    {
        icon: Bell,
        label: "Alertes actives",
        value: "3",
        sub: "Dernière : 14/02/2026",
        trend: "neutral" as const,
        color: "bg-orange-50 text-orange-600",
        href: "/admin/alertes",
    },
    {
        icon: BookOpen,
        label: "Manuels publiés",
        value: "6",
        sub: "1 204 vues ce mois",
        trend: "up" as const,
        color: "bg-teal-50 text-teal-600",
        href: "/admin/manuels",
    },
];

function TrendIcon({ trend }: { trend: "up" | "down" | "neutral" }) {
    if (trend === "up") return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
}

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
                <p className="text-sm text-gray-500">Vue d&apos;ensemble AGASA-Citoyen</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {KPI_DATA.map((kpi) => {
                    const Card = (
                        <div
                            key={kpi.label}
                            className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-sm transition-shadow relative"
                        >
                            {kpi.badge && (
                                <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                    {kpi.badge}
                                </span>
                            )}
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-10 h-10 rounded-lg ${kpi.color} flex items-center justify-center`}>
                                    <kpi.icon className="w-5 h-5" />
                                </div>
                                <TrendIcon trend={kpi.trend} />
                            </div>
                            <p className="text-2xl font-extrabold text-gray-900">{kpi.value}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{kpi.label}</p>
                            <p className="text-[11px] text-gray-400 mt-1">{kpi.sub}</p>
                        </div>
                    );

                    return kpi.href ? (
                        <Link key={kpi.label} href={kpi.href}>{Card}</Link>
                    ) : (
                        <div key={kpi.label}>{Card}</div>
                    );
                })}
            </div>

            {/* Charts Placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">📈 Scans QR par jour (30 jours)</h3>
                    <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                            <div className="flex items-end gap-1 justify-center mb-2">
                                {[30, 45, 38, 52, 48, 61, 55, 70, 65, 78, 72, 85, 80, 92, 88].map((h, i) => (
                                    <div
                                        key={i}
                                        className="w-3 bg-citoyen-green/70 rounded-t"
                                        style={{ height: `${h * 1.5}px` }}
                                    />
                                ))}
                            </div>
                            <p className="text-xs text-gray-400">Tendance d&apos;adoption — données démo</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 p-5">
                    <h3 className="font-bold text-gray-900 text-sm mb-4">🚨 Signalements par type</h3>
                    <div className="h-48 flex items-center justify-center">
                        <div className="space-y-2 w-full max-w-xs">
                            {[
                                { label: "Produits périmés", pct: 35, color: "bg-red-400" },
                                { label: "Insalubrité", pct: 25, color: "bg-orange-400" },
                                { label: "Sans agrément", pct: 18, color: "bg-yellow-400" },
                                { label: "Chaîne du froid", pct: 12, color: "bg-blue-400" },
                                { label: "Autres", pct: 10, color: "bg-gray-400" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-2 text-xs">
                                    <span className="w-20 text-gray-600 text-right truncate">{item.label}</span>
                                    <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${item.color} rounded-full`}
                                            style={{ width: `${item.pct}%` }}
                                        />
                                    </div>
                                    <span className="w-8 text-gray-500">{item.pct}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-100 p-5">
                <h3 className="font-bold text-gray-900 text-sm mb-3">⚡ Actions rapides</h3>
                <div className="flex flex-wrap gap-2">
                    <Link href="/admin/signalements" className="text-xs bg-red-50 text-red-700 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors">
                        🚨 Traiter les signalements (12)
                    </Link>
                    <Link href="/admin/alertes" className="text-xs bg-orange-50 text-orange-700 px-3 py-1.5 rounded-lg hover:bg-orange-100 transition-colors">
                        🔔 Créer une alerte
                    </Link>
                    <Link href="/admin/manuels" className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-lg hover:bg-teal-100 transition-colors">
                        📚 Nouvelle fiche éducative
                    </Link>
                    <Link href="/admin/utilisateurs" className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition-colors">
                        👥 Gérer les utilisateurs
                    </Link>
                </div>
            </div>
        </div>
    );
}
