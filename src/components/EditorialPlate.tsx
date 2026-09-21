import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Vite exposes `import.meta.env.DEV`, but this project deliberately does not pull in
 * the `vite/client` global types (see tsconfig.json), so it is read structurally here
 * rather than by widening the compiler config for one flag.
 */
const isDevBuild =
  (import.meta as ImportMeta & { env?: { DEV?: boolean } }).env?.DEV === true;

export interface EditorialPlateProps {
  /**
   * Development-only caption naming the photograph this slot is reserved for, e.g.
   * "PLACEHOLDER — CLINIC ARCHITECTURE". It renders in dev builds only: a production
   * visitor sees a composed neutral surface, never authoring copy.
   */
  label: string;
  /**
   * The final photograph. Empty means the slot is still a placeholder. Adding the file
   * path here is the only change needed to ship the real image — the frame, the crop
   * and the type around it do not move.
   */
  src?: string;
  /** Alt text. Defaults to empty: these slots are art direction, not content. */
  alt?: string;
  /**
   * The box the final photograph is art-directed to occupy — its intended aspect ratio,
   * responsive height and radius. The placeholder takes exactly this box, so the page
   * composes identically before and after the photograph lands.
   */
  className?: string;
  /** Intended object-position (the intended crop) of the final photograph. */
  objectPosition?: string;
}

/**
 * A reserved editorial photograph slot.
 *
 * This is the large-frame sibling of `TonalPlate`, and it exists for the same reason:
 * a luxury page that is waiting on photography should still compose as a finished page.
 * The difference is scale and intent — `TonalPlate` stands in for card and category
 * media, this one for the section-scale editorial photographs (clinic architecture,
 * treatment-room detail, patient experience) that carry the page's visual rhythm.
 *
 * Deliberately not a debug box: no dashed border, no icon, no crosshairs. The plate is
 * the system's own ivory tonal field, so an empty slot reads as a quiet surface the
 * section was designed around rather than as a fault. The descriptive label is the one
 * exception, and it is compiled out of production — it exists so the slot can be
 * identified while the real photography is still being shot.
 *
 * Swapping in the real image is a one-line change per slot: pass `src`. Everything else
 * — aspect ratio, crop, radius, surrounding measure — is already set.
 */
export const EditorialPlate: React.FC<EditorialPlateProps> = ({
  label,
  src,
  alt = '',
  className,
  objectPosition = 'center',
}) => (
  <div className={cn('relative overflow-hidden bg-[#EFECE6]', className)}>
    {src ? (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ objectPosition }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    ) : (
      <>
        <span
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            // The system's ivory tonal field (base → soft → deep ivory), the same
            // depth-by-tone device the rest of the page uses. Decoration only.
            backgroundImage:
              'radial-gradient(118% 104% at 30% 22%, #FAF8F5 0%, #EFECE6 52%, #E5E0D8 100%)',
          }}
        />
        {isDevBuild && (
          <span className="absolute inset-x-0 bottom-4 px-4 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-ink-400">
            [{label}]
          </span>
        )}
      </>
    )}
  </div>
);

export default EditorialPlate;
