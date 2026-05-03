# Design Philosophy Showcases — sample asset index

> 8 scenarios × 3 styles = 24 pre-built design samples
> Used during Phase 3 design-direction recommendations to directly show "what this style looks like in practice"

> ⚠️ **Note**: Only HTML source files are included in this English derivative. The original PNG screenshots
> are intentionally omitted to keep the repository lightweight and free of binary artifacts. To regenerate
> the PNG screenshots, open each `.html` in a browser at the listed dimensions and screenshot, or run:
>
> ```bash
> python ../../scripts/verify.py path/to/showcase.html --viewports 1440x900
> ```

## Style legend

| Code | School | Style name | Visual feel |
|------|--------|------------|-------------|
| **Pentagram** | Information architecture | Pentagram / Michael Bierut | Restrained black/white, Swiss grid, strong type hierarchy, #E63946 red accent |
| **Build** | Minimalism | Build Studio | Luxury whitespace (70%+), subtle weight (200-600), #D4A574 warm gold, refined |
| **Takram** | Eastern philosophy | Takram | Soft tech feel, natural colors (beige/grey/green), rounded corners, charts as art |

## Scenario quick-look

### Content design scenarios

| # | Scenario | Spec | Pentagram | Build | Takram |
|---|----------|------|-----------|-------|--------|
| 1 | Newsletter cover | 1200×510 | `cover/cover-pentagram` | `cover/cover-build` | `cover/cover-takram` |
| 2 | Slide data page | 1920×1080 | `ppt/ppt-pentagram` | `ppt/ppt-build` | `ppt/ppt-takram` |
| 3 | Vertical infographic | 1080×1920 | `infographic/infographic-pentagram` | `infographic/infographic-build` | `infographic/infographic-takram` |

### Website design scenarios

| # | Scenario | Spec | Pentagram | Build | Takram |
|---|----------|------|-----------|-------|--------|
| 4 | Personal homepage | 1440×900 | `website-homepage/homepage-pentagram` | `website-homepage/homepage-build` | `website-homepage/homepage-takram` |
| 5 | AI directory | 1440×900 | `website-ai-nav/ainav-pentagram` | `website-ai-nav/ainav-build` | `website-ai-nav/ainav-takram` |
| 6 | AI writing tool | 1440×900 | `website-ai-writing/aiwriting-pentagram` | `website-ai-writing/aiwriting-build` | `website-ai-writing/aiwriting-takram` |
| 7 | SaaS landing page | 1440×900 | `website-saas/saas-pentagram` | `website-saas/saas-build` | `website-saas/saas-takram` |
| 8 | Developer docs | 1440×900 | `website-devdocs/devdocs-pentagram` | `website-devdocs/devdocs-build` | `website-devdocs/devdocs-takram` |

> Each entry has a `.html` source file. PNG screenshots are not included (see note above).

## How to use

### Reference during Phase 3 recommendations
After recommending a design direction, show the matching scenario's pre-built showcase:
```
"Here's what Pentagram style looks like for a newsletter cover → [show cover/cover-pentagram.html]"
"And here's how Takram style handles a slide data page → [show ppt/ppt-takram.html]"
```

### Scenario-matching priority
1. User's scenario has an exact match → show it directly
2. No exact match but a close one → show the closest analog (e.g. "product website" → show SaaS landing page)
3. No match at all → skip pre-built samples, jump straight to Phase 3.5 live generation

### Side-by-side comparison
The 3 styles for the same scenario work well side-by-side, helping users compare directly:
- "Here's the same newsletter cover, done in 3 styles"
- Recommended order: Pentagram (rational, restrained) → Build (luxury, minimal) → Takram (soft, warm)

## Content details

### Newsletter cover (cover/)
- Content: AI coding agent workflow — 8 parallel agents architecture
- Pentagram: giant red "8" + Swiss grid lines + data bars
- Build: ultra-thin "Agent" floating in 70% whitespace + warm gold hairlines
- Takram: 8-node radial flow as art piece + beige base

### Slide data page (ppt/)
- Content: GLM-4.7 open-source model coding-ability breakthrough (AIME 95.7 / SWE-bench 73.8% / τ²-Bench 87.4)
- Pentagram: 260px "95.7" anchor + red/grey/light-grey contrasting bar chart
- Build: three groups of 120px ultra-thin numbers floating + warm gold gradient bars
- Takram: SVG radar chart + tri-color overlay + rounded data cards

### Vertical infographic (infographic/)
- Content: AI memory system — agent context optimized from 93KB to 22KB
- Pentagram: giant "93→22" numbers + numbered blocks + CSS data bars
- Build: extreme whitespace + soft-shadow cards + warm gold connector lines
- Takram: SVG ring chart + organic curve flow + frosted glass cards

### Personal homepage (website-homepage/)
- Content: indie developer Alex Chen's portfolio homepage
- Pentagram: 112px name + Swiss grid columns + editorial numerals
- Build: glassmorphic nav + floating stat cards + ultra-thin weight
- Takram: paper-textured bg + small round avatar + hairline dividers + asymmetric layout

### AI directory (website-ai-nav/)
- Content: AI Compass — 500+ AI tools directory
- Pentagram: square search box + numbered tool list + uppercase category labels
- Build: rounded search box + refined white tool cards + pill labels
- Takram: organic offset card layout + soft category labels + chart-style connections

### AI writing tool (website-ai-writing/)
- Content: Inkwell — AI writing assistant
- Pentagram: 86px headline + wireframe editor mockup + grid feature list
- Build: floating editor card + warm gold CTA + luxury writing experience
- Takram: poetic serif headline + organic editor + flow diagram

### SaaS landing page (website-saas/)
- Content: Meridian — business intelligence analytics platform
- Pentagram: black/white split + structured dashboard + 140px "3x" anchor
- Build: floating dashboard card + SVG area chart + warm gold gradient
- Takram: rounded bar chart + flow nodes + soft earthy palette

### Developer docs (website-devdocs/)
- Content: Nexus API — unified AI model gateway
- Pentagram: left nav + square code block + red string-literal highlight
- Build: centered floating code card + soft shadow + warm gold icons
- Takram: beige code block + flow-diagram connections + dashed feature cards

## File stats

- HTML source files: 24
- PNG screenshots: 0 (not included; regenerate from HTML — see note above)

---

**Version**: v1.0
**Adapted from**: alchaincyf/huashu-design (English translation by vinex22)
**For use with**: vinex22-design skill, Phase 3 recommendation step
