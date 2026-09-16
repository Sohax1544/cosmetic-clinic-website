import React from 'react';
import { clientConfig } from '../client.config';
import { Link } from '../lib/router';
import { BeforeAfterSlider } from './BeforeAfterSlider';
import { ArrowRight } from 'lucide-react';

/**
 * Home results strip.
 *
 * Renders nothing unless at least one procedure actually carries a before/after pair
 * (TreatmentDetails.beforeAfter[].before and .after). The site currently ships zero
 * consented patient photographs, so this section is absent rather than showing four
 * empty sliders — an empty slider reads as a broken image, and a stock photo would
 * misrepresent a clinical result.
 *
 * To surface it: set `before` and `after` on a beforeAfter case for any procedure.
 */
export const ResultsSection: React.FC = () => {
  const { resultsSection, treatments } = clientConfig;

  const cases = treatments.flatMap((treatment) =>
    (treatment.details?.beforeAfter ?? [])
      .filter((item) => Boolean(item.before && item.after))
      .map((item) => ({ treatment, item })),
  );

  if (cases.length === 0) return null;

  return (
    <section
      id="results"
      aria-label={resultsSection.title}
      className="scroll-mt-28 border-b border-hairline bg-[#F7F5F1] pt-24 pb-20 sm:pt-32 sm:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-10 max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#C9A876]" />
            <span className="text-xs font-medium uppercase tracking-widest text-[#0A0A0A]/70">
              {resultsSection.tag}
            </span>
          </div>
          <h2 className="text-3xl tracking-tight text-[#0A0A0A] sm:text-4xl md:text-5xl">
            {resultsSection.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">{resultsSection.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {cases.slice(0, 4).map(({ treatment, item }) => (
            <figure key={`${treatment.id}-${item.label}`}>
              <BeforeAfterSlider before={item.before!} after={item.after!} />
              <figcaption className="mt-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs text-ink-400">
                <Link
                  to={`/procedures/${treatment.slug}`}
                  className="font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors hover:text-[#806334]"
                >
                  {treatment.title}
                </Link>
                <span>{item.label}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <Link
          to="/procedures"
          className="mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors hover:text-[#806334]"
        >
          {resultsSection.ctaLabel}
          <ArrowRight className="h-3.5 w-3.5 text-[#C9A876]" />
        </Link>
      </div>
    </section>
  );
};

export default ResultsSection;
