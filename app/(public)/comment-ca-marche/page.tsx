import type { Metadata } from "next";
import Link from "next/link";
import {
    Smartphone,
    Star,
    AlertTriangle,
    Camera,
    ChevronRight,
    Search,
    FishOff,
    Bug,
    Ban,
    ThermometerSnowflake
} from "lucide-react";

export const metadata: Metadata = {
    title: "Comment ça marche — AGASA-Citoyen",
    description:
        "Découvrez comment scanner un QR code AGASA, comprendre le score Smiley et signaler un problème sanitaire.",
};

export default function CommentCaMarchePage() {
    return (
        <div className="min-h-dvh bg-slate-50 text-slate-900 pb-20 selection:bg-emerald-200 selection:text-emerald-900">
            {/* Header / Intro */}
            <div className="bg-emerald-900 text-white pt-24 pb-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md mb-6 text-sm font-medium text-emerald-100">
                        <Search className="w-4 h-4 text-emerald-300" />
                        <span>Guide d'utilisation détaillé</span>
                    </div>
                    <h1 className="text-4xl lg:text-5xl lg:leading-[1.1] font-extrabold mb-6 tracking-tight drop-shadow-sm">
                        Comment fonctionne <br className="hidden sm:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-100">AGASA-Citoyen ?</span>
                    </h1>
                    <p className="text-emerald-50/90 text-lg lg:text-xl font-light max-w-2xl mx-auto">
                        Suivez ce guide simple en 3 étapes pour utiliser l'application au quotidien et participer à la sécurité alimentaire du pays.
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20 space-y-8 lg:space-y-12">

                {/* Étape 1 */}
                <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-sm border border-emerald-200">
                            <Smartphone className="w-8 h-8" />
                        </div>
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold flex items-center gap-3 mb-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-700 text-white text-sm">1</span>
                                    Scannez le QR code officiel
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Chaque établissement alimentaire agréé par l&apos;AGASA affiche obligatoirement un <strong>QR code officiel</strong> visible dès l'entrée. Ce code contient les résultats de la dernière inspection.
                                </p>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 text-center border border-slate-100 px-4 sm:px-8 flex flex-col items-center">
                                <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 text-emerald-600">
                                    <Camera className="w-8 h-8" />
                                </div>
                                <p className="text-slate-500 font-medium">
                                    Lancez l&apos;application <span className="mx-2 text-slate-300">→</span> Pointez la caméra <span className="mx-2 text-slate-300">→</span> Résultat instantané
                                </p>
                            </div>

                            <ul className="space-y-3 text-slate-600">
                                <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckIcon className="w-4 h-4" /></div> Pas besoin de connexion internet pour le scan de base</li>
                                <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckIcon className="w-4 h-4" /></div> Affichage du résultat en moins de 2 secondes</li>
                                <li className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center"><CheckIcon className="w-4 h-4" /></div> Totalement anonyme et gratuit</li>
                            </ul>
                        </div>
                    </div>
                </section>

                {/* Étape 2 */}
                <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 shadow-sm border border-amber-200">
                            <Star className="w-8 h-8" />
                        </div>
                        <div className="flex-1 space-y-6 w-full">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold flex items-center gap-3 mb-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-500 text-white text-sm">2</span>
                                    Comprenez le score Smiley
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Dès le scan effectué, l'application affiche un <strong>score Smiley de 0 à 5 étoiles</strong> reflétant le niveau d&apos;hygiène exact de l&apos;établissement.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                                {[
                                    { score: "5", label: "Excellent", text: "Mangez en confiance", bg: "bg-emerald-700", border: "border-emerald-200" },
                                    { score: "4", label: "Bon", text: "Améliorations mineures", bg: "bg-emerald-500", border: "border-emerald-200" },
                                    { score: "3", label: "Acceptable", text: "Restez vigilant", bg: "bg-amber-400", border: "border-amber-200" },
                                    { score: "2", label: "Insuffisant", text: "Prudence recommandée", bg: "bg-orange-500", border: "border-orange-200" },
                                    { score: "1", label: "Mauvais", text: "Risque, à éviter", bg: "bg-rose-600", border: "border-rose-200" },
                                    { score: "0", label: "Fermé", text: "Sans agrément valide", bg: "bg-slate-800", border: "border-slate-300" },
                                ].map((item) => (
                                    <div key={item.score} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3 hover:bg-white hover:shadow-sm transition-all duration-200">
                                        <div
                                            className={`w-10 h-10 rounded-lg flex-shrink-0 flex items-center justify-center text-white font-bold shadow-sm ${item.bg}`}
                                        >
                                            {item.score}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-slate-900 truncate">{item.label}</p>
                                            <p className="text-[11px] font-medium text-slate-500 truncate">{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Étape 3 */}
                <section className="bg-white rounded-3xl p-6 lg:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 items-start">
                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shadow-sm border border-rose-200">
                            <AlertTriangle className="w-8 h-8" />
                        </div>
                        <div className="flex-1 space-y-6 w-full">
                            <div>
                                <h2 className="text-2xl lg:text-3xl font-bold flex items-center gap-3 mb-3">
                                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-600 text-white text-sm">3</span>
                                    Signalez les anomalies
                                </h2>
                                <p className="text-slate-600 leading-relaxed text-lg">
                                    Vous constatez un problème flagrant ? <strong>Prenez une photo et envoyez-la</strong>. L&apos;AGASA recevra l'alerte immédiatement et déclenchera une procédure d'inspection.
                                </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
                                {[
                                    { icon: <FishOff className="w-6 h-6 text-rose-500" />, text: "Avarié / Périmé" },
                                    { icon: <Bug className="w-6 h-6 text-amber-700" />, text: "Insalubrité" },
                                    { icon: <Ban className="w-6 h-6 text-slate-700" />, text: "Non agréé" },
                                    { icon: <ThermometerSnowflake className="w-6 h-6 text-blue-500" />, text: "Chaîne du froid" },
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center hover:bg-white hover:shadow-md transition-all duration-200 group">
                                        <div className="w-12 h-12 mx-auto bg-white rounded-full shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <p className="text-xs sm:text-sm font-semibold text-slate-700">{item.text}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex gap-3 text-sm text-blue-900 mt-2">
                                <ShieldCheckIcon className="w-5 h-5 text-blue-600 shrink-0" />
                                <p><strong>Votre anonymat est garanti.</strong> L'AGASA utilise ces informations uniquement pour cibler ses inspections routinières, sans dévoiler la source du signalement.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="text-center pt-8 pb-4">
                    <Link
                        href="/scanner"
                        className="inline-flex h-16 w-full sm:w-auto min-w-[300px] justify-center px-8 bg-emerald-700 text-white font-bold text-xl rounded-2xl items-center gap-3 shadow-[0_10px_30px_rgba(4,120,87,0.3)] hover:shadow-[0_10px_40px_rgba(4,120,87,0.4)] hover:-translate-y-1 hover:bg-emerald-800 transition-all touch-feedback group"
                    >
                        <Camera className="w-6 h-6 group-hover:scale-110 transition-transform" />
                        Essayer le Scanner
                    </Link>
                    <p className="text-slate-500 mt-4 text-sm font-medium">Application web progressive · Aucune installation obligatoire</p>
                </div>
            </div>
        </div>
    );
}

// Icônes locales
function CheckIcon(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12" /></svg>
}

function ShieldCheckIcon(props: any) {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
}
