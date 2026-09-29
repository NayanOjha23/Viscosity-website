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
    url: "https://viscosityglobal.com/",
    siteName: "Viscosity Global",
  },
  twitter: {
    card: "summary_large_image",
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
      className={`no-js ${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Drop the no-JS fallback before paint; without JS, .reveal content stays visible. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }}
        />
      </head>
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
