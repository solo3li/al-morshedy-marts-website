import type { Metadata } from 'next';
import './globals.css';
import { ClientLayoutWrapper } from '../src/components/ClientLayoutWrapper';

export const metadata: Metadata = {
  title: 'عشك | أدوات منزلية',
  description: 'متجر عشك للأدوات المنزلية وأجهزة المطبخ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <ClientLayoutWrapper>
          {children}
        </ClientLayoutWrapper>
      </body>
    </html>
  );
}
