'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

export default function MotionSystem() {
  const cursor = useRef<HTMLDivElement>(null);
  const halo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
        gsap.fromTo(
          element,
          { y: 54, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.05, ease: 'power3.out', scrollTrigger: { trigger: element, start: 'top 88%', once: true } },
        );
      });
      gsap.utils.toArray<HTMLElement>('[data-drift]').forEach((element) => {
        gsap.to(element, { yPercent: -16, ease: 'none', scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 1 } });
      });
    });

    let haloX = 0;
    let haloY = 0;
    const move = (event: PointerEvent) => {
      cursor.current?.style.setProperty('transform', `translate3d(${event.clientX}px, ${event.clientY}px, 0)`);
      haloX += (event.clientX - haloX) * 0.2;
      haloY += (event.clientY - haloY) * 0.2;
      halo.current?.style.setProperty('transform', `translate3d(${haloX}px, ${haloY}px, 0)`);
    };
    window.addEventListener('pointermove', move, { passive: true });

    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(frame);
      lenis.destroy();
      context.revert();
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={cursor} aria-hidden="true" />
      <div className="cursor-halo" ref={halo} aria-hidden="true" />
    </>
  );
}
