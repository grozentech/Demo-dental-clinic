import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateFullName,
  validateMobileNumber,
  validateEmail,
  validateAppointmentDate,
  validateTimeSlot,
  validateTreatment,
  validateAppointmentForm,
  generateWhatsAppLink,
  generateAppointmentRef
} from './validation.ts';

test('validateFullName accepts valid patient names', () => {
  assert.equal(validateFullName('Karthik Raman').isValid, true);
  assert.equal(validateFullName('Dr. Ananya').isValid, true);
  assert.equal(validateFullName('John O-Connor').isValid, true);
});

test('validateFullName rejects empty or too short names', () => {
  assert.equal(validateFullName('').isValid, false);
  assert.equal(validateFullName('   ').isValid, false);
  assert.equal(validateFullName('A').isValid, false);
});

test('validateMobileNumber handles Indian mobile numbers correctly', () => {
  // Valid 10 digits
  assert.equal(validateMobileNumber('9876543210').isValid, true);
  assert.equal(validateMobileNumber('8765432109').isValid, true);
  assert.equal(validateMobileNumber('7654321098').isValid, true);
  assert.equal(validateMobileNumber('6543210987').isValid, true);

  // Valid formatted with +91 or spaces
  const withPrefix = validateMobileNumber('+91 98765 43210');
  assert.equal(withPrefix.isValid, true);
  assert.equal(withPrefix.cleanNumber, '9876543210');

  // Invalid cases
  assert.equal(validateMobileNumber('').isValid, false);
  assert.equal(validateMobileNumber('1234567890').isValid, false); // Does not start with 6-9
  assert.equal(validateMobileNumber('98765').isValid, false); // Less than 10 digits
  assert.equal(validateMobileNumber('9876543210123').isValid, false); // Too long
  assert.equal(validateMobileNumber('98765abcde').isValid, false); // Alphabets
});

test('validateEmail validates RFC compliant email addresses', () => {
  assert.equal(validateEmail('patient@example.com').isValid, true);
  assert.equal(validateEmail('patient.chennai@domain.co.in').isValid, true);
  assert.equal(validateEmail('').isValid, false);
  assert.equal(validateEmail('invalid-email').isValid, false);
  assert.equal(validateEmail('@domain.com').isValid, false);
});

test('validateAppointmentDate handles today and future dates', () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayStr = `${year}-${month}-${day}`;

  assert.equal(validateAppointmentDate(todayStr).isValid, true);

  // Past date
  assert.equal(validateAppointmentDate('2020-01-01').isValid, false);
  assert.equal(validateAppointmentDate('').isValid, false);
});

test('validateTimeSlot checks acceptable clinic windows', () => {
  assert.equal(validateTimeSlot('Morning (09:30 AM - 01:00 PM)').isValid, true);
  assert.equal(validateTimeSlot('Afternoon (03:00 PM - 05:30 PM)').isValid, true);
  assert.equal(validateTimeSlot('Evening (05:30 PM - 08:30 PM)').isValid, true);
  assert.equal(validateTimeSlot('Midnight').isValid, false);
  assert.equal(validateTimeSlot('').isValid, false);
});

test('validateAppointmentForm aggregates validation', () => {
  const allowed = ['root-canal', 'general-dentistry'];
  
  const invalidResult = validateAppointmentForm({
    patientName: '',
    mobileNumber: '123',
    email: 'bad',
    selectedTreatment: 'invalid-id',
    preferredDate: '2020-01-01',
    preferredSlot: '',
    additionalMessage: ''
  }, allowed);

  assert.equal(invalidResult.isValid, false);
  assert.ok(invalidResult.errors.patientName);
  assert.ok(invalidResult.errors.mobileNumber);
  assert.ok(invalidResult.errors.email);
  assert.ok(invalidResult.errors.selectedTreatment);
  assert.ok(invalidResult.errors.preferredDate);
  assert.ok(invalidResult.errors.preferredSlot);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 2);
  const tYear = tomorrow.getFullYear();
  const tMonth = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const tDay = String(tomorrow.getDate()).padStart(2, '0');
  const validDateStr = `${tYear}-${tMonth}-${tDay}`;

  const validResult = validateAppointmentForm({
    patientName: 'Priya Sundaram',
    mobileNumber: '9840123456',
    email: 'priya@example.com',
    selectedTreatment: 'root-canal',
    preferredDate: validDateStr,
    preferredSlot: 'Morning (09:30 AM - 01:00 PM)',
    additionalMessage: 'Mild toothache on lower molar'
  }, allowed);

  assert.equal(validResult.isValid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);
});

test('generateWhatsAppLink constructs proper wa.me link with phone and message', () => {
  const link = generateWhatsAppLink('919876543210', 'Hello clinic');
  assert.ok(link.startsWith('https://wa.me/919876543210?text='));
  assert.ok(link.includes('Hello%20clinic'));
});

test('generateAppointmentRef returns valid formatted code', () => {
  const ref = generateAppointmentRef();
  assert.match(ref, /^DDC-\d{4}-\d{4}$/);
});
