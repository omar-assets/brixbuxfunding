import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, DollarSign, Clock, Users, Shield, ArrowRight, CheckCircle, Star, Phone, Mail, MapPin, Lock, Zap, TrendingUp } from 'lucide-react';

function App() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroImageRef = useRef<HTMLImageElement>(null);

  const testimonials = [
    {
      quote: "They saved our $5M acquisition in under 2 weeks. Without them, we'd have lost the deal.",
      author: "James L., ISO Partner"
    },
    {
      quote: "Direct funding with no broker delays. Exactly what we needed for our expansion.",
      author: "Sarah M., Real Estate Developer"
    },
    {
      quote: "Professional, fast, and reliable. They've become our go-to funding partner.",
      author: "Michael R., Commercial Investor"
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

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You would typically send this data to your backend
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
              <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl fade-in-up relative overflow-hidden" style={{animationDelay: '0.6s'}}>
                {/* Enhanced Form Background Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9F85FF]/20 to-transparent rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#5A00E0]/20 to-transparent rounded-full blur-2xl"></div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2 text-center">Get Your Terms</h3>
                  <p className="text-center text-white/70 mb-6 text-sm">No credit check. No obligation. Just answers.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input w-full px-5 py-4 rounded-xl text-white placeholder-white/50 bg-white/10 border border-white/20 focus:border-[#9F85FF] focus:bg-white/15 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your best email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input w-full px-5 py-4 rounded-xl text-white placeholder-white/50 bg-white/10 border border-white/20 focus:border-[#9F85FF] focus:bg-white/15 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Direct phone number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input w-full px-5 py-4 rounded-xl text-white placeholder-white/50 bg-white/10 border border-white/20 focus:border-[#9F85FF] focus:bg-white/15 transition-all duration-300 text-lg"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="projectDetails"
                      placeholder="Estimated deal size (e.g., $5M) & use of funds"
                      value={formData.projectDetails}
                      onChange={handleInputChange}
                      rows={3}
                      className="form-input w-full px-5 py-4 rounded-xl text-white placeholder-white/50 resize-none bg-white/10 border border-white/20 focus:border-[#9F85FF] focus:bg-white/15 transition-all duration-300 text-lg"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#9F85FF] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white px-6 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl group pulse-glow"
                  >
                    Get My Terms Now
                    <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  
                  {/* Trust marks below submit button */}
                  <div className="flex items-center justify-center space-x-6 pt-3">
                    <div className="flex items-center space-x-2 text-white/70">
                      <Lock className="h-4 w-4 text-[#9F85FF]" />
                      <span className="text-sm font-medium">Secure</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <Zap className="h-4 w-4 text-[#9F85FF]" />
                      <span className="text-sm font-medium">Instant Terms</span>
                    </div>
                    <div className="flex items-center space-x-2 text-white/70">
                      <Shield className="h-4 w-4 text-[#9F85FF]" />
                      <span className="text-sm font-medium">No Obligation</span>
                    </div>
                  </div>
                </form>
              </div>
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
          
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-[#9F85FF] mb-4">$8M</div>
              <h3 className="text-xl font-semibold mb-4">Bridge Loan — Miami Multifamily</h3>
              <p className="text-white/80 mb-4">Redevelopment project needed fast capital to secure prime Miami property. Traditional lenders wanted 45+ days.</p>
              <div className="text-[#9F85FF] font-semibold">✓ Funded in 10 days</div>
            </div>
            
            <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-[#9F85FF] mb-4">$3M</div>
              <h3 className="text-xl font-semibold mb-4">MCA — Hospitality Group</h3>
              <p className="text-white/80 mb-4">Restaurant group needed working capital for rapid expansion. Seasonal business required flexible repayment.</p>
              <div className="text-[#9F85FF] font-semibold">✓ Opened 3 new locations</div>
            </div>
            
            <div className="p-8 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="text-3xl font-bold text-[#9F85FF] mb-4">$15M</div>
              <h3 className="text-xl font-semibold mb-4">Hard Money — Industrial Repositioning</h3>
              <p className="text-white/80 mb-4">Converting warehouses to flex office space. Project required speed to beat competition.</p>
              <div className="text-[#9F85FF] font-semibold">✓ Funded in 7 days</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="relative h-32 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                >
                  <blockquote className="text-2xl font-light italic text-white/90 mb-4 max-w-4xl mx-auto">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-[#9F85FF] fill-current" />
                      ))}
                    </div>
                    <span className="text-white/80">— {testimonial.author}</span>
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
                    index === currentTestimonial ? 'bg-[#9F85FF]' : 'bg-white/30'
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
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Fast. Simple. Direct.</h2>
            <p className="text-xl text-white/80">From application to funding in days, not weeks</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#9F85FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 pulse-glow">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Submit Your Deal</h3>
              <p className="text-white/80 text-lg">Brief form, no heavy paperwork upfront. Tell us about your project and funding needs.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#9F85FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 pulse-glow">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Get Terms</h3>
              <p className="text-white/80 text-lg">Tailored offer within 24 hours. Clear terms, competitive rates, no surprises.</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-[#9F85FF] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 pulse-glow">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-4">Get Funded</h3>
              <p className="text-white/80 text-lg">Close and deploy capital in days. Fast execution when timing matters most.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <button className="bg-[#9F85FF] hover:bg-[#8B5CF6] text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl pulse-glow">
              Start Now — Get Pre-Approved
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

export default App;