import React from 'react';
import { clientConfig } from '../client.config';
import { Award } from 'lucide-react';

export const ManifestoStats: React.FC = () => {
  const { manifesto } = clientConfig;

  return (
    <section 
      id="about" 
      aria-label="Clinical Manifesto and Statistics"
      className="relative bg-[#F7F5F1] text-[#0A0A0A] py-24 sm:py-32 border-b border-hairline overflow-hidden scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Top Header Label */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-[1px] bg-[#C9A876]" />
          <span className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/70">
            {manifesto.tag}
          </span>
        </div>

        {/* Two-Column Editorial Manifesto Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-20 border-b border-hairline">
          
          {/* Bold Serif Headline Quote */}
          <div className="lg:col-span-7">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-normal text-[#0A0A0A] leading-[1.18] tracking-tight">
              {manifesto.title.split('. ')[0]}. <br />
              <span className="text-gold-text font-sans font-light">
                {manifesto.title.split('. ')[1] || 'We celebrate the nuanced.'}
              </span>
            </h2>

            <div className="mt-8 flex items-center gap-4 text-xs font-medium tracking-widest uppercase text-ink-400">
              <span className="inline-flex items-center gap-1.5 text-gold-text">
                {manifesto.highlights[0]}
              </span>
              <span>·</span>
              <span className="inline-flex items-center gap-1.5 text-[#0A0A0A]">
                <Award className="w-3.5 h-3.5 text-gold-text" />
                {manifesto.highlights[1]}
              </span>
            </div>
          </div>

          {/* Editorial Philosophy Body */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full pt-2">
            <p className="text-base sm:text-lg text-[#525252] leading-relaxed font-normal mb-6">
              {manifesto.body}
            </p>
            <p className="text-sm text-ink-400 leading-relaxed border-l-2 border-[#C9A876]/60 pl-4 py-1 font-sans break-words">
              {manifesto.pullQuote}
            </p>
            <div className="mt-4 text-xs font-medium tracking-widest uppercase text-[#0A0A0A]">
              {manifesto.pullQuoteAttribution}
            </div>
          </div>
        </div>

        {/* Three Large Serif Numbers and Tracked-out Labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pt-16">
          {manifesto.stats.map((stat, idx) => (
            <div 
              key={idx}
              className={`flex flex-col justify-between ${
                idx !== 0 ? 'md:border-l md:border-hairline md:pl-8' : ''
              }`}
            >
              <div>
                {/* Large Serif Number */}
                <div className="text-5xl sm:text-6xl lg:text-7xl font-sans font-extralight tabular-nums tracking-tight mb-3">
                  <span className="text-[#0A0A0A]">{stat.number}</span>
                </div>

                {/* Small Tracked-Out Label */}
                <div className="text-xs font-medium tracking-widest uppercase text-gold-text mb-2">
                  {stat.label}
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#525252] font-normal leading-relaxed mt-2">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
