/**
 * Central Configuration for Demo Dental Clinic
 * 
 * All clinic contact details, doctor profiles, services, operating hours,
 * and WhatsApp integrations can be edited directly in this file.
 */

export interface DoctorProfile {
  id: string;
  name: string;
  qualification: string;
  specialisation: string;
  experienceYears?: string;
  registrationNumber?: string;
  bio: string;
  imageAlt: string;
  imageUrl: string;
  isPlaceholder: boolean;
}

export interface DentalService {
  id: string;
  title: string;
  icon: string;
  shortDescription: string;
  fullOverview: string;
  whenNeeded: string[];
  procedureSteps: string[];
  typicalDuration: string;
}

export interface ClinicConfig {
  clinicName: string;
  tagline: string;
  locationState: string;
  country: string;
  
  contact: {
    addressLine1: string;
    addressLine2: string;
    landmark: string;
    city: string;
    state: string;
    pincode: string;
    primaryPhone: string;
    displayPhone: string;
    secondaryPhone?: string;
    email: string;
    emergencyNote: string;
  };
  
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    note: string;
  };
  
  whatsapp: {
    countryCode: string;
    number: string; // digits only, e.g. 919876543210
    displayNumber: string;
    defaultMessage: string;
    helpText: string;
  };
  
  maps: {
    isConfigured: boolean;
    queryUrl: string;
    embedUrl: string;
  };
  
  doctors: DoctorProfile[];
  services: DentalService[];
  
  whyChooseUs: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }[];
  
  testimonialsPlaceholder: {
    noticeTitle: string;
    noticeDescription: string;
    placeholders: {
      id: string;
      patientInitials: string;
      treatmentReceived: string;
      quote: string;
      dateAdded: string;
    }[];
  };
}

export const clinicConfig: ClinicConfig = {
  clinicName: "Demo Dental Clinic",
  tagline: "Your Partner in Better Oral Health",
  locationState: "Tamil Nadu",
  country: "India",
  
  contact: {
    addressLine1: "[Clinic Door/Building No., Street Name - To be configured]",
    addressLine2: "[Locality / Main Road]",
    landmark: "[Near Landmark / Metro or Bus Station]",
    city: "Chennai / Coimbatore / Madurai",
    state: "Tamil Nadu",
    pincode: "600001",
    primaryPhone: "+91 98765 43210",
    displayPhone: "+91 98765 43210",
    secondaryPhone: "+91 44 2345 6789",
    email: "contact@demodentalclinic.in",
    emergencyNote: "For acute dental emergencies outside regular hours, please contact our helpline or nearest hospital."
  },
  
  hours: {
    weekdays: "Monday – Friday: 09:30 AM – 08:30 PM",
    saturday: "Saturday: 09:30 AM – 07:30 PM",
    sunday: "Sunday: 10:00 AM – 01:00 PM (Prior Appointment Only)",
    note: "Lunch Break & Sterilization Protocol: 01:30 PM – 03:00 PM"
  },
  
  whatsapp: {
    countryCode: "91",
    number: "919876543210", // Edit with actual clinic WhatsApp number
    displayNumber: "+91 98765 43210",
    defaultMessage: "Hello Demo Dental Clinic, I would like to enquire about an appointment for dental consultation. Please let me know available slots.",
    helpText: "Chat with our patient desk on WhatsApp"
  },
  
  maps: {
    isConfigured: false, // Set to true once real Google Maps Place ID / Embed URL is provided
    queryUrl: "https://www.google.com/maps/search/?api=1&query=Dental+Clinic+Tamil+Nadu+India",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.7214589025076!2d80.2452!3d13.0489!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzU2LjAiTiA4MMKwMTQnNDIuNyJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
  },
  
  doctors: [
    {
      id: "doc-1",
      name: "[Dr. Name Placeholder 1]",
      qualification: "BDS, MDS (Conservative Dentistry & Endodontics)",
      specialisation: "Senior Endodontist & Root Canal Specialist",
      experienceYears: "Placeholder: Specify Clinical Experience",
      registrationNumber: "TNDC Reg. [Placeholder]",
      bio: "Focuses on painless microscope-assisted endodontics, tooth preservation techniques, and compassionate patient care. Update with doctor's verified biography.",
      imageAlt: "Doctor 1 portrait placeholder",
      imageUrl: "/images/doctor-1.jpg",
      isPlaceholder: true
    },
    {
      id: "doc-2",
      name: "[Dr. Name Placeholder 2]",
      qualification: "BDS, MDS (Prosthodontics & Implantology)",
      specialisation: "Dental Implantologist & Smile Designer",
      experienceYears: "Placeholder: Specify Clinical Experience",
      registrationNumber: "TNDC Reg. [Placeholder]",
      bio: "Specialises in fixed dental bridges, full arch restorations, and aesthetic smile rehabilitation using digital diagnostic models.",
      imageAlt: "Doctor 2 portrait placeholder",
      imageUrl: "/images/doctor-2.jpg",
      isPlaceholder: true
    },
    {
      id: "doc-3",
      name: "[Dr. Name Placeholder 3]",
      qualification: "BDS, MDS (Orthodontics & Dentofacial Orthopedics)",
      specialisation: "Orthodontist & Clear Aligner Provider",
      experienceYears: "Placeholder: Specify Clinical Experience",
      registrationNumber: "TNDC Reg. [Placeholder]",
      bio: "Dedicated to correcting misaligned bites, teeth crowding, and contemporary clear aligner therapy for adolescents and adults.",
      imageAlt: "Doctor 3 portrait placeholder",
      imageUrl: "/images/doctor-3.jpg",
      isPlaceholder: true
    }
  ],
  
  services: [
    {
      id: "general-dentistry",
      title: "General Dentistry",
      icon: "ShieldCheck",
      shortDescription: "Comprehensive oral health checkups, digital X-rays, ultrasonic scaling, and preventive dental care for the whole family.",
      fullOverview: "Routine examinations and preventive maintenance are the foundation of lifelong oral wellness. Our general dentistry consultations include thorough soft tissue checks, cavity screening, and personalized oral hygiene guidance.",
      whenNeeded: ["Routine 6-month checkups", "Bleeding gums or persistent bad breath", "Early tooth sensitivity or mild aches", "Plaque and calculus buildup"],
      procedureSteps: ["Visual intraoral examination", "Digital low-radiation radiography if indicated", "Ultrasonic scaling and enamel polishing", "Personalised preventive care plan"],
      typicalDuration: "30 - 45 Minutes"
    },
    {
      id: "root-canal",
      title: "Root Canal Treatment",
      icon: "Activity",
      shortDescription: "Gentle, tooth-saving endodontic treatment to eliminate infected pulp tissue, relieve pain, and restore tooth longevity.",
      fullOverview: "A modern root canal relieves pain caused by deep decay, trauma, or pulpitis. Using rotary instrumentation and effective local anaesthesia, we clean and seal the internal canal system comfortably.",
      whenNeeded: ["Severe lingering tooth pain with hot/cold", "Throbbing toothache or pain while chewing", "Swelling or tender gum abscess", "Darkening of an injured tooth"],
      procedureSteps: ["Precise diagnostic vitality testing & digital X-ray", "Painless local anaesthesia administration", "Gentle removal of infected nerve tissue", "Biocompatible canal obturation and protective core build-up"],
      typicalDuration: "1 - 2 Visits (45 - 60 Min each)"
    },
    {
      id: "dental-implants",
      title: "Dental Implants",
      icon: "Sparkles",
      shortDescription: "Permanent, bio-compatible titanium posts that replace missing teeth roots, supporting natural-looking crowns and bridges.",
      fullOverview: "Dental implants offer the gold standard for tooth replacement. They fuse securely with the jawbone to restore full chewing efficiency and prevent facial bone resorption.",
      whenNeeded: ["Single or multiple missing teeth", "Discomfort with loose removable dentures", "Difficulty chewing favourite foods", "Desire for permanent, non-removable tooth replacement"],
      procedureSteps: ["3D bone density assessment & digital planning", "Minimally invasive implant fixture placement", "Osseointegration healing period", "Custom aesthetic zirconia or ceramic crown attachment"],
      typicalDuration: "Phased Treatment Plan"
    },
    {
      id: "teeth-whitening",
      title: "Teeth Whitening",
      icon: "Sun",
      shortDescription: "Safe, dentist-supervised in-clinic brightening that lifts deep coffee, tea, and age-related enamel stains.",
      fullOverview: "Professional teeth whitening utilizes clinically tested gels with enamel-protective buffers. We customize the treatment intensity to minimize sensitivity while visibly brightening your natural smile.",
      whenNeeded: ["Extrinsic stains from tea, coffee, or spices", "Dull or yellowed enamel over time", "Upcoming weddings, graduations, or special milestones", "Desire for a refreshed, brighter appearance"],
      procedureSteps: ["Gingival barrier protection application", "Enamel-safe bleaching gel application", "Light-activated stain breakdown cycles", "Post-treatment fluoride desensitising polish"],
      typicalDuration: "45 - 60 Minutes"
    },
    {
      id: "orthodontics",
      title: "Orthodontics & Braces",
      icon: "Layers",
      shortDescription: "Traditional metal braces, subtle ceramic brackets, and clear aligners to correct crowding, gaps, and bite alignment.",
      fullOverview: "Properly aligned teeth are easier to clean and chew with. We provide comprehensive orthodontic planning for children, teenagers, and working professionals using discreet and modern appliances.",
      whenNeeded: ["Crowded or overlapping teeth", "Unsightly gaps or spacing between teeth", "Overbite, underbite, or crossbite difficulties", "Jaw joint clicking or uneven wear"],
      procedureSteps: ["Orthodontic study models & photographic assessment", "Customised treatment roadmap & appliance selection", "Gentle periodic adjustments or aligner tray shifts", "Retention phase with custom retainers"],
      typicalDuration: "6 - 18 Months (Regular Checkups)"
    },
    {
      id: "cosmetic-dentistry",
      title: "Cosmetic Dentistry",
      icon: "Palette",
      shortDescription: "Artistic smile enhancements including porcelain veneers, composite bonding, and gum contouring for balanced aesthetics.",
      fullOverview: "Cosmetic dentistry harmonizes tooth proportion, shade, and contour. We combine restorative dentistry with aesthetic principles to create a natural, confident smile tailored to your facial features.",
      whenNeeded: ["Chipped, cracked, or worn tooth edges", "Discoloured teeth resistant to regular bleaching", "Minor tooth spacing or irregular shapes", "Uneven gum line affecting your smile"],
      procedureSteps: ["Smile design consultation and shade selection", "Minimal enamel preparation if veneers chosen", "Artistic layering of premium composites/ceramics", "High-gloss polish and occlusion check"],
      typicalDuration: "1 - 3 Visits"
    },
    {
      id: "tooth-extraction",
      title: "Tooth Extraction",
      icon: "HeartHandshake",
      shortDescription: "Gentle removal of non-restorable teeth or impacted wisdom teeth with focus on comfort, swift healing, and socket preservation.",
      fullOverview: "When a tooth cannot be preserved due to severe damage or impaction, our dentists perform careful atraumatic extractions with clear post-procedure care to ensure rapid, complication-free healing.",
      whenNeeded: ["Impacted or painful third molars (wisdom teeth)", "Severe tooth decay beyond restorative threshold", "Advanced periodontal mobility", "Preparation for orthodontic spacing"],
      procedureSteps: ["Local anaesthetic block for painless procedure", "Atraumatic tooth mobilization", "Socket debridement and sterile hemostatic dressing", "Detailed recovery & oral care instructions"],
      typicalDuration: "30 - 45 Minutes"
    },
    {
      id: "pediatric-dentistry",
      title: "Pediatric Dentistry",
      icon: "Smile",
      shortDescription: "Child-friendly dental examinations, pit-and-fissure sealants, fluoride treatments, and gentle care tailored for growing smiles.",
      fullOverview: "Children require special empathy and gentle techniques to foster lifelong positive oral health habits. Our team provides fun, stress-free dental visits in a relaxed and friendly setting.",
      whenNeeded: ["First dental visit by age 1 or after first tooth", "Milk tooth cavities or early decay", "Protective fissure sealants on permanent molars", "Habit breaking advice (thumb sucking, tongue thrusting)"],
      procedureSteps: ["Gentle 'tell-show-do' familiarisation", "Fun, anxiety-free dental checkup", "Protective fluoride or sealant varnish", "Parent coaching on pediatric brushing & nutrition"],
      typicalDuration: "30 Minutes"
    }
  ],
  
  whyChooseUs: [
    {
      id: "patient-centred",
      title: "Patient-Centred Care",
      description: "We prioritize your comfort, listen carefully to your concerns, and explain every procedure in simple, transparent terms before starting.",
      icon: "UserCheck"
    },
    {
      id: "modern-equipment",
      title: "Modern Dental Equipment",
      description: "Our clinic is outfitted with digital radiography, modern autoclaves, and ergonomic dental units for precise diagnostics and comfortable care.",
      icon: "Cpu"
    },
    {
      id: "personalised-plans",
      title: "Personalised Treatment Plans",
      description: "Every smile is unique. We formulate treatment options tailored to your oral health requirements, lifestyle, and individual budget.",
      icon: "FileSpreadsheet"
    },
    {
      id: "comfortable-environment",
      title: "Comfortable Clinic Environment",
      description: "Designed to relieve dental anxiety, our clinic maintains high cleanliness standards, a tranquil waiting lounge, and a gentle clinical approach.",
      icon: "Smile"
    }
  ],
  
  testimonialsPlaceholder: {
    noticeTitle: "Verified Patient Reviews Placeholder",
    noticeDescription: "In accordance with medical advertising ethics, this website does not display fabricated reviews. Real patient reviews from our verified Google Business Profile and clinic feedback forms will be updated here.",
    placeholders: [
      {
        id: "test-1",
        patientInitials: "P. R.",
        treatmentReceived: "Root Canal Treatment [Placeholder]",
        quote: "Clear treatment explanation and gentle procedure. The clinic was very neat and the appointment was on time.",
        dateAdded: "Placeholder - Patient feedback to be verified"
      },
      {
        id: "test-2",
        patientInitials: "S. K.",
        treatmentReceived: "Routine Cleaning & Consultation [Placeholder]",
        quote: "Warm consultation with clear hygiene protocols. Highly recommended for family dental checkups.",
        dateAdded: "Placeholder - Patient feedback to be verified"
      },
      {
        id: "test-3",
        patientInitials: "M. A.",
        treatmentReceived: "Orthodontic Consultation [Placeholder]",
        quote: "Doctors answered all my questions regarding aligners patiently without rushing through the visit.",
        dateAdded: "Placeholder - Patient feedback to be verified"
      }
    ]
  }
};
