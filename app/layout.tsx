import type { Metadata, Viewport } from "next";
import "./globals.css";
import { spaceGrotesk, inter, ibmPlexMono } from "./fonts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Ticker from "@/components/animation/Ticker";
import SmoothScrollProvider from "@/components/animation/SmoothScrollProvider";
import { organizationSchema } from "@/lib/seo/organization";

export const metadata: Metadata = {
  metadataBase: new URL("https://viscosityglobal.com"),
  title: {
    default: "Viscosity Global — Base Oil Trading, Worldwide",
    template: "%s | Viscosity Global",
  },
  description:
    "UAE-based global trader of Group I–V base oils and synthetics. Trading, logistics, quality testing and documentation — handled end to end.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://viscosityglobal.com",
    siteName: "Viscosity Global",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: "/assets/viscosity-mark-only-light.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#06080d",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <div className="scrim" />
        <div className="grain" />
        <Ticker />
        <Header />
        {/* SmoothScrollProvider wraps all content so reveal animations fire on footer too */}
        <SmoothScrollProvider>
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
