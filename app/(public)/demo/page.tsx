import PageHero from "@/components/public/PageHero";
import DemoProfiles from "@/components/public/DemoProfiles";

export default function DemoPage() {
    return (
        <>
            <PageHero
                badge="Mode démonstration"
                title="Tester AGASA-Citoyen"
                titleAccent="sans créer de compte"
                description="Sélectionnez un profil pour parcourir les principaux écrans métier de la plateforme."
                primaryAction={{ label: "Choisir un profil", href: "#profils-demo" }}
                secondaryAction={{ label: "Retour accueil", href: "/" }}
            />

            <div className="py-16 lg:py-24 bg-bg-card dark:bg-bg">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <DemoProfiles />
                </div>
            </div>
        </>
    );
}
