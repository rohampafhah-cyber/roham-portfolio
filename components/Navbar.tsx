'use client';
import { useEffect, useState } from 'react';
import { Lang, t } from '@/data/translations';

const ids = ['home','about','skills','projects','contact'] as const;

export default function Navbar({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const x = t[lang];
  const [active, setActive] = useState<string>('home');
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((i) => { const el = document.getElementById(i); if (el) io.observe(el); });
    const on = () => setSolid(window.scrollY > 20);
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => { io.disconnect(); window.removeEventListener('scroll', on); };
  }, []);
  return (
    <header className={`nav ${solid || open ? 'solid' : ''}`}>
      <a className="logo" href="#home" aria-label="ROHAM ARAM">RA</a>
      <nav className={`links ${open ? 'open' : ''}`} aria-label="Main">
        {ids.map((i) => (
          <a key={i} href={`#${i}`} className={active === i ? 'on' : ''} onClick={() => setOpen(false)}>{x.nav[i]}</a>
        ))}
      </nav>
      <div className="tools">
        <button className="btn sm" onClick={() => setLang(lang === 'fa' ? 'en' : 'fa')} aria-label={x.ui.lang}>{lang === 'fa' ? 'EN' : 'فا'}</button>
        <button className={`burger ${open ? 'x' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open} aria-label={x.ui.menu}><i /><i /></button>
      </div>
    </header>
  );
}