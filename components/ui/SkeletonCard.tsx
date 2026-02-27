import { cn } from "@/lib/utils";

interface SkeletonCardProps {
    lines?: number;
    showAvatar?: boolean;
    className?: string;
}

export default function SkeletonCard({
    lines = 3,
    showAvatar = false,
    className,
}: SkeletonCardProps) {
    return (
        <div className={cn("bg-white rounded-2xl p-4 space-y-3", className)}>
            <div className="flex items-center gap-3">
                {showAvatar && (
                    <div className="skeleton skeleton-circle w-10 h-10 flex-shrink-0" />
                )}
                <div className="flex-1 space-y-2">
                    <div className="skeleton h-4 w-3/4 rounded" />
                    <div className="skeleton h-3 w-1/2 rounded" />
                </div>
            </div>
            {Array.from({ length: lines }).map((_, i) => (
                <div
                    key={i}
                    className="skeleton h-3 rounded"
                    style={{ width: `${85 - i * 15}%` }}
                />
            ))}
        </div>
    );
}
