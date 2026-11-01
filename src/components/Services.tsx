import React, { useState } from 'react';
import { clinicConfig, DentalService } from '../config/clinicConfig';
import { ServiceDetailModal } from './ServiceDetailModal';
import { 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Sun, 
  Layers, 
  Palette, 
  HeartHandshake, 
  Smile, 
  ArrowRight,
  Clock
} from 'lucide-react';

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectServiceForBooking }) => {
  const [activeModalService, setActiveModalService] = useState<DentalService | null>(null);

  // Dynamic Lucide icon mapper
  const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[#20B8A5]" };
    switch (iconName) {
      case 'ShieldCheck': return <ShieldCheck {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'HeartHandshake': return <HeartHandshake {...props} />;
      case 'Smile': return <Smile {...props} />;
      default: return <ShieldCheck {...props} />;
    }
  };

  const handleModalBooking = (serviceId: string) => {
    setActiveModalService(null);
    onSelectServiceForBooking(serviceId);
  };

  return (
    <section id="services" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            Comprehensive Dental Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Our Dental Treatments & Services
          </h2>
          <p className="text-base sm:text-lg text-[#5D7185] mt-3 leading-relaxed">
            From routine checkups to specialized treatments, our practice provides gentle, technology-enabled dental care under one roof.
          </p>
        </div>

        {/* 8 Service Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clinicConfig.services.map((service) => (
            <div
              key={service.id}
              className="group flex flex-col justify-between bg-white rounded-2xl p-6 border border-slate-200/90 hover:border-[#20B8A5]/60 hover:shadow-lg transition-all duration-200"
            >
              <div>
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-[#E6F8F5] flex items-center justify-center mb-5 group-hover:bg-[#20B8A5] transition-colors">
                  <div className="group-hover:text-white transition-colors">
                    {renderIcon(service.icon)}
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-[#12345A] tracking-tight mb-2 group-hover:text-[#20B8A5] transition-colors">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed mb-4">
                  {service.shortDescription}
                </p>
              </div>

              <div>
                {/* Duration indicator */}
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400 mb-4 pt-3 border-t border-slate-100">
                  <Clock className="w-3.5 h-3.5 text-[#20B8A5]" />
                  <span>Est. {service.typicalDuration}</span>
                </div>

                {/* Learn More link with trigger */}
                <button
                  type="button"
                  onClick={() => setActiveModalService(service)}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#12345A] hover:text-[#20B8A5] py-2 px-1 focus-clinic group/btn"
                  aria-haspopup="dialog"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 text-[#20B8A5] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner Note */}
        <div className="mt-12 p-4 rounded-xl bg-[#F5F8FA] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5D7185]">
          <p>
            <span className="font-bold text-[#12345A]">Not sure which treatment you need?</span> We provide initial clinical consultations to examine your oral health and explain all available options.
          </p>
          <button
            onClick={() => onSelectServiceForBooking('general-dentistry')}
            className="px-4 py-2 font-bold text-white bg-[#12345A] hover:bg-[#0A213B] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            Book Initial Consultation
          </button>
        </div>

      </div>

      {/* Detail Modal */}
      <ServiceDetailModal
        service={activeModalService}
        isOpen={Boolean(activeModalService)}
        onClose={() => setActiveModalService(null)}
        onSelectForBooking={handleModalBooking}
      />
    </section>
  );
};
