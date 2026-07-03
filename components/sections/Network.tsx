import SectionHead from "@/components/ui/SectionHead";
import RouteRow from "@/components/ui/RouteRow";

const ROUTES = [
  { from: "HAMRIYAH", to: "DURBAN", meta: "BULK PARCELS" },
  { from: "JEBEL ALI", to: "SÃO PAULO", meta: "FLEXIBAGS · ISO TANKS" },
  { from: "BUSAN", to: "JEBEL ALI", meta: "GR III CARGOES" },
  { from: "HAMRIYAH", to: "NHAVA SHEVA", meta: "BULK · DRUMS" },
  { from: "ARA", to: "JEBEL ALI", meta: "GR II CARGOES" },
];

export default function Network() {
  return (
    <section className="network" id="network">
      <div className="glass section-intro">
        <SectionHead index="03" label="THE NETWORK" />
        <h2 className="section-title reveal">
          The supply chain never stops.<br />Neither do <em>we.</em>
        </h2>
        <p className="section-sub reveal">
          Headquartered along the biggest trade route for oil and gas in the world —
          within reach of one of the largest bunkering and storage hubs — we move
          tonnage in bulk parcels, flexibags, ISO tanks and drums across every major port.
        </p>
      </div>
      <div className="routes mono">
        {ROUTES.map((r) => (
          <RouteRow key={r.from + r.to} {...r} />
        ))}
      </div>
    </section>
  );
}
