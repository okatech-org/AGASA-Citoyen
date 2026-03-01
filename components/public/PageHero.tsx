"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, Shield } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import PhoneMockup from "@/components/public/PhoneMockup";

interface HeroAction {
    label: string;
    href: string;
}

interface PageHeroProps {
    badge: string;
    title: string;
    titleAccent?: string;
    description: string;
    primaryAction: HeroAction;
    secondaryAction?: HeroAction;
    showPhone?: boolean;
}

export default function PageHero({
    badge,
    title,
    titleAccent,
    description,
    primaryAction,
    secondaryAction,
    showPhone = false,
}: PageHeroProps) {
    const [ref, visible] = useInView(0.1);

    return (
        <section ref={ref as React.RefObject<HTMLElement>} className="relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-600">
                {/* Cross pattern */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
                {/* Glowing orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-400/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-300/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4" />
            </div>

            {/* Content */}
            <div className={cn(
                "relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
                showPhone ? "pt-16 pb-24 lg:pt-24 lg:pb-36" : "py-16 lg:py-24"
            )}>
                <div className={cn(showPhone ? "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center" : "max-w-5xl mx-auto text-center")}>
                    <div className={cn(
                        "transition-all duration-700",
                        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}>
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-xs font-medium mb-6">
                            <Shield size={14} className="text-emerald-200" /> {badge}
                        </div>

                        {/* Title */}
                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-[1.15] mb-5">
                            {title}
                            {titleAccent && (
                                <span className="block mt-1 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                                    {titleAccent}
                                </span>
                            )}
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-white/75 max-w-2xl mb-8 leading-relaxed" style={!showPhone ? { marginInline: "auto" } : undefined}>
                            {description}
                        </p>

                        {/* Actions */}
                        <div className={cn("flex flex-col sm:flex-row gap-3", !showPhone && "justify-center")}>
                            <Link
                                href={primaryAction.href}
                                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl bg-white text-emerald-800 font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                            >
                                {primaryAction.label}
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                            {secondaryAction && (
                                <Link
                                    href={secondaryAction.href}
                                    className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl border-2 border-white/30 text-white font-semibold hover:bg-white/10 hover:border-white/50 transition-all duration-300"
                                >
                                    {secondaryAction.label}
                                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Phone mockup (desktop only on home hero) */}
                    {showPhone && (
                        <div className={cn(
                            "hidden lg:flex justify-center transition-all duration-700 delay-200",
                            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                        )}>
                            <PhoneMockup />
                        </div>
                    )}
                </div>
            </div>

            {/* SVG wave divider */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 70" fill="none" className="w-full h-auto">
                    <path
                        d="M0 70V25C240 50 480 5 720 25C960 45 1200 10 1440 25V70H0Z"
                        className="fill-bg-card dark:fill-bg"
                    />
                </svg>
            </div>
        </section>
    );
}
