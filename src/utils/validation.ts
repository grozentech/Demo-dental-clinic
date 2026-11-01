/**
 * Pure validation utilities and appointment helpers
 * Decoupled from React components for deterministic unit testing.
 */

export interface AppointmentFormData {
  patientName: string;
  mobileNumber: string;
  email: string;
  selectedTreatment: string;
  preferredDate: string;
  preferredSlot: string;
  additionalMessage: string;
}

export interface FormValidationResult {
  isValid: boolean;
  errors: Partial<Record<keyof AppointmentFormData, string>>;
}

/**
 * Validates patient full name (at least 2 characters, alphabetic characters and spaces)
 */
export function validateFullName(name: string): { isValid: boolean; error?: string } {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter patient name.' };
  }
  if (trimmed.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }
  if (!/^[a-zA-Z\s.'-]+$/.test(trimmed)) {
    return { isValid: false, error: 'Name should only contain letters and standard characters.' };
  }
  return { isValid: true };
}

/**
 * Validates mobile number (standard Indian 10-digit mobile starting with 6, 7, 8, or 9)
 * Supports optional +91 prefix, spaces, or dashes.
 */
export function validateMobileNumber(phone: string): { isValid: boolean; error?: string; cleanNumber?: string } {
  if (!phone || !phone.trim()) {
    return { isValid: false, error: 'Please provide a contact mobile number.' };
  }
  
  // Strip whitespace, dashes, parens, and leading '+91' or '0'
  let digits = phone.replace(/[\s\-()]/g, '');
  if (digits.startsWith('+91')) {
    digits = digits.slice(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.slice(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.slice(1);
  }

  if (!/^\d+$/.test(digits)) {
    return { isValid: false, error: 'Mobile number must contain digits only.' };
  }

  if (digits.length !== 10) {
    return { isValid: false, error: 'Please enter a valid 10-digit mobile number.' };
  }

  // Indian mobile numbers must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(digits)) {
    return { isValid: false, error: 'Indian mobile number should start with 6, 7, 8, or 9.' };
  }

  return { isValid: true, cleanNumber: digits };
}

/**
 * Validates email address format
 */
export function validateEmail(email: string): { isValid: boolean; error?: string } {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter an email address for appointment confirmation.' };
  }
  // Standard RFC5322-compatible regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address (e.g. name@example.com).' };
  }
  return { isValid: true };
}

/**
 * Validates preferred appointment date (cannot be in the past)
 */
export function validateAppointmentDate(dateStr: string): { isValid: boolean; error?: string } {
  if (!dateStr || !dateStr.trim()) {
    return { isValid: false, error: 'Please select a preferred appointment date.' };
  }
  
  const selected = new Date(dateStr);
  if (isNaN(selected.getTime())) {
    return { isValid: false, error: 'Invalid date format.' };
  }

  // Compare to start of current day in local time
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Selected date parsed at midnight local
  const [year, month, day] = dateStr.split('-').map(Number);
  const selectedMidnight = new Date(year, month - 1, day);

  if (selectedMidnight < today) {
    return { isValid: false, error: 'Appointment date cannot be in the past.' };
  }

  // Can book up to 90 days in advance
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + 90);
  if (selectedMidnight > maxDate) {
    return { isValid: false, error: 'Appointments can be requested up to 90 days in advance.' };
  }

  return { isValid: true };
}

/**
 * Validates time slot
 */
export function validateTimeSlot(slot: string): { isValid: boolean; error?: string } {
  if (!slot || !slot.trim()) {
    return { isValid: false, error: 'Please select a preferred time slot.' };
  }
  const validSlots = ['Morning (09:30 AM - 01:00 PM)', 'Afternoon (03:00 PM - 05:30 PM)', 'Evening (05:30 PM - 08:30 PM)'];
  if (!validSlots.includes(slot)) {
    return { isValid: false, error: 'Please choose one of the available clinic appointment windows.' };
  }
  return { isValid: true };
}

/**
 * Validates treatment selection
 */
export function validateTreatment(treatmentId: string, allowedIds: string[]): { isValid: boolean; error?: string } {
  if (!treatmentId || !treatmentId.trim()) {
    return { isValid: false, error: 'Please select the dental treatment you require.' };
  }
  if (!allowedIds.includes(treatmentId)) {
    return { isValid: false, error: 'Selected treatment is not in the clinic catalogue.' };
  }
  return { isValid: true };
}

/**
 * Validates the full appointment request form
 */
export function validateAppointmentForm(
  formData: AppointmentFormData,
  allowedServiceIds: string[]
): FormValidationResult {
  const errors: Partial<Record<keyof AppointmentFormData, string>> = {};

  const nameCheck = validateFullName(formData.patientName);
  if (!nameCheck.isValid && nameCheck.error) {
    errors.patientName = nameCheck.error;
  }

  const mobileCheck = validateMobileNumber(formData.mobileNumber);
  if (!mobileCheck.isValid && mobileCheck.error) {
    errors.mobileNumber = mobileCheck.error;
  }

  const emailCheck = validateEmail(formData.email);
  if (!emailCheck.isValid && emailCheck.error) {
    errors.email = emailCheck.error;
  }

  const treatmentCheck = validateTreatment(formData.selectedTreatment, allowedServiceIds);
  if (!treatmentCheck.isValid && treatmentCheck.error) {
    errors.selectedTreatment = treatmentCheck.error;
  }

  const dateCheck = validateAppointmentDate(formData.preferredDate);
  if (!dateCheck.isValid && dateCheck.error) {
    errors.preferredDate = dateCheck.error;
  }

  const slotCheck = validateTimeSlot(formData.preferredSlot);
  if (!slotCheck.isValid && slotCheck.error) {
    errors.preferredSlot = slotCheck.error;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * Generates an appointment enquiry reference tracking ID
 * e.g. DDC-2026-8472
 */
export function generateAppointmentRef(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `DDC-${year}-${randomSuffix}`;
}

/**
 * Builds the WhatsApp web / app link with phone and pre-filled message
 */
export function generateWhatsAppLink(
  phoneNumber: string,
  customMessage?: string
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const msg = customMessage || 'Hello Demo Dental Clinic, I would like to enquire about an appointment for dental consultation.';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
}
