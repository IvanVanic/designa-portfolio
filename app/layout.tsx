/**
 * Root Layout Component
 * Provides the main layout structure for the application
 */

import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import { Sora } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { ErrorBoundary } from "@/components/error-boundary";
import { AnimatedBackground } from "@/components/animated-background";

const sora = Sora({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Designa - Professional Game Art Portfolio",
  description:
    "Explore stunning game art, character designs, and digital creations by professional game artist Designa. View portfolio, workshops, and mentorship opportunities.",
  keywords: ["game art", "digital art", "character design", "portfolio", "workshops", "mentorship"],
  authors: [{ name: "Designa" }],
  creator: "Designa",
  publisher: "Designa",
  openGraph: {
    title: "Designa - Professional Game Art Portfolio",
    description:
      "Explore stunning game art, character designs, and digital creations by professional game artist Designa.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Designa - Professional Game Art Portfolio",
    description:
      "Explore stunning game art, character designs, and digital creations by professional game artist Designa.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(sora.className)} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* Sitewide deep, cool gradient sits behind animated layer */}
          <div
            className="fixed inset-0 -z-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 40%, #050a10 0%, #061119 35%, #07131a 60%, #050a10 100%)",
            }}
          />
          <AnimatedBackground />
          {/* preload critical gallery assets */}
          <link rel="preload" as="image" href="/brand/designa-wordmark.svg" />
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
