import React, { useEffect, useRef, useState, useCallback } from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ArrowDownRight } from 'lucide-react';

interface HeroSequenceProps {
  onOpenConsultationModal?: () => void;
}

export const HeroSequence: React.FC<HeroSequenceProps> = ({ onOpenConsultationModal }) => {
  const { hero } = clientConfig;
  const clips = hero.clips; // Exactly 2 clips: Honeycomb & Amber

  const [currentClipIndex, setCurrentClipIndex] = useState<number>(0);
  const [isInView, setIsInView] = useState<boolean>(true);
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Image cache per clip: clipIndex -> HTMLImageElement[]
  const imageCacheRef = useRef<Map<number, HTMLImageElement[]>>(new Map());
  
  // Animation timing refs
  const clipStartTimeRef = useRef<number>(performance.now());
  const animationFrameIdRef = useRef<number | null>(null);

  // Lazy pause when offscreen
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Preload frames for both clips
  const preloadClipImages = useCallback((clipIndex: number) => {
    const targetClip = clips[clipIndex];
    if (!targetClip || imageCacheRef.current.has(clipIndex)) return;

    const images: HTMLImageElement[] = [];
    const total = targetClip.frameCount;

    for (let i = 0; i < total; i++) {
      const img = new Image();
      img.src = targetClip.getFrameUrl(i);
      images.push(img);
    }

    imageCacheRef.current.set(clipIndex, images);
  }, [clips]);

  useEffect(() => {
    preloadClipImages(0);
    preloadClipImages(1);
  }, [preloadClipImages]);

  // High-performance canvas render loop: runs only when in view
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isInView) {
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    clipStartTimeRef.current = performance.now();

    const cycleInterval = hero.cycleIntervalMs || 2800;

    const renderLoop = (timestamp: number) => {
      const elapsed = timestamp - clipStartTimeRef.current;

      if (elapsed >= cycleInterval) {
        clipStartTimeRef.current = timestamp;
        setCurrentClipIndex((prev) => (prev === 0 ? 1 : 0));
      }

      const currentClip = clips[currentClipIndex] || clips[0];
      const frameCount = currentClip.frameCount;
      const progress = Math.min(Math.max((elapsed % cycleInterval) / cycleInterval, 0), 0.999);
      const frameIndex = Math.floor(progress * frameCount);

      const clipImages = imageCacheRef.current.get(currentClipIndex);
      const activeImg = clipImages ? clipImages[frameIndex] : null;

      if (activeImg && activeImg.complete && activeImg.naturalWidth > 0) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const targetWidth = rect.width;
        const targetHeight = rect.height;

        ctx.save();
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const imgAspect = activeImg.naturalWidth / activeImg.naturalHeight;
        const canvasAspect = targetWidth / targetHeight;

        let drawWidth = targetWidth;
        let drawHeight = targetHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasAspect > imgAspect) {
          drawWidth = targetWidth;
          drawHeight = targetWidth / imgAspect;
          offsetY = (targetHeight - drawHeight) / 2;
        } else {
          drawHeight = targetHeight;
          drawWidth = targetHeight * imgAspect;
          offsetX = (targetWidth - drawWidth) / 2;
        }

        ctx.drawImage(activeImg, offsetX, offsetY, drawWidth, drawHeight);
        ctx.restore();
      }

      animationFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animationFrameIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [currentClipIndex, clips, hero.cycleIntervalMs, isInView]);

  return (
    <section 
      id="hero"
      ref={sectionRef}
      aria-label="Private Aesthetic Medicine & Longevity Practice"
      className="relative w-full h-[100vh] min-h-[640px] flex items-center overflow-hidden bg-[#0A0A0A]"
    >
      {/* Background Image Sequence Canvas (Clean, ultra-smooth 60fps render) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-95 transition-opacity duration-300"
      />

      {/* Clean Gradient Scrim: Lighter overall for pure, un-filtered footage and crisp text legibility */}
      <div 
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background: `
            radial-gradient(circle at 20% 72%, rgba(10, 10, 10, 0.76) 0%, rgba(10, 10, 10, 0.52) 45%, rgba(10, 10, 10, 0.18) 75%, transparent 100%),
            linear-gradient(135deg, rgba(10, 10, 10, 0.50) 0%, rgba(10, 10, 10, 0.10) 55%, transparent 100%),
            linear-gradient(to top, rgba(10, 10, 10, 0.80) 0%, rgba(10, 10, 10, 0.20) 30%, transparent 100%)
          `
        }}
      />

      {/* Hero Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-24 pb-12 flex flex-col justify-center">
        <div className="max-w-3xl">
          
          {/* Subtle Tag */}
          <div className="mb-4 inline-block">
            <span className="text-[#C9A876] text-xs font-semibold tracking-luxury uppercase border-b border-[#C9A876]/30 pb-1">
              Private Aesthetic Medicine & Bio-Longevity
            </span>
          </div>

          {/* Bold Serif Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-[#FAF8F5] leading-[1.08] mb-6 drop-shadow-sm">
            {hero.headlineMain} <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#E0C89E] font-cormorant font-light">
              {hero.headlineEmphasis}
            </span>
          </h1>

          {/* Understated Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-[#E5E0D8]/90 font-light leading-relaxed max-w-2xl mb-10">
            {hero.subheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            
            {/* Primary WhatsApp CTA */}
            <a
              href={clientConfig.getWhatsAppUrl("Hello Maison Été Concierge, I would like to reserve a private aesthetic medicine consultation.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Book Private Consultation via WhatsApp"
              className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-[#C9A876] text-[#0A0A0A] font-medium text-sm tracking-subtle uppercase transition-all duration-300 hover:bg-[#B89660] hover:shadow-[0_8px_30px_rgba(201,168,118,0.25)] focus:outline-none focus:ring-2 focus:ring-[#C9A876]"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A] transition-transform group-hover:scale-110" />
              <span>{hero.ctaWhatsAppText}</span>
              <ArrowDownRight className="w-4 h-4 text-[#0A0A0A] transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>

            {/* Secondary Protocol Trigger */}
            <button
              onClick={() => {
                if (onOpenConsultationModal) {
                  onOpenConsultationModal();
                } else {
                  document.getElementById('treatments')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-transparent border border-[#FAF8F5]/30 text-[#FAF8F5] text-sm tracking-subtle uppercase transition-all duration-300 hover:border-[#C9A876] hover:text-[#C9A876] hover:bg-[#FAF8F5]/5"
            >
              <span>{hero.ctaSecondaryText}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Minimalist Bottom Scroll Hint */}
      <a
        href="#about"
        aria-label="Scroll to about section"
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-1.5 text-[#FAF8F5]/40 hover:text-[#C9A876] transition-colors duration-300"
      >
        <span className="text-[10px] tracking-luxury uppercase font-mono">SCROLL</span>
        <div className="w-[1px] h-4 bg-gradient-to-b from-[#C9A876] to-transparent animate-bounce" />
      </a>
    </section>
  );
};
