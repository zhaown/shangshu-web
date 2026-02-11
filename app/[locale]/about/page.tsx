import { getTranslations } from 'next-intl/server';
import { Target, Eye, Heart } from 'lucide-react';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale });

  const values = t.raw('about.values.items') as string[];

  return (
    <>
      {/* Hero Section */}
      <section className="gradient-hero py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            {t('about.title')}
          </h1>
          <p className="text-lg text-blue-100">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Company Description */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            {t('about.description')}
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#e6f0ff] rounded-lg flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('about.mission.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-[#e6f0ff] rounded-lg flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-[#0066FF]" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t('about.vision.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {t('about.vision.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-[#e6f0ff] rounded-lg flex items-center justify-center mx-auto mb-6">
              <Heart className="w-6 h-6 text-[#0066FF]" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              {t('about.values.title')}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#0066FF] to-[#001a4d] p-6 rounded-xl text-center"
              >
                <span className="text-white font-semibold text-lg">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
