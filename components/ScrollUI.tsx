'use client';
import { useEffect, useState } from 'react';
import { Lang, t } from '@/data/translations';

export default function ScrollUI({ lang }: { lang: Lang }) {
  const [p, setP] = useState(0);
  useEffect(() => {
    let r = 0;
    const on = () => { cancelAnimationFrame(r); r = requestAnimationFrame(() => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    }); };
    on(); window.addEventListener('scroll', on, { passive: true }); window.addEventListener('resize', on);
    return () => { cancelAnimationFrame(r); window.removeEventListener('scroll', on); window.removeEventListener('resize', on); };
  }, []);
  const show = p > 0.08;
  const up = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return (
    <>
      <div className="progress" style={{ transform: `scaleX(${p})` }} aria-hidden />
      <button className={`totop ${show ? 'show' : ''}`} onClick={up} tabIndex={show ? 0 : -1} aria-label={t[lang].ui.top}>↑</button>
    </>
  );
}