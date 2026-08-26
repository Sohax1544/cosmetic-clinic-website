import React from 'react';
import { clientConfig } from '../client.config';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const { testimonials } = clientConfig;

  return (
    <section 
      id="testimonials"
      aria-label="Verified Patient Outcomes and Testimonials"
      className="bg-[#FAF8F5] text-[#0A0A0A] py-24 sm:py-32 border-b border-[#E6E2DA] scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#C9A876]" />
            <span className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A]/70">
              PATIENT EXPERIENCES
            </span>
            <div className="w-8 h-[1px] bg-[#C9A876]" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#0A0A0A] tracking-tight mb-4">
            Voices of Refined Confidence
          </h2>
          <p className="text-sm text-[#525252] font-light leading-relaxed">
            Unsolicited patient feedback following bespoke clinical protocols at our Harley Street practice.
          </p>
        </div>

        {/* Testimonials 3-Column Grid with Rounded Corners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-[#F7F5F1] p-8 sm:p-9 border border-[#E6E2DA] rounded-2xl flex flex-col justify-between relative transition-all duration-300 hover:border-[#C9A876] hover:shadow-sm"
            >
              <div>
                {/* Quote Icon and Rating Stars */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C9A876] text-[#C9A876]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#C9A876]/40" />
                </div>

                {/* Patient Review Quote */}
                <p className="text-sm sm:text-base text-[#262626] font-serif italic font-normal leading-relaxed mb-6">
                  "{item.quote}"
                </p>
              </div>

              {/* Patient Metadata */}
              <div className="pt-6 border-t border-[#E6E2DA]">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-sm text-[#0A0A0A]">
                    {item.name}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[10px] tracking-wider uppercase text-[#8F7041] font-medium">
                    <CheckCircle className="w-3 h-3" />
                    Verified Patient
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#737373]">
                  <span>{item.treatment}</span>
                  <span>{item.location}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Clinical Audit Note */}
        <div className="mt-12 text-center text-xs text-[#737373]">
          <span>Audited by independent clinical feedback metrics · 100% genuine private patient reviews</span>
        </div>

      </div>
    </section>
  );
};
