import React from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { clinic } = clientConfig;

  return (
    <footer className="bg-[#FAF8F5] text-[#0A0A0A] border-t border-[#E6E2DA] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#E6E2DA]">
          
          {/* Col 1: Clinic Brand & Philosophy */}
          <div className="lg:col-span-4">
            <h3 className="font-serif text-xl sm:text-2xl tracking-[0.16em] uppercase font-medium mb-3">
              {clinic.name}
            </h3>
            <p className="text-xs tracking-luxury uppercase text-[#8F7041] mb-6">
              {clinic.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#525252] font-light leading-relaxed mb-6">
              {clinic.subtitle}
            </p>

            {/* Direct WhatsApp Concierge Hotline */}
            <div className="p-4 bg-[#F7F5F1] border border-[#E6E2DA] inline-block w-full">
              <span className="text-[10px] tracking-luxury uppercase text-[#737373] block mb-1">
                Direct WhatsApp Concierge
              </span>
              <a
                href={clientConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-mono font-medium text-[#0A0A0A] hover:text-[#C9A876] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#C9A876]" />
                <span>{clinic.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-4">
              Explore
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#525252] font-light">
              <li>
                <a href="#manifesto" className="hover:text-[#C9A876] transition-colors">Philosophy</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Treatments Directory</a>
              </li>
              <li>
                <a href="#team" className="hover:text-[#C9A876] transition-colors">Medical Directors</a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#C9A876] transition-colors">Patient Stories</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C9A876] transition-colors">Consultation FAQ</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Treatments */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-4">
              Core Protocols
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#525252] font-light">
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Architectural Facial Harmonization</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Polynucleotide Matrix Therapy</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Sciton Halo™ Hybrid Resurfacing</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Precision Neuromodulation</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Stem-Cell Exosome Longevity</a>
              </li>
              <li>
                <a href="#treatments" className="hover:text-[#C9A876] transition-colors">Sculptra® Collagen Induction</a>
              </li>
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-4">
              Harley Street Suite
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm text-[#525252] font-light">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A876] flex-shrink-0 mt-0.5" />
                <span>{clinic.address}</span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A876] flex-shrink-0 mt-0.5" />
                <a href={`tel:${clinic.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-[#C9A876]">
                  {clinic.phone}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A876] flex-shrink-0 mt-0.5" />
                <a href={`mailto:${clinic.email}`} className="hover:text-[#C9A876]">
                  {clinic.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#E6E2DA]">
                <Clock className="w-4 h-4 text-[#C9A876] flex-shrink-0 mt-0.5" />
                <span className="text-xs">{clinic.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Accreditations and Regulatory Strip */}
        <div className="py-8 border-b border-[#E6E2DA] flex flex-wrap items-center justify-between gap-4 text-xs text-[#737373]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A876]" />
            <span className="text-[#0A0A0A] font-medium">Accreditation:</span>
            <span>{clinic.accreditations.join(" · ")}</span>
          </div>

          <div className="text-[11px] text-[#737373]">
            Private medical appointments subject to clinical pre-assessment.
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#737373]">
          <div>
            © {new Date().getFullYear()} {clinic.name}. All rights reserved.
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            <a href="#" className="hover:text-[#0A0A0A] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#0A0A0A] transition-colors">Medical Terms</a>
            <span>·</span>
            <a href="#" className="hover:text-[#0A0A0A] transition-colors">Patient Safeguarding</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
