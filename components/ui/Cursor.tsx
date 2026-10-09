'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf = 0;
    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${mx}px, ${my}px)`;
      const el = e.target as HTMLElement;
      const hot = el.closest('a, button, [data-hot]');
      if (ring.current) ring.current.classList.toggle('hot', !!hot);
    };
    const loop = () => { rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop); };
    window.addEventListener('mousemove', move); loop();
    return () => { window.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);
  return (<><div ref={dot} className="cur-dot" aria-hidden /><div ref={ring} className="cur-ring" aria-hidden /></>);
}