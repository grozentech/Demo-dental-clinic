import React, { useState, useEffect } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { Menu, X, Calendar, Phone } from 'lucide-react';

interface HeaderProps {
  onBookClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onBookClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 py-3' 
          : 'bg-white border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          
          {/* Brand Wordmark (Clean single-line brand per top bar contract) */}
          <a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-2.5 text-[#12345A] group shrink-0 focus-clinic rounded-md"
            aria-label={`${clinicConfig.clinicName} homepage`}
          >
            <div className="w-10 h-10 rounded-xl bg-[#12345A] flex items-center justify-center text-white shadow-sm group-hover:bg-[#20B8A5] transition-colors">
              <svg 
                className="w-6 h-6 fill-current" 
                viewBox="0 0 24 24" 
                aria-hidden="true"
              >
                <path d="M12 2C8.5 2 6 4.5 6 7.5c0 2.2 1 4.5 2 6.5 1 2 2 4.5 2 6.5 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-1.5.5-3 1-4.5.5 1.5 1 3 1 4.5 0 .8.7 1.5 1.5 1.5s1.5-.7 1.5-1.5c0-2 1-4.5 2-6.5 1-2 2-4.3 2-6.5C22 4.5 15.5 2 12 2z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-[#12345A] leading-tight">
                {clinicConfig.clinicName}
              </span>
              <span className="text-xs text-[#5D7185] font-medium hidden sm:inline">
                Oral Health Clinic · Tamil Nadu
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav 
            className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#243447]"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#20B8A5] transition-colors py-1 whitespace-nowrap shrink-0 focus-clinic rounded"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Zone */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <a 
              href={`tel:${clinicConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
              className="hidden xl:flex items-center gap-1.5 text-xs font-semibold text-[#12345A] bg-[#F5F8FA] hover:bg-slate-200/70 px-3 py-2 rounded-lg transition-colors whitespace-nowrap"
              title="Call Reception"
            >
              <Phone className="w-3.5 h-3.5 text-[#20B8A5]" aria-hidden="true" />
              <span>{clinicConfig.contact.displayPhone}</span>
            </a>

            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#12345A] hover:bg-[#0A213B] active:scale-[0.98] rounded-lg shadow-sm transition-all focus-clinic whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#20B8A5]" aria-hidden="true" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onBookClick}
              className="px-3 py-1.5 text-xs font-bold text-white bg-[#12345A] rounded-lg focus-clinic whitespace-nowrap"
            >
              Book
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#12345A] hover:bg-slate-100 rounded-lg focus-clinic"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-200 bg-white shadow-xl px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-2 text-base font-semibold text-[#243447] hover:bg-[#F5F8FA] hover:text-[#20B8A5] rounded-md transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookClick();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 text-sm font-bold text-white bg-[#12345A] active:bg-[#0A213B] rounded-lg shadow"
              >
                <Calendar className="w-4 h-4 text-[#20B8A5]" />
                Book an Appointment
              </button>

              <a
                href={`tel:${clinicConfig.contact.primaryPhone.replace(/\s+/g, '')}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-[#12345A] bg-[#F5F8FA] rounded-lg"
              >
                <Phone className="w-4 h-4 text-[#20B8A5]" />
                Call {clinicConfig.contact.displayPhone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
