'use client';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import ScrollUI from '@/components/ScrollUI';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/ui/Cursor';
import Hero from '@/components/hero/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import { Lang } from '@/data/translations';

export default function Home() {
  const [lang, setLang] = useState<Lang>('fa');
  useEffect(() => {
    try { const s = localStorage.getItem('lang'); if (s === 'en' || s === 'fa') setLang(s); } catch {}
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'fa' ? 'rtl' : 'ltr';
    try { localStorage.setItem('lang', lang); } catch {}
  }, [lang]);
  return (
    <>
      <Preloader lang={lang} />
      <Cursor />
      <Navbar lang={lang} setLang={setLang} />
      <ScrollUI lang={lang} />
      <main>
        <Hero lang={lang} />
        <About lang={lang} />
        <Skills lang={lang} />
        <Projects lang={lang} />
        <Contact lang={lang} />
      </main>
      <footer className="foot">© ROHAM ARAM · {new Date().getFullYear()}</footer>
    </>
  );
}