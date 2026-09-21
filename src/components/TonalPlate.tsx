import React from 'react';
import { cn } from '@/lib/utils';

interface TonalPlateProps {
  label: string;
  className?: string;
  /**
   * Optional duotone ramp. Supplying both turns the neutral plate into a course
   * visual — a soft diagonal gradient carrying the same organic motif the colour
   * comps used.
   *
   * The ramp is decoration only: it never carries body copy, and the label that
   * does sit on it is protected by a caption scrim (see below). These hues measure
   * 1.78–2.59:1 as a bare ground for white text, so the scrim is not optional.
   */
  from?: string;
  to?: string;
}

/**
 * The stand-in for a media slot that has no artwork yet.
 *
 * Deliberately NOT a debug box: no dashed border, no icon, and no authoring
 * instructions. Authoring notes belong in the config and the launch checklist, never
 * in rendered copy that a patient or a prospective client can read. The plate carries
 * the one true thing available — what the slot is — so a missing photograph reads as a
 * composed surface rather than a fault.
 *
 * Two modes:
 * - Neutral (no `from`/`to`): the system's Deep Ivory ground. Used wherever a slot is
 *   simply absent.
 * - Duotone (`from` + `to`): a course or category visual. Used where the slot has a
 *   known colour identity but no photograph yet.
 *
 * The caption scrim is what makes the duotone mode safe to reuse for real photography
 * later: whatever the image is, the label keeps its contrast.
 */
export const TonalPlate: React.FC<TonalPlateProps> = ({ label, className, from, to }) => {
  const duotone = Boolean(from && to);

  if (!duotone) {
    return (
      <div
        className={cn(
          'flex h-full w-full items-center justify-center bg-[#EFECE6] px-4 text-center',
          className,
        )}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-ink-500">
          {label}
        </span>
      </div>
    );
  }

  return (
    // NOTE: deliberately no `h-full` here. Inside a stretched grid/flex column a
    // percentage height resolves against the card, which would defeat any
    // aspect-ratio the caller passes and let the plate fill the whole card.
    <div
      className={cn('relative flex w-full items-end overflow-hidden', className)}
      style={{ backgroundImage: `linear-gradient(155deg, ${from} 0%, ${to} 100%)` }}
    >
      {/* Organic motif — soft highlights and concentric rings, echoing the macro
          photography language of the reference clinics. Decorative only. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: [
            'radial-gradient(120% 90% at 78% 12%, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 46%)',
            'radial-gradient(80% 70% at 14% 88%, rgba(255,255,255,0.26) 0%, rgba(255,255,255,0) 52%)',
            'repeating-radial-gradient(circle at 62% 38%, rgba(255,255,255,0.16) 0 2px, rgba(255,255,255,0) 2px 26px)',
          ].join(','),
        }}
      />
      {/* Caption scrim. Measured with it: white label reads 5.3–7.0:1 across all three
          course ramps at their lightest end. Without it the same label falls to
          1.78–2.59:1, which is why it is baked in here rather than at the call site. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
        }}
      />
      <span className="relative px-4 pb-3.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
        {label}
      </span>
    </div>
  );
};

export default TonalPlate;