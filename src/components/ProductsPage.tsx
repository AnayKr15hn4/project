import React from 'react';
import { Eye, Navigation, Shield, ChevronLeft, ArrowRight } from 'lucide-react';

interface ProductsPageProps {
  onBackToHome: () => void;
  onSelectProduct: (productId: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ onBackToHome, onSelectProduct }) => {
  const products = [
    {
      id: 'surrounding-scanner',
      name: 'The Surrounding Scanner',
      description: 'Our flagship model with advanced AI capabilities and comprehensive environmental awareness.',
      startingPrice: 499,
      color: 'blue',
      icon: Eye,
      features: [
        'Basic proximity sensors included',
        'Upgradeable to AI Camera & LIDAR',
        'Customizable lens options',
        'Optional vibration & Bluetooth'
      ],
      available: true
    },
  ];

  const getColorClasses = (color: string, available: boolean) => {
    if (!available) {
      return {
        bg: 'bg-gray-900/30',
        text: 'text-gray-400',
        border: 'border-gray-700',
        hoverBorder: 'hover:border-gray-600',
        button: 'bg-gray-600 hover:bg-gray-500 text-white',
        ring: 'focus:ring-gray-400'
      };
    }

    switch (color) {
      case 'blue':
        return {
          bg: 'bg-blue-900/30',
          text: 'text-blue-400',
          border: 'border-gray-700',
          hoverBorder: 'hover:border-blue-500',
          button: 'bg-blue-600 hover:bg-blue-700 text-white',
          ring: 'focus:ring-blue-500'
        };
      case 'purple':
        return {
          bg: 'bg-purple-900/30',
          text: 'text-purple-400',
          border: 'border-gray-700',
          hoverBorder: 'hover:border-purple-500',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          ring: 'focus:ring-purple-500'
        };
      case 'green':
        return {
          bg: 'bg-green-900/30',
          text: 'text-green-400',
          border: 'border-gray-700',
          hoverBorder: 'hover:border-green-500',
          button: 'bg-green-600 hover:bg-green-700 text-white',
          ring: 'focus:ring-green-500'
        };
      default:
        return {
          bg: 'bg-gray-900/30',
          text: 'text-gray-400',
          border: 'border-gray-700',
          hoverBorder: 'hover:border-gray-600',
          button: 'bg-gray-600 hover:bg-gray-500 text-white',
          ring: 'focus:ring-gray-400'
        };
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center text-gray-300 hover:text-white transition-colors duration-200 bg-transparent border-none cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Choose Your <span className="text-blue-400">Smart Glasses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Select the perfect model for your needs. Each product can be fully customized 
            with sensors, features, and lens options tailored to your preferences.
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <div className="max-w-md">
          {products.map((product) => {
            const colors = getColorClasses(product.color, product.available);
            const IconComponent = product.icon;
            
            return (
              <div
                key={product.id}
                className={`bg-gray-800 rounded-xl p-8 border transition-colors duration-200 ${colors.border} ${colors.hoverBorder} ${!product.available ? 'opacity-75' : ''}`}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colors.bg}`}>
                    <IconComponent className={`h-8 w-8 ${colors.text}`} aria-hidden="true" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{product.name}</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {product.description}
                  </p>
                  <div className={`text-3xl font-bold mb-6 ${colors.text}`}>
                    Starting at ${product.startingPrice}
                  </div>
                </div>
                
                <ul className="space-y-3 text-gray-300 mb-8">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className={`w-2 h-2 rounded-full mr-3 mt-2 flex-shrink-0 ${colors.text.replace('text-', 'bg-')}`}></span>
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                  <button
                    onClick={() => onSelectProduct(product.id)}
                    className={`w-full px-8 py-4 rounded-full text-lg font-semibold transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${colors.button} ${colors.ring} flex items-center justify-center group`}
                  >
                    Configure Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
              </div>
            );
          })}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-blue-900/30 rounded-2xl p-8 border border-blue-800">
            <h3 className="text-2xl font-bold text-white mb-4">Can't Decide?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Our team is here to help you customize the perfect smart glasses for your needs. 
              Schedule a free consultation to discuss your requirements and get personalized recommendations.
            </p>
            <button className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200">
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;