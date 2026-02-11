import { getTranslations } from 'next-intl/server';
import { Code, MessageSquare, TrendingUp, Wrench } from 'lucide-react';

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const services = [
    { key: 'software', icon: Code },
    { key: 'consulting', icon: MessageSquare },
    { key: 'digital', icon: TrendingUp },
    { key: 'maintenance', icon: Wrench },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('services.title')}
          </h1>
          <p className="text-lg text-blue-100">{t('services.subtitle')}</p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-white border border-gray-200 p-8 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-[#e6f0ff] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#0066FF]" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t(`services.${key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-gray-600 mb-8">{t('cta.description')}</p>
          <a
            href="contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-[#0052cc] transition-colors"
          >
            {t('cta.button')}
          </a>
        </div>
      </section>
    </>
  );
}
