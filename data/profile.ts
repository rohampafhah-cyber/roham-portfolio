export type L = { fa: string; en: string };

export const profile = {
  name: { en: 'ROHAM ARAM', fa: 'رهام آرام' },
  roles: 'Creative Developer · Web Engineer · UI/UX Explorer',
  tagline: { fa: 'فراتر از تصور، دنیای دیجیتال می‌سازم.', en: 'Building Digital Worlds Beyond Imagination.' },
  bio: {
    fa: 'من رهام آرام هستم؛ عاشق ساختن تجربه‌های دیجیتال، رابط‌های مدرن و پروژه‌های خلاقانه.',
    en: "I am Roham Aram - passionate about crafting digital experiences and creative projects."
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? '',
  links: { email: '', github: '', linkedin: '', telegram: '' } as Record<'email'|'github'|'linkedin'|'telegram', string>,
  stats: [
    { value: 20, suffix: '+', label: { fa: 'تکنولوژی', en: 'Technologies' } },
    { value: 6,  suffix: '',  label: { fa: 'پروژه فعال', en: 'Active Projects' } },
    { value: 2,  suffix: '',  label: { fa: 'زبان رابط', en: 'UI Languages' } },
    { value: 3,  suffix: '+', label: { fa: 'سال یادگیری', en: 'Years Learning' } },
  ],
  timeline: [
    { year: '2023', title: { fa: 'شروع مسیر وب', en: 'Started Web Journey' } },
    { year: '2024', title: { fa: 'ورود به React و Next.js', en: 'React and Next.js' } },
    { year: '2025', title: { fa: 'کاوش 3D و خلاقیت', en: '3D and Creative Coding' } },
    { year: '2026', title: { fa: 'ساخت دنیای دیجیتال', en: 'Building Digital Worlds' } },
  ],
};

export const skills: { id: string; title: L; color: string; items: string[] }[] = [
  { id: 'web',   title: { fa: 'وب', en: 'Web' },           color: '#00E5FF', items: ['HTML','CSS','JavaScript','TypeScript','React','Next.js'] },
  { id: 'ui',    title: { fa: 'رابط کاربری', en: 'UI / UX' }, color: '#8B5CF6', items: ['UI/UX','Responsive Design','Interaction Design','Motion Design'] },
  { id: 'tools', title: { fa: 'ابزار توسعه', en: 'Dev Tools' }, color: '#00D9A6', items: ['Git','GitHub','VS Code','PowerShell'] },
  { id: 'explore', title: { fa: 'در حال کاوش', en: 'Exploring' }, color: '#c084fc', items: ['AI','Three.js','SEO','Web Performance','Creative Coding'] },
];

export type Project = {
  id: string; title: string; desc: L; long: L;
  tech: string[]; status: L; accent: string;
  github: string; demo: string;
};

export const projects: Project[] = [
  {
    id: 'ai', title: 'ROHAM AI',
    desc: { fa: 'آزمایش‌های وب مبتنی بر هوش مصنوعی.', en: 'AI-powered web experiments.' },
    long: { fa: 'پروژه‌ای برای کاوش در ترکیب هوش مصنوعی و وب.', en: 'A project exploring AI plus web.' },
    tech: ['Next.js','TypeScript','AI'], status: { fa: 'در حال توسعه', en: 'In Progress' },
    accent: '#00E5FF', github: '', demo: ''
  },
  {
    id: 'doros', title: 'HAMRAH DOROS',
    desc: { fa: 'همراه آموزشی برای درس‌ها.', en: 'A study-companion for lessons.' },
    long: { fa: 'ایده‌ای برای همراهی دانش‌آموزان در یادگیری با رابط ساده و فارسی.', en: 'An idea to accompany students with a simple Persian UI.' },
    tech: ['React','UI/UX'], status: { fa: 'ایده', en: 'Concept' },
    accent: '#00D9A6', github: '', demo: ''
  },
  {
    id: 'geo', title: 'ROHAM GEO 3D',
    desc: { fa: 'کاوش سه‌بعدی جغرافیا و زمین‌شناسی.', en: 'Interactive 3D geography.' },
    long: { fa: 'نمایش زمین به‌صورت تعاملی با Three.js.', en: 'Earth visualized interactively with Three.js.' },
    tech: ['Three.js','JavaScript'], status: { fa: 'نمونه', en: 'Sample' },
    accent: '#8B5CF6', github: '', demo: ''
  },
  {
    id: 'neon', title: 'ROHAM NEON UNIVERSE',
    desc: { fa: 'تجربه نئونی فضایی با Three.js.', en: 'A neon space experience.' },
    long: { fa: 'دنیایی نئونی از ذرات، نور و حرکت.', en: 'A neon universe of particles, light and motion.' },
    tech: ['Three.js','GSAP'], status: { fa: 'نمونه', en: 'Sample' },
    accent: '#c084fc', github: '', demo: ''
  },
  {
    id: 'lab', title: 'SCIENCE LAB FA',
    desc: { fa: 'آزمایشگاه علوم فارسی تعاملی.', en: 'Persian science lab, interactive.' },
    long: { fa: 'محتوای تعاملی علوم به‌صورت فارسی.', en: 'Interactive Persian science content.' },
    tech: ['HTML','CSS','JavaScript'], status: { fa: 'نمونه', en: 'Sample' },
    accent: '#5eead4', github: '', demo: ''
  },
  {
    id: 'exp', title: 'DIGITAL EXPERIMENTS',
    desc: { fa: 'مجموعه آزمایش‌های کوچک وب.', en: 'A collection of small web experiments.' },
    long: { fa: 'ایده‌های ریز و انیمیشن‌های ساده.', en: 'Tiny ideas and simple animations.' },
    tech: ['CSS','Creative Coding'], status: { fa: 'زنده', en: 'Live' },
    accent: '#7dd3fc', github: '', demo: ''
  },
];