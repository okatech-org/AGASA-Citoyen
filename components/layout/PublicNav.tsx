"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "/", label: "Accueil" },
    { href: "/comment-ca-marche", label: "Comment ça marche" },
    { href: "/securite-alimentaire", label: "Sécurité alimentaire" },
    { href: "/faq", label: "FAQ" },
    { href: "/contact", label: "Contact" },
    { href: "/demo", label: "Démo" },
];

export default function PublicNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className={cn(
                "sticky top-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100"
                    : "bg-white border-b border-gray-200"
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1B5E20] to-[#43A047] flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                            <span className="text-white text-sm font-bold">A</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-lg text-gray-900 leading-tight">AGASA-Citoyen</span>
                            <span className="text-[10px] text-gray-400 leading-none hidden lg:block">Sécurité alimentaire</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden lg:flex items-center gap-1">
                        {NAV_LINKS.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={cn(
                                    "px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                    pathname === link.href
                                        ? "text-[#2E7D32] bg-green-50"
                                        : "text-gray-600 hover:text-[#2E7D32] hover:bg-green-50/50"
                                )}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/scanner"
                            className="ml-3 bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-green-200 transition-all duration-200 hover:scale-[1.02]"
                        >
                            📷 Ouvrir le Scanner
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2 rounded-lg touch-feedback hover:bg-gray-100 transition-colors"
                        aria-label="Menu"
                    >
                        {isOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                )}
            >
                <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                                "block py-3 px-4 rounded-xl text-base font-medium transition-colors",
                                pathname === link.href
                                    ? "text-[#2E7D32] bg-green-50"
                                    : "text-gray-700 hover:bg-gray-50"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                    <Link
                        href="/scanner"
                        onClick={() => setIsOpen(false)}
                        className="block w-full text-center bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white py-3.5 px-4 rounded-xl font-semibold mt-2 shadow-md"
                    >
                        📷 Ouvrir le Scanner
                    </Link>
                </div>
            </div>
        </nav>
    );
}
