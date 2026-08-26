import React, { useState, useEffect } from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenConsultationModal?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Treatments', href: '#treatments' },
    { name: 'Medical Team', href: '#team' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F5F1]/95 backdrop-blur-md py-3.5 border-b border-[#E6E2DA] shadow-sm text-[#0A0A0A]'
          : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/60 to-transparent py-4 sm:py-5 text-[#FAF8F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between gap-4">
        
        {/* Brand Mark & Title (No wrap / shrink-0) */}
        <a 
          href="#"
          className="group flex flex-col items-start flex-shrink-0 focus:outline-none"
        >
          <span className="font-serif text-base sm:text-lg md:text-xl tracking-[0.16em] font-medium uppercase transition-colors whitespace-nowrap">
            {clientConfig.clinic.name}
          </span>
          <span className={`text-[9px] sm:text-[10px] tracking-luxury uppercase transition-colors whitespace-nowrap ${
            isScrolled ? 'text-[#737373]' : 'text-[#E5E0D8]/70'
          }`}>
            Harley St · London
          </span>
        </a>

        {/* 4 Reduced Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-shrink-0">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-xs font-medium tracking-subtle uppercase transition-colors whitespace-nowrap relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A876] hover:after:w-full after:transition-all after:duration-300 ${
                isScrolled
                  ? 'text-[#0A0A0A] hover:text-[#C9A876]'
                  : 'text-[#FAF8F5]/90 hover:text-[#C9A876]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Single WhatsApp Booking CTA Button (No phone number, no wrap) */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href={clientConfig.getWhatsAppUrl("Hello Maison Été Concierge, I would like to inquire about booking a confidential aesthetic consultation.")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct WhatsApp Consultation Booking"
            className={`group hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium tracking-subtle uppercase transition-all duration-300 border whitespace-nowrap ${
              isScrolled
                ? 'border-[#0A0A0A] bg-[#0A0A0A] text-[#FAF8F5] hover:bg-[#C9A876] hover:border-[#C9A876] hover:text-[#0A0A0A]'
                : 'border-[#FAF8F5]/70 bg-transparent text-[#FAF8F5] hover:border-[#C9A876] hover:text-[#C9A876] hover:bg-[#FAF8F5]/10'
            }`}
          >
            <WhatsAppIcon className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
            <span>Book via WhatsApp</span>
          </a>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 md:hidden">
            <a
              href={clientConfig.getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="p-2 text-[#C9A876] border border-[#C9A876]/40"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              className={`p-2 focus:outline-none ${
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
        <div className="md:hidden fixed inset-x-0 top-full bg-[#F7F5F1] border-b border-[#E6E2DA] shadow-2xl py-6 px-8 flex flex-col gap-5 text-[#0A0A0A] animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="text-[10px] tracking-luxury uppercase text-[#737373] pb-2 border-b border-[#E6E2DA]">
            Navigation
          </div>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-serif tracking-wide hover:text-[#C9A876] transition-colors py-1 flex items-center justify-between border-b border-[#E6E2DA]/50"
              >
                <span>{link.name}</span>
                <span className="text-xs font-mono text-[#C9A876]">→</span>
              </a>
            ))}
          </div>

          <div className="pt-2">
            <a
              href={clientConfig.getWhatsAppUrl("Hello Maison Été Concierge, I would like to book a private aesthetic consultation via WhatsApp.")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2.5 py-3.5 bg-[#C9A876] text-[#0A0A0A] text-xs font-medium tracking-subtle uppercase"
            >
              <WhatsAppIcon className="w-4 h-4 text-[#0A0A0A]" />
              <span>Book via WhatsApp</span>
            </a>
          </div>

          <div className="text-[11px] text-[#737373] text-center pt-2">
            {clientConfig.clinic.address}
          </div>
        </div>
      )}
    </header>
  );
};
