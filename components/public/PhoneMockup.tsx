import { Shield, Star } from "lucide-react";

export default function PhoneMockup() {
    return (
        <div className="relative">
            <div className="w-[280px] h-[560px] rounded-[3rem] border-[8px] border-border bg-bg-card dark:bg-bg shadow-2xl overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 inset-x-0 h-7 bg-bg-card rounded-b-2xl flex items-center justify-center">
                    <div className="w-20 h-3.5 bg-gray-900 rounded-full" />
                </div>

                <div className="pt-10 px-5 pb-5">
                    {/* App header */}
                    <div className="text-center mb-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 mx-auto mb-2 flex items-center justify-center">
                            <Shield size={24} className="text-emerald-600" />
                        </div>
                        <p className="text-xs font-bold text-text dark:text-text">Résultat du scan</p>
                    </div>

                    {/* Score card */}
                    <div className="bg-gradient-to-b from-emerald-50 to-white dark:from-emerald-950/30 dark:to-gray-900 rounded-2xl p-4 text-center border border-emerald-100 dark:border-emerald-900/50">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-600 to-green-500 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 mb-3">
                            😄
                        </div>
                        <p className="font-bold text-2xl text-text dark:text-text">5/5</p>
                        <div className="flex justify-center gap-0.5 my-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <Star key={i} size={13} className="fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-green-700 dark:text-green-400 text-xs font-semibold">
                            Excellent — Hygiène exemplaire
                        </p>
                    </div>

                    {/* Details */}
                    <div className="mt-3 space-y-2">
                        <div className="bg-bg-muted dark:bg-bg-muted rounded-xl p-3">
                            <p className="text-[10px] text-text-muted dark:text-text-muted">Établissement</p>
                            <p className="text-xs font-semibold text-text dark:text-text">Chez Mama Ngoué</p>
                        </div>
                        <div className="bg-bg-muted dark:bg-bg-muted rounded-xl p-3">
                            <p className="text-[10px] text-text-muted dark:text-text-muted">Dernière inspection</p>
                            <p className="text-xs font-semibold text-text dark:text-text">14 janvier 2026</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 flex gap-2">
                        <div className="flex-1 py-2 rounded-xl bg-emerald-600 text-white text-[10px] font-bold text-center">
                            📍 Itinéraire
                        </div>
                        <div className="flex-1 py-2 rounded-xl bg-red-600 text-white text-[10px] font-bold text-center">
                            🚨 Signaler
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-12 top-24 px-3 py-2 rounded-xl bg-white dark:bg-bg-card shadow-xl border border-border dark:border-border animate-bounce-slow">
                <p className="text-xs font-bold text-emerald-600">✅ Agréé</p>
            </div>
            <div className="absolute -right-8 bottom-32 px-3 py-2 rounded-xl bg-white dark:bg-bg-card shadow-xl border border-border dark:border-border animate-bounce-slow" style={{ animationDelay: "1s" }}>
                <p className="text-xs font-bold text-amber-600">⭐ 5/5</p>
            </div>
        </div>
    );
}
