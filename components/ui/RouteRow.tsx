interface RouteRowProps {
  from: string;
  to: string;
  meta: string;
}

export default function RouteRow({ from, to, meta }: RouteRowProps) {
  return (
    <div className="route reveal">
      <span>{from}</span>
      <i>⟶</i>
      <span>{to}</span>
      <em>{meta}</em>
    </div>
  );
}
