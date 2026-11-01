import React, { useEffect } from 'react';
import { DentalService } from '../config/clinicConfig';
import { X, Calendar, Clock, CheckCircle2, ChevronRight, Stethoscope } from 'lucide-react';

interface ServiceDetailModalProps {
  service: DentalService | null;
  isOpen: boolean;
  onClose: () => void;
  onSelectForBooking: (serviceId: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onSelectForBooking
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-service-title"
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#12345A]/60 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 bg-[#F5F8FA] rounded-t-2xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20B8A5] uppercase tracking-wider mb-1">
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Dental Treatment Overview</span>
            </div>
            <h3 id="modal-service-title" className="text-2xl font-bold text-[#12345A] tracking-tight">
              {service.title}
            </h3>
            <div className="flex items-center gap-2 text-xs text-[#5D7185] mt-1.5">
              <Clock className="w-3.5 h-3.5 text-[#20B8A5]" />
              <span>Typical Duration: {service.typicalDuration}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-[#12345A] hover:bg-slate-200/60 rounded-lg transition-colors focus-clinic"
            aria-label="Close service details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#243447]">
          
          {/* Detailed Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#12345A] mb-2">
              Clinical Overview
            </h4>
            <p className="text-[#5D7185] leading-relaxed">
              {service.fullOverview}
            </p>
          </div>

          {/* When is it needed */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#12345A] mb-2.5">
              Common Signs & When It Is Needed
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {service.whenNeeded.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2 p-2.5 bg-[#F5F8FA] rounded-lg border border-slate-200/60">
                  <CheckCircle2 className="w-4 h-4 text-[#20B8A5] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#243447] font-medium leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Procedure Steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#12345A] mb-2.5">
              What to Expect During Your Visit
            </h4>
            <ol className="space-y-2">
              {service.procedureSteps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-3 text-xs text-[#5D7185]">
                  <span className="w-5 h-5 rounded-full bg-[#12345A] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Medical Transparency Note */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Clinical Note:</span> Specific treatment steps and suitability are always determined following an in-person clinical oral examination and diagnostic X-rays.
          </div>

        </div>

        {/* Footer with Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-100 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 rounded-b-2xl">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-[#5D7185] hover:text-[#12345A] hover:bg-slate-100 rounded-lg transition-colors"
          >
            Back to All Services
          </button>

          <button
            type="button"
            onClick={() => onSelectForBooking(service.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#12345A] hover:bg-[#0A213B] active:scale-[0.98] rounded-xl shadow transition-all focus-clinic"
          >
            <Calendar className="w-4 h-4 text-[#20B8A5]" />
            <span>Book for {service.title}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
