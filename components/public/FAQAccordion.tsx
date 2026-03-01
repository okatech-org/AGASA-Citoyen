"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS, FAQ_CATEGORY_LABELS } from "@/lib/public/faq";

export default function FAQAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const categories = Object.keys(FAQ_CATEGORY_LABELS) as Array<keyof typeof FAQ_CATEGORY_LABELS>;
    let globalIndex = 0;

    return (
        <div className="space-y-10">
            {categories.map((category) => {
                const items = FAQ_ITEMS.filter((item) => item.category === category);
                if (items.length === 0) return null;

                return (
                    <div key={category}>
                        <h3 className="font-serif text-lg font-bold text-text dark:text-text mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            {FAQ_CATEGORY_LABELS[category]}
                        </h3>
                        <div className="space-y-2.5">
                            {items.map((faq) => {
                                const idx = globalIndex++;
                                const isOpen = openIndex === idx;

                                return (
                                    <div
                                        key={idx}
                                        className="rounded-2xl border border-border dark:border-border bg-bg-muted dark:bg-bg-muted/50 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                                            className="w-full flex items-center justify-between p-5 text-left"
                                        >
                                            <span className="font-medium text-text dark:text-text pr-4 text-[15px]">
                                                {faq.question}
                                            </span>
                                            <ChevronDown
                                                size={18}
                                                className={`text-text-muted shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                            />
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-5 -mt-1">
                                                <p className="text-sm text-text-muted dark:text-text-muted leading-relaxed">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
