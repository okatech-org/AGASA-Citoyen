import AppHeader from "@/components/layout/AppHeader";
import BottomNav from "@/components/layout/BottomNav";
import DemoBanner from "@/components/layout/DemoBanner";

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-dvh bg-gray-100 flex flex-col items-center">
            <div className="w-full max-w-3xl bg-white min-h-dvh relative pb-20 shadow-2xl ring-1 ring-gray-200">
                <DemoBanner />
                <AppHeader />
                <main className="app-main flex-1">{children}</main>
                <BottomNav />
            </div>
        </div>
    );
}
