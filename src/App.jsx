import { useRef, useState } from 'react';
import { CONFIG, RAMEN } from './data.js';
import { useScrollFx } from './hooks/useScrollFx.js';
import { Nav } from './components/Nav.jsx';
import { Hero } from './components/Hero.jsx';
import { Marquee } from './components/Marquee.jsx';
import { Menu } from './components/Menu.jsx';
import { Burst } from './components/Burst.jsx';
import { Heat } from './components/Heat.jsx';
import { Story } from './components/Story.jsx';
import { Footer } from './components/Footer.jsx';

function initialSelection() {
  const index = RAMEN.findIndex((item) => item.name === CONFIG.featuredRamen);
  return index < 0 ? 0 : index;
}

function initialLevel() {
  const n = Number(CONFIG.spiceStart);
  return n >= 1 && n <= 5 ? Math.round(n) : 4;
}

export default function App() {
  const rootRef = useRef(null);
  const [selected, setSelected] = useState(initialSelection);
  const [level, setLevel] = useState(initialLevel);
  useScrollFx(rootRef, CONFIG.motionSpeed);

  return (
    <div
      ref={rootRef}
      className="page"
      style={{ '--kr-speed': String(CONFIG.motionSpeed) }}
    >
      <Nav />
      <Hero night={CONFIG.nightRiot} />
      <Marquee />
      <Menu selected={selected} onSelect={setSelected} />
      <Burst />
      <Heat level={level} onPick={setLevel} />
      <Story />
      <Marquee tone="red" />
      <Footer />
    </div>
  );
}
