import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Lightbulb, Users, Shield, HeartHandshake } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const features = [
    { key: 'innovation', icon: Lightbulb },
    { key: 'professional', icon: Users },
    { key: 'quality', icon: Shield },
    { key: 'service', icon: HeartHandshake },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#features"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0066FF] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                {t('hero.contact')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-lg text-gray-600">{t('features.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ key, icon: Icon }) => (
              <div
                key={key}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-[#e6f0ff] rounded-lg flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-[#0066FF]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {t(`features.${key}.title`)}
                </h3>
                <p className="text-gray-600">{t(`features.${key}.description`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {t('about.title')}
              </h2>
              <p className="text-lg text-gray-600 mb-6">{t('about.description')}</p>
              <Link
                href="about"
                className="inline-flex items-center text-[#0066FF] font-semibold hover:text-[#0052cc] transition-colors"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="bg-gradient-to-br from-[#0066FF] to-[#001a4d] rounded-2xl p-8 text-white">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.mission.title')}</h3>
                  <p className="text-blue-100">{t('about.mission.description')}</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{t('about.vision.title')}</h3>
                  <p className="text-blue-100">{t('about.vision.description')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0066FF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-blue-100 mb-8">{t('cta.description')}</p>
          <Link
            href="contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0066FF] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            {t('cta.button')}
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
