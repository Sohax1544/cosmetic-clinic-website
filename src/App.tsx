import React, { useState } from 'react';
import { clientConfig, Treatment } from './client.config';
import { Header } from './components/Header';
import { HeroSequence } from './components/HeroSequence';
import { ManifestoStats } from './components/ManifestoStats';
import { MethodSection } from './components/MethodSection';
import { TreatmentsGrid } from './components/TreatmentsGrid';
import { DiagnosticTicker } from './components/DiagnosticTicker';
import { TeamGrid } from './components/TeamGrid';
import { Testimonials } from './components/Testimonials';
import { FAQSection } from './components/FAQSection';
import { ClosingCTA } from './components/ClosingCTA';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { ArrowUp } from 'lucide-react';

export function App() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [selectedTreatmentForModal, setSelectedTreatmentForModal] = useState<Treatment | null>(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModalWithTreatment = (treatment: Treatment) => {
    setSelectedTreatmentForModal(treatment);
    setIsConsultationModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] text-[#0A0A0A] selection:bg-[#C9A876]/30 selection:text-[#0A0A0A] flex flex-col justify-between">
      
      {/* Fixed Sticky Header */}
      <Header
        onOpenConsultationModal={() => {
          setSelectedTreatmentForModal(null);
          setIsConsultationModalOpen(true);
        }}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Full-Screen Hero Image Sequence Background Section (2-clip loop, Honeycomb & Amber) */}
        <HeroSequence
          onOpenConsultationModal={() => {
            setSelectedTreatmentForModal(null);
            setIsConsultationModalOpen(true);
          }}
        />

        {/* Manifesto & Three Large Serif Stats */}
        <ManifestoStats />

        {/* Redesigned 3-Column Method Section: Measure, Intervene, Extend with Floating Stats */}
        <MethodSection />

        {/* Services & Treatments Carousel with Position Indicator & Nav Controls */}
        <TreatmentsGrid
          onSelectTreatment={handleOpenModalWithTreatment}
        />

        {/* Infinite Auto-Scrolling Diagnostic & Differentiators Marquee Ticker */}
        <DiagnosticTicker />

        {/* Medical Faculty & Aesthetic Doctors Grid */}
        <TeamGrid />

        {/* Patient Testimonials & Outcomes */}
        <Testimonials />

        {/* Frequently Addressed Questions */}
        <FAQSection />

        {/* Closing Full-Bleed Call-to-Action with WhatsApp Booking */}
        <ClosingCTA
          onOpenConsultationModal={() => {
            setSelectedTreatmentForModal(null);
            setIsConsultationModalOpen(true);
          }}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Consultation Blueprint Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialTreatment={selectedTreatmentForModal}
      />

      {/* Floating Bottom-Right Direct WhatsApp Quick Action Button */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        
        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="p-3 bg-[#FAF8F5] border border-[#E6E2DA] text-[#0A0A0A] hover:bg-[#C9A876] hover:text-[#0A0A0A] transition-all duration-300 shadow-md"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        {/* Persistent WhatsApp Floating Button with Minimal Outline Glyph */}
        <a
          href={clientConfig.getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Consultation Line"
          className="group flex items-center gap-3 px-4 py-3 bg-[#0A0A0A] text-[#FAF8F5] border border-[#C9A876]/40 shadow-xl hover:bg-[#C9A876] hover:text-[#0A0A0A] hover:border-[#C9A876] transition-all duration-300"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#C9A876] group-hover:text-[#0A0A0A] transition-colors" />
          <span className="hidden sm:inline text-xs font-medium tracking-subtle uppercase">
            WhatsApp Concierge
          </span>
        </a>

      </div>

    </div>
  );
}

export default App;
