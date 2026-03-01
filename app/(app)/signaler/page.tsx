"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Camera, X, MapPin, ChevronRight, Shield, Send, ShoppingCart, Pill, Leaf, HeartPulse } from "lucide-react";
import CitizenButton from "@/components/ui/CitizenButton";
import { cn } from "@/lib/utils";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

// ============================================
// SIGNALEMENT — Flux 4 étapes (< 90 secondes)
// Étape 1: Catégorie de signalement
// Étape 2: Photo + GPS
// Étape 3: Type d'infraction (filtré par catégorie)
// Étape 4: Confirmation + envoi
// ============================================

// --- CATÉGORIES DE SIGNALEMENT ---

interface CategorieSignalement {
    id: string;
    emoji: string;
    icon: typeof ShoppingCart;
    label: string;
    description: string;
    color: string;
    bgColor: string;
    borderColor: string;
}

const CATEGORIES: CategorieSignalement[] = [
    {
        id: "consommateur",
        emoji: "🛒",
        icon: ShoppingCart,
        label: "Consommateur",
        description: "Signaler tout produit suspect avant consommation",
        color: "text-blue-700",
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
    },
    {
        id: "intoxication_alimentaire",
        emoji: "🤢",
        icon: Pill,
        label: "Intoxication Alimentaire",
        description: "Rapporter des effets indésirables après consommation",
        color: "text-red-700",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
    },
    {
        id: "utilisation_pesticides",
        emoji: "🧪",
        icon: Leaf,
        label: "Utilisation de pesticides",
        description: "Signaler des symptômes après utilisation de produits phytosanitaires ou biocides",
        color: "text-amber-700",
        bgColor: "bg-amber-50",
        borderColor: "border-amber-200",
    },
    {
        id: "nutrivigilance",
        emoji: "⚕️",
        icon: HeartPulse,
        label: "Nutrivigilance",
        description: "Signaler les dommages entraînés par des produits alimentaires ou phytosanitaires consommés ou utilisés",
        color: "text-purple-700",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
    },
];

// --- TYPES D'INFRACTION PAR CATÉGORIE ---

interface InfractionType {
    id: string;
    emoji: string;
    label: string;
    sub: string;
}

const INFRACTION_TYPES_BY_CATEGORY: Record<string, InfractionType[]> = {
    consommateur: [
        { id: "produits_perimes", emoji: "🦠", label: "Produits périmés", sub: "en vente" },
        { id: "insalubrite", emoji: "🪳", label: "Insalubrité", sub: "des locaux" },
        { id: "absence_agrement", emoji: "📋", label: "Absence d'agrément", sub: "visible" },
        { id: "produits_suspects", emoji: "🍖", label: "Produits suspects", sub: "(goût, odeur, aspect)" },
        { id: "chaine_froid", emoji: "🧊", label: "Rupture chaîne", sub: "du froid" },
        { id: "emballage_defectueux", emoji: "📦", label: "Emballage défectueux", sub: "ou endommagé" },
        { id: "etiquetage_manquant", emoji: "🏷️", label: "Étiquetage manquant", sub: "ou illisible" },
        { id: "autre", emoji: "❓", label: "Autre problème", sub: "" },
    ],
    intoxication_alimentaire: [
        { id: "nausees_vomissements", emoji: "🤮", label: "Nausées / Vomissements", sub: "après consommation" },
        { id: "diarrhee", emoji: "💧", label: "Diarrhée", sub: "après consommation" },
        { id: "allergie", emoji: "🫁", label: "Réaction allergique", sub: "symptômes allergiques" },
        { id: "intoxication_chimique", emoji: "☠️", label: "Intoxication chimique", sub: "substance toxique" },
        { id: "autre_intoxication", emoji: "❓", label: "Autre effet indésirable", sub: "" },
    ],
    utilisation_pesticides: [
        { id: "irritation_cutanee", emoji: "🖐️", label: "Irritation cutanée", sub: "peau, yeux" },
        { id: "troubles_respiratoires", emoji: "😮‍💨", label: "Troubles respiratoires", sub: "toux, essoufflement" },
        { id: "intoxication_pesticide", emoji: "☠️", label: "Intoxication aiguë", sub: "malaise, vertiges" },
        { id: "contamination_eau", emoji: "💧", label: "Contamination eau/sol", sub: "environnement" },
        { id: "autre_pesticide", emoji: "❓", label: "Autre symptôme", sub: "" },
    ],
    nutrivigilance: [
        { id: "complement_alimentaire", emoji: "💊", label: "Complément alimentaire", sub: "effets indésirables" },
        { id: "produit_enrichi", emoji: "🥛", label: "Produit enrichi", sub: "vitamines, minéraux" },
        { id: "nouveau_aliment", emoji: "🧬", label: "Nouvel aliment", sub: "novel food" },
        { id: "autre_nutrivigilance", emoji: "❓", label: "Autre signalement", sub: "" },
    ],
};

// --- LOOKUP ÉTABLISSEMENTS DÉMO ---

const ETAB_NAMES: Record<string, string> = {
    "ETB-LBV-00042": "Restaurant Le Palmier",
    "ETB-LBV-00015": "Supermarché Géant Prix",
    "ETB-LBV-00028": "Marché Mont-Bouët",
    "ETB-POG-00008": "Boulangerie du Port",
    "ETB-FCV-00011": "Grillade Mama Nyota",
    "ETB-LAM-00005": "Poissonnerie du Lac",
};

// --- STEP LABELS ---

const STEP_LABELS: Record<number, string> = {
    1: "Catégorie",
    2: "Prenez une photo",
    3: "Que voyez-vous ?",
    4: "Confirmez",
};

function SignalerContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const etablissementId = searchParams.get("etablissement");
    const etablissementNom = etablissementId ? ETAB_NAMES[etablissementId] : null;

    const [step, setStep] = useState(1);
    const [categorieSignalement, setCategorieSignalement] = useState<string | null>(null);
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

    const selectedCategory = CATEGORIES.find((c) => c.id === categorieSignalement);
    const infractionTypes = categorieSignalement ? INFRACTION_TYPES_BY_CATEGORY[categorieSignalement] || [] : [];
    const selectedType = infractionTypes.find((t) => t.id === typeInfraction);

    // Progress bar
    const progress = step === 1 ? 25 : step === 2 ? 50 : step === 3 ? 75 : 100;

    // Handle back navigation
    const handleBack = () => {
        if (step > 1) {
            if (step === 3) setTypeInfraction(null);
            if (step === 2) {
                // Reset photos when going back to category
            }
            setStep(step - 1);
        } else {
            router.back();
        }
    };

    return (
        <div className="min-h-dvh bg-white pb-8">
            {/* Header */}
            <div className="sticky top-0 bg-bg-card/95 backdrop-blur-sm z-10 border-b border-border">
                <div className="px-4 py-3 flex items-center gap-3">
                    <button onClick={handleBack} className="text-text-muted hover:text-text">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-base font-bold text-text">🚨 Signaler un problème</h1>
                        <p className="text-xs text-text-muted">
                            Étape {step}/4 — {STEP_LABELS[step]}
                        </p>
                    </div>
                    {selectedCategory && step > 1 && (
                        <span className={cn("text-[10px] font-semibold px-2 py-0.5 rounded-full", selectedCategory.bgColor, selectedCategory.color)}>
                            {selectedCategory.emoji} {selectedCategory.label}
                        </span>
                    )}
                </div>
                {/* Progress */}
                <div className="h-1 bg-bg-muted">
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
                {/* ÉTAPE 1: CATÉGORIE DE SIGNALEMENT */}
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-text-muted font-medium mb-1">📋 Quel type de signalement souhaitez-vous faire ?</p>
                            <p className="text-xs text-text-muted">Choisissez la catégorie qui correspond à votre situation</p>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isSelected = categorieSignalement === cat.id;
                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => setCategorieSignalement(cat.id)}
                                        className={cn(
                                            "flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all duration-200",
                                            isSelected
                                                ? `${cat.borderColor} ${cat.bgColor} shadow-sm scale-[1.01]`
                                                : "border-border bg-white hover:border-border hover:bg-bg-muted/50"
                                        )}
                                    >
                                        <div className={cn(
                                            "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
                                            isSelected ? cat.bgColor : "bg-bg-muted"
                                        )}>
                                            <Icon className={cn("w-6 h-6", isSelected ? cat.color : "text-text-muted")} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn("text-sm font-semibold", isSelected ? cat.color : "text-text")}>
                                                {cat.emoji} {cat.label}
                                            </p>
                                            <p className="text-xs text-text-muted mt-0.5 leading-relaxed">{cat.description}</p>
                                        </div>
                                        {isSelected && (
                                            <div className={cn("w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5", cat.bgColor)}>
                                                <span className={cn("text-xs font-bold", cat.color)}>✓</span>
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <CitizenButton
                            onClick={() => setStep(2)}
                            disabled={!categorieSignalement}
                            icon={<ChevronRight className="w-4 h-4" />}
                        >
                            Suivant
                        </CitizenButton>
                    </div>
                )}

                {/* ÉTAPE 2: PHOTO */}
                {step === 2 && (
                    <div className="space-y-4">
                        <p className="text-sm text-text-muted font-medium">📷 Prenez en photo le problème</p>

                        {/* Photo capture */}
                        <div className="bg-bg-muted rounded-2xl p-6 border-2 border-dashed border-border text-center">
                            <label className="cursor-pointer flex flex-col items-center gap-3">
                                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                                <span className="text-sm font-medium text-text">Prendre la photo</span>
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
                                <p className="text-xs text-text-muted mb-2">📷 {photos.length}/5 photos</p>
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {photos.map((photo, i) => (
                                        <div key={i} className="relative flex-shrink-0">
                                            <img src={photo} alt={`Photo ${i + 1}`} className="w-20 h-20 object-cover rounded-lg border border-border" />
                                            <button
                                                onClick={() => removePhoto(i)}
                                                className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    {photos.length < 5 && (
                                        <label className="flex-shrink-0 w-20 h-20 bg-bg-muted rounded-lg border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:bg-border transition-colors">
                                            <span className="text-text-muted text-lg">+</span>
                                            <input type="file" accept="image/*" capture="environment" onChange={handlePhotoCapture} className="hidden" />
                                        </label>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* GPS */}
                        <div className={cn(
                            "rounded-xl p-3 flex items-center gap-2.5",
                            gpsStatus === "success" ? "bg-green-50 border border-green-100" : gpsStatus === "error" ? "bg-red-50 border border-red-100" : "bg-bg-muted border border-border"
                        )}>
                            <MapPin className={cn(
                                "w-4 h-4 flex-shrink-0",
                                gpsStatus === "success" ? "text-green-600" : gpsStatus === "error" ? "text-red-500" : "text-text-muted"
                            )} />
                            <div className="text-sm">
                                <p className={cn(
                                    "font-medium",
                                    gpsStatus === "success" ? "text-green-700" : gpsStatus === "error" ? "text-red-600" : "text-text-muted"
                                )}>
                                    {gpsStatus === "loading" && "📡 Localisation en cours..."}
                                    {gpsStatus === "success" && "✅ Position GPS capturée"}
                                    {gpsStatus === "error" && "❌ Position non disponible"}
                                </p>
                                {gpsAddress && <p className="text-text-muted text-xs mt-0.5">{gpsAddress}</p>}
                            </div>
                            {gpsStatus === "loading" && (
                                <div className="w-4 h-4 border-2 border-border border-t-emerald rounded-full animate-spin ml-auto flex-shrink-0" />
                            )}
                        </div>

                        <CitizenButton
                            onClick={() => setStep(3)}
                            disabled={photos.length === 0}
                            icon={<ChevronRight className="w-4 h-4" />}
                        >
                            Suivant
                        </CitizenButton>
                        <p className={cn(
                            "text-[11px] text-center font-medium transition-all",
                            photos.length === 0 ? "text-red-400" : "text-text-muted"
                        )}>
                            {photos.length === 0 ? "⚠️ 1 photo minimum requise" : "✓ Photo(s) ajoutée(s)"}
                        </p>
                    </div>
                )}

                {/* ÉTAPE 3: TYPE D'INFRACTION */}
                {step === 3 && (
                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-text-muted font-medium">Choisissez le type de problème :</p>
                            {selectedCategory && (
                                <p className="text-xs text-text-muted mt-0.5">Catégorie : {selectedCategory.emoji} {selectedCategory.label}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-2.5">
                            {infractionTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setTypeInfraction(type.id)}
                                    className={cn(
                                        "flex flex-col items-center gap-1 p-4 rounded-xl border-2 text-center transition-all",
                                        typeInfraction === type.id
                                            ? "border-emerald bg-green-50 shadow-sm"
                                            : "border-border bg-white hover:border-border"
                                    )}
                                >
                                    <span className="text-2xl">{type.emoji}</span>
                                    <span className="text-sm font-medium text-text">{type.label}</span>
                                    {type.sub && <span className="text-[10px] text-text-muted">{type.sub}</span>}
                                </button>
                            ))}
                        </div>

                        {/* Description */}
                        <div>
                            <label className="text-sm font-medium text-text mb-1 block">💬 Description (optionnel)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value.slice(0, 500))}
                                placeholder={
                                    categorieSignalement === "intoxication_alimentaire"
                                        ? "Décrivez vos symptômes et ce que vous avez consommé"
                                        : categorieSignalement === "utilisation_pesticides"
                                            ? "Décrivez les symptômes ressentis et le produit utilisé"
                                            : categorieSignalement === "nutrivigilance"
                                                ? "Décrivez les dommages et le produit concerné"
                                                : "Ex: Poulet exposé au soleil depuis ce matin"
                                }
                                rows={3}
                                className="w-full px-3 py-2 rounded-xl border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-emerald"
                            />
                            <p className="text-[10px] text-text-muted text-right mt-0.5">{description.length}/500</p>
                        </div>

                        <CitizenButton
                            onClick={() => setStep(4)}
                            disabled={!typeInfraction}
                            icon={<ChevronRight className="w-4 h-4" />}
                        >
                            Suivant
                        </CitizenButton>
                    </div>
                )}

                {/* ÉTAPE 4: CONFIRMATION */}
                {step === 4 && (
                    <div className="space-y-4">
                        <p className="text-sm text-text-muted font-medium">Résumé de votre signalement :</p>

                        {/* Summary */}
                        <div className="bg-bg-muted rounded-xl p-4 space-y-3">
                            {/* Category */}
                            {selectedCategory && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{selectedCategory.emoji}</span>
                                    <span className={cn("text-sm font-semibold px-2 py-0.5 rounded-full", selectedCategory.bgColor, selectedCategory.color)}>
                                        {selectedCategory.label}
                                    </span>
                                </div>
                            )}

                            {/* Photos */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm">📷</span>
                                <span className="text-sm text-text">{photos.length} photo{photos.length > 1 ? "s" : ""} jointe{photos.length > 1 ? "s" : ""}</span>
                            </div>
                            <div className="flex gap-1.5">
                                {photos.map((p, i) => (
                                    <img key={i} src={p} alt="" className="w-12 h-12 object-cover rounded-lg border border-border" />
                                ))}
                            </div>

                            {/* Type */}
                            {selectedType && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">{selectedType.emoji}</span>
                                    <span className="text-sm text-text font-medium">Type : {selectedType.label} {selectedType.sub}</span>
                                </div>
                            )}

                            {/* Description */}
                            {description && (
                                <div className="flex items-start gap-2">
                                    <span className="text-sm">💬</span>
                                    <p className="text-sm text-text-muted italic">&quot;{description}&quot;</p>
                                </div>
                            )}

                            {/* Location */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm">📍</span>
                                <span className="text-sm text-text">{gpsAddress}</span>
                            </div>

                            {/* Establishment */}
                            {etablissementNom && (
                                <div className="flex items-center gap-2">
                                    <span className="text-sm">🏢</span>
                                    <span className="text-sm text-text">{etablissementNom}</span>
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
