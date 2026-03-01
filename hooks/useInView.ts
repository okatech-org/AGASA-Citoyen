"use client";

import { useRef, useState, useEffect } from "react";

/**
 * IntersectionObserver hook for scroll-reveal animations.
 * Once visible, stays visible (one-shot).
 */
export function useInView(threshold = 0.12) {
    const ref = useRef<HTMLElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible] as const;
}
