import React from 'react';
import { clientConfig } from '../client.config';
import { Link } from '../lib/router';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowRight, Check } from 'lucide-react';

/**
 * Multi-session course pricing.
 *
 * Dubai patients shopping clinics compare course prices, not single sessions, because
 * laser and resurfacing only work as a course. Every package is defined in
 * `clientConfig.packages`, and each `treatmentIds` entry is validated by
 * `npm run check` against the real catalogue, so a package can never link to a
 * procedure that does not exist.
 */
export const PackagesSection: React.FC = () => {
  const { packages, treatments, clinic } = clientConfig;
  if (!packages.items || packages.items.length === 0) return null;

  return (
    <section
      id="packages"
      aria-label={packages.title}
      className="scroll-mt-28 border-b border-hairline bg-[#FAF8F5] pt-24 pb-20 sm:pt-32 sm:pb-28"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="mb-12 max-w-2xl">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-[1px] w-8 bg-[#C9A876]" />
            <span className="text-xs font-medium uppercase tracking-widest text-[#0A0A0A]/70">
              {packages.tag}
            </span>
          </div>
          <h2 className="text-3xl tracking-tight text-[#0A0A0A] sm:text-4xl md:text-5xl">
            {packages.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink-500">{packages.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {packages.items.map((item) => {
            const linked = item.treatmentIds
              .map((id) => treatments.find((t) => t.id === id))
              .filter(Boolean);

            return (
              <article
                key={item.id}
                className="flex flex-col border border-hairline bg-[#F7F5F1] p-7 transition-colors duration-300 hover:border-[#C9A876]"
              >
                <h3 className="text-xl leading-snug text-[#0A0A0A]">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{item.summary}</p>

                <div className="mt-5 border-y border-hairline py-4">
                  <span className="block text-lg text-[#0A0A0A]">{item.priceGuide}</span>
                  {item.savingNote && (
                    <span className="mt-1 block text-[10px] uppercase tracking-widest text-[#806334]">
                      {item.savingNote}
                    </span>
                  )}
                </div>

                {item.includes && item.includes.length > 0 && (
                  <ul className="mt-5 space-y-2.5">
                    {item.includes.map((line) => (
                      <li key={line} className="flex items-start gap-2.5 text-sm text-[#525252]">
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
                        className="group inline-flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-widest text-[#806334] transition-colors hover:text-[#0A0A0A]"
                      >
                        {t!.title}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-start gap-5 border-t border-[#0A0A0A]/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-xs leading-relaxed text-ink-400">{packages.note}</p>
          <a
            href={clientConfig.getWhatsAppUrl(
              `Hello ${clinic.name}, I would like to ask about a treatment course or package.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 shrink-0 items-center gap-2.5 bg-[#C9A876] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors duration-300 hover:bg-[#B89660]"
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
