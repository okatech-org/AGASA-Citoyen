"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RequireAdmin } from "@/components/auth/RouteGuard";
import DemoBanner from "@/components/layout/DemoBanner";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    AlertTriangle,
    Bell,
    BookOpen,
    Building,
    BarChart3,
    ScrollText,
    Settings,
    Wrench,
    Network,
} from "lucide-react";

const ADMIN_NAV = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/signalements", label: "Signalements", icon: AlertTriangle },
    { href: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
    { href: "/admin/alertes", label: "Alertes", icon: Bell },
    { href: "/admin/manuels", label: "Manuels", icon: BookOpen },
    { href: "/admin/etablissements", label: "Établissements", icon: Building },
    { href: "/admin/gateway", label: "API Gateway", icon: Network },
    { href: "/admin/statistiques", label: "Statistiques", icon: BarChart3 },
    { href: "/admin/audit", label: "Audit", icon: ScrollText },
    { href: "/admin/configuration", label: "Configuration", icon: Settings },
    { href: "/admin/maintenance", label: "Maintenance", icon: Wrench },
];

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Login page — no sidebar, no auth guard
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // All other admin pages — sidebar + auth guard
    return (
        <RequireAdmin>
            <div className="min-h-dvh bg-bg-muted">
                <DemoBanner />
                <div className="flex">
                    <AdminSidebarNav />
                    <main className="flex-1 min-w-0 p-4 md:p-6 pb-20 md:pb-6">
                        {children}
                    </main>
                </div>
                <AdminMobileNav />
            </div>
        </RequireAdmin>
    );
}

function AdminSidebarNav() {
    const pathname = usePathname();
    return (
        <aside className="w-56 bg-white border-r border-border min-h-dvh hidden md:flex flex-col sticky top-0">
            <div className="p-4 border-b border-border">
                <h1 className="font-extrabold text-text text-sm">🛡️ AGASA Admin</h1>
                <p className="text-[10px] text-text-muted">AGASA-Citoyen</p>
            </div>
            <nav className="flex-1 p-2 space-y-0.5 overflow-y-auto">
                {ADMIN_NAV.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors",
                                isActive
                                    ? "bg-emerald text-white font-semibold"
                                    : "text-text-muted hover:bg-bg-muted hover:text-text"
                            )}
                        >
                            <item.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </nav>
            <div className="p-3 border-t border-border">
                <Link
                    href="/scanner"
                    className="flex items-center gap-2 text-xs text-text-muted hover:text-emerald transition-colors"
                >
                    ← Retour à l&apos;app
                </Link>
            </div>
        </aside>
    );
}

function AdminMobileNav() {
    const pathname = usePathname();
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-40 overflow-x-auto">
            <div className="flex px-2 py-2 gap-1">
                {ADMIN_NAV.slice(0, 6).map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-[10px] min-w-[52px]",
                                isActive ? "text-emerald font-semibold" : "text-text-muted"
                            )}
                        >
                            <item.icon className="w-4 h-4" />
                            <span className="truncate">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
