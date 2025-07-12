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
    <div className="bg-white rounded-lg p-8 border border-gray-200 shadow-lg">
      <div>
        <h3 className="text-2xl font-medium mb-2 text-center text-gray-900">Get Your Terms</h3>
        <p className="text-center text-gray-600 mb-6 text-sm font-light">No credit check. No obligation. Just answers.</p>
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
            className="form-input w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 bg-white border border-gray-300 focus:border-[#5A00E0] focus:ring-2 focus:ring-[#5A00E0]/20 transition-all duration-200"
            required
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            placeholder="Your best email"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 bg-white border border-gray-300 focus:border-[#5A00E0] focus:ring-2 focus:ring-[#5A00E0]/20 transition-all duration-200"
            required
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Direct phone number"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 bg-white border border-gray-300 focus:border-[#5A00E0] focus:ring-2 focus:ring-[#5A00E0]/20 transition-all duration-200"
            required
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>
        
        <div>
          <textarea
            name="projectDetails"
            placeholder="Estimated deal size (e.g., $5M) & use of funds"
            value={formData.projectDetails}
            onChange={handleInputChange}
            rows={3}
            className="form-input w-full px-4 py-3 rounded text-gray-900 placeholder-gray-500 resize-none bg-white border border-gray-300 focus:border-[#5A00E0] focus:ring-2 focus:ring-[#5A00E0]/20 transition-all duration-200"
          />
          {errors.projectDetails && <p className="text-red-500 text-sm mt-1">{errors.projectDetails}</p>}
        </div>
        
        <button
          type="submit"
          disabled={submitLeadMutation.isPending}
          className="w-full bg-[#5A00E0] hover:bg-[#4A00D0] text-white px-6 py-4 rounded font-medium text-lg transition-all duration-200 uppercase tracking-wider disabled:opacity-70 disabled:cursor-not-allowed"
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
          <div className="flex items-center space-x-2 text-gray-600">
            <Lock className="h-3 w-3 text-gray-500" />
            <span className="text-xs uppercase tracking-wider">Secure</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Zap className="h-3 w-3 text-gray-500" />
            <span className="text-xs uppercase tracking-wider">Instant Terms</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Shield className="h-3 w-3 text-gray-500" />
            <span className="text-xs uppercase tracking-wider">No Obligation</span>
          </div>
        </div>
      </form>
    </div>
  );
}