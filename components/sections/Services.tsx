import SectionHead from "@/components/ui/SectionHead";
import Card from "@/components/ui/Card";

const CARDS = [
  {
    num: "/01",
    title: "Trading",
    body: "Term contracts and spot positions across Group I–V. Pricing intelligence grounded in physical flows, not screen sentiment. We take title, we take risk.",
    tag: "TERM · SPOT · STRUCTURED",
  },
  {
    num: "/02",
    title: "Logistics",
    body: "Chartering, storage, bulk parcels, flexibags, ISO tanks and drums. Door-to-tank delivery engineered around your blending schedule — not the carrier's.",
    tag: "BULK · FLEXIBAG · ISO · DRUM",
  },
  {
    num: "/03",
    title: "Quality & Testing",
    body: "Independent inspection at load and discharge port. Full slate analysis — viscosity, flash point, pour point, VI, sulphur, saturates — certified before transfer of title.",
    tag: "ASTM · ISO 17025 CERTIFIED LABS",
  },
  {
    num: "/04",
    title: "Documentation",
    body: "Letters of Credit, Certificates of Origin, Certificates of Analysis, Bills of Lading and MSDS — prepared and filed before the vessel sails.",
    tag: "LC · COA · COO · B/L · MSDS",
  },
];

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="glass section-intro">
        <SectionHead index="04" label="FULL-SERVICE STRUCTURE" />
        <h2 className="section-title reveal">
          One partner.<br />Start to <em>finish.</em>
        </h2>
      </div>
      <div className="cards">
        {CARDS.map((c) => <Card key={c.num} {...c} />)}
      </div>
    </section>
  );
}
