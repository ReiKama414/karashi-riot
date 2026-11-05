import { FireField } from './CanvasBits.jsx';

export function Story() {
  return (
    <section id="story" className="story">
      <div className="story-dots" />
      <div className="bolt-cross story-cross" data-fx="cross" />

      <div className="section-inner">
        <span className="kicker kicker-red">04 ／ BRAND STORY</span>
        <div className="story-grid">
          <div className="panel manifesto span-2" data-fx="panel">
            <p>辛さは、ただの味じゃない。体験だ。</p>
            <span>KARASHI RIOT — MANIFESTO</span>
          </div>

          <div className="panel kanji-panel" data-fx="panel">
            <div className="kanji-rays-wrap">
              <div className="kanji-rays" />
            </div>
            <div className="kanji-dots" />
            <div className="kanji-fire">
              <FireField mode="wall" intensity={5} chili />
            </div>
            <span className="kanji">辛</span>
          </div>

          <div className="panel panel-yellow" data-fx="panel">
            <span className="panel-title">深夜二時、<br />湯気の向こう側。</span>
            <p>東京の路地裏、屋台ひとつから始まった。誰も止めない辛さ、誰も真似しない配合。</p>
          </div>

          <div className="panel panel-ink" data-fx="panel">
            <span className="panel-title gold">唐辛子は、<br />合図だ。</span>
            <p>調味料じゃない。今日をもう一段上げるための、スタートの音。</p>
          </div>

          <div className="panel panel-cream span-2" data-fx="panel">
            <span className="panel-title punch">汗も、悲鳴も、全部トッピング。</span>
            <p>一杯目で驚き、二杯目で癖になる。完食した顔が、この店の看板です。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
