# Video Export: HTML animation → MP4 / GIF

After an animation HTML is finished, users often ask "can I export this as a video?" This is the full workflow.

## When to export

**Right time**:
- Animation runs end-to-end and is visually verified (Playwright screenshots confirm state at each time point)
- The user has watched it once in the browser and confirmed it looks good
- **Don't** export while animation bugs are unfixed — fixing after export costs more

**Trigger phrases the user might use**:
- "Can you export this as a video?"
- "Convert to MP4"
- "Make a GIF"
- "60fps"

## Output specs

By default, deliver three formats and let the user choose:

| Format | Spec | Best for | Typical size (30s) |
|---|---|---|---|
| MP4 25fps | 1920×1080 · H.264 · CRF 18 | Newsletters, embeds, YouTube | 1–2 MB |
| MP4 60fps | 1920×1080 · minterpolate · H.264 · CRF 18 | High-frame-rate showcase, portfolio | 1.5–3 MB |
| GIF | 960×540 · 15fps · palette-optimized | Twitter/X, README, Slack preview | 2–4 MB |

## Toolchain

Two scripts under `scripts/`:

### 1. `render-video.js` — HTML → MP4

Records a 25fps base MP4. Depends on a globally-installed playwright.

```bash
NODE_PATH=$(npm root -g) node /path/to/vinex22-design/scripts/render-video.js <html-file>
```

Optional flags:
- `--duration=30` animation duration (seconds)
- `--width=1920 --height=1080` resolution
- `--trim=2.2` seconds to trim from the start (removes reload + font-load time)
- `--fontwait=1.5` seconds to wait for fonts to load (raise when many fonts)

Output: same directory as the HTML, same filename with `.mp4`.

### 2. `add-music.sh` — MP4 + BGM → MP4

Mixes background music into a silent MP4. Picks BGM from the built-in library by mood, or accepts a custom audio file. Auto-matches duration, adds fade in/out.

```bash
bash add-music.sh <input.mp4> [--mood=<name>] [--music=<path>] [--out=<path>]
```

**Built-in BGM library** (at `assets/bgm-<mood>.mp3` — see `audio-design-rules.md` for sourcing notes since binaries are not bundled):

| `--mood=` | Style | Best for |
|-----------|-------|----------|
| `tech` (default) | Apple-Silicon / Apple-keynote — minimal synth + piano | Product launch, AI tool, skill promo |
| `ad` | upbeat modern electronic, with build + drop | Social ads, product teaser, promotion |
| `educational` | warm bright, light guitar / electric piano, inviting | Sci-pop, tutorial intro, course teaser |
| `educational-alt` | alternate of same family | same |
| `tutorial` | lo-fi ambient, almost no presence | Software demo, programming tutorial, long demo |
| `tutorial-alt` | alternate of same family | same |

**Behavior**:
- Music is trimmed to match video duration
- 0.3s fade-in + 1s fade-out (avoid hard cuts)
- Video stream `-c:v copy` (no re-encode); audio AAC 192k
- `--music=<path>` overrides `--mood`; can pass any external audio
- Wrong mood name lists all available options instead of failing silently

**Typical pipeline** (animation export trio + music):
```bash
node render-video.js animation.html                        # record
bash convert-formats.sh animation.mp4                      # derive 60fps + GIF
bash add-music.sh animation-60fps.mp4                      # add default tech BGM
# Or per-scenario:
bash add-music.sh tutorial-demo.mp4 --mood=tutorial
bash add-music.sh product-promo.mp4 --mood=ad --out=promo-final.mp4
```

### 3. `convert-formats.sh` — MP4 → 60fps MP4 + GIF

From an existing MP4, generate the 60fps version and the GIF.

```bash
bash /path/to/vinex22-design/scripts/convert-formats.sh <input.mp4> [gif_width] [--minterpolate]
```

Output (same directory as input):
- `<name>-60fps.mp4` — defaults to `fps=60` frame duplication (broad compatibility); add `--minterpolate` for high-quality interpolation
- `<name>.gif` — palette-optimized GIF (default 960 wide; configurable)

**60fps mode choice**:

| Mode | Command | Compatibility | Use when |
|---|---|---|---|
| Frame duplication (default) | `convert-formats.sh in.mp4` | QuickTime / Safari / Chrome / VLC all OK | General delivery, uploads, social media |
| minterpolate interpolation | `convert-formats.sh in.mp4 --minterpolate` | macOS QuickTime / Safari may refuse to open | High-quality showcase scenes; **always test target player locally before delivery** |

Why is the default frame duplication now? minterpolate's H.264 elementary stream has a known compat bug — when minterpolate was the default we kept hitting "macOS QuickTime won't open it". See `animation-pitfalls.md` §14.

`gif_width` parameter:
- 960 (default) — universal social-platform width
- 1280 — sharper but bigger
- 600 — Twitter/X load priority

## Full workflow (recommended)

When the user says "export as video":

```bash
cd <project-dir>

# Assume $SKILL points to this skill's root (substitute your install path)

# 1. Record 25fps base MP4
NODE_PATH=$(npm root -g) node "$SKILL/scripts/render-video.js" my-animation.html

# 2. Derive 60fps MP4 and GIF
bash "$SKILL/scripts/convert-formats.sh" my-animation.mp4

# Output:
# my-animation.mp4         (25fps · 1–2 MB)
# my-animation-60fps.mp4   (60fps · 1.5–3 MB)
# my-animation.gif         (15fps · 2–4 MB)
```

## Technical notes (for debugging)

### Playwright `recordVideo` quirks

- Frame rate is fixed at 25fps; can't directly record 60fps (Chromium headless compositor cap)
- Recording starts when the context is created — must use `trim` to drop the front-loaded reload time
- Default format is webm; need ffmpeg to convert to H.264 MP4 for general playback

`render-video.js` already handles all of the above.

### ffmpeg minterpolate parameters

Current config: `minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:me_mode=bidir:vsbmc=1`

- `mi_mode=mci` — motion-compensated interpolation
- `mc_mode=aobmc` — adaptive overlapped block motion compensation
- `me_mode=bidir` — bidirectional motion estimation
- `vsbmc=1` — variable-size block motion compensation

Works well for CSS **transform animations** (translate / scale / rotate).
For **pure fades**, may produce slight ghosting — if the user dislikes it, fall back to frame duplication:

```bash
ffmpeg -i input.mp4 -r 60 -c:v libx264 ... output.mp4
```

### Why GIF palette is two-stage

GIF is limited to 256 colors. A single-pass GIF flattens the whole animation into a generic 256-color palette — destroys subtle palettes like beige + orange.

Two-stage:
1. `palettegen=stats_mode=diff` — scan the entire video, generate **an optimal palette for this animation**
2. `paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle` — encode with that palette; `rectangle` diff updates only changed regions, drastically reducing file size

For fade transitions, `dither=bayer` is smoother than `none` — but produces a larger file.

## Pre-flight check (before exporting)

A 30-second self-check before exporting:

- [ ] HTML runs in the browser end-to-end with no console errors
- [ ] Frame 0 is a complete initial state (not a blank "loading…")
- [ ] Last frame is a stable resolution state (not cut off)
- [ ] Fonts / images / emoji all render correctly (see `animation-pitfalls.md`)
- [ ] `duration` parameter matches the actual animation length in the HTML
- [ ] Stage in the HTML detects `window.__recording` to force `loop=false` (mandatory for hand-rolled Stage; built into `assets/animations.jsx`)
- [ ] Closing Sprite has `fadeOut={0}` (final video frame should not fade out)
- [ ] Includes the "Created with vinex22-design" watermark (mandatory for animation scenes; for third-party brand work prepend "Unofficial · ". See SKILL.md "Skill promotion watermark".)

## Delivery message format

Standard format to give the user after export:

```
**Complete delivery**

| File | Format | Spec | Size |
|---|---|---|---|
| foo.mp4 | MP4 | 1920×1080 · 25fps · H.264 | X MB |
| foo-60fps.mp4 | MP4 | 1920×1080 · 60fps (motion interpolated) · H.264 | X MB |
| foo.gif | GIF | 960×540 · 15fps · palette-optimized | X MB |

**Notes**
- 60fps uses minterpolate motion-estimation interpolation; works well for transform animation
- GIF uses palette optimization; a 30s animation typically compresses to ~3 MB

Tell me if you want a different size or frame rate.
```

## Common follow-up requests

| User says | Response |
|---|---|
| "Too big" | MP4: raise CRF to 23–28; GIF: drop resolution to 600 or fps to 10 |
| "GIF looks blurry" | Raise `gif_width` to 1280; or recommend MP4 instead (most platforms support it) |
| "I want 9:16 vertical" | Set the HTML source's `--width=1080 --height=1920`, re-record |
| "Add a watermark" | ffmpeg `-vf "drawtext=…"` or `overlay=` a PNG |
| "Transparent background" | MP4 doesn't support alpha; use WebM VP9 + alpha or APNG |
| "Lossless" | CRF 0 + preset veryslow (file size 10× larger) |
