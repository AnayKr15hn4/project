import React, { useState } from 'react';
import { Eye, Camera, Radar, Zap, Bluetooth, Glasses, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface ConfigState {
  sensors: {
    basic: boolean;
    aiCamera: boolean;
    lidarHat: boolean;
  };
  features: {
    vibrationFeedback: boolean;
    bluetoothConnectivity: boolean;
  };
  lensType: 'fully-blocked' | 'polarized' | 'near-sighted' | 'far-sighted' | 'clear';
  polarized: boolean;
}

const ProductConfigurator: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState<ConfigState>({
    sensors: {
      basic: true,
      aiCamera: false,
      lidarHat: false,
    },
    features: {
      vibrationFeedback: false,
      bluetoothConnectivity: false,
    },
    lensType: 'clear',
    polarized: false,
  });

  const pages = ['Sensors', 'Features', 'Lens'];

  // Pricing logic
  const calculatePrice = () => {
    let basePrice = 499; // Base price for basic sensor
    
    if (config.sensors.aiCamera) basePrice += 200;
    if (config.sensors.lidarHat) basePrice += 300;
    if (config.features.vibrationFeedback) basePrice += 50;
    if (config.features.bluetoothConnectivity) basePrice += 75;
    
    // Lens upgrades
    if (config.lensType === 'polarized') basePrice += 100;
    else if (config.lensType === 'near-sighted' || config.lensType === 'far-sighted') basePrice += 150;
    else if (config.lensType === 'fully-blocked') basePrice += 80;
    
    if (config.polarized && config.lensType !== 'fully-blocked') basePrice += 100;
    
    return basePrice;
  };

  const handleSensorChange = (sensor: keyof ConfigState['sensors']) => {
    if (sensor === 'basic') {
      setConfig(prev => ({
        ...prev,
        sensors: { basic: true, aiCamera: false, lidarHat: false }
      }));
    } else {
      setConfig(prev => ({
        ...prev,
        sensors: {
          ...prev.sensors,
          basic: false,
          [sensor]: !prev.sensors[sensor]
        }
      }));
    }
  };

  const handleFeatureChange = (feature: keyof ConfigState['features']) => {
    setConfig(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature]
      }
    }));
  };

  const handleLensTypeChange = (lensType: ConfigState['lensType']) => {
    setConfig(prev => ({
      ...prev,
      lensType,
      polarized: lensType === 'fully-blocked' ? false : prev.polarized
    }));
  };

  const handlePolarizedChange = () => {
    if (config.lensType !== 'fully-blocked') {
      setConfig(prev => ({
        ...prev,
        polarized: !prev.polarized
      }));
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            The <span className="text-blue-400">Surrounding Scanner</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Configure your perfect smart glasses with advanced sensors, features, and lens options 
            tailored to your needs.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="bg-gray-900/90 backdrop-blur-md rounded-full p-2 border border-gray-700">
          <div className="flex justify-center">
            {pages.map((page, index) => (
              <button
                key={page}
                onClick={() => setCurrentPage(index)}
                className={`px-6 py-3 rounded-full font-medium transition-colors duration-200 ${
                  currentPage === index
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
                style={{ zIndex: 1000, position: 'relative' }}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              {/* Sensors Page */}
              {currentPage === 0 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Eye className="h-8 w-8 text-blue-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Choose Your Sensors</h2>
                  </div>
                  <p className="text-gray-300 mb-8">
                    Select the sensor technology that best fits your needs. You can combine multiple sensors for enhanced functionality.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Basic Sensor */}
                    <div 
                      className={`p-6 rounded-xl border-2 transition-colors cursor-pointer ${
                        config.sensors.basic 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleSensorChange('basic')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Eye className="h-8 w-8 text-blue-400 mr-4" />
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">Basic Sensor</h3>
                            <p className="text-gray-300">Standard proximity and light detection</p>
                            <span className="text-sm text-blue-400 font-medium">Included</span>
                          </div>
                        </div>
                        {config.sensors.basic && (
                          <Check className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                    </div>

                    {/* AI Camera */}
                    <div 
                      className={`p-6 rounded-xl border-2 transition-colors cursor-pointer ${
                        config.sensors.aiCamera 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleSensorChange('aiCamera')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Camera className="h-8 w-8 text-green-400 mr-4" />
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">AI Camera</h3>
                            <p className="text-gray-300">Object recognition and scene analysis</p>
                            <span className="text-sm text-green-400 font-medium">+$200</span>
                          </div>
                        </div>
                        {config.sensors.aiCamera && (
                          <Check className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                    </div>

                    {/* LIDAR Hat */}
                    <div 
                      className={`p-6 rounded-xl border-2 transition-colors cursor-pointer ${
                        config.sensors.lidarHat 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleSensorChange('lidarHat')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Radar className="h-8 w-8 text-purple-400 mr-4" />
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">LIDAR Hat</h3>
                            <p className="text-gray-300">3D spatial mapping and precise distance measurement</p>
                            <span className="text-sm text-purple-400 font-medium">+$300</span>
                          </div>
                        </div>
                        {config.sensors.lidarHat && (
                          <Check className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Features Page */}
              {currentPage === 1 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Zap className="h-8 w-8 text-blue-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Optional Features</h2>
                  </div>
                  <p className="text-gray-300 mb-8">
                    Enhance your experience with these optional features that can be toggled independently.
                  </p>
                  
                  <div className="space-y-6">
                    {/* Vibration Feedback */}
                    <div 
                      className={`p-6 rounded-xl border-2 transition-colors cursor-pointer ${
                        config.features.vibrationFeedback 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleFeatureChange('vibrationFeedback')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Zap className="h-8 w-8 text-yellow-400 mr-4" />
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">Vibration Feedback</h3>
                            <p className="text-gray-300">Haptic alerts and notifications through frame vibration</p>
                            <span className="text-sm text-yellow-400 font-medium">+$50</span>
                          </div>
                        </div>
                        {config.features.vibrationFeedback && (
                          <Check className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                    </div>

                    {/* Bluetooth Connectivity */}
                    <div 
                      className={`p-6 rounded-xl border-2 transition-colors cursor-pointer ${
                        config.features.bluetoothConnectivity 
                          ? 'border-blue-500 bg-blue-900/20' 
                          : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                      }`}
                      onClick={() => handleFeatureChange('bluetoothConnectivity')}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Bluetooth className="h-8 w-8 text-cyan-400 mr-4" />
                          <div>
                            <h3 className="text-xl font-semibold text-white mb-1">Bluetooth Connectivity</h3>
                            <p className="text-gray-300">Connect to smartphones and other devices wirelessly</p>
                            <span className="text-sm text-cyan-400 font-medium">+$75</span>
                          </div>
                        </div>
                        {config.features.bluetoothConnectivity && (
                          <Check className="h-6 w-6 text-blue-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Lens Page */}
              {currentPage === 2 && (
                <div>
                  <div className="flex items-center mb-6">
                    <Glasses className="h-8 w-8 text-blue-400 mr-3" />
                    <h2 className="text-3xl font-bold text-white">Lens Configuration</h2>
                  </div>
                  <p className="text-gray-300 mb-8">
                    Choose your lens type and optional polarization for optimal vision and comfort.
                  </p>
                  
                  <div className="space-y-8">
                    {/* Lens Type Selection */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Lens Type (choose one)</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {[
                          { value: 'clear', label: 'Clear', description: 'No vision correction', price: 'Included' },
                          { value: 'near-sighted', label: 'Near-sighted', description: 'Corrective lenses for myopia', price: '+$150' },
                          { value: 'far-sighted', label: 'Far-sighted', description: 'Corrective lenses for hyperopia', price: '+$150' },
                          { value: 'fully-blocked', label: 'Fully Blocked', description: 'Complete light blocking for privacy', price: '+$80' },
                        ].map((lens) => (
                          <div
                            key={lens.value}
                            className={`p-4 rounded-xl border-2 transition-colors cursor-pointer ${
                              config.lensType === lens.value
                                ? 'border-blue-500 bg-blue-900/20'
                                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                            }`}
                            onClick={() => handleLensTypeChange(lens.value as ConfigState['lensType'])}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-white mb-1">{lens.label}</h4>
                                <p className="text-gray-300 text-sm mb-1">{lens.description}</p>
                                <span className="text-sm text-blue-400 font-medium">{lens.price}</span>
                              </div>
                              {config.lensType === lens.value && (
                                <Check className="h-5 w-5 text-blue-400" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Polarized Option */}
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-4">Additional Options</h3>
                      <div 
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          config.lensType === 'fully-blocked'
                            ? 'border-gray-700 bg-gray-800/50 opacity-50 cursor-not-allowed'
                            : `cursor-pointer ${
                                config.polarized 
                                  ? 'border-blue-500 bg-blue-900/20' 
                                  : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                              }`
                        }`}
                        onClick={handlePolarizedChange}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white mb-1">Polarized Coating</h4>
                            <p className="text-gray-300 text-sm mb-1">
                              Reduce glare and improve visual comfort
                              {config.lensType === 'fully-blocked' && ' (Not available with fully blocked lenses)'}
                            </p>
                            <span className="text-sm text-blue-400 font-medium">+$100</span>
                          </div>
                          {config.polarized && config.lensType !== 'fully-blocked' && (
                            <Check className="h-5 w-5 text-blue-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-8 border-t border-gray-700">
                <button
                  onClick={goToPrevPage}
                  disabled={currentPage === 0}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                    currentPage === 0
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-600'
                  }`}
                  style={{ zIndex: 1000, position: 'relative' }}
                >
                  <ChevronLeft className="h-5 w-5 mr-2" />
                  Previous
                </button>
                
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === pages.length - 1}
                  className={`flex items-center px-6 py-3 rounded-full font-medium transition-colors ${
                    currentPage === pages.length - 1
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  style={{ zIndex: 1000, position: 'relative' }}
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
                {/* Sensors */}
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Sensors</h4>
                  {config.sensors.basic && !config.sensors.aiCamera && !config.sensors.lidarHat && (
                    <p className="text-white text-sm">Basic Sensor</p>
                  )}
                  {config.sensors.aiCamera && (
                    <p className="text-white text-sm">AI Camera (+$200)</p>
                  )}
                  {config.sensors.lidarHat && (
                    <p className="text-white text-sm">LIDAR Hat (+$300)</p>
                  )}
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Features</h4>
                  {config.features.vibrationFeedback && (
                    <p className="text-white text-sm">Vibration Feedback (+$50)</p>
                  )}
                  {config.features.bluetoothConnectivity && (
                    <p className="text-white text-sm">Bluetooth Connectivity (+$75)</p>
                  )}
                  {!config.features.vibrationFeedback && !config.features.bluetoothConnectivity && (
                    <p className="text-gray-400 text-sm">No additional features</p>
                  )}
                </div>

                {/* Lens */}
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Lens</h4>
                  <p className="text-white text-sm">
                    {config.lensType.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                    {config.lensType === 'clear' && ' (Included)'}
                    {config.lensType === 'fully-blocked' && ' (+$80)'}
                    {(config.lensType === 'near-sighted' || config.lensType === 'far-sighted') && ' (+$150)'}
                  </p>
                  {config.polarized && config.lensType !== 'fully-blocked' && (
                    <p className="text-white text-sm">Polarized Coating (+$100)</p>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-700 pt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-white">Total Price</span>
                  <span className="text-3xl font-bold text-blue-400">${calculatePrice()}</span>
                </div>
                
                <button 
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                  style={{ zIndex: 1000, position: 'relative' }}
                >
                  Add to Cart
                </button>
                
                <p className="text-gray-400 text-sm text-center mt-4">
                  Free shipping • 30-day return policy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductConfigurator;