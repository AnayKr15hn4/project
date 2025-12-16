import React, { useState } from 'react';
import {
  Battery,
  Armchair,
  Package,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react';

interface DexarmConfig {
  batteryType: 'standard' | 'spare';
  armSide: 'right' | 'left';
  extras: {
    cleaningKit: boolean;
  };
}

const BASE_PRICE = 1000;
const SPARE_BATTERY_PRICE = 200;
const CLEANING_KIT_PRICE = 50;

const DexarmConfigurator: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState<DexarmConfig>({
    batteryType: 'standard',
    armSide: 'right',
    extras: {
      cleaningKit: false,
    },
  });

  const pages = ['Battery', 'Arm', 'Extras'];

  const calculatePrice = () => {
    let price = BASE_PRICE;
    if (config.batteryType === 'spare') price += SPARE_BATTERY_PRICE;
    if (config.extras.cleaningKit) price += CLEANING_KIT_PRICE;
    return price;
  };

  const goToNextPage = () =>
    currentPage < pages.length - 1 && setCurrentPage(p => p + 1);
  const goToPrevPage = () =>
    currentPage > 0 && setCurrentPage(p => p - 1);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Hero */}
      <div className="max-w-6xl mx-auto px-4 mb-16 text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Configure <span className="text-blue-400">Dexarm</span>
        </h1>
        <p className="text-xl text-gray-300">
          Choose battery, arm orientation, and optional extras.
        </p>
      </div>

      {/* Page Navigation */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-gray-900 rounded-full p-2 border border-gray-700 flex justify-center">
          {pages.map((page, i) => (
            <button
              key={page}
              onClick={() => setCurrentPage(i)}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                currentPage === i
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-blue-400'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Config Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              {/* Battery */}
              {currentPage === 0 && (
                <>
                  <div className="flex items-center mb-6">
                    <Battery className="h-8 w-8 text-blue-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">
                      Battery Type
                    </h2>
                  </div>

                  {[
                    {
                      id: 'standard',
                      label: 'Standard Battery',
                      price: 'Included',
                    },
                    {
                      id: 'spare',
                      label: 'Spare Battery',
                      price: `+$${SPARE_BATTERY_PRICE}`,
                    },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() =>
                        setConfig(prev => ({
                          ...prev,
                          batteryType: opt.id as 'standard' | 'spare',
                        }))
                      }
                      className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                        config.batteryType === opt.id
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">
                            {opt.label}
                          </h3>
                          <span className="text-blue-400">{opt.price}</span>
                        </div>
                        {config.batteryType === opt.id && (
                          <Check className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Arm */}
              {currentPage === 1 && (
                <>
                  <div className="flex items-center mb-6">
                    <Armchair className="h-8 w-8 text-blue-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">
                      Arm Orientation
                    </h2>
                  </div>

                  {[
                    { id: 'right', label: 'Right Arm' },
                    { id: 'left', label: 'Left Arm' },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() =>
                        setConfig(prev => ({
                          ...prev,
                          armSide: opt.id as 'right' | 'left',
                        }))
                      }
                      className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                        config.armSide === opt.id
                          ? 'border-blue-500 bg-blue-900/20'
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">
                          {opt.label}
                        </h3>
                        {config.armSide === opt.id && (
                          <Check className="h-5 w-5 text-blue-400" />
                        )}
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* Extras */}
              {currentPage === 2 && (
                <>
                  <div className="flex items-center mb-6">
                    <Package className="h-8 w-8 text-blue-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">
                      Extras
                    </h2>
                  </div>

                  <div
                    onClick={() =>
                      setConfig(prev => ({
                        ...prev,
                        extras: {
                          cleaningKit: !prev.extras.cleaningKit,
                        },
                      }))
                    }
                    className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                      config.extras.cleaningKit
                        ? 'border-blue-500 bg-blue-900/20'
                        : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          Cleaning Kit
                        </h3>
                        <p className="text-gray-300">
                          Keep components clean and extend lifespan
                        </p>
                        <span className="text-blue-400">
                          +${CLEANING_KIT_PRICE}
                        </span>
                      </div>
                      {config.extras.cleaningKit && (
                        <Check className="h-5 w-5 text-blue-400" />
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-8 border-t border-gray-700">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className="px-6 py-3 rounded-full bg-gray-700 text-white disabled:opacity-40"
                >
                  <ChevronLeft className="inline mr-2" />
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === pages.length - 1}
                  className="px-6 py-3 rounded-full bg-blue-600 text-white disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="inline ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 sticky top-32">
            <h3 className="text-2xl font-bold text-white mb-6">
              Summary
            </h3>

            <p className="text-gray-300 mb-2">
              Battery:{' '}
              <span className="text-white">
                {config.batteryType}
              </span>
            </p>

            <p className="text-gray-300 mb-2">
              Arm:{' '}
              <span className="text-white">
                {config.armSide}
              </span>
            </p>

            <p className="text-gray-300 mb-6">
              Extras:{' '}
              <span className="text-white">
                {config.extras.cleaningKit ? 'Cleaning Kit' : 'None'}
              </span>
            </p>

            <div className="border-t border-gray-700 pt-6 flex justify-between">
              <span className="text-xl text-white">Total</span>
              <span className="text-3xl font-bold text-blue-400">
                ${calculatePrice()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexarmConfigurator;
