import type { Metadata, Viewport } from 'next';
import { Vazirmatn, Space_Grotesk } from 'next/font/google';
import { profile } from '@/data/profile';
import './globals.css';

const fa = Vazirmatn({ subsets: ['arabic','latin'], variable: '--f-fa', display: 'swap' });
const en = Space_Grotesk({ subsets: ['latin'], variable: '--f-en', display: 'swap' });

export const viewport: Viewport = { themeColor: '#050608', width: 'device-width', initialScale: 1 };

export const metadata: Metadata = {
  title: 'ROHAM ARAM — Digital Universe | رهام آرام',
  description: 'Building Digital Worlds Beyond Imagination. · فراتر از تصور، دنیای دیجیتال می‌سازم.',
  ...(profile.siteUrl && { metadataBase: new URL(profile.siteUrl), alternates: { canonical: '/' } }),
  openGraph: { title: 'ROHAM ARAM — Digital Universe', description: 'Creative Developer · Web Engineer · UI/UX Explorer', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`${fa.variable} ${en.variable}`}>
      <body>
        <div className="aurora" aria-hidden><i /><i /><i /></div>
        <div className="noise" aria-hidden />
        {children}
      </body>
    </html>
  );
}