import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Lock, Zap, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSubmissionSchema, type InsertLeadSubmission } from "@shared/schema";
import { z } from "zod";

interface LeadFormProps {
  onSuccess?: () => void;
}

// Define proper window interface for analytics
interface WindowWithAnalytics extends Window {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

declare const window: WindowWithAnalytics;

// Helper function to capture UTM parameters
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') ?? '',
    utm_medium: params.get('utm_medium') ?? '',
    utm_campaign: params.get('utm_campaign') ?? '',
    utm_term: params.get('utm_term') ?? '',
    utm_content: params.get('utm_content') ?? '',
  };
};

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<InsertLeadSubmission>({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [utmParams, setUtmParams] = useState(getUTMParams());

  // Capture UTM parameters on component mount
  useEffect(() => {
    setUtmParams(getUTMParams());
  }, []);

  const submitLeadMutation = useMutation({
    mutationFn: async (data: InsertLeadSubmission) => {
      return apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      // Fire analytics events on successful submission
      const projectDetails = formData.projectDetails || '';
      const eventData = {
        event: 'apply_form_submit',
        form_type: 'lead_generation',
        // Extract deal type from project details if available
        deal_type: projectDetails.toLowerCase().includes('mca') ? 'mca' :
                  projectDetails.toLowerCase().includes('bridge') ? 'bridge' :
                  projectDetails.toLowerCase().includes('hard') ? 'hard_money' : 'other',
        // Include UTM parameters (no PII)
        utm_source: utmParams.utm_source || '',
        utm_medium: utmParams.utm_medium || '',
        utm_campaign: utmParams.utm_campaign || '',
        utm_term: utmParams.utm_term || '',
        utm_content: utmParams.utm_content || '',
      };

      // Google Analytics 4 event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'apply_form_submit', {
          event_category: 'Lead Generation',
          event_label: eventData.deal_type,
          custom_parameter_1: eventData.utm_source,
          custom_parameter_2: eventData.utm_medium,
          custom_parameter_3: eventData.utm_campaign,
        });
      }

      // Facebook Pixel event
      if (typeof window !== 'undefined' && window.fbq) {
        window.fbq('track', 'Lead', {
          content_category: 'Funding Application',
          content_name: eventData.deal_type,
          source: eventData.utm_source,
        });
      }

      setFormData({ name: '', email: '', phone: '', projectDetails: '' });
      setErrors({});
      onSuccess?.();
    },
    onError: (error: Error | { message: string }) => {
      console.error('Form submission error:', error);
      if (error.message.includes('Invalid form data')) {
        // Handle validation errors
        setErrors({ form: 'Please check your form data and try again' });
      } else {
        setErrors({ form: 'Something went wrong. Please try again.' });
      }
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const validatedData = insertLeadSubmissionSchema.parse(formData);
      submitLeadMutation.mutate(validatedData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach(err => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <div id="lead-form" className="nav-offset bg-white rounded-xl p-4 xs:p-5 sm:p-6 lg:p-8 border border-gray-200 shadow-lg mobile-card max-w-md xs:max-w-lg sm:max-w-xl lg:max-w-2xl mx-auto">
      <div>
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-medium mb-2 xs:mb-3 text-center text-gray-900">Get Your Terms</h2>
        <p className="text-center text-gray-600 mb-4 xs:mb-5 sm:mb-6 text-sm xs:text-base font-light">No credit check. No obligation. Just answers.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-5 sm:space-y-6 mobile-space-y-4">
        {errors.form && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 xs:p-4 text-red-700 text-sm xs:text-base">
            {errors.form}
          </div>
        )}
        
        <div>
          <label htmlFor="name" className="sr-only">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange}
            aria-label="Full Name"
            className="mobile-form-input form-input w-full px-4 py-3 xs:py-4 rounded-xl text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 focus:border-[#5A00E0] focus:ring-4 focus:ring-[#5A00E0]/20 transition-all duration-200 text-base touch-btn"
            autoComplete="name"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <label htmlFor="email" className="sr-only">Email Address</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Your best email"
            value={formData.email}
            onChange={handleInputChange}
            aria-label="Email Address"
            className="mobile-form-input form-input w-full px-4 py-3 xs:py-4 rounded-xl text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 focus:border-[#5A00E0] focus:ring-4 focus:ring-[#5A00E0]/20 transition-all duration-200 text-base touch-btn"
            autoComplete="email"
            inputMode="email"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <label htmlFor="phone" className="sr-only">Phone Number</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            placeholder="Direct phone number"
            value={formData.phone}
            onChange={handleInputChange}
            aria-label="Phone Number"
            className="mobile-form-input form-input w-full px-4 py-3 xs:py-4 rounded-xl text-gray-900 placeholder-gray-500 bg-white border-2 border-gray-300 focus:border-[#5A00E0] focus:ring-4 focus:ring-[#5A00E0]/20 transition-all duration-200 text-base touch-btn"
            autoComplete="tel"
            inputMode="tel"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <label htmlFor="projectDetails" className="sr-only">Project Details</label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            placeholder="Estimated deal size (e.g., $5M) & use of funds"
            value={formData.projectDetails || ''}
            onChange={handleInputChange}
            rows={3}
            aria-label="Project Details"
            className="mobile-form-input form-input w-full px-4 py-3 xs:py-4 rounded-xl text-gray-900 placeholder-gray-500 resize-none bg-white border-2 border-gray-300 focus:border-[#5A00E0] focus:ring-4 focus:ring-[#5A00E0]/20 transition-all duration-200 text-base min-h-[80px] xs:min-h-[90px]"
          />
          {errors.projectDetails && <p className="text-red-500 text-sm mt-1">{errors.projectDetails}</p>}
        </div>
        
        {/* Hidden UTM tracking fields */}
        <input type="hidden" name="utm_source" value={utmParams.utm_source || ''} />
        <input type="hidden" name="utm_medium" value={utmParams.utm_medium || ''} />
        <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign || ''} />
        <input type="hidden" name="utm_term" value={utmParams.utm_term || ''} />
        <input type="hidden" name="utm_content" value={utmParams.utm_content || ''} />
        
        <button
          type="submit"
          disabled={submitLeadMutation.isPending}
          className="w-full bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-6 py-4 xs:py-5 rounded-xl font-medium text-base xs:text-lg transition-all duration-200 uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed touch-feedback tap-target-lg mobile-btn-full shadow-lg hover:shadow-xl"
        >
          {submitLeadMutation.isPending ? (
            "Submitting..."
          ) : (
            <>
              Get My Terms Now
              <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
        
        {/* Trust marks below submit button */}
        <div className="flex items-center justify-center space-x-3 xs:space-x-4 sm:space-x-6 pt-3 xs:pt-4 flex-wrap gap-y-2">
          <div className="flex items-center space-x-1 xs:space-x-2 text-gray-600">
            <Lock className="h-3 w-3 xs:h-4 xs:w-4 text-gray-500" />
            <span className="text-xs xs:text-sm uppercase tracking-wider">Secure</span>
          </div>
          <div className="flex items-center space-x-1 xs:space-x-2 text-gray-600">
            <Zap className="h-3 w-3 xs:h-4 xs:w-4 text-gray-500" />
            <span className="text-xs xs:text-sm uppercase tracking-wider">Instant Terms</span>
          </div>
          <div className="flex items-center space-x-1 xs:space-x-2 text-gray-600">
            <Shield className="h-3 w-3 xs:h-4 xs:w-4 text-gray-500" />
            <span className="text-xs xs:text-sm uppercase tracking-wider">No Obligation</span>
          </div>
        </div>
      </form>
    </div>
  );
}