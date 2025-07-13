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
      // Show only when scrolling down and not at the top
      const isScrollingDown = currentScrollY > lastScrollY.current;
      
      if (currentScrollY > 10 && isScrollingDown) {
        setIsVisible(true);
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
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMenu();
  };

  const handleGetPreApproved = () => {
    if (onGetPreApproved) {
      onGetPreApproved();
    } else {
      // Default behavior - scroll to form
      const formElement = document.querySelector('#lead-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    closeMenu();
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200' : '-translate-y-full opacity-0'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 lg:py-4">
          {/* Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center"
            aria-label="Scroll to top"
          >
            <Logo variant="dark" size="4xl" showText={false} />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2"
            >
              How It Works
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5A00E0] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#case-studies')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2"
            >
              Case Studies
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5A00E0] transition-all duration-300 group-hover:w-full" />
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium relative group py-2"
            >
              FAQ
            </button>
            <div className="h-6 w-px bg-gray-300" />
            <button
              onClick={handleGetPreApproved}
              className="bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-6 py-2.5 rounded-md font-medium transition-all duration-200 text-sm uppercase tracking-wider shadow-sm hover:shadow-md"
            >
              Get Pre-Approved
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 transition-colors p-2"
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
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <div className="pb-4 pt-2 space-y-1">
            <button
              onClick={() => handleNavClick('#how-it-works')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md"
            >
              How It Works
            </button>
            <button
              onClick={() => handleNavClick('#case-studies')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md"
            >
              Case Studies
            </button>
            <button
              onClick={() => handleNavClick('#faq')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition-colors text-base font-medium rounded-md"
            >
              FAQ
            </button>
            <div className="pt-2">
              <button
                onClick={handleGetPreApproved}
                className="w-full bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-4 py-3 rounded-md font-medium transition-all duration-200 text-sm uppercase tracking-wider shadow-sm"
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