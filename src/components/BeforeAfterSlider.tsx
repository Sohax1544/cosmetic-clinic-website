import React, { useCallback, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BeforeAfterSliderProps {
  before?: string;
  after?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
  aspectClassName?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  before,
  after,
  beforeLabel = 'Before',
  afterLabel = 'After',
  className,
  aspectClassName = 'aspect-[4/3]',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const next = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    updateFromClientX(event.clientX);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(event.clientX);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      setPosition((prev) => Math.max(0, prev - 4));
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      setPosition((prev) => Math.min(100, prev + 4));
    }
  };

  // Structural gate, held at the component boundary rather than in each caller: a
  // comparison needs BOTH halves, so with either one missing this renders nothing at
  // all. That makes "no empty comparison frames" a property of the component, not a
  // convention every call site has to remember. Declared after the hooks so the hook
  // order stays unconditional.
  if (!before || !after) return null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      style={{ touchAction: 'pan-y' }}
      className={cn(
        'relative w-full select-none overflow-hidden rounded-xl border border-hairline bg-[#2A2622]',
        aspectClassName,
        className
      )}
    >
      <img
        src={after}
        alt={afterLabel}
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img
          src={before}
          alt={beforeLabel}
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <span className="pointer-events-none absolute right-3 top-3 rounded-md border border-[#D6C0A0]/40 bg-[#2A2622]/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#C9A876] backdrop-blur-md">
        {afterLabel}
      </span>
      <span className="pointer-events-none absolute left-3 top-3 rounded-md border border-hairline bg-[#FAF8F5]/90 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-[#0A0A0A] backdrop-blur-md">
        {beforeLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${position}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-[#FAF8F5]/80" />
      </div>

      <button
        type="button"
        role="slider"
        aria-label="Drag to compare before and after"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={handleKeyDown}
        className="absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border border-hairline bg-[#FAF8F5] text-[#0A0A0A] shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0]"
        style={{ left: `${position}%` }}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <ChevronRight className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};
