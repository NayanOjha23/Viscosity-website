interface CardProps {
  num: string;
  title: string;
  body: string;
  tag: string;
}

export default function Card({ num, title, body, tag }: CardProps) {
  return (
    <article className="card reveal">
      <div className="card__num mono">{num}</div>
      <h3>{title}</h3>
      <p>{body}</p>
      <div className="card__tag mono">{tag}</div>
    </article>
  );
}
