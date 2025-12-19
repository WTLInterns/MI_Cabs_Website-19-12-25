import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "MiCabs - Reliable Cab Services in Pune",
  description: "Book reliable and affordable cab services in Pune. 24/7 availability, pet-friendly cabs, and professional drivers.",
  keywords: ["cab service pune", "taxi service", "airport transfer", "pet taxi", "local cabs"],
  authors: [{ name: "MiCabs Team" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#2563eb",
  openGraph: {
    title: "MiCabs - Reliable Cab Services in Pune",
    description: "Book reliable and affordable cab services in Pune. 24/7 availability, pet-friendly cabs, and professional drivers.",
    url: "https://micabspune.com",
    siteName: "MiCabs",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MiCabs - Reliable Cab Services in Pune",
    description: "Book reliable and affordable cab services in Pune. 24/7 availability, pet-friendly cabs, and professional drivers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50 text-gray-900`}>
        <Header />
        <main className="min-h-[calc(100vh-200px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
