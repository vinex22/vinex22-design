# Apple Gallery Showcase · gallery-wall animation style

> Inspiration: Claude Design hero video + Apple product page "work wall" displays
> Field origin: vinex22-design hero v5 release pattern
> Use cases: **product launch hero animations, skill capability demos, portfolio walls** — anywhere multiple high-quality outputs need to be shown together with focused attention guidance

---

## Trigger judgment · when to use this style

**Fit**:
- 10+ real outputs to display on the same screen (slides, apps, web pages, infographics)
- Audience is professional (developers, designers, PMs) — sensitive to "feel"
- The mood you want to convey is "restrained, exhibition-like, refined, spatial"
- You need focus and overview to coexist (zoom into details without losing the whole)

**Not fit**:
- Single product focus (use frontend-design's product hero template)
- Emotion-driven / story-heavy animations (use timeline narrative templates)
- Small screen / portrait (the tilt blurs at small sizes)

---

## Visual tokens

```css
:root {
  /* Light gallery palette */
  --bg:         #F5F5F7;   /* Main canvas — Apple site gray */
  --bg-warm:    #FAF9F5;   /* Warm cream variant */
  --ink:        #1D1D1F;   /* Primary type */
  --ink-80:     #3A3A3D;
  --ink-60:     #545458;
  --muted:      #86868B;   /* Secondary text */
  --dim:        #C7C7CC;
  --hairline:   #E5E5EA;   /* Card 1px border */
  --accent:     #D97757;   /* Terracotta orange */
  --accent-deep:#B85D3D;

  --serif: "Source Serif 4", "Tiempos Headline", Georgia, serif;
  --sans:  "Inter", -apple-system, system-ui;
  --mono:  "JetBrains Mono", "SF Mono", ui-monospace;
}
```

**Key principles**:
1. **Never use pure black background**. A black background makes work look like a movie — not "results that can be adopted at work"
2. **Terracotta orange is the only accent hue** — everything else is grayscale + white
3. **Triple-font stack** (serif + sans + mono) creates a "publication" rather than "internet product" feel

---

## Core layout patterns

### 1. Floating card (the basic unit of the whole style)

```css
.gallery-card {
  background: #FFFFFF;
  border-radius: 14px;
  padding: 6px;                          /* Padding is the "matting paper" */
  border: 1px solid var(--hairline);
  box-shadow:
    0 20px 60px -20px rgba(29, 29, 31, 0.12),   /* Main shadow — soft and long */
    0 6px 18px -6px rgba(29, 29, 31, 0.06);     /* Second-layer near light, creates float */
  aspect-ratio: 16 / 9;                  /* Unified slide ratio */
  overflow: hidden;
}
.gallery-card img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 9px;                    /* Slightly tighter than card radius — visual nesting */
}
```

**Anti-pattern**: don't tile edge-to-edge (no padding / no border / no shadow) — that's infographic density expression, not exhibition.

### 2. 3D tilted work wall

```css
.gallery-viewport {
  position: absolute; inset: 0;
  overflow: hidden;
  perspective: 2400px;                   /* Deeper perspective — tilt isn't exaggerated */
  perspective-origin: 50% 45%;
}
.gallery-canvas {
  width: 4320px;                         /* Canvas = 2.25× viewport */
  height: 2520px;                        /* Leave room for pan */
  transform-origin: center center;
  transform: perspective(2400px)
             rotateX(14deg)              /* Tip back */
             rotateY(-10deg)             /* Turn left */
             rotateZ(-2deg);             /* Slight skew — kills the perfectness */
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 40px;
  padding: 60px;
}
```

**Sweet spot parameters**:
- rotateX: 10–15deg (more = looks like a VIP gala backdrop)
- rotateY: ±8–12deg (left/right symmetry)
- rotateZ: ±2–3deg (the "this isn't machine-aligned" human touch)
- perspective: 2000–2800px (less than 2000 fish-eyes; more than 3000 flattens to ortho)

### 3. 2×2 four-corner converge (selection scene)

```css
.grid22 {
  display: grid;
  grid-template-columns: repeat(2, 800px);
  gap: 56px 64px;
  align-items: start;
}
```

Each card slides in from its corresponding corner (tl / tr / bl / br) toward the center + fade in. The matching `cornerEntry` vector:

```js
const cornerEntry = {
  tl: { dx: -700, dy: -500 },
  tr: { dx:  700, dy: -500 },
  bl: { dx: -700, dy:  500 },
  br: { dx:  700, dy:  500 },
};
```

---

## Five core animation patterns

### Pattern A · Four-corner converge (0.8–1.2s)

4 elements slide in from the four viewport corners, scaling 0.85→1.0 with ease-out. Best for opening "showcase multi-direction options".

```js
const inP = easeOut(clampLerp(t, start, end));
card.style.transform = `translate3d(${(1-inP)*ce.dx}px, ${(1-inP)*ce.dy}px, 0) scale(${0.85 + 0.15*inP})`;
card.style.opacity = inP;
```

### Pattern B · Selected zoom + others slide out (0.8s)

The selected card scales 1.0→1.28; non-selected fade out + blur + drift back to corners:

```js
// Selected
card.style.transform = `translate3d(${cellDx*outP}px, ${cellDy*outP}px, 0) scale(${1 + 0.28*easeOut(zoomP)})`;
// Not selected
card.style.opacity = 1 - outP;
card.style.filter = `blur(${outP * 1.5}px)`;
```

**Key**: non-selected must blur — not pure fade. blur simulates depth of field; visually it "pushes" the selected one forward.

### Pattern C · Ripple expand (1.7s)

From center outward, delay each card by distance, fade each in + scale 1.25x → 0.94x ("camera pulls back"):

```js
const col = i % COLS, row = Math.floor(i / COLS);
const dc = col - (COLS-1)/2, dr = row - (ROWS-1)/2;
const dist = Math.sqrt(dc*dc + dr*dr);
const delay = (dist / maxDist) * 0.8;
const localT = Math.max(0, (t - rippleStart - delay) / 0.7);
card.style.opacity = easeOut(Math.min(1, localT));

// Plus overall scale 1.25 → 0.94
const galleryScale = 1.25 - 0.31 * easeOut(rippleProgress);
```

### Pattern D · Sinusoidal Pan (continuous drift)

Sine wave + linear drift combined — avoid the "has-a-start, has-an-end" feel of a marquee loop:

```js
const panX = Math.sin(panT * 0.12) * 220 - panT * 8;    // Drift left
const panY = Math.cos(panT * 0.09) * 120 - panT * 5;    // Drift up
const clampedX = Math.max(-900, Math.min(900, panX));   // Prevent edge reveal
```

**Parameters**:
- Sine period `0.09–0.15 rad/s` (slow — about 30–50 s per swing)
- Linear drift `5–8 px/s` (slower than a viewer's blink)
- Amplitude `120–220 px` (large enough to feel, small enough to not nauseate)

### Pattern E · Focus Overlay (focus switching)

**Key design**: the focus overlay is a **flat element** (no tilt), floating above the tilted canvas. The selected slide scales from tile size (~400×225) to screen center (960×540); the background canvas does **not** change tilt but **dims to 45%**:

```js
// Focus overlay (flat, centered)
focusOverlay.style.width = (startW + (endW - startW) * focusIntensity) + 'px';
focusOverlay.style.height = (startH + (endH - startH) * focusIntensity) + 'px';
focusOverlay.style.opacity = focusIntensity;

// Background cards dim, but still visible (key! don't 100% mask)
card.style.opacity = entryOp * (1 - 0.55 * focusIntensity);   // 1 → 0.45
card.style.filter = `brightness(${1 - 0.3 * focusIntensity})`;
```

**Sharpness ironclad rules**:
- The Focus overlay's `<img>` must point its `src` directly at the original asset — **don't reuse the compressed thumbnail in the gallery**
- Preload all originals into a `new Image()[]` array
- The overlay's own `width/height` is computed each frame; the browser resamples the original each frame

---

## Timeline architecture (reusable skeleton)

```js
const T = {
  DURATION: 25.0,
  s1_in: [0.0, 0.8],    s1_type: [1.0, 3.2],  s1_out: [3.5, 4.0],
  s2_in: [3.9, 5.1],    s2_hold: [5.1, 7.0],  s2_out: [7.0, 7.8],
  s3_hold: [7.8, 8.3],  s3_ripple: [8.3, 10.0],
  panStart: 8.6,
  focuses: [
    { start: 11.0, end: 12.7, idx: 2  },
    { start: 13.3, end: 15.0, idx: 3  },
    { start: 15.6, end: 17.3, idx: 10 },
    { start: 17.9, end: 19.6, idx: 16 },
  ],
  s4_walloff: [21.1, 21.8], s4_in: [21.8, 22.7], s4_hold: [23.7, 25.0],
};

// Core easing
const easeOut = t => 1 - Math.pow(1 - t, 3);
const easeInOut = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2, 3)/2;
function lerp(time, start, end, fromV, toV, easing) {
  if (time <= start) return fromV;
  if (time >= end) return toV;
  let p = (time - start) / (end - start);
  if (easing) p = easing(p);
  return fromV + (toV - fromV) * p;
}

// Single render(t) function reads timestamp, writes all elements
function render(t) { /* ... */ }
requestAnimationFrame(function tick(now) {
  const t = ((now - startMs) / 1000) % T.DURATION;
  render(t);
  requestAnimationFrame(tick);
});
```

**Architectural essence**: **all state is derived from the timestamp t** — no state machine, no setTimeout. This means:
- Any moment can be jumped to with `window.__setTime(12.3)` (handy for Playwright frame-by-frame capture)
- Loops are seamless by construction (t mod DURATION)
- Any frame can be frozen for debugging

---

## Texture details (easy to overlook but lethal)

### 1. SVG noise texture

A light background's worst enemy is "too flat". Layer a very weak fractalNoise:

```html
<style>
.stage::before {
  content: '';
  position: absolute; inset: 0;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.078  0 0 0 0 0.078  0 0 0 0 0.074  0 0 0 0.035 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
  opacity: 0.5;
  pointer-events: none;
  z-index: 30;
}
</style>
```

You won't notice it's there — but you will when it's gone.

### 2. Corner brand mark

```html
<div class="corner-brand">
  <div class="mark"></div>
  <div>VINEX22 · DESIGN</div>
</div>
```

```css
.corner-brand {
  position: absolute; top: 48px; left: 72px;
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--muted);
}
```

Only shown during the gallery wall scene; fades in and out. Like a museum exhibit label.

### 3. Brand-resolve wordmark

```css
.brand-wordmark {
  font-family: var(--sans);
  font-size: 148px;
  font-weight: 700;
  letter-spacing: -0.045em;   /* Negative letter-spacing is the key — tightens the letters into a mark */
}
.brand-wordmark .accent {
  color: var(--accent);
  font-weight: 500;           /* Accent character is actually thinner — visual contrast */
}
```

`letter-spacing: -0.045em` is the standard for Apple product page large type.

---

## Common failure modes

| Symptom | Cause | Fix |
|---|---|---|
| Looks like a PowerPoint template | Cards have no shadow / hairline | Add the two-layer box-shadow + 1px border |
| Tilt feels cheap | Used only rotateY, no rotateZ | Add ±2–3deg rotateZ to break the regularity |
| Pan feels "stuttery" | Used setTimeout or CSS keyframes loop | Use rAF + sin/cos continuous functions |
| Text in focus is unreadable | Reused the low-res gallery thumbnail | Independent overlay + original src directly |
| Background too empty | Solid `#F5F5F7` | Layer SVG fractalNoise at 0.5 opacity |
| Type feels "internet-y" | Only Inter | Add Serif + Mono — triple stack |

---

## Note on audio

For the dual-track audio rules referenced by gallery scenes, see [`audio-design-rules.md`](audio-design-rules.md). Audio binaries (`bgm-*.mp3`, SFX library) are not bundled with this skill — see the regeneration notes in `audio-design-rules.md` and `sfx-library.md`.

---

## References

- Original inspiration: claude.ai/design hero video
- Reference taste: Apple product pages, Dribbble shot collection pages

When you hit a need for "multi-piece high-quality output exhibition", copy the skeleton from this file, swap content, tune timing.
