'use client';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { profile } from '@/data/profile';
import { t, Lang } from '@/data/translations';
import Typewriter from '../Typewriter';

const Core = dynamic(() => import('../three/Core'), { ssr: false });

export default function Hero({ lang }: { lang: Lang }) {
  const [gl, setGl] = useState<boolean | null>(null);
  const x = t[lang].hero;
  useEffect(() => {
    try { setGl(!!document.createElement('canvas').getContext('webgl2')); } catch { setGl(false); }
  }, []);
  return (
    <section id="home" className="hero">
      <div className="hero-3d">
        {gl ? <Core /> : gl === false && <><div className="orb" /><p className="muted">{x.noGl}</p></>}
      </div>
      <div className="hero-copy">
        <span className="status"><i /> {x.status}</span>
        <h1 className="display">{profile.name.en}</h1>
        <p className="roles"><Typewriter words={[profile.roles, profile.tagline[lang]]} /></p>
        <p className="lead">{x.intro}</p>
        <div className="btns">
          <a className="btn primary" href="#about">{x.explore}</a>
          <a className="btn" href="#projects">{x.projects}</a>
          <a className="btn" href="#contact">{x.contact}</a>
        </div>
      </div>
      <span className="scroll" aria-hidden>{x.scroll} ↓</span>
    </section>
  );
}