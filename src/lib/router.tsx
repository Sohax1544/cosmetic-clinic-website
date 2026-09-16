import React, { useEffect, useState, useCallback } from 'react';

/**
 * Zero-dependency History API router.
 *
 * Design goals:
 * - No runtime dependency, so the config-driven plug-and-play architecture is untouched.
 * - Real paths (/procedures/rhinoplasty) that are shareable, indexable and usable as ad
 *   landing pages, unlike the previous hash-anchor-only navigation.
 * - Any element can navigate; <Link> is a convenience, not a requirement.
 *
 * Host requirement: because routes are real paths, the host must rewrite unknown paths to
 * /index.html. See vercel.json (rewrites) and public/_redirects (Netlify). Vite's dev server
 * already provides this fallback.
 */

const NAV_EVENT = 'app:navigate';

export interface Location {
  pathname: string;
  hash: string;
}

function currentLocation(): Location {
  return {
    pathname: window.location.pathname.replace(/\/+$/, '') || '/',
    hash: window.location.hash,
  };
}

/** Programmatic navigation. Mirrors history.pushState but notifies React subscribers. */
export function navigate(to: string, options: { replace?: boolean } = {}): void {
  const samePath = to.split('#')[0] === window.location.pathname;

  if (options.replace) {
    window.history.replaceState({}, '', to);
  } else {
    window.history.pushState({}, '', to);
  }

  window.dispatchEvent(new Event(NAV_EVENT));

  // A hash target on the current path should scroll, not reload the route.
  if (!samePath) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
  scrollToHash(to);
}

function scrollToHash(to: string): void {
  const hash = to.includes('#') ? to.slice(to.indexOf('#')) : '';
  if (!hash || hash === '#') return;
  const el = document.querySelector(hash);
  if (el) {
    // Wait for the routed view to mount before measuring.
    window.setTimeout(() => {
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 60);
  }
}

/** Subscribe to route changes (pushState, replaceState, back/forward). */
export function useLocation(): Location {
  const [loc, setLoc] = useState<Location>(currentLocation);

  useEffect(() => {
    const update = () => setLoc(currentLocation());
    window.addEventListener('popstate', update);
    window.addEventListener(NAV_EVENT, update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener(NAV_EVENT, update);
    };
  }, []);

  return loc;
}

/** Match a pathname against a pattern like "/procedures/:slug". */
export function matchRoute(
  pattern: string,
  pathname: string,
): Record<string, string> | null {
  const p = pattern.split('/').filter(Boolean);
  const a = pathname.split('/').filter(Boolean);
  if (p.length !== a.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < p.length; i++) {
    if (p[i].startsWith(':')) {
      params[p[i].slice(1)] = decodeURIComponent(a[i]);
    } else if (p[i] !== a[i]) {
      return null;
    }
  }
  return params;
}

/** True when the click should be handled by the router rather than the browser. */
function isPlainLeftClick(e: React.MouseEvent<HTMLAnchorElement>): boolean {
  return (
    e.button === 0 &&
    !e.metaKey &&
    !e.ctrlKey &&
    !e.shiftKey &&
    !e.altKey &&
    (!e.currentTarget.target || e.currentTarget.target === '_self')
  );
}

/**
 * Resolve a config-supplied href into a router-usable target.
 * Bare hash anchors ("#team") refer to the home page, so from any other route they
 * become "/#team" instead of silently doing nothing.
 */
export function resolveHref(href: string, pathname: string): string {
  if (!href) return '/';
  if (href.startsWith('#')) return pathname === '/' ? href : `/${href}`;
  return href;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  replace?: boolean;
}

export const Link: React.FC<LinkProps> = ({ to, replace, onClick, children, ...rest }) => {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || !isPlainLeftClick(e)) return;
      e.preventDefault();
      navigate(to, { replace });
    },
    [to, replace, onClick],
  );

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};

/**
 * Set document title and meta description per route.
 * The previous build shipped one static index.html for every URL, so procedure pages
 * could never rank for their own name.
 */
export function useDocumentMeta(title: string, description?: string): void {
  useEffect(() => {
    document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);
}