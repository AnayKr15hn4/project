import React, { useState } from 'react';
import { Hand, Cpu, Battery, ChevronLeft, ChevronRight, Check } from 'lucide-react';

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
  const [currentPage, setCurrentPage] = useState(0);
  const [config, setConfig] = useState<DexarmConfig>({
    controlSystem: 'mechanical',
    gripType: 'basic',
    battery: 'standard',
    materials: {
      lightweightFrame: false,
      reinforcedJoints: false,
    },
  });

  const pages = ['Control', 'Grip', 'Build'];

  const calculatePrice = () => {
    let price = 1000; // base Dexarm price

    if (config.controlSystem === 'myoelectric') price += 600;
    if (config.gripType === 'multi-grip') price += 300;
    if (config.gripType === 'precision') price += 500;
    if (config.battery === 'extended') price += 200;
    if (config.materials.lightweightFrame) price += 150;
    if (config.materials.reinforcedJoints) price += 200;

    return price;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <h1 className="text-5xl font-bold mb-4">
        Configure <span className="text-purple-400">Dexarm</span>
      </h1>
      <p className="text-gray-400 mb-10 max-w-2xl">
        Customize your prosthetic arm for control, strength, and daily reliability.
      </p>

      {/* Page selector */}
      <div className="flex space-x-2 mb-10">
        {pages.map((p, i) => (
          <button
            key={p}
            onClick={() => setCurrentPage(i)}
            className={`px-6 py-2 rounded-full ${
              currentPage === i
                ? 'bg-purple-600'
                : 'bg-gray-800 hover:bg-gray-700'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Config panel */}
        <div className="lg:col-span-2 bg-gray-900 p-8 rounded-2xl border border-gray-800">
          {/* Control */}
          {currentPage === 0 && (
            <>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Cpu className="mr-3 text-purple-400" /> Control System
              </h2>

              {[
                {
                  id: 'mechanical',
                  label: 'Mechanical',
                  desc: 'Body-powered, durable, low maintenance',
                  price: 'Included',
                },
                {
                  id: 'myoelectric',
                  label: 'Myoelectric',
                  desc: 'Muscle-signal controlled, natural movement',
                  price: '+$600',
                },
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() =>
                    setConfig(prev => ({ ...prev, controlSystem: opt.id as any }))
                  }
                  className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                    config.controlSystem === opt.id
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{opt.label}</h3>
                      <p className="text-gray-400">{opt.desc}</p>
                      <span className="text-purple-400">{opt.price}</span>
                    </div>
                    {config.controlSystem === opt.id && <Check />}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Grip */}
          {currentPage === 1 && (
            <>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Hand className="mr-3 text-purple-400" /> Grip Type
              </h2>

              {[
                { id: 'basic', label: 'Basic Grip', price: 'Included' },
                { id: 'multi-grip', label: 'Multi-Grip', price: '+$300' },
                { id: 'precision', label: 'Precision Grip', price: '+$500' },
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() =>
                    setConfig(prev => ({ ...prev, gripType: opt.id as any }))
                  }
                  className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                    config.gripType === opt.id
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{opt.label}</h3>
                      <span className="text-purple-400">{opt.price}</span>
                    </div>
                    {config.gripType === opt.id && <Check />}
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Build */}
          {currentPage === 2 && (
            <>
              <h2 className="text-3xl font-bold mb-6 flex items-center">
                <Battery className="mr-3 text-purple-400" /> Build Options
              </h2>

              <div
                className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                  config.battery === 'extended'
                    ? 'border-purple-500 bg-purple-900/20'
                    : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                }`}
                onClick={() =>
                  setConfig(prev => ({
                    ...prev,
                    battery:
                      prev.battery === 'standard' ? 'extended' : 'standard',
                  }))
                }
              >
                <h3 className="text-xl font-semibold">Extended Battery (+$200)</h3>
                <p className="text-gray-400">All-day usage without recharging</p>
              </div>

              {[
                { key: 'lightweightFrame', label: 'Lightweight Frame (+$150)' },
                { key: 'reinforcedJoints', label: 'Reinforced Joints (+$200)' },
              ].map(opt => (
                <div
                  key={opt.key}
                  onClick={() =>
                    setConfig(prev => ({
                      ...prev,
                      materials: {
                        ...prev.materials,
                        [opt.key]:
                          !prev.materials[opt.key as keyof DexarmConfig['materials']],
                      },
                    }))
                  }
                  className={`p-6 mb-4 rounded-xl border-2 cursor-pointer ${
                    config.materials[opt.key as keyof DexarmConfig['materials']]
                      ? 'border-purple-500 bg-purple-900/20'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <h3 className="text-xl font-semibold">{opt.label}</h3>
                </div>
              ))}
            </>
          )}

          {/* Nav */}
          <div className="flex justify-between mt-10">
            <button
              disabled={currentPage === 0}
              onClick={() => setCurrentPage(p => p - 1)}
              className="px-6 py-3 bg-gray-800 rounded-full disabled:opacity-40"
            >
              <ChevronLeft />
            </button>
            <button
              disabled={currentPage === pages.length - 1}
              onClick={() => setCurrentPage(p => p + 1)}
              className="px-6 py-3 bg-purple-600 rounded-full disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 sticky top-32">
          <h3 className="text-2xl font-bold mb-6">Summary</h3>
          <p className="text-gray-300 mb-2">Control: {config.controlSystem}</p>
          <p className="text-gray-300 mb-2">Grip: {config.gripType}</p>
          <p className="text-gray-300 mb-2">Battery: {config.battery}</p>

          <div className="border-t border-gray-700 mt-6 pt-4">
            <span className="text-xl">Total</span>
            <div className="text-3xl font-bold text-purple-400">
              ${calculatePrice()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DexarmConfigurator;
