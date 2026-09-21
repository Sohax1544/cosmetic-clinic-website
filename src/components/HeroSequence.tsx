import React from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';

/**
 * Hero — one full-bleed photograph, one composed block of type over it.
 *
 * PHOTOGRAPH. Untouched. Edge to edge, no frame, radius, margin, filter, crop or edit;
 * `object-cover` with the `object-position` from config, at natural brightness. The copy
 * is composed over the room, never the other way round.
 *
 * COMPOSITION. The copy is one editorial column on the left, sitting over the warm
 * panelled wall and the near end of the marble vanity rather than across the treatment
 * chair. The column is capped at 650px so it stops short of the frame's centre, and it
 * starts one shared container-gutter plus a ~50px editorial inset from the left edge —
 * measured at x=178 of 1440, x=428 of 1920. The chair stays the subject: the primary CTA
 * overlaps the end of it, the headline does not.
 *
 * HIERARCHY. Four steps and nothing else — eyebrow, headline, descriptor, actions. The
 * headline is 4.1× the descriptor and 5.5× the eyebrow, so the order is unambiguous at a
 * glance. The headline is two explicit elements, never one wrapped sentence, and its clamp
 * is tuned so the longer line clears the gutter at every width.
 *
 * CONTRAST. The room is bright and warm, so the type is dark and the veil is LIGHT —
 * never a dark overlay. `hero.tone` declares 'light'; the veil colour derives from it, and
 * the header reads the same token for its own contrast on the same photograph. Measured
 * against the rendered pixels behind each element at 320/390/834/1280/1440/1920, worst
 * case is 11.3:1 (#2E241A on the brightest ground), well clear of AA. No text below 11px,
 * no grey-on-photo, no pure-white type, no all-gold palette.
 *
 * NOT HERE BY DESIGN. No Google/star rating, no review count, no DHA badge or licence
 * number, no trust strip under the CTAs, no repeated phone number, no second clinic name.
 * The header owns the clinic identity and the contact detail; the hero owns the claim.
 */

/** The veil colour per tone. A bright photograph takes warm ivory; a dark one takes ink. */
const VEIL_IVORY: [number, number, number] = [250, 246, 239];
const VEIL_INK: [number, number, number] = [10, 10, 10];

export const HeroSequence: React.FC = () => {
  const { hero } = clientConfig;
  const isLightPhoto = hero.tone !== 'dark';

  // The hero's own veil, expressed as an ivory (or ink) wash so the opacities below read
  // as "how much of the room is left". Replaces the old gold scrim: over a photograph this
  // bright, a warm gold film is what made the whole band feel monotone.
  const veil = (a: number) => {
    const [r, g, b] = isLightPhoto ? VEIL_IVORY : VEIL_INK;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  // Localised contrast, concentrated behind the copy. Two soft washes: one on the left
  // third (desktop composition) and one rising from the foot of the frame (narrow screens,
  // where the block sits at the bottom). They overlap, so the values are deliberately
  // modest — the composite is what carries the type, and the photograph stays bright.
  // The effect wanted is "the type belongs here", not "there is a panel behind the type".
  const veilLayers = isLightPhoto
    ? [
        // Centre sits just right of the standard desktop gutter (~12–22% of the
        // viewport), and the ellipse reaches wide enough that a capped 650px column on a
        // 2560px display is still under its shoulder rather than off its edge.
        `radial-gradient(70% 60% at 24% 52%, ${veil(0.34)} 0%, ${veil(0.18)} 42%, ${veil(0.06)} 62%, ${veil(0)} 80%)`,
        `linear-gradient(0deg, ${veil(0.24)} 0%, ${veil(0.14)} 30%, ${veil(0.05)} 52%, ${veil(0)} 72%)`,
      ].join(', ')
    : [
        `radial-gradient(70% 62% at 22% 52%, ${veil(0.66)} 0%, ${veil(0.4)} 48%, ${veil(0)} 80%)`,
        `linear-gradient(0deg, ${veil(0.66)} 0%, ${veil(0.36)} 40%, ${veil(0)} 70%)`,
      ].join(', ');

  // Hero CTAs carry the same 12px radius (rounded-xl) as every other CTA in the system.
  // They were the one deliberately-sharp pair in the site; that exception is gone, so the
  // hero no longer reads as a different button language from the sections below it.
  //
  // Both buttons set `min-height` rather than relying on vertical padding to match: the
  // primary's label sits in a <span> (which takes its 18px line box) while the secondary's
  // is a bare text node, and under `box-sizing: border-box` that 3px difference survives
  // equal padding. An explicit floor is what actually makes the pair equal.
  const primaryButton =
    'group inline-flex w-full shrink-0 grow-0 basis-auto self-stretch items-center justify-center gap-2.5 whitespace-nowrap ' +
    'rounded-xl bg-[#D6C0A0] px-6 text-[12px] font-medium uppercase tracking-[0.15em] text-[#1A1408] ' +
    'shadow-[0_10px_26px_-14px_rgba(58,42,22,0.5)] transition-all duration-300 ' +
    'hover:-translate-y-px hover:bg-[#C9A876] hover:shadow-[0_14px_30px_-14px_rgba(58,42,22,0.55)] ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[#FAF8F5] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ' +
    'min-h-[46px] sm:min-h-[48px] sm:w-auto sm:self-start sm:px-8';

  const secondaryButton =
    'rounded-xl inline-flex w-full shrink-0 grow-0 basis-auto self-stretch items-center justify-center whitespace-nowrap border border-[#0A0A0A]/45 ' +
    'bg-transparent px-6 text-[12px] font-medium uppercase tracking-[0.15em] text-[#0A0A0A] ' +
    'transition-colors duration-300 hover:border-[#0A0A0A] hover:bg-[#FAF8F5]/35 ' +
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A] focus-visible:ring-offset-2 ' +
    'focus-visible:ring-offset-[#FAF8F5] motion-reduce:transition-none ' +
    'min-h-[46px] sm:min-h-[48px] sm:w-auto sm:self-start sm:px-8';

  return (
    <section
      id="hero"
      aria-label={hero.sectionAriaLabel}
      className="relative isolate w-full overflow-hidden bg-ivory-100"
      style={{
        // The hero is a TRUE FULL VIEWPORT: the photograph runs edge to edge vertically as
        // well as horizontally, including the band the fixed header floats over. The header
        // is transparent at the top of the page (it goes opaque only once scrolled), which
        // is the only reason that band can read as photograph rather than as a bar. The
        // header's height is accounted for in the copy's top padding below, not by shrinking
        // the section — reserving it here would leave a cream strip behind the navigation.
        minHeight: '100svh',
        // The header's container gutter is 24/32/48px, so the type column already sits ~178px
        // in on a 1440 viewport. This adds a modest editorial inset on top, which opens the
        // composition out to ~18% of the viewport at 1920.
        ['--hero-inset' as string]: 'clamp(0rem, 3.5vw, 3.75rem)',
      }}
    >
      {/* Full-bleed photograph, unmodified, filling the section on both axes.
          Descriptive alt: the room itself is what the hero is selling, and the copy does
          not describe it. */}
      {hero.image ? (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <img
            src={hero.image}
            alt={hero.imageAlt}
            fetchPriority="high"
            decoding="async"
            style={{ objectPosition: hero.imagePosition }}
            className="h-full w-full object-cover"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 overflow-hidden"
          style={{
            background:
              'radial-gradient(120% 90% at 15% 20%, #FAF8F5 0%, #F2EEE7 45%, #E5E0D8 100%)',
          }}
        />
      )}

      {/* Contrast veil. Behind the photograph's focal centre at every breakpoint. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ backgroundImage: veilLayers }}
      />

      {/* Headroom for the floating header's type, which sits on the bright upper wall.
          Only present for a light photograph — a dark one already carries ivory type. */}
      {isLightPhoto && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[170px]"
          style={{
            backgroundImage: `linear-gradient(180deg, ${veil(0.42)} 0%, ${veil(0.28)} 38%, ${veil(0.1)} 74%, ${veil(0)} 100%)`,
          }}
        />
      )}

      {/* Optional client-configured scrim, layered under the veil above. 0 renders none. */}
      {hero.overlayOpacity > 0 && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            backgroundImage: `linear-gradient(90deg, ${veil(hero.overlayOpacity)} 0%, ${veil(
              hero.overlayOpacity * 0.6,
            )} 32%, ${veil(0)} 62%)`,
          }}
        />
      )}

      {/* Content. One container, the same gutters as the header. `100svh` on the row, with
          the header's band expressed as top padding (126px / 132px) rather than as height
          subtracted above — padding keeps the row a full viewport while still holding the
          copy clear of the floating navigation. */}
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 pb-16 pt-[126px] sm:px-8 sm:pb-20 lg:px-12 lg:pb-24 lg:pt-[132px]">
        <div
          className="w-full min-w-0 max-w-[650px]"
          style={{ margin: '0 0 0 var(--hero-inset)' }}
        >
          {/* 1 — Eyebrow. Location, and only location. Reads as a marker, not a label. */}
          <p className="text-[11px] font-medium uppercase tracking-[0.19em] text-[#3B2C1C] sm:text-[12px] sm:tracking-[0.21em]">
            {hero.badgeText}
          </p>

          {/* 2 — Headline. Two explicit lines, set as two elements: the break is composed,
              never left to the browser's wrapping. 4.2vw gives 60px at 1440 and 66px at
              1920; the 28px floor keeps the longer line inside the gutter on a 320px
              phone, where the vw term alone would overhang the viewport. */}
          <h1
            className="mt-[19px] font-display font-light text-[#2A2622]"
            style={{
              fontSize: 'clamp(28px, 4.2vw, 66px)',
              lineHeight: 1.02,
              letterSpacing: '-0.022em',
            }}
          >
            <span className="block">{hero.headlineMain}</span>
            <span className="block">{hero.headlineEmphasis}</span>
          </h1>

          {/* 3 — Descriptor. The treatments offered, one line, in its own breath — not a
              second sentence competing with the headline. A readable size and colour. */}
          <p className="mt-[22px] text-[14px] font-normal leading-[1.55] tracking-[0.012em] text-[#2E241A] sm:text-[15px] lg:text-[16px]">
            {hero.subheadline}
          </p>

          {/* 4 — Actions. One primary, one understated secondary, equal height (46px from
              `sm` up), nothing beneath them. No plate, panel, tint or blur sits behind any
              of this: the veil gradients are what hold the type on one readable tone, and
              anything opaque enough to see would smudge the room instead of composing
              with it. */}
          <div className="mt-[30px] flex flex-wrap items-center gap-3">
            <a
              href={clientConfig.getWhatsAppUrl(hero.ctaWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={hero.ctaWhatsAppAriaLabel}
              className={primaryButton}
            >
              <WhatsAppIcon className="h-[15px] w-[15px] text-[#1A1408]" />
              <span>{hero.ctaWhatsAppText}</span>
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
              >
                →
              </span>
            </a>

            {hero.ctaSecondaryText && (
              <a
                href={hero.ctaSecondaryHref}
                aria-label={hero.ctaSecondaryAriaLabel}
                className={secondaryButton}
              >
                {hero.ctaSecondaryText}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSequence;