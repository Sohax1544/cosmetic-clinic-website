import React from 'react';
import { clientConfig } from '../client.config';
import { useDocumentMeta } from '../lib/router';
import { HeroSequence } from '../components/HeroSequence';
import { ManifestoStats } from '../components/ManifestoStats';
import { MethodSection } from '../components/MethodSection';
import { TreatmentsGrid } from '../components/TreatmentsGrid';
import { DiagnosticTicker } from '../components/DiagnosticTicker';
import { PressStrip } from '../components/PressStrip';
import { ResultsSection } from '../components/ResultsSection';
import { PackagesSection } from '../components/PackagesSection';
import { TeamGrid } from '../components/TeamGrid';
import { Testimonials } from '../components/Testimonials';
import { FAQSection } from '../components/FAQSection';
import { ClosingCTA } from '../components/ClosingCTA';

interface HomePageProps {
  onOpenConsultationModal: () => void;
}

/**
 * The home page. Section order and ids are what the navigation hrefs
 * ("/#team", "/#packages") resolve against.
 *
 * Two sections are self-hiding and currently absent by design:
 * - PressStrip     — renders only with real coverage in clientConfig.press.items
 * - ResultsSection — renders only with real before/after images on a procedure
 * Neither leaves a gap, so the page is correct today and gains the section the moment
 * the missing content is added to the config.
 */
export const HomePage: React.FC<HomePageProps> = ({ onOpenConsultationModal }) => {
  // Each page owns its own title/description.
  useDocumentMeta(clientConfig.siteMeta.homeTitle, clientConfig.siteMeta.homeDescription);

  return (
    <>
      <HeroSequence />
      <ManifestoStats />
      <MethodSection />
      <TreatmentsGrid />
      <DiagnosticTicker />
      <PressStrip />
      <ResultsSection />
      <PackagesSection />
      <TeamGrid />
      <Testimonials />
      <FAQSection />
      <ClosingCTA onOpenConsultationModal={onOpenConsultationModal} />
    </>
  );
};

export default HomePage;
