import React from 'react';
import { clientConfig } from '../client.config';
import { Sparkles, Award } from 'lucide-react';

export const ManifestoStats: React.FC = () => {
  const { manifesto } = clientConfig;

  return (
    <section 
      id="about" 
      aria-label="Clinical Manifesto and Statistics"
      className="relative bg-[#F7F5F1] text-[#0A0A0A] py-24 sm:py-32 border-b border-[#E6E2DA] overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Header Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[#C9A876]" />
          <span className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A]/70">
            {manifesto.tag}
          </span>
        </div>

        {/* Two-Column Editorial Manifesto Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-[#E6E2DA]">
          
          {/* Bold Serif Headline Quote */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#0A0A0A] leading-[1.18] tracking-tight">
              {manifesto.title.split('. ')[0]}. <br />
              <span className="italic text-[#8F7041] font-cormorant font-light">
                {manifesto.title.split('. ')[1] || 'We celebrate the nuanced.'}
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-4 text-xs tracking-luxury uppercase text-[#737373]">
              <span className="inline-flex items-center gap-1.5 text-[#8F7041]">
                <Sparkles className="w-3.5 h-3.5" />
                Evidence-Based Protocol
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 text-[#0A0A0A]">
                <Award className="w-3.5 h-3.5 text-[#8F7041]" />
                Zero Trend Conformity
              </span>
            </div>
          </div>

          {/* Editorial Philosophy Body */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
            <p className="text-base sm:text-lg text-[#525252] leading-relaxed font-light mb-6">
              {manifesto.body}
            </p>
            <p className="text-sm text-[#737373] leading-relaxed border-l-2 border-[#C9A876]/60 pl-4 py-1 italic font-serif">
              "True beauty in medical aesthetics is imperceptible. When done with absolute mastery, the world notices your radiance, never the syringe."
            </p>
            <div className="mt-4 text-xs font-medium tracking-subtle uppercase text-[#0A0A0A]">
              — Clinical Board, Maison Été London
            </div>
          </div>
        </div>

        {/* Three Large Serif Numbers and Tracked-out Labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-16">
          {manifesto.stats.map((stat, idx) => (
            <div 
              key={idx}
              className={`flex flex-col justify-between ${
                idx !== 0 ? 'md:border-l md:border-[#E6E2DA] md:pl-8' : ''
              }`}
            >
              <div>
                {/* Large Serif Number */}
                <div className="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#0A0A0A] font-normal tracking-tight mb-3">
                  <span className="text-[#0A0A0A]">{stat.number}</span>
                </div>

                {/* Small Tracked-Out Label */}
                <div className="text-xs font-semibold tracking-luxury uppercase text-[#8F7041] mb-2">
                  {stat.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#525252] font-light leading-relaxed mt-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
