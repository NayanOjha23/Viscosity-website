const ITEMS = [
  "SN 70", "SN 150", "SN 500", "BS 150",
  "N 70", "N 150", "N 500", "N 600",
  "GR III 4 cSt", "GR III 6 cSt", "GR III 8 cSt",
  "4 cSt PAO", "6 cSt PAO", "8 cSt PAO",
  "RPO", "TOFA ESTERS", "NAPHTHENIC PALE OILS",
];

export default function Ticker() {
  const all = [...ITEMS, ...ITEMS];
  return (
    <div className="ticker mono" id="ticker">
      <div className="ticker__track">
        {all.map((item, i) => (
          <span key={i}>{item}<i>·</i></span>
        ))}
      </div>
    </div>
  );
}
