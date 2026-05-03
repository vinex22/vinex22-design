# Audio design rules · vinex22-design

> Audio recipes for every animation demo. Use together with `sfx-library.md` (asset list).
> Battle-tested: vinex22-design hero v1–v9 iterations · deep Gemini analysis of three official Anthropic films · 8000+ A/B comparisons.

---

## Core principle: dual-track audio (iron rule)

Animation audio **must be designed in two independent layers**; you cannot do only one:

| Layer | Function | Time scale | Relationship to visual | Frequency band |
|---|---|---|---|---|
| **SFX (beat layer)** | Marks each visual beat | 0.2–2 s short | **Strong sync** (frame-aligned) | **High > 800 Hz** |
| **BGM (atmospheric base)** | Emotional bed, soundscape | Continuous 20–60 s | Weak sync (paragraph-level) | **Low–mid < 4 kHz** |

**Animation with only BGM is half-finished** — the viewer subconsciously perceives "the picture is moving but no sound responds"; that is the root of cheap-feeling animation.

---

## Gold standard: golden ratios

These numbers were derived from comparing the three official Anthropic films + our own v9 final cut. They are **engineering hard parameters** — apply them directly:

### Volume
- **BGM volume**: `0.40–0.50` (relative to full scale 1.0)
- **SFX volume**: `1.00`
- **Loudness gap**: BGM peak is **−6 to −8 dB** below SFX peak (it's not "SFX loud absolutely", it's "the gap")
- **amix parameter**: `normalize=0` (never `normalize=1` — it flattens dynamic range)

### Frequency separation (P1 hard optimization)
The Anthropic secret isn't "loud SFX" — it's **frequency layering**:

```bash
[bgm_raw]lowpass=f=4000[bgm]      # BGM limited to < 4 kHz low-mid
[sfx_raw]highpass=f=800[sfx]      # SFX pushed to > 800 Hz mid-high
[bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]
```

Why: the human ear is most sensitive to the 2–5 kHz range (the "presence band"). If SFX sits there and BGM covers the full spectrum, **SFX gets masked by the high-frequency portion of BGM**. Use `highpass` to push SFX up + `lowpass` to push BGM down. They occupy different bands; SFX clarity goes up a notch.

### Fades
- BGM in: `afade=in:st=0:d=0.3` (0.3s, avoid hard cut)
- BGM out: `afade=out:st=N-1.5:d=1.5` (1.5s long tail, sense of resolution)
- SFX has its own envelope; no extra fade needed

---

## SFX cue design rules

### Density (how many SFX per 10 seconds)
Measured from the three Anthropic films, three tiers of SFX density exist:

| Film | SFX / 10s | Product personality | Scenario |
|---|---|---|---|
| Artifacts (ref-1) | **~9 / 10s** | feature-dense, info-rich | complex tool demo |
| Code Desktop (ref-2) | **0** | pure ambient, meditative | dev-tool focus state |
| Word (ref-3) | **~4 / 10s** | balanced, office cadence | productivity tool |

**Heuristic**:
- Calm / focused product → low SFX density (0–3 / 10s); BGM-led
- Lively / info-rich product → high SFX density (6–9 / 10s); SFX drives rhythm
- **Don't fill every visual beat** — restraint is more sophisticated than density. **Cutting 30–50% of cues makes the remainder more dramatic.**

### Cue selection priority
Not every visual beat needs SFX. Pick by this priority:

**P0 mandatory** (omitting feels wrong):
- Typing (terminal / input)
- Click / select (user-decision moment)
- Focus shift (visual protagonist transfer)
- Logo reveal (brand resolution)

**P1 recommended**:
- Element entry / exit (modal / card)
- Completion / success feedback
- AI generation start / end
- Major transition (scene change)

**P2 optional** (more = chaos):
- hover / focus-in
- progress tick
- decorative ambient

### Timestamp alignment precision
- **Same frame** (0 ms drift): click / focus shift / logo landing
- **1–2 frames before** (−33 ms): fast whoosh (gives viewer psychological anticipation)
- **1–2 frames after** (+33 ms): object landing / impact (matches real physics)

---

## BGM choice decision tree

vinex22-design ships 6 BGM tracks (`assets/bgm-*.mp3` — see `assets/AUDIO-NOTES.md` for sourcing notes):

```
What's the animation personality?
├─ Product launch / tech demo → bgm-tech.mp3 (minimal synth + piano)
├─ Tutorial / tool walkthrough → bgm-tutorial.mp3 (warm, instructional)
├─ Educational / principle explanation → bgm-educational.mp3 (curious, thoughtful)
├─ Marketing / brand promotion → bgm-ad.mp3 (upbeat, promotional)
└─ Need a variant of the same style → bgm-*-alt.mp3 (alternate version of each)
```

### Scenarios with no BGM (worth considering)
Reference: Anthropic Code Desktop (ref-2) — **0 SFX + pure lo-fi BGM** can also be very high-end.

**When to choose no BGM**:
- Animation < 10s (BGM can't establish)
- Product personality is "focus / meditation"
- Scene already has ambient sound / voiceover
- SFX density is very high (avoid auditory overload)

---

## Scene recipes (turnkey)

### Recipe A · Product-launch hero (vinex22-design v9 same)
```
Duration: 25s
BGM: bgm-tech.mp3 · 45% · band < 4 kHz
SFX density: ~6 / 10s

cues:
  Terminal typing → type × 4 (interval 0.6s)
  Enter           → enter
  Card converge   → card × 4 (staggered 0.2s)
  Selection       → click
  Ripple          → whoosh
  4× focus        → focus × 4
  Logo            → thud (1.5s)

Volume: BGM 0.45 / SFX 1.0 · amix normalize=0
```

### Recipe B · Tool feature demo (reference: Anthropic Code Desktop)
```
Duration: 30–45s
BGM: bgm-tutorial.mp3 · 50%
SFX density: 0–2 / 10s (very few)

Strategy: let BGM + voiceover drive; SFX only at **decisive moments** (file save / command finish).
```

### Recipe C · AI generation demo
```
Duration: 15–20s
BGM: bgm-tech.mp3 or no BGM
SFX density: ~8 / 10s (high)

cues:
  User input → type + enter
  AI starts processing → magic/ai-process (1.2s loop)
  Generation complete → feedback/complete-done
  Result reveals → magic/sparkle

Highlight: ai-process can loop 2–3× across the whole generation.
```

### Recipe D · Pure-ambient long take (reference: Artifacts)
```
Duration: 10–15s
BGM: none
SFX: standalone use of 3–5 carefully designed cues

Strategy: each SFX is the protagonist; no BGM to "blur it together".
Best for: single-product slow shot, close-up showcase
```

---

## ffmpeg composition templates

### Template 1 · Single SFX overlaid on video
```bash
ffmpeg -y -i video.mp4 -itsoffset 2.5 -i sfx.mp3 \
  -filter_complex "[0:a][1:a]amix=inputs=2:normalize=0[a]" \
  -map 0:v -map "[a]" output.mp4
```

### Template 2 · Multi-SFX timeline composition (cue-aligned)
```bash
ffmpeg -y \
  -i sfx-type.mp3 -i sfx-enter.mp3 -i sfx-click.mp3 -i sfx-thud.mp3 \
  -filter_complex "\
[0:a]adelay=1100|1100[a0];\
[1:a]adelay=3200|3200[a1];\
[2:a]adelay=7000|7000[a2];\
[3:a]adelay=21800|21800[a3];\
[a0][a1][a2][a3]amix=inputs=4:duration=longest:normalize=0[mixed]" \
  -map "[mixed]" -t 25 sfx-track.mp3
```
**Key parameters**:
- `adelay=N|N`: left-channel delay (ms) | right-channel delay; write twice for stereo alignment
- `normalize=0`: preserves dynamic range — critical
- `-t 25`: trim to specified duration

### Template 3 · Video + SFX track + BGM (with frequency separation)
```bash
ffmpeg -y -i video.mp4 -i sfx-track.mp3 -i bgm.mp3 \
  -filter_complex "\
[2:a]atrim=0:25,afade=in:st=0:d=0.3,afade=out:st=23.5:d=1.5,\
     lowpass=f=4000,volume=0.45[bgm];\
[1:a]highpass=f=800,volume=1.0[sfx];\
[bgm][sfx]amix=inputs=2:duration=first:normalize=0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k final.mp4
```

---

## Failure-mode quick-ref

| Symptom | Root cause | Fix |
|---|---|---|
| SFX inaudible | BGM high-band masks it | Add `lowpass=f=4000` to BGM + `highpass=f=800` to SFX |
| SFX too piercing | SFX absolute volume too high | Drop SFX to 0.7, lower BGM to 0.3, preserve the gap |
| BGM and SFX rhythm conflict | Wrong BGM (one with strong beat) | Switch to ambient / minimal-synth BGM |
| BGM cuts off abruptly at end | No fade-out | `afade=out:st=N-1.5:d=1.5` |
| SFX overlap into mush | Cues too dense + each SFX too long | Keep SFX duration ≤ 0.5s; cue interval ≥ 0.2s |
| Social MP4 has no sound | Some platforms mute auto-play | Don't worry — opens with sound when user taps; GIFs have no sound by definition |

---

## Visual-audio coupling (advanced)

### SFX timbre should match visual style
- Warm beige / paper-feel visuals → use **wood / soft** SFX (Morse, paper snap, soft click)
- Cold dark-tech visuals → use **metal / digital** SFX (beep, pulse, glitch)
- Hand-drawn / playful visuals → use **cartoon / exaggerated** SFX (boing, pop, zap)

The current `apple-gallery-showcase.md` warm-beige base → pair with `keyboard/type.mp3` (mechanical) + `container/card-snap.mp3` (soft) + `impact/logo-reveal-v2.mp3` (cinematic bass).

### SFX can lead visual rhythm
Advanced trick: **design the SFX timeline first, then adjust visual animation to align with SFX** (not the reverse).
Each SFX cue is a "clock tick"; visuals adapting to SFX are very stable. The reverse — SFX chasing visuals — drifts ±1 frame and feels off.

---

## Quality check (pre-publish self-review)

- [ ] Loudness gap: SFX peak − BGM peak = −6 to −8 dB?
- [ ] Frequency: BGM lowpass 4 kHz + SFX highpass 800 Hz?
- [ ] amix `normalize=0` (preserves dynamic range)?
- [ ] BGM fade-in 0.3s + fade-out 1.5s?
- [ ] SFX count appropriate (density picked per scene personality)?
- [ ] Each SFX is frame-aligned with its visual beat (within ±1 frame)?
- [ ] Logo-reveal SFX long enough (recommended 1.5s)?
- [ ] Mute BGM and listen: do the SFX alone have rhythm?
- [ ] Mute SFX and listen: does BGM alone have emotional arc?

Each layer alone should be self-coherent. If the mix only sounds good when both are stacked, it's not done well.

---

## Note on binary audio assets

The `assets/sfx/` and `assets/bgm-*.mp3` files are not bundled in this repository (per the upstream license decision and to keep the repo lightweight). To regenerate them locally:

- **SFX**: use ElevenLabs Sound Generation API with the prompts listed in `sfx-library.md`. The original generator script lives in `/tmp/gen_sfx_batch.sh` style — see the prompt list to recreate.
- **BGM**: source royalty-free tracks matching the moods in the BGM decision tree, or use any AI music generator (Suno, Udio, ElevenLabs Music) with the descriptors above.

Place generated files at `assets/sfx/<category>/<name>.mp3` and `assets/bgm-<mood>.mp3`. The scripts in `scripts/` will pick them up by filename.

---

## See also

- SFX asset list: `sfx-library.md`
- Visual style reference: `apple-gallery-showcase.md`
