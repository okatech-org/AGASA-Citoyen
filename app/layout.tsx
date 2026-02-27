import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ConvexClientProvider } from "@/components/providers/ConvexClientProvider";
import { AuthProvider } from "@/hooks/useAuth";
import InstallBanner from "@/components/layout/InstallBanner";

export const metadata: Metadata = {
  title: "AGASA-Citoyen — Sécurité Alimentaire",
  description:
    "Scannez, vérifiez, signalez. Votre allié pour une alimentation sûre au Gabon. Application gratuite de l'Agence Gabonaise de Sécurité Alimentaire.",
  manifest: "/manifest.json",
  keywords: [
    "AGASA",
    "sécurité alimentaire",
    "Gabon",
    "hygiène",
    "Smiley",
    "inspection",
    "citoyen",
  ],
  authors: [{ name: "AGASA — Agence Gabonaise de Sécurité Alimentaire" }],
  openGraph: {
    title: "AGASA-Citoyen — Scannez avant de manger 📱",
    description:
      "Vérifiez l'hygiène de vos restaurants et marchés en un instant. 100% gratuit.",
    type: "website",
    locale: "fr_FR",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "AGASA-Citoyen",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#2E7D32",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body>
        <ConvexClientProvider>
          <AuthProvider>
            <InstallBanner />
            {children}
          </AuthProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
