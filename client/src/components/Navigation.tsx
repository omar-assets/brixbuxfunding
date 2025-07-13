import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from './ui/Logo';

interface NavigationProps {
  onGetPreApproved?: () => void;
}

export default function Navigation({ onGetPreApproved }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY.current;
      
      // Show navigation when scrolling up or when near the top
      if (currentScrollY > 10 && (isScrollingUp || currentScrollY < 100)) {
        setIsVisible(true);
      } else if (currentScrollY <= 10) {
        setIsVisible(false);
      } else {
        setIsVisible(false);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href) as HTMLElement;
    if (element) {
      // Calculate navigation height dynamically
      const navElement = document.querySelector('nav') as HTMLElement;
      const navHeight = navElement ? navElement.offsetHeight : 60; // fallback to 60px
      const additionalOffset = 20; // Extra padding for better visual spacing
      const elementPosition = element.offsetTop - navHeight - additionalOffset;
      
      window.scrollTo({
        top: Math.max(0, elementPosition), // Ensure we don't scroll to negative position
        behavior: 'smooth'
      });
    }
    closeMenu();
  };

  const handleGetPreApproved = () => {
    if (onGetPreApproved) {
      onGetPreApproved();
    } else {
      // Default behavior - scroll to form with proper offset
      const formElement = document.querySelector('#lead-form') as HTMLElement;
      if (formElement) {
        const navElement = document.querySelector('nav') as HTMLElement;
        const navHeight = navElement ? navElement.offsetHeight : 60; // fallback to 60px
        const additionalOffset = 20; // Extra padding for better visual spacing
        const elementPosition = formElement.offsetTop - navHeight - additionalOffset;
        
        window.scrollTo({
          top: Math.max(0, elementPosition), // Ensure we don't scroll to negative position
          behavior: 'smooth'
        });
      }
    }
    closeMenu();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : '-translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-1.5 sm:py-2 lg:py-2.5">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center touch-feedback"
            aria-label="Scroll to top"
          >
            <div className="flex items-center">
              <img 
                src="/logos/fundinglogodark_transparentbg.png"
                alt="BRIXBUX Funding Logo"
                className="logo-image transition-opacity duration-500 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 lg:h-16 lg:w-16 xl:h-20 xl:w-20"
                loading="lazy"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('#usp')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2 touch-feedback"
            >
              Why Choose Us
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5A00E0] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#case-studies')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2 touch-feedback"
            >
              Success Stories
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5A00E0] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2 touch-feedback"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5A00E0] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2 touch-feedback"
            >
              FAQ
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5A00E0] transition-all duration-300 group-hover:w-full" />
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <button
              onClick={handleGetPreApproved}
              className="bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-4 py-2 sm:px-6 sm:py-2.5 rounded-md font-medium transition-all duration-200 text-sm uppercase tracking-wider shadow-sm hover:shadow-md touch-feedback min-h-[44px]"
            >
              Get Pre-Approved
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2 touch-feedback min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="pb-3 pt-1 space-y-1" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <button
              onClick={() => handleNavClick('#usp')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md touch-feedback min-h-[44px]"
            >
              Why Choose Us
            </button>
            <button
              onClick={() => handleNavClick('#case-studies')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md touch-feedback min-h-[44px]"
            >
              Success Stories
            </button>
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md touch-feedback min-h-[44px]"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md touch-feedback min-h-[44px]"
            >
              FAQ
            </button>
            <div className="pt-2">
              <button
                onClick={handleGetPreApproved}
                className="w-full bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-4 py-3 rounded-md font-medium transition-all duration-200 text-sm uppercase tracking-wider shadow-sm touch-feedback min-h-[48px]"
              >
                Get Pre-Approved
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}