"use client";

import { useState } from "react";
import CitizenButton from "@/components/ui/CitizenButton";
import { Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
    const [sent, setSent] = useState(false);
    const [form, setForm] = useState({
        nom: "",
        contact: "",
        message: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSent(true);
    };

    if (sent) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 text-center">
                <CheckCircle className="w-16 h-16 text-[#2E7D32] mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h2>
                <p className="text-sm text-gray-500">
                    Merci pour votre message. L&apos;AGASA vous répondra dans les meilleurs délais.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-gray-900">
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-2">Contactez-nous</h1>
            <p className="text-gray-500 mb-8 lg:mb-12 lg:text-lg">
                Une question ? Une suggestion ? L&apos;équipe AGASA vous répond.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                {/* Formulaire — 3/5 */}
                <div className="lg:col-span-3">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="nom" className="text-sm font-medium text-gray-700 mb-1.5 block">
                                Nom <span className="text-gray-400">(optionnel)</span>
                            </label>
                            <input
                                id="nom"
                                type="text"
                                value={form.nom}
                                onChange={(e) => setForm({ ...form, nom: e.target.value })}
                                placeholder="Votre nom"
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition-all"
                            />
                        </div>

                        <div>
                            <label htmlFor="contact" className="text-sm font-medium text-gray-700 mb-1.5 block">
                                Téléphone ou Email
                            </label>
                            <input
                                id="contact"
                                type="text"
                                value={form.contact}
                                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                                placeholder="077 XX XX XX ou email@exemple.com"
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-1.5 block">
                                Message
                            </label>
                            <textarea
                                id="message"
                                value={form.message}
                                onChange={(e) => setForm({ ...form, message: e.target.value })}
                                placeholder="Décrivez votre question ou suggestion..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-base focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/30 focus:border-[#2E7D32] resize-none transition-all"
                                required
                            />
                        </div>

                        <CitizenButton type="submit" icon={<Send className="w-5 h-5" />}>
                            Envoyer le message
                        </CitizenButton>
                    </form>
                </div>

                {/* Coordonnées — 2/5 */}
                <div className="lg:col-span-2">
                    <div className="bg-gray-50 rounded-2xl p-6 space-y-4 sticky top-24">
                        <h2 className="font-bold text-gray-900 text-lg">Coordonnées AGASA</h2>
                        <div className="text-sm text-gray-600 space-y-3">
                            <p className="flex items-start gap-2">📍 <span>Libreville, Estuaire — République Gabonaise</span></p>
                            <p className="flex items-start gap-2">📞 <span>+241 01 XX XX XX</span></p>
                            <p className="flex items-start gap-2">📧 <span>contact@agasa.ga</span></p>
                        </div>
                        <div className="border-t border-gray-200 pt-4">
                            <p className="text-xs text-gray-500">
                                🏢 <strong>Opérateurs économiques</strong> : Pour les questions liées à l&apos;agrément
                                et aux inspections, utilisez{" "}
                                <span className="text-[#1565C0] font-semibold">AGASA-Pro</span>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
