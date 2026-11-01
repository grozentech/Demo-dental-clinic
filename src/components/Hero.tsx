import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { generateWhatsAppLink } from '../utils/validation';
import { handleImageFallback } from '../utils/imageUtils';
import { Calendar, ArrowRight, MessageSquare, ShieldCheck, Sparkles, Clock, MapPin } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookClick, onExploreServices }) => {
  const whatsappUrl = generateWhatsAppLink(
    clinicConfig.whatsapp.number,
    clinicConfig.whatsapp.defaultMessage
  );

  return (
    <section id="home" className="relative bg-white pt-6 pb-16 lg:pt-12 lg:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Screen Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Location context tag */}
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#12345A] mb-4">
              <span className="flex items-center gap-1.5 bg-[#F5F8FA] border border-slate-200/80 px-3 py-1 rounded-full text-[#12345A]">
                <MapPin className="w-3.5 h-3.5 text-[#20B8A5]" aria-hidden="true" />
                {clinicConfig.clinicName} · {clinicConfig.locationState}, {clinicConfig.country}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#12345A] tracking-tight leading-[1.15] mb-5 text-balance">
              Your Smile Deserves the Best Care.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#5D7185] leading-relaxed mb-8 max-w-xl">
              Experience modern dental care with a personalised approach to your oral health. From routine family checkups to precision restorations, we make clinical visits comfortable and clear.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 mb-10">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-[#12345A] hover:bg-[#0A213B] active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all focus-clinic"
              >
                <Calendar className="w-4 h-4 text-[#20B8A5]" aria-hidden="true" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreServices}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm sm:text-base font-semibold text-[#12345A] bg-[#F5F8FA] hover:bg-slate-200/70 border border-slate-200 active:scale-[0.98] rounded-xl transition-all focus-clinic"
              >
                <span>Explore Services</span>
                <ArrowRight className="w-4 h-4 text-[#20B8A5]" aria-hidden="true" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-sm font-semibold text-[#12345A] hover:text-[#20B8A5] transition-colors focus-clinic"
                title="Direct WhatsApp chat"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600" aria-hidden="true" />
                <span>WhatsApp Enquiry</span>
              </a>
            </div>

            {/* Trust Reassurance Badges */}
            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-[#5D7185]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#20B8A5] shrink-0" aria-hidden="true" />
                <span className="font-medium">Strict Autoclave Sterilisation</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#20B8A5] shrink-0" aria-hidden="true" />
                <span className="font-medium">Digital Intraoral Radiography</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Clock className="w-4 h-4 text-[#20B8A5] shrink-0" aria-hidden="true" />
                <span className="font-medium">Evening & Weekend Slots</span>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Dental Clinic Photograph & Smiling Patient */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-[#F5F8FA]">
              <img
                src="/images/hero-clinic.jpg"
                alt="Modern, pristine operatory room at Demo Dental Clinic featuring high-tech dental chair and sterilization cabinetry"
                className="w-full h-[360px] sm:h-[440px] lg:h-[480px] object-cover"
                loading="eager"
                onError={(e) => handleImageFallback(e, 'Modern Dental Clinic')}
              />
              
              {/* Subtle architectural overlay card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-md flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[#12345A] uppercase tracking-wider">Demo Dental Clinic</p>
                  <p className="text-xs text-[#5D7185] mt-0.5">Gentle, sterile and transparent oral healthcare</p>
                </div>
                <button
                  onClick={onBookClick}
                  className="px-3.5 py-1.5 text-xs font-bold text-[#12345A] bg-[#E6F8F5] hover:bg-[#20B8A5] hover:text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  Consult Now
                </button>
              </div>
            </div>

            {/* Overlapping Smiling Patient Badge Card */}
            <div className="hidden sm:flex absolute -top-5 -left-5 bg-white p-2.5 rounded-2xl shadow-xl border border-slate-200 items-center gap-3.5 max-w-xs animate-in fade-in duration-300">
              <img
                src="/images/hero-patient.jpg"
                alt="Smiling patient with healthy white teeth at Demo Dental Clinic"
                className="w-14 h-14 rounded-xl object-cover border border-slate-100"
                loading="eager"
                onError={(e) => handleImageFallback(e, 'Happy Patient')}
              />
              <div className="pr-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#20B8A5]">
                  Patient Experience
                </span>
                <p className="text-xs font-bold text-[#12345A] leading-snug">
                  Gentle, Comfortable Dental Visits
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
