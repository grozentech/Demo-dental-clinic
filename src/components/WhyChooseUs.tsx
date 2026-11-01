import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { UserCheck, Cpu, FileSpreadsheet, Smile } from 'lucide-react';

interface WhyChooseUsProps {
  onBookClick: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onBookClick }) => {
  const renderIcon = (iconName: string) => {
    const props = { className: "w-6 h-6 text-[#20B8A5]" };
    switch (iconName) {
      case 'UserCheck': return <UserCheck {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'FileSpreadsheet': return <FileSpreadsheet {...props} />;
      case 'Smile': return <Smile {...props} />;
      default: return <Smile {...props} />;
    }
  };

  return (
    <section id="why-us" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            Why Choose {clinicConfig.clinicName}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Designed for Your Comfort and Oral Health
          </h2>
          <p className="text-base sm:text-lg text-[#5D7185] mt-3 leading-relaxed">
            We focus on ethical clinical practices, modern diagnostic technology, and a soothing atmosphere so every dental visit feels calm and stress-free.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {clinicConfig.whyChooseUs.map((feature, idx) => (
            <div
              key={feature.id}
              className="bg-[#F5F8FA] rounded-2xl p-6 border border-slate-200/80 hover:border-[#20B8A5]/60 hover:bg-white hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white shadow-xs flex items-center justify-center border border-slate-200/60">
                    {renderIcon(feature.icon)}
                  </div>
                  <span className="text-xs font-bold text-slate-300">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#12345A] tracking-tight mb-2.5">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5D7185] leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center gap-1.5 text-xs font-semibold text-[#20B8A5]">
                <span>Standard Protocol</span>
              </div>
            </div>
          ))}
        </div>

        {/* Facility Showcase Spotlight Strip */}
        <div className="rounded-2xl border border-slate-200 bg-[#F5F8FA] overflow-hidden grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <img
              src="/src/assets/images/clinic_comfort_facility_1793535400566.jpg"
              alt="Comfortable patient waiting lounge and modern reception at Demo Dental Clinic"
              className="w-full h-64 lg:h-80 object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
              Hygienic Clinical Environment
            </span>
            <h3 className="text-2xl font-bold text-[#12345A] tracking-tight mt-1 mb-3">
              A Soothing, Welcoming Clinic Environment
            </h3>
            <p className="text-sm text-[#5D7185] leading-relaxed mb-6">
              From our comfortable waiting lounge to our sanitized treatment operatories, we maintain strict sterilization cycles. Our team provides drinking water, comfortable seating, and clear communication so you and your family feel at ease.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onBookClick}
                className="px-5 py-2.5 text-sm font-bold text-white bg-[#12345A] hover:bg-[#0A213B] active:scale-[0.98] rounded-xl shadow-xs transition-all"
              >
                Plan Your Visit
              </button>
              <span className="text-xs text-[#5D7185]">
                {clinicConfig.hours.weekdays}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
