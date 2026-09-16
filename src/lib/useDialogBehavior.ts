import { useEffect, type RefObject } from 'react';

/**
 * Shared overlay behavior: body-scroll lock, focus trap, Escape to close, and
 * focus restore. Matches the primitives used by the Procedure Detail Dialog.
 */
export function useDialogBehavior(
  active: boolean,
  panelRef: RefObject<HTMLElement | null>,
  onClose: () => void
) {
  // Lock body scroll while active.
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [active]);

  // Move focus into the panel on open; restore it on close.
  useEffect(() => {
    if (!active) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    return () => {
      previous?.focus?.();
    };
  }, [active, panelRef]);

  // Escape closes; Tab is trapped within the panel.
  useEffect(() => {
    if (!active) return;
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
      const activeEl = document.activeElement as HTMLElement | null;

      if (!activeEl || !focusables.includes(activeEl)) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      } else if (event.shiftKey && activeEl === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, panelRef, onClose]);
}
