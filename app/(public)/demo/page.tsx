"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const DEMO_PROFILES = [
    {
        id: "citoyen" as const,
        icon: "👤",
        title: "Citoyen Gabonais",
        name: "Citoyen241",
        description:
            "Découvrez l'expérience citoyen : scanner QR, carte des établissements, signalements avec suivi, alertes rappels produits, et manuels de bonnes pratiques alimentaires.",
        buttonText: "Accéder à l'espace Citoyen →",
        buttonColor: "from-[#2E7D32] to-[#43A047]",
        tags: ["📷 Scanner", "🗺️ Carte", "🚨 Signaler", "🔔 Alertes", "📚 Manuels"],
        redirectTo: "/scanner",
    },
    {
        id: "moderateur" as const,
        icon: "🔍",
        title: "Modérateur AGASA",
        name: "Sylvie NDONG",
        description:
            "Modérez les signalements citoyens : vérification, classification, rejet des abus, suivi du traitement, et statistiques d'activité.",
        buttonText: "Accéder à l'espace Modérateur →",
        buttonColor: "from-[#1565C0] to-[#1976D2]",
        tags: ["📋 Signalements", "📊 Statistiques", "✅ Modération"],
        redirectTo: "/admin",
    },
    {
        id: "admin" as const,
        icon: "🛡️",
        title: "Administrateur Système",
        name: "Patrick ENGONE",
        description:
            "Administrez la plateforme : utilisateurs, signalements, alertes rappels, contenu éducatif, établissements, statistiques, audit et configuration.",
        buttonText: "Accéder à l'espace Admin →",
        buttonColor: "from-[#EF6C00] to-[#F57C00]",
        tags: ["👤 Utilisateurs", "🔔 Alertes", "📚 Manuels", "📊 Stats", "⚙️ Config"],
        redirectTo: "/admin",
    },
];

export default function DemoPage() {
    const router = useRouter();
    const { loginDemo } = useAuth();
    const [loading, setLoading] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleDemoLogin = async (profil: "citoyen" | "moderateur" | "admin", redirectTo: string) => {
        setLoading(profil);
        setError(null);
        try {
            await loginDemo(profil);
            router.push(redirectTo);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur de connexion démo");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-gray-900">
            {/* Header */}
            <div className="text-center mb-4">
                <h1 className="text-3xl lg:text-4xl font-extrabold mb-2">
                    Démonstration AGASA-Citoyen
                </h1>
                <p className="text-gray-500 mb-6 lg:text-lg">
                    Explorez l&apos;application sans créer de compte. Cliquez sur un profil.
                </p>
            </div>

            {/* Warning Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-8 text-center">
                <p className="text-sm text-amber-700 font-medium">
                    ⚠️ Données fictives — Aucune action réelle
                </p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-center">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-12">
                {DEMO_PROFILES.map((profile) => (
                    <div
                        key={profile.id}
                        className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col hover:shadow-lg hover:border-gray-200 transition-all duration-300"
                    >
                        <div className="p-5 lg:p-6 flex-1">
                            {/* Avatar */}
                            <div className="text-center mb-4">
                                <span className="text-4xl lg:text-5xl block mb-2">{profile.icon}</span>
                                <h2 className="font-bold text-gray-900 lg:text-lg">{profile.title}</h2>
                                <p className="text-sm text-gray-500">{profile.name}</p>
                            </div>

                            {/* Description */}
                            <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
                                {profile.description}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5">
                                {profile.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Button */}
                        <div className="px-5 lg:px-6 pb-5 lg:pb-6">
                            <button
                                onClick={() => handleDemoLogin(profile.id, profile.redirectTo)}
                                disabled={loading !== null}
                                className={`w-full h-12 text-white font-semibold rounded-xl text-sm flex items-center justify-center gap-2 transition-all touch-feedback bg-gradient-to-r ${profile.buttonColor} hover:shadow-lg hover:scale-[1.02] disabled:opacity-50`}
                            >
                                {loading === profile.id ? (
                                    <LoadingSpinner size="sm" />
                                ) : (
                                    profile.buttonText
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Demo Data Section */}
            <section className="bg-gray-50 rounded-2xl p-6 lg:p-8">
                <h2 className="font-bold text-gray-900 mb-6 text-center lg:text-lg">
                    📊 Données de démonstration
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
                    {[
                        { num: "120", label: "Établissements avec Smiley", emoji: "🏢" },
                        { num: "25", label: "Signalements citoyens", emoji: "🚨" },
                        { num: "8", label: "Alertes rappels produits", emoji: "🔔" },
                        { num: "6", label: "Fiches éducatives", emoji: "📚" },
                        { num: "12", label: "Mois d'historique Smiley", emoji: "📈" },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <span className="text-2xl lg:text-3xl block mb-1">{stat.emoji}</span>
                            <p className="text-2xl lg:text-3xl font-extrabold text-gray-900">{stat.num}</p>
                            <p className="text-[11px] lg:text-xs text-gray-500 leading-snug">{stat.label}</p>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-5">
                    Données réparties sur 5 provinces — Tous statuts représentés
                </p>
            </section>
        </div>
    );
}
