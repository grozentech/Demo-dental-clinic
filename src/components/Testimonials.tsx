import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { Quote, MessageCircleQuestion } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { noticeTitle, noticeDescription, placeholders } = clinicConfig.testimonialsPlaceholder;

  return (
    <section className="py-16 lg:py-24 bg-[#F5F8FA] border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            Patient Experiences
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Patient Feedback & Reviews
          </h2>
          <p className="text-base text-[#5D7185] mt-3 leading-relaxed">
            We value honest feedback and strive to make every dental appointment gentle, transparent, and prompt.
          </p>
        </div>

        {/* Ethical Transparency Card */}
        <div className="max-w-4xl mx-auto mb-10 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#E6F8F5] text-[#20B8A5] flex items-center justify-center shrink-0 mt-0.5">
            <MessageCircleQuestion className="w-5 h-5" />
          </div>
          <div className="text-xs leading-relaxed text-[#5D7185]">
            <h3 className="font-bold text-[#12345A] text-sm mb-1">{noticeTitle}</h3>
            <p>{noticeDescription}</p>
          </div>
        </div>

        {/* Testimonial Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {placeholders.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between relative"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-full bg-[#12345A] text-white flex items-center justify-center font-bold text-xs tracking-wider">
                    {item.patientInitials}
                  </div>
                  <Quote className="w-6 h-6 text-[#20B8A5]/40" />
                </div>

                <div className="text-xs font-semibold text-[#20B8A5] mb-2">
                  {item.treatmentReceived}
                </div>

                <blockquote className="text-sm text-[#243447] italic leading-relaxed">
                  "{item.quote}"
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{item.dateAdded}</span>
                <span className="font-medium text-slate-500">Demo Format</span>
              </div>
            </div>
          ))}
        </div>

        {/* Google Reviews Integration Note */}
        <div className="text-center mt-10">
          <p className="text-xs text-slate-400">
            Are you an existing patient? Please share your clinic experience with our front desk or on Google.
          </p>
        </div>

      </div>
    </section>
  );
};
