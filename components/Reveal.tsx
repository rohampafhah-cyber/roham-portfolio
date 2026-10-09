'use client';
import { useEffect, useRef, useState } from 'react';

type Variant = 'up' | 'fade' | 'scale' | 'left' | 'right';

export default function Reveal({
  children, className = '', delay = 0, variant = 'up', once = true,
}: { children: React.ReactNode; className?: string; delay?: number; variant?: Variant; once?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); if (once) io.disconnect(); }
      else if (!once) setOn(false);
    }, { threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [once]);
  return (
    <div ref={ref} className={`reveal v-${variant} ${on ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}