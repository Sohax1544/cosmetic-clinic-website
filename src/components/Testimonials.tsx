import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useAnimationFrame, useReducedMotion } from 'framer-motion';
import { Star, Quote, CheckCircle } from 'lucide-react';
import { clientConfig, Testimonial } from '../client.config';
import { EditorialPlate } from './EditorialPlate';
import { cn } from '@/lib/utils';

const TestimonialCard: React.FC<{ item: Testimonial; interactive?: boolean }> = ({ item, interactive }) => (
  <article
    tabIndex={interactive ? 0 : undefined}
    aria-hidden={interactive ? undefined : true}
    className="bg-[#F7F5F1] p-8 sm:p-9 border border-hairline rounded-2xl flex flex-col justify-between relative transition-all duration-300 hover:border-[#D6C0A0] hover:shadow-sm focus:outline-none focus-visible:border-[#D6C0A0] focus-visible:ring-2 focus-visible:ring-[#D6C0A0]"
  >
    <div>
      {/* Quote Icon and Rating Stars */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-1">
          {[...Array(item.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-[#C9A876] text-[#C9A876]" />
          ))}
        </div>
        <Quote className="w-6 h-6 text-[#C9A876]/40" />
      </div>

      {/* Patient Review Quote */}
      <p className="text-sm sm:text-base text-ink-700 font-display font-normal leading-relaxed mb-6">
        "{item.quote}"
      </p>
    </div>

    {/* Patient Metadata */}
    <div className="pt-6 border-t border-hairline">
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2.5 min-w-0">
          {item.avatar && (
            <img
              src={item.avatar}
              alt={item.name}
              className="h-8 w-8 rounded-full border border-hairline object-cover"
            />
          )}
          <span className="font-medium text-sm text-[#0A0A0A] truncate">{item.name}</span>
        </div>
        {(item.verified ?? true) && (
          <span className="inline-flex items-center gap-1 text-[10px] tracking-widest uppercase text-gold-text font-medium shrink-0">
            <CheckCircle className="w-3 h-3" />
            {clientConfig.testimonialsSection.verifiedLabel}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-ink-400">
        <span>{item.treatment}</span>
        <span>{item.location}</span>
      </div>
    </div>
  </article>
);

interface MarqueeColumnProps {
  items: Testimonial[];
  pixelsPerSecond: number;
  paused: boolean;
}

const MarqueeColumn: React.FC<MarqueeColumnProps> = ({ items, pixelsPerSecond, paused }) => {
  const y = useMotionValue(0);
  const blockRef = useRef<HTMLDivElement | null>(null);
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const update = () => setBlockHeight(el.offsetHeight);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (paused || blockHeight <= 0) return;
    let next = y.get() - (pixelsPerSecond * delta) / 1000;
    if (next <= -blockHeight) next += blockHeight;
    y.set(next);
  });

  return (
    <div className="h-full overflow-hidden">
      <motion.div style={{ y }} className="flex flex-col">
        <div ref={blockRef} className="flex flex-col gap-5 pb-5">
          {items.map((item, index) => (
            <TestimonialCard key={`a-${index}-${item.id}`} item={item} interactive />
          ))}
        </div>
        <div aria-hidden="true" className="flex flex-col gap-5 pb-5">
          {items.map((item, index) => (
            <TestimonialCard key={`b-${index}-${item.id}`} item={item} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

/**
 * What patients say.
 *
 * The reviews themselves, their content, the per-column speeds and the hover/focus pause
 * are unchanged. What changed is that the section no longer presents as three columns of
 * identical text cards — a review widget's silhouette — but as a patient-experience
 * spread: one editorial photograph establishing the room, the reviews set beside it. The
 * marquee still does the work it was built for, and `prefers-reduced-motion` still gets
 * the static list.
 */
export const Testimonials: React.FC = () => {
  const { testimonials, testimonialMarquee, testimonialsSection } = clientConfig;
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  // The marquee's per-column requestAnimationFrame loops are continuous, so stop
  // them entirely while the section is offscreen instead of burning frames below
  // the fold.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const byId = new Map(testimonials.map((item) => [item.id, item]));
  const columns = testimonialMarquee.columns
    .map((column) => ({
      pixelsPerSecond: column.pixelsPerSecond,
      items: column.testimonialIds
        .map((id) => byId.get(id))
        .filter((item): item is Testimonial => Boolean(item)),
    }))
    .filter((column) => column.items.length > 0)
    // Two columns, not three. The section now gives a third of its width to the
    // photograph, and a third text column inside what is left would be narrower than a
    // comfortable reading measure. Every marquee column carries the full review set, so
    // dropping one loses no review — only a duplicate.
    .slice(0, 2);

  const marqueeMask =
    'linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)';

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      aria-label="Verified Patient Outcomes and Testimonials"
      className="bg-[#FAF8F5] text-[#0A0A0A] py-24 sm:py-32 border-b border-hairline scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#D6C0A0]" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/85">
              {testimonialsSection.tag}
            </span>
            <div className="w-8 h-[1px] bg-[#D6C0A0]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2A2622] tracking-tight mb-4">
            {testimonialsSection.title}
          </h2>
          <p className="text-sm text-ink-500 font-normal leading-relaxed">
            {testimonialsSection.subtitle}
          </p>
        </div>

        {/* Patient experience, then the reviews. The photograph is the section's one
            visual anchor and carries about a third of its weight; setting it in the same
            editorial column system as the rest of the page is what stops the reviews
            reading as a review widget. It is a full-height portrait crop beside the
            marquee on wide screens and a 4:5 plate above it on narrow ones, and it is a
            reservation for real photography rather than a decorative panel. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-4">
            <EditorialPlate
              label="PLACEHOLDER — PATIENT EXPERIENCE"
              objectPosition="center"
              className="aspect-[4/5] w-full lg:absolute lg:inset-0 lg:aspect-auto"
            />
          </div>

          <div className="lg:col-span-8">
            {reduceMotion ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {testimonials.map((item) => (
                  <TestimonialCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div
                className="relative h-[540px] sm:h-[600px] lg:h-[660px] overflow-hidden"
                style={{ maskImage: marqueeMask, WebkitMaskImage: marqueeMask }}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={(event) => {
                  const next = event.relatedTarget as Node | null;
                  if (!next || !event.currentTarget.contains(next)) setPaused(false);
                }}
              >
                <div className="grid h-full grid-cols-1 gap-6 sm:grid-cols-2">
                  {columns.map((column, index) => (
                    <div
                      key={index}
                      className={cn('h-full', index === 1 && 'hidden sm:block')}
                    >
                      <MarqueeColumn
                        items={column.items}
                        pixelsPerSecond={column.pixelsPerSecond}
                        paused={paused || !inView}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Clinical Audit Note */}
        <div className="mt-12 text-center text-xs text-ink-400">
          <span>{testimonialsSection.auditNote}</span>
        </div>
      </div>
    </section>
  );
};
