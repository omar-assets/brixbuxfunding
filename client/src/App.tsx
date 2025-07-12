import { useState, useEffect, useRef } from 'react';
import { ChevronDown, DollarSign, Clock, Shield, ArrowRight, CheckCircle, Phone, Mail, MapPin, TrendingUp, Building, Utensils, Warehouse, ChevronLeft, ChevronRight, Plus, Minus, Upload, FileCheck, Banknote } from 'lucide-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import LeadForm from '@/components/LeadForm';
import MinimalNav from '@/components/MinimalNav';
import { FeaturesSectionWithHoverEffects } from '@/components/ui/feature-section-with-hover-effects';

// Animated Stats Component


function BrixbuxFundingApp() {
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
    <div className="min-h-screen light-gradient-bg text-gray-900">
      <MinimalNav />
      <main>
        {/* Hero Section */}
        <section aria-labelledby="hero-heading" className="pt-40 pb-32 px-4 sm:px-6 lg:px-8">
        {/* Professional subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 relative z-10">
              {/* Professional headline badge */}
              <div className="inline-flex items-center px-4 py-2 bg-[#5A00E0]/10 rounded border border-[#5A00E0]/20">
                <TrendingUp className="h-4 w-4 text-[#5A00E0] mr-2" />
                <span className="text-xs font-medium text-gray-700 tracking-wider uppercase">Fast MCA, Hard-Money & Bridge Loans for ISOs</span>
              </div>
              
              <h1 id="hero-heading" className="text-5xl lg:text-6xl leading-tight">
                <span className="block text-gray-900">Fund Deals Fast.</span>
                <span className="block text-[#5A00E0] mt-2">Win More.</span>
              </h1>
              <p className="text-xl lg:text-2xl font-light text-gray-600 leading-relaxed mt-6">
                Close bigger deals faster with direct capital.
              </p>
              
              {/* Trust Badges */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
                <div className="text-center p-4 bg-white rounded border border-gray-200 shadow-sm">
                  <Shield className="h-5 w-5 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">$50K-$20M+</p>
                  <p className="text-xs text-gray-500 mt-1">Deal Size</p>
                </div>
                <div className="text-center p-4 bg-white rounded border border-gray-200 shadow-sm">
                  <DollarSign className="h-5 w-5 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">$200M+</p>
                  <p className="text-xs text-gray-500 mt-1">Funded</p>
                </div>
                <div className="text-center p-4 bg-white rounded border border-gray-200 shadow-sm">
                  <Clock className="h-5 w-5 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">24-Hour</p>
                  <p className="text-xs text-gray-500 mt-1">Terms</p>
                </div>
                <div className="text-center p-4 bg-white rounded border border-gray-200 shadow-sm">
                  <MapPin className="h-5 w-5 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-900">All 50</p>
                  <p className="text-xs text-gray-500 mt-1">States</p>
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
        <section aria-labelledby="problem-solution-heading" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center relative">
          <h2 id="problem-solution-heading" className="text-4xl lg:text-5xl mb-16 leading-tight">
            <span className="text-gray-900">Slow Funding</span>
            <span className="text-red-500 mx-3">Kills</span>
            <span className="text-gray-900">Deals.</span>
            <br />
            <span className="text-[#5A00E0] mt-4 block">We Fix That.</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 text-left max-w-4xl mx-auto mb-16">
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-red-500 mb-6 uppercase tracking-wider">The Problem</h3>
              <p className="text-lg text-gray-700 leading-relaxed">Every day, profitable deals slip away.</p>
              <p className="text-lg text-gray-700 leading-relaxed">Traditional lenders take weeks to decide.</p>
              <p className="text-lg text-gray-700 leading-relaxed">Brokers add layers of complexity and delays.</p>
              <p className="text-lg text-gray-700 leading-relaxed">Your clients need capital <span className="font-medium text-gray-900">now</span>, not next month.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-medium text-[#5A00E0] mb-6 uppercase tracking-wider">Our Solution</h3>
              <p className="text-lg text-gray-700 leading-relaxed">As a <span className="font-medium text-gray-900">direct funder</span>, we eliminate middlemen.</p>
              <p className="text-lg text-gray-700 leading-relaxed">We make decisions fast.</p>
              <p className="text-lg text-gray-700 leading-relaxed">We fund faster.</p>
              <p className="text-lg text-gray-700 leading-relaxed">We help you close more business.</p>
            </div>
          </div>
          
          <div className="mt-16">
            <button className="bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-12 py-4 rounded text-lg font-medium transition-all duration-200 uppercase tracking-wider">
              Stop Losing Deals — Get Direct Funding
              <ArrowRight className="inline-block ml-3 h-5 w-5" />
            </button>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="scroll-indicator flex flex-col items-center text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
              <span className="text-xs font-medium mb-2 uppercase tracking-wider">See How We Do It</span>
              <ChevronDown className="h-5 w-5" />
            </div>
          </div>
        </div>
      </section>
        {/* USP Section */}
        <section id="usp" aria-labelledby="usp-heading" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50 relative">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 id="usp-heading" className="text-4xl lg:text-5xl mb-6">
              The Direct Advantage
            </h2>
            <p className="text-lg text-gray-600 font-light uppercase tracking-wider mb-3">Speed. Scale. Simplicity.</p>
            <p className="text-base text-gray-500 max-w-2xl mx-auto">Why ISOs and developers choose us over traditional lenders</p>
          </div>
          
          <FeaturesSectionWithHoverEffects />
          
          <div className="text-center mt-20">
            <button className="bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-12 py-4 rounded text-lg font-medium transition-all duration-200 uppercase tracking-wider">
              Submit Your Deal — Get Terms Today
              <ArrowRight className="inline-block ml-3 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
        {/* Case Studies Section */}
        <section id="case-studies" aria-labelledby="case-studies-heading" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 id="case-studies-heading" className="text-4xl lg:text-5xl mb-6 text-gray-900">Success Stories</h2>
            <p className="text-lg text-gray-600 font-light">Real deals, real results, real speed</p>
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
                        <div className="case-study-card p-8">
                          <div className="flex items-start space-x-6">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
                                <IconComponent className="h-6 w-6 text-gray-600" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-4 mb-4">
                                <div className="text-2xl font-medium text-[#5A00E0]">{study.amount}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wider">
                                  {study.type} • {study.location}
                                </div>
                              </div>
                              <h3 className="text-xl font-medium mb-4 text-gray-900">
                                {study.headline}
                              </h3>
                              <p className="text-gray-600 mb-6 leading-relaxed font-light">
                                {study.details}
                              </p>
                              <div className="grid md:grid-cols-3 gap-4 text-sm">
                                <div className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 challenge-indicator rounded-full flex-shrink-0 mt-1.5" />
                                  <span className="text-gray-600 text-sm">
                                    <span className="text-red-500 font-medium">Challenge:</span> {study.challenge}
                                  </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 solution-indicator rounded-full flex-shrink-0 mt-1.5" />
                                  <span className="text-gray-600 text-sm">
                                    <span className="text-blue-500 font-medium">Solution:</span> {study.solution}
                                  </span>
                                </div>
                                <div className="flex items-start space-x-2">
                                  <div className="w-1.5 h-1.5 outcome-indicator rounded-full flex-shrink-0 mt-1.5" />
                                  <span className="text-gray-600 text-sm">
                                    <span className="text-green-500 font-medium">Outcome:</span> {study.outcome}
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
                aria-label="Previous case study"
                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center group hover:border-gray-400 transition-all"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
              </button>
              
              <div className="flex space-x-2">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCaseStudy(index)}
                    aria-label={`Go to case study ${index + 1}`}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentCaseStudy ? 'bg-[#5A00E0]' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextCaseStudy}
                aria-label="Next case study"
                className="w-10 h-10 border border-gray-300 rounded flex items-center justify-center group hover:border-gray-400 transition-all"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors" />
              </button>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="text-center mt-20">
            <div className="relative h-32 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="max-w-4xl mx-auto">
                    <blockquote className="text-xl font-light italic text-gray-700 mb-4 leading-relaxed">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center justify-center space-x-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200">
                          <span className="text-xs font-medium text-gray-600">{testimonial.avatar}</span>
                        </div>
                        <div className="text-left">
                          <div className="text-gray-900 font-medium text-sm">{testimonial.author}</div>
                          <div className="text-gray-600 text-xs">{testimonial.title}, {testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center space-x-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-[#5A00E0]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
        {/* How It Works Section */}
        <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 id="how-it-works-heading" className="text-4xl lg:text-5xl mb-6 text-gray-900">Fast. Simple. Direct.</h2>
            <p className="text-lg text-gray-600 font-light">From application to funding in days, not weeks</p>
          </div>
          
          {/* Process Steps */}
          <div className="relative">
            <div className="grid md:grid-cols-3 gap-16 relative">
              {/* Step 1: Submit */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Upload className="h-8 w-8 text-[#5A00E0]" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-gray-900">Submit</h3>
                <p className="text-gray-600 font-light">Quick form. Zero paperwork upfront.</p>
              </div>
              
              {/* Step 2: Approve */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <FileCheck className="h-8 w-8 text-[#5A00E0]" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-gray-900">Approve</h3>
                <p className="text-gray-600 font-light">Terms in 24 hours. No surprises.</p>
              </div>
              
              {/* Step 3: Fund */}
              <div className="text-center">
                <div className="w-16 h-16 bg-white border border-gray-200 rounded flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <Banknote className="h-8 w-8 text-[#5A00E0]" />
                </div>
                <h3 className="text-2xl font-medium mb-3 text-gray-900">Fund</h3>
                <p className="text-gray-600 font-light">Capital deployed in days.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-20">
            <button className="bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-12 py-4 rounded text-lg font-medium transition-all duration-200 uppercase tracking-wider">
              Start Now — Get Pre-Approved
              <ArrowRight className="inline-block ml-3 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
        {/* Stats Section */}
        <section aria-label="Company Statistics" className="py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="text-center">
              <div className="text-4xl font-medium text-gray-900 mb-2">500+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Deals Closed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-gray-900 mb-2">$200M+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Capital Deployed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-gray-900 mb-2">24hrs</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">Avg. Response</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-medium text-gray-900 mb-2">50</div>
              <div className="text-sm text-gray-600 uppercase tracking-wider">States Licensed</div>
            </div>
          </div>
        </div>
      </section>
        {/* FAQ Section */}
        <section id="faq" aria-labelledby="faq-heading" className="py-32 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 id="faq-heading" className="text-4xl lg:text-5xl mb-6 text-gray-900">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 font-light">Have questions? We have answers.</p>
          </div>
          
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
              <div key={index} className="bg-white rounded border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full p-6 text-left flex justify-between items-center"
                >
                  <span className="text-lg font-medium pr-4 text-gray-900">{faq.q}</span>
                  <div className="flex-shrink-0">
                    {expandedFaq === index ? (
                      <Minus className="h-4 w-4 text-gray-600" />
                    ) : (
                      <Plus className="h-4 w-4 text-gray-600" />
                    )}
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedFaq === index 
                    ? 'max-h-96 opacity-100 pb-6' 
                    : 'max-h-0 opacity-0 pb-0'
                }`}>
                  <div className="px-6 border-t border-gray-200 pt-4">
                    <p className="text-gray-600 leading-relaxed font-light">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        {/* Final CTA Section */}
        <section aria-labelledby="final-cta-heading" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#5A00E0] to-[#9F85FF] animate-on-scroll">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="final-cta-heading" className="text-4xl font-bold mb-8 text-[#ffffff]">Don't Let Your Next Big Deal Slip Away</h2>
          <p className="text-xl mb-12 text-white/90">
            Every minute you wait is another minute your competition gets ahead. 
            Get pre-approved now and be ready to close when opportunity strikes.
          </p>
          <button className="bg-white text-[#5A00E0] hover:bg-gray-100 px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl pulse-glow">
            Get Terms & Secure Funding Today
          </button>
        </div>
      </section>
      </main>
      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[#1B133E] border-t border-[#5A00E0]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <DollarSign className="h-8 w-8 text-[#5A00E0]" />
                <span className="text-xl font-bold text-white">BRIXBUX Funding</span>
              </div>
              <p className="text-white/80">Direct funding solutions for fast-growing businesses.</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Contact</h3>
              <div className="space-y-2 text-white/80">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>1-800-FUNDING</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>deals@brixbux.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
              <div className="space-y-2 text-white/80">
                <a href="#lead-form" className="block hover:text-[#5A00E0] transition-colors">Submit Application</a>
                <a href="#case-studies" className="block hover:text-[#5A00E0] transition-colors">Case Studies</a>
                <a href="#faq" className="block hover:text-[#5A00E0] transition-colors">FAQ</a>
                <a href="https://brixbux.com" className="block hover:text-[#5A00E0] transition-colors">Main Website</a>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-3 text-white">Follow Us</h3>
                <div className="flex space-x-3">
                  <a href="https://www.linkedin.com/company/brixbux" aria-label="Visit BRIXBUX on LinkedIn" className="text-white/80 hover:text-[#5A00E0] transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href="https://twitter.com/brixbux" aria-label="Visit BRIXBUX on Twitter" className="text-white/80 hover:text-[#5A00E0] transition-colors">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 BRIXBUX Funding. All rights reserved. Licensed lender in all 50 states.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrixbuxFundingApp />
    </QueryClientProvider>
  );
}

export default App;