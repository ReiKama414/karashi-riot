/* <fire-field> — always-on canvas particle field: flames, embers, drifting chilies, steam.
   Attributes: mode (wall | embers | steam), intensity (1-5), chili ("1" to add drifting chilies) */
(function () {
  const TAU = Math.PI * 2;
  const rnd = (a, b) => a + Math.random() * (b - a);

  class FireField extends HTMLElement {
    static get observedAttributes() { return ['intensity', 'mode', 'chili']; }
    connectedCallback() {
      this.style.display = 'block';
      if (!this.style.width) this.style.width = '100%';
      if (!this.style.height) this.style.height = '100%';
      this.style.pointerEvents = 'none';
      this._canvas();
      if (!this._flames) { this._flames = []; this._embers = []; this._chilies = []; }
      this._resize();
      if (window.ResizeObserver && !this._ro) this._ro = new ResizeObserver(() => this._resize());
      if (this._ro) { try { this._ro.observe(this); } catch (e) {} }
      if (window.IntersectionObserver && !this._io) {
        this._io = new IntersectionObserver(e => { this._vis = e[0].isIntersecting; }, { rootMargin: '120px' });
      }
      if (this._io) { try { this._io.observe(this); } catch (e) {} }
      this._vis = true;
      this.start();
    }
    disconnectedCallback() {
      cancelAnimationFrame(this._raf);
      this._raf = null;
      if (this._ro) this._ro.unobserve(this);
      if (this._io) this._io.unobserve(this);
    }
    attributeChangedCallback() { this._seed(); }
    _canvas() {
      const root = this.shadowRoot || this.attachShadow({ mode: 'open' });
      let cv = root.querySelector('canvas');
      if (!cv) {
        cv = document.createElement('canvas');
        cv.style.cssText = 'display:block;width:100%;height:100%';
        root.appendChild(cv);
      }
      this._cv = cv; this._ctx = cv.getContext('2d');
      return cv;
    }
    get lvl() { const n = parseInt(this.getAttribute('intensity') || '3', 10); return Math.max(1, Math.min(5, n || 3)); }
    get mode() { return this.getAttribute('mode') || 'wall'; }

    _resize() {
      if (!this.isConnected) return;
      this._canvas();
      const b = this.getBoundingClientRect();
      if (b.width < 8 || b.height < 8) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      this._w = Math.round(b.width); this._h = Math.round(b.height);
      this._cv.width = Math.round(this._w * dpr); this._cv.height = Math.round(this._h * dpr);
      this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      this._seed();
    }
    _seed() {
      if (!this._cv || !this._w) return;
      const w = this._w, h = this._h, L = this.lvl, m = this.mode;
      const nF = m === 'wall' ? Math.round(14 + L * 8) : (m === 'steam' ? Math.round(4 + L * 2) : 0);
      const nE = m === 'steam' ? 0 : Math.round(14 + L * 12);
      const nC = this.getAttribute('chili') === '1' ? Math.round(3 + L) : 0;
      this._flames = Array.from({ length: nF }, () => this._mkFlame(w, h, true));
      this._embers = Array.from({ length: nE }, () => this._mkEmber(w, h, true));
      this._chilies = Array.from({ length: nC }, () => this._mkChili(w, h, true));
    }
    _mkFlame(w, h, init) {
      const L = this.lvl, steam = this.mode === 'steam';
      const big = Math.max(w * 0.22, h * 0.5);
      return {
        x: rnd(-0.05, 1.05) * w,
        y: init ? rnd(0.3, 1.05) * h : h + rnd(0.02, 0.12) * h,
        r: rnd(0.16, 0.42) * big * (steam ? 0.6 : 1) * (0.62 + L * 0.1),
        vy: -rnd(0.6, 1.7) * (steam ? 0.4 : 1) * (0.6 + L * 0.18),
        sway: rnd(0.4, 1.8), ph: rnd(0, TAU), life: init ? rnd(0.2, 1) : 1,
        fade: steam ? rnd(0.0012, 0.0026) : rnd(0.0006, 0.0017)
      };
    }
    _mkEmber(w, h, init) {
      const L = this.lvl;
      return {
        x: rnd(0, 1) * w, y: init ? rnd(0, 1) * h : h + 10,
        r: rnd(1, 2.8) + L * 0.18,
        vy: -rnd(0.4, 1.5) * (0.6 + L * 0.14), sway: rnd(0.5, 2.2), ph: rnd(0, TAU),
        life: rnd(0.3, 1), fade: rnd(0.0016, 0.005), warm: Math.random() > 0.45
      };
    }
    _mkChili(w, h, init) {
      const L = this.lvl, dir = Math.random() > 0.5 ? 1 : -1;
      return {
        x: init ? rnd(0, 1) * w : (dir > 0 ? -60 : w + 60),
        y: rnd(0.05, 0.95) * h,
        s: rnd(0.5, 1.15) * Math.min(w, h) * 0.06,
        vx: dir * rnd(0.6, 2.2) * (0.6 + L * 0.12),
        vy: rnd(-0.35, 0.35), rot: rnd(0, TAU), vr: rnd(-0.03, 0.03) * (1 + L * 0.2)
      };
    }
    start() {
      if (this._raf) return;
      let last = performance.now();
      const loop = now => {
        this._raf = requestAnimationFrame(loop);
        const dt = Math.min(2.6, (now - last) / 16.67); last = now;
        if (!this._chk || now - this._chk > 400) {
          this._chk = now;
          const b = this.getBoundingClientRect();
          if (!this._cv || !this._cv.isConnected || !this._w ||
              Math.abs(b.width - this._w) > 2 || Math.abs(b.height - this._h) > 2) this._resize();
        }
        if (!this._vis || !this._w) return;
        this._step(dt); this._paint();
      };
      this._raf = requestAnimationFrame(loop);
    }
    _step(dt) {
      const w = this._w, h = this._h;
      this._flames.forEach((p, i) => {
        p.y += p.vy * dt * 2.2; p.ph += 0.055 * dt; p.life -= p.fade * dt * 16;
        p.x += Math.sin(p.ph) * p.sway * dt * 0.7;
        if (p.life <= 0 || p.y < -p.r * 2) this._flames[i] = this._mkFlame(w, h, false);
      });
      this._embers.forEach((p, i) => {
        p.y += p.vy * dt * 2.4; p.ph += 0.05 * dt; p.life -= p.fade * dt * 16;
        p.x += Math.sin(p.ph) * p.sway * dt;
        if (p.life <= 0 || p.y < -8) this._embers[i] = this._mkEmber(w, h, false);
      });
      this._chilies.forEach((p, i) => {
        p.x += p.vx * dt * 1.6; p.y += p.vy * dt; p.rot += p.vr * dt;
        if (p.x < -90 || p.x > w + 90) this._chilies[i] = this._mkChili(w, h, false);
      });
    }
    _paint() {
      const ctx = this._ctx, w = this._w, h = this._h, steam = this.mode === 'steam';
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      if (this.mode === 'wall') {
        const base = ctx.createLinearGradient(0, h, 0, h - h * (0.18 + this.lvl * 0.05));
        base.addColorStop(0, 'rgba(255,150,30,0.5)');
        base.addColorStop(0.45, 'rgba(230,60,16,0.22)');
        base.addColorStop(1, 'rgba(180,20,10,0)');
        ctx.fillStyle = base; ctx.fillRect(0, h - h * 0.5, w, h * 0.5);
      }
      this._flames.forEach(p => {
        const flick = 0.82 + 0.18 * Math.sin(p.ph * 3.1);
        const lf = Math.max(0, Math.min(1, p.life));
        ctx.save();
        ctx.translate(p.x, p.y);
        if (steam) {
          const a = 0.12 * flick * Math.min(1, lf * 1.9);
          const pr = p.r * (0.34 + lf * 0.78);
          ctx.rotate(Math.sin(p.ph) * 0.12);
          ctx.scale(1, 2.1);
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, pr);
          g.addColorStop(0, 'rgba(255,250,238,' + a + ')');
          g.addColorStop(0.55, 'rgba(255,246,226,' + a * 0.3 + ')');
          g.addColorStop(1, 'rgba(255,246,226,0)');
          ctx.beginPath(); ctx.arc(0, -pr * 0.3, pr, 0, TAU); ctx.fillStyle = g; ctx.fill();
          ctx.restore();
          return;
        }
        /* flame tongue: tapered bezier, bright core inside */
        const wgt = p.r * (0.4 + lf * 0.62) * flick;
        const hgt = p.r * (1.7 + lf * 2.5) * (0.85 + 0.15 * Math.sin(p.ph * 2.3));
        const lean = Math.sin(p.ph) * wgt * 0.55;
        ctx.rotate(Math.sin(p.ph * 0.7) * 0.1);
        const tongue = (sw, sh, dx) => {
          ctx.beginPath();
          ctx.moveTo(-sw, 0);
          ctx.bezierCurveTo(-sw * 1.05, -sh * 0.44, -sw * 0.72 + dx, -sh * 0.72, dx * 1.5, -sh);
          ctx.bezierCurveTo(sw * 0.72 + dx, -sh * 0.72, sw * 1.05, -sh * 0.44, sw, 0);
          ctx.quadraticCurveTo(0, sh * 0.2, -sw, 0);
          ctx.closePath();
        };
        const a = 0.4 * flick * Math.min(1, lf * 2);
        const g = ctx.createLinearGradient(0, 0, 0, -hgt);
        g.addColorStop(0, 'rgba(226,40,12,' + a * 0.3 + ')');
        g.addColorStop(0.28, 'rgba(244,86,16,' + a * 0.9 + ')');
        g.addColorStop(0.62, 'rgba(255,170,32,' + a * 0.8 + ')');
        g.addColorStop(1, 'rgba(255,214,60,0)');
        tongue(wgt, hgt, lean); ctx.fillStyle = g; ctx.fill();
        const cg = ctx.createLinearGradient(0, 0, 0, -hgt * 0.6);
        cg.addColorStop(0, 'rgba(255,196,60,' + a * 0.5 + ')');
        cg.addColorStop(0.5, 'rgba(255,240,170,' + a * 0.75 + ')');
        cg.addColorStop(1, 'rgba(255,250,220,0)');
        tongue(wgt * 0.46, hgt * 0.6, lean * 0.6); ctx.fillStyle = cg; ctx.fill();
        ctx.restore();
      });
      this._embers.forEach(p => {
        const a = Math.max(0, Math.min(1, p.life));
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3.4);
        const core = p.warm ? '255,214,60' : '255,120,40';
        g.addColorStop(0, 'rgba(255,250,225,' + a + ')');
        g.addColorStop(0.35, 'rgba(' + core + ',' + a * 0.8 + ')');
        g.addColorStop(1, 'rgba(' + core + ',0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.4, 0, TAU); ctx.fillStyle = g; ctx.fill();
      });
      ctx.globalCompositeOperation = 'source-over';
      this._chilies.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        const s = p.s;
        ctx.beginPath();
        ctx.moveTo(-s * 1.15, 0);
        ctx.bezierCurveTo(-s * 0.3, -s * 0.34, s * 0.6, -s * 0.3, s * 1.25, s * 0.06);
        ctx.bezierCurveTo(s * 0.6, s * 0.16, -s * 0.3, s * 0.3, -s * 1.15, 0);
        const g = ctx.createLinearGradient(-s, -s * 0.3, s, s * 0.3);
        g.addColorStop(0, '#FF5A2A'); g.addColorStop(0.5, '#E4140F'); g.addColorStop(1, '#8E0509');
        ctx.fillStyle = g; ctx.fill();
        ctx.strokeStyle = 'rgba(16,16,16,0.85)'; ctx.lineWidth = Math.max(1, s * 0.1); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 1.1, -s * 0.02);
        ctx.quadraticCurveTo(-s * 1.5, -s * 0.3, -s * 1.7, -s * 0.02);
        ctx.strokeStyle = '#2F4A18'; ctx.lineWidth = Math.max(1.5, s * 0.14); ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(-s * 0.6, -s * 0.14);
        ctx.quadraticCurveTo(0, -s * 0.24, s * 0.8, -s * 0.05);
        ctx.strokeStyle = 'rgba(255,235,200,0.5)'; ctx.lineWidth = Math.max(1, s * 0.06); ctx.stroke();
        ctx.restore();
      });
    }
  }
  if (!window.customElements.get('fire-field')) window.customElements.define('fire-field', FireField);
})();
