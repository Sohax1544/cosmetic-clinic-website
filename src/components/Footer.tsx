import React from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ShieldCheck, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link, resolveHref, useLocation } from '../lib/router';

/**
 * Warm charcoal (#2A2622) ground, the same tonal family as the hero's field.
 *
 * The footer previously sat on Elevated Ivory (#FAF8F5) over an ivory-base page (#F7F5F1) —
 * a two-point difference, so it read as more of the page rather than as its end. The
 * charcoal is unmistakably distinct, and a distinct footer also restores meaning to the
 * mid-page surfaces: black and near-black now only ever appear at a boundary or an ending.
 *
 * Contrast on #2A2622, all verified: Ivory #FAF8F5 14.17:1 (headings and primary text),
 * Ink Faint #A3A3A3 5.98:1 (secondary copy — Ink Muted #525252 and Ink Subtle #666666 are
 * both around 2.6:1 here and fail), Bronze #C9A876 6.76:1 (labels, icons and the tagline —
 * Bronze Ink #806334 is 2.68:1 here and fails, so it must not be used on this ground).
 */
export const Footer: React.FC = () => {
  const { clinic, footer } = clientConfig;
  const { pathname } = useLocation();

  return (
    <footer className="bg-[#2A2622] text-[#FAF8F5] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#FAF8F5]/15">

          {/* Col 1: Clinic Brand & Philosophy */}
          <div className="lg:col-span-4">
            <h3 className="font-sans text-xl sm:text-2xl tracking-[0.16em] uppercase font-medium mb-3">
              {clinic.name}
            </h3>
            <p className="text-xs font-medium tracking-widest uppercase text-[#C9A876] mb-6">
              {clinic.tagline}
            </p>
            <p className="text-xs sm:text-sm text-[#A3A3A3] font-normal leading-relaxed mb-6">
              {clinic.subtitle}
            </p>

            {/* Direct WhatsApp Concierge Hotline */}
            <div className="p-4 bg-[#FAF8F5]/5 border border-[#FAF8F5]/15 inline-block w-full">
              <span className="text-[10px] font-medium tracking-widest uppercase text-[#A3A3A3] block mb-1">
                {footer.whatsappLabel}
              </span>
              <a
                href={clientConfig.getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-sans font-medium text-[#FAF8F5] hover:text-[#C9A876] transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-[#C9A876]" />
                <span>{clinic.whatsappDisplay}</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#FAF8F5] mb-4">
              {footer.exploreLabel}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A3A3A3] font-normal">
              {footer.exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link to={resolveHref(link.href, pathname)} className="hover:text-[#C9A876] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Key Treatments */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#FAF8F5] mb-4">
              {footer.protocolsLabel}
            </h4>
            <ul className="space-y-3 text-xs sm:text-sm text-[#A3A3A3] font-normal">
              {footer.protocolsLinks.map((link) => (
                <li key={link.label}>
                  <Link to={resolveHref(link.href, pathname)} className="hover:text-[#C9A876] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Location & Operating Hours */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-medium tracking-widest uppercase text-[#FAF8F5] mb-4">
              {footer.suiteLabel}
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-[#A3A3A3] font-normal">
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

              <div className="flex items-start gap-2.5 pt-2 border-t border-[#FAF8F5]/15">
                <Clock className="w-4 h-4 text-[#C9A876] flex-shrink-0 mt-0.5" />
                <span className="text-xs">{clinic.hours}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Accreditations and Regulatory Strip */}
        <div className="py-8 border-b border-[#FAF8F5]/15 flex flex-wrap items-center justify-between gap-4 text-xs text-[#A3A3A3]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#C9A876]" />
            <span className="text-[#FAF8F5] font-medium">{footer.accreditationLabel}</span>
            <span>{clinic.accreditations.join(" · ")}</span>
          </div>

          <div className="text-[11px] text-[#A3A3A3]">
            {footer.note}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="flex flex-col items-center justify-between gap-4 pt-8 pb-[calc(6rem+env(safe-area-inset-bottom))] text-xs text-[#A3A3A3] sm:flex-row sm:pb-[calc(5rem+env(safe-area-inset-bottom))]">
          <div>
            © {new Date().getFullYear()} {clinic.name}. {footer.copyrightSuffix}
          </div>

          <div className="flex items-center gap-6 text-[11px] uppercase tracking-wider">
            {footer.legalLinks.map((link, index) => (
              <React.Fragment key={link.label}>
                {index > 0 && <span>·</span>}
                <a href={link.href} className="hover:text-[#FAF8F5] transition-colors">{link.label}</a>
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};
