import type { Metadata } from "next";
import SceneCanvas from "@/components/animation/SceneCanvas";
import SectionHead from "@/components/ui/SectionHead";
import ProductGroupCard from "@/components/ui/ProductGroupCard";
import { PRODUCT_GROUPS } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Viscosity Global trades Group I–V base oils, synthetic fluids and petrochemicals including PAOs, esters, naphthenics and pale oils — sourced from certified refineries worldwide.",
  openGraph: { url: "https://viscosityglobal.com/products/" },
};

const STATS = [
  { num: "5", label: "API GROUPS TRADED" },
  { num: "I–V", label: "FULL BASE OIL SPECTRUM" },
  { num: "20+", label: "GRADES AVAILABLE" },
  { num: "PER SPEC", label: "EVERY DELIVERY" },
];

const SCALE_LABELS = ["GR I", "GR II", "GR III", "GR IV", "GR V"];

export default function ProductsPage() {
  return (
    <>
      <SceneCanvas mode="ambient" config={{
        initialState: 1,
        colors: ["#2BD4D4", "#5B8FFF", "#8E5CFF"],
        particleSize: 6.5,
        cameraZ: 18,
      }} />
      <main id="top">
        {/* ── PAGE HERO ─────────────────────────────────────────────── */}
        <section className="spectrum" style={{ paddingTop: "clamp(8rem,20vh,13rem)", paddingBottom: 0 }}>
          <div className="glass section-intro">
            <SectionHead index="00" label="THE REFINEMENT SPECTRUM" />
            <h1 className="section-title reveal">Five grades of stillness.</h1>
            <p className="section-sub reveal">
              From solvent-refined Group I to fully synthetic Group V — every grade
              in the spectrum, sourced from certified refineries and delivered to
              specification. All grades available in bulk parcels, flexibags, ISO tanks and drums.
            </p>
          </div>

          {/* Stats strip */}
          <div className="stats" style={{ marginTop: "clamp(2rem,5vh,3.5rem)" }}>
            {STATS.map((s) => (
              <div key={s.label} className="stat reveal">
                <div className="stat__num mono">{s.num}</div>
                <div className="stat__label mono">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── REFINEMENT SCALE ──────────────────────────────────────── */}
        <div
          className="refinement-scale reveal"
          style={{ marginTop: "clamp(3rem,7vh,5rem)" }}
        >
          <div className="refinement-scale__bar" />
          <div className="refinement-scale__labels">
            {SCALE_LABELS.map((l) => <span key={l}>{l}</span>)}
          </div>
          <p className="refinement-scale__caption mono">
            INCREASING REFINEMENT &amp; PURITY →
          </p>
        </div>

        {/* ── PRODUCT CARDS ─────────────────────────────────────────── */}
        <div className="product-cards" style={{ padding: "0 var(--pad)" }}>
          {PRODUCT_GROUPS.map((g) => (
            <ProductGroupCard key={g.id} {...g} />
          ))}
        </div>

        {/* ── REQUEST SPECS CTA ─────────────────────────────────────── */}
        <section className="contact" id="contact">
          <SectionHead index="01" label="REQUEST PRODUCT SPECS" />
          <h2 className="contact__title">
            <span className="line"><span>Tell us the grade,</span></span>
            <span className="line"><span>the volume, the port.</span></span>
            <span className="line"><span><em>We&apos;ll send specs.</em></span></span>
          </h2>
          <div className="contact__row">
            <a className="contact__cta" href="mailto:trading@viscosityglobal.com">
              <span>REQUEST SPECS</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <div className="contact__meta mono glass--soft">
              <p>TRADING@VISCOSITYGLOBAL.COM</p>
              <p>+971 (0) 4 000 0000</p>
              <p>DUBAI · UAE</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
