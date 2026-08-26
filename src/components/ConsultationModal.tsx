import React, { useState } from 'react';
import { clientConfig, Treatment } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { X, Check, Sparkles, Clock, Shield } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTreatment?: Treatment | null;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialTreatment,
}) => {
  const { treatments, team } = clientConfig;

  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string>(
    initialTreatment?.id || treatments[0].id
  );
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(team[0].id);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>('This Week (Priority)');
  const [patientNotes, setPatientNotes] = useState<string>('');

  if (!isOpen) return null;

  const currentTreatment = treatments.find((t) => t.id === selectedTreatmentId) || treatments[0];
  const currentDoctor = team.find((d) => d.id === selectedDoctorId) || team[0];

  const handleLaunchWhatsApp = () => {
    const message = `Hello Maison Été Concierge,
I would like to request a private consultation for:
- Protocol: ${currentTreatment.title} (${currentTreatment.subtitle})
- Preferred Physician: ${currentDoctor.name}
- Requested Timeframe: ${selectedTimeframe}
${patientNotes ? `- Clinical Notes / Goals: ${patientNotes}` : ''}

Please let me know available appointment slots.`;

    const url = clientConfig.getWhatsAppUrl(message);
    window.open(url, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0A0A0A]/75 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#E6E2DA] rounded-2xl max-w-3xl w-full p-6 sm:p-10 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close consultation modal"
          className="absolute top-5 right-5 p-2 text-[#737373] hover:text-[#0A0A0A] transition-colors rounded-full hover:bg-[#EFECE6]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#C9A876]" />
            <span className="text-xs font-semibold tracking-luxury uppercase text-[#8F7041]">
              CONCIERGE BLUEPRINT
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#0A0A0A] font-normal">
            Configure Your Private Assessment
          </h3>
          <p className="text-xs sm:text-sm text-[#525252] font-light mt-1">
            Tailor your preferred treatment and medical doctor before connecting with our Harley Street concierge.
          </p>
        </div>

        {/* Step 1: Select Protocol */}
        <div className="mb-6">
          <label className="block text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-3">
            1. Select Clinical Protocol
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto pr-1">
            {treatments.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTreatmentId(t.id)}
                className={`p-3 text-left border rounded-xl transition-all duration-200 flex items-start justify-between gap-2 ${
                  selectedTreatmentId === t.id
                    ? 'border-[#C9A876] bg-[#FAF8F5] shadow-sm'
                    : 'border-[#E6E2DA] bg-[#F7F5F1] hover:border-[#D6CFC3]'
                }`}
              >
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#8F7041] block font-medium">
                    {t.subtitle}
                  </span>
                  <span className="text-xs font-serif text-[#0A0A0A] font-medium block">
                    {t.title}
                  </span>
                  <span className="text-[11px] font-mono text-[#737373] mt-1 block">
                    {t.priceGuide}
                  </span>
                </div>
                {selectedTreatmentId === t.id && (
                  <Check className="w-4 h-4 text-[#C9A876] flex-shrink-0 mt-1" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Treatment Quick Specs Bar */}
        <div className="p-4 bg-[#EFECE6] border border-[#E6E2DA] rounded-xl mb-6 grid grid-cols-3 gap-4 text-xs text-[#525252]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#C9A876]" />
            <div>
              <span className="text-[10px] uppercase block text-[#737373]">Duration</span>
              <span className="font-medium text-[#0A0A0A]">{currentTreatment.duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#C9A876]" />
            <div>
              <span className="text-[10px] uppercase block text-[#737373]">Downtime</span>
              <span className="font-medium text-[#0A0A0A]">{currentTreatment.downtime}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#C9A876]" />
            <div>
              <span className="text-[10px] uppercase block text-[#737373]">Longevity</span>
              <span className="font-medium text-[#0A0A0A]">{currentTreatment.results}</span>
            </div>
          </div>
        </div>

        {/* Step 2: Select Preferred Doctor */}
        <div className="mb-6">
          <label className="block text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-3">
            2. Preferred Medical Director
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {team.map((doc) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setSelectedDoctorId(doc.id)}
                className={`p-3 text-left border rounded-xl transition-all duration-200 flex items-center gap-3 ${
                  selectedDoctorId === doc.id
                    ? 'border-[#C9A876] bg-[#FAF8F5]'
                    : 'border-[#E6E2DA] bg-[#F7F5F1] hover:border-[#D6CFC3]'
                }`}
              >
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-10 h-10 object-cover border border-[#E6E2DA] rounded-lg"
                />
                <div className="overflow-hidden">
                  <span className="text-xs font-serif font-medium text-[#0A0A0A] block truncate">
                    {doc.name.split(',')[0]}
                  </span>
                  <span className="text-[10px] text-[#737373] block truncate">
                    {doc.credentials.split('·')[0]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Requested Timeframe */}
        <div className="mb-6">
          <label className="block text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-3">
            3. Preferred Appointment Window
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              'This Week (Priority)',
              'Next Week',
              'Within 14 Days',
              'Saturday / Weekend',
            ].map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setSelectedTimeframe(time)}
                className={`py-2 px-3 text-xs tracking-wider uppercase border rounded-lg text-center transition-colors ${
                  selectedTimeframe === time
                    ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F5]'
                    : 'border-[#E6E2DA] bg-[#F7F5F1] text-[#525252] hover:bg-[#EFECE6]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Optional Notes */}
        <div className="mb-8">
          <label className="block text-xs font-semibold tracking-luxury uppercase text-[#0A0A0A] mb-2">
            4. Clinical Goals or Questions (Optional)
          </label>
          <input
            type="text"
            value={patientNotes}
            onChange={(e) => setPatientNotes(e.target.value)}
            placeholder="e.g. Interested in natural tear trough restoration and jawline balance..."
            className="w-full px-4 py-3 bg-[#FAF8F5] border border-[#E6E2DA] rounded-xl text-xs text-[#0A0A0A] placeholder:text-[#A3A3A3] focus:outline-none focus:border-[#C9A876]"
          />
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[#E6E2DA] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-[#737373]">
            100% Confidential · Direct Doctor Coordination
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/3 sm:w-auto px-5 py-3 border border-[#E6E2DA] text-xs font-medium uppercase tracking-subtle text-[#737373] hover:text-[#0A0A0A] rounded-xl"
            >
              Cancel
            </button>

            <button
              onClick={handleLaunchWhatsApp}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#C9A876] text-[#0A0A0A] text-xs font-medium tracking-subtle uppercase hover:bg-[#B89660] transition-colors rounded-xl"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A]" />
              <span>Connect on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
