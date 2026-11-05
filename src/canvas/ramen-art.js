/* <ramen-bowl> — procedurally drawn top-down ramen bowl (canvas 2D). No external assets.
   Attributes: variant (riot-red | black-inferno | volcano-cheese | thunder-miso), seed, heat (1-5) */
(function () {
  const TAU = Math.PI * 2;

  function rngFrom(seed) {
    let a = (seed >>> 0) || 1;
    return function () {
      a += 0x6D2B79F5;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hex(c) {
    if (c[0] === '#') return [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
    const m = c.match(/-?\d+\.?\d*/g) || [0, 0, 0];
    return [+m[0], +m[1], +m[2]];
  }
  function mix(a, b, t) {
    const A = hex(a), B = hex(b);
    return 'rgb(' + Math.round(A[0] + (B[0] - A[0]) * t) + ',' + Math.round(A[1] + (B[1] - A[1]) * t) + ',' + Math.round(A[2] + (B[2] - A[2]) * t) + ')';
  }

  const V = {
    'riot-red': {
      bowl: ['#FBF6EA', '#CDBB9C'], rim: '#F21820', rimInk: '#101010',
      broth: ['#FF4022', '#C6110F'], sheen: 'rgba(255,170,90,0.6)',
      oil: 'rgba(255,186,62,0.7)', oilCount: 58,
      chiliSlices: 10, flakes: 64, nori: true, egg: true, negi: 30, sesame: 26,
      chashu: 2, cheese: false, corn: 0, pork: 0, butter: false
    },
    'black-inferno': {
      bowl: ['#F2ECE0', '#BFAF95'], rim: '#101010', rimInk: '#FFD323',
      broth: ['#3A2E25', '#100C0A'], sheen: 'rgba(230,110,40,0.45)',
      oil: 'rgba(62,46,34,0.85)', oilCount: 70,
      chiliSlices: 6, flakes: 44, nori: true, egg: true, negi: 26, sesame: 30,
      chashu: 2, cheese: false, corn: 0, pork: 26, butter: false
    },
    'volcano-cheese': {
      bowl: ['#FDF7E6', '#D3C09A'], rim: '#FFD323', rimInk: '#101010',
      broth: ['#FB4419', '#B92110'], sheen: 'rgba(255,205,90,0.55)',
      oil: 'rgba(255,196,70,0.7)', oilCount: 42,
      chiliSlices: 7, flakes: 48, nori: false, egg: true, negi: 22, sesame: 14,
      chashu: 1, cheese: true, corn: 0, pork: 0, butter: false
    },
    'thunder-miso': {
      bowl: ['#FAF3E3', '#CBB994'], rim: '#C8901A', rimInk: '#101010',
      broth: ['#EDAF42', '#A96C1D'], sheen: 'rgba(255,232,160,0.5)',
      oil: 'rgba(245,140,40,0.62)', oilCount: 38,
      chiliSlices: 5, flakes: 38, nori: true, egg: true, negi: 26, sesame: 22,
      chashu: 1, cheese: false, corn: 22, pork: 34, butter: true
    }
  };
  const HEAT = ['#F2A21A', '#F2761A', '#EF2A18', '#D4110F', '#7E0509'];

  function noodleNest(ctx, cx, cy, R, rng, strands) {
    for (let i = 0; i < strands; i++) {
      const a0 = rng() * TAU;
      const sweep = 1.4 + rng() * 3.2;
      const r0 = R * (0.08 + rng() * 0.56);
      const amp = R * (0.04 + rng() * 0.12);
      const freq = 2 + rng() * 5;
      const ox = (rng() - 0.5) * R * 0.3, oy = (rng() - 0.5) * R * 0.3 - R * 0.06;
      const pts = [];
      for (let t = 0; t <= 1.0001; t += 0.06) {
        const a = a0 + sweep * t;
        const r = r0 + amp * Math.sin(t * freq * Math.PI);
        pts.push([cx + ox + Math.cos(a) * r, cy + oy + Math.sin(a) * r * 0.94]);
      }
      const lw = R * (0.034 + rng() * 0.026);
      const path = () => {
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        for (let k = 1; k < pts.length - 1; k++) {
          const mx = (pts[k][0] + pts[k + 1][0]) / 2, my = (pts[k][1] + pts[k + 1][1]) / 2;
          ctx.quadraticCurveTo(pts[k][0], pts[k][1], mx, my);
        }
      };
      ctx.lineCap = 'round';
      ctx.save();
      ctx.translate(lw * 0.5, lw * 0.6);
      ctx.strokeStyle = 'rgba(96,52,12,0.45)'; ctx.lineWidth = lw * 1.05; path(); ctx.stroke();
      ctx.restore();
      ctx.strokeStyle = mix('#FBEAB8', '#D9AE5E', rng() * 0.6); ctx.lineWidth = lw; path(); ctx.stroke();
      ctx.save();
      ctx.translate(-lw * 0.22, -lw * 0.3);
      ctx.strokeStyle = 'rgba(255,246,214,0.55)'; ctx.lineWidth = lw * 0.3; path(); ctx.stroke();
      ctx.restore();
    }
  }

  function chashu(ctx, x, y, r, rot, rng, dark) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = r * 0.35; ctx.shadowOffsetY = r * 0.12;
    ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.86, 0, 0, TAU);
    ctx.fillStyle = dark ? '#4A2B1A' : '#6B3A20'; ctx.fill();
    ctx.shadowColor = 'transparent';
    const g = ctx.createRadialGradient(-r * 0.3, -r * 0.3, r * 0.1, 0, 0, r);
    g.addColorStop(0, dark ? '#B4724A' : '#D08B58');
    g.addColorStop(0.65, dark ? '#8A4E2C' : '#B06A38');
    g.addColorStop(1, dark ? '#5B3119' : '#7E4522');
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.88, r * 0.74, 0, 0, TAU); ctx.fillStyle = g; ctx.fill();
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      const yy = -r * 0.34 + i * r * 0.32 + (rng() - 0.5) * r * 0.1;
      ctx.moveTo(-r * 0.78, yy);
      ctx.quadraticCurveTo(0, yy + (rng() - 0.5) * r * 0.24, r * 0.78, yy);
      ctx.strokeStyle = 'rgba(255,238,214,0.5)'; ctx.lineWidth = r * (0.06 + rng() * 0.05); ctx.stroke();
    }
    ctx.beginPath(); ctx.ellipse(-r * 0.25, -r * 0.3, r * 0.3, r * 0.16, -0.4, 0, TAU);
    ctx.fillStyle = 'rgba(255,255,255,0.14)'; ctx.fill();
    ctx.restore();
  }

  function egg(ctx, x, y, r, rot, negiColor) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = r * 0.4; ctx.shadowOffsetY = r * 0.14;
    const w = ctx.createRadialGradient(-r * 0.3, -r * 0.35, r * 0.1, 0, 0, r);
    w.addColorStop(0, '#FFFDF6'); w.addColorStop(0.7, '#F6EEDC'); w.addColorStop(1, '#DFD0B4');
    ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.78, 0, 0, TAU); ctx.fillStyle = w; ctx.fill();
    ctx.shadowColor = 'transparent';
    const yk = ctx.createRadialGradient(-r * 0.12, -r * 0.14, r * 0.05, 0, 0, r * 0.56);
    yk.addColorStop(0, '#FFCF5C'); yk.addColorStop(0.55, '#F59512'); yk.addColorStop(1, '#D75A08');
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.56, r * 0.44, 0, 0, TAU); ctx.fillStyle = yk; ctx.fill();
    ctx.beginPath(); ctx.ellipse(-r * 0.18, -r * 0.16, r * 0.16, r * 0.09, -0.5, 0, TAU);
    ctx.fillStyle = 'rgba(255,255,255,0.45)'; ctx.fill();
    ctx.restore();
  }

  function nori(ctx, x, y, w, h, rot) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    const g = ctx.createLinearGradient(-w / 2, -h / 2, w / 2, h / 2);
    g.addColorStop(0, '#20302C'); g.addColorStop(0.5, '#0E1714'); g.addColorStop(1, '#27362F');
    ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = w * 0.2; ctx.shadowOffsetY = w * 0.06;
    ctx.beginPath(); ctx.rect(-w / 2, -h / 2, w, h); ctx.fillStyle = g; ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = w * 0.02;
    for (let i = 1; i < 5; i++) {
      ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2 + (h / 5) * i); ctx.lineTo(w / 2, -h / 2 + (h / 5) * i); ctx.stroke();
    }
    ctx.restore();
  }

  function chiliSlice(ctx, x, y, r, rot, rng) {
    ctx.save();
    ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath(); ctx.ellipse(0, 0, r, r * 0.74, 0, 0, TAU);
    const g = ctx.createRadialGradient(-r * 0.2, -r * 0.2, r * 0.1, 0, 0, r);
    g.addColorStop(0, '#FF6A3C'); g.addColorStop(0.6, '#E0140F'); g.addColorStop(1, '#8E0509');
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.ellipse(0, 0, r * 0.6, r * 0.42, 0, 0, TAU);
    ctx.fillStyle = 'rgba(255,240,205,0.85)'; ctx.fill();
    for (let i = 0; i < 4; i++) {
      const a = rng() * TAU, rr = r * 0.32 * rng();
      ctx.beginPath(); ctx.ellipse(Math.cos(a) * rr, Math.sin(a) * rr, r * 0.1, r * 0.08, a, 0, TAU);
      ctx.fillStyle = '#EFD08A'; ctx.fill();
    }
    ctx.restore();
  }

  function draw(cv, variant, seed, heat) {
    const box = cv.getBoundingClientRect();
    const w = Math.max(60, Math.round(box.width)), h = Math.max(60, Math.round(box.height));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    const ctx = cv.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const v = V[variant] || V['riot-red'];
    const rng = rngFrom((seed | 0) || 7);
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) / 2 * 0.99;
    const hv = Math.max(1, Math.min(5, heat || 0));
    const heatMix = heat ? (hv - 1) / 4 : 0;

    /* bowl ceramic */
    const bg = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.35, R * 0.2, cx, cy, R);
    bg.addColorStop(0, v.bowl[0]); bg.addColorStop(1, v.bowl[1]);
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, TAU); ctx.fillStyle = bg; ctx.fill();
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.93, 0, TAU);
    ctx.strokeStyle = v.rim; ctx.lineWidth = R * 0.055; ctx.stroke();
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.875, 0, TAU);
    ctx.strokeStyle = v.rimInk; ctx.lineWidth = R * 0.02; ctx.stroke();

    /* broth */
    const BR = R * 0.845;
    let b0 = v.broth[0], b1 = v.broth[1];
    if (heat) { b0 = mix(HEAT[hv - 1], '#FFE08A', 0.26); b1 = mix(HEAT[hv - 1], '#000000', 0.24 + heatMix * 0.42); }
    const sg = ctx.createRadialGradient(cx - BR * 0.25, cy - BR * 0.3, BR * 0.05, cx, cy, BR);
    sg.addColorStop(0, b0); sg.addColorStop(0.72, b1);
    sg.addColorStop(1, mix(b1, '#000000', 0.45));
    ctx.save();
    ctx.beginPath(); ctx.arc(cx, cy, BR, 0, TAU); ctx.clip();
    ctx.fillStyle = sg; ctx.fillRect(cx - BR, cy - BR, BR * 2, BR * 2);

    /* broth swirls */
    for (let i = 0; i < 7; i++) {
      ctx.beginPath();
      const rr = BR * (0.3 + rng() * 0.6), a = rng() * TAU;
      ctx.arc(cx + Math.cos(a) * BR * 0.12, cy + Math.sin(a) * BR * 0.12, rr, a, a + 1.6 + rng());
      ctx.strokeStyle = v.sheen; ctx.lineWidth = BR * (0.02 + rng() * 0.05);
      ctx.globalAlpha = 0.25 + rng() * 0.3; ctx.stroke(); ctx.globalAlpha = 1;
    }

    noodleNest(ctx, cx, cy, BR, rng, 64);

    /* chili oil droplets */
    for (let i = 0; i < v.oilCount; i++) {
      const a = rng() * TAU, rr = Math.sqrt(rng()) * BR * 0.95;
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr;
      const dr = BR * (0.01 + rng() * 0.038);
      const og = ctx.createRadialGradient(x - dr * 0.3, y - dr * 0.3, dr * 0.1, x, y, dr);
      og.addColorStop(0, 'rgba(255,255,255,0.5)');
      og.addColorStop(0.35, v.oil);
      og.addColorStop(1, 'rgba(120,30,0,0.25)');
      ctx.beginPath(); ctx.arc(x, y, dr, 0, TAU); ctx.fillStyle = og; ctx.fill();
    }

    /* flakes */
    for (let i = 0; i < v.flakes; i++) {
      const a = rng() * TAU, rr = Math.sqrt(rng()) * BR * 0.92;
      ctx.save();
      ctx.translate(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      ctx.rotate(rng() * TAU);
      ctx.beginPath(); ctx.ellipse(0, 0, BR * (0.012 + rng() * 0.016), BR * 0.008, 0, 0, TAU);
      ctx.fillStyle = rng() > 0.4 ? '#C7140C' : '#F26A15'; ctx.fill();
      ctx.restore();
    }

    if (v.pork) {
      for (let i = 0; i < v.pork; i++) {
        const a = 1.2 + rng() * 2.2, rr = BR * (0.2 + rng() * 0.55);
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, BR * (0.02 + rng() * 0.025), BR * (0.016 + rng() * 0.02), rng() * TAU, 0, TAU);
        ctx.fillStyle = mix('#8A4A24', '#3E2011', rng()); ctx.fill();
      }
    }
    if (v.corn) {
      for (let i = 0; i < v.corn; i++) {
        const a = -0.2 + rng() * 1.6, rr = BR * (0.3 + rng() * 0.5);
        ctx.save();
        ctx.translate(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
        ctx.rotate(rng() * TAU);
        const cg = ctx.createLinearGradient(0, -BR * 0.03, 0, BR * 0.03);
        cg.addColorStop(0, '#FFE07A'); cg.addColorStop(1, '#E8A417');
        ctx.beginPath(); ctx.ellipse(0, 0, BR * 0.035, BR * 0.026, 0, 0, TAU); ctx.fillStyle = cg; ctx.fill();
        ctx.restore();
      }
    }

    /* cheese pour */
    if (v.cheese) {
      ctx.save();
      ctx.translate(cx + BR * 0.05, cy + BR * 0.02);
      ctx.beginPath();
      const n = 26, rad = BR * 0.56;
      for (let i = 0; i <= n; i++) {
        const a = (i / n) * TAU;
        const r = rad * (0.78 + Math.sin(a * 3 + 1) * 0.12 + rng() * 0.08);
        const x = Math.cos(a) * r, y = Math.sin(a) * r * 0.92;
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.closePath();
      const cg = ctx.createRadialGradient(-rad * 0.3, -rad * 0.35, rad * 0.1, 0, 0, rad);
      cg.addColorStop(0, '#FFE9A6'); cg.addColorStop(0.6, '#FFC64A'); cg.addColorStop(1, '#E98A12');
      ctx.shadowColor = 'rgba(120,40,0,0.5)'; ctx.shadowBlur = rad * 0.3; ctx.shadowOffsetY = rad * 0.08;
      ctx.fillStyle = cg; ctx.fill();
      ctx.shadowColor = 'transparent';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        const a = rng() * TAU, rr = rad * 0.45 * rng();
        ctx.ellipse(Math.cos(a) * rr, Math.sin(a) * rr, rad * (0.05 + rng() * 0.07), rad * (0.04 + rng() * 0.05), rng() * TAU, 0, TAU);
        ctx.fillStyle = 'rgba(255,255,255,0.28)'; ctx.fill();
      }
      ctx.beginPath(); ctx.ellipse(-rad * 0.22, -rad * 0.3, rad * 0.3, rad * 0.12, -0.5, 0, TAU);
      ctx.fillStyle = 'rgba(255,255,255,0.4)'; ctx.fill();
      ctx.restore();
    }

    if (v.butter) {
      ctx.save();
      ctx.translate(cx - BR * 0.05, cy - BR * 0.44);
      ctx.rotate(-0.2);
      const bgd = ctx.createLinearGradient(-BR * 0.14, -BR * 0.1, BR * 0.14, BR * 0.1);
      bgd.addColorStop(0, '#FFF3C4'); bgd.addColorStop(1, '#F3C947');
      ctx.shadowColor = 'rgba(80,30,0,0.4)'; ctx.shadowBlur = BR * 0.1;
      ctx.fillStyle = bgd; ctx.fillRect(-BR * 0.13, -BR * 0.09, BR * 0.26, BR * 0.18);
      ctx.restore();
    }

    /* toppings */
    const tR = BR * 0.3;
    chashu(ctx, cx + Math.cos(-0.75) * BR * 0.44, cy + Math.sin(-0.75) * BR * 0.44, tR, -0.5, rng, variant === 'black-inferno');
    if (v.chashu > 1) chashu(ctx, cx + Math.cos(-1.55) * BR * 0.5, cy + Math.sin(-1.55) * BR * 0.46, tR * 0.9, 0.6, rng, variant === 'black-inferno');
    if (v.nori) nori(ctx, cx + Math.cos(3.5) * BR * 0.58, cy + Math.sin(3.5) * BR * 0.5, BR * 0.42, BR * 0.5, 0.35);
    if (v.egg) egg(ctx, cx + Math.cos(2.25) * BR * 0.46, cy + Math.sin(2.25) * BR * 0.44, BR * 0.26, 0.3, v.negi);

    for (let i = 0; i < v.negi; i++) {
      const a = 0.6 + rng() * 2.2, rr = BR * (0.25 + rng() * 0.62);
      const x = cx + Math.cos(a) * rr, y = cy + Math.sin(a) * rr, r = BR * (0.022 + rng() * 0.018);
      ctx.beginPath(); ctx.arc(x, y, r, 0, TAU);
      ctx.fillStyle = mix('#9DC24A', '#5E8A22', rng()); ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, r * 0.45, 0, TAU);
      ctx.fillStyle = 'rgba(245,250,225,0.9)'; ctx.fill();
    }
    for (let i = 0; i < v.chiliSlices; i++) {
      const a = rng() * TAU, rr = BR * (0.3 + rng() * 0.55);
      chiliSlice(ctx, cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, BR * (0.062 + rng() * 0.042), rng() * TAU, rng);
    }
    for (let i = 0; i < v.sesame; i++) {
      const a = rng() * TAU, rr = Math.sqrt(rng()) * BR * 0.9;
      ctx.save();
      ctx.translate(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
      ctx.rotate(rng() * TAU);
      ctx.beginPath(); ctx.ellipse(0, 0, BR * 0.016, BR * 0.011, 0, 0, TAU);
      ctx.fillStyle = rng() > 0.5 ? '#F6EBD2' : '#3B2A1A'; ctx.fill();
      ctx.restore();
    }

    /* broth edge shade + specular */
    const vg = ctx.createRadialGradient(cx, cy, BR * 0.72, cx, cy, BR);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,0.3)');
    ctx.fillStyle = vg; ctx.fillRect(cx - BR, cy - BR, BR * 2, BR * 2);
    ctx.beginPath();
    ctx.ellipse(cx - BR * 0.34, cy - BR * 0.5, BR * 0.36, BR * 0.13, -0.5, 0, TAU);
    ctx.fillStyle = 'rgba(255,255,255,0.1)'; ctx.fill();
    ctx.restore();

    /* rim highlight over everything */
    ctx.beginPath(); ctx.arc(cx, cy, R * 0.955, Math.PI * 1.05, Math.PI * 1.55);
    ctx.strokeStyle = 'rgba(255,255,255,0.45)'; ctx.lineWidth = R * 0.03; ctx.stroke();
  }

  class RamenBowl extends HTMLElement {
    static get observedAttributes() { return ['variant', 'seed', 'heat']; }
    connectedCallback() {
      this.style.display = 'block';
      if (!this.style.width) this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
      this._canvas();
      if (window.ResizeObserver && !this._ro) {
        this._ro = new ResizeObserver(() => this.schedule());
      }
      if (this._ro) { try { this._ro.observe(this); } catch (e) {} }
      this.schedule();
    }
    disconnectedCallback() { if (this._ro) this._ro.unobserve(this); cancelAnimationFrame(this._raf); this._raf = 0; }
    attributeChangedCallback() { this.schedule(); }
    _canvas() {
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      let cv = root.querySelector('canvas');
      if (!cv) {
        cv = document.createElement('canvas');
        cv.style.cssText = 'display:block;width:100%;height:100%';
        root.appendChild(cv);
      }
      this._cv = cv;
      return cv;
    }
    schedule() {
      cancelAnimationFrame(this._raf);
      this._tries = 0;
      const step = () => {
        if (++this._tries > 240) return;
        if (!this.isConnected) { this._raf = requestAnimationFrame(step); return; }
        const b = this.getBoundingClientRect();
        if (b.width < 8 || b.height < 8) { this._raf = requestAnimationFrame(step); return; }
        const cv = this._canvas();
        draw(cv, this.getAttribute('variant') || 'riot-red',
          parseInt(this.getAttribute('seed') || '7', 10),
          parseInt(this.getAttribute('heat') || '0', 10));
      };
      this._raf = requestAnimationFrame(step);
    }
  }
  if (!window.customElements.get('ramen-bowl')) window.customElements.define('ramen-bowl', RamenBowl);
})();
