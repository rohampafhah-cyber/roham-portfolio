import Reveal from '../Reveal';
import Counter from '../Counter';
import { t, Lang } from '@/data/translations';
import { profile } from '@/data/profile';

export default function About({ lang }: { lang: Lang }) {
  const x = t[lang].about;
  return (
    <section id="about" className="sec">
      <Reveal><h2 className="h2"><span>01</span>{x.title}</h2></Reveal>

      <div className="about">
        <Reveal variant="scale" className="mono glass">
          <div className="mono-ra">RA</div>
          <div className="ring r1" /><div className="ring r2" />
        </Reveal>
        <Reveal variant="right" delay={120}>
          <p className="big">{x.quote}</p>
          <p className="lead">{profile.bio[lang]}</p>
          <p className="lead muted">{x.skills}</p>
        </Reveal>
      </div>

      <div className="stats">
        {profile.stats.map((s, i) => (
          <Reveal key={i} delay={i * 90} variant="up">
            <div className="glass stat">
              <b><Counter to={s.value} suffix={s.suffix} /></b>
              <span>{s.label[lang]}</span>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal variant="up">
        <h3 className="tl-title">{x.journey}</h3>
      </Reveal>
      <div className="timeline">
        {profile.timeline.map((it, i) => (
          <Reveal key={i} delay={i * 100} variant="up">
            <div className="tl-item">
              <span className="tl-year">{it.year}</span>
              <span className="tl-dot" />
              <span className="tl-text">{it.title[lang]}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}