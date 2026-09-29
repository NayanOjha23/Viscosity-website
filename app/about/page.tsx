import type { Metadata } from "next";
import SceneCanvas from "@/components/animation/SceneCanvas";
import SectionHead from "@/components/ui/SectionHead";
import Card from "@/components/ui/Card";

export const metadata: Metadata = {
  title: "About",
  description:
    "Viscosity Global is a UAE-based trading house specialising in physical base oil markets. Our edge is speed, precision and complete accountability across the supply chain.",
  openGraph: { url: "https://viscosityglobal.com/about/" },
};

const STATS = [
  { num: "5", label: "API GROUPS TRADED, I–V" },
  { num: "40+", label: "COUNTRIES SERVED" },
  { num: "75K", label: "MT TRADED ANNUALLY" },
  { num: "24/7", label: "CHARTERING & OPS DESK" },
];

const LOCATION = [
  {
    label: "HEADQUARTERS",
    value: "Dubai",
    sub: "United Arab Emirates",
  },
  {
    label: "POSITION",
    value: "Strait of Hormuz",
    sub: "25.1288° N, 56.3265° E\nMouth of the Gulf",
  },
  {
    label: "HUB ACCESS",
    value: "Dubai & Hamriyah",
    sub: "World's largest bunkering cluster\nStorage, blending & breakbulk",
  },
  {
    label: "COVERAGE",
    value: "Every Major Basin",
    sub: "Atlantic · Indian Ocean · Pacific\nAll load & discharge ports",
  },
];

const EDGE = [
  {
    num: "/01",
    title: "Physical Presence",
    body: "Based in Dubai — along the biggest trade route for oil and gas in the world. Proximity to cargo means faster fixing, tighter pricing and hands-on inspection before title transfers.",
    tag: "DUBAI · HAMRIYAH · JEBEL ALI",
  },
  {
    num: "/02",
    title: "Refinery Relationships",
    body: "Years of direct trading with producers in the Middle East, Southeast Asia, Korea and Europe. We source on established relationships, not spot-market cold calls — which means allocation in tight markets.",
    tag: "GROUP I–V · CERTIFIED ORIGINS",
  },
  {
    num: "/03",
    title: "End-to-End Ownership",
    body: "We take title. We arrange the vessel, fix the inspectors, prepare the documents and deliver against your schedule. One phone call. One partner. Every step accounted for.",
    tag: "CHARTER · INSPECT · DOCUMENT · DELIVER",
  },
];

const VALUES = [
  {
    num: "/01",
    title: "Physical Accountability",
    body: "We take title. We take risk. Every position we put on is backed by real cargo, real partners and real liability — not a spreadsheet entry.",
    tag: "TITLE · RISK · OWNERSHIP",
  },
  {
    num: "/02",
    title: "Precision Logistics",
    body: "Delivery is not an afterthought. We engineer the supply chain around your blending schedule, your quality spec and your port.",
    tag: "BULK · FLEXIBAG · ISO · DRUM",
  },
  {
    num: "/03",
    title: "Quality Integrity",
    body: "Independent inspection at load and discharge. Full slate certified before transfer of title — viscosity, VI, flash, pour, sulphur, saturates.",
    tag: "ASTM · ISO 17025 CERTIFIED",
  },
  {
    num: "/04",
    title: "Compliance First",
    body: "Documentation and regulatory compliance handled before the vessel sails. No surprises at the discharge port.",
    tag: "LC · COA · COO · B/L · MSDS",
  },
];

export default function AboutPage() {
  return (
    <>
      <SceneCanvas mode="ambient" config={{
        initialState: 2,
        colors: ["#2BD4D4", "#3A7BFF", "#6B4FE0"],
        particleSize: 5.5,
        glowIntensity: 0.15,
        cameraZ: 14.5,
      }} />
      <main id="top">

        {/* ── 00 / HERO ──────────────────────────────────────────────── */}
        <section className="page-hero" style={{ paddingInline: "var(--pad)" }}>
          <SectionHead index="00" label="WHO WE ARE" />
          <p className="page-hero__eyebrow mono reveal">
            VISCOSITY GLOBAL FZE · DUBAI, UAE
          </p>
          <h1 className="page-hero__title reveal">
            The trading house<br />built on flow.
          </h1>
          <p className="page-hero__sub reveal">
            Viscosity Global is a physical base oil trading house based in
            Dubai — along the biggest trade route for oil and gas in the world,
            within reach of one of the largest bunkering hubs. We source Group I–V base oils
            and synthetic fluids from certified refineries across the globe and
            deliver them where the molecule is needed, when it is needed.
          </p>

          {/* Stats strip */}
          <div className="stats" style={{ marginTop: "clamp(2.5rem,6vh,4.5rem)" }}>
            {STATS.map((s) => (
              <div key={s.label} className="stat reveal">
                <div
                  className="stat__num mono"
                  {...(s.num === "5" ? { "data-count": "5" } : {})}
                >
                  {s.num}
                </div>
                <div className="stat__label mono">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 01 / THE DISCIPLINE ────────────────────────────────────── */}
        <section className="about-story">
          <div className="glass section-intro">
            <SectionHead index="01" label="THE DISCIPLINE" />
            <h2 className="about-story__text reveal-lines">
              Viscosity is resistance to flow. We exist to remove every resistance
              between refinery and blending plant — in documentation, logistics,
              quality and partner risk.{" "}
              <em>That&apos;s the whole business.</em>
            </h2>
          </div>
        </section>

        {/* ── 02 / LOCATION ──────────────────────────────────────────── */}
        <section className="about-location">
          <div className="glass section-intro">
            <SectionHead index="02" label="WHERE WE OPERATE" />
            <h2 className="section-title reveal">
              Positioned at the<br />world&apos;s crossroads.
            </h2>
            <p className="section-sub reveal">
              Dubai sits along the biggest trade route for oil and gas in the
              world. From here, we access one of the largest bunkering and storage
              clusters on the planet and fix tonnage across every major port
              within 24 hours.
            </p>
          </div>
          <div className="about-location__grid">
            {LOCATION.map((l) => (
              <div key={l.label} className="about-location__cell reveal">
                <div className="about-location__label mono">{l.label}</div>
                <div className="about-location__value">{l.value}</div>
                <p className="about-location__sub mono">
                  {l.sub.split("\n").map((line, i) => (
                    <span key={i} style={{ display: "block" }}>{line}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 03 / THE EDGE ──────────────────────────────────────────── */}
        <section className="about-edge">
          <div className="glass section-intro">
            <SectionHead index="03" label="THE EDGE" />
            <h2 className="section-title reveal">
              Why trade with<br />Viscosity Global.
            </h2>
          </div>
          <div className="about-edge__items">
            {EDGE.map((e) => (
              <div key={e.num} className="about-edge__item reveal">
                <div className="about-edge__num mono">{e.num}</div>
                <h3 className="about-edge__title">{e.title}</h3>
                <p className="about-edge__body">{e.body}</p>
                <div className="about-edge__tag mono">{e.tag}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 / HOW WE OPERATE ────────────────────────────────────── */}
        <section className="about-values" style={{ paddingInline: "var(--pad)" }}>
          <div className="glass section-intro">
            <SectionHead index="04" label="HOW WE OPERATE" />
            <h2 className="section-title reveal">
              One partner.<br />Start to <em>finish.</em>
            </h2>
          </div>
          <div className="cards">
            {VALUES.map((v) => <Card key={v.num} {...v} />)}
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────────────── */}
        <section className="contact" id="contact">
          <SectionHead index="05" label="START THE FLOW" />
          <h2 className="contact__title">
            <span className="line"><span>Tell us the grade,</span></span>
            <span className="line"><span>the port, the month.</span></span>
            <span className="line"><span><em>We&apos;ll handle the rest.</em></span></span>
          </h2>
          <div className="contact__row">
            <a className="contact__cta" href="mailto:trading@viscosityglobal.com">
              <span>REQUEST A QUOTE</span>
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
