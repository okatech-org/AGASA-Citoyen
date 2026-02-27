"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRef, useCallback, useEffect, useState } from "react";

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onSearch: (query: string) => void;
    debounceMs?: number;
    className?: string;
}

export default function SearchBar({
    placeholder = "Rechercher...",
    value: externalValue,
    onSearch,
    debounceMs = 300,
    className,
}: SearchBarProps) {
    const [value, setValue] = useState(externalValue || "");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const debouncedSearch = useCallback(
        (query: string) => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                onSearch(query);
            }, debounceMs);
        },
        [onSearch, debounceMs]
    );

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        debouncedSearch(newValue);
    };

    const handleClear = () => {
        setValue("");
        onSearch("");
    };

    return (
        <div className={cn("relative", className)}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={cn(
                    "w-full h-12 pl-10 pr-10 rounded-xl border border-gray-200 bg-white",
                    "text-base text-gray-900 placeholder-gray-400",
                    "focus:outline-none focus:ring-2 focus:ring-citoyen-green focus:border-transparent",
                    "transition-all"
                )}
            />
            {value && (
                <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 touch-feedback"
                >
                    <X className="w-4 h-4 text-gray-400" />
                </button>
            )}
        </div>
    );
}
