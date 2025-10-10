import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const MarketsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="markets" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('markets.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* African Markets */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                <Globe className="h-8 w-8 text-orange-600" />
              </div>
              <CardTitle className="text-2xl text-orange-900">
                {t('markets.africa.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img
                  src="/images/car_export_5.jpeg"
                  alt="African Markets"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('markets.africa.description')}
              </p>
              
              {/* Key Markets */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Nigeria</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Ghana</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Tanzania</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Uganda</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-orange-600" />
                  <span className="text-sm text-gray-600">Cameroon</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Canadian Market */}
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 p-3 bg-red-100 rounded-full w-fit">
                <MapPin className="h-8 w-8 text-red-600" />
              </div>
              <CardTitle className="text-2xl text-red-900">
                {t('markets.canada.title')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <img
                  src="/images/auto_parts_3.jpeg"
                  alt="Canadian Market"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('markets.canada.description')}
              </p>
              
              {/* Key Provinces */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">British Columbia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">Alberta</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">Ontario</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">Quebec</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">Saskatchewan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-gray-600">Manitoba</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Statistics */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Market Reach</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">25+</div>
              <div className="text-gray-600">African Countries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-red-600 mb-2">10</div>
              <div className="text-gray-600">Canadian Provinces</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50M+</div>
              <div className="text-gray-600">People Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketsSection;