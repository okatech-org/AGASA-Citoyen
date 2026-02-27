"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_ITEMS = [
    {
        question: "L'application est-elle vraiment gratuite ?",
        answer:
            "Oui, 100% gratuite. AGASA-Citoyen est un service public financé par l'État gabonais. Aucun frais caché, aucun abonnement, aucune publicité.",
    },
    {
        question: "Dois-je créer un compte pour utiliser l'application ?",
        answer:
            "Non ! Vous pouvez scanner les QR codes, consulter la carte, lire les manuels et recevoir les alertes sans aucun compte. Un compte optionnel (juste votre numéro de téléphone) vous permet de suivre vos signalements et de recevoir des alertes personnalisées.",
    },
    {
        question: "Mon identité est-elle protégée quand je fais un signalement ?",
        answer:
            "Oui, l'anonymat est garanti. Vos signalements sont confidentiels. Même si vous créez un compte, votre identité n'est jamais révélée aux établissements signalés. Seuls les inspecteurs de l'AGASA traitent les signalements.",
    },
    {
        question: "Que se passe-t-il après mon signalement ?",
        answer:
            "Votre signalement est reçu par l'antenne AGASA de votre province. Un modérateur le vérifie, puis une inspection est programmée dans les meilleurs délais. Vous pouvez suivre l'avancement si vous avez un compte.",
    },
    {
        question: "Comment est calculé le score Smiley ?",
        answer:
            "Le score Smiley (0 à 5) est calculé automatiquement à partir des résultats de l'inspection officielle. Il prend en compte l'hygiène générale, la conservation des aliments, la formation du personnel, la traçabilité et les conditions de préparation. Le barème est national et identique pour tous.",
    },
    {
        question: "Et si un établissement n'a pas de QR code ?",
        answer:
            "Vous pouvez chercher l'établissement sur la carte interactive ou signaler qu'il ne possède pas de QR code. Un établissement sans QR code peut ne pas avoir d'agrément sanitaire valide.",
    },
    {
        question: "Les alertes consomment-elles beaucoup de données ?",
        answer:
            "Non, moins de 1 Ko par alerte. L'application est optimisée pour fonctionner avec une connexion lente ou instable.",
    },
    {
        question: "Puis-je utiliser l'application hors-ligne ?",
        answer:
            "Partiellement. Les établissements récemment consultés sont mis en cache. Le scan QR fonctionne hors-ligne si l'établissement a été visité récemment. Les signalements sont sauvegardés et envoyés dès que la connexion revient.",
    },
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-gray-900">
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-2">
                Questions fréquentes
            </h1>
            <p className="text-gray-500 mb-10 lg:mb-14 lg:text-lg">
                Tout ce que vous devez savoir sur AGASA-Citoyen
            </p>

            <div className="space-y-3">
                {FAQ_ITEMS.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-gray-200 transition-colors"
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            className="w-full flex items-center justify-between p-5 lg:p-6 text-left touch-feedback"
                        >
                            <span className="font-semibold text-gray-900 text-sm lg:text-base pr-4">
                                {item.question}
                            </span>
                            <ChevronDown
                                className={cn(
                                    "w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200",
                                    openIndex === index && "rotate-180"
                                )}
                            />
                        </button>
                        <div
                            className={cn(
                                "overflow-hidden transition-all duration-300",
                                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                            )}
                        >
                            <p className="px-5 lg:px-6 pb-5 lg:pb-6 text-sm lg:text-base text-gray-600 leading-relaxed">
                                {item.answer}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Support */}
            <div className="mt-12 bg-green-50 rounded-2xl p-6 lg:p-8 text-center">
                <p className="text-sm lg:text-base text-gray-700 mb-4">
                    Vous n&apos;avez pas trouvé votre réponse ?
                </p>
                <a
                    href="/contact"
                    className="inline-flex h-12 px-8 bg-gradient-to-r from-[#2E7D32] to-[#43A047] text-white font-semibold text-sm lg:text-base rounded-xl items-center gap-2 hover:shadow-lg transition-all hover:scale-[1.02]"
                >
                    📧 Nous contacter
                </a>
            </div>
        </div>
    );
}
