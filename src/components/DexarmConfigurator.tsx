import React, { useState } from 'react';
import { Hand, Cpu, Battery, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DexarmConfig {
  controlSystem: 'mechanical' | 'myoelectric';
  gripType: 'basic' | 'multi-grip' | 'precision';
  battery: 'standard' | 'extended';
  materials: {
    lightweightFrame: boolean;
    reinforcedJoints: boolean;
  };
}

const DexarmConfigurator: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState<DexarmConfig>({
    controlSystem: 'mechanical',
    gripType: 'basic',
    battery: 'standard',
    materials: { lightweightFrame: false, reinforcedJoints: false },
  });

  const pages = ['Control', 'Grip', 'Build'];

  const calculatePrice = () => {
    let price = 1000;
    if (config.controlSystem === 'myoelectric') price += 600;
    if (config.gripType === 'multi-grip') price += 300;
    if (config.gripType === 'precision') price += 500;
    if (config.battery === 'extended') price += 200;
    if (config.materials.lightweightFrame) price += 150;
    if (config.materials.reinforcedJoints) price += 200;
    return price;
  };

  const handleMaterialToggle = (key: keyof DexarmConfig['materials']) => {
    setConfig(prev => ({
      ...prev,
      materials: { ...prev.materials, [key]: !prev.materials[key] },
    }));
  };

  const goToNextPage = () => currentPage < pages.length - 1 && setCurrentPage(currentPage + 1);
  const goToPrevPage = () => currentPage > 0 && setCurrentPage(currentPage - 1);

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <button
          onClick={() => navigate('/product')} // update to actual product page route
          className="px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 flex items-center"
        >
          <ChevronLeft className="h-5 w-5 mr-2" /> Back to Product Page
        </button>
      </div>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
          Configure <span className="text-purple-400">Dexarm</span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Customize your prosthetic arm for control, strength, and daily reliability.
        </p>
      </div>

      {/* Page Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-900/90 backdrop-blur-md rounded-full p-2 border border-gray-700 flex justify-center">
          {pages.map((page, i) => (
            <button
              key={page}
              onClick={() => setCurrentPage(i)}
              className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                currentPage === i ? 'bg-purple-600 text-white' : 'text-gray-300 hover:text-purple-400'
              }`}
              style={{ zIndex: 1000, position: 'relative' }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Config Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              {/* Control Page */}
              {currentPage === 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Cpu className="h-8 w-8 text-purple-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Control System</h2>
                  </div>
                  {[
                    { id: 'mechanical', label: 'Mechanical', desc: 'Body-powered, durable, low maintenance', price: 'Included' },
                    { id: 'myoelectric', label: 'Myoelectric', desc: 'Muscle-signal controlled, natural movement', price: '+$600' },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setConfig(prev => ({ ...prev, controlSystem: opt.id as any }))}
                      className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                        config.controlSystem === opt.id ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{opt.label}</h3>
                          <p className="text-gray-300">{opt.desc}</p>
                          <span className="text-purple-400">{opt.price}</span>
                        </div>
                        {config.controlSystem === opt.id && <Check className="h-5 w-5 text-purple-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Grip Page */}
              {currentPage === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Hand className="h-8 w-8 text-purple-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Grip Type</h2>
                  </div>
                  {[
                    { id: 'basic', label: 'Basic Grip', price: 'Included' },
                    { id: 'multi-grip', label: 'Multi-Grip', price: '+$300' },
                    { id: 'precision', label: 'Precision Grip', price: '+$500' },
                  ].map(opt => (
                    <div
                      key={opt.id}
                      onClick={() => setConfig(prev => ({ ...prev, gripType: opt.id as any }))}
                      className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                        config.gripType === opt.id ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold text-white">{opt.label}</h3>
                          <span className="text-purple-400">{opt.price}</span>
                        </div>
                        {config.gripType === opt.id && <Check className="h-5 w-5 text-purple-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Build Page */}
              {currentPage === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Battery className="h-8 w-8 text-purple-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Build Options</h2>
                  </div>

                  <div
                    className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                      config.battery === 'extended' ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                    }`}
                    onClick={() =>
                      setConfig(prev => ({ ...prev, battery: prev.battery === 'standard' ? 'extended' : 'standard' }))
                    }
                  >
                    <h3 className="text-xl font-semibold text-white">Extended Battery (+$200)</h3>
                    <p className="text-gray-300">All-day usage without recharging</p>
                  </div>

                  {[
                    { key: 'lightweightFrame', label: 'Lightweight Frame (+$150)' },
                    { key: 'reinforcedJoints', label: 'Reinforced Joints (+$200)' },
                  ].map(opt => (
                    <div
                      key={opt.key}
                      className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                        config.materials[opt.key as keyof DexarmConfig['materials']] ? 'border-purple-500 bg-purple-900/20' : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleMaterialToggle(opt.key as keyof DexarmConfig['materials'])}
                    >
                      <h3 className="text-xl font-semibold text-white">{opt.label}</h3>
                    </div>
                  ))}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8 pt-8 border-t border-gray-700">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                    currentPage === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === pages.length - 1}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                    currentPage === pages.length - 1 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  Next
                  <ChevronRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Summary Panel */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800 sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-6">Configuration Summary</h3>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Control</h4>
                  <p className="text-white text-sm">{config.controlSystem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Grip</h4>
                  <p className="text-white text-sm">{config.gripType}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Battery</h4>
                  <p className="text-white text-sm">{config.battery}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Materials</h4>
                  {config.materials.lightweightFrame && <p className="text-white text-sm">Lightweight Frame (+$150)</p>}
                  {config.materials.reinforcedJoints && <p className="text-white text-sm">Reinforced Joints (+$200)</p>}
                  {!config.materials.lightweightFrame && !config.materials.reinforcedJoints && (
                    <p className="text-gray-400 text-sm">No upgrades selected</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6 flex justify-between items-center">
                <span className="text-xl font-semibold text-white">Total Price</span>
                <span className="text-3xl font-bold text-purple-400">${calculatePrice()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexarmConfigurator;
