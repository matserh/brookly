import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brookly - Les 7 Habitudes de la Réussite",
  description: "Découvrez les 7 habitudes qui transforment votre vie. eBook par Badi Mohamed - Développement personnel et réussite.",
  keywords: ["Brookly", "7 Habitudes", "Réussite", "Développement personnel", "Badi Mohamed", "eBook"],
  authors: [{ name: "Badi Mohamed" }],
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Brookly - Les 7 Habitudes de la Réussite",
    description: "Transformez votre vie avec les 7 habitudes de la réussite",
    url: "https://brookly.vercel.app",
    siteName: "Brookly",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
