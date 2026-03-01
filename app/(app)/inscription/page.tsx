"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import CitizenButton from "@/components/ui/CitizenButton";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { ArrowLeft, Phone, KeyRound, User } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "phone" | "otp" | "pseudo";

export default function InscriptionPage() {
    const router = useRouter();
    const { register, verifyOTP, updatePseudo } = useAuth();
    const [step, setStep] = useState<Step>("phone");
    const [telephone, setTelephone] = useState("");
    const [otpCode, setOtpCode] = useState("");
    const [pseudo, setPseudo] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isNewUser, setIsNewUser] = useState(false);

    const handleRequestOTP = async () => {
        if (!telephone || telephone.length < 8) {
            setError("Numéro de téléphone invalide");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const result = await register(telephone);
            setIsNewUser(result.isNewUser);
            setStep("otp");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur lors de l'envoi");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOTP = async () => {
        if (!otpCode || otpCode.length !== 4) {
            setError("Code à 4 chiffres requis");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await verifyOTP(telephone, otpCode);
            if (isNewUser) {
                setStep("pseudo");
            } else {
                router.push("/scanner");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Code incorrect");
        } finally {
            setLoading(false);
        }
    };

    const handleSetPseudo = async () => {
        setLoading(true);
        try {
            if (pseudo.trim()) {
                await updatePseudo(pseudo.trim());
            }
            router.push("/scanner");
        } catch {
            router.push("/scanner");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-dvh bg-white flex flex-col">
            {/* Header */}
            <div className="p-4 flex items-center gap-3">
                <button
                    onClick={() => {
                        if (step === "otp") setStep("phone");
                        else if (step === "pseudo") router.push("/scanner");
                        else router.back();
                    }}
                    className="p-2 touch-feedback rounded-xl"
                >
                    <ArrowLeft className="w-5 h-5 text-text" />
                </button>
                <h1 className="text-lg font-bold text-text">
                    {step === "phone" && "Créer un compte"}
                    {step === "otp" && "Vérification"}
                    {step === "pseudo" && "Votre pseudo"}
                </h1>
            </div>

            {/* Progress bar */}
            <div className="px-4 mb-6">
                <div className="flex gap-2">
                    {(["phone", "otp", "pseudo"] as Step[]).map((s, i) => (
                        <div
                            key={s}
                            className={cn(
                                "h-1 flex-1 rounded-full transition-colors",
                                i <= ["phone", "otp", "pseudo"].indexOf(step)
                                    ? "bg-emerald"
                                    : "bg-border"
                            )}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1 px-4 pb-8">
                {/* Step 1: Phone */}
                {step === "phone" && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                <Phone className="w-10 h-10 text-emerald" />
                            </div>
                            <h2 className="text-xl font-bold text-text mb-2">Votre numéro de téléphone</h2>
                            <p className="text-sm text-text-muted">
                                Inscription optionnelle pour suivre vos signalements
                            </p>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-text mb-1 block">
                                Numéro de téléphone
                            </label>
                            <div className="flex items-center gap-2">
                                <span className="text-base font-medium text-text-muted bg-bg-muted px-3 py-3 rounded-xl">
                                    +241
                                </span>
                                <input
                                    type="tel"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value.replace(/\D/g, ""))}
                                    placeholder="06 XX XX XX"
                                    maxLength={9}
                                    className="flex-1 h-12 px-4 rounded-xl border border-border text-base focus:outline-none focus:ring-2 focus:ring-emerald"
                                    inputMode="tel"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-sm text-rose bg-red-50 p-3 rounded-xl">{error}</p>
                        )}

                        <CitizenButton onClick={handleRequestOTP} disabled={loading || !telephone}>
                            {loading ? <LoadingSpinner size="sm" /> : "Recevoir le code SMS"}
                        </CitizenButton>

                        <p className="text-center text-xs text-text-muted">
                            🔒 Aucune donnée personnelle n&apos;est partagée.
                            <br />
                            En mode démo, le code est <strong>1234</strong>.
                        </p>
                    </div>
                )}

                {/* Step 2: OTP */}
                {step === "otp" && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                <KeyRound className="w-10 h-10 text-emerald" />
                            </div>
                            <h2 className="text-xl font-bold text-text mb-2">Code de vérification</h2>
                            <p className="text-sm text-text-muted">
                                Entrez le code à 4 chiffres envoyé au +241 {telephone}
                            </p>
                        </div>

                        <div className="flex justify-center gap-3">
                            {[0, 1, 2, 3].map((i) => (
                                <input
                                    key={i}
                                    type="text"
                                    maxLength={1}
                                    value={otpCode[i] || ""}
                                    inputMode="numeric"
                                    className={cn(
                                        "w-14 h-16 text-center text-2xl font-bold rounded-xl border-2 transition-colors",
                                        "focus:outline-none focus:border-emerald",
                                        otpCode[i] ? "border-emerald bg-green-50" : "border-border"
                                    )}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/\D/g, "");
                                        const newCode = otpCode.split("");
                                        newCode[i] = val;
                                        setOtpCode(newCode.join(""));
                                        // Auto-focus next input
                                        if (val && e.target.nextElementSibling) {
                                            (e.target.nextElementSibling as HTMLInputElement).focus();
                                        }
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Backspace" && !otpCode[i] && e.currentTarget.previousElementSibling) {
                                            (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                                        }
                                    }}
                                    autoFocus={i === 0}
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-sm text-rose bg-red-50 p-3 rounded-xl text-center">{error}</p>
                        )}

                        <CitizenButton onClick={handleVerifyOTP} disabled={loading || otpCode.length !== 4}>
                            {loading ? <LoadingSpinner size="sm" /> : "Vérifier"}
                        </CitizenButton>

                        <button
                            onClick={() => setStep("phone")}
                            className="w-full text-center text-sm text-blue font-medium"
                        >
                            Renvoyer le code
                        </button>
                    </div>
                )}

                {/* Step 3: Pseudo (optional) */}
                {step === "pseudo" && (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                                <User className="w-10 h-10 text-emerald" />
                            </div>
                            <h2 className="text-xl font-bold text-text mb-2">Choisissez un pseudo</h2>
                            <p className="text-sm text-text-muted">
                                Optionnel — visible sur vos signalements publics
                            </p>
                        </div>

                        <input
                            type="text"
                            value={pseudo}
                            onChange={(e) => setPseudo(e.target.value)}
                            placeholder="ex: Citoyen241"
                            maxLength={30}
                            className="w-full h-12 px-4 rounded-xl border border-border text-base focus:outline-none focus:ring-2 focus:ring-emerald"
                            autoFocus
                        />

                        <CitizenButton onClick={handleSetPseudo} disabled={loading}>
                            {loading ? <LoadingSpinner size="sm" /> : pseudo ? "Continuer" : "Passer cette étape"}
                        </CitizenButton>
                    </div>
                )}
            </div>
        </div>
    );
}
