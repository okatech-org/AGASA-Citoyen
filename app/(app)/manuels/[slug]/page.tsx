"use client";

import { use, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================
// FICHE ÉDUCATIVE — Contenu + Quiz interactif
// 6 fiches complètes avec quiz
// ============================================

interface QuizQuestion {
    question: string;
    options: string[];
    correct: number;
    explication: string;
}

interface Fiche {
    slug: string; titre: string; sousTitre: string; emoji: string;
    intro: string;
    bonnesPratiques: string[];
    aEviter: string[];
    quiz: QuizQuestion[];
}

const FICHES_DB: Record<string, Fiche> = {
    "manipulation-manioc": {
        slug: "manipulation-manioc", titre: "Manipulation sûre du manioc", sousTitre: "Risques liés au cyanure et bonnes pratiques", emoji: "🌾",
        intro: "Le manioc amer contient des composés cyanogènes (linamarine) qui peuvent provoquer un empoisonnement grave si le produit n'est pas correctement préparé. Chaque année au Gabon, des cas d'intoxication sont signalés, souvent par méconnaissance des bonnes pratiques de préparation.",
        bonnesPratiques: [
            "Épluchez et lavez abondamment le manioc avant toute préparation",
            "Faites tremper le manioc amer dans l'eau pendant 24 à 48 heures minimum",
            "Changez l'eau de trempage au moins deux fois par jour",
            "Cuisez toujours le manioc à haute température (ébullition > 100°C)",
            "Ne consommez jamais le manioc cru, même le manioc doux",
        ],
        aEviter: [
            "Ne raccourcissez jamais le temps de trempage, même si pressé",
            "Ne donnez pas de manioc non préparé correctement aux enfants",
            "Évitez de consommer l'eau de trempage du manioc",
        ],
        quiz: [
            {
                question: "Combien de temps faut-il tremper le manioc amer ?",
                options: ["2 heures", "12 heures", "24 à 48 heures", "Pas besoin de tremper"],
                correct: 2, explication: "Le trempage prolongé (24-48h) permet d'éliminer les composés cyanogènes du manioc amer.",
            },
            {
                question: "Que contient le manioc amer qui est dangereux ?",
                options: ["Du gluten", "Des composés cyanogènes", "Des métaux lourds", "Du lactose"],
                correct: 1, explication: "Le manioc amer contient de la linamarine, un composé cyanogène qui se transforme en cyanure d'hydrogène.",
            },
        ],
    },
    "conservation-poisson": {
        slug: "conservation-poisson", titre: "Conservation du poisson", sousTitre: "Chaîne du froid et signes de fraîcheur", emoji: "🐟",
        intro: "Le poisson est l'un des aliments les plus périssables. Au Gabon, avec les températures élevées, la rupture de la chaîne du froid est un risque majeur. Savoir reconnaître un poisson frais et le conserver correctement est essentiel pour éviter les intoxications alimentaires.",
        bonnesPratiques: [
            "Achetez du poisson avec des yeux clairs et brillants, pas enfoncés",
            "Vérifiez que les branchies sont rouges vif, pas brunes ou grises",
            "Le poisson frais doit avoir une odeur de mer/lac, jamais d'ammoniaque",
            "Placez le poisson au réfrigérateur dans les 30 minutes après l'achat",
            "Consommez le poisson frais dans les 24 heures ou congelez-le immédiatement",
        ],
        aEviter: [
            "N'achetez jamais du poisson exposé au soleil depuis plus d'une heure",
            "Ne recongelez jamais un poisson décongelé",
            "Évitez le poisson dont la chair est molle ou se décolle facilement",
        ],
        quiz: [
            {
                question: "Comment reconnaître un poisson frais ?",
                options: ["Odeur forte d'ammoniaque", "Yeux enfoncés et ternes", "Yeux clairs, branchies rouges vives", "Chair qui se décolle"],
                correct: 2, explication: "Un poisson frais a les yeux brillants et clairs, et des branchies rouges vives.",
            },
            {
                question: "Combien de temps peut-on garder du poisson frais au frigo ?",
                options: ["1 semaine", "3-4 jours", "24 heures", "Indéfiniment"],
                correct: 2, explication: "Le poisson frais doit être consommé dans les 24 heures ou congelé immédiatement.",
            },
        ],
    },
    "conservation-domicile": {
        slug: "conservation-domicile", titre: "Conservation des aliments au domicile", sousTitre: "Frigo, congélation et bonnes pratiques", emoji: "🏡",
        intro: "La bonne conservation des aliments au domicile est la première barrière contre les toxi-infections alimentaires. Avec le climat gabonais, les aliments se dégradent plus vite qu'en climat tempéré. Adoptez les bons réflexes pour protéger votre famille.",
        bonnesPratiques: [
            "Réglez votre réfrigérateur entre 0°C et 4°C, vérifiez avec un thermomètre",
            "Séparez les aliments crus (viande, poisson) des aliments cuits avec des contenants fermés",
            "Placez les restes de repas au frigo dans les 2 heures maximum",
            "Congelez les aliments en portions individuelles pour éviter de tout décongeler",
            "Datez vos restes avec un marqueur pour suivre la fraîcheur",
        ],
        aEviter: [
            "Ne surchargez pas le réfrigérateur (l'air froid doit circuler)",
            "Ne laissez jamais la porte du frigo ouverte plus de 30 secondes",
            "Ne recongelez jamais un aliment décongelé",
        ],
        quiz: [
            {
                question: "Quelle est la température idéale du réfrigérateur ?",
                options: ["5°C à 10°C", "0°C à 4°C", "-5°C à 0°C", "Peu importe la température"],
                correct: 1, explication: "La zone entre 0°C et 4°C ralentit la multiplication des bactéries sans congeler les aliments.",
            },
        ],
    },
    "hygiene-rue": {
        slug: "hygiene-rue", titre: "Hygiène de l'alimentation de rue", sousTitre: "Repérer un étal propre et sain", emoji: "🍢",
        intro: "La nourriture de rue est un élément essentiel de la culture gabonaise. Des bâtons de brochettes aux beignets en passant par le poisson grillé, ces plats sont délicieux mais peuvent présenter des risques sanitaires si l'hygiène n'est pas respectée.",
        bonnesPratiques: [
            "Choisissez un étal où le cuisinier porte des gants ou utilise des ustensiles propres",
            "Préférez les aliments cuits à haute température devant vous",
            "Vérifiez que l'étal est équipé d'un point d'eau pour le lavage des mains",
            "Observez la propreté générale : sol, plan de travail, conteneurs",
            "Demandez si l'étal a un agrément AGASA (QR code visible)",
        ],
        aEviter: [
            "Évitez les étals où les mouches sont nombreuses autour de la nourriture",
            "Ne mangez pas d'aliments exposés au soleil depuis longtemps",
            "Méfiez-vous des sauces froides conservées sans réfrigération",
        ],
        quiz: [
            {
                question: "Quel signe montre qu'un étal de rue est fiable ?",
                options: ["Beaucoup de clients", "Le cuisinier porte des gants et l'étal a de l'eau", "Les prix sont bas", "L'étal est ouvert depuis longtemps"],
                correct: 1, explication: "Un étal fiable a un accès à l'eau, des ustensiles propres, et idéalement un agrément AGASA.",
            },
        ],
    },
    "lavage-fruits-legumes": {
        slug: "lavage-fruits-legumes", titre: "Lavage des fruits et légumes", sousTitre: "Pourquoi et comment bien laver", emoji: "🥬",
        intro: "Les fruits et légumes peuvent être contaminés par des pesticides, des bactéries (E. coli, Salmonella) ou des parasites. Un lavage correct élimine la majorité de ces contaminants et réduit significativement les risques de maladie.",
        bonnesPratiques: [
            "Lavez TOUS les fruits et légumes, même ceux que vous allez éplucher",
            "Utilisez de l'eau courante propre, frottez avec les mains pendant 30 secondes",
            "Pour les légumes-feuilles, faites tremper 5 minutes dans de l'eau vinaigrée (1 cuillère/litre)",
            "Séchez avec un tissu propre ou du papier absorbant après lavage",
            "Lavez les fruits juste avant de les manger, pas à l'avance (ils se conservent mieux secs)",
        ],
        aEviter: [
            "N'utilisez jamais de savon ou de détergent pour laver les fruits",
            "Ne faites pas confiance à l'aspect extérieur — un fruit propre peut être contaminé",
            "Ne re-contaminéz pas les légumes lavés en les posant sur une surface sale",
        ],
        quiz: [
            {
                question: "Faut-il laver les fruits qu'on va éplucher ?",
                options: ["Non, l'épluchage suffit", "Oui, toujours laver avant d'éplucher", "Seulement les bananes", "Seulement si visiblement sales"],
                correct: 1, explication: "Le couteau peut transférer les contaminants de la peau vers la chair lors de l'épluchage.",
            },
            {
                question: "Que peut-on ajouter à l'eau pour un meilleur lavage des feuilles ?",
                options: ["Du savon", "Du vinaigre (1 cuillère par litre)", "De l'alcool", "De l'huile"],
                correct: 1, explication: "Le vinaigre blanc dilué aide à éliminer davantage de bactéries et pesticides des légumes-feuilles.",
            },
        ],
    },
    "dlc-dluo": {
        slug: "dlc-dluo", titre: "DLC vs DLUO : comprendre les dates", sousTitre: "Différence, quand jeter ou garder", emoji: "📋",
        intro: "En faisant vos courses, vous voyez \"À consommer avant le...\" ou \"À consommer de préférence avant le...\". Ces deux mentions n'ont PAS la même signification. Confondre DLC et DLUO peut mener au gaspillage ou, plus grave, à la consommation d'un produit dangereux.",
        bonnesPratiques: [
            "DLC (Date Limite de Consommation) = IMPÉRATIF. Au-delà, ne consommez pas.",
            "DLUO (Date de Durabilité Minimale) = INDICATIF. Le produit peut être consommé après.",
            "Vérifiez la date AVANT d'acheter et AVANT de consommer",
            "Organisez votre frigo/placard : les produits les plus proches de la date devant",
            "En cas de doute sur un produit frais (viande, poisson, laitier) : jetez-le",
        ],
        aEviter: [
            "Ne consommez JAMAIS un produit frais après sa DLC, même s'il a l'air bon",
            "Ne vous fiez pas uniquement à l'odeur ou l'aspect — certaines bactéries sont invisibles",
            "Ne modifiez/masquez jamais les dates sur un produit",
        ],
        quiz: [
            {
                question: "Quelle est la différence entre DLC et DLUO ?",
                options: [
                    "C'est la même chose", "DLC = impérative (danger), DLUO = indicative (qualité)",
                    "DLC pour les liquides, DLUO pour les solides", "DLC est plus récente que DLUO"
                ],
                correct: 1, explication: "La DLC est une date stricte (danger sanitaire après), la DLUO indique simplement une baisse possible de qualité.",
            },
            {
                question: "Un yaourt dépasse sa DLC d'un jour, que faire ?",
                options: ["Le manger si l'odeur est bonne", "Le jeter", "Le cuire puis le manger", "Le congeler"],
                correct: 1, explication: "Un produit frais dépassant sa DLC doit être jeté, même s'il semble normal. Les bactéries pathogènes sont souvent invisibles.",
            },
        ],
    },
    "intoxication-alimentaire": {
        slug: "intoxication-alimentaire", titre: "Intoxication alimentaire : que faire ?", sousTitre: "Symptômes, premiers gestes et prévention", emoji: "🏥",
        intro: "L'intoxication alimentaire touche chaque année des milliers de personnes au Gabon. Elle survient après la consommation d'un aliment contaminé par des bactéries (Salmonella, E. coli, Staphylococcus), des toxines, des parasites ou des produits chimiques. Savoir réagir rapidement peut limiter les complications.",
        bonnesPratiques: [
            "Hydratez-vous abondamment dès les premiers symptômes (eau, SRO, bouillons légers)",
            "Reposez-vous et laissez votre organisme éliminer les toxines naturellement",
            "Notez ce que vous avez mangé dans les dernières 24 à 72 heures",
            "Gardez si possible le produit suspect dans un sachet fermé comme preuve",
            "Consultez un médecin immédiatement si fièvre > 38.5°C, sang dans les selles ou vomissements persistants",
            "Pour les enfants de moins de 5 ans et les femmes enceintes, consultez dès les premiers symptômes",
        ],
        aEviter: [
            "Ne prenez PAS de médicaments anti-diarrhéiques sans avis médical (ils retiennent les toxines)",
            "Ne forcez pas à manger si vous n'avez pas faim — écoutez votre corps",
            "N'attendez pas 48h avant de consulter si les symptômes sont sévères",
            "Ne consommez plus d'aliment du même lot ou du même établissement",
        ],
        quiz: [
            {
                question: "Que faire en premier en cas d'intoxication alimentaire ?",
                options: ["Prendre un antibiotique", "S'hydrater abondamment", "Manger du riz", "Attendre que ça passe"],
                correct: 1, explication: "L'hydratation est la priorité absolue pour compenser les pertes liées aux vomissements et diarrhées.",
            },
            {
                question: "Quand faut-il consulter un médecin d'urgence ?",
                options: ["Dès le premier vomissement", "Si fièvre > 38.5°C ou sang dans les selles", "Après 1 semaine de symptômes", "Jamais, ça passe tout seul"],
                correct: 1, explication: "La fièvre élevée et le sang dans les selles indiquent une infection sérieuse nécessitant un traitement médical.",
            },
        ],
    },
    "bien-choisir-restaurant": {
        slug: "bien-choisir-restaurant", titre: "Bien choisir son restaurant au Gabon", sousTitre: "Score Smiley, agrément et critères visuels", emoji: "🍽️",
        intro: "Choisir un restaurant sûr au Gabon est devenu plus facile grâce au dispositif AGASA. Chaque établissement inspecté reçoit un score Smiley de 0 à 5, reflétant son niveau d'hygiène. Mais au-delà du score numérique, certains critères visuels vous permettent d'évaluer rapidement la qualité sanitaire d'un établissement.",
        bonnesPratiques: [
            "Scannez le QR code AGASA affiché à l'entrée pour voir le score Smiley en temps réel",
            "Vérifiez que l'agrément sanitaire est affiché et visible (certificat encadré)",
            "Observez la propreté du comptoir, des tables et du sol",
            "Regardez si le personnel porte des tenues propres et des coiffes de protection",
            "Préférez les restaurants dont la cuisine est visible ou semi-ouverte",
            "Un score Smiley de 4 ou 5 indique un excellent niveau d'hygiène",
        ],
        aEviter: [
            "Évitez les établissements sans QR code AGASA ou sans agrément visible",
            "Méfiez-vous des comptoirs avec de la nourriture exposée à l'air libre depuis longtemps",
            "Ne fréquentez pas un restaurant où les employés manipulent l'argent et la nourriture sans se laver les mains",
            "Évitez les établissements avec un score Smiley inférieur à 2",
        ],
        quiz: [
            {
                question: "Quel score Smiley indique un bon niveau d'hygiène ?",
                options: ["0 à 1", "2 à 3", "4 à 5", "Le score n'est pas important"],
                correct: 2, explication: "Un score de 4 ou 5 sur 5 indique un très bon niveau d'hygiène vérifié par l'AGASA.",
            },
            {
                question: "Comment vérifier le score d'un restaurant ?",
                options: ["Demander au serveur", "Scanner le QR code AGASA à l'entrée", "Regarder les avis Google", "Ce n'est pas possible"],
                correct: 1, explication: "Le QR code AGASA affiché à l'entrée permet d'accéder instantanément au score Smiley et à l'historique des inspections.",
            },
        ],
    },
};

export default function FicheManuelPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const fiche = FICHES_DB[slug];
    const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
    const [showResults, setShowResults] = useState<Record<number, boolean>>({});

    const handleAnswer = useCallback((qIdx: number, aIdx: number) => {
        setQuizAnswers((prev) => ({ ...prev, [qIdx]: aIdx }));
        setShowResults((prev) => ({ ...prev, [qIdx]: true }));
    }, []);

    const handleShare = useCallback(async () => {
        if (!fiche) return;
        const text = `📚 ${fiche.titre} — AGASA-Citoyen. ${fiche.sousTitre}. https://agasa-citoyen.ga/manuels/${fiche.slug}`;
        if (navigator.share) {
            try { await navigator.share({ title: fiche.titre, text }); } catch { }
        } else {
            await navigator.clipboard.writeText(text);
            alert("Lien copié !");
        }
    }, [fiche]);

    if (!fiche) {
        return (
            <div className="min-h-dvh bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-4xl mb-3">❓</p>
                    <p className="text-text-muted font-semibold">Fiche introuvable</p>
                    <Link href="/manuels" className="text-sm text-emerald mt-2 block">← Retour aux manuels</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-dvh bg-white pb-24">
            {/* Header */}
            <div className="bg-white border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-10">
                <Link href="/manuels" className="text-text-muted"><ArrowLeft className="w-5 h-5" /></Link>
                <h1 className="text-sm font-bold text-text truncate">{fiche.emoji} {fiche.titre}</h1>
            </div>

            <div className="px-4 py-4 space-y-4 max-w-lg mx-auto">
                {/* Hero */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 text-center">
                    <span className="text-5xl">{fiche.emoji}</span>
                    <h2 className="text-lg font-bold text-text mt-2">{fiche.titre}</h2>
                    <p className="text-sm text-text-muted mt-1 italic">&quot;{fiche.sousTitre}&quot;</p>
                </div>

                {/* Introduction */}
                <div className="text-sm text-text leading-relaxed">{fiche.intro}</div>

                {/* Bonnes pratiques */}
                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                    <h3 className="text-sm font-bold text-green-800 mb-2">✅ BONNES PRATIQUES :</h3>
                    <ol className="space-y-1.5">
                        {fiche.bonnesPratiques.map((bp, i) => (
                            <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                                <span className="text-green-500 font-bold text-xs mt-0.5">{i + 1}.</span> {bp}
                            </li>
                        ))}
                    </ol>
                </div>

                {/* À éviter */}
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                    <h3 className="text-sm font-bold text-red-800 mb-2">❌ À ÉVITER :</h3>
                    <ul className="space-y-1.5">
                        {fiche.aEviter.map((ae, i) => (
                            <li key={i} className="text-sm text-red-700 flex items-start gap-1.5">
                                <span className="text-red-400 mt-0.5">•</span> {ae}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Quiz */}
                <div className="bg-bg-muted rounded-xl p-4 border border-border">
                    <h3 className="text-sm font-bold text-text mb-3">📝 Quiz : Testez vos connaissances</h3>
                    <div className="space-y-4">
                        {fiche.quiz.map((q, qIdx) => (
                            <div key={qIdx} className="space-y-2">
                                <p className="text-sm font-medium text-text">Q{qIdx + 1} : {q.question}</p>
                                <div className="space-y-1.5">
                                    {q.options.map((opt, oIdx) => {
                                        const answered = showResults[qIdx];
                                        const selected = quizAnswers[qIdx] === oIdx;
                                        const isCorrect = oIdx === q.correct;

                                        return (
                                            <button
                                                key={oIdx}
                                                onClick={() => !answered && handleAnswer(qIdx, oIdx)}
                                                disabled={answered}
                                                className={cn(
                                                    "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2",
                                                    !answered && "bg-white border border-border hover:bg-bg-muted",
                                                    answered && isCorrect && "bg-green-100 border border-green-300 text-green-800",
                                                    answered && selected && !isCorrect && "bg-red-100 border border-red-300 text-red-800",
                                                    answered && !selected && !isCorrect && "bg-bg-muted border border-border text-text-muted"
                                                )}
                                            >
                                                {answered && isCorrect && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />}
                                                {answered && selected && !isCorrect && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />}
                                                {!answered && <span className="w-4 h-4 rounded-full border border-border flex-shrink-0" />}
                                                {opt}
                                            </button>
                                        );
                                    })}
                                </div>
                                {/* Feedback */}
                                {showResults[qIdx] && (
                                    <div className={cn(
                                        "rounded-lg p-2.5 text-xs mt-1",
                                        quizAnswers[qIdx] === q.correct ? "bg-green-50 text-green-700 border border-green-200" : "bg-orange-50 text-orange-700 border border-orange-200"
                                    )}>
                                        {quizAnswers[qIdx] === q.correct ? "✅ Bonne réponse ! " : "❌ Mauvaise réponse. "}
                                        {q.explication}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Share */}
                <button
                    onClick={handleShare}
                    className="flex items-center justify-center gap-2 w-full h-12 bg-emerald/10 text-emerald rounded-xl text-sm font-semibold hover:bg-emerald/20 transition-colors"
                >
                    <Share2 className="w-4 h-4" /> 📤 Partager cette fiche
                </button>
            </div>
        </div>
    );
}
