# Slide Decks · HTML slide production spec

Making slides is a high-frequency design task. This document explains how to make great HTML slides — from architecture choice to per-slide design, to the full PDF/PPTX export path.

**This skill's coverage**:
- **HTML demo (the foundational deliverable, always default)** → each slide an independent HTML file + `assets/deck_index.html` aggregator, browser keyboard navigation, full-screen presentation
- HTML → PDF export → `scripts/export_deck_pdf.mjs` / `scripts/export_deck_stage_pdf.mjs`
- HTML → editable PPTX export → `references/editable-pptx.md` + `scripts/html2pptx.js` + `scripts/export_deck_pptx.mjs` (requires HTML to be written following 4 hard constraints)

> **⚠️ HTML is the foundation, PDF/PPTX are derivatives.** Whatever the final delivery format, you **must** first build the HTML aggregated demo (`index.html` + `slides/*.html`) — it is the "source" of the slide deck. PDF/PPTX are one-line exports from HTML.
>
> **Why HTML first**:
> - Best for live presentation (projector / screen share — full-screen directly, keyboard navigation, no Keynote/PPT software dependency)
> - During development, each slide can be opened with double-click for verification — no need to re-run export
> - The only upstream of PDF/PPTX export (avoid the "found something to fix in HTML after exporting and need to re-export" loop)
> - Deliverable can be "HTML + PDF" or "HTML + PPTX" double set — recipient picks what they prefer

---

## 🛑 Confirm the delivery format before starting (the hardest checkpoint)

**This decision precedes "single-file vs multi-file".** Field-tested: **not confirming the delivery format before starting = 2–3 hours of rework.**

### Decision tree (HTML-first architecture)

All deliverables start from the same HTML aggregation page (`index.html` + `slides/*.html`). The delivery format only decides the **HTML writing constraints** and the **export command**:

```
[Always default · must do] HTML aggregated demo (index.html + slides/*.html)
   │
   ├── Only browser presentation / local HTML archive  → done here, max HTML visual freedom
   │
   ├── Also need PDF (print / share / archive)         → run export_deck_pdf.mjs once
   │                                                       HTML writing free, no visual constraint
   │
   └── Also need editable PPTX (colleague will edit text) → from line 1 of HTML, follow 4 hard constraints
                                                              run export_deck_pptx.mjs once
                                                              sacrifice gradients / web components / complex SVG
```

### Opening script (copy-paste)

> No matter the final delivery — HTML, PDF, or PPTX — I'll first build a browser-switchable HTML aggregated version (`index.html` plus keyboard navigation). This is the always-default foundational deliverable. On top of that I'll ask whether you also want PDF / PPTX snapshots.
>
> Which export format do you need?
> - **HTML only** (presentation/archive) → fully free visually
> - **Also PDF** → same as above plus one export command
> - **Also editable PPTX** (colleague will edit text in PPT) → I must follow the 4 hard constraints from line 1 of HTML, sacrificing some visual capability (no gradients, no web components, no complex SVG).

### Why "PPTX = follow the 4 hard constraints from the start"

The prerequisite for editable PPTX is that `html2pptx.js` can translate the DOM into PowerPoint objects element-by-element. It needs **4 hard constraints**:

1. body fixed at 960pt × 540pt (matches `LAYOUT_WIDE`, 13.333″ × 7.5″, not 1920×1080px)
2. All text must be wrapped in `<p>` / `<h1>`–`<h6>` (no bare text in div, no `<span>` for primary text)
3. `<p>` / `<h*>` cannot have background/border/shadow on themselves (put it on outer div)
4. `<div>` cannot use `background-image` (use `<img>` tag)
5. No CSS gradients, no web components, no complex SVG decorations

The default HTML in this skill has high visual freedom — lots of spans, nested flex, complex SVG, web components (`<deck-stage>`), CSS gradients — **almost none of which naturally pass html2pptx constraints** (measured: visual-driven HTML directly through html2pptx, pass rate < 30%).

### Two real path costs (field-tested pitfalls)

| Path | Approach | Result | Cost |
|---|---|---|---|
| ❌ **Write HTML freely, patch PPTX afterward** | Single-file deck-stage + lots of SVG/span decoration | For editable PPTX only two routes left:<br>A. Hand-write hundreds of pptxgenjs lines hardcoding coordinates<br>B. Rewrite 17 pages of HTML into Path A format | 2–3 hours rework, plus the hand-written version has **perpetual maintenance cost** (HTML changes one word, PPTX needs manual sync again) |
| ✅ **Follow Path A constraints from step 1** | Each slide independent HTML + 4 hard constraints + 960×540pt | One command exports 100% editable PPTX, also full-screen browser presentation (Path A HTML is standard browser-playable HTML) | Spend 5 extra minutes when writing HTML thinking "how to wrap text in `<p>`" — zero rework |

### What if delivery is mixed

User says "I want HTML presentation **and** editable PPTX" — **this isn't mixed**, it's PPTX requirement covering HTML requirement. Path A HTML can browser-present full-screen by itself (just add a `deck_index.html` aggregator). **No extra cost.**

User says "I want PPTX **and** animation / web component" — **this is a real conflict**. Tell the user: editable PPTX means sacrificing those visual capabilities. Make them choose; don't secretly do hand-written pptxgenjs (becomes perpetual maintenance debt).

### What if you find out about PPTX after the fact (emergency rescue)

Rare case: HTML is already written and then they say they want PPTX. Recommended **fallback flow** (full explanation in `references/editable-pptx.md` "Fallback · already have visual draft but user insists on editable PPTX"):

1. **First choice: produce PDF** (visuals 100% preserved, cross-platform, recipient can view and print) — if recipient's actual need is "presentation/archive", PDF is the best deliverable
2. **Second choice: AI rewrites an editable HTML using the visual draft as blueprint** → export editable PPTX — preserve color/layout/copy design decisions, sacrifice gradients, web components, complex SVG
3. **Not recommended: hand-write pptxgenjs reconstruction** — position, font, alignment all hand-tuned; high maintenance cost; future HTML one-word changes need manual sync again

Always tell the user the choices, let them decide. **Never reflexively start hand-writing pptxgenjs** — that is the last resort.

---

## 🛑 Before bulk production · build a 2-page showcase to set the grammar

**For decks ≥ 5 pages, never write from page 1 straight to the last page.** Field-validated correct sequence:

1. Pick **2 page types with the largest visual difference** for showcase (e.g. "cover" + "emotion/quote page", or "cover" + "product showcase page")
2. Screenshot and let the user confirm the grammar (masthead / fonts / color / spacing / structure / bilingual proportion)
3. Once direction is approved, batch-produce the remaining N-2 pages, each reusing the established grammar
4. Once all done, compose the HTML aggregation + PDF / PPTX derivatives together

**Why**: writing 13 pages straight through → user says "wrong direction" = 13 pages of rework. Doing 2-page showcase first → wrong direction = 2 pages of rework. Once visual grammar is set, the decision space for subsequent N pages narrows dramatically — only "how to put content in" remains.

**Showcase page selection principle**: pick the two pages with the most different visual structure. If those two pass = all middle states will pass.

| Deck type | Recommended showcase combo |
|---|---|
| B2B brochure / product launch | Cover + content page (concept/emotion) |
| Brand launch | Cover + product feature page |
| Data report | Big data page + analysis conclusion page |
| Tutorial materials | Chapter cover + specific concept page |

---

## 📐 Publication grammar template (field-reusable)

Suitable for B2B brochure / product launch / long report decks. Reusing this structure per page = 13 pages of fully consistent visuals, 0 rework.

### Per-page skeleton

```
┌─ masthead (top strip + horizontal line) ────────────┐
│  [logo 22-28px] · A Product Brochure         Issue · Date · URL │
├──────────────────────────────────────────┤
│                                          │
│  ── kicker (color short bar + uppercase tag)  │
│  CHAPTER XX · SECTION NAME                 │
│                                          │
│  H1 (Serif heavy, e.g. Playfair 900)      │
│  Highlight word singled out in brand color │
│                                          │
│  English subtitle (Lora italic)            │
│  ─────────── divider ──────────            │
│                                          │
│  [content: 60/40 two-column / 2x2 grid / list] │
│                                          │
├──────────────────────────────────────────┤
│ section name                     XX / total │
└──────────────────────────────────────────┘
```

### Style conventions (copy directly)

- **H1**: Serif 900, font-size 80–140px depending on info weight; key word singled out in brand color (don't pile color throughout)
- **English subtitle**: Lora italic 26–46px; brand signature words bold + accent italic
- **Body text**: Serif 17–21px, line-height 1.75–1.85
- **Accent highlight**: in body text use brand color bold for keywords; ≤ 3 per page (more = anchor effect lost)
- **Background**: warm off-white #FAFAFA + very subtle radial-gradient noise (`rgba(33,33,33,0.015)`) for paper feel

### Visual lead must vary

13 pages of "text + one screenshot" each is too monotonous. **Rotate the visual lead type per page**:

| Visual type | Suitable section |
|---|---|
| Cover layout (giant text + masthead + pillar) | Cover / chapter cover |
| Single character portrait (oversized single object) | Introducing a single concept/role |
| Multi-character group / avatar cards in a row | Team / user cases |
| Timeline progression cards | Showing "long-term relationship" or "evolution" |
| Knowledge graph / connection node diagram | Showing "collaboration" or "flow" |
| Before/After comparison cards + middle arrow | Showing "change" or "difference" |
| Product UI screenshot + outlined device frame | Specific feature display |
| Big-quote (half-page giant text) | Emotion page / problem page / quote page |
| Real avatar + quote card (2×2 or 1×4) | User testimonials / use scenes |
| Big-text closing + URL pill button | CTA / closing |

---

## ⚠️ Common pitfalls (field summary)

### 1. Emojis don't render under Chromium / Playwright export

Chromium doesn't ship color emoji fonts by default; `page.pdf()` or `page.screenshot()` makes emoji show as empty boxes.

**Counter**: use Unicode glyphs (`✦` `✓` `✕` `→` `·` `—`) as substitutes, or just go to text ("Email · 23" instead of "📧 23 emails").

### 2. `export_deck_pdf.mjs` errors with `Cannot find package 'playwright'`

Cause: ESM module resolution looks upward from the script's location for `node_modules`. The script is in `~/.skills/vinex22-design/scripts/`; no deps there.

**Counter**: copy the script into the deck project directory (e.g. `brochure/build-pdf.mjs`), run `npm install playwright pdf-lib` at the project root, then `node build-pdf.mjs --slides slides --out output/deck.pdf`.

### 3. Google Fonts not loaded before screenshot → Chinese/extended chars show as system default

Before Playwright screenshot/PDF, at least `wait-for-timeout=3500` to let webfonts download and paint. Or self-host fonts under `shared/fonts/` to reduce network dependency.

### 4. Information density imbalance · content page over-stuffed

A philosophy page first version used 2×2 = 4 sections + 3 mantras at the bottom = 7 chunks of content — cramped and repetitive. Changed to 1×3 = 3 sections — breathing room returned immediately.

**Counter**: per page, control to "1 core info + 3–4 supporting points + 1 visual lead". Beyond that, split to a new page. **Less is more** — audience spends 10s per page; giving them 1 memory point is easier to remember than 4.

---

## � Mistakes I keep making (read this before building)

These are real bugs that bit me on the *lumen-deck* test build (May 2026). Each one cost a re-render. Each one is preventable if you read this section first.

### 5. Vertical-height budget is NOT 1080px — it's ~720px

This is the #1 cause of "footer eats the bottom row" overflow. For a 1920×1080 fixed canvas:

```
1080
−   32  slide padding-top (var(--slide-pad))
−   80  masthead height (.masthead)
−   60  gap between masthead and content area
=  908
−   60  gap between content and footer
−   60  footer height (.footer)
−   32  slide padding-bottom
= ~696  ← THIS is your real content height budget
```

**Always sketch this budget BEFORE writing slide-scoped CSS.** If your KPI stack has 4 rows and each row is 200px, that's 800px — already overflowing before margins. Either drop to 3 rows or shrink to 160px.

**Counter**: at the top of each slide's `<style>` block, write a comment with the budget you're working against:
```css
/* Budget: 696px content. Have 4 KPI rows × 160px + 3 dividers × 1.5px = 644.5px ✓ */
```

### 6. Decorative open-quote glyphs collide with the row above them

Treatment like `font-size: 240px; line-height: 0.4; transform: translateX(-12px)` for a `&ldquo;` will visually overlap whatever sits above (typically the kicker row), because the glyph's *visual* bounding box ignores `line-height`.

**Counter**: either (a) reserve a top margin equal to roughly **half the glyph font-size**, or (b) absolutely-position the glyph with explicit `top` / `left` so the layout knows to leave room. Never assume `line-height: 0.X` clips the visual.

### 7. Building all N slides before rendering ANY → bug compounds N times

I built 8 slides in a row, then rendered them all at once, then found the same height-budget bug repeated across 3 of them. Cost = fix 3 slides instead of catching it on slide 1 and applying the lesson to slides 2–8.

**Counter — render-as-you-go rule**:
- After **each new layout pattern** (cover, problem-quote, solution-2col, product-frame, data-anchor, line-chart, full-bleed-quote, team-grid, ask-hybrid, thank-you), run `verify.py` ONCE before applying that pattern elsewhere
- Pass 2a (the 2-page showcase) is the *grammar* contract; Pass 2b should still verify after every new layout, not at the end

### 8. Windows PowerShell mangles `verify.py` Unicode output

`verify.py` prints `✓ → 📸` characters; PowerShell's default encoding is **cp1252** which crashes the script with `UnicodeEncodeError: 'charmap' codec can't encode character '\u2192'`.

**Counter — always set this BEFORE running `verify.py` on Windows**:
```powershell
$env:PYTHONIOENCODING = 'utf-8'
python scripts/verify.py slides/01-cover.html --viewports 1920x1080
```

For long sessions, add it to your shell profile. (A future skill update should patch `verify.py` to force `sys.stdout.reconfigure(encoding='utf-8')`.)

### 9. `pip install playwright` is blocked in some workspaces

If `pip install` is gated by tool policy, use VS Code's `install_python_packages` tool **after** `configure_python_environment` has set up the venv. Don't try `pip install` first and hit the wall.

### 10. Installing the playwright Python package does NOT install Chromium

These are two separate steps. After `pip install playwright` (or `install_python_packages`), you ALSO need:

```powershell
<venv>/python.exe -m playwright install chromium
```

Without this, `verify.py` fails with `Executable doesn't exist at .../chrome.exe` ~200MB download. If you're hitting "browser not found" errors, this is why.

### 11. Self-check checklist for EVERY new slide before declaring it done

Before moving to the next slide, eyeball the screenshot for these specific failure modes — they're the ones I keep missing:

- [ ] **Footer-eaten?** Does any content (esp. last row of a stack/grid) sit below y=1020? If yes → height budget violated, see #5.
- [ ] **Masthead-eaten?** Does the kicker / first headline overlap the masthead's bottom rule? If yes → padding-top on content area too small.
- [ ] **Glyph collision?** Any oversized italic open-quote, anchor numeral with currency lift, or wordmark dot — does its visual extent overlap a sibling? See #6.
- [ ] **Pagination 1-indexed?** Is it `01 / 10`, NOT `00 / 09` or `1/10`?
- [ ] **Body type ≥ 24px?** Default `--type-body` is 26px; if you overrode it for a tight cell, did you stay ≥ 24px?
- [ ] **One signal moment?** Exactly one red moment per slide — a dot, an italic word, or one bar. Two reds = the eye doesn't know where to look.
- [ ] **No fact-fabrication?** Any specific number, customer name, or claim that wasn't fact-checked → wrap in `<mark>NEEDS REAL SOURCE</mark>`. Don't ship invented stats.

---

## �🛑 Decide architecture first · single file or multi-file?

**This choice is step 1. Wrong choice = repeated pitfalls. Read this section before doing anything.**

### Two architectures compared

| Dimension | Single file + `deck_stage.js` | **Multi file + `deck_index.html` aggregator** |
|---|---|---|
| Code structure | One HTML, all slides as `<section>` | Each slide independent HTML, `index.html` aggregates with iframes |
| CSS scope | ❌ Global; one slide's style may affect all | ✅ Naturally isolated; iframes each their own world |
| Verification granularity | ❌ Need JS goTo to switch to a slide | ✅ Single-page file double-clicks to view in browser |
| Parallel dev | ❌ One file; multi-agent edits collide | ✅ Multi-agent can work different pages in parallel; zero conflict merge |
| Debug difficulty | ❌ One CSS error breaks the whole deck | ✅ One page error only affects itself |
| Embedded interaction | ✅ Cross-page shared state is easy | 🟡 Iframes need postMessage |
| Print PDF | ✅ Built-in | ✅ Aggregator beforeprint walks iframes |
| Keyboard nav | ✅ Built-in | ✅ Aggregator built-in |

### Which one (decision tree)

```
│ Q: how many pages is the deck planned to have?
├── ≤10 pages, needs in-deck animation or cross-page interaction, pitch deck → Single file
└── ≥10 pages, academic talk, course materials, long deck, multi-agent parallel → Multi file (recommended)
```

**Default to multi-file path**. It's not "alternate" — it's the **main path for long decks and team collaboration**. Why: every advantage of single-file (keyboard navigation, print, scale) multi-file also has — and multi-file's scope isolation and verifiability cannot be regained by single-file.

### Why this rule is so hard (real incident record)

The single-file architecture has hit four pitfalls in real deck production:

1. **CSS specificity overrides**: `.emotion-slide { display: grid }` (specificity 10) overrode `deck-stage > section { display: none }` (specificity 2), causing all pages to render on top of each other.
2. **Shadow DOM slot rules suppressed by outer CSS**: `::slotted(section) { display: none }` couldn't block outer rule overrides; sections refused to hide.
3. **localStorage + hash navigation race**: after refresh, instead of jumping to the hash position, it stopped at the localStorage-recorded old position.
4. **High verification cost**: had to `page.evaluate(d => d.goTo(n))` to screenshot a slide — twice as slow as direct `goto(file://.../slides/05-X.html)`, plus frequent errors.

Root cause is the **single global namespace** — multi-file architecture eliminates these problems at the physical level.

---

## Path A (default) · multi-file architecture

### Directory structure

```
my-deck/
├── index.html              # Copied from assets/deck_index.html, modify MANIFEST
├── shared/
│   ├── tokens.css          # Shared design tokens (palette/font sizes/common chrome)
│   └── fonts.html          # <link> Google Fonts (each page includes)
└── slides/
    ├── 01-cover.html       # Each file is a complete 1920×1080 HTML
    ├── 02-agenda.html
    ├── 03-problem.html
    └── ...
```

### Per-slide template skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>P05 · Chapter Title</title>
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
<link rel="stylesheet" href="../shared/tokens.css">
<style>
  /* This page's unique styles. Any class name won't pollute other pages. */
  body { padding: 120px; }
  .my-thing { ... }
</style>
</head>
<body>
  <!-- 1920×1080 content (locked by body's width/height in tokens.css) -->
  <div class="page-header">...</div>
  <div>...</div>
  <div class="page-footer">...</div>
</body>
</html>
```

**Key constraints**:
- `<body>` is the canvas — lay out directly on it. Don't wrap in `<section>` or other wrappers.
- `width: 1920px; height: 1080px` is locked by `body` rules in `shared/tokens.css`.
- Reference `shared/tokens.css` for shared design tokens (palette, font sizes, page-header/footer etc.).
- Font `<link>` written per page (font import isn't expensive, and ensures each page is independently openable).

### Aggregator · `deck_index.html`

**Copy directly from `assets/deck_index.html`**. You only need to change one place — the `window.DECK_MANIFEST` array, listing all slide filenames in order with human-readable labels:

```js
window.DECK_MANIFEST = [
  { file: "slides/01-cover.html",    label: "Cover" },
  { file: "slides/02-agenda.html",   label: "Agenda" },
  { file: "slides/03-problem.html",  label: "Problem" },
  // ...
];
```

The aggregator already includes: keyboard navigation (←/→/Home/End/number keys/P print), scale + letterbox, bottom-right counter, localStorage memory, hash jumping, print mode (walks iframes for per-page PDF output).

### Single-page verification (multi-file architecture's killer advantage)

Each slide is independent HTML. **Done one? Double-click in browser to view**:

```bash
open slides/05-personas.html
```

Playwright screenshot also `goto(file://.../slides/05-personas.html)` directly — no JS jumping, no interference from other pages' CSS. This drops the cost of "edit a bit, verify a bit" workflow to near zero.

### Parallel development

Distribute each slide's task to a different agent and run in parallel — HTML files are mutually independent; merge has no conflicts. Long decks with this parallel approach can compress production time to 1/N.

### What goes in `shared/tokens.css`

Only **truly cross-page shared** stuff:

- CSS variables (palette, font scale, spacing scale)
- `body { width: 1920px; height: 1080px; }` canvas locking
- `.page-header` / `.page-footer` chrome that's identical on every page

**Don't** stuff per-page layout classes here — that regresses to single-file architecture's global pollution problem.

---

## Path B (small deck) · single file + `deck_stage.js`

For ≤10 pages, needs cross-page shared state (e.g. one React tweaks panel controls all pages), or pitch deck demos requiring extreme density.

### Basic usage

1. Read content from `assets/deck_stage.js`, embed in HTML's `<script>` (or `<script src="deck_stage.js">`)
2. In body, wrap slides with `<deck-stage>`
3. 🛑 **The script tag must be after `</deck-stage>`** (see hard constraint below)

```html
<body>

  <deck-stage>
    <section>
      <h1>Slide 1</h1>
    </section>
    <section>
      <h1>Slide 2</h1>
    </section>
  </deck-stage>

  <!-- ✅ Right: script after deck-stage -->
  <script src="deck_stage.js"></script>

</body>
```

### 🛑 Script position hard constraint (real-world pitfall)

**You cannot put `<script src="deck_stage.js">` in `<head>`.** Even though it can define `customElements` in `<head>`, the parser triggers `connectedCallback` when it parses `<deck-stage>` opening tag — at that point child `<section>` elements aren't parsed yet, `_collectSlides()` gets an empty array, counter shows `1 / 0`, all pages render stacked on top of each other.

**Three compliant options** (any one):

```html
<!-- ✅ Most recommended: script after </deck-stage> -->
</deck-stage>
<script src="deck_stage.js"></script>

<!-- ✅ Also fine: script in head with defer -->
<head><script src="deck_stage.js" defer></script></head>

<!-- ✅ Also fine: module scripts are deferred by default -->
<head><script src="deck_stage.js" type="module"></script></head>
```

`deck_stage.js` itself has built-in `DOMContentLoaded` deferred collection defense — even if the script is in head it won't completely break — but `defer` or putting at body bottom is still the cleaner approach, avoiding dependency on the defense branch.

### ⚠️ Single-file architecture's CSS trap (must read)

The most common pitfall in single-file architecture — **the `display` property gets stolen by per-page styles**.

Common wrong pattern 1 (writing display: flex directly to section):

```css
/* ❌ External CSS specificity 2 overrides shadow DOM's ::slotted(section){display:none} (also 2) */
deck-stage > section {
  display: flex;            /* All pages render stacked! */
  flex-direction: column;
  padding: 80px;
  ...
}
```

Common wrong pattern 2 (section with higher-specificity class):

```css
.emotion-slide { display: grid; }   /* Specificity: 10, even worse */
```

Both make **all slides render stacked** — counter may show `1 / 10` looking normal, but visually the first page covers the second covers the third.

### ✅ Starter CSS (copy on start, no pitfalls)

**Section itself** only manages "visible/invisible"; **layout (flex/grid etc.) goes on `.active`**:

```css
/* Section defines only non-display generic styles */
deck-stage > section {
  background: var(--paper);
  padding: 80px 120px;
  overflow: hidden;
  position: relative;
  /* ⚠️ Don't write display here! */
}

/* Lock "non-active = hidden" — specificity + weight double safety */
deck-stage > section:not(.active) {
  display: none !important;
}

/* Only active page writes the needed display + layout */
deck-stage > section.active {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/* Print mode: all pages must show, override :not(.active) */
@media print {
  deck-stage > section { display: flex !important; }
  deck-stage > section:not(.active) { display: flex !important; }
}
```

Alternative: **write per-page flex/grid into an inner wrapper `<div>`**; section itself is always a `display: block/none` switcher. This is the cleanest approach:

```html
<deck-stage>
  <section>
    <div class="slide-content flex-layout">...</div>
  </section>
</deck-stage>
```

### Custom dimensions

```html
<deck-stage width="1080" height="1920">
  <!-- 9:16 portrait -->
</deck-stage>
```

---

## Slide Labels

Both deck_stage and deck_index label each page (counter display). Give them **more meaningful** labels:

**Multi-file**: in `MANIFEST` write `{ file, label: "04 Problem Statement" }`
**Single-file**: on section add `<section data-screen-label="04 Problem Statement">`

**Key: slide numbers start at 1, not 0**.

When the user says "slide 5", they mean the 5th, never array position `[4]`. Humans don't speak 0-indexed.

---

## Speaker Notes

**Off by default** — only add when user explicitly requests.

With speaker notes you can minimize text on the slide and focus on impactful visuals — notes carry the full script.

### Format

**Multi-file**: in `index.html`'s `<head>` write:

```html
<script type="application/json" id="speaker-notes">
[
  "Script for slide 1...",
  "Script for slide 2...",
  "..."
]
</script>
```

**Single-file**: same location.

### Notes writing tips

- **Complete**: not an outline — actual words to say
- **Conversational**: like normal speech, not written language
- **Aligned**: array's Nth corresponds to slide Nth
- **Length**: 200–400 words is best
- **Emotional line**: mark stress, pauses, emphasis points

---

## Slide design patterns

### 1. Establish a system (must do)

After exploring design context, **state the system you'll use verbally first**:

```markdown
Deck system:
- Background: max 2 (90% white + 10% dark section divider)
- Type: Instrument Serif for display, Geist Sans for body
- Rhythm: section divider full-bleed color + white type, normal slides white bg
- Imagery: hero slide full-bleed photo, data slide chart

I'll work to this system. Anything off, tell me.
```

Wait for user confirmation, then continue.

### 2. Common slide layouts

- **Title slide**: solid background + giant title + subtitle + author/date
- **Section divider**: color background + chapter number + chapter title
- **Content slide**: white bg + title + 1–3 bullet points
- **Data slide**: title + big chart/number + brief explanation
- **Image slide**: full-bleed photo + bottom small caption
- **Quote slide**: whitespace + giant quote + attribution
- **Two-column**: side-by-side compare (vs / before-after / problem-solution)

A deck uses at most 4–5 layouts.

### 3. Scale (re-emphasize)

- Body min **24px**, ideal 28–36px
- Title **60–120px**
- Hero text **180–240px**
- Slides are read from 10 m away — characters must be big enough

### 4. Visual rhythm

A deck needs **intentional variety**:

- Color rhythm: mostly white bg + occasional color section divider + occasional dark section
- Density rhythm: a few text-heavy + a few image-heavy + a few quote whitespace
- Type-size rhythm: normal title + occasional giant hero text

**Don't make every slide look the same** — that's a PowerPoint template, not design.

### 5. Spatial breathing (data-dense pages must read)

**Beginner trap**: stuff every available info onto one page.

Information density ≠ effective communication. Academic / talk decks especially must restrain:

- List/matrix pages: don't draw N elements all the same size. Use **primary/secondary tiering** — the 5 you'll talk about today large as lead; the remaining 16 small as background hint.
- Big-number pages: the number is the visual lead. Caption around it ≤ 3 lines, otherwise audience eyes bounce.
- Quote pages: leave whitespace between the quote and attribution; don't stick them together.

Audit "is data the lead?" and "are texts crammed together?" Adjust until the whitespace makes you slightly uncomfortable.

---

## Print to PDF

**Multi-file**: `deck_index.html` already handles `beforeprint`, outputs PDF per page.

**Single-file**: `deck_stage.js` does the same.

Print styles already written — no extra `@media print` CSS needed.

---

## Export to PPTX / PDF (self-serve scripts)

HTML-first is the primary citizen. But users often need PPTX/PDF delivery. Two universal scripts are provided that **work for any multi-file deck**, located under `scripts/`:

### `export_deck_pdf.mjs` · export vector PDF (multi-file architecture)

```bash
node scripts/export_deck_pdf.mjs --slides <slides-dir> --out deck.pdf
```

**Features**:
- Text **stays vector** (copyable, searchable)
- 100% visual fidelity (Playwright embedded Chromium renders then prints)
- **Doesn't need to change one character of HTML**
- Each slide a separate `page.pdf()`, then `pdf-lib` merges

**Dependencies**: `npm install playwright pdf-lib`

**Limitation**: PDF can't re-edit text — go back to HTML to change.

### `export_deck_stage_pdf.mjs` · single-file deck-stage architecture only ⚠️

**When**: deck is a single HTML file + `<deck-stage>` web component wrapping N `<section>` (Path B architecture). Here `export_deck_pdf.mjs`'s "one `page.pdf()` per HTML" approach doesn't work; need this dedicated script.

```bash
node scripts/export_deck_stage_pdf.mjs --html deck.html --out deck.pdf
```

**Why can't reuse export_deck_pdf.mjs** (real-world pitfall record):

1. **Shadow DOM beats `!important`**: deck-stage's shadow CSS has `::slotted(section) { display: none }` (only active gets `display: block`). Even in light DOM with `@media print { deck-stage > section { display: block !important } }` won't override — when `page.pdf()` triggers print media, Chromium ultimately renders only the active slide; the **whole PDF has only 1 page** (current active slide repeated).

2. **Loop-goto each slide still outputs only 1 page**: intuitive solution "navigate to each `#slide-N` then `page.pdf({pageRanges:'1'})`" also fails — print CSS outside shadow DOM also has `deck-stage > section { display: block }` rule that gets overridden, final render is always the first in the section list (not the one you navigated to). Result: 17 loops give 17 P01 covers.

3. **Absolute children leak to next page**: even when successfully rendering all sections, if section itself is `position: static`, its absolute-positioned `cover-footer`/`slide-footer` will position relative to initial containing block — when section is print-forced to 1080px height, absolute footer may be pushed to the next page (PDF has more pages than section count, the extra ones containing only orphan footers).

**Fix strategy** (script implements it):

```js
// After opening HTML, page.evaluate to lift sections out of deck-stage slot,
// hang them under a normal div in body, inline style to ensure position:relative + fixed size
await page.evaluate(() => {
  const stage = document.querySelector('deck-stage');
  const sections = Array.from(stage.querySelectorAll(':scope > section'));
  document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
      @page { size: 1920px 1080px; margin: 0; }
      html, body { margin: 0 !important; padding: 0 !important; }
      deck-stage { display: none !important; }
    `,
  }));
  const container = document.createElement('div');
  sections.forEach(s => {
    s.style.cssText = 'width:1920px!important;height:1080px!important;display:block!important;position:relative!important;overflow:hidden!important;page-break-after:always!important;break-after:page!important;background:#F7F4EF;margin:0!important;padding:0!important;';
    container.appendChild(s);
  });
  // Last page no break, avoid trailing blank
  sections[sections.length - 1].style.pageBreakAfter = 'auto';
  sections[sections.length - 1].style.breakAfter = 'auto';
  document.body.appendChild(container);
});

await page.pdf({ width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true });
```

**Why this works**:
- Pulling sections from shadow DOM slot to light DOM normal div completely bypasses `::slotted(section) { display: none }` rule
- Inline `position: relative` makes absolute children position relative to section, no overflow
- `page-break-after: always` makes browser print each section as its own page
- `:last-child` no break avoids trailing blank page

**When verifying with `mdls -name kMDItemNumberOfPages`**: macOS Spotlight metadata is cached; after PDF rewrite run `mdimport file.pdf` to force refresh, otherwise it shows old page count. `pdfinfo` or `pdftoppm` to count files is the truth.

---

### `export_deck_pptx.mjs` · export editable PPTX

```bash
# Only mode: text frames natively editable (font falls back to system fonts)
node scripts/export_deck_pptx.mjs --slides <dir> --out deck.pptx
```

How it works: `html2pptx` reads computedStyle per element and translates DOM into PowerPoint objects (text frame / shape / picture). Text becomes real text frames — double-click to edit in PPT.

**Hard constraints** (HTML must satisfy, otherwise the page is skipped; full details in `references/editable-pptx.md`):
- All text must be in `<p>`/`<h1>`–`<h6>`/`<ul>`/`<ol>` (no bare-text div)
- `<p>`/`<h*>` themselves cannot have background/border/shadow (put on outer div)
- No `::before`/`::after` for decorative text (pseudo-elements aren't extractable)
- inline elements (span/em/strong) cannot have margin
- No CSS gradient (un-renderable)
- div doesn't use `background-image` (use `<img>`)

The script has a **built-in auto-preprocessor** — auto-wraps "bare text in leaf divs" into `<p>` (preserving class). This solves the most common violation (bare text). But other violations (border on p, margin on span) still need the HTML source compliant.

**Font fallback caveat**:
- Playwright uses webfont to measure text-box dimensions; PowerPoint/Keynote uses local fonts to render
- Mismatch = **overflow or misalignment** — every page needs eyeball check
- Recommendation: install the HTML's fonts on the target machine, or fallback to `system-ui`

**For visual-priority scenarios don't take this path** → use `export_deck_pdf.mjs` for PDF. PDF visual 100% fidelity, vector, cross-platform, text searchable — the true home of visual-priority decks, not "non-editable compromise".

### Make HTML export-friendly from the start

Most stable deck for export: **write HTML following editable's 4 hard constraints from the start**. Then `export_deck_pptx.mjs` can pass everything directly. Extra cost is minimal:

```html
<!-- ❌ Bad -->
<div class="title">Key finding</div>

<!-- ✅ Good (p wrap, class inherited) -->
<p class="title">Key finding</p>

<!-- ❌ Bad (border on p) -->
<p class="stat" style="border-left: 3px solid red;">41%</p>

<!-- ✅ Good (border on outer div) -->
<div class="stat-wrap" style="border-left: 3px solid red;">
  <p class="stat">41%</p>
</div>
```

### When to choose which

| Scenario | Recommended |
|---|---|
| To organizer / archive | **PDF** (universal, high-fidelity, searchable text) |
| Send to collaborator for text adjustment | **PPTX editable** (accept font fallback) |
| Live presentation, no content changes | **PDF** (vector fidelity, cross-platform) |
| HTML is the primary presentation medium | Browser playback directly; export is just backup |

## Deep path for editable PPTX export (long-term projects only)

If your deck will be maintained long-term, repeatedly modified, team-collaborative — **start by writing HTML to html2pptx constraints**. Then `export_deck_pptx.mjs` can pass everything directly. See `references/editable-pptx.md` (4 hard constraints + HTML template + common error cheat sheet + fallback flow for existing visual draft).

---

## Common questions

**Multi-file: iframe page won't open / blank**
→ Check `MANIFEST`'s `file` path is correct relative to `index.html`. Use browser DevTools to see if the iframe's src is directly accessible.

**Multi-file: one page's style conflicts with another**
→ Impossible (iframe isolation). If you feel a conflict, it's cache — Cmd+Shift+R force reload.

**Single-file: multiple slides render stacked**
→ CSS specificity issue. See "Single-file architecture's CSS trap" above.

**Single-file: scaling looks wrong**
→ Check that all slides hang directly under `<deck-stage>` as `<section>`. No middle wrapping `<div>`.

**Single-file: want to jump to a specific slide**
→ Add hash to URL: `index.html#slide-5` jumps to the 5th.

**Both architectures: type position differs across screens**
→ Use fixed dimensions (1920×1080) and `px` units, not `vw`/`vh` or `%`. Scaling handled uniformly.

---

## Verification checklist (must pass after deck completion)

1. [ ] Open `index.html` (or main HTML) directly in browser, check first page no broken images, fonts loaded
2. [ ] Press → key through every page, no blanks, no layout breaks
3. [ ] Press P key for print preview, each page exactly one A4 (or 1920×1080) without clipping
4. [ ] Random pick 3 pages, Cmd+Shift+R force reload, localStorage memory works
5. [ ] Playwright batch screenshot (single-page architecture: walk `slides/*.html`; single-file architecture: use goTo to switch), human eyeball pass
6. [ ] Search for `TODO` / `placeholder` residue, confirm all cleaned
