import { useEffect, useRef } from 'react';
import '../canvas/ramen-art.js';
import '../canvas/fire-field.js';

export function RamenBowl({ variant = 'riot-red', seed = 7, heat = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute('variant', variant);
    el.setAttribute('seed', String(seed));
    el.setAttribute('heat', String(heat));
  }, [variant, seed, heat]);

  return <ramen-bowl ref={ref} />;
}

export function FireField({ mode = 'wall', intensity = 3, chili = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.setAttribute('mode', mode);
    el.setAttribute('intensity', String(intensity));
    if (chili) el.setAttribute('chili', '1');
    else el.removeAttribute('chili');
  }, [mode, intensity, chili]);

  return <fire-field ref={ref} />;
}
