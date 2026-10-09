'use client';
import { useEffect, useState } from 'react';
import { Lang, t } from '@/data/translations';

export default function Preloader({ lang }: { lang: Lang }) {
  const [gone, setGone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setGone(true), 1100); return () => clearTimeout(t); }, []);
  if (gone) return null;
  return (
    <div className="preloader" aria-hidden>
      <div className="pl-ring" />
      <div className="pl-text">ROHAM ARAM</div>
      <div className="pl-sub">{t[lang].ui.loading}</div>
    </div>
  );
}