import Reveal from '../Reveal';
import { t, Lang } from '@/data/translations';
import { profile } from '@/data/profile';

const labels = { email: 'Email', github: 'GitHub', linkedin: 'LinkedIn', telegram: 'Telegram' } as const;
const icons = { email: '✉', github: '⌨', linkedin: 'in', telegram: '✈' } as const;

export default function Contact({ lang }: { lang: Lang }) {
  const x = t[lang].contact;
  const items = (Object.keys(labels) as (keyof typeof labels)[]).filter((k) => profile.links[k]);
  return (
    <section id="contact" className="sec contact">
      <Reveal>
        <h2 className="h2"><span>04</span>{x.title}</h2>
        <p className="sub">{x.sub}</p>
      </Reveal>
      <Reveal delay={100} variant="scale">
        {items.length ? (
          <div className="contact-grid">
            {items.map((k) => {
              const v = profile.links[k];
              const external = k !== 'email';
              return (
                <a key={k} className="glass contact-card" href={k === 'email' ? `mailto:${v}` : v} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <span className="ci">{icons[k]}</span>
                  <span className="cl">{labels[k]}</span>
                  <span className="cv">{v}</span>
                </a>
              );
            })}
          </div>
        ) : (
          <p className="muted">{x.empty}</p>
        )}
      </Reveal>
    </section>
  );
}