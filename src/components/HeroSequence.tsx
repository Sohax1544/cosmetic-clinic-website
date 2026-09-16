import React from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Phone } from 'lucide-react';

/**
 * Hero.
 *
 * One clinic photograph behind one headline, one primary CTA, a phone number and a
 * trust row. This replaces a 300-frame abstract image sequence that pulled ~16.5 MB
 * across 121 requests on first load in order to say nothing about the clinic.
 *
 * The design is photography-ready but does not depend on it: with `hero.image` empty
 * the same layout renders on a tonal background, so the section is never in a
 * missing-image state. To ship the real thing, drop the file into public/images and
 * set `hero.image` in client.config.ts — one line, no code change.
 */
export const HeroSequence: React.FC = () => {
  const { hero, clinic } = clientConfig;
  // Rendered as "first sentence." + line break + "remaining sentences."
  const subheadlineParts = hero.subheadline.split('. ');
  const telHref = `tel:${clinic.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <section
      id="hero"
      aria-label={hero.sectionAriaLabel}
      className="relative flex h-dvh min-h-[640px] w-full items-center overflow-hidden bg-[#0A0A0A]"
    >
      {hero.image ? (
        <img
          src={hero.image}
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          decoding="async"
          style={{ objectPosition: hero.imagePosition }}
          className="absolute inset-0 h-full w-full object-cover animate-hero-pan"
        />
      ) : (
        /* No photograph configured yet. A tonal field reads as a deliberate dark hero,
           not as a broken image, so the page is presentable before the shoot. */
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 15% 20%, #2A2622 0%, #14120F 45%, #0A0A0A 100%)',
          }}
        />
      )}

      {/* Scrim — keeps headline contrast whatever the photograph does behind it. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 72%, rgba(10, 10, 10, 0.78) 0%, rgba(10, 10, 10, 0.52) 45%, rgba(10, 10, 10, 0.18) 75%, transparent 100%),
            linear-gradient(135deg, rgba(10, 10, 10, 0.55) 0%, rgba(10, 10, 10, 0.12) 55%, transparent 100%),
            linear-gradient(to top, rgba(10, 10, 10, 0.82) 0%, rgba(10, 10, 10, 0.22) 30%, transparent 100%)
          `,
        }}
      />

      <div className="relative z-20 mx-auto w-full max-w-7xl px-6 pb-12 pt-32 sm:px-8 sm:pb-14 sm:pt-36 lg:px-12 lg:pb-16 lg:pt-40">
        <div className="max-w-3xl xl:max-w-5xl">
          <div className="mb-3 inline-block">
            <span className="border-b border-[#C9A876]/30 pb-1 text-xs font-medium uppercase tracking-widest text-[#C9A876]">
              {hero.badgeText}
            </span>
          </div>

          <h1 className="mb-12 font-sans text-4xl leading-snug tracking-tight text-[#FAF8F5] drop-shadow-sm sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
            {hero.headlineMain} <br className="hidden sm:inline" />
            <span className="font-sans font-light text-[#E0C89E]">{hero.headlineEmphasis}</span>
          </h1>

          <p className="mb-8 max-w-2xl text-base font-normal leading-relaxed text-[#E5E0D8]/90 sm:text-lg md:text-xl">
            {subheadlineParts[0]}.
            {subheadlineParts.length > 1 && (
              <>
                <br />
                {subheadlineParts.slice(1).join('. ')}
              </>
            )}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={clientConfig.getWhatsAppUrl(hero.ctaWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hero.ctaWhatsAppAriaLabel}
              className="group inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-[#C9A876] px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#0A0A0A] transition-all duration-300 hover:bg-[#B89660] hover:shadow-[0_8px_30px_rgba(201,168,118,0.25)] focus:outline-none focus:ring-2 focus:ring-[#C9A876] sm:text-sm"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#0A0A0A] transition-transform group-hover:scale-110" />
              <span>{hero.ctaWhatsAppText}</span>
            </a>

            <a
              href={telHref}
              aria-label={hero.phoneCtaAriaLabel}
              className="inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap border border-[#FAF8F5]/30 bg-transparent px-5 py-3 text-xs uppercase tracking-wide text-[#FAF8F5] transition-all duration-300 hover:border-[#C9A876] hover:bg-[#FAF8F5]/5 hover:text-[#C9A876] sm:text-sm"
            >
              <Phone className="h-4 w-4" />
              <span>{clinic.phone}</span>
            </a>
          </div>

          {/* Trust row: the above-the-fold signals every Dubai competitor leads with. */}
          <ul className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3">
            {hero.trustItems.map((item) => (
              <li key={item.label} className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-[#C9A876] sm:text-base">{item.value}</span>
                <span className="text-[10px] uppercase tracking-widest text-[#E5E0D8]/60 sm:text-[11px]">
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a
        href="#about"
        aria-label={hero.scrollHintAriaLabel}
        className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-[#FAF8F5]/40 transition-colors duration-300 hover:text-[#C9A876] lg:flex"
      >
        <span className="font-sans text-[10px] uppercase tracking-widest">{hero.scrollHintLabel}</span>
        <div className="h-4 w-[1px] animate-pulse bg-gradient-to-b from-[#C9A876] to-transparent" />
      </a>
    </section>
  );
};

export default HeroSequence;
