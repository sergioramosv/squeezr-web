import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";
import { Navbar } from "@/components/Navbar";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Squeezr — AI Context Compression",
  description: "Local proxy that compresses your AI coding tool's context window. Save thousands of tokens per session with zero workflow changes.",
  openGraph: {
    title: "Squeezr — AI Context Compression",
    description: "Compress your AI context. Save tokens. Ship faster.",
    url: "https://squeezr.dev",
    siteName: "Squeezr",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Squeezr — AI Context Compression",
    description: "Compress your AI context. Save tokens. Ship faster.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={montserrat.variable}>
      <body>
        <ThemeProvider>
          <I18nProvider>
            <Navbar />
            <main className="pt-16">{children}</main>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
