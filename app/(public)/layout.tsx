import PublicNav from "@/components/layout/PublicNav";
import Footer from "@/components/layout/Footer";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="public-main">
            <PublicNav />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
