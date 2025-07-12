import { useState, useEffect, useRef } from 'react';
import { ChevronDown, DollarSign, Clock, Users, Shield, ArrowRight, CheckCircle, Star, Phone, Mail, MapPin, TrendingUp, Building, Utensils, Warehouse, ChevronLeft, ChevronRight } from 'lucide-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import LeadForm from '@/components/LeadForm';

function DirectCapitalApp() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const caseStudies = [
    {
      icon: Building,
      amount: "$8M",
      headline: "Closed Miami Redevelopment in 10 Days",
      type: "Bridge Loan",
      location: "Miami, FL",
      challenge: "Traditional lenders wanted 45+ days",
      solution: "Direct funding with in-house underwriting",
      outcome: "Funded in 10 days, secured prime property",
      details: "Multifamily redevelopment project needed fast capital to secure prime Miami property before competing buyers."
    },
    {
      icon: Utensils,
      amount: "$3M",
      headline: "Funded Hospitality Expansion — 3 New Locations",
      type: "MCA",
      location: "Texas",
      challenge: "Seasonal business needed flexible repayment",
      solution: "Revenue-based MCA structure",
      outcome: "Opened 3 new locations, 40% revenue growth",
      details: "Restaurant group needed working capital for rapid expansion across multiple markets."
    },
    {
      icon: Warehouse,
      amount: "$15M",
      headline: "Industrial Repositioning Funded in 7 Days",
      type: "Hard Money",
      location: "Atlanta, GA",
      challenge: "Needed speed to beat competition",
      solution: "Express underwriting process",
      outcome: "Funded in 7 days, won the deal",
      details: "Converting warehouses to flex office space. Time-sensitive opportunity required immediate action."
    },
    {
      icon: Building,
      amount: "$5M",
      headline: "Retail Portfolio Acquisition — 48 Hours",
      type: "Bridge Loan",
      location: "Phoenix, AZ",
      challenge: "Seller demanded quick close",
      solution: "Pre-approved credit facility",
      outcome: "Closed in 48 hours, 25% below market",
      details: "Distressed retail portfolio needed immediate capital for quick acquisition."
    },
    {
      icon: Warehouse,
      amount: "$12M",
      headline: "Logistics Center Expansion — Same Week",
      type: "Hard Money",
      location: "Denver, CO",
      challenge: "Construction delays eating into profits",
      solution: "Emergency funding within 5 days",
      outcome: "Project completed, 30% profit margin",
      details: "E-commerce logistics center needed capital injection to complete expansion on schedule."
    },
    {
      icon: Utensils,
      amount: "$2M",
      headline: "Franchise Rollout — 6 Locations Funded",
      type: "MCA",
      location: "California",
      challenge: "Franchise fees due across multiple locations",
      solution: "Structured MCA with staggered funding",
      outcome: "All 6 locations opened successfully",
      details: "Fast-casual franchise needed capital for simultaneous multi-location expansion."
    }
  ];

  const testimonials = [
    {
      quote: "They saved our $5M acquisition in under 2 weeks. Without them, we'd have lost the deal.",
      author: "James L., ISO Partner",
      title: "Senior Partner",
      company: "Premier Capital Group",
      avatar: "JL",
      rating: 5
    },
    {
      quote: "Direct funding with no broker delays. Exactly what we needed for our expansion.",
      author: "Sarah M., Real Estate Developer",
      title: "Principal Developer",
      company: "Meridian Properties",
      avatar: "SM",
      rating: 5
    },
    {
      quote: "Professional, fast, and reliable. They've become our go-to funding partner.",
      author: "Michael R., Commercial Investor",
      title: "Managing Director",
      company: "Apex Investments",
      avatar: "MR",
      rating: 5
    },
    {
      quote: "Closed our $12M deal in 5 days. Incredible speed and professionalism.",
      author: "David K., Project Manager",
      title: "Senior Project Manager",
      company: "Metro Development",
      avatar: "DK",
      rating: 5
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (heroImageRef.current) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        heroImageRef.current.style.transform = `translateY(${parallax}px)`;
      }
    };

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const nextCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
  };

  const prevCaseStudy = () => {
    setCurrentCaseStudy((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  };

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleLeadSubmissionSuccess = () => {
    setShowSuccessMessage(true);
    // Hide success message after 5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen animated-gradient text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-md z-50 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-8 w-8 text-[#9F85FF] float-animation" />
              <span className="text-xl font-bold">DirectCapital</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-white/80 hover:text-[#5A00E0] transition-colors">How It Works</a>
              <a href="#case-studies" className="text-white/80 hover:text-[#5A00E0] transition-colors">Case Studies</a>
              <a href="#faq" className="text-white/80 hover:text-[#5A00E0] transition-colors">FAQ</a>
              <button className="bg-[#9F85FF] hover:bg-[#8B5CF6] px-6 py-2 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg pulse-glow">
                Get Pre-Approved
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Sophisticated Animated Financial Background */}
        <div className="absolute inset-0 opacity-10">
          {/* Animated geometric shapes */}
          <div className="absolute top-20 left-10 w-16 h-16 border-2 border-[#9F85FF] rounded-lg floating-shapes" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-12 h-12 border-2 border-[#5A00E0] rounded-full floating-shapes" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-40 left-20 w-8 h-8 bg-[#9F85FF] rounded-full floating-shapes" style={{animationDelay: '4s'}}></div>
          <div className="absolute bottom-20 right-10 w-20 h-20 border border-[#5A00E0] rounded-lg floating-shapes" style={{animationDelay: '6s'}}></div>
          
          {/* Data flow lines */}
          <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#9F85FF] to-transparent data-flow" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#5A00E0] to-transparent data-flow" style={{animationDelay: '2s'}}></div>
          
          {/* Pulse rings */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 border border-[#9F85FF] rounded-full pulse-ring" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-3/4 right-1/4 w-4 h-4 border border-[#5A00E0] rounded-full pulse-ring" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              {/* Micro headline for instant context */}
              <div className="inline-flex items-center px-4 py-2 bg-[#9F85FF]/20 rounded-full border border-[#9F85FF]/30 backdrop-blur-sm">
                <TrendingUp className="h-4 w-4 text-[#9F85FF] mr-2" />
                <span className="text-sm font-semibold text-[#9F85FF] tracking-wide uppercase">Direct Funding for ISOs & Developers</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="block text-white/95">Fund Deals Fast.</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#9F85FF] to-[#5A00E0] mt-2">Win More.</span>
              </h1>
              <p className="text-2xl lg:text-3xl font-medium text-white/90 fade-in-up leading-tight" style={{animationDelay: '0.2s'}}>
                Close bigger deals faster with direct capital.
              </p>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-6 fade-in-up" style={{animationDelay: '0.4s'}}>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Shield className="h-8 w-8 text-[#9F85FF] mx-auto mb-2" />
                  <p className="text-sm font-semibold">$50K-$20M+</p>
                  <p className="text-xs text-white/60">Deal Size</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <DollarSign className="h-8 w-8 text-[#9F85FF] mx-auto mb-2" />
                  <p className="text-sm font-semibold">$200M+</p>
                  <p className="text-xs text-white/60">Funded</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <Clock className="h-8 w-8 text-[#9F85FF] mx-auto mb-2" />
                  <p className="text-sm font-semibold">24-Hour</p>
                  <p className="text-xs text-white/60">Terms</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <MapPin className="h-8 w-8 text-[#9F85FF] mx-auto mb-2" />
                  <p className="text-sm font-semibold">All 50</p>
                  <p className="text-xs text-white/60">States</p>
                </div>
              </div>
            </div>
            
            {/* Lead Generation Form */}
            <div className="relative z-10">
              {showSuccessMessage && (
                <div className="mb-6 bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-green-200 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>Thank you! We'll get back to you with terms within 24 hours.</span>
                  </div>
                </div>
              )}
              <LeadForm onSuccess={handleLeadSubmissionSuccess} />
            </div>
          </div>
        </div>
      </section>

      {/* Problem-Agitation-Solution Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 animate-on-scroll">
        <div className="max-w-5xl mx-auto text-center relative" style={{backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(159, 133, 255, 0.05) 0%, transparent 50%)'}}>
          <h2 className="text-5xl lg:text-6xl font-bold mb-12 leading-tight">
            <span className="text-white">Slow Funding</span>
            <span className="text-red-400 mx-3">Kills</span>
            <span className="text-white">Deals.</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9F85FF] to-[#5A00E0]">We Fix That.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto mb-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-red-300 mb-4">The Problem:</h3>
              <p className="text-xl text-white/90 leading-relaxed">Every day, profitable deals slip away.</p>
              <p className="text-xl text-white/90 leading-relaxed">Traditional lenders take weeks to decide.</p>
              <p className="text-xl text-white/90 leading-relaxed">Brokers add layers of complexity and delays.</p>
              <p className="text-xl text-white/90 leading-relaxed">Your clients need capital <span className="animated-underline font-bold text-[#9F85FF]">NOW</span>, not next month.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-[#9F85FF] mb-4">Our Solution:</h3>
              <p className="text-xl text-white/90 leading-relaxed">As a <span className="highlight-pulse font-semibold">direct funder</span>, we eliminate middlemen.</p>
              <p className="text-xl text-white/90 leading-relaxed">We make decisions fast.</p>
              <p className="text-xl text-white/90 leading-relaxed">We fund faster.</p>
              <p className="text-xl text-white/90 leading-relaxed">We help you close more business.</p>
            </div>
          </div>
          
          <div className="mt-12">
            <button className="bg-gradient-to-r from-[#9F85FF] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl pulse-glow">
              Stop Losing Deals — Get Direct Funding
              <ArrowRight className="inline-block ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="scroll-indicator flex flex-col items-center text-white/60 hover:text-[#9F85FF] transition-colors cursor-pointer">
              <span className="text-sm font-medium mb-2">See How We Do It</span>
              <ChevronDown className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* USP Section */}
      <section id="usp" className="py-24 px-4 sm:px-6 lg:px-8 animate-on-scroll usp-section-bg relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-32 h-32 border border-[#9F85FF]/20 rounded-full floating-shapes" style={{animationDelay: '0s'}}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#5A00E0]/20 rounded-lg floating-shapes" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-[#9F85FF]/40 rounded-full pulse-ring" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#5A00E0]/40 rounded-full pulse-ring" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl lg:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/90">
              The Direct Advantage
            </h2>
            <p className="text-xl text-[#9F85FF] font-medium mb-2">Speed. Scale. Simplicity.</p>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">Why ISOs and developers choose us over traditional lenders</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="usp-card p-8 rounded-2xl cursor-pointer group">
              <div className="card-content">
                <div className="icon-wrapper mb-6">
                  <Shield className="h-14 w-14 text-[#9F85FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">Fund Direct</h3>
                <p className="text-white/80 leading-relaxed">No middlemen, no brokers. We make decisions in-house and fund directly from our own capital.</p>
              </div>
            </div>
            
            <div className="usp-card p-8 rounded-2xl cursor-pointer group">
              <div className="card-content">
                <div className="icon-wrapper mb-6">
                  <Clock className="h-14 w-14 text-[#9F85FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">Fast Terms</h3>
                <p className="text-white/80 leading-relaxed">Submit today, get terms tomorrow. Fast decisions mean you never lose a time-sensitive deal.</p>
              </div>
            </div>
            
            <div className="usp-card p-8 rounded-2xl cursor-pointer group">
              <div className="card-content">
                <div className="icon-wrapper mb-6">
                  <DollarSign className="h-14 w-14 text-[#9F85FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">Big Deals</h3>
                <p className="text-white/80 leading-relaxed">$50K to $20M+ financing capability. We handle deals others can't or won't fund.</p>
              </div>
            </div>
            
            <div className="usp-card p-8 rounded-2xl cursor-pointer group">
              <div className="card-content">
                <div className="icon-wrapper mb-6">
                  <CheckCircle className="h-14 w-14 text-[#9F85FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">Custom Fit</h3>
                <p className="text-white/80 leading-relaxed">MCA, bridge loans, hard money, and hybrid structures tailored to your deal's unique needs.</p>
              </div>
            </div>
            
            <div className="usp-card p-8 rounded-2xl cursor-pointer group">
              <div className="card-content">
                <div className="icon-wrapper mb-6">
                  <Users className="h-14 w-14 text-[#9F85FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">Trusted Partner</h3>
                <p className="text-white/80 leading-relaxed">We build lasting relationships with ISOs and repeat clients for ongoing deal flow.</p>
              </div>
            </div>
            
            <div className="usp-card p-8 rounded-2xl cursor-pointer group">
              <div className="card-content">
                <div className="icon-wrapper mb-6">
                  <ArrowRight className="h-14 w-14 text-[#9F85FF]" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">Nationwide</h3>
                <p className="text-white/80 leading-relaxed">Licensed and operating across all 50 states. Local expertise, national capability.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-[#9F85FF] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl pulse-glow group">
              Submit Your Deal — Get Terms Today
              <ArrowRight className="inline-block ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="case-studies" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Success Stories</h2>
            <p className="text-xl text-white/80">Real deals, real results, real speed</p>
          </div>
          
          {/* Case Studies Carousel */}
          <div className="relative mb-16">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentCaseStudy * 100}%)` }}
              >
                {caseStudies.map((study, index) => {
                  const IconComponent = study.icon;
                  return (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="max-w-4xl mx-auto">
                        <div className="case-study-card p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:border-[#9F85FF]/30 transition-all duration-300 group">
                          <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                              <div className="w-16 h-16 bg-[#9F85FF]/20 rounded-2xl flex items-center justify-center group-hover:bg-[#9F85FF]/30 transition-colors">
                                <IconComponent className="h-8 w-8 text-[#9F85FF]" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="text-3xl font-bold text-[#9F85FF]">{study.amount}</div>
                                <div className="text-sm text-white/60 bg-white/10 px-3 py-1 rounded-full">
                                  {study.type} • {study.location}
                                </div>
                              </div>
                              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#9F85FF] transition-colors">
                                {study.headline}
                              </h3>
                              <p className="text-white/80 mb-6 leading-relaxed">
                                {study.details}
                              </p>
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 challenge-indicator rounded-full flex-shrink-0"></div>
                                  <span className="text-white/70">
                                    <strong className="text-red-400">Challenge:</strong> {study.challenge}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 solution-indicator rounded-full flex-shrink-0"></div>
                                  <span className="text-white/70">
                                    <strong className="text-blue-400">Solution:</strong> {study.solution}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <div className="w-2 h-2 outcome-indicator rounded-full flex-shrink-0"></div>
                                  <span className="text-white/70">
                                    <strong className="text-green-400">Outcome:</strong> {study.outcome}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-center items-center space-x-6 mt-8">
              <button
                onClick={prevCaseStudy}
                className="w-12 h-12 carousel-nav-btn rounded-full flex items-center justify-center group"
              >
                <ChevronLeft className="h-6 w-6 text-white group-hover:text-[#9F85FF] transition-colors" />
              </button>
              
              <div className="flex space-x-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCaseStudy(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCaseStudy ? 'bg-[#9F85FF] scale-125 shadow-lg shadow-[#9F85FF]/50' : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextCaseStudy}
                className="w-12 h-12 carousel-nav-btn rounded-full flex items-center justify-center group"
              >
                <ChevronRight className="h-6 w-6 text-white group-hover:text-[#9F85FF] transition-colors" />
              </button>
            </div>
          </div>
          
          {/* Enhanced Testimonials */}
          <div className="text-center">
            <div className="relative h-48 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="max-w-4xl mx-auto">
                    <blockquote className="text-2xl font-light italic text-white/90 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-6">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 testimonial-avatar rounded-full flex items-center justify-center cursor-pointer">
                          <span className="text-sm font-bold text-[#9F85FF]">{testimonial.avatar}</span>
                        </div>
                        <div className="text-left">
                          <div className="text-white font-semibold">{testimonial.author}</div>
                          <div className="text-white/60 text-sm">{testimonial.title}</div>
                          <div className="text-white/40 text-xs">{testimonial.company}</div>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-[#9F85FF] fill-current drop-shadow-sm" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#9F85FF] scale-125' : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold mb-6">Fast. Simple. Direct.</h2>
            <p className="text-xl text-white/80">From application to funding in days, not weeks</p>
          </div>
          
          {/* Process Flow with Visual Connectors */}
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Lines - placed behind circles */}
              <div className="hidden md:block absolute top-10 left-1/3 w-1/3 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#9F85FF] to-[#6B65FF] rounded-full progress-line"></div>
              </div>
              <div className="hidden md:block absolute top-10 right-1/3 w-1/3 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#6B65FF] to-[#5A00E0] rounded-full progress-line" style={{animationDelay: '1s'}}></div>
              </div>
              {/* Step 1: Submit */}
              <div className="text-center group relative">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#9F85FF] to-[#6B65FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#9F85FF]/50 transition-all duration-300 cursor-pointer step-glow step-pulse">
                  <span className="text-2xl font-bold text-white">1</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#9F85FF] to-[#6B65FF] rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#9F85FF] group-hover:from-[#9F85FF] group-hover:to-[#6B65FF] transition-all duration-300">Submit</h3>
                <p className="text-white/80 text-lg font-medium">Quick form. Zero paperwork upfront.</p>
              </div>
              
              {/* Step 2: Approve */}
              <div className="text-center group relative">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#6B65FF] to-[#5A00E0] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#6B65FF]/50 transition-all duration-300 cursor-pointer step-glow step-pulse" style={{animationDelay: '1s'}}>
                  <span className="text-2xl font-bold text-white">2</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6B65FF] to-[#5A00E0] rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#6B65FF] group-hover:from-[#6B65FF] group-hover:to-[#5A00E0] transition-all duration-300">Approve</h3>
                <p className="text-white/80 text-lg font-medium">Terms in 24 hours. No surprises.</p>
              </div>
              
              {/* Step 3: Fund */}
              <div className="text-center group relative">
                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-[#5A00E0] to-[#9F85FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-[#5A00E0]/50 transition-all duration-300 cursor-pointer step-glow step-pulse" style={{animationDelay: '2s'}}>
                  <span className="text-2xl font-bold text-white">3</span>
                  <div className="absolute inset-0 bg-gradient-to-br from-[#5A00E0] to-[#9F85FF] rounded-full opacity-0 group-hover:opacity-20 group-hover:animate-ping transition-opacity duration-300"></div>
                </div>
                <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#FFFFFF] to-[#5A00E0] group-hover:from-[#5A00E0] group-hover:to-[#9F85FF] transition-all duration-300">Fund</h3>
                <p className="text-white/80 text-lg font-medium">Capital deployed in days.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-16">
            <button className="bg-gradient-to-r from-[#9F85FF] to-[#5A00E0] hover:from-[#8B5CF6] hover:to-[#6B65FF] text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-[#9F85FF]/50 pulse-glow group">
              Start Now — Get Pre-Approved
              <ArrowRight className="inline-block ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#9F85FF] mb-2">500+</div>
              <p className="text-white/80">Projects Funded</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#9F85FF] mb-2">$200M+</div>
              <p className="text-white/80">Capital Deployed</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#9F85FF] mb-2">24hrs</div>
              <p className="text-white/80">Average Response</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl font-bold text-[#9F85FF] mb-2">50</div>
              <p className="text-white/80">States Licensed</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {[
              {
                q: "Are you a broker?",
                a: "No, we are a direct funder. We use our own capital and make all underwriting decisions in-house. This eliminates delays and additional costs associated with broker networks."
              },
              {
                q: "How fast can I get funded?",
                a: "We provide terms within 24 hours of receiving a complete application. Funding typically occurs within 5-10 business days, depending on the complexity of the deal and required documentation."
              },
              {
                q: "What deal sizes do you support?",
                a: "$50K to $20M+. We have the capital capacity and expertise to handle both smaller business needs and large commercial projects that many lenders won't touch."
              },
              {
                q: "Do you work with ISOs?",
                a: "Yes, we specialize in partnering with ISOs. We offer competitive commission structures and fast turnaround times to help you close more deals and build lasting client relationships."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center transition-colors"
                >
                  <span className="text-lg font-semibold">{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 transition-transform duration-300 ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${expandedFaq === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6">
                    <p className="text-white/80">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#5A00E0] to-[#9F85FF] animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8">Don't Let Your Next Big Deal Slip Away</h2>
          <p className="text-xl mb-12 text-white/90">
            Every minute you wait is another minute your competition gets ahead. 
            Get pre-approved now and be ready to close when opportunity strikes.
          </p>
          <button className="bg-white text-[#5A00E0] hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl pulse-glow">
            Get Terms & Secure Funding Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-8 w-8 text-[#9F85FF] float-animation" />
                <span className="text-xl font-bold">DirectCapital</span>
              </div>
              <p className="text-white/60">Direct funding solutions for large-scale projects and commercial real estate.</p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-white/60">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1-800-FUNDING</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>deals@directcapital.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-white/60">
                <a href="#" className="block hover:text-[#5A00E0] transition-colors">Submit Application</a>
                <a href="#" className="block hover:text-[#5A00E0] transition-colors">ISO Partners</a>
                <a href="#" className="block hover:text-[#5A00E0] transition-colors">Case Studies</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/60">
            <p>&copy; 2024 DirectCapital. All rights reserved. Licensed lender in all 50 states.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DirectCapitalApp />
    </QueryClientProvider>
  );
}

export default App;