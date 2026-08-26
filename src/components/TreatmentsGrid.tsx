import React, { useState } from 'react';
import { clientConfig, Treatment } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Clock, Shield, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface TreatmentsGridProps {
  onSelectTreatment?: (treatment: Treatment) => void;
}

export const TreatmentsGrid: React.FC<TreatmentsGridProps> = ({ onSelectTreatment }) => {
  const { treatments } = clientConfig;
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const categories = [
    { id: 'all', label: 'All Protocols' },
    { id: 'facial', label: 'Facial Harmonization' },
    { id: 'longevity', label: 'Cellular & Longevity' },
    { id: 'laser', label: 'Laser & Complexion' },
    { id: 'contour', label: 'Collagen & Contour' },
    { id: 'surgical', label: 'Surgical' },
  ];

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
      aria-label="Clinical Treatments and Bespoke Protocols"
      className="bg-[#F7F5F1] text-[#0A0A0A] pt-24 sm:pt-32 pb-20 sm:pb-28 border-b border-[#E6E2DA] scroll-mt-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-[#C9A876]" />
              <span className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A]/70">
                TREATMENT DIRECTORY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0A0A0A] tracking-tight">
            Clinical Protocols
            </h2>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
            {/* Page Position Indicator */}
            <div className="flex items-center gap-2 font-mono text-xs text-[#8F7041] tracking-widest uppercase">
              <span className="text-sm font-semibold text-[#0A0A0A]">
                {String(currentPage + 1).padStart(2, '0')}
              </span>
              <span>/</span>
              <span>{String(totalPages).padStart(2, '0')}</span>
            </div>

            {/* Navigation Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous page of treatments"
                className="p-3 border border-[#E6E2DA] bg-[#FAF8F5] text-[#0A0A0A] hover:border-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0A0A] transition-all duration-200 rounded-lg shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next page of treatments"
                className="p-3 border border-[#E6E2DA] bg-[#FAF8F5] text-[#0A0A0A] hover:border-[#C9A876] hover:bg-[#C9A876] hover:text-[#0A0A0A] transition-all duration-200 rounded-lg shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-[#E6E2DA]/80 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-4 py-2 text-xs font-medium tracking-subtle uppercase transition-all duration-200 whitespace-nowrap border rounded-full ${
                activeCategory === cat.id
                  ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F5]'
                  : 'border-transparent text-[#737373] hover:text-[#0A0A0A] hover:bg-[#EFECE6]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Full-Page Carousel Viewport: pb provides enough downward room for the expanded card so rounded bottom edges stay visible */}
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
                {pageTreatments.map((treatment) => (
                  /* Fixed-height cell container: guarantees siblings never push, shift or resize */
                  <div 
                    key={treatment.id} 
                    className="relative h-[420px] sm:h-[440px] w-full"
                  >
                    {/* Self-contained card expanding purely downward into available space below on hover */}
                    <article
                      className="group absolute top-0 inset-x-0 h-[420px] sm:h-[440px] hover:h-[625px] sm:hover:h-[650px] z-10 hover:z-30 rounded-2xl overflow-hidden border border-[#E6E2DA] hover:border-[#C9A876] transition-[height,border-color] duration-[1100ms] ease-[cubic-bezier(0.25,1,0.5,1)] bg-[#0A0A0A]"
                    >
                      {/* Full-Bleed Background Image: fixed to the non-hovered card height so it does NOT stretch when the card extends on hover */}
                      <img
                        src={treatment.previewImage}
                        alt={treatment.title}
                        loading="lazy"
                        className="absolute top-0 inset-x-0 w-full h-[420px] sm:h-[440px] object-cover opacity-90 group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                      />

                      {/* Gradient Scrim: also fixed to the non-hovered image height */}
                      <div 
                        className="absolute top-0 inset-x-0 h-[420px] sm:h-[440px] pointer-events-none transition-opacity duration-700 group-hover:opacity-40"
                        style={{
                          background: `
                            linear-gradient(to top, rgba(10, 10, 10, 0.62) 0%, rgba(10, 10, 10, 0.42) 48%, rgba(10, 10, 10, 0.10) 75%, rgba(10, 10, 10, 0.18) 100%)
                          `
                        }}
                      />

                      {/* Top Chips: Category badge only */}
                      <div className="absolute top-6 left-6 z-10">
                        <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-md text-[#0A0A0A] text-[10px] font-semibold tracking-luxury uppercase border border-[#E6E2DA] rounded-md">
                          {treatment.category}
                        </span>
                      </div>

                      {/* Text Content: title/description pinned over the image (non-hovered view stays the same) */}
                      <div className="absolute top-[235px] sm:top-[260px] inset-x-0 p-6 sm:p-8 z-10">
                        {/* Subtitle & Title: Static natural position */}
                        <p className="text-[11px] tracking-wider uppercase text-[#C9A876] font-medium mb-1.5">
                          {treatment.subtitle}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-serif text-[#FAF8F5] leading-snug mb-2.5">
                          {treatment.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#E5E0D8]/85 font-light leading-relaxed line-clamp-2">
                          {treatment.description}
                        </p>
                      </div>

                      {/* Hover-Revealed Panel: Measure-style light background holding the additional info */}
                      <div className="absolute inset-x-0 top-[420px] sm:top-[440px] bottom-0 z-20 bg-[#FAF8F5] text-[#0A0A0A] rounded-b-2xl border-t border-[#E6E2DA] p-5 sm:p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]">
                        {/* Duration & Downtime Badges */}
                        <div className="grid grid-cols-2 gap-2 pb-3 border-b border-[#E6E2DA] mb-3 text-xs text-[#0A0A0A]">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#C9A876] shrink-0" />
                            <span className="leading-snug">{treatment.duration}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Shield className="w-3.5 h-3.5 text-[#C9A876] shrink-0" />
                            <span className="leading-snug">{treatment.downtime}</span>
                          </div>
                        </div>

                        {/* Specifics Checklist */}
                        <div className="space-y-1.5 mb-3">
                          {treatment.features.slice(0, 2).map((feat, i) => (
                            <div key={i} className="flex items-center gap-2 text-xs text-[#525252]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A876] shrink-0" />
                              <span className="leading-snug">{feat}</span>
                            </div>
                          ))}
                        </div>

                        {/* WhatsApp CTA Link */}
                        <div className="pt-3 flex items-center justify-between gap-3 border-t border-[#E6E2DA]">
                          <a
                            href={clientConfig.getWhatsAppUrl(`Hello Maison Été, I would like to inquire about ${treatment.title}.`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold tracking-subtle uppercase text-[#8F7041] hover:text-[#0A0A0A] transition-colors"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" />
                            <span>Book on WhatsApp</span>
                          </a>

                          <button
                            onClick={() => onSelectTreatment && onSelectTreatment(treatment)}
                            className="p-2 text-[#0A0A0A] hover:text-[#8F7041] transition-colors"
                            title="View Blueprint"
                          >
                            <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </article>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
