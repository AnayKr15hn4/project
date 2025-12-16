import React, { useState, useEffect, useRef } from 'react';
import { Eye, ArrowLeft, Zap, Shield, Wifi, Battery } from 'lucide-react';

const ModernProductPage = ({ onBackToHome }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const headingRefs = useRef([]);

  useEffect(() => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
    
    const handleMouseOver = (event) => {
      let iterations = 0;
      const target = event.currentTarget;
      const originalText = target.dataset.value;
      
      const interval = setInterval(() => {
        target.innerText = originalText.split("")
          .map((letter, index) => {
            if (index < iterations) {
              return originalText[index];
            }
            return letters[Math.floor(Math.random() * 36)];
          })
          .join("");
        
        if (iterations >= originalText.length) clearInterval(interval);
        iterations += 1 / 3;
      }, 30);
    };

    headingRefs.current.forEach((heading) => {
      if (heading) {
        heading.addEventListener('mouseover', handleMouseOver);
      }
    });

    return () => {
      headingRefs.current.forEach((heading) => {
        if (heading) {
          heading.removeEventListener('mouseover', handleMouseOver);
        }
      });
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !headingRefs.current.includes(el)) {
      headingRefs.current.push(el);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s backwards;
        }

        .animate-slide-up-delay {
          animation: slide-up 1s ease-out 0.6s backwards;
        }

        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>

      {/* Subtle Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </button>
          
          <div className="flex items-center gap-2">
            <Eye className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-bold">VividSense</span>
          </div>
        </div>
      </nav>

      {/* Hero Section with Video */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
            className="w-full h-full object-cover opacity-40"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-44633-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        {/* Animated Text Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-6">
          <div className="text-center space-y-8 animate-fade-in">
            <h1 
              ref={addToRefs}
              data-value="VIVIDSENSE PRO"
              className="text-6xl md:text-8xl font-bold tracking-tight cursor-pointer"
            >
              VIVIDSENSE PRO
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto animate-slide-up">
              Next-generation smart glasses for enhanced independence
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up-delay">
              <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105">
                Configure Now
              </button>
              <button className="border border-gray-600 hover:border-gray-400 px-8 py-4 rounded-full font-semibold transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 animate-bounce">
            <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-gray-500 rounded-full animate-scroll"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 
            ref={addToRefs}
            data-value="REVOLUTIONARY FEATURES"
            className="text-4xl md:text-6xl font-bold text-center mb-20 cursor-pointer"
          >
            REVOLUTIONARY FEATURES
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Zap, title: 'INSTANT DETECTION', desc: 'Real-time obstacle recognition with sub-second processing' },
              { icon: Shield, title: 'ADVANCED SAFETY', desc: 'Multi-layer protection with haptic feedback alerts' },
              { icon: Wifi, title: 'CLOUD SYNC', desc: 'Seamless updates and data synchronization' },
              { icon: Battery, title: '24HR BATTERY', desc: 'All-day power with fast charging support' }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gray-900/50 backdrop-blur border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity"></div>
                <feature.icon className="w-12 h-12 text-blue-500 mb-6 group-hover:scale-110 transition-transform" />
                <h3 
                  ref={addToRefs}
                  data-value={feature.title}
                  className="text-xl font-bold mb-4 cursor-pointer"
                >
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 
                ref={addToRefs}
                data-value="DESIGNED FOR LIFE"
                className="text-4xl md:text-5xl font-bold cursor-pointer"
              >
                DESIGNED FOR LIFE
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                Every detail crafted with precision. Every feature tested for real-world performance. The VividSense Pro isn't just technology—it's freedom.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">Lightweight Design</h4>
                    <p className="text-gray-400">Only 45g with titanium frame construction</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">Water Resistant</h4>
                    <p className="text-gray-400">IP67 rated for all-weather reliability</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold mb-2">Prescription Compatible</h4>
                    <p className="text-gray-400">Works with your existing prescription lenses</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700 flex items-center justify-center">
                <div className="text-gray-600 text-center">
                  <Eye className="w-32 h-32 mx-auto mb-4 opacity-20" />
                  <p className="text-sm">Product Image</p>
                </div>
              </div>
              <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 
            ref={addToRefs}
            data-value="EXPERIENCE FREEDOM"
            className="text-4xl md:text-6xl font-bold cursor-pointer"
          >
            EXPERIENCE FREEDOM
          </h2>
          <p className="text-xl text-gray-300">
            Join thousands who've transformed their daily lives with VividSense Pro
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 px-12 py-5 rounded-full text-lg font-semibold transition-all transform hover:scale-105 shadow-lg shadow-blue-500/50">
            Order Now - $999
          </button>
        </div>
      </section>
    </div>
  );
};

export default ModernProductPage;