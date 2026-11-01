/**
 * Demo Dental Clinic - Web Application
 * Premium Dental Healthcare Practice in Tamil Nadu, India
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Doctors } from './components/Doctors';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { AppointmentSection } from './components/AppointmentSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [selectedTreatment, setSelectedTreatment] = useState<string>('general-dentistry');

  const scrollToAppointment = () => {
    const el = document.getElementById('appointment');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      // Optional subtle highlight/focus
      setTimeout(() => {
        const input = document.getElementById('field-patientName');
        if (input) input.focus();
      }, 400);
    }
  };

  const handleSelectServiceForBooking = (serviceId: string) => {
    setSelectedTreatment(serviceId);
    scrollToAppointment();
  };

  const handleExploreServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#243447] flex flex-col selection:bg-[#20B8A5]/20 selection:text-[#12345A]">
      
      {/* Clinic Header */}
      <Header onBookClick={scrollToAppointment} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero 
          onBookClick={scrollToAppointment} 
          onExploreServices={handleExploreServices} 
        />

        {/* 2. About Section */}
        <About onBookClick={scrollToAppointment} />

        {/* 3. Services Section with 8 Cards & Learn More Modal */}
        <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

        {/* 4. Doctors Section with Editable Placeholders */}
        <Doctors onBookClick={scrollToAppointment} />

        {/* 5. Why Choose Us Section */}
        <WhyChooseUs onBookClick={scrollToAppointment} />

        {/* 6. Testimonials Section with Clear Placeholders */}
        <Testimonials />

        {/* 7. Appointment Booking Enquiry Form */}
        <AppointmentSection preSelectedTreatment={selectedTreatment} />

        {/* 8. Contact & Google Maps Placeholder Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer 
        onBookClick={scrollToAppointment} 
        onSelectService={(serviceId) => {
          setSelectedTreatment(serviceId);
          handleExploreServices();
        }} 
      />

      {/* Floating WhatsApp Action Widget */}
      <FloatingWhatsApp />

    </div>
  );
}
