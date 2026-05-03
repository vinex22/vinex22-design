# Animation Pitfalls: HTML-animation traps and rules

The bugs you'll most often hit when building animations, and how to avoid them. Each rule comes from a real failure case.

Read this before writing animation code — it saves a round of iteration.

## 1. Stacking layout — `position: relative` is the default duty

**The bug**: A `sentence-wrap` element wrapped 3 `bracket-layer`s (`position: absolute`). It had no `position: relative`, so the absolute brackets used `.canvas` as the coordinate system and floated 200 px below the viewport.

**Rules**:
- Any container with `position: absolute` children **must** explicitly set `position: relative`
- Even when no offset is needed, write `position: relative` as a coordinate anchor
- When writing `.parent { … }` whose children have `.child { position: absolute }`, instinctively add `relative` to parent

**Quick check**: for every `position: absolute`, walk up the ancestors and confirm the nearest positioned ancestor is the *intended* coordinate system.

## 2. Character traps — don't depend on rare Unicode

**The bug**: wanted to use `␣` (U+2423 OPEN BOX) to visualize a "space token". Noto Serif SC / Cormorant Garamond don't have this glyph; renders as blank / tofu — viewers can't see it at all.

**Rules**:
- **Every character that appears in the animation must exist in the font you chose**
- Common rare-character blacklist: `␣ ␀ ␐ ␋ ␨ ↩ ⏎ ⌘ ⌥ ⌃ ⇧ ␦ ␖ ␛`
- To express meta-characters like "space / enter / tab", use a **CSS-constructed semantic box**:
  ```html
  <span class="space-key">Space</span>
  ```
  ```css
  .space-key {
    display: inline-flex;
    padding: 4px 14px;
    border: 1.5px solid var(--accent);
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.3em;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  ```
- Validate emoji too: some emoji fall back to a gray box outside Noto Emoji; prefer the `emoji` font-family or SVG

## 3. Data-driven Grid / Flex templates

**The bug**: code has `const N = 6` tokens but CSS hard-codes `grid-template-columns: 80px repeat(5, 1fr)`. The 6th token has no column; the entire matrix is misaligned.

**Rules**:
- When count comes from a JS array (`TOKENS.length`), the CSS template should be data-driven too
- Option A: inject a CSS variable from JS
  ```js
  el.style.setProperty('--cols', N);
  ```
  ```css
  .grid { grid-template-columns: 80px repeat(var(--cols), 1fr); }
  ```
- Option B: use `grid-auto-flow: column` and let the browser auto-extend
- **Forbid the "fixed number + JS constant" combo** — change N and CSS won't sync

## 4. Transition gaps — scene changes must be continuous

**The bug**: between zoom1 (13–19s) → zoom2 (19.2–23s), the main sentence is already hidden, zoom1 fade-out (0.6s) + zoom2 fade-in (0.6s) + stagger delay (0.2s+) ≈ 1 s of pure blank screen. Viewers think the animation is frozen.

**Rules**:
- For continuous scene changes, fade-out and fade-in must **cross-overlap** — not "previous fully gone, then start the next"
  ```js
  // Bad:
  if (t >= 19) hideZoom('zoom1');      // 19.0s out
  if (t >= 19.4) showZoom('zoom2');    // 19.4s in → 0.4s blank in between

  // Good:
  if (t >= 18.6) hideZoom('zoom1');    // start fading 0.4s earlier
  if (t >= 18.6) showZoom('zoom2');    // simultaneous fade-in (cross-fade)
  ```
- Or use an "anchor element" (such as the main sentence) as a visual link between scenes; it briefly returns during the zoom switch
- Calculate CSS transition `duration` carefully so the next event doesn't fire before the previous transition finishes

## 5. Pure-render principle — animation state should be seekable

**The bug**: used `setTimeout` + `fireOnce(key, fn)` to chain-trigger animation states. Plays fine normally, but for frame-by-frame recording / seek-to-arbitrary-time, previously fired setTimeouts can't "go back in time".

**Rules**:
- The `render(t)` function should ideally be a **pure function**: given t, output a unique DOM state
- If side effects are unavoidable (e.g. class toggling), pair a `fired` set with explicit reset:
  ```js
  const fired = new Set();
  function fireOnce(key, fn) { if (!fired.has(key)) { fired.add(key); fn(); } }
  function reset() { fired.clear(); /* clear all .show classes */ }
  ```
- Expose `window.__seek(t)` for Playwright / debugging:
  ```js
  window.__seek = (t) => { reset(); render(t); };
  ```
- Animation-related setTimeouts must not span > 1s, or seek-back will break

## 6. Measuring before fonts load = measuring wrong

**The bug**: page calls `charRect(idx)` to measure bracket positions on `DOMContentLoaded`. Fonts haven't loaded yet, so each character's width is the fallback font's width — positions all wrong. By the time the font loads (~500ms later), the bracket's `left: Xpx` is the old value, permanently off.

**Rules**:
- Any layout code that depends on DOM measurement (`getBoundingClientRect`, `offsetWidth`) **must** be wrapped in `document.fonts.ready.then()`
  ```js
  document.fonts.ready.then(() => {
    requestAnimationFrame(() => {
      buildBrackets(...);  // fonts ready, measurement is accurate
      tick();              // animation starts
    });
  });
  ```
- An extra `requestAnimationFrame` gives the browser one frame to commit layout
- If using Google Fonts CDN, `<link rel="preconnect">` speeds up first load

## 7. Recording prep — leave handles for video export

**The bug**: Playwright `recordVideo` is 25fps and starts recording the moment the context is created. Page-load and font-load — the first 2 seconds — get recorded. The first 2 seconds of the delivered video are blank / a flash.

**Rules**:
- Provide a `render-video.js` tool to handle: warmup navigate → reload restart animation → wait duration → ffmpeg trim head + convert to H.264 MP4
- The animation's **frame 0** must be a complete initial state with the final layout in place (not blank or "loading")
- Want 60fps? Use ffmpeg `minterpolate` post-processing — don't expect it from the browser source frame rate
- Want a GIF? Two-stage palette (`palettegen` + `paletteuse`) — a 30 s 1080p animation can be compressed to ~3 MB

See `video-export.md` for the full script invocation.

## 8. Batch export — tmp directory must include PID to avoid concurrency collisions

**The bug**: ran 3 `render-video.js` processes in parallel for 3 HTMLs. TMP_DIR was named with only `Date.now()`; the 3 processes started in the same millisecond and shared one tmp directory. The first to finish cleaned tmp; the other two hit `ENOENT` reading the directory and all crashed.

**Rules**:
- Any temp directory possibly shared across processes must be named with **PID or a random suffix**:
  ```js
  const TMP_DIR = path.join(DIR, '.video-tmp-' + Date.now() + '-' + process.pid);
  ```
- For genuine multi-file parallelism, use shell `&` + `wait` rather than forking inside one node script
- Recording many HTMLs: conservative approach is **serial** (≤ 2 in parallel; ≥ 3 just queue them)

## 9. Progress bar / replay button in the recording — Chrome elements pollute the video

**The bug**: animation HTML had `.progress` bar, `.replay` button, `.counter` timestamp — convenient for human debugging. When recorded as MP4, these appear at the bottom of the video, like the developer tools were screenshotted in.

**Rules**:
- "Chrome elements" in HTML for human use (progress bar / replay button / footer / masthead / counter / phase labels) and the video content body are managed separately
- **Convention class name** `.no-record`: any element with this class is auto-hidden by the recording script
- The script side (`render-video.js`) injects CSS by default to hide common chrome class names:
  ```
  .progress .counter .phases .replay .masthead .footer .no-record [data-role="chrome"]
  ```
- Inject via Playwright's `addInitScript` (takes effect before each navigate; survives reload)
- To view the original HTML (with chrome), add the `--keep-chrome` flag

## 10. First few seconds of recording repeat — warmup frame leak

**The bug**: the old `render-video.js` flow was `goto → wait fonts 1.5s → reload → wait duration`. Recording starts at context creation, so during warmup the animation already played part-way; reload restarted from 0. The first few seconds of the video were "mid-animation + switch + animation from 0", with a strong duplicated feel.

**Rules**:
- **Warmup and Record must use independent contexts**:
  - Warmup context (no `recordVideo`): only loads url, waits for fonts, then closes
  - Record context (with `recordVideo`): fresh state, animation starts recording from t=0
- ffmpeg `-ss trim` can only crop a tiny bit of Playwright startup latency (~0.3 s); it **cannot** mask warmup frames — the source must be clean
- Closing the recording context = WebM file flushed to disk (Playwright constraint)
- Pattern:
  ```js
  // Phase 1: warmup (throwaway)
  const warmupCtx = await browser.newContext({ viewport });
  const warmupPage = await warmupCtx.newPage();
  await warmupPage.goto(url, { waitUntil: 'networkidle' });
  await warmupPage.waitForTimeout(1200);
  await warmupCtx.close();

  // Phase 2: record (fresh)
  const recordCtx = await browser.newContext({ viewport, recordVideo });
  const page = await recordCtx.newPage();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(DURATION * 1000);
  await page.close();
  await recordCtx.close();
  ```

## 11. Don't draw "fake chrome" inside the canvas — decorative player UI collides with real chrome

**The bug**: animation uses `Stage`, which already has scrubber + timecode + pause button (these are `.no-record` chrome and auto-hidden when exporting). I also drew a "magazine-page-feel decorative progress bar" at the bottom: `00:60 ──── CLAUDE-DESIGN / ANATOMY`. Felt good. **Result**: viewers saw two progress bars — one is the Stage controller, one is my decoration. Visual collision; identified as a bug. "Why is there another progress bar inside the video?"

**Rules**:

- Stage already provides: scrubber + timecode + pause / replay button. **Don't redraw inside the canvas** any progress indicator, current timecode, copyright strip, chapter counter — they either collide with chrome, or are filler slop (violating the "earn its place" principle).
- "Page-number feel", "magazine feel", "bottom signature strip" — these **decorative urges** are high-frequency filler the AI auto-adds. Each appearance is a red flag — does it really convey irreplaceable information, or is it just filling space?
- If you're sure a bottom strip must exist (e.g. the animation's subject is player UI itself), it must be **narratively necessary** and **visually clearly distinct** from the Stage scrubber (different position, form, color).

**Element ownership test** (every element drawn into the canvas must answer):

| What it is | Treatment |
|---|---|
| Narrative content of a scene | OK, keep it |
| Global chrome (control / debug) | Add `.no-record` class; hide on export |
| **Neither — not part of any scene, not chrome** | **Delete**. It's an orphan; necessarily filler slop |

**Self-check (3 seconds before delivery)**: take a static screenshot, ask yourself —

- Is there anything in the frame that looks like "video player UI" (horizontal progress bar, timecode, button-shaped element)?
- If yes — does removing it hurt the narrative? If no harm, delete.
- Has the same kind of info (progress / time / signature) appeared twice? Consolidate to one chrome location.

**Anti-examples**: bottom `00:42 ──── PROJECT NAME` strip; bottom-right "CH 03 / 06" chapter counter; edge "v0.3.1" version label — all are fake-chrome filler.

## 12. Recording leading blank + recording-start offset — `__ready` × tick × lastTick triple trap

**The bug (A · leading blank)**: 60 s animation exported to MP4; the first 2–3 seconds is a blank page. `ffmpeg --trim=0.3` doesn't crop it.

**The bug (B · start offset, 2026-04-20 real incident)**: Exported a 24 s video. User said "video doesn't really start until second 19". Actually the animation began recording at t=5 and recorded to t=24, then looped to t=0 and recorded another 5 s — so the last 5 s of the video is the actual beginning of the animation.

**Root cause** (both bugs share one root):

Playwright `recordVideo` starts writing WebM the moment `newContext()` is called, while Babel / React / fonts loading takes L seconds (2–6 s). The recording script waits for `window.__ready = true` as the "animation starts here" anchor — it must be strictly paired with animation `time = 0`. Two common mistakes:

| Mistake | Symptom |
|---|---|
| `__ready` set in `useEffect` or sync setup (before tick's first frame) | Recording script thinks animation started, but WebM is still recording the blank page → **leading blank** |
| `lastTick = performance.now()` initialized at **script top level** | Font-load L seconds is counted into the first frame's `dt`, `time` jumps to L → entire recording lags by L seconds → **start offset** |

**✅ The correct full starter-tick template** (hand-written animation must use this skeleton):

```js
// ━━━━━━ state ━━━━━━
let time = 0;
let playing = false;   // ❗ default not playing; only start once fonts ready
let lastTick = null;   // ❗ sentinel — first tick frame forces dt=0 (don't use performance.now())
const fired = new Set();

// ━━━━━━ tick ━━━━━━
function tick(now) {
  if (lastTick === null) {
    lastTick = now;
    window.__ready = true;   // ✅ pair: "recording start" and "animation t=0" share this frame
    render(0);               // render once more to ensure DOM is ready (fonts now ready)
    requestAnimationFrame(tick);
    return;
  }
  const dt = (now - lastTick) / 1000;   // dt only advances after first frame
  lastTick = now;

  if (playing) {
    let t = time + dt;
    if (t >= DURATION) {
      t = window.__recording ? DURATION - 0.001 : 0;  // don't loop while recording; keep 0.001 s for last frame
      if (!window.__recording) fired.clear();
    }
    time = t;
    render(time);
  }
  requestAnimationFrame(tick);
}

// ━━━━━━ boot ━━━━━━
// don't immediately rAF at top level — start only after fonts load
document.fonts.ready.then(() => {
  render(0);                 // draw the initial frame first (fonts ready)
  playing = true;
  requestAnimationFrame(tick);  // first tick will pair __ready + t=0
});

// ━━━━━━ seek interface (defensive correction by render-video) ━━━━━━
window.__seek = (t) => { fired.clear(); time = t; lastTick = null; render(t); };
```

**Why this template is right**:

| Detail | Why it must be this way |
|---|---|
| `lastTick = null` + first-frame `return` | Avoids "script-load to first tick" L seconds being counted into animation time |
| `playing = false` default | During font load even if `tick` runs, time doesn't advance — avoids wrong rendering |
| `__ready` set on tick's first frame | Recording script starts its clock here; the corresponding frame is the animation's true t=0 |
| Start tick inside `document.fonts.ready.then(...)` | Avoids fallback-font width measurement; avoids font-jump in first frame |
| `window.__seek` exists | Lets `render-video.js` actively correct — second line of defense |

**Corresponding defenses on the recording-script side**:
1. `addInitScript` injects `window.__recording = true` (before page goto)
2. `waitForFunction(() => window.__ready === true)`; record this offset for ffmpeg trim
3. **Plus**: after `__ready`, actively `page.evaluate(() => window.__seek && window.__seek(0))` to force any HTML time drift back to zero — second line of defense for HTMLs that don't strictly follow the starter template

**How to verify**: after exporting MP4
```bash
ffmpeg -i video.mp4 -ss 0 -vframes 1 frame-0.png
ffmpeg -i video.mp4 -ss $DURATION-0.1 -vframes 1 frame-end.png
```
Frame 0 must be the animation's t=0 initial state (not mid-animation, not black). The end frame must be the animation's terminal state (not some moment from a second loop).

**Reference implementations**: the `Stage` component in `assets/animations.jsx` and `scripts/render-video.js` already implement this protocol. Hand-written HTML must use the starter-tick template — every line guards against a specific bug.

## 13. Disable looping while recording — `window.__recording` signal

**The bug**: animation Stage defaults to `loop=true` (convenient when watching in the browser). `render-video.js` waits 300 ms past `duration` before stopping, and that 300 ms lets Stage enter the next loop. ffmpeg `-t DURATION` cuts it, but the last 0.5–1 s falls into the next loop — the video ends by suddenly snapping back to the first frame (Scene 1); viewers think the video has a bug.

**Root cause**: the recording script and the HTML have no "I'm recording" handshake. The HTML doesn't know it's being recorded and keeps looping like a browser interaction.

**Rules**:

1. **Recording script**: in `addInitScript`, inject `window.__recording = true` (before page goto):
   ```js
   await recordCtx.addInitScript(() => { window.__recording = true; });
   ```

2. **Stage component**: detect this signal and force `loop=false`:
   ```js
   const effectiveLoop = (typeof window !== 'undefined' && window.__recording) ? false : loop;
   // ...
   if (next >= duration) return effectiveLoop ? 0 : duration - 0.001;
   //                                                       ↑ keep 0.001 to prevent Sprite end=duration from being closed
   ```

3. **Closing Sprite's fadeOut**: in recording mode, set `fadeOut={0}`. Otherwise the video end fades to transparent / dark — users expect to land on the clean last frame, not a fade-out. For hand-written HTML, set `fadeOut={0}` on the closing Sprite by default.

**Reference implementations**: the Stage in `assets/animations.jsx` and `scripts/render-video.js` already implement the handshake. Hand-rolled Stage must implement `__recording` detection or it will hit this bug.

**Verify**: after export, `ffmpeg -ss 19.8 -i video.mp4 -frames:v 1 end.png` — check that the final 0.2 s is still the expected last frame, not abruptly switching to another scene.

## 14. 60 fps video defaults to frame duplication — minterpolate has poor compatibility

**The bug**: `convert-formats.sh` using `minterpolate=fps=60:mi_mode=mci…` produced a 60fps MP4 that some macOS QuickTime / Safari versions could not open (black or refused). VLC / Chrome could open it.

**Root cause**: minterpolate's H.264 elementary stream contains some SEI / SPS fields some players parse incorrectly.

**Rules**:

- Default 60fps uses simple `fps=60` filter (frame duplication) — broad compatibility (QuickTime / Safari / Chrome / VLC all fine)
- High-quality interpolation via the `--minterpolate` flag — but **always test the target player locally** before delivery
- The 60fps tag is mostly valuable for **upload-platform algorithm recognition** (Bilibili / YouTube prioritize 60fps for delivery); perceptual smoothness gain for CSS animation is small
- Add `-profile:v high -level 4.0` to improve H.264 universal compatibility

**`convert-formats.sh` defaults to compat mode**. For high-quality interpolation, add `--minterpolate`:
```bash
bash convert-formats.sh input.mp4 --minterpolate
```

## 15. `file://` + external `.jsx` CORS trap — single-file delivery must inline the engine

**The bug**: animation HTML uses `<script type="text/babel" src="animations.jsx"></script>` to load the engine externally. Open locally (file:// protocol) → Babel Standalone tries XHR for `.jsx` → Chrome reports `Cross origin requests are only supported for protocol schemes: http, https, chrome, chrome-extension…` → entire page goes black, no `pageerror`, only console error — easy to misdiagnose as "animation never fired".

Starting an HTTP server may not save you either — if your machine has a global proxy, `localhost` may also go through proxy, returning 502 / connection failure.

**Rules**:

- **Single-file delivery** (HTML that works on double-click) → `animations.jsx` must be **inlined** into a `<script type="text/babel">…</script>` tag; do not use `src="animations.jsx"`
- **Multi-file project** (HTTP-server demo) → external load is fine, but the delivery must clearly include `python3 -m http.server 8000` instructions
- Decision criterion: are you delivering "an HTML file" or "a project directory + server"? The former means inline
- The Stage component / animations.jsx is often 200+ lines — pasting it inside an HTML `<script>` block is totally fine; don't fear file size

**Minimum verification**: double-click the generated HTML, **do not** open via any server. The Stage must show the animation's first frame for the test to pass.

## 16. Cross-scene contrast contexts — in-frame elements must not hardcode color

**The bug**: when building multi-scene animations, elements like `ChapterLabel` / `SceneNumber` / `Watermark` that **appear across multiple scenes** had `color: '#1A1A1A'` hard-coded (dark text). The first 4 light-bg scenes were OK, but on scene 5 (black bg) the "05" and the watermark vanish — no errors, no checks triggered, key info invisible.

**Rules**:

- **In-frame elements reused across scenes** (chapter labels / scene numbers / timecodes / watermark / copyright strip) **must not hardcode color values**
- Use one of three approaches:
  1. **`currentColor` inheritance**: element only writes `color: currentColor`; the parent scene container sets `color: <computed>`
  2. **invert prop**: component takes `<ChapterLabel invert />` to switch dark/light manually
  3. **auto-compute from background**: `color: contrast-color(var(--scene-bg))` (CSS 4 new API, or compute in JS)
- Before delivery, use Playwright to capture **a representative frame of each scene** and human-eye-pass to confirm cross-scene elements are visible

The insidious thing about this bug — **no warning fires**. Only the human eye or OCR can catch it.

## Quick self-check (5 seconds before starting)

- [ ] Every parent of `position: absolute` has `position: relative`?
- [ ] All special characters (`␣` `⌘` `emoji`) in the animation exist in the chosen font?
- [ ] Grid / Flex template count matches JS array length?
- [ ] Cross-fade between scene changes; no > 0.3 s pure blank?
- [ ] DOM-measurement code wrapped in `document.fonts.ready.then()`?
- [ ] `render(t)` is pure, or has an explicit reset mechanism?
- [ ] Frame 0 is the complete initial state, not blank?
- [ ] No "fake chrome" decorations in the canvas (progress bar / timecode / bottom signature strip colliding with Stage scrubber)?
- [ ] Animation tick's first frame synchronously sets `window.__ready = true`? (Built into `assets/animations.jsx`; hand-rolled HTML must add it)
- [ ] Stage detects `window.__recording` to force `loop=false`? (Must add for hand-rolled HTML)
- [ ] Closing Sprite's `fadeOut` is 0 (video stops on clean last frame)?
- [ ] 60fps MP4 defaults to frame-duplication mode (compat); `--minterpolate` only for high quality?
- [ ] After export, sample frame 0 + last frame to verify they are animation initial / final state?
- [ ] For brand work (Stripe / Anthropic / Lovart / …): completed the Brand Asset Protocol (SKILL.md §1.a, the 5 steps)? Did you write `brand-spec.md`?
- [ ] Single-file HTML delivery: `animations.jsx` is inlined, not `src="…"`? (External `.jsx` over `file://` produces a CORS black screen)
- [ ] Cross-scene elements (chapter label / watermark / scene number) don't hardcode color, and are visible against every scene's background?
