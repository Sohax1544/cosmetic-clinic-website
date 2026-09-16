# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, in order of importance to this build:

1. **The buyer (client of the demo):** owners and decision-makers of private aesthetic-medicine and cosmetic clinics who are being pitched a website. The demo exists to sell them a similar site.
2. **The end visitor the site persuades:** high-spending, discerning individuals seeking discreet, doctor-led, premium aesthetic and longevity care. The site is designed to attract and convert this audience for the purchasing clinic.

## Product Purpose

A premium, configuration-driven aesthetic-clinic marketing website. Its immediate job is to be a **demo shown during client pitches** to sell a similar website to clinic owners. Every clinic-specific detail is a swappable placeholder, so the same site can be re-skinned and sold to a different clinic without redesign effort.

## Positioning

Premium "invisible artistry": doctor-led, scientific, discreet aesthetic medicine and cellular longevity — understated luxury rather than conspicuous alteration. The durable mechanism a nearby template cannot copy is the combination of a cinematic premium treatment with a config-driven architecture in which brand, name, procedures, palette, doctors, testimonials, and assets all swap from a single source of truth.

## Operating Context

- Used by the seller live during pitches to prospective clinic clients.
- End visitors are prospective high-value patients, primarily in/around London (Harley Street setting in current config).
- Primary conversion action is booking a private consultation via a WhatsApp concierge.
- All durable content lives in `src/client.config.ts` so any client can be swapped without touching component code.

## Capabilities and Constraints

- Single-page React marketing site (React 19 + Vite + TypeScript + Tailwind + framer-motion).
- Sections: image-sequence hero (honeycomb ↔ amber alternation), manifesto stats, 3-step clinical method (Measure / Intervene / Extend), treatments grid, diagnostic marquee ticker, team grid, vertically auto-scrolling testimonial marquee, FAQ, closing CTA, consultation modal, floating WhatsApp quick action.
- **Procedure Detail Dialog (confirmed):** a treatment card carrying an optional per-protocol `details` object opens a rich two-pane modal (sticky quick-facts rail + scrollable detail pane) with overview, suitability checklist, gallery, benefits, process, downtime/aftercare, practitioner note, FAQs, and a draggable before/after comparison slider. Cards without `details` omit the affordance entirely.
- **Testimonial marquee (confirmed):** testimonials scroll vertically in responsive 1/2/3 columns at per-column speeds, pausing on hover/focus.
- **Motion & overlay behavior (confirmed):** animations honor `prefers-reduced-motion` (marquee falls back to a static list, the dialog drops transforms); overlays render via portal, trap focus, lock body scroll, restore focus on close, and dismiss on Escape / backdrop-click / close-button.
- **Constraint (confirmed):** all clinic-specific content is placeholder and must remain swappable client-to-client; nothing client-specific may be hardcoded in a way that breaks re-skinning.
- Existing naming discrepancy is a placeholder artifact (`client.config.ts` uses "Maison Été Clinique"; `index.html` title uses "Aura & Artisan") and is not authoritative truth.

## Brand Commitments

- None binding to a real brand; the clinic name is a placeholder demo (config value, not authority).
- Confirmed theme: **premium**, understated luxury, intended to attract high-spending individuals.
- The visual world is defined by the code and its config theme tokens; it is recording-eligible via `/impeccable document` and is not fixed by this record.

## Evidence on Hand

- `src/client.config.ts` — full placeholder content: clinic metadata, theme tokens, hero clips, manifesto, method, treatments (including the optional `details` object per protocol), team, testimonials (with marquee column/speed config), FAQs, CTA.
- `public/assets/cosmeticv3/hero/*` and `public/assets/vids/*` — hero frame sequences and looping videos (honeycomb, amber, blue1, blue2, white bubbles).
- `public/fonts/*` — self-hosted variable webfonts.
- `public/images/procedures/*` and `public/images/method-steps/*` — treatment and method imagery.
- **Absences that must not be fabricated:** all testimonials, patient-success stats, clinical claims, prices, GMC numbers, doctor qualifications, and accreditations are placeholders for the demo; they are not real and must never be presented as verified facts.

## Product Principles

- **Config is the contract.** One source of truth holds all client-swappable specifics; re-skinning a client means editing content, not architecture.
- **Premium before loud.** The site earns trust with restraint, discretion, and clinical authority — never with conspicuous or trend-driven excess.
- **Persuade both audiences.** It must convince a clinic owner it is a winning template while convincing a high-value visitor it is a world-class clinic.
- **Preserve the completed, running whole.** The incumbent single-page experience is coherent and working; work extends or re-worlds it without regressing what functions.

## Accessibility & Inclusion

Target **WCAG 2.1 AA** — contrast, focus management, keyboard operation, and motion. `prefers-reduced-motion` is honored throughout; interactive overlays trap focus and are dismissible by keyboard.
