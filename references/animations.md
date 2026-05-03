# Animations: timeline animation engine

Read this when building animation / motion-design HTML. Principles, usage, typical patterns.

## Core pattern: Stage + Sprite

Our animation system (`assets/animations.jsx`) provides a timeline-driven engine:

- **`<Stage>`**: container for the entire animation; auto-scales (fit viewport) + scrubber + play/pause/loop controls
- **`<Sprite start end>`**: a time slice. A Sprite renders only between `start` and `end`. Inside it, use the `useSprite()` hook to read its local progress `t` (0 → 1)
- **`useTime()`**: read current global time (seconds)
- **`Easing.easeInOut` / `Easing.easeOut` / …**: easing functions
- **`interpolate(t, from, to, easing?)`**: interpolate based on t

The pattern borrows from Remotion / After Effects but is lightweight and zero-dependency.

## Getting started

```html
<script type="text/babel" src="animations.jsx"></script>
<script type="text/babel">
  const { Stage, Sprite, useTime, useSprite, Easing, interpolate } = window.Animations;

  function Title() {
    const { t } = useSprite();  // local progress 0 → 1
    const opacity = interpolate(t, [0, 1], [0, 1], Easing.easeOut);
    const y = interpolate(t, [0, 1], [40, 0], Easing.easeOut);
    return (
      <h1 style={{
        opacity,
        transform: `translateY(${y}px)`,
        fontSize: 120,
        fontWeight: 900,
      }}>
        Hello.
      </h1>
    );
  }

  function Scene() {
    return (
      <Stage duration={10}>  {/* 10s animation */}
        <Sprite start={0} end={3}>
          <Title />
        </Sprite>
        <Sprite start={2} end={5}>
          <SubTitle />
        </Sprite>
        {/* ... */}
      </Stage>
    );
  }

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Scene />);
</script>
```

## Common animation patterns

### 1. Fade In / Fade Out

```jsx
function FadeIn({ children }) {
  const { t } = useSprite();
  const opacity = interpolate(t, [0, 0.3], [0, 1], Easing.easeOut);
  return <div style={{ opacity }}>{children}</div>;
}
```

**Note the range**: `[0, 0.3]` means complete the fade-in within the first 30% of the sprite, then hold opacity = 1.

### 2. Slide In

```jsx
function SlideIn({ children, from = 'left' }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, 0.4], [0, 1], Easing.easeOut);
  const offset = (1 - progress) * 100;
  const directions = {
    left: `translateX(-${offset}px)`,
    right: `translateX(${offset}px)`,
    top: `translateY(-${offset}px)`,
    bottom: `translateY(${offset}px)`,
  };
  return (
    <div style={{
      transform: directions[from],
      opacity: progress,
    }}>
      {children}
    </div>
  );
}
```

### 3. Per-character typewriter

```jsx
function Typewriter({ text }) {
  const { t } = useSprite();
  const charCount = Math.floor(text.length * Math.min(t * 2, 1));
  return <span>{text.slice(0, charCount)}</span>;
}
```

### 4. Number count-up

```jsx
function CountUp({ from = 0, to = 100, duration = 0.6 }) {
  const { t } = useSprite();
  const progress = interpolate(t, [0, duration], [0, 1], Easing.easeOut);
  const value = Math.floor(from + (to - from) * progress);
  return <span>{value.toLocaleString()}</span>;
}
```

### 5. Multi-phase explanation (typical educational animation)

```jsx
function Scene() {
  return (
    <Stage duration={20}>
      {/* Phase 1: show the problem */}
      <Sprite start={0} end={4}>
        <Problem />
      </Sprite>

      {/* Phase 2: show the approach */}
      <Sprite start={4} end={10}>
        <Approach />
      </Sprite>

      {/* Phase 3: show the result */}
      <Sprite start={10} end={16}>
        <Result />
      </Sprite>

      {/* Caption visible the entire time */}
      <Sprite start={0} end={20}>
        <Caption />
      </Sprite>
    </Stage>
  );
}
```

## Easing functions

Preset easing curves:

| Easing | Behavior | Use for |
|---|---|---|
| `linear` | constant velocity | scrolling captions, sustained motion |
| `easeIn` | slow → fast | exits / disappear |
| `easeOut` | fast → slow | enters / appear |
| `easeInOut` | slow → fast → slow | position change |
| **`expoOut`** ⭐ | **exponential ease-out** | **Anthropic-grade primary easing** (physical weight) |
| **`overshoot`** ⭐ | **elastic spring-back** | **toggles / button pop / emphasized interactions** |
| `spring` | spring | interaction feedback, geometry settle |
| `anticipation` | reverse first, then forward | emphasize the action |

**The default primary easing is `expoOut`** (not `easeOut`) — see `animation-best-practices.md` §2.
Use `expoOut` for entries, `easeIn` for exits, `overshoot` for toggles — the foundation of Anthropic-grade motion.

## Pacing and duration guide

### Micro-interactions (0.1–0.3s)
- Button hover
- Card expand
- Tooltip appear

### UI transitions (0.3–0.8s)
- Page switch
- Modal appear
- List-item add

### Narrative animation (2–10s per phase)
- A single phase explaining a concept
- Data-chart reveal
- Scene change

### Single narrative phase max 10s
Human attention is finite. 10 seconds for one idea, then move on.

## Order of thought when designing animation

### 1. Content / story first, animation second

**Wrong**: want to do a fancy animation first, then stuff content into it
**Right**: figure out the message first, then use animation as a tool to serve it

Animation is **signal**, not **decoration**. A fade-in says "this is important, look here" — if everything fades in, the signal is destroyed.

### 2. Write the timeline by Scene

```
0:00 - 0:03   Problem appears (fade in)
0:03 - 0:06   Problem zoomed / expanded (zoom + pan)
0:06 - 0:09   Solution arrives (slide in from right)
0:09 - 0:12   Solution explained (typewriter)
0:12 - 0:15   Result demonstrated (counter up + chart reveal)
0:15 - 0:18   One-line summary (static, read 3s)
0:18 - 0:20   CTA or fade out
```

Write the timeline first, then write the components.

### 3. Resources first

Images / icons / fonts the animation needs — **prepare them up front**. Don't break rhythm hunting for assets midway.

## Common issues

**Animation stutters**
→ Mostly layout thrashing. Use `transform` and `opacity`; do not animate `top` / `left` / `width` / `height` / `margin`. The browser GPU-accelerates `transform`.

**Animation too fast — can't read it**
→ A reader needs ≈ 100–150ms per character, ≈ 300–500ms per word. If you tell a story with text, leave at least 3s per sentence.

**Animation too slow — viewer is bored**
→ Interesting visual change must be dense. A static frame over 5 seconds is dull.

**Multiple animations interfering**
→ Use CSS `will-change: transform` to hint the browser the element will move; reduces reflow.

**Recording to video**
→ Use the skill's built-in toolchain (one command produces three formats): see `video-export.md`
- `scripts/render-video.js` — HTML → 25fps MP4 (Playwright + ffmpeg)
- `scripts/convert-formats.sh` — 25fps MP4 → 60fps MP4 + optimized GIF
- Want more precise frame rendering? Make `render(t)` a pure function — see `animation-pitfalls.md` §5

## Working with video tools

This skill produces **HTML animations** (running in the browser). If the final output is video footage:

- **Short animation / concept demo**: use this skill's HTML method → screen-record
- **Long-form video / narrative**: this skill focuses on HTML animation; for long video use an AI video-generation skill or professional video software
- **Motion graphics**: After Effects / Motion Canvas are more suitable

## On Popmotion etc.

If you really need physics animation (spring, decay, keyframes with precise timing), our engine can't, fall back to Popmotion:

```html
<script src="https://unpkg.com/popmotion@11.0.5/dist/popmotion.min.js"></script>
```

But **try our engine first**. 90% of cases are covered.
