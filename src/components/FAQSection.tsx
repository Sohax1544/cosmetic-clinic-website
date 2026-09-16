import React, { useState } from 'react';
import { clientConfig } from '../client.config';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs, faqSection } = clientConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      aria-label="Frequently Asked Questions"
      className="bg-[#F7F5F1] text-[#0A0A0A] py-24 sm:py-32 border-b border-hairline scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#C9A876]" />
            <span className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/70">
              {faqSection.tag}
            </span>
            <div className="w-8 h-[1px] bg-[#C9A876]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-sans text-[#0A0A0A] tracking-tight mb-4">
            {faqSection.title}
          </h2>
          <p className="text-sm text-[#525252] font-normal leading-relaxed">
            {faqSection.subtitle}
          </p>
        </div>

        {/* FAQ Accordion List with Rounded Corners */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div 
                key={idx}
                className={`border rounded-xl transition-colors duration-200 overflow-hidden ${
                  isOpen ? 'border-[#C9A876] bg-[#FAF8F5]' : 'border-hairline bg-[#FAF8F5]/60 hover:border-[#D6CFC3]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#C9A876]"
                  aria-expanded={isOpen}
                >
                  <span className="font-sans text-base sm:text-lg text-[#0A0A0A] font-medium leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center border border-hairline flex-shrink-0 text-[#C9A876]">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-2 text-sm text-[#525252] font-normal leading-relaxed border-t border-hairline/60 animate-fade-in">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
