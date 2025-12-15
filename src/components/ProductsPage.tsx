import React from 'react';
import { Eye, Shield, ChevronLeft, ArrowRight } from 'lucide-react';

interface ProductsPageProps {
  onBackToHome: () => void;
  onSelectProduct: (productId: string) => void;
  scrollToSection: (sectionId: string) => void;
}

const ProductsPage: React.FC<ProductsPageProps> = ({
  onBackToHome,
  onSelectProduct,
  scrollToSection,
}) => {
  const products = [
    {
      id: 'surrounding-scanner',
      name: 'The Surrounding Scanner',
      description:
        'A wearable system with a forward-facing camera and on-board AI that detects obstacles and provides real-time alerts.',
      startingPrice: 79,
      color: 'blue',
      icon: Eye,
      features: [
        'Front-facing AI camera for obstacle detection and object recognition',
        'Real-time spoken alerts delivered to a discreet earpiece',
        'Customizable lens options',
        'Optional vibration feedback & Bluetooth connectivity',
      ],
      available: true,
      configureTarget: 'surrounding-scanner',
    },
    {
      id: 'dexarm',
      name: 'Dexarm',
      description:
        'An affordable prosthetic arm designed to restore essential arm and hand functionality for everyday tasks.',
      startingPrice: 1000,
      color: 'purple',
      icon: Shield,
      features: [
        'Modular prosthetic arm with interchangeable grip attachments',
        'Lightweight, durable frame for daily use',
        'Intuitive control system optimized for reliability',
        'Designed for accessibility and long-term affordability',
      ],
      available: true,
      // IMPORTANT: routes to the Surrounding Scanner configurator
      configureTarget: 'surrounding-scanner',
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
        ring: 'focus:ring-gray-400',
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
          ring: 'focus:ring-blue-500',
        };
      case 'purple':
        return {
          bg: 'bg-purple-900/30',
          text: 'text-purple-400',
          border: 'border-gray-700',
          hoverBorder: 'hover:border-purple-500',
          button: 'bg-purple-600 hover:bg-purple-700 text-white',
          ring: 'focus:ring-purple-500',
        };
      default:
        return {
          bg: 'bg-gray-900/30',
          text: 'text-gray-400',
          border: 'border-gray-700',
          hoverBorder: 'hover:border-gray-600',
          button: 'bg-gray-600 hover:bg-gray-500 text-white',
          ring: 'focus:ring-gray-400',
        };
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <button
          onClick={onBackToHome}
          className="flex items-center text-gray-300 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>
      </div>

      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Choose Your <span className="text-blue-400">Assistive Tech</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Practical, affordable technology designed to restore independence and functionality.
        </p>
      </div>

      {/* Products */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => {
            const colors = getColorClasses(product.color, product.available);
            const Icon = product.icon;

            return (
              <div
                key={product.id}
                className={`bg-gray-800 rounded-xl p-8 border transition-colors ${colors.border} ${colors.hoverBorder}`}
              >
                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${colors.bg}`}>
                    <Icon className={`h-8 w-8 ${colors.text}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    {product.name}
                  </h3>
                  <p className="text-gray-300 mb-4">{product.description}</p>
                  <div className={`text-3xl font-bold ${colors.text}`}>
                    Starting at ${product.startingPrice}
                  </div>
                </div>

                <ul className="space-y-3 text-gray-300 mb-8">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span
                        className={`w-2 h-2 rounded-full mr-3 mt-2 ${colors.text.replace(
                          'text-',
                          'bg-'
                        )}`}
                      />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => onSelectProduct(product.configureTarget)}
                  className={`w-full px-8 py-4 rounded-full text-lg font-semibold transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 ${colors.button} ${colors.ring} flex items-center justify-center group`}
                >
                  Configure Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Consultation */}
        <div className="mt-16 text-center">
          <div className="bg-blue-900/30 rounded-2xl p-8 border border-blue-800">
            <h3 className="text-2xl font-bold text-white mb-4">
              Need Guidance?
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Talk to our team to determine the best solution for your needs.
            </p>
            <button
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              onClick={() => {
                onBackToHome();
                setTimeout(() => scrollToSection('contact'), 100);
              }}
            >
              Schedule Free Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
