import React from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowDownRight, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface ClosingCTAProps {
  onOpenConsultationModal?: () => void;
}

export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenConsultationModal }) => {
  const { closingCta, clinic } = clientConfig;

  return (
    <section 
      id="contact" 
      aria-label="Book Private Consultation"
      className="relative w-full bg-[#F7F5F1] text-[#0A0A0A] py-28 sm:py-36 border-b border-hairline overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        <div className="bg-[#FAF8F5] border border-hairline rounded-3xl p-8 sm:p-14 lg:p-20 relative shadow-sm overflow-hidden">
          
          <div className="max-w-3xl">
            
            {/* Tag */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-[1px] bg-[#C9A876]" />
              <span className="text-xs font-medium tracking-widest uppercase text-gold-text">
                {closingCta.tag}
              </span>
            </div>

            {/* Bold Sans Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-sans text-[#0A0A0A] font-normal leading-[1.12] tracking-tight mb-6">
              {closingCta.headline}
            </h2>

            {/* Subheadline Body */}
            <p className="text-base sm:text-lg text-[#525252] font-normal leading-relaxed mb-10 max-w-2xl">
              {closingCta.subheadline}
            </p>

            {/* WhatsApp Booking Button & Secondary Protocol Trigger */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              
              {/* Primary WhatsApp CTA with Minimal Outline Glyph */}
              <a
                href={clientConfig.getWhatsAppUrl(closingCta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={closingCta.whatsappAriaLabel}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C9A876] text-[#0A0A0A] font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#B89660] hover:shadow-[0_8px_25px_rgba(201,168,118,0.25)] focus:outline-none focus:ring-2 focus:ring-[#C9A876] rounded-xl"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A] transition-transform group-hover:scale-110" />
                <span>{closingCta.whatsAppButtonText}</span>
                <ArrowDownRight className="w-4 h-4 text-[#0A0A0A] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>

              {/* Secondary Button */}
              <button
                onClick={onOpenConsultationModal}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-[#0A0A0A] text-[#0A0A0A] text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#0A0A0A] hover:text-[#FAF8F5] rounded-xl"
              >
                <span>{closingCta.secondaryButtonText}</span>
              </button>
            </div>

            {/* Guarantee / Non-Disclosure Note */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-hairline text-xs text-ink-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A876]" />
                <span>{closingCta.guaranteeText}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#C9A876]" />
                <span>{closingCta.trustNote}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A876]" />
                <span>{clinic.address}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
