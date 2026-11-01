import React, { useState } from 'react';
import { clinicConfig } from '../config/clinicConfig';
import { generateWhatsAppLink } from '../utils/validation';
import { MessageSquare, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = generateWhatsAppLink(
    clinicConfig.whatsapp.number,
    clinicConfig.whatsapp.defaultMessage
  );

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Tooltip speech bubble */}
      {showTooltip && (
        <div className="mb-2 relative bg-white text-[#12345A] text-xs font-semibold px-3 py-2 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <span>{clinicConfig.whatsapp.helpText}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            aria-label="Dismiss WhatsApp hint"
          >
            <X className="w-3 h-3" />
          </button>
          {/* Arrow */}
          <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-r border-b border-slate-200 rotate-45" />
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open WhatsApp chat with Demo Dental Clinic"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-200 focus-clinic group"
      >
        <MessageSquare className="w-7 h-7 fill-current" />
      </a>
    </div>
  );
};
