const MAIN =
  "M138.3,54.1 L145,76 L152.8,93.6 L159.1,103.1 L169.5,118.4 L187.5,116.1 L196.4,111.9 L211.5,116.1 L215.5,108.7 L222.3,91.6 L239.2,90.5 L240.7,85.4 L254.6,85.3 L252.2,95.8 L285.2,95.6 L285.7,114.1 L291.2,125.4 L287.2,143.1 L289.2,161.2 L298.2,172.1 L296.8,207.1 L303.5,204.4 L315.3,205.1 L332.2,200.7 L344.6,202.4 L347.4,211.6 L344.3,225.8 L349.1,239.6 L345.1,250.6 L347.4,260.7 L290.8,260.4 L289.5,353.9 L307.9,377.9 L325.6,396.3 L275.6,408.2 L209.8,404.1 L191,390 L80.7,391.3 L76.6,393.3 L60.4,380.1 L42.8,379.2 L26.5,384.2 L13.4,389.8 L10.9,371.3 L14.6,345.5 L24,318.6 L25.4,305.9 L34.3,279.4 L40.7,267.4 L56.4,248.2 L65.1,235.1 L67.9,213.3 L66.5,196.7 L58.4,186.2 L51.1,168.3 L44.5,150.7 L45.9,144.6 L54.3,133 L46,104.6 L40.5,84.9 L26.8,66.3 L29.4,60.6 L40.7,56.6 L48.5,57.2 L58.1,53.7 L138.3,54.1 Z";

const CABINDA = "M32.5,48.4 L25.6,51.5 L18.4,29.4 L29.3,16.7 L37.5,11.8 L47.7,21.8 L37.8,28 L33.4,35.6 L32.5,48.4 Z";

const pins = [
  { name: "Luanda", x: 54.2, y: 141.1 },
  { name: "Huíla", x: 61.2, y: 319.7 },
  { name: "Namibe", x: 24.8, y: 327.9 },
  { name: "Cunene", x: 122.2, y: 382.9 },
];

export function AngolaMap() {
  return (
    <figure className="rounded-3xl border border-line bg-mist p-5">
      <svg viewBox="0 0 360 420" role="img" aria-labelledby="map-title" className="mx-auto h-auto w-full max-w-xs">
        <title id="map-title">Mapa de Angola com Luanda, Huíla, Namibe e Cunene</title>
        <path d={MAIN} className="fill-paper stroke-brand-deep" strokeWidth="2" />
        <path d={CABINDA} className="fill-paper stroke-brand-deep" strokeWidth="2" />
        {pins.map((pin) => (
          <g key={pin.name}>
            <circle cx={pin.x} cy={pin.y} r="6" className="fill-brand stroke-ink" strokeWidth="1.5" />
          </g>
        ))}
      </svg>
      <figcaption className="mt-4 text-sm text-muted">
        Angola · Luanda, Huíla, Cunene, Namibe e outras províncias.
      </figcaption>
    </figure>
  );
}
