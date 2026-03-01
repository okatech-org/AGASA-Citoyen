"use client";

import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface AlertCardProps {
    titre: string;
    produit: string;
    urgence: "critique" | "importante" | "moderee" | "information";
    dateEmission: number;
    portee: string;
    isNew?: boolean;
    onClick?: () => void;
    className?: string;
}

const urgenceConfig = {
    critique: {
        label: "CRITIQUE",
        color: "#C62828",
        borderColor: "border-l-4 border-l-rose",
        bgColor: "bg-red-50",
        icon: "🔴",
    },
    importante: {
        label: "IMPORTANTE",
        color: "#EF6C00",
        borderColor: "border-l-4 border-l-amber",
        bgColor: "bg-orange-50",
        icon: "🟠",
    },
    moderee: {
        label: "MODÉRÉE",
        color: "#F9A825",
        borderColor: "border-l-4 border-l-citoyen-yellow",
        bgColor: "bg-yellow-50",
        icon: "🟡",
    },
    information: {
        label: "INFORMATION",
        color: "#1565C0",
        borderColor: "border-l-4 border-l-blue",
        bgColor: "bg-blue-50",
        icon: "🔵",
    },
};

export default function AlertCard({
    titre,
    produit,
    urgence,
    dateEmission,
    portee,
    isNew = false,
    onClick,
    className,
}: AlertCardProps) {
    const config = urgenceConfig[urgence];

    return (
        <div
            onClick={onClick}
            className={cn(
                "card cursor-pointer touch-feedback hover:shadow-md transition-shadow",
                config.borderColor,
                className
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                    <span>{config.icon}</span>
                    <span
                        className="text-xs font-bold"
                        style={{ color: config.color }}
                    >
                        {config.label}
                    </span>
                    {isNew && (
                        <span className="badge bg-rose text-white text-[10px]">
                            NOUVEAU
                        </span>
                    )}
                </div>
                <span className="text-xs text-gray-400">
                    {formatRelativeDate(dateEmission)}
                </span>
            </div>

            {/* Content */}
            <h3 className="text-sm font-semibold text-gray-900 mb-1">⚠️ {titre}</h3>
            <p className="text-xs text-gray-600 mb-2">Produit : {produit}</p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">📍 {portee}</span>
                <div className="flex items-center gap-1 text-blue">
                    <span className="text-xs font-medium">Voir détail</span>
                    <ChevronRight className="w-4 h-4" />
                </div>
            </div>
        </div>
    );
}
