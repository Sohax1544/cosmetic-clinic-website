(() => {
  const norm = (s) => (s || '').replace(/\s+/g, ' ').trim();
  const vis = (el) => {
    const r = el.getBoundingClientRect();
    const s = getComputedStyle(el);
    return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && parseFloat(s.opacity) > 0.05;
  };
  const bump = (o, k) => {
    if (!k || k === 'rgba(0, 0, 0, 0)' || k === 'transparent') return;
    o[k] = (o[k] || 0) + 1;
  };
  const top = (o, n) =>
    Object.entries(o).sort((a, b) => b[1] - a[1]).slice(0, n).map(([value, count]) => ({ value, count }));

  const all = Array.from(document.querySelectorAll('body *')).filter(vis);

  const bg = {}, fg = {};
  for (const el of all) {
    const s = getComputedStyle(el);
    bump(bg, s.backgroundColor);
    if (el.children.length === 0 && norm(el.textContent)) bump(fg, s.color);
  }

  const heads = Array.from(document.querySelectorAll('h1,h2,h3,h4')).filter(vis).map((h) => {
    const s = getComputedStyle(h);
    return {
      tag: h.tagName.toLowerCase(),
      text: norm(h.innerText).slice(0, 120),
      font: s.fontFamily.split(',')[0].replace(/["']/g, ''),
      size: s.fontSize, weight: s.fontWeight, lh: s.lineHeight,
      ls: s.letterSpacing, color: s.color, transform: s.textTransform,
    };
  });

  const body = getComputedStyle(document.body);

  const ctas = Array.from(document.querySelectorAll('a,button')).filter(vis)
    .filter((el) => norm(el.innerText)).map((el) => {
      const s = getComputedStyle(el);
      return {
        text: norm(el.innerText).slice(0, 60),
        href: el.getAttribute('href') || null,
        bg: s.backgroundColor, color: s.color, radius: s.borderRadius,
        size: s.fontSize, pad: s.padding, weight: s.fontWeight,
      };
    }).slice(0, 70);

  const roots = document.querySelector('main') || document.body;
  const sections = Array.from(roots.children).filter(vis).map((el) => {
    const s = getComputedStyle(el);
    return {
      tag: el.tagName.toLowerCase(), id: el.id || null,
      cls: (el.className || '').toString().slice(0, 70),
      h: Math.round(el.getBoundingClientRect().height),
      bg: s.backgroundColor,
      text: norm(el.innerText).slice(0, 150),
    };
  });

  const cs = getComputedStyle(document.documentElement);
  const vars = {};
  for (const p of cs) {
    if (p.startsWith('--')) {
      const v = cs.getPropertyValue(p).trim();
      if (v) vars[p] = v.slice(0, 60);
    }
  }

  const fonts = [];
  try { document.fonts.forEach((f) => fonts.push(`${f.family} ${f.weight} ${f.style}`)); } catch (e) {}

  const links = Array.from(document.querySelectorAll('a[href]')).map((a) => a.getAttribute('href'));
  const text = document.body.innerText || '';
  const has = (re) => re.test(text);
  const imgs = Array.from(document.querySelectorAll('img'));

  const sizes = {};
  for (const el of all) {
    if (el.children.length === 0 && norm(el.textContent)) {
      const fs = getComputedStyle(el).fontSize;
      sizes[fs] = (sizes[fs] || 0) + 1;
    }
  }

  return {
    url: location.href,
    title: document.title,
    metaDescription: (document.querySelector('meta[name=description]') || {}).content || null,
    lang: document.documentElement.lang || null,
    viewport: {
      w: innerWidth, h: innerHeight,
      scrollH: document.documentElement.scrollHeight,
      scrollW: document.documentElement.scrollWidth,
    },
    bodyFont: {
      family: body.fontFamily, size: body.fontSize,
      lh: body.lineHeight, color: body.color, bg: body.backgroundColor,
    },
    headings: heads,
    ctaCount: ctas.length,
    ctas,
    palette: { backgrounds: top(bg, 12), textColors: top(fg, 10) },
    fontSizes: top(sizes, 12),
    sections,
    cssVars: vars,
    fonts,
    media: {
      imgs: imgs.length,
      imgNoAlt: imgs.filter((i) => !i.getAttribute('alt')).length,
      lazy: imgs.filter((i) => i.getAttribute('loading') === 'lazy').length,
      videos: document.querySelectorAll('video').length,
      iframes: document.querySelectorAll('iframe').length,
      svgs: document.querySelectorAll('svg').length,
      forms: document.querySelectorAll('form').length,
    },
    contact: {
      tel: links.filter((h) => h.startsWith('tel:')).length,
      whatsapp: links.filter((h) => /wa\.me|whatsapp/i.test(h)).length,
      mailto: links.filter((h) => h.startsWith('mailto:')).length,
      bookish: links.filter((h) => /book|appoint|consult|contact|schedule/i.test(h)).length,
      instagram: links.filter((h) => /instagram/i.test(h)).length,
      maps: links.filter((h) => /maps\.|goo\.gl\/maps/i.test(h)).length,
    },
    trust: {
      reviews: has(/review|rating|testimonial/i),
      google: has(/google/i),
      dha: has(/\bDHA\b|Dubai Health Authority/i),
      award: has(/award|accredit|winner|recognis|recogniz/i),
      years: has(/\b\d{1,2}\+?\s*years/i),
      patients: has(/patients|clients served|happy clients/i),
      beforeAfter: has(/before\s*(&|and)\s*after|before-after/i),
      doctors: has(/dr\.?\s|doctor|consultant|specialist/i),
      pricing: has(/AED|price|from\s*\d|packages?/i),
      languages: has(/arabic|english|russian|farsi|hindi/i),
    },
    socialProofGlyphs: (text.match(/[★⭐]/g) || []).length,
    a11y: {
      ariaLabels: document.querySelectorAll('[aria-label]').length,
      buttonsNoText: Array.from(document.querySelectorAll('button'))
        .filter((b) => !norm(b.innerText) && !b.getAttribute('aria-label')).length,
      imgsNoAlt: imgs.filter((i) => !i.getAttribute('alt')).length,
      h1Count: document.querySelectorAll('h1').length,
    },
  };
})()
