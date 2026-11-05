import { RAMEN, glowFor } from '../data.js';
import { FireField, RamenBowl } from './CanvasBits.jsx';

function Pips({ filled, label }) {
  return (
    <div className="pips">
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={index < filled ? 'pip on' : 'pip'} />
      ))}
      <span className="pip-label">{label}</span>
    </div>
  );
}

export function Menu({ selected, onSelect }) {
  const active = RAMEN[selected];
  const glow = glowFor(active);

  return (
    <section id="menu" className="menu">
      <div
        className="menu-rays"
        style={{
          background: `repeating-conic-gradient(from 0deg, ${glow} 0deg 4deg, rgba(0, 0, 0, 0) 4deg 16deg)`,
        }}
      />
      <div className="menu-dots" />
      <div className="bolt-cross menu-cross" data-fx="cross" />

      <div className="section-inner">
        <div className="section-head">
          <span className="kicker">02 ／ RAMEN MENU</span>
          <h2 className="display" data-fx="flyin-l">
            四杯、<br />全部が全力。
          </h2>
          <p className="lede" data-fx="flyin-r">
            辛さの方向が、一杯ごとに違う。赤、黒、チーズ、味噌。全品 大盛り無料／替え玉 ¥150。
          </p>
        </div>

        <div className="menu-grid">
          {RAMEN.map((item, index) => {
            const isOn = index === selected;
            return (
              <div key={item.name} className="card-slot" data-fx="card">
                <button
                  type="button"
                  className={`card tone-${item.tone}${isOn ? ' is-up' : ''}`}
                  onClick={() => onSelect(index)}
                  aria-pressed={isOn}
                >
                  {isOn ? <span className="card-badge">SELECTED</span> : null}
                  <div className="card-art" style={{ background: item.artBg }}>
                    <div
                      className={`card-rays${item.reverse ? ' reverse' : ''}`}
                      style={{ background: item.rays, '--spin': item.spin }}
                    />
                    <div className={`bowl-layer${isOn ? ' swap' : ''}`}>
                      <RamenBowl variant={item.variant} seed={item.seed} />
                    </div>
                    <div className="card-fx">
                      <FireField mode="embers" intensity={item.intensity} />
                    </div>
                  </div>
                  <div className="card-head">
                    <span className="card-name">{item.name}</span>
                    <span className="card-price">{item.price}</span>
                  </div>
                  <span className="card-jp">{item.jp}</span>
                  <Pips filled={item.heat} label={item.heatLabel} />
                  <p className="card-blurb">{item.blurb}</p>
                </button>
              </div>
            );
          })}
        </div>

        <div className="picked">
          <div className="picked-copy">
            <span className="picked-kicker">NOW SELECTED</span>
            <span className="picked-name">{active.name}</span>
            <span className="picked-meta">{active.jp}　／　{active.price}</span>
          </div>
          <a className="btn-dark" href="#heat">辛さを決める →</a>
        </div>
      </div>
    </section>
  );
}
