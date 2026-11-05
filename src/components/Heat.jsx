import { LEVELS } from '../data.js';
import { FireField, RamenBowl } from './CanvasBits.jsx';

export function Heat({ level, onPick }) {
  const current = LEVELS[level - 1];

  return (
    <section id="heat" className="heat">
      <div
        className="heat-glow"
        style={{
          background: `radial-gradient(circle at 50% 108%, ${current.color} 0%, rgba(0, 0, 0, 0) 62%)`,
        }}
      />
      {level === 5 ? (
        <div className="heat-max">
          <div className="heat-max-word">MAX<br />HEAT!</div>
        </div>
      ) : null}

      <div className="section-inner heat-inner">
        <div className="section-head">
          <span className="kicker">03 ／ SPICY LEVEL</span>
          <h2 className="display display-gold" data-fx="flyin-r">
            辛さは、<br />自分で決めろ。
          </h2>
        </div>

        <div className="heat-grid">
          <div className="heat-stage">
            <div className="heat-fire">
              <FireField mode="wall" intensity={level} />
            </div>
            <div className="heat-bowl" data-fx="bowl-spin">
              <RamenBowl variant="riot-red" seed={21} heat={level} />
            </div>
          </div>

          <div className="heat-list">
            {LEVELS.map((item, index) => {
              const n = index + 1;
              const active = n === level;
              return (
                <button
                  key={item.code}
                  type="button"
                  className={`heat-btn${n === 5 ? ' max' : ''}`}
                  aria-pressed={active}
                  onClick={() => onPick(n)}
                  style={{
                    background: active ? item.color : 'rgba(255,244,220,0.06)',
                    color: active ? (n >= 4 ? '#FFF4DC' : '#101010') : '#FFF4DC',
                  }}
                >
                  <span className="heat-btn-label">{item.label}</span>
                  <span className="heat-btn-code">{item.code}</span>
                </button>
              );
            })}

            <div className="heat-panel" style={{ boxShadow: `10px 10px 0 ${current.color}` }}>
              <div className="heat-panel-top">
                <span className="heat-level-name">LEVEL {level}　{current.name}</span>
                <span className="heat-gauge-label">HEAT {level * 20}%</span>
              </div>
              <div className="gauge">
                <div
                  className="gauge-fill"
                  style={{ width: `${level * 20}%`, background: current.color }}
                />
              </div>
              <p className="heat-desc">{current.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
