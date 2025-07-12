import { useState, useEffect } from 'react';

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* BRIXBUX Logo */}
          <a 
            href="https://brixbux.com" 
            className="flex items-center"
            aria-label="BRIXBUX Home"
          >
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 32 32" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2"
            >
              {/* Stylized "B" logo */}
              <rect width="32" height="32" rx="6" fill="#5A00E0"/>
              <path 
                d="M9 8H17.5C19.433 8 21 9.567 21 11.5C21 12.8807 20.1193 14.0607 18.8867 14.4667C20.6257 14.7895 22 16.2895 22 18.125C22 20.2251 20.2251 22 18.125 22H9V8Z" 
                fill="white"
                stroke="white"
                strokeWidth="1.5"
              />
              <path 
                d="M12 11V14.5H17C17.8284 14.5 18.5 13.8284 18.5 13C18.5 12.1716 17.8284 11.5 17 11.5L12 11.5V11Z" 
                fill="#5A00E0"
              />
              <path 
                d="M12 17.5V19H17.5C18.3284 19 19 18.3284 19 17.5C19 16.6716 18.3284 16 17.5 16H12V17.5Z" 
                fill="#5A00E0"
              />
            </svg>
            <span className={`text-xl font-bold tracking-tight transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}>
              BRIXBUX
            </span>
          </a>

          {/* Back to Main Site Link */}
          <div>
            {/* Desktop Link */}
            <a 
              href="https://brixbux.com"
              className={`hidden lg:inline-block text-sm font-medium transition-all duration-200 relative group ${
                isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
              }`}
            >
              Back to Main Site
              <span className={`absolute -bottom-0.5 left-0 w-full h-px transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${
                isScrolled ? 'bg-gray-900' : 'bg-white'
              }`}></span>
            </a>

            {/* Mobile Button */}
            <a 
              href="https://brixbux.com"
              className={`lg:hidden block px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                isScrolled 
                  ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              Back to Main Site
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}