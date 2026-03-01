import { MapPin, Phone, Mail } from "lucide-react";
import PageHero from "@/components/public/PageHero";
import ContactForm from "@/components/public/ContactForm";

const CONTACT_INFO = [
    { icon: MapPin, label: "Adresse", value: "Libreville, Estuaire" },
    { icon: Phone, label: "Téléphone", value: "+241 01 XX XX XX" },
    { icon: Mail, label: "Email", value: "contact@agasa.ga" },
];

export default function ContactPage() {
    return (
        <>
            <PageHero
                badge="Contact"
                title="Écrire à l'équipe AGASA"
                description="Une question sur l'application, une suggestion ou un besoin d'assistance ? Envoyez-nous un message."
                primaryAction={{ label: "Envoyer un message", href: "#form-contact" }}
                secondaryAction={{ label: "Voir la FAQ", href: "/faq" }}
            />

            <div className="py-16 lg:py-24 bg-bg-card dark:bg-bg">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Infos */}
                        <div>
                            <h2 className="font-serif text-2xl font-bold text-text dark:text-text mb-6">Coordonnées</h2>
                            <div className="space-y-3.5">
                                {CONTACT_INFO.map((c) => (
                                    <div key={c.label} className="flex items-center gap-4 p-4 rounded-xl bg-bg-muted dark:bg-bg-muted/50 border border-border dark:border-border">
                                        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                                            <c.icon size={18} className="text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-text-muted dark:text-text-muted">{c.label}</p>
                                            <p className="text-sm font-semibold text-text dark:text-text">{c.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/40">
                                <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-1">Délais indicatifs</p>
                                <p className="text-sm text-blue-600 dark:text-blue-300/80">
                                    Les demandes sont traitées selon leur priorité. Les messages liés à un risque sanitaire immédiat doivent être accompagnés d&apos;un signalement.
                                </p>
                            </div>
                        </div>

                        {/* Form */}
                        <div id="form-contact">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
