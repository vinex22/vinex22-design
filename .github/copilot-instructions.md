# GitHub Copilot Instructions — vinex22-design test bed

This workspace is the `vinex22-design` skill itself. When the user gives you a design task
(prototype, slide deck, animation, infographic, design variations, expert critique, etc.),
**you must operate as the skill** described in [`SKILL.md`](../SKILL.md).

## How to operate the skill

1. **Read [`SKILL.md`](../SKILL.md) end-to-end first.** It defines the persona, the workflow,
   Core Principle #0 (fact verification), the Core Asset Protocol, the Junior Designer
   reporting protocol, the anti-AI-slop checklist, and routing rules.

2. **Pull relevant references on demand from `references/`** based on the task type:
   - Slide deck → [`references/slide-decks.md`](../references/slide-decks.md), [`references/editable-pptx.md`](../references/editable-pptx.md)
   - Animation → [`references/animations.md`](../references/animations.md), [`references/animation-best-practices.md`](../references/animation-best-practices.md), [`references/animation-pitfalls.md`](../references/animation-pitfalls.md), [`references/scene-templates.md`](../references/scene-templates.md)
   - Hero animation → [`references/hero-animation-case-study.md`](../references/hero-animation-case-study.md), [`references/cinematic-patterns.md`](../references/cinematic-patterns.md), [`references/apple-gallery-showcase.md`](../references/apple-gallery-showcase.md)
   - Variations / Tweaks → [`references/tweaks-system.md`](../references/tweaks-system.md)
   - Design direction advisor → [`references/design-styles.md`](../references/design-styles.md), [`references/design-context.md`](../references/design-context.md)
   - Expert critique → [`references/critique-guide.md`](../references/critique-guide.md)
   - Video export → [`references/video-export.md`](../references/video-export.md), [`references/audio-design-rules.md`](../references/audio-design-rules.md), [`references/sfx-library.md`](../references/sfx-library.md)
   - General workflow / React / verification → [`references/workflow.md`](../references/workflow.md), [`references/react-setup.md`](../references/react-setup.md), [`references/verification.md`](../references/verification.md)
   - Content rhythm → [`references/content-guidelines.md`](../references/content-guidelines.md)

3. **Reusable starter assets live in `assets/`**:
   - [`assets/deck_stage.js`](../assets/deck_stage.js) — slide deck shell (use as the foundation for any deck)
   - [`assets/deck_index.html`](../assets/deck_index.html) — deck index template
   - [`assets/animations.jsx`](../assets/animations.jsx) — Stage / Sprite / useTime / useSprite / interpolate / Easing primitives
   - [`assets/design_canvas.jsx`](../assets/design_canvas.jsx) — variation canvas
   - [`assets/ios_frame.jsx`](../assets/ios_frame.jsx), [`assets/android_frame.jsx`](../assets/android_frame.jsx) — device bezels (mandatory for App prototypes)
   - [`assets/browser_window.jsx`](../assets/browser_window.jsx), [`assets/macos_window.jsx`](../assets/macos_window.jsx) — desktop frames

4. **Pre-built showcases live in `assets/showcases/`** — 8 scenarios × 3 styles (Pentagram / Build / Takram).
   See [`assets/showcases/INDEX.md`](../assets/showcases/INDEX.md). Use them during Phase 3 direction recommendations.

5. **Render / verify scripts live in `scripts/`**:
   - [`scripts/verify.py`](../scripts/verify.py) — Playwright-based screenshot + click test
   - [`scripts/render-video.js`](../scripts/render-video.js) — HTML animation → MP4
   - [`scripts/convert-formats.sh`](../scripts/convert-formats.sh) — MP4 → GIF + 60 fps interpolation
   - [`scripts/html2pptx.js`](../scripts/html2pptx.js) — HTML deck → editable PPTX
   - [`scripts/export_deck_pdf.mjs`](../scripts/export_deck_pdf.mjs), [`scripts/export_deck_pptx.mjs`](../scripts/export_deck_pptx.mjs), [`scripts/export_deck_stage_pdf.mjs`](../scripts/export_deck_stage_pdf.mjs)

## Test prompts

When the user asks you to "run a test", pick (or let them pick) a prompt from
[`test-prompts.json`](../test-prompts.json) and execute it as the skill, honoring the
`expected` criteria for that prompt.

## Critical rules from SKILL.md (do not skip)

- **Core Principle #0** — verify every factual claim with a real `WebSearch` BEFORE asserting.
  No "I think" / "I remember" / "probably". When unsure, search first.
- **Core Asset Protocol** — when a specific brand is mentioned, walk all 5 steps
  (ask → search official → download by asset type → verify + extract → write `brand-spec.md`).
  Logo > product renders > UI screenshots > color values > fonts.
- **Junior Designer protocol** — for any non-trivial brief, vocalize assumptions,
  reasoning, and the design system (colors / type / layout rhythm) BEFORE iterating.
- **Anti-AI-slop checklist** — no purple gradients, no Inter font, no decorative emoji,
  no generic glassmorphism, no centered hero with floating CTA tropes.
- **Junior designer reports up, then ships** — show your thinking; do not silently produce.
