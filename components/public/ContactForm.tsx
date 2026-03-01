"use client";

import { FormEvent, useState } from "react";
import { CheckCircle } from "lucide-react";
import type { ContactSujet } from "@/lib/public/types";

const SUBJECT_OPTIONS: Array<{ value: ContactSujet; label: string }> = [
    { value: "question", label: "Question" },
    { value: "suggestion", label: "Suggestion" },
    { value: "support", label: "Support" },
    { value: "autre", label: "Autre" },
];

export default function ContactForm() {
    const [form, setForm] = useState({ nom: "", contact: "", sujet: "", message: "" });
    const [sent, setSent] = useState(false);
    const [reference, setReference] = useState("");

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        setReference(`MSG-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`);
        setSent(true);
    };

    if (sent) {
        return (
            <div className="p-8 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/50 text-center">
                <CheckCircle size={48} className="text-emerald-500 mx-auto mb-4" />
                <h3 className="font-serif text-xl font-bold text-text dark:text-text mb-2">
                    Votre message a bien été transmis à l&apos;équipe AGASA.
                </h3>
                <p className="text-sm text-text-muted dark:text-text-muted mb-1">Référence : {reference}</p>
                <button
                    onClick={() => {
                        setSent(false);
                        setForm({ nom: "", contact: "", sujet: "", message: "" });
                    }}
                    className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                >
                    Envoyer un autre message
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={onSubmit} className="p-6 lg:p-8 rounded-2xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border">
            <h3 className="font-serif text-lg font-bold text-text dark:text-text mb-6">Formulaire de contact</h3>
            <div className="space-y-4">
                <div>
                    <label htmlFor="nom" className="block text-xs font-medium text-text-muted dark:text-text-muted mb-1.5">
                        Nom <span className="text-text-muted">(optionnel)</span>
                    </label>
                    <input
                        id="nom"
                        type="text"
                        placeholder="Votre nom"
                        maxLength={80}
                        value={form.nom}
                        onChange={(e) => setForm({ ...form, nom: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-card dark:bg-bg border border-border dark:border-border text-sm text-text dark:text-text placeholder:text-text-muted focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="contact" className="block text-xs font-medium text-text-muted dark:text-text-muted mb-1.5">
                        Contact *
                    </label>
                    <input
                        id="contact"
                        type="text"
                        placeholder="email@exemple.com ou +241 07 00 00 00"
                        required
                        value={form.contact}
                        onChange={(e) => setForm({ ...form, contact: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-card dark:bg-bg border border-border dark:border-border text-sm text-text dark:text-text placeholder:text-text-muted focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                    />
                </div>
                <div>
                    <label htmlFor="sujet" className="block text-xs font-medium text-text-muted dark:text-text-muted mb-1.5">
                        Sujet *
                    </label>
                    <select
                        id="sujet"
                        required
                        value={form.sujet}
                        onChange={(e) => setForm({ ...form, sujet: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-card dark:bg-bg border border-border dark:border-border text-sm text-text dark:text-text focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all"
                    >
                        <option value="">Sélectionnez un sujet</option>
                        {SUBJECT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="message" className="block text-xs font-medium text-text-muted dark:text-text-muted mb-1.5">
                        Message *
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        placeholder="Décrivez votre demande"
                        minLength={10}
                        maxLength={2000}
                        required
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-bg-card dark:bg-bg border border-border dark:border-border text-sm text-text dark:text-text placeholder:text-text-muted focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 outline-none transition-all resize-none"
                    />
                </div>
                {/* Honeypot */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />
                <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:-translate-y-0.5 transition-all duration-200"
                >
                    Envoyer le message
                </button>
            </div>
        </form>
    );
}
