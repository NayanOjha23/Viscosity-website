import SectionHead from "@/components/ui/SectionHead";

export default function Thesis() {
  return (
    <section className="thesis" id="thesis">
      <div className="glass section-intro">
        <SectionHead index="01" label="THE DISCIPLINE OF FLOW" />
        <h2 className="thesis__text reveal-lines">
          Viscosity is resistance to flow. Trading is the opposite —
          the removal of every resistance between refinery and blending plant.
          We exist to make heavy molecules move <em>lightly.</em>
        </h2>
      </div>
      <div className="stats">
        <div className="stat reveal">
          <div className="stat__num mono"><span data-count="5">0</span></div>
          <div className="stat__label mono">API GROUPS TRADED, I–V</div>
        </div>
        <div className="stat reveal">
          <div className="stat__num mono"><span data-count="40">0</span>+</div>
          <div className="stat__label mono">COUNTRIES SERVED</div>
        </div>
        <div className="stat reveal">
          <div className="stat__num mono"><span data-count="75">0</span>K</div>
          <div className="stat__label mono">MT TRADED ANNUALLY</div>
        </div>
        <div className="stat reveal">
          <div className="stat__num mono"><span data-count="24">0</span>/7</div>
          <div className="stat__label mono">CHARTERING &amp; OPS DESK</div>
        </div>
      </div>
    </section>
  );
}
