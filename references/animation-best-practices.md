# Animation Best Practices · positive animation-design grammar

> Based on a deep teardown of the three official Anthropic product films (Claude Design / Claude Code Desktop / Claude for Word), distilled into "Anthropic-grade" animation design rules.
>
> Use together with `animation-pitfalls.md` (the trap list) — this file is **"do this"**, pitfalls is **"don't do this"**. They are orthogonal; read both.
>
> **Constraint statement**: this file only collects **motion logic and expressive style** — it **does not introduce specific brand color values**. Color decisions go through §1.a Brand Asset Protocol (extracted from a brand spec) or the Design Direction Advisor (each of the 20 philosophies has its own palette). This reference discusses **how it moves**, not **what color**.

---

## §0 · Who you are · identity & taste

> Read this section before any technical rule below. Rules **emerge from identity** — not the other way around.

### §0.1 Identity anchor

**You are a motion designer who has studied the motion archives of Anthropic / Apple / Pentagram / Field.io.**

When you make animation, you are not tweaking CSS transitions — you are using digital elements to **simulate a physical world**, making the viewer's subconscious believe "these objects have weight, inertia, and overshoot".

You don't make PowerPoint-style animation. You don't make "fade in fade out" animation. You make animation that **makes people believe the screen is a space they can reach into**.

### §0.2 Core beliefs (3)

1. **Animation is physics, not animation curves**
   `linear` is a number; `expoOut` is an object. You believe the pixels on screen deserve to be treated as "objects". Every easing choice answers the physical question: "how heavy is this element? how high is the friction?"

2. **Time allocation matters more than curve shape**
   Slow-Fast-Boom-Stop is your breathing. **Even-paced animation is a tech demo; rhythmic animation is narrative.** Slowing down at the right moment matters more than picking the right easing at the wrong moment.

3. **Yielding to the viewer is harder than showing off**
   A 0.5-second pause before a key result is **technique**, not compromise. **Giving the human brain reaction time is the highest virtue of an animator.** AI defaults to making a pause-free, info-dense animation — that is rookie-level. Your job is restraint.

### §0.3 Taste standard · what is beautiful

Your standard for "good" vs "great" is below. Each row has an **identification method** — when you see a candidate animation, use these questions to judge whether it qualifies, not a mechanical 14-rule checklist.

| Beauty dimension | Identification method (viewer reaction) |
|---|---|
| **Physical weight** | At animation end, the element "**lands**" stably — it doesn't "**stop**" there. Subconsciously the viewer thinks "this has weight" |
| **Yielding to viewer** | Before key info, there is a perceptible pause (≥ 300 ms) — viewer has time to "**see**" before continuing |
| **Whitespace** | Ending is abrupt + hold, not fade-to-black. The last frame is clean, definite, decisive |
| **Restraint** | The whole piece has only one "120% refined" moment; the other 80% is just-right — **showing off everywhere is a cheap signal** |
| **Hand feel** | Curves (not straight lines), irregular (not setInterval mechanical rhythm), with breathing |
| **Respect** | Show the tweaking process; show the bug fix — **don't hide the work; don't sell "magic"**. The AI is a collaborator, not a magician |

### §0.4 Self-check · viewer's first reaction method

After making an animation, **what is the viewer's first reaction?** — that is the only metric you optimize for.

| Viewer reaction | Tier | Diagnosis |
|---|---|---|
| "Looks pretty smooth" | good | Acceptable but no character — you're making PowerPoint |
| "This animation is really slick" | good+ | Technically right, but not stunning |
| "This thing actually looks like it's **floating off the desk**" | great | You touched physical weight |
| "This doesn't feel AI-made" | great+ | You touched the Anthropic threshold |
| "I want to **screenshot** this and post it" | great++ | You made the viewer want to spread it |

**The difference between great and good is not technical correctness — it's taste judgment.** Technically right + good taste = great. Technically right + empty taste = good. Technically wrong = not in the door.

### §0.5 Identity vs rules

§1–§8's technical rules are **execution means** of this identity in specific scenarios — not an independent rule list.

- For a scenario the rules don't cover → return to §0; judge by **identity**, don't guess
- When rules conflict → return to §0; judge by **taste standard** which one matters more
- To break a rule → first answer: "does this serve which §0.3 beauty?" If yes, break it. If not, don't.

Good. Read on.

---

## Overview · animation as physics, in three layers

The root of cheap-feeling AI-generated animation is — **it behaves like "numbers", not "objects"**. Real-world objects have mass, inertia, elasticity, overshoot. The "high-end feeling" of the three Anthropic films comes from giving digital elements a **physical-world set of motion rules**.

These rules have 3 layers:

1. **Narrative pacing layer**: the time allocation of Slow-Fast-Boom-Stop
2. **Motion-curve layer**: Expo Out / Overshoot / Spring — refuse linear
3. **Expression-language layer**: show the process, mouse arcs, Logo morph-collapse

---

## 1. Narrative pacing · the Slow-Fast-Boom-Stop 5-segment structure

All three Anthropic films, without exception, follow this structure:

| Segment | Share | Pace | Function |
|---|---|---|---|
| **S1 trigger** | ~15% | slow | Give human reaction time, build realism |
| **S2 generate** | ~15% | medium | The visual wow moment appears |
| **S3 process** | ~40% | fast | Show controllability / density / detail |
| **S4 burst** | ~20% | Boom | Camera pull-out / 3D pop-out / multi-panel surge |
| **S5 land** | ~10% | still | Brand Logo + abrupt stop |

**Concrete duration mapping** (15-second animation example):
S1 trigger 2s · S2 generate 2s · S3 process 6s · S4 burst 3s · S5 land 2s

**Forbidden**:
- ❌ even pacing (same info density per second) — viewer fatigue
- ❌ continuous high density — no peak, no memorable point
- ❌ tapered ending (fade out to transparent) — should be **abrupt stop**

**Self-check**: sketch 5 thumbnails on paper, each showing the climax frame of one segment. If the 5 sketches look similar, the pacing isn't there.

---

## 2. Easing philosophy · refuse linear, embrace physics

All motion in the three Anthropic films uses bezier curves with a "damping feel". The default cubic easeOut (`1-(1-t)³`) is **not sharp enough** — start isn't fast enough, stop isn't stable enough.

### Three core easings (built into animations.jsx)

```js
// 1. Expo Out · fast start, slow brake (most-used; default primary easing)
// CSS equivalent: cubic-bezier(0.16, 1, 0.3, 1)
Easing.expoOut(t) // = t === 1 ? 1 : 1 - Math.pow(2, -10 * t)

// 2. Overshoot · springy toggle / button pop-out
// CSS equivalent: cubic-bezier(0.34, 1.56, 0.64, 1)
Easing.overshoot(t)

// 3. Spring physics · geometry settle, natural landing
Easing.spring(t)
```

### Usage map

| Scene | Which easing |
|---|---|
| Card rise-in / panel entry / Terminal fade / focus overlay | **`expoOut`** (primary, most-used) |
| Toggle switch / button pop / emphasized interaction | `overshoot` |
| Preview geometry settle / physical landing / UI shake-bounce | `spring` |
| Continuous motion (e.g. mouse-trail interpolation) | `easeInOut` (preserves symmetry) |

### Counter-intuitive insight

Most product promo animations are **too fast and too hard**. `linear` makes digital elements feel like machines; `easeOut` is base-grade; `expoOut` is the technical root of the "high-end feel" — it gives digital elements a kind of **physical-world weight**.

---

## 3. Motion language · 8 shared principles

### 3.1 Don't use pure black / pure white as base

None of the three Anthropic films uses `#FFFFFF` or `#000000` as primary base color. **Color-temperatured neutrals** (warm or cool) carry "paper / canvas / desk" materiality and weaken the machine feel.

**Specific color-value decisions** go through §1.a Brand Asset Protocol (extracted from brand spec) or the Design Direction Advisor (each of the 20 philosophies has its own base scheme). This reference does not give specific color values — that is a **brand decision**, not a motion rule.

### 3.2 Easing is never linear

See §2.

### 3.3 Slow-Fast-Boom-Stop narrative

See §1.

### 3.4 Show the "process", not the "magic result"

- Claude Design shows tweak parameters and slider drags (not one-click perfect result)
- Claude Code shows code error + AI fix (not first-try success)
- Claude for Word shows Redline red-strike-green-add edits (not directly handing the final draft)

**Common subtext**: the product is a **collaborator, pair engineer, senior editor** — not a one-click magician. This precisely targets the professional user's pain points around "control" and "authenticity".

**Anti-AI slop**: AI defaults to "magic one-click success" animation (one click → perfect result) — the universal common denominator. **Reverse it** — show the process, show the tweak, show the bug-and-fix — that is the source of brand identity.

### 3.5 Mouse trail hand-drawn (curves + Perlin Noise)

Real human mouse motion isn't a straight line — it's "start acceleration → arc → decelerate-correct → click". A straight-line interpolated mouse trail **subconsciously feels rejecting**.

```js
// Quadratic bezier interpolation (start → control → end)
function bezierQuadratic(p0, p1, p2, t) {
  const x = (1-t)*(1-t)*p0[0] + 2*(1-t)*t*p1[0] + t*t*p2[0];
  const y = (1-t)*(1-t)*p0[1] + 2*(1-t)*t*p1[1] + t*t*p2[1];
  return [x, y];
}

// Path: start → off-mid control → end (creates an arc)
const path = [[100, 100], [targetX - 200, targetY + 80], [targetX, targetY]];

// Then layer tiny Perlin Noise (±2px) for "hand jitter"
const jitterX = (simpleNoise(t * 10) - 0.5) * 4;
const jitterY = (simpleNoise(t * 10 + 100) - 0.5) * 4;
```

### 3.6 Logo "morph-collapse" (Morph)

Logo entry in all three Anthropic films is **not a simple fade-in** — it is **a morph from the previous visual element**.

**Common pattern**: in the last 1–2 seconds, do Morph / Rotate / Converge so the entire narrative "collapses" onto the brand point.

**Low-cost implementation** (no real morph required):
Have the previous visual element "collapse" into a color block (scale → 0.1, translate to center); the block then "expands" into the wordmark. Transition: 150 ms quick cut + motion blur (`filter: blur(6px)` → `0`).

```jsx
<Sprite start={13} end={14}>
  {/* Collapse: previous element scale 0.1, opacity hold, filter blur up */}
  const scale = interpolate(t, [0, 0.5], [1, 0.1], Easing.expoOut);
  const blur = interpolate(t, [0, 0.5], [0, 6]);
</Sprite>
<Sprite start={13.5} end={15}>
  {/* Expand: Logo scales 0.1 → 1 from block center, blur 6 → 0 */}
  const scale = interpolate(t, [0, 0.6], [0.1, 1], Easing.overshoot);
  const blur = interpolate(t, [0, 0.6], [6, 0]);
</Sprite>
```

### 3.7 Serif + sans-serif dual fonts

- **Brand / narration**: serif (carries "academic / publication / taste")
- **UI / code / data**: sans-serif + monospace

**Single-font is wrong.** Serif gives "taste"; sans-serif gives "function".

Specific font choices go through the brand spec (brand-spec.md's Display / Body / Mono triple-stack) or the Design Direction Advisor's 20 philosophies. This reference does not give specific font names — that is a **brand decision**.

### 3.8 Focus shift = background dim + foreground sharpen + flash guide

Focus shift **is not just** lowering opacity. The full recipe is:

```js
// Filter combination for non-focus elements
tile.style.filter = `
  brightness(${1 - 0.5 * focusIntensity})
  saturate(${1 - 0.3 * focusIntensity})
  blur(${focusIntensity * 4}px)        // ← key: only blur creates real "stepping back"
`;
tile.style.opacity = 0.4 + 0.6 * (1 - focusIntensity);

// After focus completes, do a 150 ms flash highlight at the focus position to guide eye return
focusOverlay.animate([
  { background: 'rgba(255,255,255,0.3)' },
  { background: 'rgba(255,255,255,0)' }
], { duration: 150, easing: 'ease-out' });
```

**Why blur is mandatory**: with only opacity + brightness, off-focus elements are still "sharp"; visually, no "step back to background" effect. blur(4–8px) makes off-focus genuinely retreat one depth layer.

---

## 4. Concrete motion techniques (snippets you can copy)

### 4.1 FLIP / Shared Element Transition

Button "expands" into an input box — **not** "button disappears + new panel appears". The core is **the same DOM element** transitioning between two states, not two elements cross-fading.

```jsx
// Use Framer Motion layoutId
<motion.div layoutId="design-button">Design</motion.div>
// ↓ after click, same layoutId
<motion.div layoutId="design-button">
  <input placeholder="Describe your design..." />
</motion.div>
```

Native implementation: https://aerotwist.com/blog/flip-your-animations/

### 4.2 "Breathing" expansion (width → height)

Panel expansion is **not** stretching width and height at the same time, it is:
- First 40% of time: stretch width only (height stays small)
- Last 60% of time: width holds, height fills

This simulates "first unfold, then pour water" in the physical world.

```js
const widthT = interpolate(t, [0, 0.4], [0, 1], Easing.expoOut);
const heightT = interpolate(t, [0.3, 1], [0, 1], Easing.expoOut);
style.width = `${widthT * targetW}px`;
style.height = `${heightT * targetH}px`;
```

### 4.3 Staggered Fade-up (30 ms stagger)

Rows / cards / list items entering: **delay each element by 30 ms**, `translateY` from 10 px back to 0.

```js
rows.forEach((row, i) => {
  const localT = Math.max(0, t - i * 0.03);  // 30ms stagger
  row.style.opacity = interpolate(localT, [0, 0.3], [0, 1], Easing.expoOut);
  row.style.transform = `translateY(${
    interpolate(localT, [0, 0.3], [10, 0], Easing.expoOut)
  }px)`;
});
```

### 4.4 Non-linear breathing · 0.5s pause before key result

Machines execute fast and continuously, but **pause 0.5 seconds before key results**, giving the viewer's brain reaction time.

```jsx
// Typical scene: AI generation done → pause 0.5s → result reveals
<Sprite start={8} end={8.5}>
  {/* 0.5s hold — nothing moves; let the viewer stare at loading */}
  <LoadingState />
</Sprite>
<Sprite start={8.5} end={10}>
  <ResultAppear />
</Sprite>
```

**Anti-example**: AI generation done → seamlessly cuts to result — viewer has no reaction time, info loss.

### 4.5 Chunk reveal · simulate token streaming

AI-generating text — **don't** use `setInterval` single-character pop-out (like old subtitles); use **chunk reveal** — 2–5 characters at a time, irregular intervals, simulating real token streaming.

```js
// Split by chunks, not characters
const chunks = text.split(/(\s+|,\s*|\.\s*|;\s*)/);  // by word + punctuation
let i = 0;
function reveal() {
  if (i >= chunks.length) return;
  element.textContent += chunks[i++];
  const delay = 40 + Math.random() * 80;  // irregular 40–120ms
  setTimeout(reveal, delay);
}
reveal();
```

### 4.6 Anticipation → Action → Follow-through

Three of Disney's 12 principles. Anthropic uses them very explicitly:

- **Anticipation**: small reverse motion before the action (button slightly shrinks, then springs out)
- **Action**: the main action itself
- **Follow-through**: aftermath after the action (card lands, then small bounce)

```js
// Full three-segment card entry
const anticip = interpolate(t, [0, 0.2], [1, 0.95], Easing.easeIn);     // anticipate
const action  = interpolate(t, [0.2, 0.7], [0.95, 1.05], Easing.expoOut); // action
const settle  = interpolate(t, [0.7, 1], [1.05, 1], Easing.spring);       // settle
// final scale = product or piecewise
```

**Anti-example**: animation with only Action and no Anticipation + Follow-through feels like "PowerPoint animation".

### 4.7 3D Perspective + translateZ layering

For "tilted 3D + floating cards" feel, give the container `perspective`, give individual elements different `translateZ`:

```css
.stage-wrap {
  perspective: 2400px;
  perspective-origin: 50% 30%;  /* slight overhead */
}
.card-grid {
  transform-style: preserve-3d;
  transform: rotateX(8deg) rotateY(-4deg);  /* golden ratio */
}
.card:nth-child(3n) { transform: translateZ(30px); }
.card:nth-child(5n) { transform: translateZ(-20px); }
.card:nth-child(7n) { transform: translateZ(60px); }
```

**Why rotateX 8° / rotateY -4° is the golden ratio**:
- Greater than 10° → element distortion is too strong, looks like "falling over"
- Less than 5° → looks like "skew" not "perspective"
- The asymmetric 8° × -4° simulates "camera in upper-left of desk looking down" natural angle

### 4.8 Diagonal Pan · move XY simultaneously

Camera motion isn't pure up-down or pure left-right — **move XY at the same time** to simulate diagonal motion:

```js
const panX = Math.sin(flowT * 0.22) * 40;
const panY = Math.sin(flowT * 0.35) * 30;
stage.style.transform = `
  translate(-50%, -50%)
  rotateX(8deg) rotateY(-4deg)
  translate3d(${panX}px, ${panY}px, 0)
`;
```

**Key**: X and Y frequencies differ (0.22 vs 0.35), avoiding regularized Lissajous loops.

---

## 5. Scene recipes (three narrative templates)

The three reference videos correspond to three product personalities. **Choose the one that fits your product best** — don't mix.

### Recipe A · Apple Keynote dramatic (Claude Design type)

**Best for**: major version launch, hero animation, visual-wow first
**Pacing**: Slow-Fast-Boom-Stop strong arc
**Easing**: throughout `expoOut` + a little `overshoot`
**SFX density**: high (~0.4/s); SFX pitch tuned to BGM scale
**BGM**: IDM / minimal tech-electronic, cool + precise
**Resolve**: camera fast pull-out → drop → Logo morph → ethereal single tone → abrupt stop

### Recipe B · One-take tool (Claude Code type)

**Best for**: developer tools, productivity apps, flow scenes
**Pacing**: continuous steady flow, no obvious peaks
**Easing**: `spring` physics + `expoOut`
**SFX density**: **0** (rhythm purely BGM-driven)
**BGM**: Lo-fi Hip-hop / Boom-bap, 85–90 BPM
**Core technique**: key UI actions land on BGM kick / snare transients — "**music groove IS the interaction SFX**"

### Recipe C · Office productivity narrative (Claude for Word type)

**Best for**: enterprise software, document / spreadsheet / calendar, professional-feel first
**Pacing**: many scenes, hard cuts + Dolly In/Out
**Easing**: `overshoot` (toggle) + `expoOut` (panel)
**SFX density**: medium (~0.3/s), mostly UI clicks
**BGM**: Jazzy Instrumental, minor key, BPM 90–95
**Core highlight**: one scene must contain "the whole-piece highlight" — 3D pop-out / lift off the plane

---

## 6. Anti-examples · this is AI slop

| Anti-pattern | Why wrong | Right way |
|---|---|---|
| `transition: all 0.3s ease` | `ease` is a relative of linear; all elements move at same rate | Use `expoOut` + per-element stagger |
| All entries `opacity 0→1` | No motion-direction sense | Combine `translateY 10→0` + Anticipation |
| Logo fade-in | No narrative resolution | Morph / Converge / collapse-expand |
| Mouse moves in straight line | Subconscious machine feel | Bezier arc + Perlin Noise |
| Typewriter single-character pop (setInterval) | Like old subtitles | Chunk Reveal, random intervals |
| No pause before key result | Viewer has no reaction time | 0.5s pause before result |
| Focus shift only changes opacity | Off-focus still sharp | opacity + brightness + **blur** |
| Pure black / pure white background | Cyber feel / glare fatigue | Color-temperatured neutral (per brand spec) |
| All animations equally fast | No rhythm | Slow-Fast-Boom-Stop |
| Fade-out ending | No decisiveness | Abrupt stop (hold last frame) |

---

## 7. Self-check (60 seconds before delivery)

- [ ] Narrative structure is Slow-Fast-Boom-Stop, not even pacing?
- [ ] Default easing is `expoOut`, not `easeOut` or `linear`?
- [ ] Toggles / button pops use `overshoot`?
- [ ] Cards / list entries have 30 ms stagger?
- [ ] 0.5 s pause before key result?
- [ ] Typewriter uses chunk reveal, not setInterval per character?
- [ ] Focus shift has blur (not just opacity)?
- [ ] Logo is morph-collapse, not fade-in?
- [ ] Background isn't pure black / pure white (color-temperatured)?
- [ ] Text has serif + sans-serif hierarchy?
- [ ] Ending is abrupt, not tapered?
- [ ] (If mouse) trail is curve, not straight line?
- [ ] SFX density matches product personality (see Recipes A/B/C)?
- [ ] BGM and SFX have a 6–8 dB loudness gap (see `audio-design-rules.md`)?

---

## 8. Relationship with other references

| Reference | Position | Relationship |
|---|---|---|
| `animation-pitfalls.md` | Technical traps (16 entries) | "**Don't do this**" · the inverse of this file |
| `animations.md` | Stage / Sprite engine usage | Foundation of **how to write** animation |
| `audio-design-rules.md` | Dual-track audio rules | Rules for **adding audio** to animation |
| `sfx-library.md` | 37 SFX inventory | SFX **asset library** |
| `apple-gallery-showcase.md` | Apple-gallery showcase style | A topic-piece on a specific motion style |
| **This file** | Positive motion-design grammar | "**Do this**" |

**Call order**:
1. Read SKILL.md workflow Step 3's "four position questions" first (decides narrative role and visual temperature)
2. After choosing a direction, read this file to settle the **motion language** (Recipes A/B/C)
3. When writing code, refer to `animations.md` and `animation-pitfalls.md`
4. When exporting video, follow `audio-design-rules.md` + `sfx-library.md`

---

## Appendix · sources

- Anthropic official animation teardown (internal study notes from the upstream author)
- Anthropic audio teardown (internal study notes from the upstream author)
- 3 reference videos analyzed via Gemini multi-modal (no specific brand color values, font names, or product names retained)
- **Strict filter**: this reference does not record any specific brand color values, font names, or product names. Color / font decisions go through §1.a Brand Asset Protocol or the 20 design philosophies.
