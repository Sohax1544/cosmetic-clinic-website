import React from 'react';
import { clientConfig, Treatment, TreatmentBeforeAfterCase } from '../client.config';
import { Link, useDocumentMeta } from '../lib/router';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { TonalPlate } from '../components/TonalPlate';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { ArrowLeft, Check, Phone } from 'lucide-react';

interface ProcedurePageProps {
  treatment: Treatment;
}

const Fact: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div className="border-t border-hairline pt-3">
    <div className="text-[10px] font-medium uppercase tracking-widest text-ink-400">{label}</div>
    <div className="mt-1 text-sm text-[#0A0A0A]">{value}</div>
  </div>
);

/**
 * `onTonal` switches the label to Ink for use on the Deep Ivory ground. Bronze Ink (#806334)
 * is AA on ivory base but measures 4.27:1 on #E5E0D8 — under AA at this label size. The
 * bronze survives as the hairline dash, which is how DESIGN.md wants the accent used
 * ("a thread, not a surface").
 */
const SectionLabel: React.FC<{ children: React.ReactNode; onTonal?: boolean }> = ({
  children,
  onTonal,
}) => (
  <div className="mb-6 flex items-center gap-3">
    <span className="h-[1px] w-8 bg-[#D6C0A0]" />
    <span
      className={`text-[10px] font-medium uppercase tracking-[0.2em] ${
        onTonal ? 'text-[#0A0A0A]' : 'text-[#806334]'
      }`}
    >
      {children}
    </span>
  </div>
);

export const ProcedurePage: React.FC<ProcedurePageProps> = ({ treatment }) => {
  const { clinic, procedurePage, treatments } = clientConfig;
  const details = treatment.details;
  // Cases carrying BOTH a real before and after image.
  const beforeAfterCases = (details?.beforeAfter ?? []).filter((c) => c.before && c.after);
  // Real consented photography always wins. With none present, the labelled SAMPLE
  // fallback stands in so the slider's interaction stays reviewable (see client.config.ts).
  const beforeAfterDemo = clientConfig.beforeAfterDemo;
  const isDemoComparison = beforeAfterCases.length === 0 && beforeAfterDemo.enabled;
  const comparisons: TreatmentBeforeAfterCase[] = isDemoComparison
    ? [
        {
          label: beforeAfterDemo.label,
          before: beforeAfterDemo.before,
          after: beforeAfterDemo.after,
        },
      ]
    : beforeAfterCases;

  // The comparison and the suitable-for list share one section. Each half renders only when
  // it has content, but the section itself stands if EITHER is present — otherwise turning
  // the SAMPLE fallback off before launch would silently delete the suitable-for list too.
  const hasComparisons = comparisons.length > 0;
  const hasSuitableFor = (details?.suitableFor?.length ?? 0) > 0;
  const hasBenefits = (details?.benefits?.length ?? 0) > 0;
  const hasCallouts = (details?.callouts?.length ?? 0) > 0;
  // Everything that belongs in the column beside the comparison.
  const hasRail = hasSuitableFor || hasCallouts;

  useDocumentMeta(
    `${treatment.title} in Dubai | ${clinic.name}`,
    treatment.description,
  );

  const related = treatments
    .filter((t) => t.category === treatment.category && t.slug !== treatment.slug)
    .slice(0, 3);

  const categoryLabel =
    clientConfig.treatmentsSection.categories.find((c) => c.id === treatment.category)?.label ??
    treatment.category;

  const bookMessage = `Hello ${clinic.name}, I would like to book a consultation about ${treatment.title}.`;

  return (
    <article className="bg-[#F7F5F1]">
      {/* Breadcrumb */}
      <div className="border-b border-hairline bg-[#FAF8F5]">
        <nav
          aria-label="Breadcrumb"
          className="mx-auto flex max-w-7xl items-center gap-2 px-4 pt-28 pb-4 text-[10px] uppercase tracking-widest text-ink-400 sm:px-6 lg:px-12"
        >
          <Link to="/" className="hover:text-[#806334]">Home</Link>
          <span>/</span>
          <Link to="/procedures" className="hover:text-[#806334]">{procedurePage.breadcrumbLabel}</Link>
          <span>/</span>
          <span className="text-[#0A0A0A]">{treatment.title}</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-16">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="bg-[#0A0A0A] px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#FAF8F5]">
              {categoryLabel}
            </span>
            <span className="border border-hairline bg-[#FAF8F5] px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-ink-500">
              DHA-Licensed Physicians
            </span>
          </div>

          <h1 className="font-display text-4xl font-normal leading-[1.08] tracking-[-0.015em] text-[#2A2622] sm:text-5xl lg:text-6xl">
            {treatment.title}
          </h1>
          <p className="mt-3 text-lg text-[#806334]">{treatment.subtitle}</p>
          {details?.tagline && (
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-500">{details.tagline}</p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={clientConfig.getWhatsAppUrl(bookMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex min-h-11 items-center gap-2.5 rounded-xl bg-[#D6C0A0] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-all duration-300 hover:bg-[#B89660] hover:shadow-[0_8px_30px_rgba(214, 192, 160,0.25)]"
            >
              <WhatsAppIcon className="h-4 w-4" />
              {procedurePage.bookLabel}
            </a>
            <a
              href={`tel:${clinic.phone.replace(/\s/g, '')}`}
              className="inline-flex min-h-11 items-center gap-2.5 rounded-xl border border-[#0A0A0A] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:border-[#D6C0A0] hover:text-[#806334]"
            >
              <Phone className="h-4 w-4" />
              {clinic.phone}
            </a>
          </div>

          {/* Three short facts only. `results` is a full sentence, so in a four-up row it
              wrapped to four lines and visually outranked the treatment name itself. */}
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3">
            <Fact label={procedurePage.durationLabel} value={treatment.duration} />
            <Fact label={procedurePage.downtimeLabel} value={treatment.downtime} />
            <Fact label={procedurePage.priceLabel} value={treatment.priceGuide} />
          </div>

          {treatment.results && (
            <div className="mt-6 border-t border-hairline pt-4">
              <div className="text-[10px] font-medium uppercase tracking-widest text-ink-400">
                {procedurePage.resultsLabel}
              </div>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-[#0A0A0A]">
                {treatment.results}
              </p>
            </div>
          )}

          {/* Overview lives here rather than in a section of its own. The media column is
              tall, so a separate overview band left a dead column beneath these facts, and
              this paragraph is the right length to fill it. No eyebrow: the H1 already owns
              this context, and a tracked label would be the fourth one in this column. */}
          <div className="mt-6 border-t border-hairline pt-4" aria-label={procedurePage.overviewLabel}>
            <p className="max-w-xl text-sm leading-relaxed text-ink-500">
              {details?.overview ?? treatment.longDescription}
            </p>
            {treatment.features?.length > 0 && (
              <ul className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {treatment.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-[#0A0A0A]">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A876]" />
                    {f}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 4/5 portrait on small screens; from lg the frame stretches to whatever height the
            text column reaches (lg:aspect-auto + lg:h-full), so neither column can finish
            short and leave a dead gap beside the other. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-hairline bg-[#EFECE6] lg:aspect-auto lg:h-full lg:min-h-[520px]">
          {treatment.previewImage ? (
            <img
              src={treatment.previewImage}
              alt={`${treatment.title} at ${clinic.name} in Dubai`}
              className="h-full w-full object-cover object-top"
              loading="eager"
            />
          ) : (
            <TonalPlate label={treatment.title} />
          )}
        </div>
      </section>

      {/* Comparison, suitability and benefits share one Deep Ivory chapter.
          The comparison used to sit alone with ~193px of empty column beside it, while the
          benefits lived in their own band further down. Pairing them balances the columns
          (measured ~758px left against ~685px right) and gives the section a legible split:
          the evidence and what it helps with on the left, who it suits and the practical
          recovery facts in the rail.
          The ground is Deep Ivory, so black still means "the end" only at the closing CTA. */}
      {hasComparisons || hasRail || hasBenefits ? (
        <section className="border-t border-hairline bg-[#E5E0D8]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
              <div className={hasRail ? 'lg:col-span-2' : 'lg:col-span-3'}>
                {hasComparisons && (
                  <>
                    <SectionLabel onTonal>{procedurePage.beforeAfterLabel}</SectionLabel>
                    <div
                      className={`grid grid-cols-1 gap-8 ${
                        comparisons.length > 1 ? 'sm:grid-cols-2' : ''
                      } ${hasRail ? '' : 'max-w-3xl'}`}
                    >
                      {comparisons.map((c) => (
                        <figure key={c.label}>
                          <BeforeAfterSlider before={c.before} after={c.after} />
                          {/* ink-500, not ink-400: #666666 on #E5E0D8 is 4.37:1, under AA at 12px. */}
                          <figcaption className="mt-3 text-xs text-ink-500">
                            <span className="font-medium uppercase tracking-widest text-[#0A0A0A]">{c.label}</span>
                            {c.caption ? ` — ${c.caption}` : ''}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                    <p
                      className={`mt-6 text-xs ${isDemoComparison ? 'font-medium text-[#0A0A0A]' : 'text-ink-500'}`}
                    >
                      {isDemoComparison ? beforeAfterDemo.note : procedurePage.beforeAfterNote}
                    </p>
                  </>
                )}

                {hasBenefits && (
                  <div className={hasComparisons ? 'mt-12 border-t border-[#D6CFC3] pt-8' : ''}>
                    <SectionLabel onTonal>{procedurePage.benefitsLabel}</SectionLabel>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {(details?.benefits ?? []).map((b) => (
                        <div key={b} className="border-t border-[#D6CFC3] pt-3 text-sm leading-relaxed text-ink-500">
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {hasRail && (
                <div className={`space-y-6 lg:self-start ${hasComparisons ? '' : 'max-w-2xl'}`}>
                  {hasSuitableFor && (
                    <aside className="border border-hairline bg-[#FAF8F5] p-6">
                      <SectionLabel>{procedurePage.suitableForLabel}</SectionLabel>
                      <ul className="space-y-3">
                        {(details?.suitableFor ?? []).map((s) => (
                          <li key={s} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-500">
                            <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#D6C0A0]" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      {treatment.recommendedFor && (
                        <p className="mt-6 border-t border-hairline pt-4 text-xs leading-relaxed text-ink-400">
                          {procedurePage.recommendedForLabel}: {treatment.recommendedFor}
                        </p>
                      )}
                    </aside>
                  )}

                  {details?.callouts?.map((c) => (
                    <div key={c.label} className="border border-hairline bg-[#FAF8F5] p-6">
                      <div className="text-[10px] font-medium uppercase tracking-widest text-[#806334]">{c.label}</div>
                      <div className="mt-2 text-lg text-[#0A0A0A]">{c.value}</div>
                      {c.description && (
                        <p className="mt-2 text-sm leading-relaxed text-ink-500">{c.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Process */}
      {details?.process?.length ? (
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
            <SectionLabel>{procedurePage.processLabel}</SectionLabel>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
              {details.process.map((step, i) => {
                // A per-step override wins; otherwise the shared phase image for this
                // position. An empty path renders a plate naming the step.
                const phaseSrc = step.image || clientConfig.processPhaseImages[i]?.src || '';
                return (
                  <div key={step.title} className="border-t border-hairline pt-5">
                    <div className="mb-4 aspect-[4/5] overflow-hidden bg-[#EFECE6]">
                      {phaseSrc ? (
                        <img
                          src={phaseSrc}
                          alt={step.title}
                          className="h-full w-full object-cover object-top"
                          loading="lazy"
                        />
                      ) : (
                        <TonalPlate label={step.title} />
                      )}
                    </div>
                    <div className="text-[10px] font-medium uppercase tracking-widest text-[#806334]">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="mt-2 text-base text-[#2A2622]">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-500">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Gallery — full width. It previously shared a three-column grid with the physician
          card, which squeezed each image to roughly 245px. */}
      {details?.gallery?.length ? (
        <section className="border-t border-hairline">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12 lg:py-20">
            <SectionLabel>{procedurePage.galleryLabel}</SectionLabel>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {details.gallery.map((g) => (
                <div key={g.label} className="aspect-[4/5] overflow-hidden border border-hairline bg-[#EFECE6]">
                  {g.src ? (
                    <img src={g.src} alt={g.label} className="h-full w-full object-cover object-top" loading="lazy" />
                  ) : (
                    <TonalPlate label={g.label} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* FAQs + physician. The accordion is capped for line length, which left roughly 280px
          empty on each side; the physician card takes that space instead of a section. */}
      {details?.faqs?.length || details?.practitioner ? (
        <section className="border-t border-hairline bg-[#FAF8F5]">
          <div
            className={`mx-auto px-4 py-16 sm:px-6 lg:px-12 lg:py-20 ${
              details?.practitioner ? 'max-w-7xl' : 'max-w-4xl'
            }`}
          >
            <div className={details?.practitioner ? 'grid grid-cols-1 gap-12 lg:grid-cols-3' : ''}>
              {details?.faqs?.length ? (
                <div className={details?.practitioner ? 'lg:col-span-2' : ''}>
                  <SectionLabel>{procedurePage.faqLabel}</SectionLabel>
                  <div className="divide-y divide-[#E6E2DA] border-y border-hairline">
                    {details.faqs.map((f) => (
                      <details key={f.question} className="group py-5">
                        <summary className="flex cursor-pointer items-center justify-between gap-4 text-base text-[#0A0A0A] marker:content-none">
                          {f.question}
                          <span className="text-[#C9A876] transition-transform duration-300 group-open:rotate-45">+</span>
                        </summary>
                        <p className="mt-3 text-sm leading-relaxed text-ink-500">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </div>
              ) : null}

              {details?.practitioner && (
                <aside
                  className={`border border-hairline bg-[#F7F5F1] p-6 ${
                    details?.faqs?.length ? '' : 'max-w-2xl'
                  }`}
                >
                  <SectionLabel>{procedurePage.practitionerLabel}</SectionLabel>
                  <div className="text-base text-[#0A0A0A]">{details.practitioner.name}</div>
                  <div className="mt-1 text-[10px] font-medium uppercase tracking-widest text-[#806334]">
                    {details.practitioner.role}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-ink-500">{details.practitioner.note}</p>
                </aside>
              )}
            </div>
          </div>
        </section>
      ) : null}

      {/* Closing CTA */}
      <section className="border-t border-hairline bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-4 py-14 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <h2 className="text-2xl text-[#FAF8F5] sm:text-3xl">{procedurePage.ctaTitle}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-300">{procedurePage.ctaBody}</p>
          </div>
          <a
            href={clientConfig.getWhatsAppUrl(bookMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 flex-shrink-0 items-center gap-2.5 rounded-xl bg-[#D6C0A0] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:bg-[#B89660]"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {procedurePage.bookLabel}
          </a>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-hairline bg-[#F7F5F1]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-12">
            <SectionLabel>{procedurePage.relatedLabel}</SectionLabel>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  to={`/procedures/${r.slug}`}
                  className="group border border-hairline bg-[#FAF8F5] p-6 transition-all duration-300 hover:border-[#D6C0A0] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1)]"
                >
                  <div className="text-[10px] font-medium uppercase tracking-widest text-[#806334]">
                    {clientConfig.treatmentsSection.categories.find((c) => c.id === r.category)?.label}
                  </div>
                  <div className="mt-2 text-lg text-[#0A0A0A] group-hover:text-[#806334]">{r.title}</div>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">{r.subtitle}</p>
                </Link>
              ))}
            </div>

            <Link
              to="/procedures"
              className="mt-10 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] hover:text-[#806334]"
            >
              <ArrowLeft className="h-4 w-4" />
              {procedurePage.backToAllLabel}
            </Link>
          </div>
        </section>
      )}
    </article>
  );
};