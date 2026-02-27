import Link from "next/link";

// ============================================
// FOOTER PUBLIC — AGASA-Citoyen
// Responsive: 1 col mobile → 4 col desktop
// ============================================

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                {/* Top Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#2E7D32] to-[#43A047] flex items-center justify-center">
                                <span className="text-white text-sm font-bold">A</span>
                            </div>
                            <span className="font-bold text-lg text-white">AGASA-Citoyen</span>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">
                            Agence Gabonaise de Sécurité Alimentaire
                        </p>
                        <p className="text-xs text-gray-500">
                            🔒 Anonymat garanti — Vos signalements sont confidentiels
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Liens utiles
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="/comment-ca-marche" className="text-gray-400 hover:text-white transition-colors">Comment ça marche</Link></li>
                            <li><Link href="/securite-alimentaire" className="text-gray-400 hover:text-white transition-colors">Sécurité alimentaire</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/demo" className="text-gray-400 hover:text-white transition-colors">Démonstration</Link></li>
                        </ul>
                    </div>

                    {/* Ecosystem */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Écosystème AGASA
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li>🏢 AGASA-Core — Plateforme centrale</li>
                            <li>🔍 AGASA-Inspect — Inspections terrain</li>
                            <li>📊 AGASA-Pro — Espace opérateurs</li>
                            <li className="text-white font-medium">📱 AGASA-Citoyen — Application citoyenne</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                            Contact
                        </h3>
                        <ul className="space-y-2.5 text-sm text-gray-400">
                            <li>📍 Libreville, Estuaire</li>
                            <li>📞 +241 01 XX XX XX</li>
                            <li>📧 contact@agasa.ga</li>
                            <li className="pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-1 text-[#43A047] hover:text-[#66BB6A] transition-colors text-xs font-semibold"
                                >
                                    Nous contacter →
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-gray-500">
                        © 2026 AGASA — République Gabonaise — Tous droits réservés
                    </p>
                    <p className="text-xs text-gray-600">
                        🇬🇦 Fait au Gabon pour les Gabonais
                    </p>
                </div>
            </div>
        </footer>
    );
}
