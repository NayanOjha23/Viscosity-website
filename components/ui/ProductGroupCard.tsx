interface ProductGroupCardProps {
  id: string;
  name: string;
  specs: string[];
  grades: string;
  group: number;
  detail: string;
  applications: string;
}

export default function ProductGroupCard({
  id,
  name,
  specs,
  grades,
  group,
  detail,
  applications,
}: ProductGroupCardProps) {
  const subject = encodeURIComponent(`${id} Base Oil Enquiry — Viscosity Global`);
  const mailto = `mailto:admin@viscosity.global?subject=${subject}`;

  return (
    <article className="product-card reveal" data-group={group}>
      <div className="product-card__header">
        <span className="product-card__id mono">{id}</span>
        <h2 className="product-card__name">{name}</h2>
        <div className="product-card__purity-track">
          <div className="product-card__purity" />
        </div>
      </div>

      <p className="product-card__detail">{detail}</p>

      <div className="product-card__data">
        <div className="product-card__specs mono">
          {specs.map((s, i) => (
            <span key={i} className="product-card__spec-chip">{s}</span>
          ))}
        </div>
        <div className="product-card__grades mono">{grades}</div>
      </div>

      <div className="product-card__footer">
        <div className="product-card__applications mono">{applications}</div>
        <a className="product-card__cta mono" href={mailto}>
          REQUEST {id}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </article>
  );
}
