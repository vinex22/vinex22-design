# Design critique deep guide

> Detailed reference for Phase 7. Provides scoring criteria, scenario weighting, and a common-issues checklist.

---

## Scoring criteria in detail

### 1. Philosophy alignment

| Score | Criterion |
|---|---|
| 9–10 | Design fully embodies the chosen philosophy's core spirit; every detail has philosophical justification |
| 7–8 | Direction is right and the core traits are in place; a few details drift |
| 5–6 | Intent is recognizable, but other-style elements are mixed in during execution; not pure |
| 3–4 | Imitation is only on the surface; the core philosophy is not understood |
| 1–2 | Essentially unrelated to the chosen philosophy |

**What to check**:
- Are the signature techniques of that designer / studio used?
- Are color, typography, and layout consistent with the philosophy system?
- Are there self-contradictory elements? (e.g., "Kenya Hara" but stuffed with content)

### 2. Visual hierarchy

| Score | Criterion |
|---|---|
| 9–10 | The viewer's eye flows naturally along the designer's intent; zero friction in reading information |
| 7–8 | Primary / secondary relationships are clear, with 1–2 fuzzy spots |
| 5–6 | Title and body distinguishable, but mid-level hierarchy is muddled |
| 3–4 | Information is flat; no clear visual entry point |
| 1–2 | Chaotic; the user doesn't know where to look first |

**What to check**:
- Is the size contrast between heading and body sufficient? (At least 2.5×)
- Do color / weight / size establish 3–4 clear levels?
- Is whitespace guiding the eye?
- "Squint test": squint at the design; is the hierarchy still clear?

### 3. Craft execution

| Score | Criterion |
|---|---|
| 9–10 | Pixel-precise; alignment, spacing, color all flawless |
| 7–8 | Overall refined; 1–2 minor alignment / spacing issues |
| 5–6 | Basic alignment in place, but spacing inconsistent and color usage not systematic |
| 3–4 | Obvious alignment errors, chaotic spacing, too many colors |
| 1–2 | Rough; looks like a draft |

**What to check**:
- Is a unified spacing system used (e.g., 8pt grid)?
- Do peer elements have consistent spacing?
- Is the color count controlled (typically ≤ 3–4)?
- Is the font family unified (typically ≤ 2)?
- Are edges precisely aligned?

### 4. Functionality

| Score | Criterion |
|---|---|
| 9–10 | Every design element serves the goal; zero redundancy |
| 7–8 | Function-oriented overall; minor decorative elements that could be cut |
| 5–6 | Basically usable, but obvious decorative elements distract attention |
| 3–4 | Form over function; the user has to work to find information |
| 1–2 | Drowned in decoration; loses the ability to communicate information |

**What to check**:
- If you remove any one element, does the design get worse? (If not, remove it.)
- Is the CTA / key information in the most prominent spot?
- Are there elements that are there "just because they look nice"?
- Does information density match the carrier? (PPT shouldn't be too dense; PDF can be denser.)

### 5. Originality

| Score | Criterion |
|---|---|
| 9–10 | Refreshing; finds a unique expression within the philosophy framework |
| 7–8 | Has its own ideas; not a template paste |
| 5–6 | Mediocre; looks like a template |
| 3–4 | Heavy use of clichés (e.g., gradient orbs as "AI") |
| 1–2 | Pure template / asset-pile-up |

**What to check**:
- Are common clichés avoided? (See "Common issues" below.)
- Within the design philosophy, is there personal expression?
- Are there "unexpected but reasonable" design decisions?

---

## Scenario-specific weighting

Different output types have different evaluation priorities:

| Scenario | Most important | Second | Can relax |
|---|---|---|---|
| Article cover / banner | Originality, visual hierarchy | Philosophy alignment | Functionality (no interaction in a single image) |
| Infographic | Functionality, visual hierarchy | Craft execution | Originality (accuracy first) |
| PPT / Keynote | Visual hierarchy, functionality | Craft execution | Originality (clarity first) |
| PDF / whitepaper | Craft execution, functionality | Visual hierarchy | Originality (professionalism first) |
| Landing page / website | Functionality, visual hierarchy | Originality | — (full bar) |
| App UI | Functionality, craft execution | Visual hierarchy | Philosophy alignment (usability first) |
| Social-media supporting image | Originality, visual hierarchy | Philosophy alignment | Craft execution (mood first) |

---

## Top 10 common design problems

### 1. AI / tech clichés
**Issue**: gradient orbs, digital-rain, blue circuit boards, robot faces
**Why it's a problem**: viewers are visually tired of these; you can't be told apart from anyone else
**Fix**: use abstract metaphor instead of literal symbols (e.g., a "dialogue" metaphor instead of a chat-bubble icon)

### 2. Insufficient size hierarchy
**Issue**: heading and body too close in size (< 2.5×)
**Why it's a problem**: viewer can't quickly locate key information
**Fix**: heading at least 3× body (e.g., body 16px → heading 48–64px)

### 3. Too many colors
**Issue**: 5+ colors used with no hierarchy
**Why it's a problem**: visual chaos; weak brand sense
**Fix**: limit to 1 primary + 1 secondary + 1 accent + grayscale

### 4. Inconsistent spacing
**Issue**: arbitrary spacing between elements; no system
**Why it's a problem**: looks unprofessional; chaotic visual rhythm
**Fix**: build an 8pt grid system (only use 8 / 16 / 24 / 32 / 48 / 64 px)

### 5. Insufficient whitespace
**Issue**: every space is filled with content
**Why it's a problem**: information crowding causes reading fatigue, *reducing* communication efficiency
**Fix**: whitespace at least 40% of total area (60%+ for minimal)

### 6. Too many fonts
**Issue**: 3+ font families used
**Why it's a problem**: visual noise; weakens unity
**Fix**: at most 2 fonts (1 heading + 1 body); use weight and size for variation

### 7. Inconsistent alignment
**Issue**: some left-aligned, some centered, some right-aligned
**Why it's a problem**: breaks visual order
**Fix**: pick one alignment (left recommended) and apply globally

### 8. Decoration over content
**Issue**: background patterns / gradients / shadows steal the show from primary content
**Why it's a problem**: cart before horse; viewer came for information, not decoration
**Fix**: "If I delete this decoration, does the design get worse?" If not, delete it.

### 9. Cyber-neon overuse
**Issue**: deep blue (#0D1117) + neon glowing accents
**Why it's a problem**: default aesthetic restricted zone (this skill's taste baseline) and one of the biggest clichés — users can override per their own brand
**Fix**: pick a more recognizable color system (reference the 20-style color systems)

### 10. Information density mismatched with carrier
**Issue**: a full page of text on a slide / 10 elements crammed into a cover image
**Why it's a problem**: different carriers have different optimal densities
**Fix**:
- PPT: one core idea per page
- Cover image: one visual focus
- Infographic: layered display
- PDF: can be denser, but needs clear navigation

---

## Critique output template

```
## Design critique report

**Total score**: X.X / 10 [excellent (8+) / good (6–7.9) / needs improvement (4–5.9) / fail (< 4)]

**Per-dimension**:
- Philosophy alignment: X / 10 [one-line note]
- Visual hierarchy: X / 10 [one-line note]
- Craft execution: X / 10 [one-line note]
- Functionality: X / 10 [one-line note]
- Originality: X / 10 [one-line note]

### Keep (what's good)
- [Concretely note the good parts in design language]

### Fix (issues)
[Sorted by severity]

**1. [Issue name]** — ⚠️ critical / ⚡ important / 💡 nice-to-have
- Current: [describe state]
- Problem: [why this is an issue]
- Fix: [concrete action with numbers]

### Quick wins
If you have 5 minutes, do these 3 first:
- [ ] [highest-impact fix]
- [ ] [second-most-important fix]
- [ ] [third-most-important fix]
```

---

**Version**: v1.0
