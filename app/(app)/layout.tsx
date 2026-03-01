"use client";

import { useState, useCallback } from "react";
import AppHeader from "@/components/layout/AppHeader";
import AppSidebar from "@/components/layout/AppSidebar";
import BottomNav from "@/components/layout/BottomNav";
import DemoBanner from "@/components/layout/DemoBanner";
import { AuthProvider } from "@/hooks/useAuth";

export const dynamic = "force-dynamic";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = useCallback(() => {
        setSidebarOpen((prev) => !prev);
    }, []);

    const closeSidebar = useCallback(() => {
        setSidebarOpen(false);
    }, []);

    return (
        <AuthProvider>
            <div className="min-h-dvh bg-bg-muted dark:bg-slate-950 flex">
                {/* Sidebar — w-72 on desktop, slide-in on mobile */}
                <AppSidebar isOpen={sidebarOpen} onClose={closeSidebar} />

                {/* Main content area */}
                <div className="flex-1 min-h-dvh flex flex-col min-w-0">
                    <DemoBanner />
                    <AppHeader onMenuToggle={toggleSidebar} />
                    <main className="app-main flex-1 animate-fade-in">
                        {children}
                    </main>
                    <BottomNav />
                </div>
            </div>
        </AuthProvider>
    );
}
