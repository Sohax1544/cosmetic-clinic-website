import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { X, CheckCircle2, Clock, ShieldCheck, Tag, ArrowRight } from 'lucide-react';
import { clientConfig, Treatment, TreatmentBeforeAfterCase } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Link } from '../lib/router';
import { cn } from '@/lib/utils';
import { BeforeAfterSlider } from './BeforeAfterSlider';

/**
 * Summary quick-view for a procedure.
 *
 * This dialog is deliberately NOT the full treatment page. It carries the three or
 * four facts a patient needs to decide whether the procedure is relevant (session
 * length, downtime, starting price), the short description and the headline benefits,
 * then hands off to /procedures/:slug for the process, before/after, gallery and FAQs.
 *
 * Rationale: rendering the whole page inside the modal as well would put the same
 * copy on two URLs, dilute both, and leave the "View full details" click with nothing
 * new to show. The modal is a glance; the page is the destination.
 */

interface ProcedureDetailDialogProps {
  treatment: Treatment;
  onClose: () => void;
}

type IconComponent = React.ComponentType<{ className?: string }>;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState<boolean>(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    setMatches(mql.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="mb-4 flex items-center gap-3">
    <div className="h-[1px] w-8 bg-[#D6C0A0]" />
    <span className="text-xs font-medium uppercase tracking-widest text-gold-text">{children}</span>
  </div>
);

export const ProcedureDetailDialog: React.FC<ProcedureDetailDialogProps> = ({ treatment, onClose }) => {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery('(max-width: 639px)');
  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const pushedEntryRef = useRef(false);

  // Back button closes the dialog instead of leaving the site: opening pushes a
  // same-URL history entry, and popstate closes. The entry is popped again on
  // unmount so closing with X or Escape does not leave a dead history step.
  useEffect(() => {
    window.history.pushState({ ...(window.history.state || {}), __procedureModal: true }, '');
    pushedEntryRef.current = true;

    const handlePop = () => {
      pushedEntryRef.current = false;
      onClose();
    };

    window.addEventListener('popstate', handlePop);
    return () => {
      window.removeEventListener('popstate', handlePop);
      // Only unwind when our own entry is still on top. A Link navigation sets a
      // fresh state object, so this correctly does nothing when routing to the page.
      if (pushedEntryRef.current && window.history.state?.__procedureModal) {
        window.history.back();
      }
    };
  }, [onClose]);

  // Lock body scroll while open.
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // Focus management + restore on close.
  useEffect(() => {
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, []);

  // Escape to close + focus trap.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const focusables = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      );
      if (focusables.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (!active || !focusables.includes(active)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const details = treatment.details;
  // Real consented photography wins; otherwise the labelled SAMPLE fallback applies —
  // the same rule the treatment page uses.
  const beforeAfterCases = (details?.beforeAfter ?? []).filter((c) => c.before && c.after);
  const beforeAfterDemo = clientConfig.beforeAfterDemo;
  const isDemoComparison = beforeAfterCases.length === 0 && beforeAfterDemo.enabled;
  const comparison: TreatmentBeforeAfterCase | undefined = isDemoComparison
    ? { label: beforeAfterDemo.label, before: beforeAfterDemo.before, after: beforeAfterDemo.after }
    : beforeAfterCases[0];
  const facts = [
    treatment.duration && { icon: Clock, label: 'Session', value: treatment.duration },
    treatment.downtime && { icon: ShieldCheck, label: 'Downtime', value: treatment.downtime },
    treatment.priceGuide && { icon: Tag, label: 'Price', value: treatment.priceGuide },
  ].filter(Boolean) as { icon: IconComponent; label: string; value: string }[];

  const whatsappMessage = `Hello ${clientConfig.clinic.name}, I would like to enquire about ${treatment.title}.`;
  const fullPageHref = treatment.slug ? `/procedures/${treatment.slug}` : '';

  const panelInitial = reduceMotion ? { opacity: 0 } : isMobile ? { y: '100%' } : { opacity: 0, scale: 0.97 };
  const panelAnimate = reduceMotion ? { opacity: 1 } : isMobile ? { y: 0 } : { opacity: 1, scale: 1 };
  const panelExit = reduceMotion ? { opacity: 0 } : isMobile ? { y: '100%' } : { opacity: 0, scale: 0.97 };
  const panelTransition = {
    duration: reduceMotion ? 0 : isMobile ? 0.35 : 0.22,
    ease: 'easeOut' as const,
  };

  // Display label, not the raw category id — the cards render the label, and a dialog
  // showing "FACIAL" next to a card showing "Injectables & Face" reads as a bug.
  const categoryLabel =
    clientConfig.treatmentsSection.categories.find((c) => c.id === treatment.category)?.label ??
    treatment.category;

  const categoryPill = (
    <span className="rounded-md border border-hairline bg-[#FAF8F5]/90 px-3 py-1 text-[10px] font-medium uppercase tracking-widest text-[#0A0A0A]">
      {categoryLabel}
    </span>
  );

  const closeButton = (
    <button
      type="button"
      onClick={onClose}
      aria-label="Close procedure summary"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-hairline bg-[#FAF8F5] text-[#0A0A0A] transition-colors hover:bg-[#EFECE6] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0]"
    >
      <X className="h-4 w-4" />
    </button>
  );

  // Primary action: the full page. Falls back to the WhatsApp CTA when a procedure
  // has no slug, so the button is never dead.
  const detailsButton = fullPageHref ? (
    <Link
      to={fullPageHref}
      className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-[#D6C0A0] px-6 py-3.5 text-xs font-medium uppercase tracking-widest text-[#0A0A0A] transition-colors hover:bg-[#B89660] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A0A]"
    >
      <span>{clientConfig.treatmentsSection.detailsLabel}</span>
      <ArrowRight className="h-4 w-4" />
    </Link>
  ) : null;

  const whatsAppButton = (
    <a
      href={clientConfig.getWhatsAppUrl(whatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-xs font-medium uppercase tracking-widest transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0]',
        fullPageHref
          ? 'border border-hairline bg-transparent text-[#0A0A0A] hover:border-[#D6C0A0]'
          : 'bg-[#D6C0A0] text-[#0A0A0A] hover:bg-[#B89660]'
      )}
    >
      <WhatsAppIcon className="h-4 w-4" />
      <span>{clientConfig.treatmentsSection.whatsappCtaLabel}</span>
    </a>
  );

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6">
      <motion.div
        aria-hidden="true"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.2 }}
        className="absolute inset-0 bg-[#0A0A0A]/70 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${treatment.title} summary`}
        tabIndex={-1}
        initial={panelInitial}
        animate={panelAnimate}
        exit={panelExit}
        transition={panelTransition}
        className="relative z-10 flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-hairline bg-[#FAF8F5] text-[#0A0A0A] shadow-2xl focus:outline-none sm:max-h-[90vh] sm:max-w-[820px] sm:rounded-2xl"
      >
        {/* Header */}
        <div className="shrink-0 border-b border-hairline px-5 pb-5 pt-6 sm:px-8">
          <div className="flex items-start justify-between gap-3">
            {categoryPill}
            {closeButton}
          </div>
          <h2 className="mt-4 font-display text-2xl leading-snug tracking-tight text-[#2A2622] sm:text-3xl">
            {treatment.title}
          </h2>
          <p className="mt-2 text-sm font-light leading-relaxed text-gold-text sm:text-base">
            {treatment.subtitle}
          </p>

          {/* Key facts */}
          <div className="mt-5 flex flex-wrap gap-2">
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <span
                  key={fact.label}
                  className="inline-flex items-center gap-2 rounded-full border border-hairline bg-[#F7F5F1] px-3 py-1.5 text-[11px] text-[#0A0A0A]"
                >
                  <Icon className="h-3.5 w-3.5 text-[#C9A876]" />
                  <span className="text-[10px] font-medium uppercase tracking-widest text-ink-400">
                    {fact.label}
                  </span>
                  <span>{fact.value}</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {comparison && (
            <figure className="mb-6">
              <BeforeAfterSlider
                before={comparison.before}
                after={comparison.after}
                aspectClassName="aspect-[16/10]"
              />
              <figcaption className="mt-2 text-[10px] uppercase tracking-widest text-ink-400">
                {comparison.label}
              </figcaption>
              {isDemoComparison && (
                <p className="mt-1.5 text-[10px] font-medium leading-snug text-[#806334]">
                  {beforeAfterDemo.note}
                </p>
              )}
            </figure>
          )}

          <p className="text-sm font-normal leading-relaxed text-ink-500 sm:text-base">
            {treatment.description}
          </p>

          {details?.benefits && details.benefits.length > 0 && (
            <section className="mt-8">
              <SectionLabel>What it helps with</SectionLabel>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {details.benefits.slice(0, 4).map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-[#0A0A0A]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A876]" />
                    <span className="leading-snug">{benefit}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {details?.suitableFor && details.suitableFor.length > 0 && (
            <section className="mt-8">
              <SectionLabel>Is this right for you?</SectionLabel>
              <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {details.suitableFor.slice(0, 4).map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-ink-500">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A876]" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {fullPageHref && (
            <p className="mt-8 rounded-xl border border-hairline bg-[#F7F5F1] p-4 text-xs leading-relaxed text-ink-500">
              The full treatment page covers the step-by-step process, aftercare, the
              practitioner who performs it and the questions patients ask most.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="shrink-0 space-y-2.5 border-t border-hairline bg-[#FAF8F5] px-5 py-4 sm:px-8">
          {detailsButton}
          {whatsAppButton}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ProcedureDetailDialog;
