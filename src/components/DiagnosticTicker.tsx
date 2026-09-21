import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { clientConfig } from '../client.config';
import { ShieldCheck } from 'lucide-react';

export const DiagnosticTicker: React.FC = () => {
  const { diagnosticTicker } = clientConfig;
  const rows = diagnosticTicker.rows;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // Lazy pause when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // The top padding is deliberately tighter than the bottom. `TreatmentsGrid` directly
  // above spends vertical space on headroom for its hover-expanded card, and this is where
  // that space is paid back — otherwise the two sections together leave a visible hole
  // between the treatments carousel and this band.
  return (
    <section 
      id="diagnostics"
      ref={sectionRef}
      aria-label="Diagnostic Biomarkers and Clinical Differentiators"
      className="relative w-full pt-10 pb-24 sm:pt-14 sm:pb-32 bg-[#0A0A0A] text-[#FAF8F5] overflow-hidden border-b border-hairline/20"
    >
      {/* Warm Moody Gradient Background with Macro Cellular Underlay */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={diagnosticTicker.backgroundImage}
          alt="Macro Cellular Texture"
          loading="lazy"
          className="w-full h-full object-cover blur-lg scale-110 opacity-30"
        />
        {/* Warm Moody Bronze/Amber Gradient Scrim */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(ellipse at 50% 50%, rgba(214, 192, 160, 0.22) 0%, rgba(166, 130, 79, 0.10) 38%, rgba(10, 10, 10, 0.92) 75%, #0A0A0A 100%),
              linear-gradient(to bottom, #0A0A0A 0%, transparent 20%, transparent 80%, #0A0A0A 100%)
            `
          }}
        />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 mb-14 text-center">
        
        {/* Section Header */}
        <div className="inline-flex items-center gap-3 mb-3">
          <div className="w-8 h-[1px] bg-[#D6C0A0]" />
          <span className="text-xs font-medium tracking-widest uppercase text-[#C9A876]">
            {diagnosticTicker.tag}
          </span>
          <div className="w-8 h-[1px] bg-[#D6C0A0]" />
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#FAF8F5] tracking-tight mb-4">
          {diagnosticTicker.title}
        </h2>

        <p className="text-sm sm:text-base text-[#E5E0D8]/90 font-normal max-w-2xl mx-auto leading-relaxed">
          {diagnosticTicker.subtitle}
        </p>
      </div>

      {/* Infinite Scrolling Pill Rows Container */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-6 w-full overflow-hidden">
        
        {/* Subtle Edge Fade Scrim (Left & Right) */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-r from-[#0A0A0A] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 bg-gradient-to-l from-[#0A0A0A] to-transparent z-20 pointer-events-none" />

        {/* Dynamic Rows Mapping with Alternating Directions (Paused when offscreen) */}
        {rows.map((tagList, rowIndex) => {
          const isEvenRow = rowIndex % 2 === 0;
          const animationClass = isEvenRow ? 'animate-marquee-left' : 'animate-marquee-right';

          const loopedTags = reduceMotion ? tagList : [...tagList, ...tagList, ...tagList, ...tagList];

          return (
            <div 
              key={`row-${rowIndex}`}
              className={`flex items-center select-none py-1 ${reduceMotion ? 'flex-wrap justify-center gap-3 sm:gap-4' : 'overflow-hidden'}`}
            >
              <div 
                className={`flex items-center gap-3 sm:gap-4 ${reduceMotion ? 'flex-wrap justify-center' : 'shrink-0'} ${!reduceMotion && isInView ? animationClass : ''}`}
                style={reduceMotion ? undefined : { animationPlayState: isInView ? 'running' : 'paused' }}
              >
                {loopedTags.map((tag, tagIndex) => (
                  <div
                    key={`tag-${rowIndex}-${tagIndex}`}
                    className="group inline-flex items-center gap-2.5 px-4 sm:px-6 py-2.5 sm:py-3 bg-[#FAF8F5]/5 hover:bg-[#FAF8F5]/10 border border-[#E5E0D8]/20 hover:border-[#D6C0A0]/70 backdrop-blur-md rounded-full text-xs sm:text-sm font-medium tracking-widest uppercase text-[#FAF8F5] transition-all duration-300 hover:scale-105 whitespace-nowrap cursor-default shadow-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6C0A0] group-hover:scale-125 transition-transform" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

      </div>

      {/* Bottom Subtle Trust Badges */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[#E5E0D8]/80">
        <div className="flex items-center gap-2">
          <span>{diagnosticTicker.badges[0]}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#C9A876]" />
          <span>{diagnosticTicker.badges[1]}</span>
        </div>
      </div>

    </section>
  );
};
