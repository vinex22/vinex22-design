# Editable PPTX export · HTML hard constraints + sizing decisions + common errors

This document covers the path of using `scripts/html2pptx.js` + `pptxgenjs` to translate HTML into **truly editable PowerPoint text frames element-by-element**. This is also the only path supported by `export_deck_pptx.mjs`.

> **Core prerequisite**: to take this path, the HTML must follow the 4 constraints below from the very first line. **Don't write first and convert later** — patching after the fact triggers 2–3 hours of rework (proven in field tests).
>
> For visual-freedom-first scenarios (animations / web components / CSS gradients / complex SVG), use the PDF path (`export_deck_pdf.mjs` / `export_deck_stage_pdf.mjs`). **Don't** expect pptx export to give you both visual fidelity and editability — this is a physical constraint of the PPTX file format itself (see "Why the 4 constraints aren't a bug, they're a physical constraint" at the end).

---

## Canvas size · use 960×540pt (LAYOUT_WIDE)

PPTX units are **inch** (physical size), not px. Decision principle: the body's computed style size must **match the presentation layout's inch size** (±0.1″, enforced by `html2pptx.js`'s `validateDimensions`).

### Three candidate sizes

| HTML body | Physical size | Matching PPT layout | When to choose |
|---|---|---|---|
| **`960pt × 540pt`** | **13.333″ × 7.5″** | **pptxgenjs `LAYOUT_WIDE`** | ✅ **Default recommendation** (modern PowerPoint 16:9 standard) |
| `720pt × 405pt` | 10″ × 5.625″ | Custom | Only when user specifies "old PowerPoint Widescreen" template |
| `1920px × 1080px` | 20″ × 11.25″ | Custom | ❌ Non-standard size; type appears unusually small when projected |

**Don't think of HTML size as resolution.** PPTX is a vector document — body size determines **physical size**, not sharpness. An oversized body (20″×11.25″) doesn't make text sharper — it just makes pt sizes relatively small on the canvas, which looks worse when projected/printed.

### Body writing styles (three equivalents)

```css
body { width: 960pt;  height: 540pt; }    /* Clearest, recommended */
body { width: 1280px; height: 720px; }    /* Equivalent, px habit */
body { width: 13.333in; height: 7.5in; }  /* Equivalent, inch intuition */
```

Matching pptxgenjs:

```js
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inch — no custom needed
```

---

## 4 hard constraints (violation will fail directly)

`html2pptx.js` translates HTML's DOM into PowerPoint objects element-by-element. PowerPoint's format constraints projected onto HTML = the 4 rules below.

### Rule 1 · DIVs cannot contain bare text — must be wrapped in `<p>` or `<h1>`–`<h6>`

```html
<!-- ❌ Wrong: text directly inside div -->
<div class="title">Q3 revenue grew 23%</div>

<!-- ✅ Right: text inside <p> or <h1>-<h6> -->
<div class="title"><h1>Q3 revenue grew 23%</h1></div>
<div class="body"><p>New users were the main driver</p></div>
```

**Why**: PowerPoint text must live in a text frame; text frames correspond to HTML's paragraph-level elements (p / h* / li). A bare `<div>` has no text container in PPTX.

**Also you cannot use `<span>` to carry primary text** — span is inline and can't be aligned independently as a text frame. span can only **sit inside p/h\*** for local styling (bold, color shift).

### Rule 2 · CSS gradients are not supported — solid colors only

```css
/* ❌ Wrong */
background: linear-gradient(to right, #FF6B6B, #4ECDC4);

/* ✅ Right: solid */
background: #FF6B6B;

/* ✅ If multi-color stripes are required, use flex children with solid each */
.stripe-bar { display: flex; }
.stripe-bar div { flex: 1; }
.red   { background: #FF6B6B; }
.teal  { background: #4ECDC4; }
```

**Why**: PowerPoint shape fill only supports solid / gradient-fill, but pptxgenjs's `fill: { color: ... }` only maps solid. Going through PowerPoint's native gradient requires another structure that the toolchain does not support.

### Rule 3 · Background / border / shadow only on DIVs, not on text tags

```html
<!-- ❌ Wrong: <p> with background -->
<p style="background: #FFD700; border-radius: 4px;">Highlight</p>

<!-- ✅ Right: outer div carries background, <p> only carries text -->
<div style="background: #FFD700; border-radius: 4px; padding: 8pt 12pt;">
  <p>Highlight</p>
</div>
```

**Why**: in PowerPoint, shape (rectangle / rounded rect) and text frame are two objects. HTML's `<p>` only translates to text frame; background/border/shadow belong to shape — must be on the **div wrapping the text**.

### Rule 4 · DIVs cannot use `background-image` — use `<img>` tag

```html
<!-- ❌ Wrong -->
<div style="background-image: url('chart.png')"></div>

<!-- ✅ Right -->
<img src="chart.png" style="position: absolute; left: 50%; top: 20%; width: 300pt; height: 200pt;" />
```

**Why**: `html2pptx.js` only extracts image paths from `<img>` elements; it does not parse CSS `background-image` URLs.

---

## Path A · HTML template skeleton

One independent HTML file per slide; isolated scopes (avoid CSS pollution from single-file decks).

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    width: 960pt; height: 540pt;           /* ⚠️ Match LAYOUT_WIDE */
    font-family: system-ui, -apple-system, sans-serif;
    background: #FEFEF9;                    /* Solid, no gradient */
    overflow: hidden;
  }
  /* DIVs handle layout / background / border */
  .card {
    position: absolute;
    background: #1A4A8A;                    /* Background on DIV */
    border-radius: 4pt;
    padding: 12pt 16pt;
  }
  /* Text tags only carry font styling — no background / border */
  .card h2 { font-size: 24pt; color: #FFFFFF; font-weight: 700; }
  .card p  { font-size: 14pt; color: rgba(255,255,255,0.85); }
</style>
</head>
<body>

  <!-- Title region: outer div positions, inner text tag -->
  <div style="position: absolute; top: 40pt; left: 60pt; right: 60pt;">
    <h1 style="font-size: 36pt; color: #1A1A1A; font-weight: 700;">Title is an assertion, not a topic word</h1>
    <p style="font-size: 16pt; color: #555555; margin-top: 10pt;">Subtitle adds detail</p>
  </div>

  <!-- Content card: div carries background, h2/p carry text -->
  <div class="card" style="top: 130pt; left: 60pt; width: 240pt; height: 160pt;">
    <h2>Point one</h2>
    <p>Brief explanatory text</p>
  </div>

  <!-- List: use ul/li, not manual • -->
  <div style="position: absolute; top: 320pt; left: 60pt; width: 540pt;">
    <ul style="font-size: 16pt; color: #1A1A1A; padding-left: 24pt; list-style: disc;">
      <li>First point</li>
      <li>Second point</li>
      <li>Third point</li>
    </ul>
  </div>

  <!-- Illustration: <img> tag, not background-image -->
  <img src="illustration.png" style="position: absolute; right: 60pt; top: 110pt; width: 320pt; height: 240pt;" />

</body>
</html>
```

---

## Common error quick-check

| Error message | Cause | Fix |
|---|---|---|
| `DIV element contains unwrapped text "XXX"` | div has bare text | Wrap text in `<p>` or `<h1>`–`<h6>` |
| `CSS gradients are not supported` | Used linear/radial-gradient | Use solid color, or flex children for stripes |
| `Text element <p> has background` | `<p>` tag has background color | Wrap with `<div>` carrying background; `<p>` only writes text |
| `Background images on DIV elements are not supported` | div uses background-image | Use `<img>` tag |
| `HTML content overflows body by Xpt vertically` | Content exceeds 540pt | Reduce content or shrink font; or `overflow: hidden` to clip |
| `HTML dimensions don't match presentation layout` | body size doesn't match pres layout | body uses `960pt × 540pt` with `LAYOUT_WIDE`; or defineLayout custom |
| `Text box "XXX" ends too close to bottom edge` | Large `<p>` is < 0.5 inch from body bottom edge | Move up; leave bottom margin. PPT bottom is partially obscured anyway |

---

## Basic workflow (3 steps to PPTX)

### Step 1 · Write each slide's HTML following the constraints

```
my-deck/
├── slides/
│   ├── 01-cover.html    # Each file is a complete 960×540pt HTML
│   ├── 02-agenda.html
│   └── ...
└── illustration/        # Images referenced by all <img>
    ├── chart1.png
    └── ...
```

### Step 2 · Write build.js calling `html2pptx.js`

```js
const pptxgen = require('pptxgenjs');
const html2pptx = require('../scripts/html2pptx.js');  // This skill's script

(async () => {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inch, matches HTML's 960×540pt

  const slides = ['01-cover.html', '02-agenda.html', '03-content.html'];
  for (const file of slides) {
    await html2pptx(`./slides/${file}`, pres);
  }

  await pres.writeFile({ fileName: 'deck.pptx' });
})();
```

### Step 3 · Open and check

- Open the exported PPTX in PowerPoint / Keynote
- Double-click any text — it should be directly editable (if it's an image, you violated rule 1)
- Verify overflow: each page should be inside the body bounds, nothing clipped

---

## This path vs other options (when to choose what)

| Need | Choose |
|---|---|
| Colleagues will edit text in the PPTX / send to non-technical people for further editing | **This path** (editable, must write HTML following the 4 constraints from the start) |
| Speech-only / archive — no further edits | `export_deck_pdf.mjs` (multi-file) or `export_deck_stage_pdf.mjs` (single-file deck-stage), produces vector PDF |
| Visual freedom first (animations, web components, CSS gradients, complex SVG); accept non-editable | **PDF** (above) — PDF is high-fidelity and cross-platform, much better than "image PPTX" |

**Never run html2pptx on a visually-free HTML and hope** — measured visual-driven HTML pass rate < 30%; the remaining 70% takes more time to fix per slide than rewriting. For these scenarios, output PDF — don't squeeze into PPTX.

---

## Fallback · already have visual draft but user insists on editable PPTX

Sometimes you'll hit this: you / the user already have a visual-driven HTML (gradients, web components, complex SVG) that ideally would output PDF, but the user explicitly says "no — must be editable PPTX".

**Don't blindly run html2pptx and hope it passes** — measured visual-driven HTML pass rate on html2pptx is < 30%; the other 70% will error or visually distort. The correct fallback:

### Step 1 · Communicate limitations transparently

In one sentence, tell the user three things:

> "Your HTML uses [list specifics: gradients / web components / complex SVG / ...]. Direct conversion to editable PPTX will fail. I have two options:
> - A. **Output PDF** (recommended) — visuals 100% preserved, recipient can view and print but not edit text
> - B. **Rewrite an editable HTML using the visual draft as blueprint** (preserve color / layout / copy design decisions but reorganize HTML structure per the 4 hard constraints — **sacrificing** gradients, web components, complex SVG visual capabilities) → then export editable PPTX
>
> Which one?"

Don't downplay option B — make explicit **what will be lost**. Let the user make the trade-off.

### Step 2 · If user picks B, AI rewrites — don't ask user to do it

The doctrine here: **the user provides design intent; you translate it to compliant implementation**. Don't ask the user to learn the 4 hard constraints and rewrite themselves.

Rewrite principles:
- **Preserve**: color system (primary / accent / neutrals), info hierarchy (title / subtitle / body / annotation), key copy, layout skeleton (top-mid-bottom / split / grid), page rhythm
- **Downgrade**: CSS gradients → solid or flex stripes; web components → paragraph-level HTML; complex SVG → simplified `<img>` or solid geometry; shadows → remove or weaken; custom fonts → align with system fonts
- **Rewrite**: bare text → wrap in `<p>` / `<h*>`; `background-image` → `<img>` tag; background/border on `<p>` → outer div carries it

### Step 3 · Produce a before/after comparison (transparent delivery)

After rewriting, give the user a before/after comparison so they know which visual details were simplified:

```
Original design → editable version adjustment
- Title gradient → primary #5B3DE8 solid background
- Data card shadow → removed (replaced with 2pt outline distinction)
- Complex SVG line chart → simplified to <img> PNG (rendered from HTML screenshot)
- Hero web component animation → static first frame (web component cannot translate)
```

### Step 4 · Export & dual-format delivery

- `editable` HTML → run `scripts/export_deck_pptx.mjs` to output editable PPTX
- **Recommend keeping** the original visual draft → run `scripts/export_deck_pdf.mjs` to output high-fidelity PDF
- Deliver both formats to the user: visual PDF + editable PPTX, each with its own role

### When to refuse option B

In some scenarios the rewrite cost is too high; advise the user to give up editable PPTX:
- HTML's core value is animation or interaction (rewrite leaves only static first frame, info loss 50%+)
- Pages > 30, rewrite cost > 2 hours
- Visual design depends on precise SVG / custom filters (rewrite is almost unrelated to original)

In this case tell the user: "This deck's rewrite cost is too high — I recommend PDF, not PPTX. If the recipient really requires pptx format, accept that visuals will be heavily simplified — would you like to switch to PDF?"

---

## Why the 4 constraints aren't a bug — they're physical constraints

These 4 aren't laziness on the part of `html2pptx.js`'s author — they are **constraints of the PowerPoint file format (OOXML) itself** projected onto HTML:

- In PPTX, text must live in a text frame (`<a:txBody>`) — corresponding to paragraph-level HTML elements
- PPTX shape and text frame are two objects — you can't paint background and write text on the same element
- PPTX shape fill has limited gradient support (only certain preset gradients; not arbitrary CSS angle gradients)
- PPTX picture object must reference a real image file — not a CSS property

Once you understand this, **don't expect the tool to get smarter** — HTML must adapt to PPTX format, not the other way around.
