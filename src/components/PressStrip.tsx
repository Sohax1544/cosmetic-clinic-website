import React from 'react';
import { clientConfig } from '../client.config';

/**
 * Press / media strip.
 *
 * Renders nothing when `clientConfig.press.items` is empty. That is the shipped
 * default: a clinic site that invents "as featured in" logos is making a false claim,
 * so this section only appears once real, checkable coverage is added to the config.
 *
 * Wordmarks are set in the site's own type rather than shipped as image files, so
 * adding an outlet needs no asset work:
 *   press: { items: [{ name: "Gulf News", note: "Feature, March 2025", href: "..." }] }
 */
export const PressStrip: React.FC = () => {
  const { press } = clientConfig;
  if (!press.items || press.items.length === 0) return null;

  return (
    <section
      id="press"
      aria-label={press.title}
      className="scroll-mt-28 border-b border-hairline bg-[#FAF8F5] py-12"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-10">
          <div className="shrink-0">
            <div className="mb-2 flex items-center gap-3">
              <div className="h-[1px] w-8 bg-[#C9A876]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-400">
                {press.tag}
              </span>
            </div>
            <p className="text-sm text-[#0A0A0A]">{press.title}</p>
          </div>

          <ul className="flex flex-1 flex-wrap items-center gap-x-10 gap-y-5">
            {press.items.map((item) => {
              const wordmark = (
                <span className="font-sans text-lg tracking-[0.08em] text-[#0A0A0A]/70 transition-colors group-hover:text-[#0A0A0A] sm:text-xl">
                  {item.name}
                </span>
              );
              const note = item.note ? (
                <span className="mt-0.5 block text-[10px] uppercase tracking-widest text-ink-400">
                  {item.note}
                </span>
              ) : null;

              return (
                <li key={item.name}>
                  {item.href ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                    >
                      {wordmark}
                      {note}
                    </a>
                  ) : (
                    <span className="group block">
                      {wordmark}
                      {note}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PressStrip;
