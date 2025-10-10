import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const NewsSection = () => {
  const { t } = useLanguage();

  const newsItems = [
    {
      title: t('news.item1.title'),
      date: t('news.item1.date'),
      description: t('news.item1.description'),
      image: '/images/car_export_5.jpeg',
      category: 'Business Expansion',
    },
    {
      title: t('news.item2.title'),
      date: t('news.item2.date'),
      description: t('news.item2.description'),
      image: '/images/cbn_materials_2.jpeg',
      category: 'Product Innovation',
    },
    {
      title: t('news.item3.title'),
      date: t('news.item3.date'),
      description: t('news.item3.description'),
      image: '/images/office_building_1.jpeg',
      category: 'Sustainability',
    },
  ];

  return (
    <section id="news" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('news.title')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 group cursor-pointer">
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900">
                    {item.category}
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {item.date}
                </div>
                <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700 transition-colors">
                  <span className="mr-2">Read More</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional News Items */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Updates</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">New Partnership Agreement Signed</h4>
                <p className="text-sm text-gray-600">Mobile Union expands operations with strategic African partners</p>
                <span className="text-xs text-gray-500">October 5, 2024</span>
              </div>
            </div>
            <div className="flex items-start space-x-4 pb-4 border-b border-gray-200">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">ISO Certification Achieved</h4>
                <p className="text-sm text-gray-600">Both companies receive international quality certifications</p>
                <span className="text-xs text-gray-500">September 28, 2024</span>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-medium text-gray-900">Technology Upgrade Complete</h4>
                <p className="text-sm text-gray-600">Enhanced logistics and tracking systems now operational</p>
                <span className="text-xs text-gray-500">September 15, 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;