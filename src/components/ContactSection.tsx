import React, { useState } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { generateWhatsAppLink } from '../utils/validation';
import { handleImageFallback } from '../utils/imageUtils';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare, 
  ExternalLink, 
  Navigation,
  AlertCircle
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [showLiveEmbed, setShowLiveEmbed] = useState(false);

  const whatsappUrl = generateWhatsAppLink(
    clinicConfig.whatsapp.number,
    "Hello Demo Dental Clinic, I would like to enquire about your clinic location and consultation timings."
  );

  return (
    <section id="contact" className="py-16 lg:py-24 bg-[#F5F8FA] border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            Visit or Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Clinic Contact & Location
          </h2>
          <p className="text-base sm:text-lg text-[#5D7185] mt-3 leading-relaxed">
            Reach out by phone, WhatsApp, or email, or drop by during regular outpatient consulting hours.
          </p>
        </div>

        {/* 2-Column Split: Contact Details & Map Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E6F8F5] text-[#20B8A5] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#12345A] mb-1">
                    Clinic Address
                  </h3>
                  <div className="text-sm text-[#243447] font-medium leading-relaxed">
                    <p>{clinicConfig.contact.addressLine1}</p>
                    <p>{clinicConfig.contact.addressLine2}</p>
                    <p className="text-xs text-[#5D7185] mt-0.5">
                      {clinicConfig.contact.landmark}
                    </p>
                    <p className="font-semibold text-[#12345A] mt-1">
                      {clinicConfig.contact.city}, {clinicConfig.contact.state} – {clinicConfig.contact.pincode}
                    </p>
                  </div>
                  <span className="inline-block mt-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded border border-slate-200">
                    Address is configurable in clinicConfig.ts
                  </span>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E6F8F5] text-[#20B8A5] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#12345A] mb-1">
                    Phone & WhatsApp
                  </h3>
                  <div className="space-y-1 text-sm text-[#243447]">
                    <p className="flex items-center gap-2">
                      <span className="font-bold text-[#12345A]">{clinicConfig.contact.displayPhone}</span>
                      <span className="text-xs text-[#5D7185]">(Appointments)</span>
                    </p>
                    {clinicConfig.contact.secondaryPhone && (
                      <p className="text-xs text-[#5D7185]">
                        Landline: {clinicConfig.contact.secondaryPhone}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-2.5">
                    <a
                      href={`tel:${clinicConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#12345A] bg-[#F5F8FA] hover:bg-slate-200/70 rounded-lg transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#20B8A5]" />
                      <span>Call Now</span>
                    </a>

                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors shadow-xs"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E6F8F5] text-[#20B8A5] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#12345A] mb-1">
                    Email Inquiries
                  </h3>
                  <a 
                    href={`mailto:${clinicConfig.contact.email}`}
                    className="text-sm font-semibold text-[#12345A] hover:text-[#20B8A5] transition-colors"
                  >
                    {clinicConfig.contact.email}
                  </a>
                  <p className="text-xs text-[#5D7185] mt-1">
                    We respond to email inquiries within 24 business hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Consulting Hours */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E6F8F5] text-[#20B8A5] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#12345A] mb-2">
                    Consulting Hours
                  </h3>
                  <div className="space-y-1.5 text-xs text-[#243447]">
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-[#5D7185]">Mon – Fri:</span>
                      <span className="font-semibold text-[#12345A]">09:30 AM – 08:30 PM</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-slate-100">
                      <span className="text-[#5D7185]">Saturday:</span>
                      <span className="font-semibold text-[#12345A]">09:30 AM – 07:30 PM</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#5D7185]">Sunday:</span>
                      <span className="font-semibold text-[#20B8A5]">10:00 AM – 01:00 PM (Prior Appt)</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2.5">
                    {clinicConfig.hours.note}
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Location Embed & Directions Placeholder */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
              
              {/* Map Header */}
              <div className="p-5 border-b border-slate-100 bg-[#F5F8FA] flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#12345A]">
                    Google Maps Location
                  </h3>
                  <p className="text-xs text-[#5D7185]">
                    Tamil Nadu, India · Location preview & navigation
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowLiveEmbed(!showLiveEmbed)}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[#12345A] transition-colors"
                  >
                    {showLiveEmbed ? 'Show Placeholder Card' : 'Preview Embed'}
                  </button>

                  <a
                    href={clinicConfig.maps.queryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-[#12345A] hover:bg-[#0A213B] rounded-lg transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#20B8A5]" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Map Canvas / Embed Frame */}
              <div className="relative min-h-[420px] flex-1 bg-slate-100 flex items-center justify-center">
                {showLiveEmbed ? (
                  <iframe
                    title="Google Maps Location Embed"
                    src={clinicConfig.maps.embedUrl}
                    width="100%"
                    height="100%"
                    className="w-full h-full min-h-[420px] border-0"
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                ) : (
                  <div className="p-6 text-center max-w-lg w-full">
                    <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-sm mb-4 bg-white">
                      <img
                        src="/images/clinic-building.jpg"
                        alt="Demo Dental Clinic location building exterior placeholder in Tamil Nadu"
                        className="w-full h-48 sm:h-56 object-cover"
                        loading="lazy"
                        onError={(e) => handleImageFallback(e, 'Clinic Location')}
                      />
                      <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-md text-[10px] font-bold text-[#12345A] border border-slate-200 shadow-xs flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-[#20B8A5]" />
                        <span>Location Image Placeholder</span>
                      </div>
                      <div className="absolute bottom-2 right-2.5 bg-[#12345A]/85 text-white text-[10px] px-2 py-0.5 rounded font-medium">
                        Tamil Nadu, India
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-[#12345A] mb-1">
                      Clinic Location & GPS Directions
                    </h4>

                    <p className="text-xs text-[#5D7185] leading-relaxed mb-4">
                      Physical clinic address placeholder ready for your GPS coordinates. In accordance with client guidelines, replace with exact location details in <code className="bg-slate-200 px-1 py-0.5 rounded font-mono">clinicConfig.ts</code>.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
                      <button
                        onClick={() => setShowLiveEmbed(true)}
                        className="w-full sm:w-auto px-4 py-2 text-xs font-bold text-white bg-[#12345A] hover:bg-[#0A213B] rounded-lg transition-colors"
                      >
                        Preview Interactive Map
                      </button>

                      <a
                        href={clinicConfig.maps.queryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-[#12345A] bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Search on Google Maps</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Map Footer Note */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-[#5D7185] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#20B8A5] shrink-0" />
                <span>
                  Parking available for patients and families. Wheelchair accessible clinic entrance.
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
