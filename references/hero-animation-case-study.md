# Gallery Ripple + Multi-Focus · scene-orchestration philosophy

> A reusable visual orchestration structure distilled from a hero animation v9 (25 seconds, 8 scenes).
> This is not an animation production pipeline — it's **what scenes is this orchestration "right" for**.

## One-liner up front

> **When you have 20+ homogeneous visual assets and the scene needs to express "scale + depth", consider Gallery Ripple + Multi-Focus first instead of stacking layouts.**

Generic SaaS feature animations, product launches, skill promos, series portfolio displays — as long as the asset count is enough and the style is consistent, this structure almost always works.

---

## What this technique actually expresses

It's not "showing off assets" — it's telling a narrative through **two rhythm shifts**:

**Beat 1 · Ripple unfolding (~1.5s)**: from center outward, 48 cards expand. The audience is hit by **quantity** — "oh, this thing has produced this much".

**Beat 2 · Multi-Focus (~8s, 4 cycles)**: while the camera slow-pans, 4 times the background dim + desaturate, and one card scales up to screen center. The audience switches from "the impact of quantity" to "the gaze of quality" — each focus a steady 1.7s.

**Core narrative structure**: **scale (Ripple) → gaze (Focus × 4) → fade (Walloff)**. The three-beat combination expresses "Breadth × Depth" — not just "can produce a lot", but "each one deserves to stop and look".

Counter-examples:

| Approach | Audience perception |
|---|---|
| 48 cards static (no Ripple) | Pretty but no narrative — like a grid screenshot |
| Quick-cut card to card (no Gallery context) | Like a slideshow — loses "scale" |
| Only Ripple, no Focus | Hits hard but no specific card is remembered |
| **Ripple + Focus × 4 (this recipe)** | **First struck by quantity, then gazing at quality, finally a calm fade — complete emotional arc** |

---

## Prerequisites (all 4 must be met)

This orchestration is **not universal**. The 4 conditions below are all required:

1. **Asset count ≥ 20, ideally 30+**
   Less than 20 makes Ripple feel "empty" — 48 cells with motion in each is what gives density. v9 used 48 cells × 32 unique images (looping fill).

2. **Asset visual style is consistent**
   All 16:9 slide previews / all app screenshots / all cover designs — aspect ratio, color tone, and layout must look like "a set". Mixing makes the gallery look like a clipboard.

3. **Each asset still has readable info when enlarged**
   Focus enlarges one card to ~960px wide; if the original is blurry or info-thin when scaled up, the Focus beat is wasted. Reverse check: from the 48, can you pick the 4 "most representative"? If you can't, asset quality is uneven.

4. **The scene is landscape or square — not portrait**
   The gallery's 3D tilt (`rotateX(14deg) rotateY(-10deg)`) needs horizontal extent; portrait makes the tilt feel narrow and awkward.

**Fallbacks when conditions aren't met**:

| Missing | Degrade to |
|---|---|
| Assets < 20 | "3–5 cards side-by-side static + focus each one" |
| Style inconsistent | "Cover + 3-chapter big image" keynote-style |
| Info-thin | "Data-driven dashboard" or "tagline + giant text" |
| Portrait | "Vertical scroll + sticky cards" |

---

## Technical recipe (v9 field parameters)

### 4-Layer structure

```
viewport (1920×1080, perspective: 2400px)
  └─ canvas (4320×2520, oversize overflow) → 3D tilt + pan
      └─ 8×6 grid = 48 cards (gap 40px, padding 60px)
          └─ img (16:9, border-radius 9px)
      └─ focus-overlay (absolute center, z-index 40)
          └─ img (matches selected slide)
```

**Key**: canvas is 2.25× viewport — that's what gives pan a "peeking into a larger world" feel.

### Ripple unfolding (distance-delay algorithm)

```js
// Each card's enter time = distance from center × 0.8s delay
const col = i % 8, row = Math.floor(i / 8);
const dc = col - 3.5, dr = row - 2.5;       // Offset to center
const dist = Math.hypot(dc, dr);
const maxDist = Math.hypot(3.5, 2.5);
const delay = (dist / maxDist) * 0.8;       // 0 → 0.8s
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
const opacity = expoOut(Math.min(1, localT));
```

**Core parameters**:
- Total duration 1.7s (`T.s3_ripple: [8.3, 10.0]`)
- Max delay 0.8s (center first, corners last)
- Per-card enter duration 0.7s
- Easing: `expoOut` (burst feel, not smooth)

**Done in parallel**: canvas scale 1.25 → 0.94 (zoom out to reveal) — synchronously pulling back as it appears.

### Multi-Focus (4 beats)

```js
T.focuses = [
  { start: 11.0, end: 12.7, idx: 2  },  // 1.7s
  { start: 13.3, end: 15.0, idx: 3  },  // 1.7s
  { start: 15.6, end: 17.3, idx: 10 },  // 1.7s
  { start: 17.9, end: 19.6, idx: 16 },  // 1.7s
];
```

**Rhythm rule**: each focus 1.7s; gap 0.6s breath. Total 8s (11.0–19.6s).

**Inside each focus**:
- In ramp: 0.4s (`expoOut`)
- Hold: 0.9s (`focusIntensity = 1`)
- Out ramp: 0.4s (`easeOut`)

**Background change (this is key)**:

```js
if (focusIntensity > 0) {
  const dimOp = entryOp * (1 - 0.6 * focusIntensity);  // dim to 40%
  const brt = 1 - 0.32 * focusIntensity;                // brightness 68%
  const sat = 1 - 0.35 * focusIntensity;                // saturate 65%
  card.style.filter = `brightness(${brt}) saturate(${sat})`;
}
```

**Not just opacity — desaturate + darken in parallel**. This makes the foreground overlay's color "jump out", not just "brighten a bit".

**Focus overlay size animation**:
- From 400×225 (entry) → 960×540 (hold)
- 3 layers of shadow + 3px accent outline ring around it — the "framed" feel

### Pan (continuous motion keeps stillness from being boring)

```js
const panT = Math.max(0, t - 8.6);
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;
```

- Sine wave + linear drift — not a pure loop; every moment a different position
- X / Y frequencies differ (0.12 vs 0.09) to avoid visible "regular cycle"
- Clamp to ±900/500px to prevent edge reveal

**Why not pure linear pan**: with pure linear, audience can "predict" the next second; sine + drift makes every second new. Under 3D tilt this produces a "mild seasickness" (the good kind) — attention is held.

---

## 5 reusable patterns (distilled from v6→v9 iteration)

### 1. **expoOut as primary easing — not cubicOut**

`easeOut = 1 - (1-t)³` (smooth) vs `expoOut = 1 - 2^(-10t)` (burst then quickly converge).

**Why**: expoOut hits 90% in the first 30% — more like physical damping, matches the intuition of "heavy thing landing". Especially good for:
- Card entry (weight)
- Ripple unfolding (shock wave)
- Brand surfacing (settle feel)

**When to still use cubicOut**: focus out ramp, symmetric micro-motion.

### 2. **Paper-feel background + accent (Anthropic lineage)**

```css
--bg: #F7F4EE;        /* Warm paper */
--ink: #1D1D1F;       /* Near-black */
--accent: #D97757;    /* Terracotta */
--hairline: #E4DED2;  /* Warm hairline */
```

**Why**: warm background still has "breath" after GIF compression — unlike pure white which feels "screen-ish". Terracotta as the only accent runs through terminal prompt, dir-card selection, cursor, brand hyphen, focus ring — every visual anchor strung by one color.

**v5 lesson**: added a noise overlay to mimic "paper grain" — GIF frame compression killed it (every frame is different). v6 changed to "background only + warm shadow" — paper feel preserved 90%, GIF size reduced 60%.

### 3. **Two-tier shadow simulates depth — without true 3D**

```css
.gallery-card.depth-near { box-shadow: 0 32px 80px -22px rgba(60,40,20,0.22), ... }
.gallery-card.depth-far  { box-shadow: 0 14px 40px -16px rgba(60,40,20,0.10), ... }
```

Use `sin(i × 1.7) + cos(i × 0.73)` deterministic algorithm to assign each card to near/mid/far shadow tier — **visually it has "3D stacking" feel, but the per-frame transform is unchanged, GPU cost zero**.

**True 3D's cost**: each card individually `translateZ`, GPU computes 48 transforms + shadow blurs every frame. v4 tried this; Playwright recording 25fps strained. v6's two-tier shadow has < 5% visible difference but 10× lower cost.

### 4. **Font weight change (font-variation-settings) is more cinematic than size change**

```js
const wght = 100 + (700 - 100) * morphP;  // 100 → 700 over 0.9s
wordmark.style.fontVariationSettings = `"wght" ${wght.toFixed(0)}`;
```

Brand wordmark Thin → Bold over 0.9s, paired with letter-spacing micro-adjust (-0.045 → -0.048em).

**Why better than scale up/down**:
- Audience has seen scale up/down too many times — expectations are fixed
- Weight change is "internal fullness", like a balloon being filled, not "pushed closer"
- Variable fonts only became widespread post-2020 — the audience subconsciously feels "modern"

**Limitations**: must use a font supporting variable axes (Inter / Roboto Flex / Recursive etc.). Static fonts can only mimic by switching fixed weights with jumps.

### 5. **Corner brand low-intensity continuous signature**

During the gallery stage, top-left has a small `VINEX22 · DESIGN` mark, 16% opacity, 12px font, wide letter-spacing.

**Why add this**:
- After Ripple bursts the audience easily "loses focus" and forgets what they're watching — top-left light marker re-anchors them
- More refined than a full-screen big logo — branding people know that brand signatures don't need to shout
- When the GIF is screenshot-shared it leaves an attribution signal

**Rule**: only show during the middle (busy frames); off at start (don't cover terminal); off at end (brand reveal is the star).

---

## Counter-examples · when not to use this orchestration

**❌ Product demos (showcasing features)**: Gallery flashes each card past quickly — audience can't remember any feature. Use "single-screen focus + tooltip annotation".

**❌ Data-driven content**: audience needs to read numbers; Gallery's fast rhythm doesn't give time. Use "data charts + per-item reveal".

**❌ Story narrative**: Gallery is a "parallel" structure; story needs "causal". Use keynote chapter switching.

**❌ Only 3–5 assets**: Ripple density isn't enough — looks like "patches". Use "static arrangement + per-card highlight".

**❌ Portrait (9:16)**: 3D tilt needs horizontal extent; portrait makes the tilt feel "off-axis", not "unfolding".

---

## How to judge if your task fits this orchestration

Three quick steps:

**Step 1 · Asset count**: count how many same-class visual assets you have. < 15 → stop; 15–25 → marginal; 25+ → just use it.

**Step 2 · Consistency test**: place 4 random assets side-by-side — do they look like "a set"? If not → unify style first or change approach.

**Step 3 · Narrative match**: are you expressing "Breadth × Depth" (quantity × quality)? Or "process" / "feature" / "story"? If not the former, don't force-fit.

If all 3 are yes, fork the v6 HTML, swap the `SLIDE_FILES` array and timeline — change palette `--bg / --accent / --ink` — re-skin without rebuilding.

---

## Related references

- Full technical pipeline: [references/animations.md](animations.md) · [references/animation-best-practices.md](animation-best-practices.md)
- Animation export pipeline: [references/video-export.md](video-export.md)
- Audio configuration (BGM + SFX dual track): [references/audio-design-rules.md](audio-design-rules.md)
- Apple gallery style horizontal reference: [references/apple-gallery-showcase.md](apple-gallery-showcase.md)
