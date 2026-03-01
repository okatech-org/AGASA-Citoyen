"use client";

import SmileyBadge from "./SmileyBadge";
import { cn } from "@/lib/utils";
import { MapPin, ChevronRight } from "lucide-react";

interface EtablissementCardProps {
    nom: string;
    typeActivite: string;
    typeActiviteIcone: string;
    smiley: number;
    adresse: string;
    ville: string;
    distance?: string;
    onClick?: () => void;
    className?: string;
}

export default function EtablissementCard({
    nom,
    typeActivite,
    typeActiviteIcone,
    smiley,
    adresse,
    ville,
    distance,
    onClick,
    className,
}: EtablissementCardProps) {
    return (
        <div
            onClick={onClick}
            className={cn(
                "card flex items-center gap-3 cursor-pointer touch-feedback hover:shadow-md transition-shadow",
                className
            )}
        >
            {/* Type Icon */}
            <div className="w-10 h-10 rounded-xl bg-bg-muted flex items-center justify-center text-xl flex-shrink-0">
                {typeActiviteIcone}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-text truncate text-sm">{nom}</h3>
                    <SmileyBadge score={smiley} />
                </div>
                <p className="text-xs text-text-muted mt-0.5">{typeActivite}</p>
                <div className="flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-text-muted flex-shrink-0" />
                    <p className="text-xs text-text-muted truncate">
                        {adresse}, {ville}
                    </p>
                    {distance && (
                        <span className="text-xs text-blue font-medium ml-auto flex-shrink-0">
                            {distance}
                        </span>
                    )}
                </div>
            </div>

            {/* Arrow */}
            <ChevronRight className="w-5 h-5 text-text-muted flex-shrink-0" />
        </div>
    );
}
