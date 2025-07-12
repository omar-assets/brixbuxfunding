import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ArrowRight, Lock, Zap, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { insertLeadSubmissionSchema, type InsertLeadSubmission } from "@shared/schema";
import { z } from "zod";

interface LeadFormProps {
  onSuccess?: () => void;
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const [formData, setFormData] = useState<InsertLeadSubmission>({
    name: '',
    email: '',
    phone: '',
    projectDetails: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitLeadMutation = useMutation({
    mutationFn: async (data: InsertLeadSubmission) => {
      return apiRequest('/api/leads', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },
    onSuccess: () => {
      setFormData({ name: '', email: '', phone: '', projectDetails: '' });
      setErrors({});
      onSuccess?.();
    },
    onError: (error: any) => {
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
    <div className="bg-white/8 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl fade-in-up relative overflow-hidden" style={{animationDelay: '0.6s'}}>
      {/* Enhanced Form Background Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#9F85FF]/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#5A00E0]/20 to-transparent rounded-full blur-2xl"></div>
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold mb-2 text-center">Get Your Terms</h3>
        <p className="text-center text-white/70 mb-6 text-sm">No credit check. No obligation. Just answers.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        {errors.form && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-200 text-sm">
            {errors.form}
          </div>
        )}
        
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
          {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
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
          {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
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
          {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
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
          {errors.projectDetails && <p className="text-red-400 text-sm mt-1">{errors.projectDetails}</p>}
        </div>
        
        <button
          type="submit"
          disabled={submitLeadMutation.isPending}
          className="w-full bg-gradient-to-r from-[#9F85FF] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white px-6 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-[1.02] shadow-2xl group pulse-glow disabled:opacity-70 disabled:cursor-not-allowed"
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
  );
}