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
