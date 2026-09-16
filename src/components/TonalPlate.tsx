import React from 'react';
import { cn } from '@/lib/utils';

interface TonalPlateProps {
  label: string;
  className?: string;
}

/**
 * Deliberate stand-in for a media slot that has no artwork yet.
 *
 * Deliberately NOT a debug box: no dashed border, no icon, and no authoring
 * instructions. Authoring notes belong in the config and the launch checklist, never in
 * rendered copy that a patient or a prospective client can read. The plate carries the
 * one true thing available — what the slot is — on the system's own tonal ground, so a
 * missing photograph reads as a composed surface rather than a fault.
 */
export const TonalPlate: React.FC<TonalPlateProps> = ({ label, className }) => (
  <div
    className={cn(
      'flex h-full w-full items-center justify-center bg-[#EFECE6] px-4 text-center',
      className,
    )}
  >
    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8A7A5E]">
      {label}
    </span>
  </div>
);

export default TonalPlate;
