import React, { useState, useEffect } from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Menu, X, Phone } from 'lucide-react';
import { Link, resolveHref, useLocation } from '../lib/router';

interface HeaderProps {
  onOpenConsultationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let rafId = 0;
    let lastValue = window.scrollY > 30;
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const next = window.scrollY > 30;
        if (next !== lastValue) {
          lastValue = next;
          setIsScrolled(next);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // A route change should always leave the mobile drawer closed.
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const { navigation, clinic } = clientConfig;
  const navLinks = navigation.items;
  const telHref = `tel:${clinic.phone.replace(/[^0-9+]/g, '')}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5F1]/95 backdrop-blur-md py-3.5 border-b border-hairline shadow-sm text-[#0A0A0A]'
          : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent py-4 sm:py-5 text-[#FAF8F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand Mark & Title */}
        <Link
          to="/"
          aria-label={navigation.brandAriaLabel}
          className="group flex flex-col items-start flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
        >
          <span className="font-sans text-[13px] sm:text-lg md:text-xl tracking-[0.1em] sm:tracking-[0.16em] font-medium uppercase transition-colors whitespace-nowrap">
            {clinic.name}
          </span>
          <span
            className={`text-[9px] sm:text-[10px] font-medium tracking-widest uppercase transition-colors whitespace-nowrap ${
              isScrolled ? 'text-ink-400' : 'text-[#E5E0D8]/70'
            }`}
          >
            {clinic.locality}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-5 lg:gap-7 flex-shrink-0">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={resolveHref(link.href, pathname)}
              className={`text-xs font-medium tracking-widest uppercase transition-colors whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A876] hover:after:w-full after:transition-all after:duration-300 ${
                isScrolled
                  ? 'text-[#0A0A0A] hover:text-[#C9A876]'
                  : 'text-[#FAF8F5]/90 hover:text-[#C9A876]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact actions: a real phone number plus the WhatsApp booking CTA.
            Every clinic in this market puts a dialable number above the fold. */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={telHref}
            aria-label={navigation.phoneAriaLabel}
            className={`group hidden xl:inline-flex items-center gap-2 text-xs font-medium tracking-widest uppercase transition-colors whitespace-nowrap ${
              isScrolled ? 'text-[#0A0A0A] hover:text-[#C9A876]' : 'text-[#FAF8F5]/90 hover:text-[#C9A876]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{clinic.phone}</span>
          </a>

          <a
            href={clientConfig.getWhatsAppUrl(navigation.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={navigation.ctaAriaLabel}
            className={`group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-widest uppercase transition-all duration-300 border whitespace-nowrap ${
              isScrolled
                ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F5] hover:bg-[#C9A876] hover:border-[#C9A876] hover:text-[#0A0A0A]'
                : 'border-[#FAF8F5]/70 bg-transparent text-[#FAF8F5] hover:border-[#C9A876] hover:text-[#C9A876] hover:bg-[#FAF8F5]/10'
            }`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>{navigation.ctaLabel}</span>
          </a>

          {/* Mobile actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={telHref}
              aria-label={navigation.phoneAriaLabel}
              className="flex h-11 w-11 items-center justify-center text-[#C9A876] border border-[#C9A876]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876]"
            >
              <Phone className="w-4 h-4" />
            </a>

            <a
              href={clientConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={navigation.mobileWhatsappAriaLabel}
              className="flex h-11 w-11 items-center justify-center text-[#C9A876] border border-[#C9A876]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] sm:hidden"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={navigation.mobileMenuAriaLabel}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
              className={`flex h-11 w-11 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A876] ${
                isScrolled ? 'text-[#0A0A0A]' : 'text-[#FAF8F5]'
              }`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="xl:hidden fixed inset-x-0 top-full bg-[#F7F5F1] border-b border-hairline shadow-2xl py-6 px-8 pb-[max(1.5rem,env(safe-area-inset-bottom))] flex flex-col gap-5 text-[#0A0A0A] animate-drawer-in"
        >
          <div className="text-[10px] font-medium tracking-widest uppercase text-ink-400 pb-2 border-b border-hairline">
            {navigation.mobileMenuLabel}
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={resolveHref(link.href, pathname)}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-sans tracking-widest hover:text-[#C9A876] transition-colors py-1 flex items-center justify-between border-b border-hairline/50"
              >
                <span>{link.name}</span>
                <span className="text-xs font-sans text-[#C9A876]">→</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href={clientConfig.getWhatsAppUrl(navigation.mobileWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#C9A876] text-[#0A0A0A] text-xs font-medium tracking-widest uppercase"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A]" />
              <span>{navigation.ctaLabel}</span>
            </a>

            <a
              href={telHref}
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 border border-[#0A0A0A] text-[#0A0A0A] text-xs font-medium tracking-widest uppercase"
            >
              <Phone className="w-4 h-4" />
              <span>{clinic.phone}</span>
            </a>
          </div>

          <div className="text-[11px] text-ink-400 text-center pt-2">
            {clinic.address}
          </div>
        </div>
      )}
    </header>
  );
};
