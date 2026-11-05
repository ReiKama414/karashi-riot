import { useEffect } from 'react';

export function useScrollFx(rootRef, speed) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let ctx;
    let cancelled = false;
    let refreshTimer = 0;

    (async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const q = (sel) => Array.from(root.querySelectorAll(sel));
      ctx = gsap.context(() => {
        const link = (tween, cfg) => {
          ScrollTrigger.create({ ...cfg, animation: tween });
        };
        const scrub = (el, from, to, cfg) => link(
          gsap.fromTo(el, from, {
            paused: true,
            immediateRender: false,
            ease: 'none',
            duration: 1,
            ...to,
          }),
          cfg,
        );

        q('[data-fx="flyin-l"]').forEach((el) => scrub(
          el,
          { xPercent: -130, rotate: -12, skewX: 8 },
          { xPercent: 0, rotate: 0, skewX: 0 },
          { trigger: el, start: 'top 96%', end: 'top 38%', scrub: 0.6 },
        ));

        q('[data-fx="flyin-r"]').forEach((el) => scrub(
          el,
          { xPercent: 130, rotate: 12, skewX: -8 },
          { xPercent: 0, rotate: 0, skewX: 0 },
          { trigger: el, start: 'top 96%', end: 'top 38%', scrub: 0.6 },
        ));

        q('[data-fx="lift"]').forEach((el) => scrub(
          el,
          { yPercent: 0, scale: 1 },
          { yPercent: -22, scale: 1.12 },
          { trigger: el, start: 'top 60%', end: 'bottom top', scrub: true },
        ));

        q('[data-fx="bowl-spin"]').forEach((el) => scrub(
          el,
          { rotate: -12, scale: 0.8 },
          { rotate: 26, scale: 1.06 },
          { trigger: el, start: 'top 92%', end: 'bottom 22%', scrub: 0.5 },
        ));

        q('[data-fx="cross"]').forEach((el) => scrub(
          el,
          { x: '-24vw', rotate: 0 },
          { x: '118vw', rotate: 420 },
          { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: 0.4 },
        ));

        q('[data-fx="burst"]').forEach((el) => scrub(
          el,
          { scale: 0.12, rotate: 0 },
          { scale: 16, rotate: 200, ease: 'power2.in' },
          { trigger: el.parentElement, start: 'top 80%', end: 'bottom top', scrub: 0.4 },
        ));

        const panels = q('[data-fx="panel"]');
        if (panels.length) {
          link(
            gsap.fromTo(
              panels,
              { yPercent: 26, rotate: -3, opacity: 0 },
              {
                yPercent: 0,
                rotate: 0,
                opacity: 1,
                duration: 0.7,
                stagger: 0.12,
                ease: 'back.out(1.6)',
                paused: true,
                immediateRender: false,
              },
            ),
            { trigger: panels[0].parentElement, start: 'top 85%' },
          );
        }

        q('[data-fx="card"]').forEach((el, i) => link(
          gsap.fromTo(
            el,
            { y: 70, rotate: i % 2 ? 4 : -4, opacity: 0 },
            {
              y: 0,
              rotate: 0,
              opacity: 1,
              duration: 0.65,
              ease: 'back.out(1.5)',
              paused: true,
              immediateRender: false,
            },
          ),
          { trigger: el, start: 'top 94%' },
        ));

        const story = root.querySelector('#story');
        if (story) {
          const tl = gsap.timeline({ paused: true })
            .to(story, { backgroundColor: '#FFD323', ease: 'none', duration: 1 })
            .to(story, { backgroundColor: '#F21820', ease: 'none', duration: 1 })
            .to(story, { backgroundColor: '#101010', ease: 'none', duration: 1 });
          link(tl, { trigger: story, start: 'top bottom', end: 'bottom top', scrub: 0.5 });
        }

        gsap.globalTimeline.timeScale(speed);
        refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 700);
        document.fonts?.ready.then(() => {
          if (!cancelled) ScrollTrigger.refresh();
        });
      }, root);
    })();

    return () => {
      cancelled = true;
      window.clearTimeout(refreshTimer);
      ctx?.revert();
    };
  }, [rootRef, speed]);
}
