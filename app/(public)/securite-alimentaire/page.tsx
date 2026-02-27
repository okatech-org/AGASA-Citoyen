import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sécurité alimentaire au Gabon — AGASA-Citoyen",
    description:
        "Comprendre l'agrément sanitaire, les inspections alimentaires, vos droits en tant que consommateur et le rôle de l'AGASA.",
};

export default function SecuriteAlimentairePage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 text-gray-900">
            <h1 className="text-3xl lg:text-4xl font-extrabold mb-2">
                Sécurité alimentaire au Gabon
            </h1>
            <p className="text-gray-500 mb-10 lg:mb-14 lg:text-lg">
                Comprendre les enjeux et vos droits en tant que consommateur
            </p>

            {/* Section 1 */}
            <section className="mb-10 lg:mb-14">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
                    📋 Qu&apos;est-ce qu&apos;un agrément sanitaire ?
                </h2>
                <div className="bg-green-50 rounded-2xl p-5 lg:p-8 text-gray-700 leading-relaxed space-y-4">
                    <p className="lg:text-lg">
                        L&apos;agrément sanitaire est une <strong>autorisation officielle</strong> délivrée par l&apos;AGASA
                        qui certifie qu&apos;un établissement alimentaire respecte les normes d&apos;hygiène minimales.
                    </p>
                    <p className="lg:text-lg">
                        Tout restaurant, marché, boucherie, boulangerie ou commerce alimentaire au Gabon
                        doit posséder cet agrément pour opérer légalement.
                    </p>
                    <div className="bg-white rounded-xl p-5">
                        <p className="text-sm lg:text-base font-semibold text-[#2E7D32] mb-3">🛡️ Un établissement agréé :</p>
                        <ul className="text-sm lg:text-base space-y-2">
                            <li>✅ A été inspecté par un inspecteur certifié</li>
                            <li>✅ Affiche un QR code AGASA dans son entrée</li>
                            <li>✅ Est soumis à des inspections régulières</li>
                            <li>✅ A un score Smiley public et transparent</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Section 2 */}
            <section className="mb-10 lg:mb-14">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
                    🔍 Pourquoi les inspections sont importantes
                </h2>
                <div className="bg-blue-50 rounded-2xl p-5 lg:p-8 text-gray-700 leading-relaxed space-y-4">
                    <p className="lg:text-lg">
                        Les inspections sanitaires protègent la santé publique. Au Gabon, les maladies
                        d&apos;origine alimentaire touchent <strong>des milliers de personnes</strong> chaque année.
                    </p>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 my-4">
                        {[
                            { num: "30%", text: "des intoxications alimentaires sont évitables" },
                            { num: "70%", text: "liées à la mauvaise conservation" },
                            { num: "50%", text: "dues au non-respect de la chaîne du froid" },
                            { num: "100%", text: "des inspections AGASA sont numériques" },
                        ].map((stat) => (
                            <div key={stat.text} className="bg-white rounded-xl p-4 text-center hover:shadow-md transition-shadow">
                                <p className="text-xl lg:text-2xl font-extrabold text-[#1565C0]">{stat.num}</p>
                                <p className="text-[11px] lg:text-xs text-gray-500 mt-1">{stat.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3 */}
            <section className="mb-10 lg:mb-14">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
                    ⚠️ Les risques alimentaires courants au Gabon
                </h2>
                <div className="bg-orange-50 rounded-2xl p-5 lg:p-8 space-y-5">
                    {[
                        {
                            emoji: "📅",
                            title: "Produits périmés",
                            desc: "La vente de produits dépassant la date limite de consommation est fréquente. Vérifiez toujours les dates.",
                        },
                        {
                            emoji: "🧊",
                            title: "Chaîne du froid rompue",
                            desc: "Les coupures d'électricité fréquentes peuvent compromettre la conservation des aliments frais.",
                        },
                        {
                            emoji: "🫘",
                            title: "Manioc et cyanure",
                            desc: "Le manioc mal préparé contient du cyanure naturel. Un trempage et une cuisson appropriés sont essentiels.",
                        },
                        {
                            emoji: "🚰",
                            title: "Eau non traitée",
                            desc: "L'eau utilisée pour la préparation des aliments doit être potable.",
                        },
                    ].map((risk) => (
                        <div key={risk.title} className="flex gap-4 bg-white/60 rounded-xl p-4 hover:bg-white transition-colors">
                            <span className="text-2xl lg:text-3xl flex-shrink-0">{risk.emoji}</span>
                            <div>
                                <h3 className="font-bold text-gray-800 text-sm lg:text-base">{risk.title}</h3>
                                <p className="text-sm lg:text-base text-gray-600">{risk.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Section 4 */}
            <section className="mb-10 lg:mb-14">
                <h2 className="text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
                    ⚖️ Vos droits en tant que consommateur
                </h2>
                <div className="bg-gray-50 rounded-2xl p-5 lg:p-8 text-gray-700 leading-relaxed space-y-4">
                    <p className="lg:text-lg">En tant que consommateur au Gabon, vous avez le droit de :</p>
                    <ul className="space-y-3 text-sm lg:text-base">
                        <li className="flex items-start gap-3">
                            <span className="text-[#2E7D32] font-bold text-lg">→</span>
                            Exiger l&apos;affichage de l&apos;agrément sanitaire dans tout établissement alimentaire
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#2E7D32] font-bold text-lg">→</span>
                            Signaler anonymement tout manquement aux autorités sanitaires
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#2E7D32] font-bold text-lg">→</span>
                            Être informé(e) en cas de rappel de produit dangereux
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="text-[#2E7D32] font-bold text-lg">→</span>
                            Refuser un produit dont la date de péremption est dépassée
                        </li>
                    </ul>
                </div>
            </section>

            {/* Section 5 */}
            <section>
                <h2 className="text-xl lg:text-2xl font-bold mb-3 flex items-center gap-2">
                    🏛️ Le rôle de l&apos;AGASA
                </h2>
                <div className="bg-green-50 rounded-2xl p-5 lg:p-8 text-gray-700 leading-relaxed space-y-4">
                    <p className="lg:text-lg">
                        L&apos;<strong>Agence Gabonaise de Sécurité Alimentaire (AGASA)</strong> est l&apos;organe
                        national chargé de :
                    </p>
                    <ul className="space-y-2.5 text-sm lg:text-base">
                        <li>🔍 Inspecter les établissements alimentaires</li>
                        <li>📋 Délivrer et retirer les agréments sanitaires</li>
                        <li>🚨 Émettre des alertes rappels de produits dangereux</li>
                        <li>📊 Publier les scores Smiley de chaque établissement</li>
                        <li>👩‍🏫 Éduquer le public sur les bonnes pratiques alimentaires</li>
                    </ul>
                    <p className="text-sm lg:text-base">
                        L&apos;AGASA dispose de <strong>50 inspecteurs</strong> répartis dans
                        les <strong>9 provinces</strong> du Gabon, effectuant des inspections
                        régulières et non annoncées.
                    </p>
                </div>
            </section>
        </div>
    );
}
