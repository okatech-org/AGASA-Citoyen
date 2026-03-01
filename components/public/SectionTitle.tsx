import { cn } from "@/lib/utils";

interface SectionTitleProps {
    eyebrow?: string;
    title: string;
    titleAccent?: string;
    description?: string;
    align?: "left" | "center";
    className?: string;
}

export default function SectionTitle({
    eyebrow,
    title,
    titleAccent,
    description,
    align = "left",
    className,
}: SectionTitleProps) {
    return (
        <div className={cn(align === "center" && "text-center", className)}>
            {eyebrow && (
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-3">
                    {eyebrow}
                </p>
            )}
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-text dark:text-text mb-3">
                {title}
                {titleAccent && (
                    <>
                        {" "}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
                            {titleAccent}
                        </span>
                    </>
                )}
            </h2>
            {description && (
                <p className={cn(
                    "text-text-muted dark:text-text-muted max-w-2xl leading-relaxed",
                    align === "center" && "mx-auto",
                )}>
                    {description}
                </p>
            )}
        </div>
    );
}
