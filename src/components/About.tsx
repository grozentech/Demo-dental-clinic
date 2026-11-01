import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { CheckCircle2, ShieldCheck, HeartPulse, Stethoscope } from 'lucide-react';

interface AboutProps {
  onBookClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onBookClick }) => {
  return (
    <section id="about" className="py-16 lg:py-24 bg-[#F5F8FA] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            About Our Practice
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Your Partner in Better Oral Health.
          </h2>
          <p className="text-base sm:text-lg text-[#5D7185] mt-4 leading-relaxed">
            At {clinicConfig.clinicName}, our philosophy centers on honest diagnostics, gentle chairside care, and patient education so you can make informed choices about your teeth and gums.
          </p>
        </div>

        {/* Split Grid: Image and Detailed Ethos */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Image with quality treatment illustration */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img
                src="/src/assets/images/about_dental_consultation_1793535386639.jpg"
                alt="Dentist explaining digital diagnostic treatment plan to patient in a welcoming clinic setting"
                className="w-full h-[360px] sm:h-[420px] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="p-5 bg-white border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E6F8F5] text-[#20B8A5] flex items-center justify-center shrink-0">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#12345A]">Transparent Diagnostics</h3>
                    <p className="text-xs text-[#5D7185]">We show you intraoral findings clearly before recommending treatments.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text & Pillars */}
          <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-[#12345A] tracking-tight mb-4">
              Patient-First Dental Care in Tamil Nadu
            </h3>
            
            <p className="text-base text-[#243447] leading-relaxed mb-6">
              Visiting a dental clinic can sometimes feel stressful. That is why our practice has been deliberately structured to ensure every patient feels comfortable, heard, and unhurried from the moment they step into our clinic.
            </p>

            <p className="text-base text-[#5D7185] leading-relaxed mb-8">
              We never recommend unnecessary procedures. Whether you are bringing your child for their first checkup, exploring discreet aligners, or seeking relief from a toothache, we provide comprehensive guidance, step-by-step cost clarity, and compassionate treatment.
            </p>

            {/* Core Commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <CheckCircle2 className="w-5 h-5 text-[#20B8A5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#12345A]">Informed Consent</h4>
                  <p className="text-xs text-[#5D7185] mt-0.5">Every stage of your treatment is clearly explained before we begin.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-[#20B8A5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#12345A]">Multi-Tier Sterilisation</h4>
                  <p className="text-xs text-[#5D7185] mt-0.5">Hospital-grade autoclave pouches opened fresh for each patient.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <HeartPulse className="w-5 h-5 text-[#20B8A5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#12345A]">Anxiety-Free Approach</h4>
                  <p className="text-xs text-[#5D7185] mt-0.5">Gentle local anaesthetics and pauses whenever you need a rest.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-slate-200/80 shadow-xs">
                <Stethoscope className="w-5 h-5 text-[#20B8A5] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-[#12345A]">Preventive Focus</h4>
                  <p className="text-xs text-[#5D7185] mt-0.5">Practical maintenance tips to preserve your natural dentition.</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={onBookClick}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-[#12345A] hover:bg-[#0A213B] active:scale-[0.98] rounded-xl transition-all focus-clinic"
              >
                Schedule a Consultation
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
