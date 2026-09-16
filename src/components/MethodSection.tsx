import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { clientConfig } from '../client.config';

export const MethodSection: React.FC = () => {
  const { method } = clientConfig;
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      id="method"
      ref={sectionRef}
      aria-label="The Clinical Method: Measure, Intervene, Extend"
      className="bg-[#F7F5F1] text-[#0A0A0A] py-24 sm:py-32 border-b border-hairline scroll-mt-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#C9A876]" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/70">
              {method.tag}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans text-[#0A0A0A] tracking-tight mb-4">
            {method.title}
          </h2>
          <p className="text-sm sm:text-base text-[#525252] font-normal leading-relaxed">
            {method.subtitle}
          </p>
        </div>

        {/* 3-Column Method Architecture Grid with Rounded Corners */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          {method.steps.map((item, idx) => (
            <article
              key={item.step}
              className={`group bg-[#FAF8F5] border border-hairline rounded-2xl transition-all duration-700 hover:border-[#C9A876] hover:shadow-xl flex flex-col justify-between overflow-hidden ${
                isVisible || reduceMotion ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: reduceMotion ? '0ms' : `${idx * 150}ms`
              }}
            >
              <div>
                
                {/* Visual Image Frame (Placeholder image remains fully visible & bright at all times) */}
                <div className="relative w-full h-80 sm:h-96 overflow-hidden rounded-t-2xl bg-[#0A0A0A] cursor-pointer">
                  
                  {/* Background Image (Always clear, sharp and bright) */}
                  <img
                    src={item.image}
                    alt={`${item.phase} - ${item.title}`}
                    loading="lazy"
                    className="w-full h-full object-cover opacity-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Ambient soft shadow for chip readability */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#0A0A0A]/35 via-transparent to-[#0A0A0A]/40" />

                  {/* Subtle soft vignette on hover (non-solid, image stays fully visible through & around) */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(10,10,10,0.45)_100%)]" />

                  {/* Small Phase Header Badge */}
                  <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                    <span className="px-3 py-1 bg-[#FAF8F5]/90 backdrop-blur-md text-[#0A0A0A] text-[10px] font-sans tracking-widest uppercase border border-hairline rounded-md">
                      {method.stepPrefix} {item.step}
                    </span>
                    <span className="px-3 py-1 bg-[#0A0A0A]/80 backdrop-blur-md text-[#C9A876] text-[10px] font-medium tracking-widest uppercase border border-[#C9A876]/30 rounded-md">
                      {item.phase}
                    </span>
                  </div>

                </div>

                {/* Card Text Content */}
                <div className="p-6 sm:p-8">
                  <span className="text-[11px] font-medium tracking-widest uppercase text-gold-text block mb-2">
                    {method.stepWord} {item.step} · {item.phase}
                  </span>
                  
                  <h3 className="text-xl font-sans text-[#0A0A0A] font-normal leading-snug mb-3">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#525252] font-normal leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>

              {/* Bottom Subtle Indicator */}
              <div className="px-6 sm:px-8 py-4 border-t border-hairline flex items-center justify-between text-xs text-ink-400 bg-[#F7F5F1] rounded-b-2xl">
                <span className="font-sans text-[11px] tracking-widest uppercase">{method.stepPrefix} {item.step} / {String(method.steps.length).padStart(2, '0')}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
