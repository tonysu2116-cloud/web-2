import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* US Company */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-2xl text-blue-900">
                {t('about.us.title')}
              </CardTitle>
              <div className="flex items-center justify-center text-gray-600 mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>San Diego, California, USA</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img
                  src="/images/car_export_1.jpeg"
                  alt="US Operations"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('about.us.description')}
              </p>
            </CardContent>
          </Card>

          {/* Canadian Company */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                <Building2 className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-900">
                {t('about.canada.title')}
              </CardTitle>
              <div className="flex items-center justify-center text-gray-600 mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>Vancouver, British Columbia, Canada</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img
                  src="/images/cbn_materials_2.jpeg"
                  alt="Canadian Operations"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t('about.canada.description')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Company Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-gray-600">Years Experience</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600">Countries Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10K+</div>
            <div className="text-gray-600">Vehicles Exported</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Clients</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;