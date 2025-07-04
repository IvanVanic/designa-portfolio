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
      <body className={cn(sora.className)}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ErrorBoundary>{children}</ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
