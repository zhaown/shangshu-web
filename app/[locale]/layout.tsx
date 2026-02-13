import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type LocaleType = 'zh' | 'en';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  const isZh = locale === 'zh';
  const baseUrl = 'https://kingcpm.com';
  const currentUrl = `${baseUrl}/${locale}/`;
  const alternateUrl = `${baseUrl}/${isZh ? 'en' : 'zh'}/`;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: t('title'),
      template: `%s | ${isZh ? '商澍科技' : 'Shangshu Technology'}`,
    },
    description: t('description'),
    keywords: isZh
      ? ['商澍科技', '软件开发', '技术解决方案', '数字化转型', 'kingcpm', '北京科技公司', 'IT咨询', '技术服务']
      : ['Shangshu Technology', 'Software Development', 'Tech Solutions', 'Digital Transformation', 'kingcpm', 'Beijing Tech Company', 'IT Consulting', 'Technology Services'],
    authors: [{ name: isZh ? '商澍科技' : 'Shangshu Technology' }],
    creator: isZh ? '商澍科技' : 'Shangshu Technology',
    publisher: isZh ? '商澍科技' : 'Shangshu Technology',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        'zh': `${baseUrl}/zh/`,
        'en': `${baseUrl}/en/`,
        'x-default': `${baseUrl}/zh/`,
      },
    },
    openGraph: {
      type: 'website',
      locale: isZh ? 'zh_CN' : 'en_US',
      alternateLocale: isZh ? 'en_US' : 'zh_CN',
      url: currentUrl,
      siteName: isZh ? '商澍科技' : 'Shangshu Technology',
      title: t('title'),
      description: t('description'),
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: isZh ? '商澍科技 - 专业软件开发与技术解决方案' : 'Shangshu Technology - Professional Software Development & Tech Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: ['/og-image.jpg'],
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as LocaleType)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StructuredData locale={locale as LocaleType} />
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Header locale={locale as LocaleType} />
          <main className="pt-16">{children}</main>
          <Footer locale={locale as LocaleType} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
