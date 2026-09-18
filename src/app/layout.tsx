import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans, EB_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { BRAND_CONFIG } from "@/config/brand";
import { ShopProvider } from "@/context/ShopContext";
import { CrmProvider } from "@/context/CrmContext";
import { CartProvider } from "@/context/CartContext";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.positioning}`,
  description: `${BRAND_CONFIG.slogan} Modern Indian rolled-gold bangles, antique-gold necklaces & statement fashion jewellery under ₹2,000.`,
  keywords: [
    "ENTEYA jewellery",
    "modern Indian gold jewellery",
    "rolled gold bangles",
    "rolled gold necklaces",
    "antique gold jewellery India",
    "trendy rolled gold jewellery",
    "jewellery under 2000"
  ],
  authors: [{ name: "ENTEYA Jewellery Studio" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.slogan}`,
    description: `${BRAND_CONFIG.positioning}. Rolled gold bangles, antique gold necklaces & fashion jewellery.`,
    siteName: "ENTEYA Jewellery",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-model.jpg",
        width: 1200,
        height: 630,
        alt: "ENTEYA Modern Indian Gold Reimagined",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND_CONFIG.name} — ${BRAND_CONFIG.slogan}`,
    description: BRAND_CONFIG.positioning,
    images: ["/images/hero-model.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable} ${ebGaramond.variable} ${dmSans.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-white text-enteya-charcoal selection:bg-enteya-magenta selection:text-white min-h-screen flex flex-col justify-between">
        <CrmProvider>
          <ShopProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </ShopProvider>
        </CrmProvider>
      </body>
    </html>
  );
}
