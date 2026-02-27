"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CitizenButton from "@/components/ui/CitizenButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Shield, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();
    const { loginAdmin } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await loginAdmin(email, password);
            router.push("/admin");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Connexion échouée");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-gray-50 flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-sm">
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-citoyen-green flex items-center justify-center">
                        <Shield className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-xl font-bold text-gray-900">Administration AGASA</h1>
                    <p className="text-sm text-gray-500 mt-1">Espace réservé aux administrateurs</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4 bg-white rounded-2xl p-6 shadow-sm">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1 block">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@agasa.ga"
                            className="w-full h-12 px-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-citoyen-green"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1 block">
                            Mot de passe
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full h-12 px-4 pr-12 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-citoyen-green"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <p className="text-sm text-citoyen-red bg-red-50 p-3 rounded-xl">{error}</p>
                    )}

                    <CitizenButton type="submit" disabled={loading || !email || !password}>
                        {loading ? <LoadingSpinner size="sm" /> : "Se connecter"}
                    </CitizenButton>
                </form>

                <p className="text-center text-xs text-gray-400 mt-4">
                    Accès restreint — Contactez l&apos;administrateur système pour obtenir un accès.
                </p>
            </div>
        </div>
    );
}
