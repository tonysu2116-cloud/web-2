import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, FileText, Ship, Shield, Package, Wrench, Cog, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t } = useLanguage();

  const usServices = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: t('services.us.item1'),
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: t('services.us.item2'),
    },
    {
      icon: <Ship className="h-6 w-6" />,
      title: t('services.us.item3'),
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('services.us.item4'),
    },
  ];

  const canadaServices = [
    {
      icon: <Package className="h-6 w-6" />,
      title: t('services.canada.item1'),
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: t('services.canada.item2'),
    },
    {
      icon: <Cog className="h-6 w-6" />,
      title: t('services.canada.item3'),
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('services.canada.item4'),
    },
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* US Services */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-blue-900 mb-4">
                {t('services.us.title')}
              </h3>
              <img
                src="/images/car_export_3.jpeg"
                alt="US Services"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {usServices.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {service.icon}
                      </div>
                      <span className="font-medium text-gray-900">
                        {service.title}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Canadian Services */}
          <div>
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-red-900 mb-4">
                {t('services.canada.title')}
              </h3>
              <img
                src="/images/auto_parts_2.jpeg"
                alt="Canadian Services"
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {canadaServices.map((service, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg text-red-600">
                        {service.icon}
                      </div>
                      <span className="font-medium text-gray-900">
                        {service.title}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;