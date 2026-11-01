import React from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { Phone, Mail, MapPin, Calendar, Heart } from 'lucide-react';

interface FooterProps {
  onBookClick: () => void;
  onSelectService: (serviceId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onBookClick, onSelectService }) => {
  const currentYear = new Date().getFullYear();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A213B] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-slate-800">
          
          {/* Brand & Mission Column */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 text-white mb-4">
              <div className="w-9 h-9 rounded-xl bg-[#20B8A5] flex items-center justify-center text-white shadow-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2.2 1 4.5 2 6.5 1 2 2 4.5 2 6.5 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-1.5.5-3 1-4.5.5 1.5 1 3 1 4.5 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-2 1-4.5 2-6.5 1-2 2-4.3 2-6.5C22 4.5 15.5 2 12 2z"/>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                {clinicConfig.clinicName}
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              Modern dental care committed to gentle procedures, transparent treatment explanations, and infection-controlled clinical protocols across Tamil Nadu, India.
            </p>

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#20B8A5] hover:bg-[#179787] rounded-xl shadow-xs transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Book an Appointment</span>
            </button>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => handleScroll('#home')} 
                  className="hover:text-[#20B8A5] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('#about')} 
                  className="hover:text-[#20B8A5] transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('#services')} 
                  className="hover:text-[#20B8A5] transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('#doctors')} 
                  className="hover:text-[#20B8A5] transition-colors"
                >
                  Our Dentists
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('#why-us')} 
                  className="hover:text-[#20B8A5] transition-colors"
                >
                  Why Choose Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScroll('#contact')} 
                  className="hover:text-[#20B8A5] transition-colors"
                >
                  Contact & Map
                </button>
              </li>
            </ul>
          </div>

          {/* Dental Services Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Dental Treatments
            </h3>
            <ul className="space-y-2 text-xs">
              {clinicConfig.services.slice(0, 6).map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => {
                      onSelectService(service.id);
                      handleScroll('#services');
                    }}
                    className="hover:text-[#20B8A5] transition-colors text-left"
                  >
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Clinic Contact & Emergency Column */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Clinic Contact
            </h3>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#20B8A5] shrink-0 mt-0.5" />
                <span>
                  {clinicConfig.contact.city}, {clinicConfig.contact.state}, India
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#20B8A5] shrink-0" />
                <a 
                  href={`tel:${clinicConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {clinicConfig.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#20B8A5] shrink-0" />
                <a 
                  href={`mailto:${clinicConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {clinicConfig.contact.email}
                </a>
              </div>

              {/* Emergency Banner */}
              <div className="mt-4 p-3 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-300">
                <p className="font-semibold text-amber-400 mb-0.5">Dental Emergency?</p>
                <p>{clinicConfig.contact.emergencyNote}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Compliance */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {currentYear} {clinicConfig.clinicName}. All Rights Reserved. Located in Tamil Nadu, India.
          </p>
          <div className="flex items-center gap-2 text-[11px]">
            <span>Patient-Centred Dental Healthcare</span>
            <span>·</span>
            <span>Appointment Request Portal</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
