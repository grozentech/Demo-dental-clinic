import React, { useState } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { 
  AppointmentFormData, 
  validateAppointmentForm, 
  generateAppointmentRef,
  generateWhatsAppLink
} from '../utils/validation';
import { 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Send,
  MessageSquare,
  RefreshCw
} from 'lucide-react';

interface AppointmentSectionProps {
  preSelectedTreatment?: string;
}

export const AppointmentSection: React.FC<AppointmentSectionProps> = ({ preSelectedTreatment }) => {
  // Today's date in YYYY-MM-DD format
  const todayStr = new Date().toISOString().split('T')[0];
  
  // Max date (90 days ahead)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 90);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const timeSlots = [
    'Morning (09:30 AM - 01:00 PM)',
    'Afternoon (03:00 PM - 05:30 PM)',
    'Evening (05:30 PM - 08:30 PM)'
  ];

  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    mobileNumber: '',
    email: '',
    selectedTreatment: preSelectedTreatment || 'general-dentistry',
    preferredDate: todayStr,
    preferredSlot: timeSlots[0],
    additionalMessage: ''
  });

  // Keep pre-selected treatment updated if changed from parent
  React.useEffect(() => {
    if (preSelectedTreatment) {
      setFormData(prev => ({ ...prev, selectedTreatment: preSelectedTreatment }));
    }
  }, [preSelectedTreatment]);

  const [errors, setErrors] = useState<Partial<Record<keyof AppointmentFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    referenceId: string;
    patientName: string;
    mobileNumber: string;
    treatmentTitle: string;
    date: string;
    slot: string;
  } | null>(null);

  const allowedServiceIds = clinicConfig.services.map(s => s.id);

  const handleInputChange = (
    field: keyof AppointmentFormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field-specific error on change
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validation = validateAppointmentForm(formData, allowedServiceIds);
    if (!validation.isValid) {
      setErrors(validation.errors);
      // Find the first error element and focus/scroll
      const firstErrorField = Object.keys(validation.errors)[0];
      const el = document.getElementById(`field-${firstErrorField}`);
      if (el) el.focus();
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Simulate safe API request dispatch
    setTimeout(() => {
      const refId = generateAppointmentRef();
      const serviceObj = clinicConfig.services.find(s => s.id === formData.selectedTreatment);
      
      setSubmittedBooking({
        referenceId: refId,
        patientName: formData.patientName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        treatmentTitle: serviceObj ? serviceObj.title : 'Dental Consultation',
        date: formData.preferredDate,
        slot: formData.preferredSlot
      });
      setIsSubmitting(false);
    }, 400);
  };

  const handleResetForm = () => {
    setSubmittedBooking(null);
    setFormData({
      patientName: '',
      mobileNumber: '',
      email: '',
      selectedTreatment: 'general-dentistry',
      preferredDate: todayStr,
      preferredSlot: timeSlots[0],
      additionalMessage: ''
    });
    setErrors({});
  };

  // WhatsApp followup link for this specific request
  const getWhatsAppFollowupLink = () => {
    if (!submittedBooking) return '';
    const msg = `Hello Demo Dental Clinic, I have submitted an appointment request online.\n\nRef: ${submittedBooking.referenceId}\nPatient: ${submittedBooking.patientName}\nTreatment: ${submittedBooking.treatmentTitle}\nDate: ${submittedBooking.date} (${submittedBooking.slot})\nMobile: ${submittedBooking.mobileNumber}\n\nPlease confirm availability. Thank you!`;
    return generateWhatsAppLink(clinicConfig.whatsapp.number, msg);
  };

  return (
    <section id="appointment" className="py-16 lg:py-24 bg-white scroll-mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#20B8A5]">
            Online Appointment Request
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#12345A] tracking-tight mt-2 text-balance">
            Request Your Dental Appointment
          </h2>
          <p className="text-base sm:text-lg text-[#5D7185] mt-3 leading-relaxed">
            Fill out the request form below. Our reception desk will contact you via phone or WhatsApp to verify availability and confirm your consultation time.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          
          {/* Submission Success State */}
          {submittedBooking ? (
            <div className="bg-[#E6F8F5]/80 border-2 border-[#20B8A5]/80 rounded-2xl p-6 sm:p-10 shadow-lg animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#20B8A5] text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#12345A]">
                    Enquiry Submitted Successfully
                  </span>
                  <h3 className="text-2xl font-bold text-[#12345A] tracking-tight">
                    Appointment Request Received
                  </h3>
                </div>
              </div>

              {/* Crucial transparency notice mandated by client instructions */}
              <div className="p-4 bg-white rounded-xl border border-slate-200 mb-6 text-sm text-[#243447]">
                <div className="flex items-start gap-2.5">
                  <Info className="w-5 h-5 text-[#12345A] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#12345A]">
                      Important: This is an appointment request, not an instant confirmed slot.
                    </p>
                    <p className="text-xs text-[#5D7185] mt-1">
                      Our front office team will call or WhatsApp you at <strong className="text-[#12345A]">{submittedBooking.mobileNumber}</strong> within clinic hours to confirm doctor availability. No payments or sensitive health histories are collected online.
                    </p>
                  </div>
                </div>
              </div>

              {/* Request Summary Receipt */}
              <div className="bg-white rounded-xl p-5 border border-slate-200 mb-6 space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-[#5D7185]">Reference ID:</span>
                  <span className="font-mono font-bold text-[#12345A] bg-[#F5F8FA] px-2 py-0.5 rounded">
                    {submittedBooking.referenceId}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-[#5D7185]">Patient Name:</span>
                  <span className="font-semibold text-[#12345A]">{submittedBooking.patientName}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-[#5D7185]">Treatment Requested:</span>
                  <span className="font-semibold text-[#20B8A5]">{submittedBooking.treatmentTitle}</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-[#5D7185]">Preferred Date:</span>
                  <span className="font-semibold text-[#12345A]">{submittedBooking.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#5D7185]">Preferred Window:</span>
                  <span className="font-semibold text-[#12345A]">{submittedBooking.slot}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3.5">
                <a
                  href={getWhatsAppFollowupLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Send Request to Clinic WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={handleResetForm}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#12345A] hover:bg-white rounded-xl border border-slate-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Submit Another Request</span>
                </button>
              </div>

            </div>
          ) : (
            /* Booking Form */
            <form 
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm"
            >
              
              {/* Form Intro Banner */}
              <div className="mb-8 p-3.5 bg-[#F5F8FA] border border-slate-200/80 rounded-xl flex items-center gap-2 text-xs text-[#5D7185]">
                <Info className="w-4 h-4 text-[#20B8A5] shrink-0" />
                <span>
                  All fields marked with <span className="text-red-500 font-bold">*</span> are required to verify slot availability.
                </span>
              </div>

              <div className="space-y-6">
                
                {/* Row 1: Name and Mobile Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Patient Name */}
                  <div>
                    <label 
                      htmlFor="field-patientName" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                    >
                      Patient Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="field-patientName"
                        value={formData.patientName}
                        onChange={(e) => handleInputChange('patientName', e.target.value)}
                        placeholder="e.g. Ramesh Kumar"
                        aria-invalid={Boolean(errors.patientName)}
                        aria-describedby={errors.patientName ? "error-patientName" : undefined}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#243447] placeholder-slate-400 focus-clinic transition-colors ${
                          errors.patientName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.patientName && (
                      <p id="error-patientName" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.patientName}</span>
                      </p>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label 
                      htmlFor="field-mobileNumber" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                    >
                      Contact Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="field-mobileNumber"
                        value={formData.mobileNumber}
                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                        placeholder="e.g. 9876543210 or +91"
                        aria-invalid={Boolean(errors.mobileNumber)}
                        aria-describedby={errors.mobileNumber ? "error-mobileNumber" : undefined}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#243447] placeholder-slate-400 focus-clinic transition-colors ${
                          errors.mobileNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.mobileNumber ? (
                      <p id="error-mobileNumber" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.mobileNumber}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">10-digit Indian mobile number for slot confirmation</p>
                    )}
                  </div>

                </div>

                {/* Row 2: Email and Treatment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Email */}
                  <div>
                    <label 
                      htmlFor="field-email" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="field-email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="name@example.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "error-email" : undefined}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#243447] placeholder-slate-400 focus-clinic transition-colors ${
                          errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.email && (
                      <p id="error-email" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Select Treatment */}
                  <div>
                    <label 
                      htmlFor="field-selectedTreatment" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                    >
                      Select Dental Treatment <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="field-selectedTreatment"
                      value={formData.selectedTreatment}
                      onChange={(e) => handleInputChange('selectedTreatment', e.target.value)}
                      aria-invalid={Boolean(errors.selectedTreatment)}
                      aria-describedby={errors.selectedTreatment ? "error-selectedTreatment" : undefined}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#243447] focus-clinic transition-colors ${
                        errors.selectedTreatment ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                      }`}
                    >
                      {clinicConfig.services.map((service) => (
                        <option key={service.id} value={service.id}>
                          {service.title}
                        </option>
                      ))}
                    </select>
                    {errors.selectedTreatment && (
                      <p id="error-selectedTreatment" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.selectedTreatment}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* Row 3: Preferred Date and Preferred Slot */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Preferred Date */}
                  <div>
                    <label 
                      htmlFor="field-preferredDate" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                    >
                      Preferred Date <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        id="field-preferredDate"
                        min={todayStr}
                        max={maxDateStr}
                        value={formData.preferredDate}
                        onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                        aria-invalid={Boolean(errors.preferredDate)}
                        aria-describedby={errors.preferredDate ? "error-preferredDate" : undefined}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#243447] focus-clinic transition-colors ${
                          errors.preferredDate ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.preferredDate ? (
                      <p id="error-preferredDate" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredDate}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-slate-400 mt-1">Available Mon–Sat (Sundays morning only)</p>
                    )}
                  </div>

                  {/* Preferred Time Window */}
                  <div>
                    <label 
                      htmlFor="field-preferredSlot" 
                      className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                    >
                      Preferred Time Window <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                        <Clock className="w-4 h-4" />
                      </div>
                      <select
                        id="field-preferredSlot"
                        value={formData.preferredSlot}
                        onChange={(e) => handleInputChange('preferredSlot', e.target.value)}
                        aria-invalid={Boolean(errors.preferredSlot)}
                        aria-describedby={errors.preferredSlot ? "error-preferredSlot" : undefined}
                        className={`w-full pl-10 pr-3.5 py-2.5 text-sm rounded-xl border bg-white text-[#243447] focus-clinic transition-colors ${
                          errors.preferredSlot ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      >
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.preferredSlot && (
                      <p id="error-preferredSlot" className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errors.preferredSlot}</span>
                      </p>
                    )}
                  </div>

                </div>

                {/* Row 4: Additional Message */}
                <div>
                  <label 
                    htmlFor="field-additionalMessage" 
                    className="block text-xs font-bold uppercase tracking-wider text-[#12345A] mb-1.5"
                  >
                    Additional Details or Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
                  </label>
                  <textarea
                    id="field-additionalMessage"
                    rows={3}
                    value={formData.additionalMessage}
                    onChange={(e) => handleInputChange('additionalMessage', e.target.value)}
                    placeholder="Briefly describe your symptoms or specific questions for the dentist (e.g. pain on upper left tooth when biting, interested in clear aligners)..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-[#243447] placeholder-slate-400 focus-clinic transition-colors"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Please do not submit sensitive personal identifiers or confidential medical records online.
                  </p>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white bg-[#12345A] hover:bg-[#0A213B] active:scale-[0.99] disabled:opacity-70 rounded-xl shadow-md transition-all focus-clinic"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#20B8A5]" />
                        <span>Submit Appointment Request</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Clinic reassurance footnote */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#5D7185]">
                  <span>📞 Need immediate assistance? Call {clinicConfig.contact.displayPhone}</span>
                  <span>🔒 Privacy-first: We never share your contact details.</span>
                </div>

              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
};
