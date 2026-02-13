import Script from 'next/script';

type LocaleType = 'zh' | 'en';

interface StructuredDataProps {
  locale: LocaleType;
}

export default function StructuredData({ locale }: StructuredDataProps) {
  const isZh = locale === 'zh';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isZh ? '商澍科技' : 'Shangshu Technology',
    alternateName: 'kingcpm',
    url: 'https://kingcpm.com',
    logo: 'https://kingcpm.com/logo.png',
    description: isZh
      ? '商澍科技是一家专注于软件开发、技术咨询和数字化转型的科技公司，为企业提供专业的技术解决方案。'
      : 'Shangshu Technology is a technology company focused on software development, technical consulting, and digital transformation, providing professional technical solutions for enterprises.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-10-12345678',
      contactType: 'customer service',
      email: 'contact@kingcpm.com',
      areaServed: 'CN',
      availableLanguage: ['Chinese', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: isZh ? '北京市' : 'Beijing',
      addressRegion: isZh ? '海淀区' : 'Haidian District',
      addressCountry: 'CN',
    },
    sameAs: [
      // 添加社交媒体链接（如果有的话）
      // 'https://twitter.com/shangshutech',
      // 'https://linkedin.com/company/shangshutech',
    ],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isZh ? '商澍科技' : 'Shangshu Technology',
    url: 'https://kingcpm.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://kingcpm.com/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: [locale],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isZh ? '首页' : 'Home',
        item: `https://kingcpm.com/${locale}/`,
      },
    ],
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
    </>
  );
}
