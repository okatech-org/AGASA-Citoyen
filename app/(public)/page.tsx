import type { Metadata } from "next";
import Link from "next/link";
import {
    ShieldCheck,
    Camera,
    Smartphone,
    Download,
    Star,
    AlertTriangle,
    MapPin,
    Bell,
    ChevronRight,
    CheckCircle2,
    Activity
} from "lucide-react";

export const metadata: Metadata = {
    title: "AGASA-Citoyen — Le Pouvoir d'Agir",
    description: "La plateforme citoyenne de l'Agence Gabonaise de Sécurité Alimentaire. Scannez, vérifiez, signalez.",
};

export default function PublicLandingPage() {
    return (
        <div className="min-h-dvh bg-[#FAFAFA] text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 font-sans overflow-x-hidden">

            {/* 1. Navbar Flottante (Removed to use global PublicNav) */}

            {/* 2. Hero Section 3D & Immersive */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background Orbs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full pointer-events-none">
                    <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-emerald-300/40 mix-blend-multiply blur-[120px] opacity-70 animate-pulse" style={{ animationDuration: '8s' }}></div>
                    <div className="absolute top-20 -right-20 w-[600px] h-[600px] rounded-full bg-teal-200/40 mix-blend-multiply blur-[120px] opacity-60 animate-pulse" style={{ animationDuration: '12s' }}></div>
                    <div className="absolute -bottom-40 left-1/3 w-[400px] h-[400px] rounded-full bg-green-200/30 mix-blend-multiply blur-[100px] opacity-50"></div>
                </div>

                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">

                    {/* Left: Text */}
                    <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold mb-8 ring-1 ring-emerald-600/10 shadow-sm">
                            <ShieldCheck className="w-4 h-4" />
                            Transparence Totale — Inspection Officielle
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 leading-[1.05] text-slate-900">
                            Exigez <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">l'Excellence.</span>
                        </h1>
                        <p className="text-lg lg:text-xl text-slate-600 mb-10 leading-relaxed font-light">
                            Vérifiez l'hygiène de vos restaurants au Gabon en un seul geste. Scannez, informez-vous et signalez les anomalies directement à l'AGASA.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <Link href="/scanner" className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 hover:scale-[1.02] transition-all shadow-lg shadow-emerald-600/25 group">
                                <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                Ouvrir le Scanner
                            </Link>
                            <Link href="/comment-ca-marche" className="inline-flex h-14 items-center justify-center px-8 rounded-full bg-white text-slate-700 font-bold text-lg hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all">
                                Comment ça marche ?
                            </Link>
                        </div>
                        <div className="mt-8 flex items-center justify-center lg:justify-start gap-4 text-sm text-slate-500 font-medium">
                            <div className="flex -space-x-2">
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-xs">5⭐</div>
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">3⭐</div>
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-xs"><CheckCircle2 className="w-4 h-4" /></div>
                            </div>
                            <p>Rejoignez 50 000+ citoyens engagés</p>
                        </div>
                    </div>

                    {/* Right: 3D Mockup */}
                    <div className="relative mx-auto w-full max-w-[340px] perspective-[2000px]">
                        {/* Floating elements */}
                        <div className="absolute top-12 -left-12 z-20 bg-white/90 backdrop-blur rounded-2xl p-4 shadow-xl border border-white/40 animate-bounce" style={{ animationDuration: '4s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white text-xl font-bold shadow-sm shadow-emerald-500/20">5</div>
                                <div>
                                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Score</div>
                                    <div className="text-sm font-bold text-slate-800">Excellent</div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-24 -right-16 z-20 bg-slate-900/95 backdrop-blur rounded-2xl p-4 shadow-2xl border border-slate-700 animate-bounce" style={{ animationDuration: '5s', animationDelay: '1s' }}>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-400">
                                    <AlertTriangle className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="text-xs text-slate-400 font-medium">Signalement reçu</div>
                                    <div className="text-sm font-bold text-white">Action AGASA →</div>
                                </div>
                            </div>
                        </div>

                        {/* Phone Body */}
                        <div className="relative transform rotate-y-[-15deg] rotate-x-[5deg] hover:rotate-y-0 hover:rotate-x-0 transition-transform duration-700 ease-out z-10 w-full rounded-[3rem] bg-slate-900 p-3 shadow-2xl ring-1 ring-slate-900/10">
                            {/* Inner Screen */}
                            <div className="relative w-full aspect-[19.5/9] bg-slate-50 rounded-[2.5rem] overflow-hidden flex flex-col">
                                {/* Notch */}
                                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50">
                                    <div className="w-24 h-6 bg-slate-900 rounded-b-xl"></div>
                                </div>

                                {/* Screen Header */}
                                <div className="pt-10 pb-4 px-6 bg-emerald-600 text-white shadow-sm shrink-0">
                                    <div className="flex justify-between items-center mb-6">
                                        <div className="font-bold">AGASA-Scanner</div>
                                        <Camera className="w-5 h-5 opacity-80" />
                                    </div>
                                    <div className="h-40 w-full bg-emerald-700/50 rounded-2xl border-2 border-emerald-400/30 border-dashed flex items-center justify-center backdrop-blur-sm">
                                        <div className="w-16 h-16 rounded-xl border-4 border-white/80 animate-pulse border-dashed"></div>
                                    </div>
                                    <div className="text-center mt-4 text-emerald-100 text-sm font-medium">Scannez le QR Code établissement</div>
                                </div>

                                {/* Screen Body */}
                                <div className="flex-1 p-6 space-y-4 overflow-hidden bg-white">
                                    <div className="w-20 h-2 bg-slate-200 rounded-full mx-auto mb-2"></div>
                                    <div className="w-full h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center px-4 gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-3/4 bg-slate-200 rounded"></div>
                                            <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                    <div className="w-full h-16 bg-slate-50 rounded-2xl border border-slate-100 flex items-center px-4 gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-200"></div>
                                        <div className="flex-1 space-y-2">
                                            <div className="h-3 w-5/6 bg-slate-200 rounded"></div>
                                            <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Bento Grid - Pourquoi AGASA */}
            <section className="py-24 bg-white px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-sm font-extrabold text-emerald-600 tracking-widest uppercase mb-3">La Plateforme</h2>
                        <p className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">Plus qu'une application, <br className="hidden sm:block" />un outil de santé publique.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]">
                        {/* Grande carte (Span 2) */}
                        <div className="md:col-span-2 rounded-3xl bg-emerald-50 p-8 lg:p-12 relative overflow-hidden group shadow-sm border border-emerald-100/50 hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-200/50 rounded-full blur-3xl group-hover:bg-emerald-300/60 transition-colors"></div>
                            <ShieldCheck className="absolute -bottom-8 -right-8 w-64 h-64 text-emerald-600/5 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative z-10 w-full md:w-2/3 h-full flex flex-col justify-center">
                                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6 shadow-sm">
                                    <Activity className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-4">Protégez votre santé et celle de vos proches.</h3>
                                <p className="text-slate-600 leading-relaxed text-lg">En un coup d'œil, accédez au dernier rapport d'inspection officiel avant de consommer dans un établissement.</p>
                            </div>
                        </div>

                        {/* Carte moyenne 1 */}
                        <div className="rounded-3xl bg-slate-50 p-8 relative overflow-hidden group shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                            <Bell className="absolute -top-4 -right-4 w-40 h-40 text-slate-200/50 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center mb-6 shadow-sm">
                                    <AlertTriangle className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Alertez l'AGASA</h3>
                                <p className="text-slate-500">Un produit douteux ? Signalez-le anonymement à nos équipes.</p>
                            </div>
                        </div>

                        {/* Carte moyenne 2 */}
                        <div className="rounded-3xl bg-slate-50 p-8 relative overflow-hidden group shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-slate-900/5 transition-all duration-300">
                            <MapPin className="absolute -top-4 -right-4 w-40 h-40 text-slate-200/50 rotate-12 group-hover:rotate-0 transition-transform duration-500" />
                            <div className="relative z-10 h-full flex flex-col justify-end">
                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 shadow-sm">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">Exigez le meilleur</h3>
                                <p className="text-slate-500">Privilégiez les établissements conformes aux normes d'hygiène.</p>
                            </div>
                        </div>

                        {/* Grande carte horizontale (Span 2) */}
                        <div className="md:col-span-2 rounded-3xl bg-slate-900 p-8 relative overflow-hidden group shadow-xl text-white">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent opacity-50"></div>
                            <Smartphone className="absolute -bottom-10 -right-10 w-56 h-56 text-white/5 -rotate-12 group-hover:scale-110 transition-transform duration-500" />
                            <div className="relative z-10 h-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                <div className="max-w-md">
                                    <h3 className="text-2xl font-bold text-white mb-3">L'AGASA dans votre poche</h3>
                                    <p className="text-slate-300">Application ultralégère, pensée pour être performante même avec une connexion internet instable au Gabon.</p>
                                </div>
                                <Link href="/scanner" className="shrink-0 flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white transition-colors">
                                    <ChevronRight className="w-6 h-6" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Score Smiley - Dark Mode Neon */}
            <section id="smileys" className="py-32 bg-slate-950 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/30 rounded-full blur-[150px] pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-rose-900/20 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center max-w-2xl mx-auto mb-16 lg:mb-24">
                        <h2 className="text-sm font-extrabold text-emerald-400 tracking-widest uppercase mb-3">Transparence</h2>
                        <p className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight">Le Score Smiley, décodé.</p>
                        <p className="mt-4 text-slate-400 text-lg">Inspiré des standards internationaux, de 0 à 5 étoiles pour une lecture instantanée.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { score: "5", title: "Excellent", desc: "Hygiène exemplaire", color: "text-emerald-400", bg: "bg-emerald-400", border: "border-emerald-500/30", glow: "shadow-[0_0_30px_rgba(52,211,153,0.15)]", stars: 5 },
                            { score: "4", title: "Bon", desc: "Améliorations mineures", color: "text-emerald-500", bg: "bg-emerald-500", border: "border-emerald-600/30", glow: "shadow-[0_0_30px_rgba(16,185,129,0.1)]", stars: 4 },
                            { score: "3", title: "Acceptable", desc: "Améliorations nécessaires", color: "text-amber-400", bg: "bg-amber-400", border: "border-amber-500/30", glow: "shadow-[0_0_30px_rgba(251,191,36,0.1)]", stars: 3 },
                            { score: "2", title: "Insuffisant", desc: "Améliorations majeures", color: "text-orange-500", bg: "bg-orange-500", border: "border-orange-600/30", glow: "", stars: 2 },
                            { score: "1", title: "Mauvais", desc: "Risque sanitaire avéré", color: "text-rose-500", bg: "bg-rose-500", border: "border-rose-600/30", glow: "", stars: 1 },
                            { score: "0", title: "Non autorisé", desc: "Fermé ou sans agrément", color: "text-slate-400", bg: "bg-slate-600", border: "border-slate-700", glow: "", stars: 0 },
                        ].map((item) => (
                            <div key={item.score} className={`p-6 rounded-3xl bg-slate-900/50 backdrop-blur-sm border ${item.border} ${item.glow} hover:-translate-y-1 transition-transform duration-300 flex items-start gap-5`}>
                                <div className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center text-slate-950 font-black text-2xl shadow-inner ${item.bg}`}>
                                    {item.score}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold mb-1 ${item.color}`}>{item.title}</h3>
                                    <p className="text-sm text-slate-400 mb-3">{item.desc}</p>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className={`w-4 h-4 ${i < item.stars ? item.color : "text-slate-800"} ${i < item.stars ? "fill-current" : ""}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Impact en chiffres - Giant Typography */}
            <section id="stats" className="py-32 bg-white px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mb-20">L'impact AGASA en vrai.</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                        {[
                            { number: "13K+", label: "Établissements surveillés", color: "text-emerald-600" },
                            { number: "50+", label: "Inspecteurs déployés", color: "text-teal-600" },
                            { number: "100%", label: "Transparence garantie", color: "text-emerald-500" }
                        ].map((stat, idx) => (
                            <div key={idx} className="flex flex-col items-center justify-center pt-8 md:pt-0">
                                <div className={`text-6xl lg:text-8xl font-black tracking-tighter ${stat.color} mb-4`}>
                                    {stat.number}
                                </div>
                                <div className="text-lg lg:text-xl font-bold text-slate-700">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Footer / CTA Massive */}
            <section id="install" className="relative px-4 pb-24 bg-white">
                <div className="max-w-6xl mx-auto bg-slate-900 rounded-[3rem] p-10 lg:p-20 text-center relative overflow-hidden shadow-2xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/40 via-transparent to-teal-900/40 pointer-events-none"></div>

                    <div className="w-20 h-20 mx-auto bg-white/10 rounded-3xl flex items-center justify-center backdrop-blur-md border border-white/20 mb-8">
                        <Download className="w-10 h-10 text-emerald-400" />
                    </div>

                    <h2 className="text-3xl lg:text-5xl font-extrabold text-white tracking-tight mb-6">Emportez la sécurité alimentaire.</h2>
                    <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto mb-12">Installez cette application gratuitement sur l'écran d'accueil de votre téléphone. Aucune publicité, 100% anonyme.</p>

                    <button className="inline-flex h-16 items-center justify-center px-10 rounded-full bg-emerald-500 text-slate-950 font-black text-xl hover:bg-emerald-400 hover:scale-[1.03] transition-all shadow-[0_0_40px_rgba(16,185,129,0.4)]">
                        Installer l'application
                    </button>
                    <p className="text-slate-500 text-sm mt-6 flex items-center justify-center gap-2">
                        <ShieldCheck className="w-4 h-4" /> Application Officielle AGASA
                    </p>
                </div>
            </section>
        </div>
    );
}
