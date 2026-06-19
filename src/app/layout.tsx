import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://mundotilin.si.com.bo"),
  title: {
    default: "MundoTilín | Shows infantiles y animación de eventos",
    template: "%s | MundoTilín",
  },
  description:
    "MundoTilín ofrece shows infantiles, animación, juegos, dinámicas y servicios para cumpleaños, baby showers y eventos familiares.",
  keywords: [
    "MundoTilín",
    "shows infantiles",
    "payaso",
    "animación de eventos",
    "cumpleaños infantiles",
    "baby shower",
    "eventos familiares",
  ],
  authors: [{ name: "MundoTilín" }],
  creator: "MundoTilín",
  openGraph: {
    title: "MundoTilín | Shows infantiles y animación",
    description:
      "Alegría, juegos y animación profesional para cumpleaños, baby showers y eventos familiares.",
    url: "https://mundotilin.si.com.bo",
    siteName: "MundoTilín",
    images: [
      {
        url: "/images/landing/og-image.png",
        width: 1200,
        height: 630,
        alt: "MundoTilín - Shows infantiles y animación de eventos",
      },
    ],
    locale: "es_BO",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>
  {children}

  {process.env.NEXT_PUBLIC_GA_ID && (
    <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
  )}
</body>
    </html>
  );
}
