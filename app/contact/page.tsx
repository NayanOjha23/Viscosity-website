import type { Metadata } from "next";
import SceneCanvas from "@/components/animation/SceneCanvas";
import SectionHead from "@/components/ui/SectionHead";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/ui/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Request a quote for Group I–V base oils. Contact Viscosity Global in Dubai, UAE — admin@viscosity.global. Firm indications within 24 hours.",
  openGraph: { url: "https://viscosity.global/contact/" },
};

const CHANNELS = [
  {
    label: "EMAIL",
    title: "Trading Desk",
    body: "For enquiries, spec requests and indicative pricing on any Group I–V grade.",
    value: "ADMIN@VISCOSITY.GLOBAL",
    href: "mailto:admin@viscosity.global",
  },
  {
    label: "PHONE",
    title: "Operations",
    body: "Chartering, ops and urgent cargo enquiries. Manned 24/7 for active positions.",
    value: "+971 54 285 9995",
    href: "tel:+971542859995",
  },
  {
    label: "ADDRESS",
    title: "Headquarters",
    body: "Based in Dubai — along the biggest trade route for oil and gas in the world.",
    value: "DUBAI, UAE",
    href: undefined,
  },
];

const PROCESS = [
  {
    num: "/01",
    title: "Send Your Enquiry",
    body: "Email us with grade, volume, load port and preferred delivery window. Include your COA requirement and any quality spec deviations.",
    tag: "EMAIL · WHATSAPP · CALL",
  },
  {
    num: "/02",
    title: "Firm Indication",
    body: "We respond within 24 hours with a firm price indication, proposed loading date, and available origins that meet your spec.",
    tag: "WITHIN 24 HOURS",
  },
  {
    num: "/03",
    title: "Confirm Terms",
    body: "Once agreed, we fix the vessel, issue the sales contract and handle LC or TT documentation per your requirements.",
    tag: "CONTRACT · LC · TT",
  },
  {
    num: "/04",
    title: "Cargo Ships",
    body: "Independent inspection at load port. Full COA issued. Cargo delivered to your nominated discharge port, in spec, on time.",
    tag: "INSPECT · CERTIFY · DELIVER",
  },
];

export default function ContactPage() {
  return (
    <>
      <SceneCanvas mode="ambient" />
      <main id="top">

        {/* ── 00 / HERO ──────────────────────────────────────────────── */}
        <section className="page-hero" style={{ paddingInline: "var(--pad)" }}>
          <SectionHead index="00" label="GET IN TOUCH" />
          <p className="page-hero__eyebrow mono reveal">
            24H RESPONSE · FIRM INDICATIONS · ANY PORT
          </p>
          <h1 className="page-hero__title reveal">
            Start the flow.
          </h1>
          <p className="page-hero__sub reveal">
            Base oil trading moves fast. Send us your enquiry and we&apos;ll come
            back with a firm indication within 24 hours — grade, volume, port, price.
          </p>
        </section>

        {/* ── 01 / CTA HEADLINE ──────────────────────────────────────── */}
        <section className="contact" id="contact">
          <SectionHead index="01" label="REQUEST A QUOTE" />
          <h2 className="contact__title">
            <span className="line"><span>Tell us the grade,</span></span>
            <span className="line"><span>the port, the month.</span></span>
            <span className="line"><span><em>We&apos;ll handle the rest.</em></span></span>
          </h2>
          <div className="contact__row">
            <a className="contact__cta" href="mailto:admin@viscosity.global">
              <span>REQUEST A QUOTE</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <div className="contact__meta mono glass--soft">
              <p>ADMIN@VISCOSITY.GLOBAL</p>
              <p>+971 54 285 9995</p>
              <p>DUBAI · UAE</p>
            </div>
          </div>
        </section>

        {/* ── 02 / ENQUIRY FORM ──────────────────────────────────────── */}
        <section style={{ padding: "clamp(4rem,10vh,7rem) var(--pad)" }}>
          <SectionHead index="02" label="SEND AN ENQUIRY" />
          <ContactForm />
        </section>

        {/* ── 03 / CONTACT DETAILS ───────────────────────────────────── */}
        <section style={{ padding: "clamp(4rem,10vh,7rem) var(--pad)" }}>
          <SectionHead index="03" label="REACH US" />
          <div className="about-edge__items" style={{ marginTop: "clamp(2rem,5vh,3.5rem)" }}>
            {CHANNELS.map((ch) => (
              <div key={ch.label} className="about-edge__item reveal">
                <div className="about-edge__num mono">{ch.label}</div>
                <h3 className="about-edge__title">{ch.title}</h3>
                <p className="about-edge__body">{ch.body}</p>
                {ch.href ? (
                  <a
                    href={ch.href}
                    className="about-edge__tag mono"
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {ch.value}
                  </a>
                ) : (
                  <div className="about-edge__tag mono">{ch.value}</div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── 04 / ENQUIRY PROCESS ───────────────────────────────────── */}
        <section
          style={{
            paddingInline: "var(--pad)",
            paddingTop: "clamp(4rem,10vh,7rem)",
            paddingBottom: "clamp(6rem,14vh,10rem)",
          }}
        >
          <div className="section-intro">
            <SectionHead index="04" label="WHAT HAPPENS NEXT" />
            <h2 className="section-title reveal">
              From enquiry<br />to delivery.
            </h2>
            <p className="section-sub reveal">
              Four steps. One partner. Start to finish.
            </p>
          </div>
          <div className="cards">
            {PROCESS.map((p) => <Card key={p.num} {...p} />)}
          </div>
        </section>

      </main>
    </>
  );
}
