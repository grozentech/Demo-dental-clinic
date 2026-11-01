import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { handleImageFallback } from '../utils/imageUtils';
import { Award, UserCheck, Calendar } from 'lucide-react';

interface DoctorsProps {
  onBookClick: () => void;
}

export const Doctors: React.FC<DoctorsProps> = ({ onBookClick }) => {
  return (
    <section id="doctors" className="py-16 lg:py-24 bg-[#F5F8FA] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            Our Clinical Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Meet Our Dental Specialists
          </h2>
          <p className="text-base sm:text-lg text-[#5D7185] mt-3 leading-relaxed">
            Our clinic works with qualified dental professionals dedicated to evidence-based practice and patient comfort.
          </p>

          {/* Transparent Notice */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-medium text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0"></span>
            <span>Client Customisation Notice: Doctor profiles below are editable placeholders ready for clinic credentials.</span>
          </div>
        </div>

        {/* Doctor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {clinicConfig.doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Doctor Portrait Image with Replaceable Placeholder Badging */}
                <div className="relative h-64 overflow-hidden bg-slate-100 border-b border-slate-100">
                  <img
                    src={doctor.imageUrl}
                    alt={doctor.imageAlt || doctor.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    onError={(e) => handleImageFallback(e, doctor.name)}
                  />
                  
                  {/* Replaceable Template Badge */}
                  {doctor.isPlaceholder && (
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#12345A] border border-slate-200 shadow-sm flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#20B8A5]"></span>
                      <span>Replaceable Profile</span>
                    </div>
                  )}

                  <div className="absolute bottom-2 left-3 bg-[#12345A]/85 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded font-medium">
                    Editable in clinicConfig.ts
                  </div>
                </div>

                {/* Doctor Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#12345A] tracking-tight">
                    {doctor.name}
                  </h3>

                  <div className="text-xs font-bold text-[#20B8A5] mt-1">
                    {doctor.specialisation}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#5D7185] mt-2 pb-3 border-b border-slate-100">
                    <Award className="w-3.5 h-3.5 text-[#12345A] shrink-0" />
                    <span>{doctor.qualification}</span>
                  </div>

                  <p className="text-xs text-[#5D7185] leading-relaxed mt-3">
                    {doctor.bio}
                  </p>

                  {doctor.registrationNumber && (
                    <div className="mt-3 text-[11px] text-slate-400 font-mono">
                      {doctor.registrationNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={onBookClick}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-[#12345A] hover:text-white bg-[#F5F8FA] hover:bg-[#12345A] border border-slate-200 rounded-xl transition-all focus-clinic"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#20B8A5]" />
                  <span>Request Consultation</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Informational Guidance for Clinic Admin */}
        <div className="mt-12 bg-white rounded-xl p-5 border border-slate-200 text-xs text-[#5D7185] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold text-[#12345A]">Medical Council Compliance: </span>
            In accordance with Indian Dental Council guidelines, real doctor credentials, dental degrees, and state registration numbers can be configured directly in <code className="bg-slate-100 text-[#12345A] px-1.5 py-0.5 rounded font-mono">src/config/clinicConfig.ts</code>.
          </div>
          <button
            onClick={onBookClick}
            className="px-4 py-2 text-xs font-bold text-white bg-[#12345A] rounded-lg shrink-0"
          >
            Book Appointment
          </button>
        </div>

      </div>
    </section>
  );
};
