---
name: Maison Été Clinique
description: Quiet editorial luxury for a config-driven premium aesthetic-clinic site.
colors:
  ivory-base: "#F7F5F1"
  ivory-elevated: "#FAF8F5"
  ivory-subtle: "#EFECE6"
  ivory-deep: "#E5E0D8"
  ivory-line: "#D6CFC3"
  hairline: "#E6E2DA"
  ink: "#0A0A0A"
  ink-soft: "#262626"
  ink-muted: "#383838"
  ink-quiet: "#454545"
  ink-subtle: "#555555"
  ink-faint: "#6E6E6E"
  warm-charcoal: "#2A2622"
  champagne: "#D6C0A0"
  bronze: "#C9A876"
  bronze-hover: "#B89660"
  bronze-light: "#E0C89E"
  bronze-deep: "#A6824F"
  bronze-text: "#806334"
  bronze-on-photo: "#4A3719"
  course-laser: "#3F4E5E -> #8FA3B8"
  course-resurfacing: "#8E6630 -> #D9B37A"
  course-facial: "#96482F -> #E5B9A3"
typography:
  display:
    fontFamily: "var(--font-display) / var(--font-sans)"
    fontWeight: 200
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "var(--font-display) / var(--font-sans)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "var(--font-display) / var(--font-sans)"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "var(--font-display) / var(--font-sans)"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "var(--font-display) / var(--font-sans)"
    fontWeight: 500
    letterSpacing: "0.1em"
rounded:
  none: "0px"
  md: "6px"
  lg: "8px"
  xl: "12px"
  2xl: "16px"
  3xl: "24px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.bronze}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.bronze-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "14px 28px"
    typography: "{typography.label}"
  button-secondary-hover:
    textColor: "{colors.bronze-deep}"
  chip-filter:
    backgroundColor: "{colors.ivory-elevated}"
    textColor: "{colors.ink-subtle}"
    rounded: "{rounded.full}"
    padding: "8px 16px"
    typography: "{typography.label}"
  chip-filter-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.ivory-elevated}"
  chip-badge:
    backgroundColor: "{colors.ivory-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
    typography: "{typography.label}"
  card:
    backgroundColor: "{colors.ivory-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: "32px"
  input:
    backgroundColor: "{colors.ivory-elevated}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: "12px 16px"
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.label}"
---

# Design System: Maison Été Clinique

<!-- Extracted from the incumbent implementation (Tailwind config, client.config.ts theme, index.css, components). Tokens above are normative; prose explains application. -->

## Overview

**Creative North Star: "The Invisible Atelier"**

This system practices restraint the way a good surgeon practices touch: the result should be felt, never seen. It is an atelier, not a shop window — ivory paper, near-black ink, and a single muted bronze used sparingly, as if it cost something to apply. Nothing competes with the content, and nothing announces the interface. Hierarchy is carried almost entirely by typography, whitespace, and hairline rules.

The atmosphere is quiet editorial luxury. Surfaces are warm ivory rather than clinical white; type pairs a geometric display face with a neutral grotesque for reading copy instead of forcing one family to do both jobs; colour beyond ivory, ink and bronze is spent in exactly one place — the hue inside a media plate — which is what keeps the page from reading as one uninterrupted monochrome sheet. Photography is the one place high contrast is allowed, always behind a scrim tuned to that photograph's own brightness so text stays legible. Density is generous and airy on landing sections, tightening only inside functional overlays such as the Procedure Detail Dialog, where the same palette is applied to a two-pane reading surface.

Depth and motion stay subordinate to calm. Surfaces sit flat with 1px hairline borders; shadow appears only as a response to state (hover) or for true overlays (modals, drawers). Motion is short, eased, and differential — cinematic only in the hero's slow image drift, restrained everywhere else — and always yields to `prefers-reduced-motion`.

**Key Characteristics:**
- Warm ivory ground with near-black ink; one rationed bronze accent.
- A single typeface (Montserrat) carrying display, headline, body, and label roles.
- Flat-by-default surfaces defined by hairlines, not shadows.
- Architectural, mostly-sharp corners; full radius reserved for pills, chips, and avatars.
- Cinematic imagery always behind a scrim that matches its brightness — a darkening scrim on a dark photograph, an ivory veil on a bright one; the UI itself stays quiet.

## Colors

A warm ivory-to-ink neutral field carrying one accent — a muted bronze that behaves like a metallic thread, not a highlight — and one source of saturated colour: duotone media plates.

There is deliberately no colour chapter. An earlier pass gave the Multi-Session Courses section the page's one deep-ground field, briefly with an animated shader behind it. Both were removed: a saturated ground in an otherwise warm, light site read as a foreign object, and the motion competed with the photography instead of supporting it. The remaining question — how the page avoids feeling bland without a colour block — is answered in **The Distributed Colour Rule** below, not with a second ground.

### Primary
- **Champagne** (#D6C0A0): The CTA fill, and the value behind the `gold` token's DEFAULT. Every primary button in the site rests here — including the hero CTAs, which previously sat a shade lighter than everything else. It deepens to **Aged Bronze** (#B89660) on hover; its light tint is **Pale Bronze** (#E0C89E); its deepest reading is **Dark Bronze** (#A6824F).
- **Muted Antique Bronze** (#C9A876): The line-and-glyph colour. Icons, ticks, star fills, accent hairline borders, hover borders and the footer tagline stay bronze while the fills moved to champagne — champagne on ivory measures ~1.5:1, so it can carry a large fill but not a glyph or a hairline. Label-weight accent text settles at **Bronze Ink** (#806334) for AA legibility on ivory.
- **The Two Accent Values Are Not Interchangeable.** Champagne is a *fill* token; bronze is a *mark* token. Reaching for champagne on a line, a glyph, or body-size type is the failure mode this split exists to prevent.
- **Course Hues**: three duotone ramps carried only by course and category *media* — `laser` #3F4E5E→#8FA3B8, `resurfacing` #8E6630→#D9B37A, `facial` #96482F→#E5B9A3. They are decoration: they appear inside a plate and never in type, borders, buttons, or flat UI fills. They are declared per item in `clientConfig.packages[].visual`, so a course without a colour identity simply falls back to the neutral plate.

### Neutral
- **Warm Ivory** (#F7F5F1): The page ground. Every section defaults here.
- **Elevated Ivory** (#FAF8F5): Raised surfaces — cards, chips, fields, modal panels.
- **Soft Ivory** (#EFECE6): Quiet inset panels and callout boxes, and the neutral media plate.
- **Deep Ivory** (#E5E0D8): Light-on-dark body text and divider tints.
- **Ivory Line** (#D6CFC3): Scrollbar thumb and stronger dividers.
- **Hairline** (#E6E2DA): The structural border used on nearly every card, chip, and divider. **Note:** this is the real border token project-wide; Tailwind's `ivory.300` (#E5E0D8) is a near-duplicate whose consolidation belongs to a consistency pass.
- **Ink** (#0A0A0A): Primary text and dark section grounds. All body copy uses this value.
- **Warm Charcoal** (#2A2622): The footer ground, and the colour of every heading on a light ground. Headings were moved off pure ink deliberately while body copy stayed at #0A0A0A — the split is the point, not an oversight. Headings over photography or on a dark band stay ivory.
- **Ink Soft** (#262626): Long-form quote and editorial text.
- **Ink Muted** (#383838): Body copy in light sections. 10.6:1 on ivory.
- **Ink Quiet** (#454545): Secondary copy — summaries, notes, list items. 8.7:1.
- **Ink Subtle** (#555555): Metadata, captions, eyebrow labels. 6.7:1.
- **Ink Faint** (#6E6E6E): Placeholder and disabled floor. 4.6:1 — still AA. The token this replaced (#A3A3A3) measured 2.3:1 and failed outright, which is why the whole muted end of the scale was pushed down together rather than one value at a time.

### Named Rules
**The Rationed Bronze Rule.** The accent occupies ≤10% of any given screen. Its scarcity is the luxury signal; the moment bronze becomes a large fill, the system reads cheap.

**The Readable Copy Rule.** Quiet is a hierarchy, not an excuse. Every token in the ink scale clears AA on warm ivory on its own, so no text anywhere depends on being large, bold, or lucky to be legible. When a new muted tone is wanted, it goes into the scale at a measured value — the scale is the only place the muted end is defined, which is why call sites use `text-ink-*` and never a raw hex. Contrast is verified per section by `.audit/section-contrast.mjs`, which reads each text element against the pixels actually behind it.

**The Distributed Colour Rule.** Colour reaches the page through media, not through ground. The site carries no full-bleed colour chapter and no colour-blocked section; saturated hue lives in the duotone plates, in photography, and in the single bronze thread. Where the page risks reading bland, the fix is more or better image — a plate, a photograph, a warmer crop — not a coloured rectangle behind the copy. A colour field is a legitimate tool, but it has to be the thing the page is *about*; bolted onto one chapter it reads as a foreign object, which is exactly what the forest chapter did.

**The Resting Card Rule.** A card at rest carries its name and one line of context, and nothing else. Everything the card can say beyond that lives in its hover or expanded state. Three stacked text blocks over a photograph force a heavy scrim, and the scrim — not the content — becomes what the card looks like. Fewer lines let the photograph stay a photograph.

**The Plate Hue Rule.** Saturated hue is permitted inside media plates, and nowhere else. A course or category may own a duotone ramp there — never in type, borders, buttons, or flat fills. Any caption placed on a plate carries a scrim, because the ramps measure only 1.78–2.59:1 as a bare ground for white text; with the scrim the same labels read 5.3–7.0:1.

**The Lit Hero Rule.** A photograph behind type takes the scrim its own brightness demands, and the hero declares its tone in `clientConfig.hero.tone` so the header can follow. A bright photograph gets ink type over an ivory veil and the header floats in ink on a soft ivory gradient; a dark photograph gets ivory type over a darkening scrim. Never the reverse, and never assume: ivory type needs a scrim heavy enough to bury a bright room, which wastes the photograph, while ivory type over a bright photograph without one is simply unreadable. The veil is also shaped to the layout, not to the image — where type runs the full width of a narrow screen, a left-weighted ramp protects nothing, so the block moves to the foot of the frame and the veil rises from the bottom. Keep the veil no stronger than the type needs: the hero's veil was softened from 0.90 to 0.74 once accent type moved to a deeper bronze, which buys back most of the photograph.

**The Photograph Type Rule.** Accent type over a photograph does not inherit the ivory-ground tokens. The standard Bronze Ink (#806334) measures 3.5:1 over a veiled photograph rather than the 4.5:1 that 12px and 16px type needs, because a veil lands the ground near 0.80 where ivory itself is 0.90. Hero accent type therefore drops to a deeper bronze (#4A3719) and its secondary labels to Ink Muted. The same rule applies to kickers over card scrims: bronze at 11px measured 2.19:1 on the brightest procedure card, so card kickers use a warm near-white (#FBF4E8). Measure with `.audit/hero-contrast.mjs` and `.audit/section-contrast.mjs`, which read every text element against the pixels actually behind it — appearance is not evidence where a photograph is involved.

**The Hairline Rule.** Structure is expressed with 1px borders (#E6E2DA, or rgba(201,168,118,0.25) for accent containment). Never with fills, and never with shadows at rest.

## Typography

**Display Font:** Montserrat (self-hosted variable webfont, SIL Open Font Licence; fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Switzer (self-hosted variable webfont; fallback `ui-sans-serif, system-ui, sans-serif`)
**Label:** Montserrat, uppercase and tracked

**Character:** Montserrat carries display and labels, Switzer carries reading text. Montserrat is chosen for the soft, open, circular forms the reference clinics in this market set in — in place of the cooler neo-grotesque the system shipped with — but its geometric roundness works against it at paragraph lengths, which is what Switzer is for: a neutral grotesque with a taller x-height that holds up at 14–16px. There is no serif and no italic in the system; expression comes from extreme weight ranges (200–500), lightly negative tracking on large headlines, and wide uppercase tracking on small labels. Both stacks resolve through the CSS variables in `src/styles/fonts.css`, which is the single swap point.

### Hierarchy
- **Display** (200, `text-5xl`–`text-8xl` responsive, line-height 1): Oversized stat/number callouts only (e.g. "99.4%", "12,000+"). The lightest weight at the largest size is the signature contrast.
- **Headline** (400, `text-3xl`–`text-7xl` responsive, line-height 1.08, letter-spacing −0.015em): Hero and section titles. Lightly tightened — a geometric sans has generous natural sidebearings, so the old −0.025em read cramped.
- **Title** (400, `text-base`–`text-2xl`, line-height 1.375): Card titles, procedure names, modal headings.
- **Body** (400, `text-sm`–`text-lg`, line-height 1.625): Paragraphs and descriptions; kept near 65–75ch in reading contexts (the Procedure Detail Dialog caps its pane so lines stay comfortable).
- **Label** (500, `text-[10px]`–`text-sm`, letter-spacing 0.1em, uppercase): Eyebrows, nav links, CTA labels, badges, chip text. Wordmarks use a slightly wider 0.16em.

### Named Rules
**The One Voice Rule.** A single family across every surface. Hierarchy is achieved with weight, size, and tracking — never by introducing a second typeface.

**The Tracked Label Rule.** Small text is uppercase and tracked (≥0.1em); reading text is never uppercased and never tracked. The two modes never blend.

## Layout

A centered `max-w-7xl` (1280px) content column with responsive gutters (`px-6` → `px-8` → `px-12`) runs the whole page. Sections are vertically generous — `py-24` on mobile rising to `py-32` on desktop — separated by 1px hairline borders rather than color blocks, so the page reads as one continuous sheet of ivory paper.

Two layout habits recur: **centered section headers** (hairline dash + tracked label + headline + muted subhead, measured to `max-w-2xl`) introduce full-width content below; and **left-aligned editorial blocks** (`max-w-3xl`/`max-w-2xl`) anchor hero, manifesto, and closing copy flush left with the grid. Cards sit in responsive 1/2/3-column grids (`gap-8`). Functional overlays break the centered measure deliberately: the Procedure Detail Dialog uses a fixed ~320px rail plus a ~672px reading pane inside a 1000px shell.

## Elevation & Depth

Flat by default. Resting surfaces are defined by hairline borders on ivory, with no shadow; depth is tonal (ivory-base → ivory-elevated → soft ivory) rather than cast. Shadow is reserved for two jobs: confirming interaction (hover lift on interactive cards) and lifting true overlays (modals, mobile drawers) above the page. The hero and dark sections invert this — depth there comes from scrims over imagery, not from box-shadow.

### Shadow Vocabulary
- **State lift** (`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): Interactive cards on hover.
- **Bronze glow** (`0 8px 30px rgba(201,168,118,0.25)`): Primary CTA on hover — a warm, low-opacity bloom tied to the accent.
- **Overlay** (`0 25px 50px -12px rgba(0,0,0,0.25)`): Modals, mobile drawer, dropdown panels.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only in response to state or to lift an overlay; a resting box-shadow is a defect.

## Shapes

Architectural and mostly square. The system leans on tight corners and 1px hairlines for structure, reserving large radii for genuinely rounded objects. One button language now covers every CTA: **all CTAs use a 12px radius** (rounded-xl). Hero CTAs were previously the sole exception, set fully sharp as an editorial accent; that exception is retired, so the hero no longer reads as a separate button language from the sections. Chips, filter pills, marquee handles, star rows, and avatars use full radius; cards use 16px (rounded-2xl); the mobile bottom-sheet caps at 24px on its top corners. Borders are always 1px; accent borders drop to rgba(201,168,118,0.25) so bronze never draws a hard line.

### Named Rules
**The Architectural Corner Rule.** Corners stay tight and deliberate. Full radius is reserved for pills, chips, and circular objects — never for large surfaces.

## Components

### Buttons
- **Shape:** Every CTA `rounded-xl` (12px), hero included — the former sharp hero exception is retired; icon buttons roughly square with an 8px radius.
- **Primary:** Muted Antique Bronze fill, Ink text, uppercase tracked label (~14px 28px padding). On hover the fill deepens to Aged Bronze and a **bronze glow** shadow appears.
- **Secondary / Ghost:** Transparent with a 1px hairline border and Ink text; hover shifts border and text toward bronze and adds a faint ivory wash.
- **Nav / inline actions:** Text-only, uppercase, tracked; hover reveals a thin bronze underline that grows left-to-right.

### Chips
- **Badge:** Elevated Ivory fill, 1px hairline, ~6px radius, uppercase 10px tracked label. Used for category and metadata.
- **Filter (selected):** Ink fill with Elevated Ivory text, full radius. Unselected is transparent with Ink Subtle text, hovering to a soft ivory fill.

### Cards / Containers
- **Corner Style:** 16px (rounded-2xl).
- **Background:** Elevated Ivory (light) or full-bleed imagery under a tone-matched scrim (treatment cards).
- **Border:** 1px hairline, shifting to bronze on hover.
- **Shadow:** None at rest; **state lift** on hover.
- **Internal Padding:** ~24px mobile, ~32px desktop.

### Inputs / Fields
- **Style:** Elevated Ivory fill, 1px hairline stroke, 12px radius, muted Ink text, ~12px 16px padding.
- **Focus:** Border shifts to bronze; no glow. Placeholder uses Ink Faint.
- **Disabled / placeholder:** Ink Faint text; borders stay hairline.

### Navigation
- **Style:** Fixed, transparent over the hero and resolving to a translucent ivory bar with a hairline bottom border once scrolled. Over the hero its type follows `clientConfig.hero.tone` — Ink over a soft ivory gradient on a bright photograph, ivory over a darkening scrim on a dark one — and resolves to Ink on the ivory bar in every case. Links are uppercase and tracked. Mobile opens a full-width ivory drawer with hairline-separated rows.

### Signature Components
- **Stat Callout:** Oversized Display-weight numerals (200) in Ink with a tracked bronze label beneath — the system's most expressive typographic moment.
- **Procedure Detail Dialog:** Two-pane overlay (sticky rail + scrollable reading pane) with a draggable before/after comparison slider; hairline-separated sections and a pinned bronze CTA.
- **Testimonial Marquee:** Vertically auto-scrolling columns (1/2/3 responsive) at per-column speeds, fenced by a top/bottom fade mask, pausing on hover/focus.

## Do's and Don'ts

### Do:
- **Do** keep the bronze accent to a minority of any screen and let hairline gold borders (rgba(201,168,118,0.25)) contain it.
- **Do** put course and category hue inside its media plate rather than in the type, and let the plates carry the saturation the ground does not.
- **Do** lead with an ivory ground and near-black ink; express hierarchy through weight, size, and tracking across the Montserrat/Switzer pair.
- **Do** use 1px hairline borders (#E6E2DA) for structure and reserve shadow for hover states and overlays only.
- **Do** track and uppercase small labels (≥0.1em) and leave body copy untracked, sentence case, at relaxed line-height.
- **Do** keep motion short and eased, and honor `prefers-reduced-motion` on every animation.
- **Do** let a card at rest show its name and one line only; give the rest to the hover state.

### Don't:
- **Don't** introduce glassmorphism, bloom, neon, or loud multi-stop gradients — bronze stays muted and metallic, never shiny.
- **Don't** use saturated or neon color blocks, colour chapters, or animated shader backgrounds as a general habit. Hue is a thread in the type and a plate in the media, never a ground.
- **Don't** apply heavy drop shadows to resting surfaces.
- **Don't** introduce playful or blobby geometry; corners stay tight and architectural.
- **Don't** reach for a display weight or size to rescue text that is failing contrast — fix the token.
