import React, { useState } from 'react';
import { clientConfig } from '../client.config';
import { Plus, Minus } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const { faqs } = clientConfig;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section 
      id="faq" 
      aria-label="Frequently Asked Questions"
      className="bg-[#F7F5F1] text-[#0A0A0A] py-24 sm:py-32 border-b border-[#E6E2DA] scroll-mt-28"
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="w-8 h-[1px] bg-[#C9A876]" />
            <span className="text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A]/70">
              PATIENT INQUIRIES
            </span>
            <div className="w-8 h-[1px] bg-[#C9A876]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#0A0A0A] tracking-tight mb-4">
            Frequently Addressed Questions
          </h2>
          <p className="text-sm text-[#525252] font-light leading-relaxed">
            Essential information regarding our private clinical assessments, safety standards, and bespoke protocol delivery.
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
                  isOpen ? 'border-[#C9A876] bg-[#FAF8F5]' : 'border-[#E6E2DA] bg-[#FAF8F5]/60 hover:border-[#D6CFC3]'
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between gap-4 text-left focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#0A0A0A] font-medium leading-snug">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center border border-[#E6E2DA] flex-shrink-0 text-[#C9A876]">
                    {isOpen ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 sm:px-8 pb-6 pt-2 text-sm text-[#525252] font-light leading-relaxed border-t border-[#E6E2DA]/60 animate-in fade-in duration-200">
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
