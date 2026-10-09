import Reveal from '../Reveal';
import { t, Lang } from '@/data/translations';
import { skills } from '@/data/profile';

export default function Skills({ lang }: { lang: Lang }) {
  const x = t[lang].skills;
  return (
    <section id="skills" className="sec">
      <Reveal><h2 className="h2"><span>02</span>{x.title}</h2><p className="sub">{x.sub}</p></Reveal>
      <div className="grid skills">
        {skills.map((g, i) => (
          <Reveal key={g.id} delay={i * 90} variant="scale">
            <div className="glass card skill-card" style={{ '--c': g.color } as React.CSSProperties}>
              <h3>{g.title[lang]}</h3>
              <ul className="chips">{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              <div className="skill-bar"><span /></div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}