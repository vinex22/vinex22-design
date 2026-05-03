<div align="center">

# vinex22-design

> *"Type. Hit enter. A finished design lands in your lap."*

[![License](https://img.shields.io/badge/License-Personal%20Use%20Only-orange.svg)](LICENSE)
[![Agent-Agnostic](https://img.shields.io/badge/Agent-Agnostic-blueviolet)](https://skills.sh)
[![Skills](https://img.shields.io/badge/skills.sh-Compatible-green)](https://skills.sh)

<br>

**An English skill for designers — say one sentence to your agent (Claude Code, Cursor, Codex, GitHub Copilot, OpenClaw, Hermes, or any markdown-skill-capable agent).**

<br>

3 to 30 minutes — you ship a **product launch animation**, a clickable App prototype, an editable PPT deck, or a print-grade infographic.

Not "decent for an AI" quality — it looks like a real design team made it. Give the skill your brand assets (logo, colors, UI screenshots) and it reads your brand's voice; give it nothing and the built-in 20 design vocabularies still keep you out of AI-slop territory.

```
npx skills add vinex22/vinex22-design
```

[See it work](#demo-gallery) · [Install](#install) · [What it does](#what-it-does) · [How it works](#core-mechanics) · [Attribution](#attribution)

> 📖 **About this repo**: this is an English-only derivative of the Chinese-language [`alchaincyf/huashu-design`](https://github.com/alchaincyf/huashu-design) skill. All agent prompts (`SKILL.md`, `references/*.md`), UI strings in demos, and code comments have been translated to English so an agent can run end-to-end without bilingual context. See [Attribution](#attribution) below.

</div>

---

## Install

```bash
npx skills add vinex22/vinex22-design
```

Then just talk to your agent:

```
"Make a keynote for AI psychology. Give me 3 style directions to pick from."
"Build an iOS prototype for a Pomodoro app — 4 screens, actually clickable."
"Turn this logic into a 60-second animation. Export MP4 and GIF."
"Run a 5-dimension expert review on this design."
```

No buttons, no panels, no Figma plugin. Agent-agnostic — drops into Claude Code, Cursor, Codex, GitHub Copilot (agent mode), Trae, Hermes, OpenClaw, or any markdown-skill-capable agent.

> **GitHub Copilot users**: Copilot does not natively understand the `skills.sh` package format. To use this skill with Copilot in VS Code, clone the repo into your workspace and add a pointer to `SKILL.md` from `.github/copilot-instructions.md` (or paste the relevant sections in directly). See [Using with GitHub Copilot](#using-with-github-copilot) below.

---

## What it does

| Capability | Deliverable | Typical time |
|---|---|---|
| Interactive prototype (App / Web) | Single-file HTML · real iPhone bezel · clickable · Playwright-verified | 10–15 min |
| Slide decks | HTML deck (browser presentation) + editable PPTX (text frames preserved) | 15–25 min |
| Motion design | MP4 (25 fps / 60 fps interpolation) + GIF (palette-optimized) + BGM | 8–12 min |
| Design variations | 3+ side-by-side · Tweaks live params · cross-dimension exploration | 10 min |
| Infographic / data viz | Print-quality typography · exports to PDF / PNG / SVG | 10 min |
| Design direction advisor | 5 schools × 20 philosophies · 3 directions recommended · demos generated in parallel | 5 min |
| 5-dimension expert critique | Radar chart + Keep / Fix / Quick Wins · actionable punch list | 3 min |

---

## Demo Gallery

Each capability ships with a runnable HTML demo under `demos/`. Open any of them in a browser to see the output style end-to-end.

| Demo | Path | What it shows |
|---|---|---|
| Design Direction Advisor | [`demos/w3-fallback-advisor.html`](demos/w3-fallback-advisor.html) | Three differentiated directions from 5 schools × 20 philosophies, generated in parallel. |
| iOS App Prototype | [`demos/c1-ios-prototype.html`](demos/c1-ios-prototype.html) | Pixel-accurate iPhone 15 Pro body, state-driven multi-screen navigation, real images, Playwright click tests. |
| Motion Design Engine | [`demos/c3-motion-design.html`](demos/c3-motion-design.html) | Stage + Sprite time-slice model: `useTime` / `useSprite` / `interpolate` / `Easing` cover every animation need. |
| HTML Slides → Editable PPTX | [`demos/c2-slides-pptx.html`](demos/c2-slides-pptx.html) | HTML decks for browser presentation; `html2pptx.js` translates DOM into real PowerPoint text frames. |
| Tweaks · Live Variations | [`demos/c4-tweaks.html`](demos/c4-tweaks.html) | Colors / typography / density parameterized; side panel toggle; pure-frontend + `localStorage` persistence. |
| Infographic / Data Viz | [`demos/c5-infographic.html`](demos/c5-infographic.html) | Magazine-grade typography, precise CSS Grid columns, exports to vector PDF / 300 dpi PNG / SVG. |
| 5-Dimension Expert Critique | [`demos/c6-expert-review.html`](demos/c6-expert-review.html) | Philosophy / hierarchy / craft / function / innovation each scored 0–10, radar chart, Keep/Fix/Quick Wins. |
| Junior Designer Workflow | [`demos/w2-junior-designer.html`](demos/w2-junior-designer.html) | Assumptions + placeholders + reasoning shown to the user early, then iterate. |
| Core Asset Protocol · 5-step | [`demos/w1-brand-protocol.html`](demos/w1-brand-protocol.html) | Whenever a specific brand is involved: ask → search → download (3 fallback paths) → verify + extract → write `brand-spec.md`. |
| Hero animation | [`demos/hero-animation.html`](demos/hero-animation.html) | A reference hero animation timeline you can study and adapt. |

> **Note**: this repository ships HTML demos only. The original repo also bundled pre-rendered MP4/GIF/MP3 assets; those are intentionally omitted here so the repo stays small. Re-render them locally with `scripts/render-video.js` (HTML → MP4) and `scripts/convert-formats.sh` (MP4 → GIF + 60 fps).

### Sample projects

Real output produced *by the skill itself*, not just templates. Each lives under [`projects/`](projects/) and is checked in as a worked example.

| Project | Path | What it is |
|---|---|---|
| `lumen-deck` | [`projects/lumen-deck/`](projects/lumen-deck/) | A 10-slide Series-A pitch deck (1920×1080, multi-file architecture) for a fictional AI code-review startup. Built end-to-end by GitHub Copilot driving this skill, including Junior Designer report, design-system pass, 2-slide grammar showcase, full build, and Playwright verify. Open [`projects/lumen-deck/index.html`](projects/lumen-deck/index.html) in a browser; ←/→ to navigate. |

---

## Core Mechanics

### Core Asset Protocol

The hardest rule in the skill. When the task touches a specific brand (Stripe, Linear, Anthropic, DJI, your own company, etc.), five steps are enforced:

| Step | Action | Purpose |
|---|---|---|
| 1 · Ask | Checklist of 6 asset types: logo / product shots / UI screenshots / color palette / fonts / brand guidelines | Respect existing resources |
| 2 · Search official channels | `<brand>.com/brand` · `<brand>.com/press` · `brand.<brand>.com` · product pages · launch films | Find authoritative assets |
| 3 · Download by asset type | Logo (SVG → inline-SVG in HTML → social avatar) · product shots (hero → press kit → launch video frames → AI-generated from reference) · UI (App Store screenshots → official video frames) | Three fallback paths per asset type |
| 4 · Verify + extract | Check logo fidelity, product image resolution, UI freshness; grep color hex values from real assets | **Never guess from memory** |
| 5 · Freeze to spec | Write `brand-spec.md` with logo paths, product image paths, UI screenshot paths, CSS variables for colors / fonts | Un-frozen knowledge evaporates |

**Ranking of asset importance** (from the skill's internal rubric):

1. Logo — mandatory for any brand
2. Product renders — mandatory for physical products
3. UI screenshots — mandatory for digital products
4. Color values — auxiliary
5. Fonts — auxiliary

A/B-tested in the original (v1 vs v2, 6 agents each): **v2 reduced stability variance by 5×**. Stability of stability — that's the real moat.

### Design Direction Advisor (Fallback)

Triggered when the brief is too vague to execute:

- Don't run on generic intuition — enter Fallback mode
- Recommend 3 differentiated directions from 5 schools × 20 philosophies, each **from a different school**
- Each comes with flagship works, gestalt keywords, representative designer
- Generate 3 visual demos in parallel; let the user choose
- Once chosen, continue into the Junior Designer main flow

### Junior Designer Workflow

The default working mode across every task:

- Send the full question set in one batch; wait for all answers before moving
- Write assumptions + placeholders + reasoning comments directly into the HTML
- Show it to the user early (even if just gray blocks)
- Fill in real content → variations → Tweaks — show at each of these three steps
- Manually eyeball the browser with Playwright before delivery

### Fact Verification First (Principle #0)

The highest-priority rule, added after a real failure mode: when the task mentions a specific product / technology / event (e.g., "DJI Pocket 4", "Nano Banana Pro", "Gemini 3 Pro"), the first action **must** be a `WebSearch` to confirm existence, release status, current version, and specs. No claims from training-corpus memory. Cost of a search: ~10 seconds. Cost of a wrong assumption: 1–2 hours of rework.

### Anti AI-slop Rules

Avoid the visual common denominator of AI output (purple gradients / emoji icons / rounded-corner + left border accent / SVG humans / Inter-as-display / **CSS silhouettes standing in for real product shots**). Use `text-wrap: pretty` + CSS Grid + carefully chosen serif display faces + oklch colors.

---

## Limitations

- **No layer-editable PPTX-to-Figma round-trip.** The output is HTML — screenshottable, recordable, image-exportable, but not draggable into Keynote for text-position tweaks.
- **Framer-Motion-tier complex animations are out of scope.** 3D, physics simulation, particle systems exceed the skill's boundaries.
- **Brand-from-zero design quality drops to 60–65 points.** Drawing hi-fi from nothing was always a last resort.

This is an 80-point skill, not a 100-point product. For people unwilling to open a graphical UI, an 80-point skill beats a 100-point product.

---

## Repository Structure

```
vinex22-design/
├── SKILL.md                 # Main doc (read by agent)
├── README.md                # This file
├── LICENSE                  # Personal Use License (derived from upstream)
├── assets/                  # Starter Components
│   ├── animations.jsx       # Stage + Sprite + Easing + interpolate
│   ├── ios_frame.jsx        # iPhone 15 Pro bezel
│   ├── android_frame.jsx
│   ├── macos_window.jsx
│   ├── browser_window.jsx
│   ├── deck_stage.js        # HTML deck engine
│   ├── deck_index.html      # Multi-file deck assembler
│   ├── design_canvas.jsx    # Side-by-side variation display
│   └── showcases/           # 24 prebuilt samples (8 scenes × 3 styles)
├── references/              # Drill-down docs (read on demand by the agent)
│   ├── animation-pitfalls.md
│   ├── design-styles.md     # 20 design philosophies in detail
│   ├── slide-decks.md
│   ├── editable-pptx.md
│   ├── critique-guide.md
│   ├── video-export.md
│   └── ...                  # 20 files in total
├── scripts/                 # Export toolchain
│   ├── render-video.js      # HTML → MP4 (Playwright + ffmpeg)
│   ├── convert-formats.sh   # MP4 → 60 fps + GIF
│   ├── add-music.sh         # MP4 + BGM
│   ├── export_deck_pdf.mjs
│   ├── export_deck_pptx.mjs
│   ├── html2pptx.js
│   └── verify.py
└── demos/                   # 10 capability demos referenced by this README
```

> **Binary assets omitted**: this English derivative does not ship the upstream's 6 BGM tracks, ~30 SFX clips, or pre-rendered MP4 / GIF demos. If you need them, generate locally with the scripts in `scripts/` or fetch them from the upstream releases.

---

## Using with GitHub Copilot

Copilot in VS Code does not have a built-in `skills.sh` loader. To use this skill with Copilot agent mode:

1. Clone this repo into (or alongside) your workspace.
2. Create `.github/copilot-instructions.md` containing either:
   - The full contents of `SKILL.md`, or
   - A pointer such as:
     ```md
     For any design task, follow the rules in ./vinex22-design/SKILL.md
     and load referenced files from ./vinex22-design/references/ on demand.
     ```
3. Make sure Node.js, Python (for `verify.py`), and ffmpeg are available — the scripts shell out to them.

Caveats vs. Claude Code:
- Copilot won't auto-load `references/*.md`; it will only read them when the path is mentioned.
- Parallel-agent flows (e.g., "render 3 directions in parallel") run sequentially in Copilot; either run them in separate chat sessions or accept serial execution.

---

## Origin & Attribution

This repository is an **English derivative** of the Chinese-language skill
[`alchaincyf/huashu-design`](https://github.com/alchaincyf/huashu-design)
(Copyright © 2026 alchaincyf · Huasheng / Huashu).

> **Derived from `alchaincyf/huashu-design` — English translation by vinex22.**

The original author wrote the skill after deconstructing Anthropic's Claude Design product (including its system prompts, brand asset protocol, and component mechanics) into a structured spec, then packaging it as a skill installable into Claude Code. All design philosophy, structure, and prompts originate from that work; this fork simply translates everything into English so non-Chinese-speaking agents and readers can use it directly.

The original Chinese repo, demos, audio assets, and pre-rendered videos remain at the upstream:
https://github.com/alchaincyf/huashu-design

Star, sponsor, and credit the original author there.

---

## License · Usage Rights

This repository inherits the **Personal Use License** from the upstream — translated to English in [LICENSE](LICENSE) but with the same restrictions.

**Personal use is free and unrestricted** — studying, research, creating things for yourself, writing articles, side projects, personal social media. Use it freely, no need to ask.

**Enterprise / commercial use is restricted** — any company, team, or for-profit organization integrating this skill into a product, external service, or client deliverable **must obtain authorization from the original author (Huasheng / alchaincyf) first**. This English derivative cannot grant commercial rights. See [LICENSE](LICENSE) for the full list and contact details.

---

## Connect with the Original Author

Huasheng (a.k.a. Huashu) is an AI-native coder, independent developer, and AI content creator. Notable work: Cat Fill Light (App Store Top 1, paid category), *A Book on DeepSeek*, Nuwa.skill (12k+ stars on GitHub).

| Platform | Handle | Link |
|---|---|---|
| X / Twitter | @AlchainHust | https://x.com/AlchainHust |
| WeChat Official Account | Huashu | Search "Huashu" in WeChat |
| Bilibili | Huashu | https://space.bilibili.com/14097567 |
| YouTube | Huashu | https://www.youtube.com/@Alchain |
| Xiaohongshu | Huashu | https://www.xiaohongshu.com/user/profile/5abc6f17e8ac2b109179dfdf |
| Official site | huasheng.ai | https://www.huasheng.ai/ |
| Developer hub | bookai.top | https://bookai.top |

For commercial licensing, collaborations, or sponsored content related to the original work, DM the author on any of the above.

---

## Maintainer of this English derivative

- GitHub: [@vinex22](https://github.com/vinex22)

This derivative is maintained on a best-effort, non-commercial basis. For issues with the translation or this fork specifically, file an issue here. For questions about the underlying skill design, brand asset protocol, or commercial licensing, please reach out to the original author above.
