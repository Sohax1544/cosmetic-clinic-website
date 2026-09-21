import React, { useState } from 'react';
import { clientConfig } from '../client.config';
import { WhatsAppIcon } from './WhatsAppIcon';
import { Menu, X, Phone } from 'lucide-react';
import { Link, resolveHref, useLocation } from '../lib/router';

interface HeaderProps {
  onOpenConsultationModal?: () => void;
}

/**
 * Header.
 *
 * It floats over the hero: `fixed`, fully TRANSPARENT over the home hero's photograph —
 * the image runs to the very top of the page and the navigation sits on it — then opaque
 * cream with a subtle backdrop blur and a 1px bottom border once the page is scrolled.
 *
 * WHERE IT IS TRANSPARENT. Only where a photograph is actually underneath: the home route
 * with `hero.image` set. On every other route (procedure pages, the index, 404) there is no
 * image behind the bar, so it renders opaque from the start — a transparent bar over a text
 * page would let the breadcrumb show through behind the wordmark. A reskin that moves the
 * hero, or a client who clears `hero.image`, gets the opaque bar automatically.
 *
 * ONE TONE SOURCE. Over the hero the bar reads `clientConfig.hero.tone` and matches the
 * hero's own veil — ink on a soft ivory wash for a bright photograph, ivory on a darkening
 * scrim for a dark one. It never assumes the photograph's brightness, and a reskin that
 * flips the hero to a dark image flips the header with it. See DESIGN.md, The Lit Hero
 * Rule.
 *
 * LEGIBILITY WITHOUT A BAR. Over the bright hero the veil is deliberately weak (0.34 ivory,
 * gone by 130px), so ink type also carries a faint ivory text-shadow to hold the letterforms
 * together where the photograph is busiest. That is what keeps the bar transparent instead
 * of dark, which would waste the photograph the hero is built around.
 *
 * ONE CONTAINER. The bar's inner row uses the same container and gutters as the hero's
 * text and the section below it, so the wordmark, the hero eyebrow/headline and the next
 * section's label all start on one left edge.
 *
 * SPACING. The WhatsApp CTA sits 28px (gap-7) right of the phone number, so the number
 * and the button never collide.
 *
 * RESPONSIVE. From `xl` the bar shows nav + number + CTA; below that (1024 and down) the
 * nav folds into the drawer and the number lives there too, which keeps the bar from
 * overflowing. The WhatsApp CTA stays visible at every width.
 */
export const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  React.useEffect(() => {
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
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const { navigation, clinic } = clientConfig;
  const navLinks = navigation.items;
  const telHref = `tel:${clinic.phone.replace(/[^0-9+]/g, '')}`;

  // The bar floats over the hero photograph, so it reads `hero.tone` for its own contrast
  // and never assumes. A bright hero puts ink on a soft IVORY veil — the same veil the
  // hero derives, at the same colour — which lets the header follow the hero's composition
  // instead of darkening the top of the frame to carry ivory type. A dark hero keeps ivory
  // type on a darkening scrim. See DESIGN.md, The Lit Hero Rule.
  const isLightHero = clientConfig.hero.tone !== 'dark';

  // Only the home route puts a full-bleed photograph behind the bar. Derived from the route
  // and the config rather than hard-coded to "/", so a client who moves the hero to another
  // path — or removes the image entirely — gets the opaque bar instead of a transparent one
  // over nothing.
  const hasPhotographicHero = pathname === '/' && Boolean(clientConfig.hero.image);

  // The bar is transparent only where there is a photograph under it. Over the hero (home)
  // the image runs to the top of the page and the navigation sits on it — with a very soft
  // ivory veil under the type, peaking at 0.34 and gone by 130px, roughly a third of the
  // hero's own veil strength, because a bright photograph would otherwise leave ink type
  // fighting busy pixels. Everywhere else there is no image, so the bar stays opaque: a
  // transparent bar over text pages would let the breadcrumb show through behind the
  // wordmark. `isScrolled` then swaps the veil for the solid cream bar on the home page.
  const isTransparentHeader = !isScrolled && hasPhotographicHero;

  const overHeroClass = isLightHero
    ? 'bg-transparent py-4 sm:py-4.5 text-[#0A0A0A]'
    : 'bg-transparent py-4 sm:py-4.5 text-[#FAF8F5]';

  const overHeroScrim = isLightHero
    ? 'linear-gradient(180deg, rgba(250, 246, 239, 0.34) 0%, rgba(250, 246, 239, 0.14) 55%, rgba(250, 246, 239, 0) 100%)'
    : 'linear-gradient(180deg, rgba(10, 10, 10, 0.42) 0%, rgba(10, 10, 10, 0.16) 55%, rgba(10, 10, 10, 0) 100%)';

  // The opaque bar. Also the resting state on every page without a hero behind the top.
  const solidBarClass =
    'bg-[#F7F5F1]/95 backdrop-blur-md py-3.5 border-b border-hairline shadow-sm text-[#0A0A0A]';

  // On a light hero the ink type can land on a bright patch of the photograph, so it
  // carries a faint ivory halo — enough to hold the letterforms together over a busy
  // pixel, invisible as a shadow. Absent on a dark hero, where the type is already ivory.
  const typeLift = isTransparentHeader && isLightHero
    ? ' [text-shadow:0_1px_2px_rgba(250,246,239,0.65)]'
    : '';

  // In the scrolled/opaque state ink type needs no shadow; on a dark hero it keeps the drop
  // shadow that separates ivory type from the photograph.
  const navLinkClass =
    'relative py-1 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ' +
    (isTransparentHeader && !isLightHero ? 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.18)] ' : '') +
    typeLift +
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#D6C0A0] after:transition-all after:duration-300 after:content-[''] hover:after:w-full " +
    (!isTransparentHeader
      ? 'text-[#0A0A0A] hover:text-[#241C15]'
      : isLightHero
        ? 'text-[#1A1408] hover:text-[#7A5C24]'
        : 'text-[#FFFDF8]/95 hover:text-[#241C15]');

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isTransparentHeader ? overHeroClass : solidBarClass
      }`}
      style={isTransparentHeader ? { backgroundImage: overHeroScrim } : undefined}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Brand mark. */}
        <Link
          to="/"
          aria-label={navigation.brandAriaLabel}
          className="group flex shrink-0 flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0]"
        >
          <span
            className={`whitespace-nowrap font-display text-[13px] font-medium uppercase tracking-[0.14em] transition-colors sm:text-lg sm:tracking-[0.16em] ${typeLift} ${
              !isTransparentHeader || isLightHero ? 'text-[#0A0A0A]' : 'text-[#FAF8F5]'
            }`}
          >
            {clinic.name}
          </span>
          <span
            className={`whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] transition-colors ${
              !isTransparentHeader ? 'text-gold-text' : isLightHero ? 'text-[#7A5C24]' : 'text-[#E5E0D8]/80'
            }`}
          >
            {clinic.locality}
          </span>
        </Link>

        {/* Desktop navigation — hidden below xl, where the drawer takes over. */}
        <nav className="hidden items-center gap-7 xl:flex xl:gap-8" aria-label="Main">
          {navLinks.map((link) => (
            <Link key={link.name} to={resolveHref(link.href, pathname)} className={navLinkClass}>
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right cluster: phone number, then 28px (gap-7), then the black WhatsApp CTA. */}
        <div className="flex shrink-0 items-center gap-7">
          <a
            href={telHref}
            aria-label={navigation.phoneAriaLabel}
            className={`hidden items-center gap-2 whitespace-nowrap text-[12px] font-medium uppercase tracking-[0.16em] transition-colors hover:text-[#7A5C24] xl:inline-flex ${
              isTransparentHeader && !isLightHero ? 'drop-shadow-[0_1px_3px_rgba(0,0,0,0.18)]' : ''
            }${typeLift} ${!isTransparentHeader || isLightHero ? 'text-[#0A0A0A]' : 'text-[#FAF8F5]/90'}`}
          >
            <Phone className="h-3.5 w-3.5" />
            <span>{clinic.phone}</span>
          </a>

          {/* The WhatsApp button. Stays visible at every width. On the light hero and on
              the opaque bar it is a solid ink button; on a dark hero, outlined ivory. */}
          <a
            href={clientConfig.getWhatsAppUrl(navigation.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={navigation.ctaAriaLabel}
            className={`rounded-xl inline-flex h-11 shrink-0 items-center justify-center gap-2 whitespace-nowrap border px-3 text-[12px] font-medium uppercase tracking-[0.16em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0] sm:h-auto sm:px-4 sm:py-2.5 ${
              !isTransparentHeader || isLightHero
                ? 'border-[#0A0A0A]/80 bg-[#0A0A0A] text-[#FAF8F5] hover:bg-[#D6C0A0] hover:border-[#D6C0A0] hover:text-[#0A0A0A]'
                : 'border-[#FAF8F5]/60 bg-transparent text-[#FAF8F5] hover:border-[#D6C0A0] hover:text-[#D6C0A0] hover:bg-[#FAF8F5]/5'
            }`}
          >
            <WhatsAppIcon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{navigation.ctaLabel}</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={navigation.mobileMenuAriaLabel}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav"
            className={`flex h-11 w-11 items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D6C0A0] xl:hidden ${
              !isTransparentHeader || isLightHero ? 'text-[#0A0A0A]' : 'text-[#FAF8F5]'
            }`}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer. */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav"
          className="animate-drawer-in fixed inset-x-0 top-full flex flex-col gap-5 border-b border-hairline bg-ivory-100 px-6 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-[#0A0A0A] shadow-2xl sm:px-8 xl:hidden"
        >
          <div className="pb-2 text-[12px] font-medium uppercase tracking-[0.16em] text-ink-400">
            {navigation.mobileMenuLabel}
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={resolveHref(link.href, pathname)}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between border-b border-hairline/50 py-1 font-display text-base tracking-[0.16em] transition-colors hover:text-[#C9A876]"
              >
                <span>{link.name}</span>
                <span className="font-display text-xs text-[#C9A876]">→</span>
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 pt-2">
            <a
              href={clientConfig.getWhatsAppUrl(navigation.mobileWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl flex w-full items-center justify-center gap-2.5 bg-[#D6C0A0] py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#0A0A0A]"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#0A0A0A]" />
              <span>{navigation.ctaLabel}</span>
            </a>

            <a
              href={telHref}
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-xl flex w-full items-center justify-center gap-2.5 border border-[#0A0A0A] py-3.5 text-[12px] font-medium uppercase tracking-[0.16em] text-[#0A0A0A]"
            >
              <Phone className="h-4 w-4" />
              <span>{clinic.phone}</span>
            </a>
          </div>

          <div className="pt-2 text-center text-[12px] text-ink-400">{clinic.address}</div>
        </div>
      )}
    </header>
  );
};

export default Header;