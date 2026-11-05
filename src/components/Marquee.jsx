const YELLOW = [
  { text: '辛さ、暴走中。' },
  { text: '★', accent: true },
  { text: 'KARASHI RIOT' },
  { text: '★', accent: true },
  { text: '激辛注意' },
  { text: '★', accent: true },
  { text: 'SPICE RIOT SINCE 2026' },
  { text: '★', accent: true },
];

const RED = [
  { text: 'SPICE RIOT' },
  { text: '◆', accent: true },
  { text: '辛さ、暴走中。' },
  { text: '◆', accent: true },
  { text: '完食で証明書' },
  { text: '◆', accent: true },
  { text: 'KARASHI RIOT TOKYO' },
  { text: '◆', accent: true },
];

export function Marquee({ tone = 'yellow' }) {
  const items = tone === 'red' ? RED : YELLOW;
  return (
    <div className={`marquee ${tone}`}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {items.map((item, index) => (
              <span key={`${copy}-${index}`} className={item.accent ? 'accent' : undefined}>
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
