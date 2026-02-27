"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Camera, X, MapPin, ChevronRight, Shield, Send } from "lucide-react";
import CitizenButton from "@/components/ui/CitizenButton";
import { cn, generateShortId } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// ============================================
// SIGNALEMENT — Flux 3 étapes (< 60 secondes)
// Étape 1: Photo + GPS
// Étape 2: Type d'infraction
// Étape 3: Confirmation + envoi
// ============================================

const INFRACTION_TYPES = [
    { id: "produits_perimes", emoji: "🦠", label: "Produits périmés", sub: "en vente" },
    { id: "insalubrite", emoji: "🪳", label: "Insalubrité", sub: "des locaux" },
    { id: "sans_agrement", emoji: "📋", label: "Absence d'agrément", sub: "visible" },
    { id: "produits_suspects", emoji: "🍖", label: "Produits suspects", sub: "(goût, odeur, aspect)" },
    { id: "chaine_froid", emoji: "🧊", label: "Rupture chaîne", sub: "du froid" },
    { id: "autre", emoji: "❓", label: "Autre problème", sub: "" },
];

// Demo establishments lookup
const ETAB_NAMES: Record<string, string> = {
    "ETB-LBV-00042": "Restaurant Le Palmier",
    "ETB-LBV-00015": "Supermarché Géant Prix",
    "ETB-LBV-00028": "Marché Mont-Bouët",
    "ETB-POG-00008": "Boulangerie du Port",
    "ETB-FCV-00011": "Grillade Mama Nyota",
    "ETB-LAM-00005": "Poissonnerie du Lac",
};

function SignalerContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const etablissementId = searchParams.get("etablissement");
    const etablissementNom = etablissementId ? ETAB_NAMES[etablissementId] : null;

    const [step, setStep] = useState(1);
    const [photos, setPhotos] = useState<string[]>([]);
    const [gpsAddress, setGpsAddress] = useState("");
    const [gpsStatus, setGpsStatus] = useState<"loading" | "success" | "error">("loading");
    const [gpsCoords, setGpsCoords] = useState<{ lat: number; lon: number } | null>(null);
    const [typeInfraction, setTypeInfraction] = useState<string | null>(null);
    const [description, setDescription] = useState("");
    const [sending, setSending] = useState(false);

    // Capture GPS on mount
    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    setGpsCoords({ lat: latitude, lon: longitude });
                    // Simulate reverse geocoding
                    setGpsAddress("Libreville, Estuaire, Gabon");
                    setGpsStatus("success");
                },
                () => {
                    setGpsAddress("Position non disponible");
                    setGpsStatus("error");
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        } else {
            setGpsAddress("GPS non supporté");
            setGpsStatus("error");
        }
    }, []);

    // Photo capture
    const handlePhotoCapture = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;
        Array.from(files).forEach((file) => {
            if (photos.length >= 5) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                if (ev.target?.result) {
                    setPhotos((prev) => [...prev.slice(0, 4), ev.target!.result as string]);
                }
            };
            reader.readAsDataURL(file);
        });
        e.target.value = "";
    }, [photos.length]);

    const removePhoto = useCallback((index: number) => {
        setPhotos((prev) => prev.filter((_, i) => i !== index));
    }, []);

    // Send signalement
    const handleSend = useCallback(async () => {
        setSending(true);
        // Simulate API call
        await new Promise((r) => setTimeout(r, 1500));
        const ref = `SIG-2026-${String(Math.floor(Math.random() * 999999)).padStart(6, "0")}`;
        router.push(`/signaler/confirmation?ref=${ref}`);
    }, [router]);

    const selectedType = INFRACTION_TYPES.find((t) => t.id === typeInfraction);

    // Progress bar
    const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

    return (
        <div className="min-h-dvh bg-white pb-8">
            {/* Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b border-gray-100">
                <div className="px-4 py-3 flex items-center gap-3">
                    <button onClick={() => step > 1 ? setStep(step - 1) : router.back()} className="text-gray-500 hover:text-gray-800">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-base font-bold text-gray-900">🚨 Signaler un problème</h1>
                        <p className="text-xs text-gray-500">
                            Étape {step}/3 — {step === 1 ? "Prenez une photo" : step === 2 ? "Que voyez-vous ?" : "Confirmez"}
                        </p>
                    </div>
                </div>
                {/* Progress */}
                <div className="h-1 bg-gray-100">
                    <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${progress}%` }} />
                </div>
            </div>

            {/* Pre-selected establishment */}
            {etablissementNom && (
                <div className="mx-4 mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center gap-2 text-sm text-blue-700">
                    <MapPin className="w-4 h-4 flex-shrink-0" /> 📍 {etablissementNom}
                </div>
            )}

            <div className="px-4 mt-4">
                {/* ÉTAPE 1: PHOTO */}
                {step === 1 && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 font-medium">📷 Prenez en photo le problème</p>

                        {/* Photo capture */}
                        <div className="bg-gray-50 rounded-2xl p-6 border-2 border-dashed border-gray-200 text-center">
                            <label className="cursor-pointer flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-sm font-medium text-gray-700">Prendre la photo</span>
                                <input
                                    type="file"
                                    accept="image/*"
                                    capture="environment"
                                    onChange={handlePhotoCapture}
                                    className="hidden"
                                    multiple
                                />
                            </label>
                        </div>

                        {/* Photo thumbnails */}
                        {photos.length > 0 && (
                            <div>
                                <p className="text-xs text-gray-500 mb-2">📷 {photos.length}/5 photos</p>
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {photos.map((photo, i) => (
                                        <div key={i} className="relative flex-shrink-0">
                                            <img src={photo} alt={`Photo ${i + 1}`} className="w-20 h-20 object-cover rounded-lg border border-gray-200" />
                                            <button
                                                onClick={() => removePhoto(i)}
                                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {photos.length < 5 && (
                                        <label className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                                            <span className="text-gray-400 text-lg">+</span>
                                            <input type="file" accept="image/*" capture="environment" onChange={handlePhotoCapture} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* GPS */}
                        <div className={cn(
                            "rounded-xl p-3 flex items-center gap-2.5",
                            gpsStatus === "success" ? "bg-green-50 border border-green-100" : gpsStatus === "error" ? "bg-red-50 border border-red-100" : "bg-gray-50 border border-gray-100"
                        )}>
                            <MapPin className={cn(
                                "w-4 h-4 flex-shrink-0",
                                gpsStatus === "success" ? "text-green-600" : gpsStatus === "error" ? "text-red-500" : "text-gray-400"
                            )} />
                            <div className="text-sm">
                                <p className={cn(
                                    "font-medium",
                                    gpsStatus === "success" ? "text-green-700" : gpsStatus === "error" ? "text-red-600" : "text-gray-500"
                                )}>
                                    {gpsStatus === "loading" && "📡 Localisation en cours..."}
                                    {gpsStatus === "success" && "✅ Position GPS capturée"}
                                    {gpsStatus === "error" && "❌ Position non disponible"}
                                </p>
                                {gpsAddress && <p className="text-gray-400 text-xs mt-0.5">{gpsAddress}</p>}
                            </div>
                            {gpsStatus === "loading" && (
                                <div className="w-4 h-4 border-2 border-gray-300 border-t-citoyen-green rounded-full animate-spin ml-auto flex-shrink-0" />
                            )}
                        </div>

                        <CitizenButton
                            onClick={() => setStep(2)}
                            disabled={photos.length === 0}
                            icon={<ChevronRight className="w-4 h-4" />}
                        >
                            Suivant
                        </CitizenButton>
                        <p className={cn(
                            "text-[11px] text-center font-medium transition-all",
                            photos.length === 0 ? "text-red-400" : "text-gray-400"
                        )}>
                            {photos.length === 0 ? "⚠️ 1 photo minimum requise" : "✓ Photo(s) ajoutée(s)"}
                        </p>
                    </div>
                )}

                {/* ÉTAPE 2: TYPE D'INFRACTION */}
                {step === 2 && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 font-medium">Choisissez le type de problème :</p>

                        <div className="grid grid-cols-2 gap-2.5">
                            {INFRACTION_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setTypeInfraction(type.id)}
                                    className={cn(
                                        "flex flex-col items-center gap-1 p-4 rounded-xl border-2 text-center transition-all",
                                        typeInfraction === type.id
                                            ? "border-citoyen-green bg-green-50 shadow-sm"
                                            : "border-gray-100 bg-white hover:border-gray-200"
                                    )}
                                >
                                    <span className="text-2xl">{type.emoji}</span>
                                    <span className="text-sm font-medium text-gray-800">{type.label}</span>
                                    {type.sub && <span className="text-[10px] text-gray-400">{type.sub}</span>}
                                </button>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">💬 Description (optionnel)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                                placeholder="Ex: Poulet exposé au soleil depuis ce matin"
                                rows={3}
                                className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-citoyen-green"
                            />
                            <p className="text-[10px] text-gray-400 text-right mt-0.5">{description.length}/500</p>
                        </div>

                        <CitizenButton
                            onClick={() => setStep(3)}
                            disabled={!typeInfraction}
                            icon={<ChevronRight className="w-4 h-4" />}
                        >
                            Suivant
                        </CitizenButton>
                    </div>
                )}

                {/* ÉTAPE 3: CONFIRMATION */}
                {step === 3 && (
                    <div className="space-y-4">
                        <p className="text-sm text-gray-600 font-medium">Résumé de votre signalement :</p>

                        {/* Summary */}
                        <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                            {/* Photos */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm">📷</span>
                                <span className="text-sm text-gray-700">{photos.length} photo{photos.length > 1 ? "s" : ""} jointe{photos.length > 1 ? "s" : ""}</span>
                            </div>
                            <div className="flex gap-1.5">
                                {photos.map((p, i) => (
                                    <img key={i} src={p} alt="" className="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                                ))}
                            </div>

                            {/* Type */}
                            {selectedType && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{selectedType.emoji}</span>
                                    <span className="text-sm text-gray-700 font-medium">Type : {selectedType.label} {selectedType.sub}</span>
                                </div>
                            )}

                            {/* Description */}
                            {description && (
                                <div className="flex items-start gap-2">
                                    <span className="text-sm">💬</span>
                                    <p className="text-sm text-gray-600 italic">&quot;{description}&quot;</p>
                                </div>
                            )}

                            {/* Location */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm">📍</span>
                                <span className="text-sm text-gray-700">{gpsAddress}</span>
                            </div>

                            {/* Establishment */}
                            {etablissementNom && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">🏢</span>
                                    <span className="text-sm text-gray-700">{etablissementNom}</span>
                                </div>
                            )}
                        </div>

                        {/* Anonymity guarantee */}
                        <div className="bg-green-50 border border-green-100 rounded-xl p-3 flex items-start gap-2">
                            <Shield className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-semibold text-green-800">🔒 Votre anonymat est garanti.</p>
                                <p className="text-xs text-green-600 mt-0.5">
                                    L&apos;AGASA ne communiquera JAMAIS votre identité à l&apos;établissement signalé.
                                </p>
                            </div>
                        </div>

                        {/* Notification info */}
                        <div className="bg-blue-50 rounded-xl p-3 text-sm text-blue-700">
                            🔔 Vous recevrez des notifications de suivi de votre signalement.
                        </div>

                        {/* Send */}
                        <button
                            onClick={handleSend}
                            disabled={sending}
                            className="w-full h-14 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-xl text-base font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                        >
                            {sending ? (
                                <LoadingSpinner size="sm" />
                            ) : (
                                <>
                                    <Send className="w-5 h-5" /> 🚨 ENVOYER LE SIGNALEMENT
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function SignalerPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center py-20"><LoadingSpinner text="Chargement..." /></div>}>
            <SignalerContent />
        </Suspense>
    );
}
