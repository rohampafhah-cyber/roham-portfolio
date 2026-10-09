export type Lang = 'fa' | 'en';
const fa = {
  nav: { home: 'خانه', about: 'درباره', skills: 'مهارت‌ها', projects: 'پروژه‌ها', contact: 'تماس' },
  hero: {
    status: 'در حال یادگیری و ساختن',
    intro: 'من رهام آرام هستم؛ سازنده تجربه‌های دیجیتال، رابط‌های مدرن و پروژه‌های خلاقانه.',
    explore: 'کاوش دنیای من', projects: 'مشاهده پروژه‌ها', contact: 'تماس با من', scroll: 'اسکرول',
    noGl: 'مرورگر شما WebGL را پشتیبانی نمی‌کند؛ نسخه ساده نمایش داده شد.',
  },
  about: {
    title: 'درباره من',
    quote: 'من فقط وب‌سایت نمی‌سازم؛ تجربه‌های دیجیتال طراحی می‌کنم.',
    journey: 'مسیر من',
    skills: 'علاقه‌مندی‌ها: توسعه وب، UI/UX، سئو، اپ‌های AI و تجربه‌های تعاملی.',
  },
  skills: { title: 'مهارت‌ها', sub: 'فناوری‌هایی که با آن‌ها کار می‌کنم یا در حال یادگیری‌شان هستم.' },
  projects: {
    title: 'پروژه‌ها', sub: 'نمونه‌های قابل ویرایش در data/profile.ts',
    github: 'کد منبع', demo: 'نمایش زنده', none: 'لینکی تنظیم نشده',
    details: 'جزئیات', close: 'بستن', prev: 'قبلی', next: 'بعدی',
  },
  contact: { title: 'ایده‌ای داری؟ بیا بسازیمش.', sub: 'فقط راه‌های ارتباطی تنظیم‌شده نمایش داده می‌شوند.', empty: 'هنوز راه ارتباطی تنظیم نشده.' },
  ui: { top: 'بازگشت به بالا', menu: 'منو', lang: 'تغییر زبان', loading: 'در حال بارگذاری' },
};
const en: typeof fa = {
  nav: { home: 'Home', about: 'About', skills: 'Skills', projects: 'Projects', contact: 'Contact' },
  hero: {
    status: 'Learning and building',
    intro: "I'm Roham Aram — builder of digital experiences, modern interfaces and creative projects.",
    explore: 'Explore My Universe', projects: 'View Projects', contact: 'Contact Me', scroll: 'Scroll',
    noGl: 'WebGL unavailable; simple fallback shown.',
  },
  about: {
    title: 'About',
    quote: "I don't just build websites. I design digital experiences.",
    journey: 'My Journey',
    skills: 'Interests: web dev, UI/UX, SEO, AI apps and interactive experiences.',
  },
  skills: { title: 'Skills', sub: 'Technologies I work with or am learning.' },
  projects: {
    title: 'Projects', sub: 'Editable samples in data/profile.ts',
    github: 'Source', demo: 'Live demo', none: 'No links configured',
    details: 'Details', close: 'Close', prev: 'Prev', next: 'Next',
  },
  contact: { title: "Got an idea? Let's build it.", sub: 'Only configured channels are shown.', empty: 'No channels configured yet.' },
  ui: { top: 'Back to top', menu: 'Menu', lang: 'Switch language', loading: 'Loading' },
};
export const t: Record<Lang, typeof fa> = { fa, en };