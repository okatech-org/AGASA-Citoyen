"use client";

import { useState, useCallback, useEffect } from "react";
import { Search, Flashlight, Image, X, Wifi, WifiOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

// ============================================
// PAGE SCANNER — Cœur d'AGASA-Citoyen
// 5 états : Prêt, Chargement, Résultat, Non reconnu, Hors-ligne
// ============================================

// Demo establishments for search fallback
const DEMO_ETABLISSEMENTS = [
    { id: "ETB-LBV-00042", nom: "Restaurant Le Palmier", adresse: "Rue des Bananiers, Libreville", categorie: "Restaurant", smiley: 4 },
    { id: "ETB-LBV-00015", nom: "Supermarché Géant Prix", adresse: "Boulevard Triomphal, Libreville", categorie: "Supermarché", smiley: 5 },
    { id: "ETB-LBV-00028", nom: "Marché Mont-Bouët", adresse: "Quartier Mont-Bouët, Libreville", categorie: "Marché", smiley: 3 },
    { id: "ETB-POG-00008", nom: "Boulangerie du Port", adresse: "Avenue du Port, Port-Gentil", categorie: "Boulangerie", smiley: 4 },
    { id: "ETB-FCV-00011", nom: "Grillade Mama Nyota", adresse: "Centre-ville, Franceville", categorie: "Restaurant", smiley: 2 },
    { id: "ETB-LAM-00005", nom: "Poissonnerie du Lac", adresse: "Bord du lac, Lambaréné", categorie: "Poissonnerie", smiley: 1 },
];

const SMILEY_COLORS: Record<number, string> = {
    5: "bg-green-600", 4: "bg-green-500", 3: "bg-yellow-500",
    2: "bg-orange-500", 1: "bg-red-600", 0: "bg-bg-muted0",
};

export default function ScannerPage() {
    const router = useRouter();
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [torch, setTorch] = useState(false);
    const [scanning, setScanning] = useState(true);

    // Search results
    const searchResults = searchQuery.length >= 2
        ? DEMO_ETABLISSEMENTS.filter((e) =>
            e.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.adresse.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    // Simulate QR scan
    const handleDemoScan = useCallback(() => {
        // Simulate scanning a random establishment
        const randomEtab = DEMO_ETABLISSEMENTS[Math.floor(Math.random() * DEMO_ETABLISSEMENTS.length)];
        setScanning(false);

        // Vibration feedback
        if (navigator.vibrate) navigator.vibrate(50);

        setTimeout(() => {
            router.push(`/scanner/resultat?id=${randomEtab.id}`);
        }, 600);
    }, [router]);

    return (
        <div className="fixed inset-0 bg-gray-900 z-30 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-black/30 backdrop-blur-sm z-10">
                <h1 className="text-white font-bold text-sm flex items-center gap-2">
                    🔍 AGASA-Citoyen
                </h1>
                <Link href="/" className="text-white/70 hover:text-white">
                    <X className="w-5 h-5" />
                </Link>
            </div>

            {showSearch ? (
                /* Search Fallback */
                <div className="flex-1 bg-gray-900 px-4 py-4">
                    <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                        <input
                            autoFocus
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher un établissement..."
                            className="w-full h-12 pl-11 pr-10 rounded-xl bg-bg-card text-white text-base placeholder-gray-500 border border-border focus:border-emerald focus:outline-none"
                        />
                        <button onClick={() => { setShowSearch(false); setSearchQuery(""); }} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {searchQuery.length >= 2 && (
                        <div className="space-y-2">
                            {searchResults.length === 0 ? (
                                <p className="text-text-muted text-sm text-center py-8">Aucun résultat pour &quot;{searchQuery}&quot;</p>
                            ) : (
                                searchResults.map((etab) => (
                                    <Link
                                        key={etab.id}
                                        href={`/scanner/resultat?id=${etab.id}`}
                                        className="flex items-center gap-3 bg-bg-card rounded-xl p-3 hover:bg-gray-700 transition-colors"
                                    >
                                        <div className={cn("w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm", SMILEY_COLORS[etab.smiley])}>
                                            {etab.smiley}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-white text-sm font-medium truncate">{etab.nom}</p>
                                            <p className="text-text-muted text-xs truncate">{etab.adresse}</p>
                                        </div>
                                        <span className="text-text-muted text-xs">{etab.categorie}</span>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}

                    {searchQuery.length < 2 && (
                        <p className="text-text-muted text-sm text-center py-8">Tapez au moins 2 caractères</p>
                    )}
                </div>
            ) : (
                /* Camera View */
                <>
                    <div className="flex-1 flex items-center justify-center relative">
                        {/* Camera placeholder — dark background simulating camera feed */}
                        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900" />

                        {/* Scan Frame */}
                        <div className="relative z-10">
                            <button
                                onClick={handleDemoScan}
                                className={cn(
                                    "w-60 h-60 border-4 rounded-2xl flex items-center justify-center transition-all duration-300 cursor-pointer",
                                    scanning
                                        ? "border-emerald animate-pulse"
                                        : "border-green-400 bg-green-500/20"
                                )}
                            >
                                {scanning ? (
                                    <div className="text-center">
                                        <p className="text-text-muted text-xs mb-2">📷 Zone de scan</p>
                                        <p className="text-text-muted text-[10px]">Cliquez pour simuler un scan</p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                                        <p className="text-green-400 text-sm font-medium">Vérification en cours...</p>
                                    </div>
                                )}
                            </button>

                            {/* Corner decorations */}
                            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-emerald rounded-tl-lg" />
                            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-emerald rounded-tr-lg" />
                            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-emerald rounded-bl-lg" />
                            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-emerald rounded-br-lg" />
                        </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="bg-black/50 backdrop-blur-sm px-4 py-5 space-y-3">
                        <p className="text-white text-center text-sm font-medium">
                            📷 Pointez la caméra vers le QR code AGASA
                        </p>

                        {/* Action buttons */}
                        <div className="flex items-center justify-center gap-4">
                            <button
                                onClick={() => setTorch(!torch)}
                                className={cn(
                                    "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors",
                                    torch ? "bg-yellow-500 text-black" : "bg-gray-700 text-text-muted hover:bg-gray-600"
                                )}
                            >
                                <Flashlight className="w-4 h-4" /> {torch ? "Torche ON" : "Torche"}
                            </button>
                            <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-gray-700 text-text-muted hover:bg-gray-600 cursor-pointer transition-colors">
                                <Image className="w-4 h-4" /> Galerie
                                <input type="file" accept="image/*" className="hidden" onChange={() => handleDemoScan()} />
                            </label>
                        </div>

                        {/* Divider */}
                        <div className="flex items-center gap-3 px-4">
                            <div className="flex-1 h-px bg-gray-600" />
                            <span className="text-text-muted text-xs">ou</span>
                            <div className="flex-1 h-px bg-gray-600" />
                        </div>

                        {/* Search fallback */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="w-full flex items-center justify-center gap-2 bg-bg-card hover:bg-gray-700 text-text-muted py-3 rounded-xl text-sm font-medium transition-colors"
                        >
                            <Search className="w-4 h-4" /> Rechercher un établissement par nom
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
