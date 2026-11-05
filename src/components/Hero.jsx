import { FireField, RamenBowl } from './CanvasBits.jsx';

const SPARKS = [
  { left: '-6%', bottom: '8%', size: 16, color: '#FFD323', dur: '4.4s', delay: '0s' },
  { left: '22%', bottom: '2%', size: 10, color: '#FFF4DC', dur: '5.2s', delay: '0.8s' },
  { left: '62%', bottom: '4%', size: 14, color: '#FFD323', dur: '4.8s', delay: '1.6s' },
  { left: '94%', bottom: '10%', size: 12, color: '#FFF4DC', dur: '5.6s', delay: '2.4s' },
];

export function Hero({ night }) {
  return (
    <section id="hero" className="hero">
      {night ? <div className="hero-night" /> : null}
      <div className="hero-burst" />
      <div className="hero-dots" />
      <div className="hero-embers">
        <FireField mode="embers" intensity={4} chili />
      </div>
      <div className="hero-wall">
        <FireField mode="wall" intensity={4} />
      </div>

      <div className="hero-inner">
        <div className="hero-tags">
          <span className="tag">TOKYO STREET RAMEN</span>
          <span className="tag tag-yellow">EST. 2026</span>
          <span className="tag tag-dark">OPEN 11:00–3:00</span>
        </div>

        <h1 className="hero-title">KARASHI RIOT</h1>

        <div className="hero-stage">
          <div className="hero-slogan-wrap">
            <div className="hero-slogan" data-fx="lift">
              辛さ、<br />暴走中。
            </div>
          </div>
          <div className="hero-shade" />
          <div className="hero-bowl-wrap">
            <div className="hero-dashed" />
            <div className="hero-bowl-ring">
              <div className="hero-bowl-turn">
                <RamenBowl variant="riot-red" seed={12} />
              </div>
            </div>
            {SPARKS.map((spark) => (
              <span
                key={`${spark.left}-${spark.delay}`}
                className="spark"
                style={{
                  left: spark.left,
                  bottom: spark.bottom,
                  width: spark.size,
                  height: spark.size,
                  background: spark.color,
                  animationDuration: `calc(${spark.dur} / var(--kr-speed, 1))`,
                  animationDelay: spark.delay,
                }}
              />
            ))}
            <span className="bolt" />
          </div>
        </div>

        <div className="hero-actions">
          <a className="btn-yellow" href="#menu">メニューを見る</a>
          <a className="btn-ghost" href="#heat">辛さを選ぶ →</a>
        </div>
        <p className="hero-lead">唐辛子を積んだ丼が、今日も街を走る。止める理由が見つからない。</p>
      </div>
    </section>
  );
}
