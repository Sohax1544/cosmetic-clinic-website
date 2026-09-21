# cosmeticv3 — Handoff Notes

Working notes for picking this project up cold. Written at the end of a long session that
rebuilt the hero, removed pricing, added imagery across the procedure pages, restructured
the procedure page layout, and recoloured the footer.

---

## 1. What this is

Vite 6 + React 19 + TypeScript 5.7 + Tailwind 3.4, with `framer-motion` and `lucide-react`.
**No router dependency** — there is a small in-house History API router.

**`src/client.config.ts` is the single source of truth** for copy, pricing, navigation,
imagery paths and routing. The standing constraint from the owner: *"make sure that the
config.js routing part remains as is — it makes sure that if I ever want to change anything
in the site it is as simple as plug and play."* Keep changes flowing through that file.

---

## 2. How to run it

```bash
npm run build     # tsc + scripts/check-config.mjs + vite build
npm run check     # config validator on its own
npm run dev       # vite dev server
```

Preview the built output (this is what the audit scripts expect):

```bash
node ./node_modules/vite/bin/vite.js preview --port 4180 --strictPort
```

`vite preview` serves `dist/` **from disk**, so a `npm run build` is picked up without
restarting it. A browser cache can still serve a stale bundle — hard-refresh (`Ctrl+Shift+R`)
if a fix appears not to have landed.

### Audit scripts (`.audit/`)

Node scripts using raw CDP over WebSocket — **no npm dependencies**. All take the base URL
as `argv[2]`.

| Script | Purpose |
|---|---|
| `verify.mjs` | DOM assertions per route (labels, counts, computed colours, contrast) |
| `check-overflow.mjs` | Horizontal overflow + clipped children across 10 widths × 3 routes |
| `capture.mjs` | Writes `.impeccable/review/*.png`, incl. per-section procedure shots |
| `perf.mjs` | LCP, CLS, transferred bytes, document height |
| `shot.mjs`, `shot-at.mjs` | Ad-hoc viewport / scrolled screenshots |

```bash
node .audit/verify.mjs        http://127.0.0.1:4180
node .audit/check-overflow.mjs http://127.0.0.1:4180
node .audit/capture.mjs       http://127.0.0.1:4180
node .audit/perf.mjs          http://127.0.0.1:4180/procedures/rhinoplasty
```

`verify.mjs` is the fastest regression net: it asserts the things that broke during this
session (authoring copy leaking into the UI, raw category ids rendering, black-band count,
gallery tile width, the slider actually existing).

---

## 3. Architecture

- **Router:** `src/lib/router.tsx` — zero-dep History API. `navigate()`, `useLocation()`,
  `matchRoute()`, `resolveHref()`, `<Link to>`, `useDocumentMeta()`, custom `app:navigate` event.
- **Routes:** `/`, `/procedures`, `/procedures/:slug`, everything else → 404.
- **Pages:** `src/pages/{HomePage,ProceduresIndexPage,ProcedurePage,NotFoundPage}.tsx`
- **Config validator:** `scripts/check-config.mjs`, wired into `npm run build`.
- **Procedure data:** `src/data/procedures/{facial,laser,contour,longevity,surgical}.ts`
  — 24 procedures (facial 7, laser 5, contour 4, longevity 4, surgical 4).

### The one rule that keeps biting

Raw category ids (`facial`, `laser`, `surgical`…) must **never** render. Always resolve:

```ts
clientConfig.treatmentsSection.categories.find((c) => c.id === treatment.category)?.label
```

Three separate surfaces had this bug and were fixed. `verify.mjs` asserts an element whose
*entire* text is a bare id never appears.

---

## 4. Config map — where to change what

| Want to change | Where |
|---|---|
| Hero photograph | `hero.image`, `hero.imageAlt`, `hero.imagePosition` |
| The 5 "What happens" phase images | `processPhaseImages[0..4]` (shared across all 24 procedures); override one step with `image` on that step object |
| Procedure card / hero image | procedure's `previewImage` |
| Gallery images | `details.gallery[].src` |
| Real before/after pairs | `details.beforeAfter[].before` / `.after` — real pairs automatically win over the demo |
| SAMPLE demo fallback | `beforeAfterDemo` (see launch blockers) |
| Category labels | `treatmentsSection.categories` |
| Procedure page labels | `procedurePage.*` |
| Footer content | `footer`, `clinic` |
| Nav / routes | `navItems`, and each procedure's `slug` |

An empty image path renders a `TonalPlate` naming the slot — never a broken frame, never
authoring instructions. That was a deliberate fix; see §6.

---

## 5. Design system and measured contrast

**`DESIGN.md` is normative and overrides generic craft-floor preferences** ("the brief wins";
"the committed world overrides anything here"). Do not delete a documented idiom just because
a generic rule dislikes it — that happened once this session and the reviewer conceded the point.

Tokens live in `tailwind.config.js`:

```
ivory  50 #FAF8F5 (elevated)  100 #F7F5F1 (base)  200 #EFECE6 (subtle)  300 #E5E0D8 (deep)  400 #D6CFC3
hairline #E6E2DA
ink    900 #0A0A0A  800 #171717  700 #262626  600 #404040  500 #525252  400 #666666  300 #A3A3A3
gold   light #E0C89E  DEFAULT #C9A876  dark #A6824F  muted #B89660  text #806334
```

### Contrast facts measured this session (do not re-derive)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| Bronze Ink `#806334` | `#F7F5F1` ivory base | ~5.16:1 | passes — this is why it's the label token |
| Bronze Ink `#806334` | `#E5E0D8` Deep Ivory | **4.27:1** | **fails AA at 10px** — use Ink instead |
| Bronze Ink `#806334` | `#2A2622` charcoal | **2.68:1** | **fails** — never use on charcoal |
| Ink Subtle `#666666` (ink-400) | `#E5E0D8` | **4.37:1** | **fails AA at 12px** — use `#525252` |
| Ink Muted `#525252` (ink-500) | `#E5E0D8` | 5.95:1 | passes |
| Ivory `#FAF8F5` | `#2A2622` | 14.17:1 | passes |
| `#A3A3A3` (ink-300) | `#2A2622` | 5.95:1 | passes |
| Bronze `#C9A876` | `#2A2622` | 6.68:1 | passes |

Two consequences baked into the code: `SectionLabel` takes an `onTonal` prop that switches the
label to Ink on the Deep Ivory ground, and the footer cannot use `gold-text` at all.

**`#2A2622` is not a `DESIGN.md` token.** It is used by the hero's tonal gradient and now the
footer ground. Consider promoting it to a token (e.g. `ink-warm`) so the system stays coherent.

---

## 6. What changed in this session

1. **Hero rebuilt.** Deleted a 300-frame canvas image-sequence hero. It is now a single
   photo-ready surface (`hero.image`) with a tonal gradient fallback. Measured on first load:
   **requests 127 → 7, transferred 17,482 KB → 181 KB.** Note LCP was never the problem (the
   LCP element is the headline text); this was a payload and simplicity win.
2. **Pricing removed entirely** — section, nav item, footer link, component, config block.
   Home height 11,359 → 10,346 px.
3. **Visual aid added.** Directory cards and the procedure hero/gallery use a `4/5` portrait
   ratio with `object-top`, matching the supplied photography's own 0.73–0.74 so heads are not
   cropped. A before/after slider runs on every procedure page and in every quick-view dialog.
4. **Procedure page restructured.** Overview moved into the hero with the media stretching via
   `lg:aspect-auto lg:h-full` (so the columns cannot end at different heights). The comparison
   and "What it helps with" now share one **Deep Ivory** chapter, with Suitable-for +
   Downtime/Aftercare stacked in the rail. Gallery is full-width 3-up (tiles 245 → 384 px) and
   the physician card sits beside the FAQs. **Sections 9 → 7, page 5,347 → 5,153 px.**
5. **Process section** got 5 phase image slots (plates until photography arrives).
6. **Footer** moved to warm charcoal `#2A2622` — it was `#FAF8F5` on a `#F7F5F1` page, a
   two-point difference, so it read as more of the page.
7. **Deleted** `src/components/ImagePlaceholder.tsx` (it shipped authoring strings like
   "Add previewImage in client.config.ts" into the rendered UI) and `PricingSection.tsx`.
8. **Added** `TonalPlate.tsx`, `BeforeAfterSlider.tsx`, and the `processPhaseImages` config block.

`BeforeAfterSlider` owns its own gate: `if (!before || !after) return null;` after all hooks,
so it can never emit an empty comparison frame regardless of call site.

---

## 7. Open items and launch blockers

**Blockers — must be resolved before this is public:**

- **`beforeAfterDemo.enabled` is `true`.** While true, every procedure page and every dialog
  leads with a "SAMPLE / NOT A PATIENT RESULT" plate. The owner knowingly kept this on for
  review. Set it to `false`, or supply real consented photography, before launch.
- **DHA regulation of before/after patient imagery is NOT verified.** Dubai regulates aesthetic
  advertising and patient imagery. Confirm with compliance before any real before/after ships.
  Stock imagery on a card is fine; stock imagery *inside* a before/after is deceptive.
- **Placeholders everywhere:** DHA licence `DHA-000000` / `000000`, phone `+971 4 000 0000`,
  WhatsApp `971500000000`, all 6 testimonials, hero stats (`4.9★`, `12+`, `9,000+`), every AED
  price on the procedure pages and cards, and the 3 package prices. All invented by the agent.
- **`diagnosticTicker.backgroundImage`** still points at `honeycomb_012.jpg` — the abstract
  visual language the owner rejected in the hero.

**Wanted, not blocking:**

- **1 clinic photograph for the hero** (`hero.image`).
- **5 phase photographs** for the process section (`processPhaseImages`). Five is enough
  because all 24 procedures share the same five-step arc: assessment → planning and consent →
  treatment → aftercare → review.
- **18 of 24 directory cards have no photograph** — the main reason `/procedures` is 7,740 px
  tall. No ratio change fixes this; only images do.
- **`DESIGN.md` / `PRODUCT.md` are stale.** Both still document the deleted 300-frame hero and
  the old ivory footer. Needs the owner's approval to regenerate — it is their design system of
  record, not a file to rewrite unasked.

**Known, deliberately left alone:**

- **~74 MB of orphaned abstract hero assets** still deploy (`public/assets/cosmeticv3/hero`,
  240 files across 9 folders, plus ~13 MB of video). Unused since the hero rebuild. Deleting
  them is the owner's call.
- **Pre-existing detector warning:** `TreatmentsGrid.tsx:152` `layout-transition`
  (`transition: height`) — the expand-on-hover card interaction. Not introduced this session.
- **Arabic / i18n deliberately not built.** Half-translated medical claims plus DHA risk; needs
  an owner decision.
- **Per-route `<title>` is client-side only**, so link-preview crawlers see the home title. The
  fix is prerendering.
- **Bundle is 593.50 kB (174.57 kB gzip)**, single chunk, no code-splitting.

---

## 8. Traps hit this session — read before debugging

- **`src/client.config.ts` uses CRLF line endings.** Regexes over it need `\r?\n`.
- **Hoisting a JSX condition into a boolean breaks TypeScript narrowing.** After
  `const hasBenefits = ...`, `details.benefits` is possibly undefined; use
  `(details?.benefits ?? []).map(...)`.
- **A JSX comment cannot be the first child of a ternary expression.** `{cond ? (\n {/* x */}\n <div/>)}`
  is a syntax error. Put the comment above the conditional.
- **`capture.mjs`: `scroll-behavior` is smooth in the stylesheet**, so `scrollTo(0, scrollHeight)`
  has not arrived after 700 ms on a tall page. Force `scrollBehavior='auto'` first.
- **`.audit/prof-*` is a live Chrome profile directory** with locked files. Never grep or commit
  it; it breaks `rg` and bloats the repo.
- **Assertions that scan rendered body text for uppercase words give false positives.** A
  process step legitimately contains the word "facial", and "SURGICAL" *is* the surgical label.
  Assert DOM shape (an element whose whole text is a bare id) instead of substring matching.
- **A JSX section guarded by `comparisons.length` will delete adjacent content** when the
  comparison disappears. The comparison section now renders if *either* the comparison or the
  suitable-for list exists — otherwise turning the demo flag off silently removes content.

---

## 9. Verification currently green

```
tsc             clean
config validator OK
vite build      OK
24 procedures, 3 packages, 4 routes including 404
overflow        zero at 10 widths × 3 routes
detector        [] on all changed files
slider          keyboard-operable (aria-valuenow 50 → 74)
```

Run `.audit/verify.mjs` after any layout change — it encodes most of §8.

---

## 10. Repo hygiene (measured — owner's call, deliberately not changed)

- **There is no `.gitignore`.**
- **`node_modules` (8,898 files) and `dist` (568 files) are committed.**
- **`.audit/` was 3.63 GB across 116,206 files; it is now 36.6 MB.** 46 abandoned Chrome profile directories
  (`prof-*`, `chrome-profile-*`) from successive screenshot runs were deleted after confirming that no audit
  Chrome process was running. They are regenerable — every script passes `--user-data-dir`, so Chrome
  recreates the directory on launch, and `verify.mjs` alone makes four (one per route). Never `git add .audit/`;
  stage the scripts by name — only 42.5 KB across 7 files is real tooling.
- **Most of the application was untracked before this session's commit:** the entire router
  (`src/lib/router.tsx`), all four pages, the whole procedure dataset
  (`src/data/procedures/*.ts`), six components, `scripts/` (the config validator), and
  `public/fonts/`. `git clean -fd` would have deleted the site's logic outright. A commit now
  exists to prevent that.
- `git status` still shows ~2,700 modified files, almost all `node_modules` noise. Fixing it
  properly (`git rm -r --cached node_modules dist` plus a `.gitignore`) would make the repo
  readable, but it rewrites what git tracks and was deliberately not done unasked.
- `git config core.autocrlf` is on, so expect "LF will be replaced by CRLF" warnings on add.
  That is benign, and it is why `src/client.config.ts` is CRLF on disk (see §8).

---

## 11. Typography rework (this session) — DONE

**Switzer -> Montserrat display + Switzer body.** The owner asked for the soft, geometric
feel of thenovaclinic.com and shookra.com. Measured from their own stylesheets:

| Site | Faces |
|---|---|
| thenovaclinic.com | **Montserrat** everywhere (Google Fonts, OFL) |
| shookra.com | **Gordita** (display) + **Neue Montreal** (body) - both commercial |

Shookra's two-face structure was chosen: Montserrat for headings, navigation, labels and
UI; Switzer for reading copy (Switzer is metrically close to Neue Montreal and was already
the site's previous family, so the body text stays compact).

`src/styles/fonts.css` is the single swap point:

```css
--font-display: var(--stack-montserrat);   /* headlines, section titles, numerals, nav */
--font-sans:    var(--stack-switzer);      /* reading copy */
```

`--stack-figtree` (closest OFL relative of Gordita) and `--stack-montserrat` are both still
self-hosted, so these are all one-line edits:

- Montserrat + Switzer (current)
- Montserrat everywhere - the exact thenovaclinic.com read; wider, more card titles wrap
- Figtree everywhere - Gordita-leaning, narrower, nothing over-wraps

`tailwind.config.js` exposes `font-display` / `font-sans`; `index.css` maps h1-h6 to the
display stack. Components carrying an explicit `font-sans` were switched to `font-display`
(37 occurrences, 14 files) so the split is real rather than nominal. Paragraphs with no
font class inherit `--font-sans` from `html`, which is why reading copy lands on Switzer
without touching each one.

Tracking: `tracking-tight` is overridden to `-0.015em` in `tailwind.config.js` -
Tailwind's `-0.025em` default was tuned for a neo-grotesque and reads cramped on a
geometric sans. The three arbitrary `tracking-[-0.025em]` / `[-0.02em]` values on page h1s
were matched to it.

`index.html` preloads `/fonts/Montserrat-latin.woff2` (was Switzer - that preload became a
dead 43 KB request after the swap). latin-ext ships but only downloads if a page uses a
glyph outside Latin-1.

**Measured after:** 7 requests, 182 KB transferred, LCP 384 ms, CLS 0 - against
7 requests / 181 KB / LCP 360 ms before. Payload is flat.

`DESIGN.md`'s typography section, token block and one-voice references were corrected.
**The rest of DESIGN.md is still stale** (the deleted 300-frame hero, the old ivory footer)
and still needs the owner's approval.

## 12. Colour and visuals (this session) — DIRECTION DECIDED AND SHIPPED

The owner picked **B + C**: colour-coded duotone course visuals, plus the Courses chapter
as the page's one deep colour field. Diagnosis, measured from the two reference
stylesheets:

**Our neutrals were already shookra's neutrals.** ivory-200 `#EFECE6` vs their
`--color-paper-2: #eeece6`; hairline `#E6E2DA` vs `--color-line: #e3e1da`; ink-800
`#171717` vs `--color-ink: #131210`. The palette family was never the problem.

**The difference was the accent system.** We had exactly one accent; shookra ships seven
(`gold #e9b44c`, `sage #848b79`, `terracotta #c68a5e`, `rose #e8958a`, `plum #9e8aa6`,
`green #8fd9a8`, `cyan #6fd9e7`) and a much brighter gold. Nova is the opposite case - 45
uses of one butter-cream `#eee6c1` - its softness is type and photography, not palette.

### What shipped

1. **`forest` palette** in `tailwind.config.js`: `#1D4034` (DEFAULT), `#16302A` (deep),
   `#C7CFC6` (muted body copy on the field).
2. **`PackagesSection` rebuilt** as the one full-bleed colour chapter — forest ground,
   darker top edge so it separates from the DiagnosticTicker above it, one warm highlight
   so the field is not flat, ivory type, gold-light links and eyebrow.
3. **`TonalPlate` gained a duotone mode** (`from` / `to` props). Neutral mode is unchanged.
4. **`clientConfig.packages.items[].visual`** — per-course `{ label, from, to }`, typed by
   the new `CourseVisual` / `CoursePackage` interfaces. Deleting a `visual` falls back to
   the neutral plate, so the section composes without it. `npm run check` still reports
   "packages: 3 items".

Ramps: laser `#3F4E5E -> #8FA3B8`, resurfacing `#8E6630 -> #D9B37A`, facial
`#96482F -> #E5B9A3`.

### Contrast, measured (do not re-derive)

On the forest ground `#1D4034`: ivory `#FAF8F5` **10.79**, forest-muted `#C7CFC6` **7.18**,
pale bronze `#E0C89E` **7.04**, bronze `#C9A876` **5.09**, ink on the bronze CTA **8.81**.
**Bronze Ink `#806334` is 2.04 here and must never be used on this ground.**

The plate ramps are only **1.78-2.59** as a bare ground for white text. `TonalPlate`'s
duotone mode therefore bakes in a caption scrim (`rgba(0,0,0,0.5)` over the bottom half),
which brings the same labels to **5.3-7.0**. That scrim is what makes the component safe to
reuse for real course photography later - do not remove it when swapping the ramp for an
image.

### Bug found and fixed during this work

`TonalPlate`'s duotone branch initially kept the neutral branch's `h-full`. Inside a
stretched grid column a percentage height resolves against the card, which defeated the
caller's `aspect-[3/2]` and let the plates fill the entire card. The duotone branch now
sets `w-full` only; the aspect ratio is the caller's.

### DESIGN.md amended (deliberately, not silently)

DESIGN.md previously said "Don't use saturated or neon color blocks; the accent is a
thread, not a surface" - which this change breaks. Amended with two new named rules:

- **The One Field Rule** — at most one chapter per page may carry the Deep Forest ground.
- **The Plate Hue Rule** — saturated hue is permitted inside media plates and nowhere
  else. Never in type, borders, buttons, or flat fills. Captions on a plate always carry
  a scrim.

Plus the `forest` / `Course Hues` tokens, a forest-aware Hairline Rule, and one Do.

### Verification

`tsc` clean, config validator OK, `verify.mjs` green (packages section present, 3 cards,
section order intact), `check-overflow.mjs` **zero at 10 widths x 3 routes**, `perf.mjs`
CLS 0. Home height 10,415 -> 10,628 px.

### Still open

- The duotone plates are **placeholders**. Real course photography should replace the
  ramps; keep `TonalPlate`'s scrim when it does.
- Only the Courses chapter uses the field. The Method section and the procedure pages are
  the obvious next candidates if the owner wants more than one — but **The One Field Rule**
  says one per page, so a second would mean choosing which one.
---

## 13. Hero rebuild (this session) — DONE

The owner supplied the photograph (`Hero.jpe`), the exact copy, and the element order:
eyebrow -> headline -> body -> CTA -> secondary -> "Jumeirah · Dubai" lower in the proof row.

### What shipped

- **`Hero.jpe` staged** as `public/images/hero/clinic-hero.jpg` (1920x1080, 156 KB, 16:9).
  The `.jpe` original is still in the repo root; it is not referenced by the build.
- **Copy** in `clientConfig.hero`: headline is now a pure brand statement
  ("Aesthetic care," / "beautifully considered.") and no longer carries the location.
  Location moved to the eyebrow (DUBAI) and the proof row.
- **Proof row** renders each item as "value · label", which is what produces the
  requested "Jumeirah · Dubai" as the third item.
- **Full bleed**: `object-cover` on an absolutely positioned image, so the photograph
  reaches all four edges at any aspect ratio. Narrow viewports crop to roughly the
  middle quarter of the width, which on this photograph is the treatment bed.
- **`clientConfig.hero.tone`** added. The header reads it to pick its overlay treatment
  (see the bug below).
- **Subheadline rendering bug fixed.** The old code did `subheadline.split('. ')` then
  appended a period to the first part, which assumed a two-sentence string. The new
  copy is one sentence, so it would have rendered "…physicians..". It now splits on the
  sentence boundary and only appends a period when one is missing.

### The photograph forced the design decision

Measured before writing any markup: mean luminance **0.65**, **0.69-0.75** across the
area the text occupies, peaking at **0.99**. Ivory type needs a scrim of roughly 83%
black to clear AA on that — which would have buried the room the owner asked to feature.
So the hero is **light**: ink type over an ivory veil.

The veil is also shaped to the layout, not just the image. On a phone the text wraps to
the full width of the frame, where a left-weighted ramp protects nothing — `proof label
#2` measured **1.17:1** there. Narrow viewports therefore get a bottom-anchored block and
a veil that rises from the foot of the frame.

### Two bugs found by measuring rather than looking

1. **The header was wrong on every route.** Its overlay state was keyed only on scroll,
   never on route, so every ivory page (procedures index, procedure pages, 404) also got
   `from-black/90` with ivory type — a dark band with light text over a light page. It now
   derives from `hero.tone`, which fixes those routes as a side effect.

2. **The standard accent token does not survive a photograph.** Bronze Ink (#806334) is
   AA on ivory, but a veil lands the ground near 0.80 where ivory is 0.90, so it measured
   **3.47:1** on the eyebrow and **2.98:1** on a proof value. The hero now uses a deeper
   bronze (#6E5429) for accent type and #525252 for proof labels. Recorded in DESIGN.md as
   **The Photograph Type Rule**.

### New tooling: `.audit/hero-contrast.mjs`

Reads each hero element's real computed colour, size and weight, hides all hero text,
screenshots, then decodes that PNG back inside the page and samples the true background
inside each element's bounding box. Runs at 1440x1000 and 390x844 and exits non-zero on
any AA failure.

It took three iterations to trust: per-element hiding missed nodes (the scroll hint is a
direct child of the section, not of the content wrapper), leaving glyph pixels to be read
as background — which reports the text colour as its own ground and silently hides real
failures. It now hides every text leaf under the hero and asserts that none remain
painted, and it judges on the 5th percentile rather than the single darkest pixel while
still printing the worst pixel and its coordinates. Opaque-filled buttons are measured
against their own fill, not the photograph.

**Current state: 16/16 elements pass at desktop, 15/15 at mobile.** Re-run it after any
change to the hero, the photograph, or the scrim.

`.audit/shot-at.mjs` now accepts `@WxH` (e.g. `#hero@390x844`) so it can capture phone
viewports.

### Verification

`tsc` clean, config OK, `check-overflow.mjs` zero at 10 widths x 3 routes, `verify.mjs`
green (packages 3, section order intact, no leaked authoring copy, black bands = 1).
`perf.mjs`: LCP **424 ms**, CLS **0.0003**, 9 requests, **340 KB** — up from 183 KB, which
is the 156 KB photograph. Document height unchanged at 10,628 px.

### Open

- The hero image is **not preloaded**. Adding `<link rel="preload" as="image">` to
  `index.html` would pull LCP down slightly, but it hardcodes the path and breaks the
  "set `hero.image` and you are done" contract. LCP is already 424 ms, so this was left
  alone deliberately.
- `Hero.jpe` in the repo root can be deleted once the photograph is final.
---

## 14. Removing the Colour Chapter, Readability Pass, Hero Veil, Card Rest State

Four changes, all owner-directed off the back of one review.

### 1. The forest chapter and its shader are gone

`PackagesSection` carried the page's one full-bleed colour chapter (Deep Forest
`#1D4034`), and for one revision an animated **"Aurora" WebGL1 field** behind it,
exported from the 21st.dev Shader Builder. Both removed.

The shader was real, reviewed, and working: `src/lib/auroraField.ts` held the GLSL
verbatim with the packed-uniform layout, and `src/components/ShaderField.tsx` mounted it
with a `devicePixelRatio` cap of 1, `resolutionScale` 0.5 (it costs five `shade()` taps
per pixel — ~240 hash evaluations — so full resolution is not viable at any frame rate),
a 30fps ceiling, `IntersectionObserver` + `visibilitychange` pausing, a single static
frame under `prefers-reduced-motion`, and a silent fallback to the flat ground if WebGL
was unavailable or the context was lost. It measured clean too — worst-case text
contrast **5.45:1** across twelve sampled frames, against 4.5:1 required.

It was still wrong for the site. A saturated animated ground in an otherwise warm, light
page reads as a foreign object, and the motion competed with the photography rather than
supporting it. **Deleted**, not disabled: both files, the `field` block in
`clientConfig.packages`, and the `forest` palette in `tailwind.config.js`. Recoverable
from git history if a page ever wants it, but do not re-add it to this one.

`PackagesSection` is ivory again and **keeps its duotone plates** — the colour it
contributes lives inside the course visuals, not in the ground.

### 2. The muted end of the ink scale was failing AA

Everything below `ink-700` was too light on warm ivory. The worst offender was
`ink-300` at `#A3A3A3` — **2.27:1**, an outright failure used as "placeholder" text.

Rather than nudge one value, the whole muted end was pushed down together so the
quietest text still clears AA with room:

| token | was | now | on `#F7F5F1` |
|---|---|---|---|
| `ink-600` | `#404040` | `#383838` | 10.6:1 |
| `ink-500` | `#525252` | `#454545` | 8.7:1 |
| `ink-400` | `#666666` | `#555555` | 6.7:1 |
| `ink-300` | `#A3A3A3` | `#6E6E6E` | 4.6:1 |

Also: 22 hardcoded `text-[#525252]` / `text-[#666666]` / `text-[#A3A3A3]` call sites were
replaced with `text-ink-*` tokens so the palette actually governs them — the rule is only
worth having if call sites cannot bypass it. Eyebrows went `text-[#0A0A0A]/70` → `/85`
(7.07:1 → 12.4:1), and the light-on-dark tints in `Header`, `DiagnosticTicker` and the
testimonials came up to `/80`–`/95`.

### 3. Hero veil softened, accent type deepened to pay for it

The veil was blinding the photograph. Lowering it alone broke AA in eight places — the
hero's bronze accent is dark, so it needs a *bright* ground, and a lighter veil lets dark
patches of the room through.

Fix was to darken the type instead of re-thickening the veil: accent type moved from
`#6E5429` to `#4A3719` (new `gold.onPhoto` token), proof labels to `ink-600`, and the
proof middot off `/60` opacity onto solid. That bought a veil cut from **0.90 → 0.74**
at the left edge (and 0.96 → 0.90 on mobile) with contrast still passing. Both viewports
green on `.audit/hero-contrast.mjs`.

### 4. Procedure cards: lighter scrim, two lines at rest

The card was carrying a scrim peaking at **0.62** ink and three stacked text blocks over
the photograph. Now:

- The description moved out of the resting card and into the **hover panel**. At rest the
  card shows the one-liner and the procedure name only, bottom-anchored.
- The scrim is a shorter, softer ramp — `0.52 → 0.34 → 0` by 44% instead of `0.62 → 0`.
- The kicker went from bronze `#C9A876` to warm near-white `#FBF4E8`. Bronze measured
  **2.19:1** over the brightest card (HydraFacial, backlit window) — a genuine failure
  the eye does not catch, because it is the *brightest* card that breaks it.

### New audit: `.audit/section-contrast.mjs`

`node .audit/section-contrast.mjs <packages|treatments> [url]`. Generalises the
hero-contrast method to any section. Three bugs found while building it, each of which
produced a confident false result:

1. Masking by "hide leaf elements" misses text nodes that sit beside an icon (a link is
   `<a>text + svg</a>`, so the `<a>` has element children and its text was never hidden).
   The sampler then read glyph pixels as ground and reported **1.00** for text that
   passes. Mask with `color` + `-webkit-text-fill-color` over the whole section.
2. Verify the mask in a **separate pass after a delay** — the filter pills carry
   `transition-all`, so `color` animates to transparent instead of snapping, and checking
   in the same tick reads the starting colour.
3. Measure the union of an element's **text rects intersected with every clipping
   ancestor**, not its border box. The card's hover panel is `height: 0` + `overflow:
   hidden` rather than unmounted, and the carousel mounts all eight pages with the
   inactive ones translated off-screen — 24 card titles all reported plausible rects.

Final: `#packages` **ALL PASS** (worst 5.14, links), `#treatments` **ALL PASS** (worst
4.72, the same HydraFacial kicker), `#hero` **ALL PASS** both viewports.

### Verification

`tsc` clean, `Config OK`, `packages: 3 items`, overflow zero at 10 widths x 3 routes,
`verify.mjs` green (packages 3, section order intact, leaked authoring copy 0, black
bands 1). `perf.mjs`: LCP **404 ms**, CLS **0.0003**, 9 requests, **184 KB** — the shader
chunk is gone. Document height unchanged at 10,628 px.

### Open

- **The blandness question is not closed.** Removing the colour chapter answers "not
  that", not "what instead". See DESIGN.md, **The Distributed Colour Rule**: the current
  answer is media-led (plates, photography, warmer crops) rather than ground-led. If more
  presence is wanted, the honest candidates are more/better imagery in the ivory
  chapters, or a warmer page ground — not another colour block.