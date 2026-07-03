interface SectionHeadProps {
  index: string;
  label: string;
}

export default function SectionHead({ index, label }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="mono index">{index}</span>
      <span className="mono label">{label}</span>
    </div>
  );
}
