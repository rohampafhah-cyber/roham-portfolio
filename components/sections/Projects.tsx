'use client';
import { useEffect, useRef, useState } from 'react';
import Reveal from '../Reveal';
import { t, Lang } from '@/data/translations';
import { projects, Project } from '@/data/profile';

export default function Projects({ lang }: { lang: Lang }) {
  const x = t[lang].projects;
  const trackRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState<Project | null>(null);
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);

  const cardW = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const card = el.querySelector<HTMLElement>('.proj-slide');
    return card ? card.offsetWidth + 20 : 0;
  };
  const go = (dir: number) => {
    const el = trackRef.current; if (!el) return;
    const next = Math.max(0, Math.min(projects.length - 1, idx + dir));
    setIdx(next);
    el.scrollTo({ left: next * cardW(), behavior: 'smooth' });
  };
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) { if (e.key === 'Escape') setOpen(null); return; }
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [idx, open]);

  useEffect(() => {
    const el = trackRef.current; if (!el) return;
    let r = 0;
    const on = () => { cancelAnimationFrame(r); r = requestAnimationFrame(() => {
      const w = cardW(); if (!w) return;
      const i = Math.round(el.scrollLeft / w);
      if (i !== idx) setIdx(i);
    }); };
    el.addEventListener('scroll', on, { passive: true });
    return () => { el.removeEventListener('scroll', on); cancelAnimationFrame(r); };
  }, [idx]);

  const down = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('a,button')) return;
    dragging.current = true;
    startX.current = e.clientX;
    startScroll.current = trackRef.current?.scrollLeft ?? 0;
    trackRef.current?.setPointerCapture(e.pointerId);
  };
  const move = (e: React.PointerEvent) => {
    if (!dragging.current || !trackRef.current) return;
    trackRef.current.scrollLeft = startScroll.current - (e.clientX - startX.current);
  };
  const up = () => { dragging.current = false; };

  return (
    <section id="projects" className="sec">
      <Reveal><h2 className="h2"><span>03</span>{x.title}</h2><p className="sub">{x.sub}</p></Reveal>

      <div className="slider-wrap">
        <div className="slider-nav">
          <button className="nav-btn" onClick={() => go(-1)} disabled={idx === 0} aria-label={x.prev}>‹</button>
          <div className="dots">
            {projects.map((_, i) => (
              <button key={i} className={`dot ${i === idx ? 'on' : ''}`} onClick={() => { setIdx(i); trackRef.current?.scrollTo({ left: i * cardW(), behavior: 'smooth' }); }} aria-label={`Go to ${i+1}`} />
            ))}
          </div>
          <button className="nav-btn" onClick={() => go(1)} disabled={idx === projects.length - 1} aria-label={x.next}>›</button>
        </div>

        <div
          ref={trackRef}
          className="slider-track"
          onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={up}
        >
          {projects.map((p, i) => (
            <article key={p.id} className="glass proj-slide" style={{ '--a': p.accent } as React.CSSProperties}>
              <span className="num">{String(i + 1).padStart(2, '0')}</span>
              <span className="state">{p.status[lang]}</span>
              <h3>{p.title}</h3>
              <p>{p.desc[lang]}</p>
              <ul className="chips">{p.tech.map((s) => <li key={s}>{s}</li>)}</ul>
              <div className="plinks">
                <button className="link-btn" onClick={() => setOpen(p)}>{x.details} →</button>
                {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer">{x.github} ↗</a>}
                {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer">{x.demo} ↗</a>}
              </div>
            </article>
          ))}
        </div>
      </div>

      {open && (
        <div className="modal-back" onClick={() => setOpen(null)}>
          <div className="modal glass" style={{ '--a': open.accent } as React.CSSProperties} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setOpen(null)} aria-label={x.close}>×</button>
            <span className="state">{open.status[lang]}</span>
            <h3>{open.title}</h3>
            <p className="lead">{open.long[lang]}</p>
            <ul className="chips">{open.tech.map((s) => <li key={s}>{s}</li>)}</ul>
            <div className="plinks">
              {open.github && <a href={open.github} target="_blank" rel="noopener noreferrer">{x.github} ↗</a>}
              {open.demo && <a href={open.demo} target="_blank" rel="noopener noreferrer">{x.demo} ↗</a>}
              {!open.github && !open.demo && <small>{x.none}</small>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}