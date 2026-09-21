import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { clientConfig } from '../client.config';
import { Link } from '../lib/router';
import { WhatsAppIcon } from './WhatsAppIcon';
import { TonalPlate } from './TonalPlate';
import { ArrowRight, Check } from 'lucide-react';

/**
 * Multi-session course pricing.
 *
 * Dubai patients shopping clinics compare course prices, not single sessions, because
 * laser and resurfacing only work as a course. Every package is defined in
 * `clientConfig.packages`, and each `treatmentIds` entry is validated by `npm run check`
 * against the real catalogue, so a package can never link to a procedure that does not
 * exist.
 *
 * THIS SECTION IS IVORY. It previously carried the page's one full-bleed colour chapter
 * (a deep forest ground, later with an animated aurora field behind it). Both were
 * removed: the chapter read as a foreign object in an otherwise warm, light site, and
 * the animated field fought the photography rather than supporting it. The colour this
 * section contributes now lives inside the course visuals, not in the ground.
 *
 * If a colour chapter is wanted again, the honest place to start is DESIGN.md's
 * "One Field Rule" — one chapter per page, and the page has to want it.
 *
 * THE CARDS SPEAK THE METHOD CARDS' LANGUAGE. Corner radius (rounded-2xl), the staggered
 * scroll entrance, the bronze hover border, the state lift, the media zoom and the hover
 * vignette are all lifted from `MethodSection` so the two card rows read as one system
 * rather than two. The entrance stagger is deliberately delayed on hover too, which is a
 * quirk inherited from `MethodSection` — changing it here only would desynchronise the
 * two rows, so it is copied faithfully instead.
 */
export const PackagesSection: React.FC = () => {
  const { packages, treatments, clinic } = clientConfig;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Hooks run before the empty-config early return below, so the hook order is stable
  // whether or not the client has priced any courses yet.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (!packages.items || packages.items.length === 0) return null;

  return (
    <section
      id="packages"
      ref={sectionRef}
      aria-label={packages.title}
      className="scroll-mt-28 border-b border-hairline bg-[#FAF8F5] pt-24 pb-20 text-[#0A0A0A] sm:pt-32 sm:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#D6C0A0]" />
            <span className="text-xs font-medium uppercase tracking-widest text-gold-text">
              {packages.tag}
            </span>
          </div>
          <h2 className="text-3xl tracking-tight text-[#2A2622] sm:text-4xl md:text-5xl">
            {packages.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">{packages.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {packages.items.map((item, idx) => {
            const linked = item.treatmentIds
              .map((id) => treatments.find((t) => t.id === id))
              .filter(Boolean);

            return (
              <article
                key={item.id}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-hairline bg-[#F7F5F1] transition-all duration-700 hover:border-[#D6C0A0] hover:shadow-xl ${
                  isVisible || reduceMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: reduceMotion ? '0ms' : `${idx * 150}ms`,
                }}
              >
                {item.visual && (
                  <div className="relative aspect-[3/2] w-full shrink-0 overflow-hidden">
                    <TonalPlate
                      label={item.visual.label}
                      from={item.visual.from}
                      to={item.visual.to}
                      className="h-full transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Subtle soft vignette on hover (non-solid, plate stays fully visible
                        through and around it) — the method cards' hover treatment. */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(42, 38, 34,0.45)_100%)]" />
                  </div>
                )}

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl leading-snug text-[#2A2622]">{item.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.summary}</p>

                  <div className="mt-5 border-y border-hairline py-4">
                    <span className="block text-lg text-[#0A0A0A]">{item.priceGuide}</span>
                    {item.savingNote && (
                      <span className="mt-1 block text-[10px] uppercase tracking-widest text-gold-text">
                        {item.savingNote}
                      </span>
                    )}
                  </div>

                  {item.includes && item.includes.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {item.includes.map((line) => (
                        <li
                          key={line}
                          className="flex items-start gap-2.5 text-sm text-ink-500"
                        >
                          {/* `gold` is now the champagne FILL token, so this tick names the
                              bronze explicitly: champagne on ivory measures ~1.5:1 and the
                              icon would disappear. */}
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A876]" />
                          <span className="leading-snug">{line}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {linked.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
                      {linked.map((t) => (
                        <Link
                          key={t!.id}
                          to={`/procedures/${t!.slug}`}
                          className="group/link inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-gold-text transition-colors hover:text-[#0A0A0A]"
                        >
                          {t!.title}
                          <ArrowRight className="h-3 w-3" />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-hairline pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-ink-500">{packages.note}</p>
          <a
            href={clientConfig.getWhatsAppUrl(
              `Hello ${clinic.name}, I would like to ask about a treatment course or package.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2.5 rounded-xl bg-[#D6C0A0] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:bg-[#B89660]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {packages.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
};

export default PackagesSection;
