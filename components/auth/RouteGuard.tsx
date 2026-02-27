"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { useEffect } from "react";

// ============================================
// ROUTE GUARDS — AGASA-Citoyen
// ============================================

interface RequireAuthProps {
    children: React.ReactNode;
    redirectTo?: string;
}

/**
 * RequireAuth — Bloque si non connecté
 * Utilisé pour : /mes-signalements, /profil (édition)
 */
export function RequireAuth({ children, redirectTo = "/inscription" }: RequireAuthProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [isLoading, isAuthenticated, router, redirectTo]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner text="Vérification..." />
            </div>
        );
    }

    if (!isAuthenticated) return null;

    return <>{children}</>;
}

interface RequireAdminProps {
    children: React.ReactNode;
    allowedRoles?: string[];
}

/**
 * RequireAdmin — Bloque si non admin/modérateur
 * Utilisé pour : /admin/*
 */
export function RequireAdmin({
    children,
    allowedRoles = ["admin_systeme", "moderateur", "demo"],
}: RequireAdminProps) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!user) {
                router.replace("/admin/login");
            } else if (!allowedRoles.includes(user.role)) {
                router.replace("/scanner");
            }
        }
    }, [isLoading, user, router, allowedRoles]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <LoadingSpinner text="Vérification des droits..." />
            </div>
        );
    }

    if (!user || !allowedRoles.includes(user.role)) return null;

    return <>{children}</>;
}
