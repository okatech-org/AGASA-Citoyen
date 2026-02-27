import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg";
    className?: string;
    text?: string;
}

const sizeStyles = {
    sm: "w-5 h-5 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4",
};

export default function LoadingSpinner({
    size = "md",
    className,
    text,
}: LoadingSpinnerProps) {
    return (
        <div className={cn("flex flex-col items-center justify-center gap-3", className)}>
            <div
                className={cn(
                    "rounded-full border-gray-200 border-t-citoyen-green animate-spin",
                    sizeStyles[size]
                )}
            />
            {text && <p className="text-sm text-gray-500">{text}</p>}
        </div>
    );
}
