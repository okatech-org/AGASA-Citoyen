"use client";

import { createContext, useContext, useCallback, useEffect, useState, ReactNode } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import type { Id } from "../convex/_generated/dataModel";

// ============================================
// AUTH CONTEXT — AGASA-Citoyen
// Modèle à 2 vitesses : anonyme + optionnel
// ============================================

interface User {
    _id: Id<"citoyens">;
    telephone?: string;
    email?: string;
    pseudo?: string;
    province?: string;
    zonesAlerte: string[];
    notificationsActives: boolean;
    nombreSignalements: number;
    role: "citoyen" | "admin_systeme" | "moderateur" | "demo";
    statut: "actif" | "inactif" | "banni";
    creeLe: number;
    derniereConnexion?: number;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isAnonymous: boolean;
    isLoading: boolean;
    role: string | null;
    isAdmin: boolean;
    isModerator: boolean;
    isDemo: boolean;
    demoProfil: "citoyen" | "moderateur" | "admin" | null;
    // Actions
    register: (telephone: string) => Promise<{ success: boolean; isNewUser: boolean }>;
    verifyOTP: (telephone: string, code: string) => Promise<{ success: boolean; token: string }>;
    loginAdmin: (email: string, motDePasse: string) => Promise<{ success: boolean }>;
    loginDemo: (profil: "citoyen" | "moderateur" | "admin") => Promise<{ success: boolean }>;
    logout: () => Promise<void>;
    updatePseudo: (pseudo: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

const TOKEN_KEY = "agasa-session-token";
const DEMO_PROFIL_KEY = "agasa-demo-profil";

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(null);
    const [demoProfil, setDemoProfil] = useState<"citoyen" | "moderateur" | "admin" | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Load token from localStorage on mount
    useEffect(() => {
        const storedToken = localStorage.getItem(TOKEN_KEY);
        const storedDemoProfil = localStorage.getItem(DEMO_PROFIL_KEY) as "citoyen" | "moderateur" | "admin" | null;
        if (storedToken) setToken(storedToken);
        if (storedDemoProfil) setDemoProfil(storedDemoProfil);
        setIsLoading(false);
    }, []);

    // Query current user
    const user = useQuery(
        api.auth.users.getCurrentUser,
        token ? { sessionToken: token } : "skip"
    ) as User | null | undefined;

    // Mutations
    const registerMutation = useMutation(api.auth.users.registerCitoyen);
    const verifyOTPMutation = useMutation(api.auth.users.verifyOTP);
    const loginAdminMutation = useMutation(api.auth.users.loginAdmin);
    const loginDemoMutation = useMutation(api.auth.users.loginDemo);
    const logoutMutation = useMutation(api.auth.users.logout);
    const updatePseudoMutation = useMutation(api.auth.users.updatePseudo);

    const saveToken = useCallback((newToken: string) => {
        setToken(newToken);
        localStorage.setItem(TOKEN_KEY, newToken);
    }, []);

    const clearToken = useCallback(() => {
        setToken(null);
        setDemoProfil(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(DEMO_PROFIL_KEY);
    }, []);

    const register = useCallback(
        async (telephone: string) => {
            const result = await registerMutation({ telephone });
            return { success: result.success, isNewUser: result.isNewUser };
        },
        [registerMutation]
    );

    const verifyOTP = useCallback(
        async (telephone: string, code: string) => {
            const result = await verifyOTPMutation({ telephone, code });
            saveToken(result.token);
            return { success: true, token: result.token };
        },
        [verifyOTPMutation, saveToken]
    );

    const loginAdmin = useCallback(
        async (email: string, motDePasse: string) => {
            const result = await loginAdminMutation({ email, motDePasse });
            saveToken(result.token);
            return { success: true };
        },
        [loginAdminMutation, saveToken]
    );

    const loginDemo = useCallback(
        async (profil: "citoyen" | "moderateur" | "admin") => {
            const result = await loginDemoMutation({ profil });
            saveToken(result.token);
            setDemoProfil(profil);
            localStorage.setItem(DEMO_PROFIL_KEY, profil);
            return { success: true };
        },
        [loginDemoMutation, saveToken]
    );

    const logout = useCallback(async () => {
        if (token) {
            try {
                await logoutMutation({ sessionToken: token });
            } catch {
                // Ignore errors on logout
            }
        }
        clearToken();
    }, [token, logoutMutation, clearToken]);

    const updatePseudo = useCallback(
        async (pseudo: string) => {
            if (!token) throw new Error("Non connecté");
            await updatePseudoMutation({ sessionToken: token, pseudo });
        },
        [token, updatePseudoMutation]
    );

    const value: AuthContextType = {
        user: user ?? null,
        isAuthenticated: !!user,
        isAnonymous: !user,
        isLoading: isLoading || (!!token && user === undefined),
        role: user?.role ?? null,
        isAdmin: user?.role === "admin_systeme",
        isModerator: user?.role === "moderateur",
        isDemo: user?.role === "demo",
        demoProfil,
        register,
        verifyOTP,
        loginAdmin,
        loginDemo,
        logout,
        updatePseudo,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ── HOOKS ──

/**
 * useAuth — Accès complet à l'auth
 * Erreur si utilisé hors AuthProvider
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth doit être utilisé dans un AuthProvider");
    }
    return context;
}

/**
 * useOptionalAuth — Retourne le user SI connecté, sinon null
 * Ne bloque JAMAIS l'accès
 * Utilisé par le signalement (si connecté → suivi, sinon → anonyme)
 */
export function useOptionalAuth(): {
    user: User | null;
    isAuthenticated: boolean;
    isAnonymous: boolean;
} {
    const context = useContext(AuthContext);
    return {
        user: context?.user ?? null,
        isAuthenticated: !!context?.user,
        isAnonymous: !context?.user,
    };
}
