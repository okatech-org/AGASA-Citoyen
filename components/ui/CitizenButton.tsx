"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CitizenButtonProps {
    children: ReactNode;
    variant?: "primary" | "danger" | "secondary" | "ghost";
    icon?: ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
    size?: "sm" | "md" | "lg";
}

const variantStyles = {
    primary: "bg-citoyen-green text-white hover:bg-citoyen-green-light",
    danger: "bg-citoyen-red text-white hover:bg-red-700",
    secondary: "bg-citoyen-blue text-white hover:bg-blue-700",
    ghost: "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50",
};

const sizeStyles = {
    sm: "min-h-10 text-sm px-3 rounded-xl",
    md: "min-h-btn text-base px-5 rounded-btn",
    lg: "min-h-14 text-lg px-6 rounded-btn",
};

export default function CitizenButton({
    children,
    variant = "primary",
    icon,
    onClick,
    disabled = false,
    fullWidth = true,
    type = "button",
    className,
    size = "md",
}: CitizenButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "font-semibold flex items-center justify-center gap-2 transition-all touch-feedback",
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && "w-full",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
        </button>
    );
}
