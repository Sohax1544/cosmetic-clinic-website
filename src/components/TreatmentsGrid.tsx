import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { clientConfig, Treatment } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Clock, Shield, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Plus } from 'lucide-react';
import { ProcedureDetailDialog } from './ProcedureDetailDialog';
import { Link } from '../lib/router';

// One shared easing for the whole expand/collapse so height and opacity move in lockstep.
const CARD_EASE: [number, number, number, number] = [0.25, 1, 0.5, 1];

export const TreatmentsGrid: React.FC = () => {
  const { treatments, treatmentsSection } = clientConfig;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [selectedTreatment, setSelectedTreatment] = useState<Treatment | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Single source of truth for opening the dialog, shared by the image/title trigger
  // and the "View Full Details" button.
  const onOpenDetails = (id: string) => {
    const match = treatments.find((t) => t.id === id);
    if (match) setSelectedTreatment(match);
  };

  const categories = treatmentsSection.categories;

  const filteredTreatments = activeCategory === 'all'
    ? treatments
    : treatments.filter((t) => t.category === activeCategory);

  // Exactly 3 cards per view on desktop
  const cardsPerPage = 3;
  const totalPages = Math.max(1, Math.ceil(filteredTreatments.length / cardsPerPage));

  // Partition into pages of exactly 3 cards
  const pages: Treatment[][] = [];
  for (let i = 0; i < filteredTreatments.length; i += cardsPerPage) {
    pages.push(filteredTreatments.slice(i, i + cardsPerPage));
  }
  if (pages.length === 0) pages.push([]);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(0);
  };

  return (
    <section 
      id="treatments"
      aria-label="Treatments and procedures"
      className="bg-[#F7F5F1] text-[#0A0A0A] pt-24 sm:pt-32 pb-20 sm:pb-28 border-b border-hairline scroll-mt-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-[#C9A876]" />
              <span className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/70">
                {treatmentsSection.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans text-[#0A0A0A] tracking-tight">
            {treatmentsSection.title}
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            {/* Page Position Indicator */}
            <div className="flex items-center gap-2 font-sans text-xs text-gold-text tracking-widest uppercase">
              <span className="text-sm font-medium text-[#0A0A0A]">
                {String(currentPage + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(totalPages).padStart(2, '0')}</span>
            </div>

            {/* Navigation Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label={treatmentsSection.prevAriaLabel}
                className="flex h-11 w-11 items-center justify-center border border-hairline bg-[#FAF8F5] text-[#0A0A0A] hover:border-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0A0A] transition-all duration-200 rounded-lg shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label={treatmentsSection.nextAriaLabel}
                className="flex h-11 w-11 items-center justify-center border border-hairline bg-[#FAF8F5] text-[#0A0A0A] hover:border-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0A0A] transition-all duration-200 rounded-lg shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-hairline/80 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`inline-flex min-h-11 items-center px-4 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200 whitespace-nowrap border rounded-full ${
                activeCategory === cat.id
                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F5]'
                  : 'border-transparent text-ink-400 hover:text-[#0A0A0A] hover:bg-[#EFECE6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Empty state when a filter matches nothing */}
        {filteredTreatments.length === 0 && (
          <p className="py-20 text-center text-sm font-normal text-[#525252]">{treatmentsSection.emptyMessage}</p>
        )}

        {/* Full-Page Carousel Viewport: pb provides enough downward room for the expanded card so rounded bottom edges stay visible */}
        {filteredTreatments.length > 0 && (
        <div className="relative w-full overflow-hidden pb-[280px] -mb-[170px]">
          <div 
            className="flex transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(-${currentPage * 100}%)`
            }}
          >
            {pages.map((pageTreatments, pageIdx) => (
              <div
                key={`page-${pageIdx}`}
                className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {pageTreatments.map((treatment) => {
                  const expanded = expandedId === treatment.id;
                  return (
                  /* Fixed-height cell container: guarantees siblings never push, shift or resize */
                  <div 
                    key={treatment.id} 
                    className="relative h-[420px] sm:h-[440px] w-full"
                  >
                    {/* Self-contained card. Expansion is ONE Framer Motion transition: height + opacity together. */}
                    <article
                      onMouseEnter={() => setExpandedId(treatment.id)}
                      onMouseLeave={() => setExpandedId((current) => (current === treatment.id ? null : current))}
                      className={`group absolute top-0 inset-x-0 z-10 ${expanded ? 'z-30 border-[#C9A876]' : 'border-hairline'} rounded-2xl border text-[#0A0A0A] bg-[#0A0A0A] transition-colors duration-300`}
                    >
                      {/* Image + scrim, one clipped unit. Inner radius = card 16px − border 1px = 15px,
                          via overflow-hidden AND clip-path so the corner survives GPU layer promotion. */}
                      <div className={`relative h-[420px] sm:h-[440px] overflow-hidden ${expanded ? 'rounded-b-none [clip-path:inset(0_round_15px_15px_0_0)]' : 'rounded-[15px] [clip-path:inset(0_round_15px)]'}`}>
                        <img
                          src={treatment.previewImage}
                          alt={treatment.title}
                          loading="lazy"
                          onClick={() => treatment.details && onOpenDetails(treatment.id)}
                          className={`h-full w-full object-cover transition-transform duration-1000 ease-out ${expanded ? 'scale-[1.02]' : 'scale-100'} ${treatment.details ? 'cursor-pointer' : ''}`}
                        />

                        {/* Targeted legibility scrim: transparent above ~56%, ramping to ~62% ink only at the base */}
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: `
                              linear-gradient(to top, rgba(10, 10, 10, 0.62) 0%, rgba(10, 10, 10, 0.58) 30%, rgba(10, 10, 10, 0) 44%)
                            `
                          }}
                        />
                      </div>

                      {/* Hover cue: signals the image/title opens the detail dialog (details only) */}
                      {treatment.details && (
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none absolute top-5 right-5 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-[#C9A876]/40 bg-[#0A0A0A]/60 text-[#C9A876] backdrop-blur-md transition-opacity duration-300 ${expanded ? 'opacity-100' : 'opacity-0'}`}
                        >
                          <Plus className="h-4 w-4" />
                        </span>
                      )}

                      {/* Top Chips: Category badge only */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-md text-[#0A0A0A] text-[10px] font-medium tracking-widest uppercase border border-hairline rounded-md">
                          {treatmentsSection.categories.find((c) => c.id === treatment.category)?.label ??
                            treatment.category}
                        </span>
                      </div>

                      {/* Touch-only quick facts: the hover panel is unreachable without a pointer */}
                      <div className="absolute top-16 left-6 z-10 hidden touch:flex flex-col items-start gap-1.5">
                        <span className="inline-flex max-w-[15rem] items-center gap-1.5 rounded-md border border-hairline bg-[#FAF8F5]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#0A0A0A] backdrop-blur-md">
                          <Clock className="h-3 w-3 shrink-0 text-[#C9A876]" />
                          <span className="truncate">{treatment.duration}</span>
                        </span>
                        <span className="inline-flex max-w-[15rem] items-center gap-1.5 rounded-md border border-hairline bg-[#FAF8F5]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#0A0A0A] backdrop-blur-md">
                          <Shield className="h-3 w-3 shrink-0 text-[#C9A876]" />
                          <span className="truncate">{treatment.downtime}</span>
                        </span>
                      </div>

                      {/* Text Content: title/description pinned over the image (non-hovered view stays the same) */}
                      <div className="absolute top-[235px] sm:top-[260px] inset-x-0 p-6 sm:p-8 z-10">
                        <p className="text-[11px] tracking-widest uppercase text-[#C9A876] font-medium mb-1.5">
                          {treatment.subtitle}
                        </p>
                        <h3
                          onClick={() => treatment.details && onOpenDetails(treatment.id)}
                          className={`text-xl sm:text-2xl font-sans text-[#FAF8F5] leading-snug mb-2.5 line-clamp-2 ${treatment.details ? 'cursor-pointer' : ''}`}
                        >
                          {treatment.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#E5E0D8]/85 font-normal leading-relaxed line-clamp-2">
                          {treatment.description}
                        </p>
                      </div>

                      {/* Detail content: always mounted (never conditionally rendered). Height and opacity are
                          properties of ONE animate object with ONE transition, so there is no second animation
                          lifecycle to desync. Mouse-leave reverses the same transition. */}
                      <motion.div
                        initial={false}
                        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
                        transition={{ duration: 1.1, ease: CARD_EASE }}
                        inert={!expanded}
                        style={{ pointerEvents: expanded ? 'auto' : 'none' }}
                        className={`overflow-hidden bg-[#FAF8F5] text-[#0A0A0A] rounded-b-[15px] ${expanded ? 'border-t border-hairline' : ''}`}
                      >
                        <div className="p-5 sm:p-6">
                          {/* Duration & Downtime Badges */}
                          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-hairline mb-3 text-xs text-[#0A0A0A]">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-[#C9A876] shrink-0" />
                              <span className="text-[#0A0A0A] leading-snug">{treatment.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Shield className="w-3.5 h-3.5 text-[#C9A876] shrink-0" />
                              <span className="text-[#0A0A0A] leading-snug">{treatment.downtime}</span>
                            </div>
                          </div>

                          {/* Specifics Checklist */}
                          <div className="space-y-1.5 mb-3">
                            {treatment.features.slice(0, 2).map((feat, i) => (
                              <div key={i} className="flex items-center gap-2 text-xs text-[#525252]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A876] shrink-0" />
                                <span className="text-[#525252] leading-snug">{feat}</span>
                              </div>
                            ))}
                          </div>

                          {/* Footer: primary "View Full Details" + secondary "Book on WhatsApp" */}
                          <div className="pt-3 border-t border-hairline flex flex-col gap-2 sm:flex-row">
                            {treatment.slug && (
                              <Link
                                to={`/procedures/${treatment.slug}`}
                                onClick={(event) => event.stopPropagation()}
                                className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-[#C9A876] px-3 py-2.5 text-[11px] font-medium uppercase tracking-wider text-[#0A0A0A] whitespace-nowrap transition-colors hover:bg-[#B89660] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                                aria-label={`${treatmentsSection.detailsLabel} for ${treatment.title}`}
                              >
                                <span>{treatmentsSection.detailsLabel}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            )}

                            <a
                              href={clientConfig.getWhatsAppUrl(`Hello ${clientConfig.clinic.name}, I would like to inquire about ${treatment.title}.`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-transparent px-3 py-2.5 text-[11px] font-medium uppercase tracking-wider text-[#0A0A0A] whitespace-nowrap transition-colors hover:border-[#C9A876] hover:text-gold-text focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
                            >
                              <WhatsAppIcon className="w-3.5 h-3.5" />
                              <span>{treatmentsSection.whatsappCtaLabel}</span>
                            </a>
                          </div>
                        </div>
                      </motion.div>

                    </article>
                  </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
        )}

      </div>

      <AnimatePresence>
        {selectedTreatment && (
          <ProcedureDetailDialog
            treatment={selectedTreatment}
            onClose={() => setSelectedTreatment(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
