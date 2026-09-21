import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { clientConfig, Doctor } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { useDialogBehavior } from '../lib/useDialogBehavior';
import { ChevronRight, Stethoscope } from 'lucide-react';

/**
 * The medical team.
 *
 * All three cards are the same size. An earlier version gave the first physician (the
 * Medical Director, first in the config) a wider column so the row had a hierarchy; that
 * is reversed deliberately. A directory of physicians reads as a directory — no card
 * claims seniority by area, and every physician gets an identical frame. Where hierarchy
 * is genuinely wanted, it belongs in credentials and copy, not in the grid.
 *
 * The portraits share one height, so the row stays level and no card carries dead space
 * above its divider. The cards no longer carry the licence or availability chips: those
 * details live in the profile dialog, which is where a patient reading them has actually
 * decided to consider that physician.
 */
export const TeamGrid: React.FC = () => {
  const { team, teamSection } = clientConfig;
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useDialogBehavior(Boolean(selectedDoctor), panelRef, () => setSelectedDoctor(null));

  return (
    <section 
      id="team" 
      aria-label="Medical Directors and Aesthetic Physicians"
      className="bg-[#F7F5F1] text-[#0A0A0A] py-24 sm:py-32 border-b border-hairline scroll-mt-28"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-[1px] bg-[#D6C0A0]" />
              <span className="text-xs font-medium tracking-widest uppercase text-[#0A0A0A]/85">
                {teamSection.tag}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#2A2622] tracking-tight">
              {teamSection.title}
            </h2>
          </div>

          <p className="text-sm text-ink-500 max-w-md font-normal leading-relaxed">
            {teamSection.description}
          </p>
        </div>

        {/* Equal columns: every physician's card is the same size. */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-[#FAF8F5] border border-hairline rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-[#D6C0A0] hover:shadow-lg"
            >
              <div>
                {/* Doctor Portrait Container with Full Color Display (No grayscale filter) */}
                <div className="relative w-full h-80 sm:h-96 lg:h-[460px] overflow-hidden rounded-t-2xl bg-[#EFECE6]">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Gradient Scrim for Text Contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A2622]/90 via-[#2A2622]/20 to-transparent opacity-85" />

                  {/* Overlay Name & Title */}
                  <div className="absolute bottom-4 left-4 right-4 z-10 text-[#FAF8F5]">
                    <div className="flex items-center gap-2 text-xs text-[#C9A876] mb-1">
                      <Stethoscope className="w-3.5 h-3.5" />
                      <span>{doctor.credentials}</span>
                    </div>
                    <h3 className="text-xl font-display leading-snug line-clamp-2">
                      {doctor.name}
                    </h3>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="p-6 sm:p-7">
                  
                  <div className="mb-4">
                    <span className="text-[11px] font-medium tracking-widest uppercase text-gold-text block mb-1">
                      {teamSection.focusLabel}
                    </span>
                    <p className="text-xs text-[#0A0A0A] font-medium leading-relaxed">
                      {doctor.specialization}
                    </p>
                  </div>

                  <p className="text-sm text-ink-500 font-normal leading-relaxed line-clamp-3 mb-6">
                    {doctor.bio}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 sm:p-7 pt-0 border-t border-hairline/60 flex items-center justify-between gap-3">
                
                {/* Book Doctor via WhatsApp */}
                <a
                  href={clientConfig.getWhatsAppUrl(`Hello ${clientConfig.clinic.name}, I would like to schedule a private consultation with ${doctor.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${teamSection.bookAriaLabelPrefix} ${doctor.name} via WhatsApp`}
                  className="inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase text-[#0A0A0A] hover:text-[#C9A876] transition-colors"
                >
                  <WhatsAppIcon className="w-3.5 h-3.5 text-[#C9A876]" />
                  <span>{teamSection.bookPrefix} Dr. {doctor.name.split(' ')[1]}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>

                {/* Details Button */}
                <button
                  onClick={() => setSelectedDoctor(doctor)}
                  className="text-xs text-ink-400 hover:text-[#0A0A0A] uppercase tracking-widest underline underline-offset-4"
                >
                  {teamSection.profileLabel}
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Doctor Bio Modal in Full Color with Rounded Corners */}
        {selectedDoctor && createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#2A2622]/70 backdrop-blur-sm animate-fade-in"
            onClick={() => setSelectedDoctor(null)}
          >
            <div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label={selectedDoctor.name}
              tabIndex={-1}
              onClick={(event) => event.stopPropagation()}
              className="bg-[#FAF8F5] border border-hairline rounded-2xl max-w-2xl w-full p-8 relative shadow-2xl focus:outline-none"
            >
              <button
                onClick={() => setSelectedDoctor(null)}
                aria-label={teamSection.closeAriaLabel}
                className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center text-ink-400 hover:text-[#0A0A0A] text-lg font-display rounded-full hover:bg-[#EFECE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0]"
              >
                ✕
              </button>

              <div className="flex flex-col sm:flex-row gap-6 mb-6">
                <img
                  src={selectedDoctor.image}
                  alt={selectedDoctor.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover border border-hairline rounded-xl"
                />
                <div>
                  <span className="text-xs font-display text-gold-text tracking-widest block mb-1">
                    {selectedDoctor.credentials}
                  </span>
                  <h3 className="text-2xl font-display text-[#2A2622] mb-2">
                    {selectedDoctor.name}
                  </h3>
                  <p className="text-xs text-ink-500 font-medium">
                    {selectedDoctor.title}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm text-ink-500 font-normal leading-relaxed border-t border-hairline pt-4 mb-6">
                <p>{selectedDoctor.bio}</p>
                <div>
                  <strong className="text-[#0A0A0A] block font-medium mb-1">{teamSection.specialistLabel}</strong>
                  <p className="text-xs">{selectedDoctor.specialization}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-hairline">
                <div className="text-xs text-ink-400">
                  {teamSection.clinicDaysLabel} <span className="text-[#0A0A0A] font-medium">{selectedDoctor.availableDays}</span>
                </div>

                <a
                  href={clientConfig.getWhatsAppUrl(`Hello ${clientConfig.clinic.name}, I would like to schedule a private consultation with ${selectedDoctor.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D6C0A0] text-[#0A0A0A] text-xs font-medium tracking-widest uppercase hover:bg-[#B89660] transition-colors rounded-lg"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  <span>{teamSection.reserveLabel}</span>
                </a>
              </div>
            </div>
          </div>,
          document.body
        )}

      </div>
    </section>
  );
};
