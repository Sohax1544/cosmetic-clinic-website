import React, { useMemo, useState } from 'react';
import { clientConfig } from '../client.config';
import { Link, useDocumentMeta } from '../lib/router';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { TonalPlate } from '../components/TonalPlate';
import { ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * /procedures — the full treatment directory.
 *
 * The competitor clinics all run a browsable directory of every procedure they offer,
 * which is the main thing this site was missing: before, the 21 procedures beyond the
 * handful on the home grid had no address of their own. This page is generated entirely
 * from `clientConfig.treatments`, so adding a procedure to the config lists it here and
 * gives it a page, with no code change.
 */
export const ProceduresIndexPage: React.FC = () => {
  const { treatments, treatmentsSection, proceduresIndexPage, clinic } = clientConfig;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useDocumentMeta(proceduresIndexPage.metaTitle, proceduresIndexPage.metaDescription);

  const filtered = useMemo(
    () =>
      activeCategory === 'all'
        ? treatments
        : treatments.filter((t) => t.category === activeCategory),
    [treatments, activeCategory],
  );

  const categoryLabel = (id: string) =>
    treatmentsSection.categories.find((c) => c.id === id)?.label ?? id;

  return (
    <div className="bg-[#F7F5F1]">
      {/* Header band */}
      <section className="border-b border-hairline bg-[#FAF8F5]">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-32 sm:px-8 lg:px-12">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-ink-400"
          >
            <Link to="/" className="hover:text-[#806334]">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#0A0A0A]">{proceduresIndexPage.title}</span>
          </nav>

          <div className="mt-8 max-w-3xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#C9A876]" />
              <span className="text-xs font-medium uppercase tracking-widest text-[#0A0A0A]/70">
                {proceduresIndexPage.tag}
              </span>
            </div>
            <h1 className="text-4xl leading-[1.08] tracking-[-0.025em] text-[#0A0A0A] sm:text-5xl lg:text-6xl">
              {proceduresIndexPage.title}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-ink-500 sm:text-lg">
              {proceduresIndexPage.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-[72px] z-30 border-b border-hairline bg-[#F7F5F1]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-2 px-6 py-4 sm:px-8 lg:px-12">
          {treatmentsSection.categories.map((category) => {
            const active = activeCategory === category.id;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActiveCategory(category.id)}
                aria-pressed={active}
                className={cn(
                  'rounded-md border px-3.5 py-2 text-[10px] font-medium uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]',
                  active
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F5]'
                    : 'border-hairline bg-[#FAF8F5] text-[#0A0A0A] hover:border-[#C9A876]',
                )}
              >
                {category.label}
              </button>
            );
          })}
          <span className="ml-auto text-[10px] uppercase tracking-widest text-ink-400">
            {filtered.length} {proceduresIndexPage.resultsLabel}
          </span>
        </div>
      </section>

      {/* Directory */}
      <section className="pb-20 pt-12 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          {filtered.length === 0 ? (
            <p className="py-20 text-center text-base text-ink-500">{proceduresIndexPage.noResults}</p>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((treatment) => (
                <article
                  key={treatment.id}
                  className="group flex flex-col border border-hairline bg-[#FAF8F5] transition-all duration-300 hover:border-[#C9A876] hover:shadow-[0_10px_30px_-12px_rgba(10,10,10,0.18)]"
                >
                  {/* Media slot. A real photograph replaces the tonal plate the moment a
                      procedure has `previewImage` set in client.config.ts — the category
                      label rides the media area either way, so the grid stays consistent. */}
                  {/* 4/5 is an editorial portrait ratio close to the supplied photography's
                      own 0.73–0.74, so with object-top the small remainder is trimmed off
                      the bottom and heads stay intact. 16/9 cut faces off; 3/4 cost too
                      much card height for a grid whose job is comparison-by-scanning. */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden border-b border-hairline bg-[#EFECE6]">
                    {treatment.previewImage ? (
                      <>
                        <img
                          src={treatment.previewImage}
                          alt={`${treatment.title} at ${clinic.name}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                        <span className="absolute left-3 top-3 rounded-md border border-hairline bg-[#FAF8F5]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#0A0A0A] backdrop-blur-md">
                          {categoryLabel(treatment.category)}
                        </span>
                      </>
                    ) : (
                      <TonalPlate label={categoryLabel(treatment.category)} />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h2 className="text-xl leading-snug text-[#0A0A0A]">{treatment.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">
                      {treatment.subtitle}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-hairline pt-4 text-xs text-ink-400">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5 text-[#C9A876]" />
                        {treatment.duration}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="h-3.5 w-3.5 text-[#C9A876]" />
                        {treatment.downtime}
                      </span>
                    </div>
                  </div>

                  {/* Stacked, not side-by-side: at the 3-column breakpoint the price and
                      the link cannot share a row without one wrapping mid-label. */}
                  <div className="border-t border-hairline px-6 py-4">
                    <div className="text-sm text-[#0A0A0A]">{treatment.priceGuide}</div>
                    <Link
                      to={`/procedures/${treatment.slug}`}
                      aria-label={`${treatment.title} details`}
                      className="mt-2.5 inline-flex items-center gap-1.5 whitespace-nowrap text-[10px] font-medium uppercase tracking-widest text-[#806334] transition-colors hover:text-[#0A0A0A]"
                    >
                      {treatmentsSection.detailsLabel}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Closing CTA */}
          <div className="mt-16 flex flex-col items-start gap-5 border-t border-[#0A0A0A]/15 pt-10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl text-[#0A0A0A] sm:text-3xl">Not sure where to start?</h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-500">
                Send us a message describing what bothers you. A DHA-licensed physician will
                tell you which of these procedures is worth doing — and which are not.
              </p>
            </div>
            <a
              href={clientConfig.getWhatsAppUrl(
                `Hello ${clinic.name}, I would like advice on which treatment is right for me.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 shrink-0 items-center gap-2.5 bg-[#C9A876] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:bg-[#B89660]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {treatmentsSection.whatsappCtaLabel}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProceduresIndexPage;
