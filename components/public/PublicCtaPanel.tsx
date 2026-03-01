"use client";

import Link from "next/link";
import { ArrowRight, Eye, Camera, Scan } from "lucide-react";
import { useInView } from "@/hooks/useInView";

interface PublicCtaPanelProps {
    title: string;
    description: string;
    primary: { href: string; label: string };
    secondary?: { href: string; label: string };
    variant?: "gradient" | "centered";
}

export default function PublicCtaPanel({
    title,
    description,
    primary,
    secondary,
    variant = "centered",
}: PublicCtaPanelProps) {
    const [ref, visible] = useInView();

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="py-20 lg:py-28 bg-bg-card dark:bg-bg">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className={`transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-500 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-emerald-500/25">
                        <Scan size={30} className="text-white" />
                    </div>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text dark:text-text mb-4">
                        {title}
                    </h2>
                    <p className="text-lg text-text-muted dark:text-text-muted max-w-xl mx-auto mb-8 leading-relaxed">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                        <Link
                            href={primary.href}
                            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-bold text-base shadow-[0_10px_40px_-10px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_50px_-10px_rgba(16,185,129,0.5)] hover:-translate-y-1 transition-all duration-300"
                        >
                            <Camera size={20} /> {primary.label}
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        {secondary && (
                            <Link
                                href={secondary.href}
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border-2 border-border dark:border-border text-text dark:text-text font-semibold hover:border-emerald-300 dark:hover:border-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/20 transition-all duration-300"
                            >
                                <Eye size={18} /> {secondary.label}
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
