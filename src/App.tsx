import React, { useEffect, useState } from 'react';
import { clientConfig } from './client.config';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { ArrowUp } from 'lucide-react';
import { matchRoute, useLocation } from './lib/router';
import { HomePage } from './pages/HomePage';
import { ProceduresIndexPage } from './pages/ProceduresIndexPage';
import { ProcedurePage } from './pages/ProcedurePage';
import { NotFoundPage } from './pages/NotFoundPage';

/**
 * Route shell.
 *
 * Routes:
 *   /                     home (all marketing sections)
 *   /procedures           full treatment directory
 *   /procedures/:slug     one page per procedure, generated from client.config.ts
 *
 * Every procedure page comes from the same `clientConfig.treatments` array that feeds
 * the home grid, so the catalogue stays plug-and-play: add an object with a unique
 * `slug` and it gets a card, a priced row, a footer link and a real URL.
 */
export function App() {
  const { pathname } = useLocation();
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    let rafId = 0;
    let lastValue = window.scrollY > 600;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const next = window.scrollY > 600;
        if (next !== lastValue) {
          lastValue = next;
          setShowBackToTop(next);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openConsultation = () => setIsConsultationModalOpen(true);

  // --- route resolution ---
  const procedureMatch = matchRoute('/procedures/:slug', pathname);
  const matchedTreatment = procedureMatch
    ? clientConfig.treatments.find((t) => t.slug === procedureMatch.slug)
    : undefined;

  let page: React.ReactNode;
  if (pathname === '/') {
    page = <HomePage onOpenConsultationModal={openConsultation} />;
  } else if (pathname === '/procedures') {
    page = <ProceduresIndexPage />;
  } else if (matchedTreatment) {
    page = <ProcedurePage treatment={matchedTreatment} />;
  } else {
    page = <NotFoundPage />;
  }

  // Document title/description are owned by each page component. The shell must not
  // touch them: reading document.title during render (as an earlier version did) reads
  // the previous route's title and then overwrites the page's own value.

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#F7F5F1] text-[#0A0A0A] selection:bg-[#D6C0A0]/30 selection:text-[#0A0A0A]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[#2A2622] focus:px-4 focus:py-2 focus:text-xs focus:font-medium focus:uppercase focus:tracking-widest focus:text-[#FAF8F5]"
      >
        Skip to content
      </a>

      {/* Fixed Sticky Header */}
      <Header onOpenConsultationModal={openConsultation} />

      <main id="main-content" className="flex-1">
        {page}
      </main>

      <Footer />

      {/* Interactive Consultation Blueprint Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        initialTreatment={null}
      />

      {/* Floating quick actions.
          The WhatsApp button is mobile-only: from sm up the fixed header already carries
          a persistent "Book on WhatsApp" CTA, and the floating duplicate occluded
          treatment-card text while the page scrolled. Back-to-top stays at all widths. */}
      <div className="fixed right-6 bottom-[calc(1.5rem+env(safe-area-inset-bottom))] z-40 flex flex-col items-end gap-3">
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            aria-label="Back to top of page"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-hairline bg-[#FAF8F5] text-[#0A0A0A] shadow-md transition-all duration-300 hover:bg-[#C9A876] hover:text-[#0A0A0A]"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={clientConfig.getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Message the clinic on WhatsApp"
          className="group flex min-h-11 items-center gap-3 rounded-xl border border-[#D6C0A0]/40 bg-[#2A2622] px-4 py-3 text-[#FAF8F5] shadow-xl transition-all duration-300 hover:border-[#D6C0A0] hover:bg-[#C9A876] hover:text-[#0A0A0A] sm:hidden"
        >
          <WhatsAppIcon className="w-4 h-4 text-[#C9A876] transition-colors group-hover:text-[#0A0A0A]" />
          <span className="hidden text-xs font-medium uppercase tracking-widest sm:inline">
            Book on WhatsApp
          </span>
        </a>
      </div>
    </div>
  );
}

export default App;
