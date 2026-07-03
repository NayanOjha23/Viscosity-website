interface GroupRowProps {
  id: string;
  name: string;
  specs: string[];
  grades: string;
  group: number;
}

export default function GroupRow({ id, name, specs, grades, group }: GroupRowProps) {
  return (
    <article className="group-row reveal" data-group={group}>
      <div className="group-row__id mono">{id}</div>
      <div className="group-row__name">{name}</div>
      <div className="group-row__specs mono">
        {specs.map((s, i) => <span key={i}>{s}</span>)}
      </div>
      <div className="group-row__grades mono">{grades}</div>
    </article>
  );
}
