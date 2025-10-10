import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductsSection = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const productCategories = [
    {
      title: t('products.vehicles.title'),
      images: [
        '/images/car_export_1.jpeg',
        '/images/car_export_2.jpeg',
        '/images/car_export_4.webp',
      ],
    },
    {
      title: t('products.materials.title'),
      images: [
        '/images/cbn_materials_1.jpeg',
        '/images/cbn_materials_2.jpeg',
        '/images/cbn_materials_3.png',
      ],
    },
    {
      title: t('products.parts.title'),
      images: [
        '/images/auto_parts_1.jpeg',
        '/images/auto_parts_2.jpeg',
        '/images/auto_parts_3.jpeg',
      ],
    },
  ];

  const allImages = productCategories.flatMap(category => 
    category.images.map(image => ({ image, category: category.title }))
  );

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % allImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('products.title')}
          </h2>
        </div>

        {/* Image Carousel */}
        <div className="relative mb-12">
          <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
            <img
              src={allImages[currentSlide].image}
              alt={allImages[currentSlide].category}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-semibold">{allImages[currentSlide].category}</h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {allImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Product Categories Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {productCategories.map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  {category.title}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {category.images.slice(0, 4).map((image, imgIndex) => (
                    <div key={imgIndex} className="aspect-square rounded-lg overflow-hidden">
                      <img
                        src={image}
                        alt={`${category.title} ${imgIndex + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        onClick={() => {
                          const globalIndex = allImages.findIndex(item => item.image === image);
                          setCurrentSlide(globalIndex);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Product Features */}
        <div className="mt-16 bg-gray-50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">Product Excellence</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Quality</div>
              <p className="text-gray-600">Rigorous inspection and quality control processes</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Reliability</div>
              <p className="text-gray-600">Trusted by customers worldwide for consistent performance</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">Innovation</div>
              <p className="text-gray-600">Latest technology and advanced materials</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;