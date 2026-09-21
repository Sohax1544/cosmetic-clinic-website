import React from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowDownRight, ShieldCheck, Clock, MapPin } from 'lucide-react';

interface ClosingCTAProps {
  onOpenConsultationModal?: () => void;
}

/**
 * The booking destination, and the last thing before the footer.
 *
 * A cinematic closing statement rather than another section: one photograph, edge to
 * edge, with the booking copy composed straight onto it. The cream card, the two-column
 * split, the placeholder treatment-room plate and the flat ivory ground are all gone —
 * they made the page's final beat read as one more panel to scroll past. Every word,
 * the phone number, the WhatsApp link, the consultation trigger and the trust details
 * are unchanged; only the surface under them moved.
 *
 * WHY IT HOLDS: the photograph is doing the work. The left third of the frame is the
 * shadowed interior wall and the reflecting pool, and the figure stands in the right
 * half against the sunset — so the copy sits on the darkest part of the image and the
 * subject is never covered. The scrim therefore only has to finish a job the photograph
 * starts, which is why it can stay this light and the frame still reads bright.
 *
 * FRAMING. `object-cover` is the same mechanism as `background-size: cover`; the
 * position is the only thing that changes per breakpoint. On desktop the frame is barely
 * cropped, so centring keeps the figure beside the skyline. On a phone the frame is
 * roughly a third of the image wide, and centring would slice her out of the picture
 * entirely — so the crop is pushed to 78% and she stays in frame while the copy, which
 * has dropped to the foot of the section, sits over the terrace below her.
 *
 * COPY PLACEMENT. One scrim per breakpoint, never two stacked: a bottom-up wash where
 * the copy sits at the foot (phone and portrait tablet), a left-to-right wash where the
 * copy sits in the left third (landscape and desktop). Type is ivory and deep ivory —
 * the dark-ground pair from the palette — with bronze kept for the rule, the eyebrow and
 * the trust icons, and the champagne fill on the primary CTA. Body copy stays off the
 * pure-ink values the light sections use, because none of them clear AA on a photograph.
 */
export const ClosingCTA: React.FC<ClosingCTAProps> = ({ onOpenConsultationModal }) => {
  const { closingCta, clinic } = clientConfig;

  return (
    <section
      id="contact"
      aria-label="Book Private Consultation"
      className="relative flex min-h-[70vh] w-full scroll-mt-28 items-end overflow-hidden bg-[#2A2622] text-[#FAF8F5] sm:min-h-[76vh] sm:items-center lg:min-h-[82vh]"
    >
      {/* Full-bleed photograph. Lazy: this is the last section on the page, and the warm
          charcoal ground below is what shows until it arrives. */}
      <img
        src={closingCta.image}
        alt={closingCta.imageAlt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-[78%_50%] sm:object-center"
      />

      {/* Phone and portrait tablet: copy sits at the foot, so the wash turns upward. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(0deg,rgba(26,21,16,0.92)_0%,rgba(26,21,16,0.72)_32%,rgba(26,21,16,0.28)_58%,rgba(26,21,16,0)_78%)] sm:hidden"
      />

      {/* Landscape and desktop: copy sits in the left third, so the wash runs left to
          right and is gone well before the figure. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(26,21,16,0.88)_0%,rgba(26,21,16,0.68)_26%,rgba(26,21,16,0.32)_52%,rgba(26,21,16,0.08)_72%,rgba(26,21,16,0)_84%)] sm:block"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="w-full max-w-xl lg:max-w-[30rem]">

          {/* Tag */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-[1px] bg-[#C9A876]" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#C9A876]">
              {closingCta.tag}
            </span>
          </div>

          {/* Headline */}
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#FAF8F5] font-normal leading-[1.12] tracking-tight mb-6">
            {closingCta.headline}
          </h2>

          {/* Subheadline Body */}
          <p className="text-base sm:text-lg text-[#E5E0D8] font-normal leading-relaxed mb-10 max-w-xl">
            {closingCta.subheadline}
          </p>

          {/* WhatsApp Booking Button & Secondary Protocol Trigger */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">

            {/* Primary WhatsApp CTA */}
            <a
              href={clientConfig.getWhatsAppUrl(closingCta.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={closingCta.whatsappAriaLabel}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#D6C0A0] text-[#0A0A0A] font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#B89660] hover:shadow-[0_8px_25px_rgba(214, 192, 160,0.25)] focus:outline-none focus:ring-2 focus:ring-[#D6C0A0] rounded-xl"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A] transition-transform group-hover:scale-110" />
              <span>{closingCta.whatsAppButtonText}</span>
              <ArrowDownRight className="w-4 h-4 text-[#0A0A0A] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            {/* Secondary Button — re-toned to ivory. Its old ink border and ink label were
                legible on the cream card and would vanish on the photograph. */}
            <button
              onClick={onOpenConsultationModal}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-[#FAF8F5]/70 text-[#FAF8F5] text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#FAF8F5] hover:text-[#0A0A0A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F5] rounded-xl"
            >
              <span>{closingCta.secondaryButtonText}</span>
            </button>
          </div>

          {/* Guarantee / Non-Disclosure Note */}
          <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-[#FAF8F5]/20 text-xs text-[#E5E0D8]/85">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C9A876] shrink-0" />
              <span>{closingCta.guaranteeText}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#C9A876] shrink-0" />
              <span>{closingCta.trustNote}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C9A876] shrink-0" />
              <span>{clinic.address}</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};