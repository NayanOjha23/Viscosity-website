import type { Metadata } from "next";
import HomeScene from "@/components/animation/HomeScene";
import Hero from "@/components/sections/Hero";
import Thesis from "@/components/sections/Thesis";
import SpectrumTeaser from "@/components/sections/SpectrumTeaser";
import Network from "@/components/sections/Network";
import Services from "@/components/sections/Services";
import ContactSection from "@/components/sections/ContactSection";

export const metadata: Metadata = {
  title: "Viscosity Global — Base Oil Trading, Worldwide",
  description:
    "UAE-based global trader of Group I–V base oils and synthetics. Trading, logistics, quality testing and documentation — handled end to end.",
  openGraph: { url: "https://viscosity.global/" },
};

export default function HomePage() {
  return (
    <>
      <HomeScene />
      <main id="top">
        <Hero />
        <Thesis />
        <SpectrumTeaser />
        <Network />
        <Services />
        <ContactSection />
      </main>
    </>
  );
}
