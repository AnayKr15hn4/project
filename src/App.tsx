import React from 'react';
import { useEffect } from 'react';
import { Eye, Navigation, Shield, Users, Star, Phone, Mail, MapPin, ChevronRight } from 'lucide-react';
import ProductConfigurator from './components/ProductConfigurator';
import ProductsPage from './components/ProductsPage';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  firstName: string;
  type: 'application' | 'contact';
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, firstName, type }) => {
  if (!isOpen) return null;

  const isApplication = type === 'application';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[99999] p-4">
      <div className={`bg-gray-900 rounded-2xl p-8 border border-gray-700 relative overflow-hidden ${
        isApplication ? 'w-full h-full max-w-none max-h-none' : 'max-w-md w-full'
      }`}>
        {/* Confetti Animation */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(isApplication ? 100 : 30)].map((_, i) => (
            <div
              key={i}
              className={`absolute rounded-full ${
                i % 6 === 0 ? 'bg-blue-400 w-3 h-3' : 
                i % 6 === 1 ? 'bg-blue-500 w-2 h-2' : 
                i % 6 === 2 ? 'bg-blue-600 w-4 h-4' :
                i % 6 === 3 ? 'bg-blue-300 w-2 h-2' :
                i % 6 === 4 ? 'bg-blue-700 w-3 h-3' :
                'bg-blue-800 w-2 h-2'
              } ${
                isApplication ? 'animate-pulse' : 'animate-bounce'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${isApplication ? -10 + Math.random() * 120 : Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${isApplication ? 2 + Math.random() * 4 : 1 + Math.random() * 2}s`,
                ...(isApplication && {
                  transform: `translateY(${Math.random() * 50}px)`,
                  animation: `fall ${3 + Math.random() * 4}s linear infinite`
                })
              }}
            />
          ))}
          {isApplication && (
            <>
              <style>{`
                @keyframes fall {
                  0% {
                    transform: translateY(-100vh) rotate(0deg);
                  }
                  100% {
                    transform: translateY(100vh) rotate(360deg);
                  }
                }
              `}</style>
            </>
          )}
        </div>

        <div className={`text-center relative z-10 ${isApplication ? 'h-full flex flex-col justify-center' : ''}`}>
          <div className={`bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6 ${
            isApplication ? 'w-24 h-24' : 'w-16 h-16'
          }`}>
            <Eye className={`text-blue-400 ${isApplication ? 'h-12 w-12' : 'h-8 w-8'}`} />
          </div>
          
          <h2 className={`font-bold text-white mb-6 ${isApplication ? 'text-4xl md:text-5xl' : 'text-2xl mb-4'}`}>
            Thank You, {firstName}! 🎉
          </h2>
          
          <p className={`text-gray-300 mb-8 leading-relaxed ${
            isApplication ? 'text-xl max-w-2xl mx-auto' : ''
          }`}>
            {isApplication 
              ? "Your application has been submitted successfully! We're excited to review your submission and will get back to you within 5 business days."
              : "Your message has been received! We appreciate you reaching out and will respond within 24 hours."
            }
          </p>
          
          <div className={`bg-blue-900/20 rounded-lg border border-blue-800 mb-8 ${
            isApplication ? 'p-6 max-w-xl mx-auto' : 'p-4 mb-6'
          }`}>
            <p className={`text-blue-200 ${isApplication ? 'text-base' : 'text-sm'}`}>
              {isApplication 
                ? "Keep an eye on your email for updates about your application status."
                : "We'll send our response to the email address you provided."
              }
            </p>
          </div>
          
          <button
            onClick={onClose}
            className={`bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
              isApplication ? 'px-12 py-4 text-lg max-w-sm mx-auto block' : 'w-full px-8 py-3'
            }`}
          >
            Continue Exploring
          </button>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [currentView, setCurrentView] = React.useState<'home' | 'product' | 'products'>('home');
  const [successModal, setSuccessModal] = React.useState<{
    isOpen: boolean;
    firstName: string;
    type: 'application' | 'contact';
  }>({
    isOpen: false,
    firstName: '',
    type: 'application'
  });

  // Scroll animation effect
 useEffect(() => {
  // Re-trigger scroll animations when component mounts
  const animatedElements = document.querySelectorAll(
    '.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale'
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  animatedElements.forEach((el) => {
    observer.observe(el);
  });

  // Cleanup
  return () => {
    animatedElements.forEach((el) => {
      observer.unobserve(el);
    });
  };
}, [currentView]); // Re-run when currentView changes

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleProductDetails = () => {
    alert('Product details page coming soon! Contact us for more information.');
  };

  const handleMoreProducts = () => {
    setCurrentView('products');
  };

  const handleSelectProduct = (productId: string) => {
    // For now, only "surrounding-scanner" goes to configurator
    // Other products can be handled here when their configurators are ready
    if (productId === 'surrounding-scanner') {
      setCurrentView('product');
    } else {
      alert(`${productId} configurator coming soon! Contact us for early access.`);
    }
  };

  // Application form removed in favor of Google Form link

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const firstName = (data.firstName as string) || 'there';
    
    setSuccessModal({
      isOpen: true,
      firstName,
      type: 'contact'
    });
    
    e.currentTarget.reset();
  };

  const closeSuccessModal = () => {
    setSuccessModal({
      isOpen: false,
      firstName: '',
      type: 'application'
    });
  };
  if (currentView === 'product') {
    return (
      <div className="min-h-screen bg-black">
        {/* Header for Product Page */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
          <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-700 rounded-full px-6 py-3">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setCurrentView('home')}
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none"
              >
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold text-white">VividSense</span>
              </button>
              
              <div className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  Home
                </button>
                <span className="text-blue-400 font-medium">
                  Product
                </span>
              </div>


            </div>
          </nav>
        </header>

        <ProductConfigurator />
      </div>
    );
  }

  if (currentView === 'products') {
    return (
      <div className="min-h-screen bg-black">
        {/* Header for Products Page */}
        <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-4xl px-4">
          <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-700 rounded-full px-6 py-3">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setCurrentView('home')}
                className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none"
              >
                <Eye className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-2xl font-bold text-white">VividSense</span>
              </button>
              
              <div className="hidden md:flex space-x-8">
                <button 
                  onClick={() => setCurrentView('home')}
                  className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  Home
                </button>
                <span className="text-blue-400 font-medium">
                  Products
                </span>
              </div>


            </div>
          </nav>
        </header>

        <ProductsPage 
          onBackToHome={() => setCurrentView('home')} 
          onSelectProduct={handleSelectProduct}
          scrollToSection={scrollToSection}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
<header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[999999] w-full max-w-4xl px-4">

        <nav className="bg-gray-900/90 backdrop-blur-md shadow-lg border border-gray-700 rounded-full px-6 py-3" role="navigation" aria-label="Main navigation">
          <div className="flex justify-between items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200 bg-transparent border-none"
            >
              <Eye className="h-8 w-8 text-blue-600 mr-3" aria-hidden="true" />
              <span className="text-2xl font-bold text-white">VividSense</span>
            </button>
            
            <div className="hidden md:flex space-x-8">
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                About Us
              </button>
              <button 
                onClick={() => scrollToSection('product')}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                Product
              </button>
              <button 
                onClick={() => scrollToSection('updates')}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                Updates
              </button>
              <button 
                onClick={() => scrollToSection('apply')}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 bg-transparent border-none cursor-pointer"
              >
                Apply
              </button>
            </div>



          </div>
        </nav>
      </header>

     {/* Hero Section */}
<section id="hero" className="relative bg-gradient-to-b from-gray-900 to-black min-h-screen flex items-center justify-center pt-20 overflow-hidden" role="banner">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-blue-800/10"></div>
  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl"></div>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
    <h1 className="scroll-animate text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ transitionDelay: '0ms' }}>
      Navigate the World with 
      <span className="text-blue-400"> Confidence</span>
    </h1>
    
    <p className="scroll-animate text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ transitionDelay: '200ms' }}>
      Our smart glasses use a forward-facing camera and on-device AI to detect obstacles, recognize objects,
      and deliver clear spoken alerts through a discreet earpiece, helping users navigate safely and independently.
    </p>

    <div className="scroll-animate flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ transitionDelay: '400ms' }}>
      <button 
        className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
        aria-label="Learn more about VIVIDSENSE smart glasses"
        onClick={() => scrollToSection('product')}
        style={{ position: 'relative', zIndex: 9999 }}
      >
        Discover How It Works
        <ChevronRight className="inline ml-2 h-5 w-5" aria-hidden="true" />
      </button>
    </div>

  </div>
</section>

     {/* About Us */}
<section id="about" className="py-20 bg-gray-900">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 scroll-animate">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        About VividSense
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        We are dedicated to empowering independence through innovative assistive technology. 
        Our mission is to enhance mobility and confidence for the visually impaired community worldwide.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="scroll-animate text-center" style={{ transitionDelay: '0ms' }}>
        <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Users className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
        <p className="text-gray-300">
          To create technology that breaks down barriers and enables everyone 
          to navigate the world with confidence and independence.
        </p>
      </div>

      <div className="scroll-animate text-center" style={{ transitionDelay: '150ms' }}>
        <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Eye className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Our Vision</h3>
        <p className="text-gray-300">
          A world where visual impairment doesn't limit anyone's ability to 
          explore, work, and live life to the fullest.
        </p>
      </div>

      <div className="scroll-animate text-center" style={{ transitionDelay: '300ms' }}>
        <div className="bg-blue-900/30 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="h-8 w-8 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-3">Our Values</h3>
        <p className="text-gray-300">
          Innovation, accessibility, and user-centered design drive everything we do. 
          We believe technology should adapt to people, not the other way around.
        </p>
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-16">
      <div className="scroll-animate-left bg-gray-800 p-8 rounded-xl border border-gray-700" style={{ transitionDelay: '0ms' }}>
        <div className="bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Users className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Community-Driven Development</h3>
        <p className="text-gray-300 mb-4">
          We work closely with orientation and mobility specialists, accessibility advocates, 
          and users to ensure our technology meets real-world needs.
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Regular user feedback sessions
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Partnership with accessibility organizations
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            Continuous improvement based on real usage
          </li>
        </ul>
      </div>

      <div className="scroll-animate-right bg-gray-800 p-8 rounded-xl border border-gray-700" style={{ transitionDelay: '200ms' }}>
        <div className="bg-blue-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Privacy & Security First</h3>
        <p className="text-gray-300 mb-4">
          Your privacy is paramount. All processing happens locally on the device, 
          ensuring your personal information and location data remain secure.
        </p>
        <ul className="space-y-2 text-gray-300">
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            No data transmitted to external servers
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            End-to-end encryption for all communications
          </li>
          <li className="flex items-start">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
            GDPR and accessibility compliance
          </li>
        </ul>
      </div>
    </div>

    <div className="scroll-animate text-center bg-blue-900/30 rounded-2xl p-8 border border-blue-800">
      <h3 className="text-2xl font-bold text-white mb-4">Our Goals</h3>
      <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
        We're committed to achieving ambitious milestones that will transform accessibility 
        and independence for the visually impaired community worldwide.
      </p>
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="text-3xl font-bold text-blue-400 mb-2">100K+</div>
          <div className="text-gray-300">Users by 2027</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
          <div className="text-gray-300">Countries served</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-400 mb-2">24/7</div>
          <div className="text-gray-300">Support availability</div>
        </div>
        <div>
          <div className="text-3xl font-bold text-blue-400 mb-2">$79</div>
          <div className="text-gray-300">Affordable pricing</div>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Product */}
<section id="product" className="relative py-20 bg-black overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/15 via-transparent to-blue-700/10"></div>
  <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-600/8 rounded-full blur-3xl"></div>
  <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-blue-500/12 rounded-full blur-3xl"></div>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 scroll-animate">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Products
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Discover our innovative smart glasses and assistive technology solutions designed 
        to enhance independence and mobility for the visually impaired community.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      <div className="scroll-animate-scale bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800" style={{ transitionDelay: '0ms' }}>
        <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Navigation className="h-6 w-6 text-green-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">GPS Navigation</h3>
        <p className="text-gray-300 text-sm">
          Turn-by-turn directions with obstacle detection and safe route optimization.
        </p>
      </div>

      <div className="scroll-animate-scale bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800" style={{ transitionDelay: '100ms' }}>
        <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Eye className="h-6 w-6 text-purple-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Object Recognition</h3>
        <p className="text-gray-300 text-sm">
          Instant identification of people, objects, and obstacles using a forward-facing camera; spoken alerts are delivered via a discreet earpiece.
        </p>
      </div>

      <div className="scroll-animate-scale bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800" style={{ transitionDelay: '200ms' }}>
        <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Users className="h-6 w-6 text-blue-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Text Reading</h3>
        <p className="text-gray-300 text-sm">
          Read signs, menus, documents, and labels aloud in natural voice.
        </p>
      </div>

      <div className="scroll-animate-scale bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-800" style={{ transitionDelay: '300ms' }}>
        <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
          <Shield className="h-6 w-6 text-orange-600" aria-hidden="true" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Safety Alerts</h3>
        <p className="text-gray-300 text-sm">
          Proactive spoken warnings about low-hanging objects, steps, and potential hazards delivered through the earpiece.
        </p>
      </div>
    </div>

    <div className="mt-16 scroll-animate bg-gray-900 rounded-2xl p-8 shadow-sm border border-gray-800">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="scroll-animate-left">
          <h3 className="text-2xl font-bold text-white mb-6">
            VividSense Pro Smart Glasses
          </h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Experience the future of assistive technology with our flagship smart glasses. 
            Combining cutting-edge AI with elegant design for seamless daily use.
          </p>
          <p className="text-gray-300 mb-6 leading-relaxed">
            A forward-facing camera and on-device AI detect obstacles in real time and notify the wearer with clear spoken alerts through a discreet earpiece or optional bone-conduction audio.
          </p>
          <div className="space-y-3 text-gray-300 mb-8">
            <div className="flex items-center">
              <Eye className="h-5 w-5 text-blue-400 mr-3" aria-hidden="true" />
              <span>Advanced computer vision & AI processing</span>
            </div>
            <div className="flex items-center">
              <Navigation className="h-5 w-5 text-blue-400 mr-3" aria-hidden="true" />
              <span>Real-time GPS navigation with obstacle detection</span>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-400 mr-3" aria-hidden="true" />
              <span>Text reading & object recognition</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              onClick={() => setCurrentView('product')}
              style={{ position: 'relative', zIndex: 9999 }}
            >
              Configure Product
            </button>
            <button 
              className="bg-gray-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-gray-600 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900 border border-gray-600"
              onClick={handleMoreProducts}
              style={{ position: 'relative', zIndex: 9999 }}
            >
              View All Products
            </button>
          </div>
        </div>
        
        <div className="relative scroll-animate-right">
          <div className="bg-gray-800 aspect-square rounded-lg flex items-center justify-center border border-gray-700 overflow-hidden">
            <div className="text-center p-8">
              <Eye className="h-16 w-16 text-blue-400 mx-auto mb-4" aria-hidden="true" />
              <h4 className="text-white font-semibold mb-2">The Surrounding Scanner</h4>
              <p className="text-gray-400 text-sm">Smart Glasses Configurator</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

{/* Updates */}
<section id="updates" className="py-20 bg-gray-900">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 scroll-animate">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Latest Updates
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Stay informed about our latest developments, feature releases, and community milestones.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mb-16">
      <div className="scroll-animate bg-gray-800 p-6 rounded-xl border border-gray-700" style={{ transitionDelay: '0ms' }}>
        <div className="flex items-center mb-4">
          <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Star className="h-5 w-5 text-green-600" aria-hidden="true" />
          </div>
          <span className="text-sm text-gray-400">March 2025</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">AI Recognition Update</h3>
        <p className="text-gray-300 text-sm">
          Enhanced object recognition with 40% improved accuracy and support for 200+ new object categories.
        </p>
      </div>

      <div className="scroll-animate bg-gray-800 p-6 rounded-xl border border-gray-700" style={{ transitionDelay: '150ms' }}>
        <div className="flex items-center mb-4">
          <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Navigation className="h-5 w-5 text-blue-600" aria-hidden="true" />
          </div>
          <span className="text-sm text-gray-400">February 2025</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Indoor Navigation</h3>
        <p className="text-gray-300 text-sm">
          New indoor mapping technology now available in 500+ shopping centers and public buildings.
        </p>
      </div>

      <div className="scroll-animate bg-gray-800 p-6 rounded-xl border border-gray-700" style={{ transitionDelay: '300ms' }}>
        <div className="flex items-center mb-4">
          <div className="bg-purple-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <Users className="h-5 w-5 text-purple-600" aria-hidden="true" />
          </div>
          <span className="text-sm text-gray-400">January 2025</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Community Milestone</h3>
        <p className="text-gray-300 text-sm">
          Reached 10,000 active users worldwide with 98% satisfaction rate and 15M+ safe navigation miles.
        </p>
      </div>
    </div>

    <div className="scroll-animate-scale bg-blue-900/30 rounded-2xl p-8 border border-blue-800">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">Coming Soon</h3>
        <p className="text-gray-300">Exciting features in development</p>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="flex items-center">
          <div className="bg-yellow-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
            <Eye className="h-4 w-4 text-yellow-600" aria-hidden="true" />
          </div>
          <span className="text-gray-300">Multi-language support (12 languages)</span>
        </div>
        <div className="flex items-center">
          <div className="bg-green-100 w-8 h-8 rounded-full flex items-center justify-center mr-3">
            <Shield className="h-4 w-4 text-green-600" aria-hidden="true" />
          </div>
          <span className="text-gray-300">Advanced weather detection</span>
        </div>
      </div>
    </div>
  </div>
</section>

     {/* Apply */}
<section id="apply" className="relative py-20 bg-black overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-bl from-blue-800/12 via-transparent to-blue-900/8"></div>
  <div className="absolute top-1/4 left-1/5 w-80 h-80 bg-blue-600/6 rounded-full blur-3xl"></div>
  <div className="absolute bottom-1/3 right-1/5 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16 scroll-animate">
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Join Our Team
      </h2>
      <p className="text-xl text-gray-300 max-w-3xl mx-auto">
        Help us build the future of assistive technology. We're looking for passionate individuals 
        who want to make a meaningful impact on accessibility and independence.
      </p>
    </div>

    <div className="scroll-animate-scale bg-gray-900 rounded-2xl p-8 border border-gray-800 max-w-4xl mx-auto">
      {/* Replaced in-site form with external Google Form link */}
      <div className="space-y-6" style={{ position: 'relative', zIndex: 9999 }}>
        

        <div className="bg-blue-900/20 rounded-xl p-6 border border-blue-800">
          <p className="text-gray-300 mb-4">
            We’ve moved our application process to Google Forms to streamline submissions.
          </p>
          <a
            href={"https://forms.gle/U8JGZv6W3VSeEaoN6"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Open Google Form to apply"
          >
            Apply via Google Form
          </a>
          <p className="text-sm text-blue-200 mt-3">
            Note: Opens in a new tab; no data is collected on this site.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* Footer */}
<footer className="relative bg-black text-white py-16 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-transparent to-transparent"></div>
  <div className="absolute bottom-0 left-1/4 w-96 h-48 bg-blue-600/5 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-1/4 w-80 h-40 bg-blue-500/8 rounded-full blur-3xl"></div>
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid md:grid-cols-4 gap-8">
      <div className="md:col-span-2 scroll-animate-left" style={{ transitionDelay: '0ms' }}>
        <div className="flex items-center mb-4">
          <Eye className="h-8 w-8 text-blue-400 mr-3" aria-hidden="true" />
          <span className="text-2xl font-bold">VividSense</span>
        </div>
        <p className="text-gray-300 mb-6 max-w-md">
          Empowering independence through innovative assistive technology. 
          Our mission is to enhance mobility and confidence for the visually impaired community.
        </p>
      </div>
      
      <div className="scroll-animate" style={{ transitionDelay: '150ms' }}>
        <h4 className="font-semibold text-gray-300 mb-4">Contact</h4>
        <div className="space-y-3 text-gray-300">
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
            <span>(732)-829-1158</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
            <span>info@vividsense.com</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" aria-hidden="true" />
            <span>East Meadow Estates <br />Kendal Park, NJ 08824</span>
          </div>
        </div>
      </div>
      
      <div className="scroll-animate-right" style={{ transitionDelay: '300ms' }}>
        <h4 className="font-semibold text-gray-300 mb-4">Resources</h4>
        <div className="space-y-2">
          <button className="text-gray-400 hover:text-white block transition-colors duration-200 bg-transparent border-none text-left">User Guide</button>
          <button className="text-gray-400 hover:text-white block transition-colors duration-200 bg-transparent border-none text-left">Support Center</button>
          <button className="text-gray-400 hover:text-white block transition-colors duration-200 bg-transparent border-none text-left">Accessibility</button>
          <button className="text-gray-400 hover:text-white block transition-colors duration-200 bg-transparent border-none text-left">Privacy Policy</button>
        </div>
      </div>
    </div>
    
    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 scroll-animate" style={{ transitionDelay: '450ms' }}>
      <p>&copy; 2025 VividSense. All rights reserved. Committed to accessibility and independence.</p>
    </div>
  </div>
</footer>
      <SuccessModal
        isOpen={successModal.isOpen}
        onClose={closeSuccessModal}
        firstName={successModal.firstName}
        type={successModal.type}
      />
    </div>
  );
}

export default App;
