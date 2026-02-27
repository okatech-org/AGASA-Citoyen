"use client";

import { cn } from "@/lib/utils";
import { CATEGORIES, type Categorie } from "@/lib/categories";

interface CategoryPickerProps {
    selected?: string;
    onSelect: (categoryId: string) => void;
    categories?: Categorie[];
    className?: string;
}

export default function CategoryPicker({
    selected,
    onSelect,
    categories = CATEGORIES,
    className,
}: CategoryPickerProps) {
    return (
        <div className={cn("grid grid-cols-2 sm:grid-cols-3 gap-3", className)}>
            {categories.map((cat) => {
                const isSelected = selected === cat.id;
                return (
                    <button
                        key={cat.id}
                        onClick={() => onSelect(cat.id)}
                        className={cn(
                            "flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all touch-feedback",
                            isSelected
                                ? "border-citoyen-green bg-green-50"
                                : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                    >
                        <span className="text-3xl mb-1">{cat.icone}</span>
                        <span
                            className={cn(
                                "text-xs font-medium text-center",
                                isSelected ? "text-citoyen-green" : "text-gray-700"
                            )}
                        >
                            {cat.label}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
