import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AuthSessionProvider } from "@/providers/session-provider";
import { CartProvider } from "@/providers/cart-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MiniMarket — segunda mano",
    template: "%s · MiniMarket",
  },
  description:
    "Marketplace de segunda mano: publica, busca y compra productos con facilidad.",
  openGraph: {
    title: "MiniMarket",
    description: "Compra y vende productos de segunda mano.",
    url: siteUrl,
    siteName: "MiniMarket",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <AuthSessionProvider>
          <CartProvider>
            <SiteHeader />
            <div className="flex-1 w-full">{children}</div>
            <SiteFooter />
          </CartProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
