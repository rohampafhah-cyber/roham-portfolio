'use client';
import { useEffect, useState } from 'react';

export default function Typewriter({ words, speed = 90, pause = 1600 }: { words: string[]; speed?: number; pause?: number }) {
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState('');
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = words[i % words.length];
    if (!del && txt === full) { const t = setTimeout(() => setDel(true), pause); return () => clearTimeout(t); }
    if (del && txt === '') { setDel(false); setI((v) => v + 1); return; }
    const t = setTimeout(() => {
      setTxt(del ? full.slice(0, txt.length - 1) : full.slice(0, txt.length + 1));
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [txt, del, i, words, speed, pause]);
  return <span className="type">{txt}<i className="caret" /></span>;
}