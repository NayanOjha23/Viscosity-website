import SectionHead from "@/components/ui/SectionHead";

export default function ContactSection() {
  return (
    <section className="contact" id="contact">
      <SectionHead index="05" label="START THE FLOW" />
      <h2 className="contact__title">
        <span className="line"><span>Tell us the grade, the timeline, </span></span>
        <span className="line"><span>and the destination.</span></span>
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
          <p>+971 50 985 2782</p>
          <p>DUBAI · UAE</p>
        </div>
      </div>
    </section>
  );
}
