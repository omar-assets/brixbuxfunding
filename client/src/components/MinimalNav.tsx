import { useState, useEffect } from 'react';
import Logo from './ui/Logo';

export default function MinimalNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav role="navigation" aria-label="Main navigation" className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white/80 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* BRIXBUX Logo */}
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center"
            aria-label="Scroll to top"
          >
            <Logo variant="dark" size="xl" showText={false} />
          </button>

          {/* Back to Main Site Link */}
          <div>
            {/* Desktop Link */}
            <a 
              href="https://brixbux.com"
              className="hidden lg:inline-block text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-200 relative group"
            >
              Back to Main Site
              <span className="absolute -bottom-0.5 left-0 w-full h-px bg-gray-900 transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100" />
            </a>

            {/* Mobile Button */}
            <a 
              href="https://brixbux.com"
              className="lg:hidden block px-4 py-2 rounded-md text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all duration-200"
            >
              Back to Main Site
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}