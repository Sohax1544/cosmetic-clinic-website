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
  ink-muted: "#525252"
  ink-subtle: "#666666"
  ink-faint: "#A3A3A3"
  bronze: "#C9A876"
  bronze-hover: "#B89660"
  bronze-light: "#E0C89E"
  bronze-deep: "#A6824F"
  bronze-text: "#806334"
typography:
  display:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 200
    lineHeight: 1
    letterSpacing: "normal"
  headline:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.375
  body:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Switzer, ui-sans-serif, system-ui, sans-serif"
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

The atmosphere is quiet editorial luxury. Surfaces are warm ivory rather than clinical white; type is a single grotesque worked through weight and tracking instead of a second display face; photography is the one place high contrast is allowed, always behind a dark scrim so text stays legible. Density is generous and airy on landing sections, tightening only inside functional overlays such as the Procedure Detail Dialog, where the same palette is applied to a two-pane reading surface.

Depth and motion stay subordinate to calm. Surfaces sit flat with 1px hairline borders; shadow appears only as a response to state (hover) or for true overlays (modals, drawers). Motion is short, eased, and differential — cinematic only in the hero's image-sequence, restrained everywhere else — and always yields to `prefers-reduced-motion`.

**Key Characteristics:**
- Warm ivory ground with near-black ink; one rationed bronze accent.
- A single typeface (Switzer) carrying display, headline, body, and label roles.
- Flat-by-default surfaces defined by hairlines, not shadows.
- Architectural, mostly-sharp corners; full radius reserved for pills, chips, and avatars.
- Cinematic imagery always behind a darkening scrim; the UI itself stays quiet.

## Colors

A warm ivory-to-ink neutral field carrying exactly one accent: a muted bronze that behaves like a metallic thread, not a highlight.

### Primary
- **Muted Antique Bronze** (#C9A876): The single accent. Used for CTA fills, the eyebrow label, active states, star fills, and accent hairline borders. Its hover deepens to **Aged Bronze** (#B89660); its light tint is **Pale Bronze** (#E0C89E); its deepest reading is **Dark Bronze** (#A6824F). Label-weight accent text settles at **Bronze Ink** (#806334) for AA legibility on ivory.

### Neutral
- **Warm Ivory** (#F7F5F1): The page ground. Every section defaults here.
- **Elevated Ivory** (#FAF8F5): Raised surfaces — cards, chips, fields, modal panels.
- **Soft Ivory** (#EFECE6): Quiet inset panels and callout boxes.
- **Deep Ivory** (#E5E0D8): Light-on-dark body text and divider tints.
- **Ivory Line** (#D6CFC3): Scrollbar thumb and stronger dividers.
- **Hairline** (#E6E2DA): The structural border used on nearly every card, chip, and divider. **Note:** this is the real border token project-wide; Tailwind's `ivory.300` (#E5E0D8) is a near-duplicate whose consolidation belongs to a consistency pass.
- **Ink** (#0A0A0A): Primary text and dark section grounds.
- **Ink Soft** (#262626): Long-form quote and editorial text.
- **Ink Muted** (#525252): Body copy in light sections.
- **Ink Subtle** (#666666): Secondary metadata and captions (AA on ivory).
- **Ink Faint** (#A3A3A3): Placeholders and disabled text.

### Named Rules
**The Rationed Bronze Rule.** The accent occupies ≤10% of any given screen. Its scarcity is the luxury signal; the moment bronze becomes a large fill, the system reads cheap.

**The Hairline Rule.** Structure is expressed with 1px borders (#E6E2DA, or rgba(201,168,118,0.25) for accent containment). Never with fills, and never with shadows at rest.

## Typography

**Display Font:** Switzer (self-hosted variable webfont; fallback `ui-sans-serif, system-ui, sans-serif`)
**Body Font:** Switzer (same family)
**Label:** Switzer, uppercase and tracked

**Character:** One grotesque does everything. There is no serif and no italic in the system; expression comes from extreme weight ranges (200–500), tight negative tracking on large headlines, and wide uppercase tracking on small labels. The effect is precise and unhurried rather than ornamental.

### Hierarchy
- **Display** (200, `text-5xl`–`text-8xl` responsive, line-height 1): Oversized stat/number callouts only (e.g. "99.4%", "12,000+"). The lightest weight at the largest size is the signature contrast.
- **Headline** (400, `text-3xl`–`text-7xl` responsive, line-height 1.08, letter-spacing −0.025em): Hero and section titles. Tightened so large type still reads as a single statement.
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

Flat by default. Resting surfaces are defined by hairline borders on ivory, with no shadow; depth is tonal (ivory-base → ivory-elevated → soft ivory) rather than cast. Shadow is reserved for two jobs: confirming interaction (hover lift on interactive cards) and lifting true overlays (modals, mobile drawers) above the page. The hero and dark sections invert this — depth there comes from darkening scrims over imagery, not from box-shadow.

### Shadow Vocabulary
- **State lift** (`0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): Interactive cards on hover.
- **Bronze glow** (`0 8px 30px rgba(201,168,118,0.25)`): Primary CTA on hover — a warm, low-opacity bloom tied to the accent.
- **Overlay** (`0 25px 50px -12px rgba(0,0,0,0.25)`): Modals, mobile drawer, dropdown panels.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only in response to state or to lift an overlay; a resting box-shadow is a defect.

## Shapes

Architectural and mostly square. The system leans on tight corners and 1px hairlines for structure, reserving large radii for genuinely rounded objects. Two button languages coexist by context: **section CTAs use a 12px radius** (rounded-xl), while the **hero CTAs are fully sharp** (rounded-none) — an intentional editorial accent, not drift. Chips, filter pills, marquee handles, star rows, and avatars use full radius; cards use 16px (rounded-2xl); the mobile bottom-sheet caps at 24px on its top corners. Borders are always 1px; accent borders drop to rgba(201,168,118,0.25) so bronze never draws a hard line.

### Named Rules
**The Architectural Corner Rule.** Corners stay tight and deliberate. Full radius is reserved for pills, chips, and circular objects — never for large surfaces.

## Components

### Buttons
- **Shape:** Section CTAs `rounded-xl` (12px); hero CTAs sharp (`0px`); icon buttons roughly square with an 8px radius.
- **Primary:** Muted Antique Bronze fill, Ink text, uppercase tracked label (~14px 28px padding). On hover the fill deepens to Aged Bronze and a **bronze glow** shadow appears.
- **Secondary / Ghost:** Transparent with a 1px hairline border and Ink text; hover shifts border and text toward bronze and adds a faint ivory wash.
- **Nav / inline actions:** Text-only, uppercase, tracked; hover reveals a thin bronze underline that grows left-to-right.

### Chips
- **Badge:** Elevated Ivory fill, 1px hairline, ~6px radius, uppercase 10px tracked label. Used for category and metadata.
- **Filter (selected):** Ink fill with Elevated Ivory text, full radius. Unselected is transparent with Ink Subtle text, hovering to a soft ivory fill.

### Cards / Containers
- **Corner Style:** 16px (rounded-2xl).
- **Background:** Elevated Ivory (light) or full-bleed imagery under a dark scrim (treatment cards).
- **Border:** 1px hairline, shifting to bronze on hover.
- **Shadow:** None at rest; **state lift** on hover.
- **Internal Padding:** ~24px mobile, ~32px desktop.

### Inputs / Fields
- **Style:** Elevated Ivory fill, 1px hairline stroke, 12px radius, muted Ink text, ~12px 16px padding.
- **Focus:** Border shifts to bronze; no glow. Placeholder uses Ink Faint.
- **Disabled / placeholder:** Ink Faint text; borders stay hairline.

### Navigation
- **Style:** Fixed, transparent over the hero and resolving to a translucent ivory bar with a hairline bottom border once scrolled. Links are uppercase, tracked, Ink or ivory depending on scroll state. Mobile opens a full-width ivory drawer with hairline-separated rows.

### Signature Components
- **Stat Callout:** Oversized Display-weight numerals (200) in Ink with a tracked bronze label beneath — the system's most expressive typographic moment.
- **Procedure Detail Dialog:** Two-pane overlay (sticky rail + scrollable reading pane) with a draggable before/after comparison slider; hairline-separated sections and a pinned bronze CTA.
- **Testimonial Marquee:** Vertically auto-scrolling columns (1/2/3 responsive) at per-column speeds, fenced by a top/bottom fade mask, pausing on hover/focus.

## Do's and Don'ts

### Do:
- **Do** keep the bronze accent to a minority of any screen and let hairline gold borders (rgba(201,168,118,0.25)) contain it.
- **Do** lead with an ivory ground and near-black ink; express hierarchy through weight, size, and tracking on the single Switzer family.
- **Do** use 1px hairline borders (#E6E2DA) for structure and reserve shadow for hover states and overlays only.
- **Do** track and uppercase small labels (≥0.1em) and leave body copy untracked, sentence case, at relaxed line-height.
- **Do** keep motion short and eased, and honor `prefers-reduced-motion` on every animation.

### Don't:
- **Don't** introduce glassmorphism, bloom, neon, or loud multi-stop gradients — bronze stays muted and metallic, never shiny.
- **Don't** use saturated or neon color blocks; the accent is a thread, not a surface.
- **Don't** apply heavy drop shadows to resting surfaces.
- **Don't** introduce playful or blobby geometry; corners stay tight and architectural.
