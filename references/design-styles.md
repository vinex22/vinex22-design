# Design philosophy library: 20 systems

> A design-style library for visual design (web / PPT / PDF / infographics / illustrations / app, etc.).
> Each style provides: philosophical core + key features + prompt DNA (combine with the scene templates).

## Style × Scenario × Execution-path quick lookup

| Style | Web | PPT | PDF | Infographic | Cover | AI gen | Best path |
|------|:---:|:---:|:---:|:-----------:|:---:|:------:|-----------|
| 01 Pentagram | ★★★ | ★★★ | ★★☆ | ★★☆ | ★★★ | ★☆☆ | HTML |
| 02 Stamen Design | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ | ★★☆ | Hybrid |
| 03 Information Architects | ★★★ | ★☆☆ | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | HTML |
| 04 Fathom | ★★☆ | ★★★ | ★★★ | ★★★ | ★★☆ | ★☆☆ | HTML |
| 05 Locomotive | ★★★ | ★★☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | Hybrid |
| 06 Active Theory | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★★ | AI gen |
| 07 Field.io | ★★☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI gen |
| 08 Resn | ★★★ | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★☆ | AI gen |
| 09 Experimental Jetset | ★★☆ | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★☆ | Hybrid |
| 10 Müller-Brockmann | ★★☆ | ★★★ | ★★★ | ★★★ | ★★☆ | ★☆☆ | HTML |
| 11 Build | ★★★ | ★★★ | ★★☆ | ★☆☆ | ★★★ | ★☆☆ | HTML |
| 12 Sagmeister & Walsh | ★★☆ | ★★★ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI gen |
| 13 Zach Lieberman | ★☆☆ | ★☆☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI gen |
| 14 Raven Kwok | ★☆☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI gen |
| 15 Ash Thorp | ★★☆ | ★★☆ | ★☆☆ | ★☆☆ | ★★★ | ★★★ | AI gen |
| 16 Territory Studio | ★★☆ | ★★☆ | ★☆☆ | ★★☆ | ★★★ | ★★★ | AI gen |
| 17 Takram | ★★★ | ★★★ | ★★★ | ★★☆ | ★★☆ | ★☆☆ | HTML |
| 18 Kenya Hara | ★★☆ | ★★★ | ★★★ | ★☆☆ | ★★★ | ★☆☆ | HTML |
| 19 Irma Boom | ★☆☆ | ★★☆ | ★★★ | ★★☆ | ★★★ | ★★☆ | Hybrid |
| 20 Neo Shen | ★★☆ | ★★☆ | ★★☆ | ★★☆ | ★★★ | ★★★ | AI gen |

> Scenario fit: ★★★ = strongly recommended / ★★☆ = suitable / ★☆☆ = needs adaptation
> AI gen: ★★★ = great direct output / ★★☆ = needs tweaks / ★☆☆ = HTML execution recommended
> Best path: AI gen (image direct output) / HTML (code-rendered, data-precise) / Hybrid (HTML layout + AI imagery)

**Key rule of thumb**: Styles with definite visual elements (illustration, particles, generative art) work great via AI. Styles depending on precise typography and data (grid, information architecture, whitespace) are more controllable rendered as HTML.

---

## I. Information-architecture school (01–04)
> Philosophy: "data isn't decoration, it's building material"

### 01. Pentagram — Michael Bierut style
**Philosophy**: type is language, the grid is thought
**Key features**:
- Extreme color restraint (black + white + 1 brand color)
- Modern interpretation of the Swiss grid
- Type as the primary visual language
- Strategic use of negative space (60%+ whitespace)

**Prompt DNA**:
```
Pentagram/Michael Bierut style:
- Extreme typographic hierarchy, Helvetica/Univers family
- Swiss grid with precise mathematical spacing
- Black/white + one accent color (#HEX)
- Information architecture as visual structure
- 60%+ whitespace ratio
- Data visualization as primary decoration
```

**Reference work**: Hillary Clinton 2016 campaign identity
**Search keywords**: pentagram hillary logo system

---

### 02. Stamen Design — data poetics
**Philosophy**: let data become a touchable landscape
**Key features**:
- Cartographic thinking applied to information design
- Algorithmically generated organic forms
- Warm data-viz palette (terracotta, sage green, deep blue)
- Interactive layered systems

**Prompt DNA**:
```
Stamen Design aesthetic:
- Cartographic approach to data visualization
- Organic, algorithm-generated patterns
- Warm palette (terracotta, sage green, deep blues)
- Layered information like topographic maps
- Hand-crafted feel despite digital precision
- Soft shadows and depth
```

**Reference work**: COVID-19 surge map
**Search keywords**: stamen covid map visualization

---

### 03. Information Architects — content-first
**Philosophy**: design isn't decoration; it's the architecture of content
**Key features**:
- Extreme clarity of content hierarchy
- System fonts only (optimized for reading)
- Defending the blue-hyperlink tradition
- Performance is aesthetics

**Prompt DNA**:
```
Information Architects philosophy:
- Content-first hierarchy, zero decorative elements
- System fonts only (SF Pro/Roboto/Inter)
- Classic blue hyperlinks (#0000EE)
- Reading-optimized line length (66 characters)
- Progressive disclosure of depth
- Text-heavy, fast-loading design
```

**Reference work**: iA Writer app
**Search keywords**: information architects ia writer

---

### 04. Fathom Information Design — scientific narrative
**Philosophy**: every pixel must carry information
**Key features**:
- Scientific-journal rigor + design elegance
- Precise quantitative data viz
- Cool professional palette (gray, navy)
- Designed footnote / citation system

**Prompt DNA**:
```
Fathom Information Design style:
- Scientific journal aesthetic meets modern design
- Precise data visualization (charts, timelines, scatter plots)
- Neutral scheme (grays, navy, one highlight color)
- Footnote/citation design integrated into layout
- Clean sans-serif (GT America/Graphik)
- Information density without clutter
```

**Reference work**: Bill & Melinda Gates Foundation annual report
**Search keywords**: fathom information design gates foundation

---

## II. Motion-poetics school (05–08)
> Philosophy: "technology itself is a kind of flowing poetry"

### 05. Locomotive — masters of scroll narrative
**Philosophy**: scrolling isn't browsing, it's a journey
**Key features**:
- Silky parallax scroll
- Cinematic scene-by-scene narration
- Bold spatial whitespace
- Precise choreography of motion elements

**Prompt DNA**:
```
Locomotive scroll narrative style:
- Film-like scene composition with parallax depth
- Generous vertical spacing between sections
- Bold typography emerging from darkness
- Smooth motion blur effects
- Dark mode (near-black backgrounds)
- Strategic glowing accents
- Hero sections 100vh tall
```

**Reference work**: Lusion.co website
**Search keywords**: locomotive scroll lusion

---

### 06. Active Theory — WebGL poets
**Philosophy**: making technology visible is making it understandable
**Key features**:
- 3D particle systems as core element
- Real-time data visualization
- Mouse-interaction-driven world building
- Neon + deep-space color

**Prompt DNA**:
```
Active Theory WebGL aesthetic:
- Particle systems representing data flow
- 3D visualization in depth space
- Neon gradients (cyan/magenta/electric blue) on dark
- Mouse-reactive environment
- Depth of field and bokeh effects
- Floating UI with glassmorphism
```

**Reference work**: NASA Prospect
**Search keywords**: active theory nasa webgl

---

### 07. Field.io — algorithmic aesthetics
**Philosophy**: code as designer
**Key features**:
- Generative-art systems
- Different visuals on each visit
- Intelligent orchestration of abstract geometry
- Balance of tech feel and artistry

**Prompt DNA**:
```
Field.io generative design style:
- Abstract geometric patterns, algorithmically generated
- Dynamic composition that feels computational
- Monochromatic base with vibrant accent
- Mathematical precision in spacing
- Voronoi diagrams or Delaunay triangulation
- Clean code aesthetic
```

**Reference work**: British Council digital installations
**Search keywords**: field.io generative design

---

### 08. Resn — narrative-driven interaction
**Philosophy**: every click advances the story
**Key features**:
- Gamified user journey
- Strongly emotional design
- Deep blend of illustration and code
- Non-linear exploration experience

**Prompt DNA**:
```
Resn interactive storytelling approach:
- Illustrative style mixed with UI elements
- Gamified exploration (progress indicators)
- Warm color palette despite tech subject
- Character-driven design
- Scroll-triggered animations
- Editorial illustration meets product design
```

**Reference work**: Resn.co.nz portfolio
**Search keywords**: resn interactive storytelling

---

## III. Minimalist school (09–12)
> Philosophy: "remove until you can remove no more"

### 09. Experimental Jetset — conceptual minimalism
**Philosophy**: one idea = one form
**Key features**:
- A single visual metaphor running through the whole design
- Mondrian-style blue / red / yellow + black / white
- Type as graphic
- Anti-commercial, honest design

**Prompt DNA**:
```
Experimental Jetset conceptual minimalism:
- Single visual metaphor for entire design
- Primary colors only (red/blue/yellow) + black/white
- Typography as main graphic element
- Grid-based with deliberate rule-breaking
- No photography, only type and geometry
- Anti-commercial, honest aesthetic
```

**Reference work**: Whitney Museum identity
**Search keywords**: experimental jetset whitney responsive w

---

### 10. Müller-Brockmann lineage — Swiss-grid purism
**Philosophy**: objectivity is beauty
**Key features**:
- Mathematically precise grid system (8pt baseline)
- Absolute left-align or center
- Mono- or two-color schemes
- Functionalism above all

**Prompt DNA**:
```
Josef Müller-Brockmann Swiss modernism:
- Mathematical grid system (8pt baseline)
- Strict alignment (flush left or centered)
- Two-color maximum (black + one accent)
- Akzidenz-Grotesk or similar rationalist typeface
- No decorative elements
- Timeless, objective aesthetic
```

**Reference work**: *Grid Systems in Graphic Design*
**Search keywords**: muller brockmann grid systems poster

---

### 11. Build — contemporary minimalist branding
**Philosophy**: refined simplicity is harder than complexity
**Key features**:
- Luxury-grade whitespace (70%+)
- Subtle weight contrasts (200–600)
- Strategic use of a single accent color
- Breathing rhythm

**Prompt DNA**:
```
Build studio luxury minimalism:
- Generous whitespace (70%+ of area)
- Subtle typography weight shifts (200 to 600)
- Single accent color used sparingly
- High-end product photography aesthetic
- Soft shadows and subtle gradients
- Golden ratio proportions
```

**Reference work**: Build studio portfolio
**Search keywords**: build studio london branding

---

### 12. Sagmeister & Walsh — joyful minimalism
**Philosophy**: beauty is the emotional dimension of function
**Key features**:
- Unexpected color bursts
- Fusion of handcraft and digital
- Positive-energy visual language
- Experimental yet readable

**Prompt DNA**:
```
Sagmeister & Walsh joyful philosophy:
- Unexpected color bursts on minimal base
- Handmade elements (physical objects in digital)
- Optimistic visual language
- Experimental typography that remains legible
- Human warmth through imperfection
- Mix of analog and digital aesthetics
```

**Reference work**: The Happy Show
**Search keywords**: sagmeister walsh happy show

---

## IV. Experimental-vanguard school (13–16)
> Philosophy: "breaking rules is creating rules"

### 13. Zach Lieberman — code poetics
**Philosophy**: programming is drawing
**Key features**:
- Hand-drawn-feel algorithmic graphics
- Real-time generative art
- Pure black-and-white expression
- Visibility of the tool itself

**Prompt DNA**:
```
Zach Lieberman code-as-art style:
- Hand-drawn aesthetic generated by code
- Black and white only, no color
- Real-time generative patterns
- Sketch-like line quality
- Visible process/grid/construction lines
- Poetic interpretation of algorithms
```

**Reference work**: openFrameworks creative coding
**Search keywords**: zach lieberman openframeworks generative

---

### 14. Raven Kwok — parametric aesthetics
**Philosophy**: the beauty of systems beats the beauty of individuals
**Key features**:
- Fractals and recursive graphics
- High-contrast black-and-white
- Architectural information structure
- Algorithmic interpretation of Eastern garden principles

**Prompt DNA**:
```
Raven Kwok parametric aesthetic:
- Fractal patterns and recursive structures
- High-contrast black and white
- Architectural visualization of data
- Chinese garden principles in algorithm form
- Intricate detail that rewards zooming
- Processing/Creative coding aesthetic
```

**Reference work**: Raven Kwok generative art exhibitions
**Search keywords**: raven kwok processing generative art

---

### 15. Ash Thorp — cyber poetry
**Philosophy**: the future isn't cold; it's a lonely poem
**Key features**:
- Cinema-grade light and shadow
- Warm cyberpunk (orange / teal, NOT cold blue)
- Story-driven concept design
- Refined industrial aesthetics

**Prompt DNA**:
```
Ash Thorp cinematic concept art:
- Film-grade lighting and atmospheric effects
- Warm cyberpunk (orange/teal, NOT cold blue)
- Industrial design meets luxury
- Narrative concept art feel
- Volumetric lighting and god rays
- Blade Runner warmth over Tron coldness
```

**Reference work**: Ghost in the Shell concept art
**Search keywords**: ash thorp ghost shell concept art

---

### 16. Territory Studio — fictional screen UI
**Philosophy**: today's imagination of future UI
**Key features**:
- Sci-fi screen graphics (FUI)
- Holographic-projection feel
- Multi-layer overlapped data viz
- Believable future feel

**Prompt DNA**:
```
Territory Studio FUI (Fantasy User Interface):
- Fantasy User Interface design
- Holographic projection aesthetics
- Orange/amber monochrome or cyan accents
- Multiple overlapping data layers
- Believable future technology
- Technical readouts and data streams
```

**Reference work**: Blade Runner 2049 screen graphics
**Search keywords**: territory studio blade runner interface

---

## V. Eastern-philosophy school (17–20)
> Philosophy: "emptiness is content"

### 17. Takram — Japanese speculative design
**Philosophy**: technology is a medium for thinking
**Key features**:
- Elegant concept prototypes
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts as art
- Modest sophistication

**Prompt DNA**:
```
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry
```

**Reference work**: NHK Fabricated City
**Search keywords**: takram nhk data visualization

---

### 18. Kenya Hara — design of emptiness
**Philosophy**: design is not filling; it is emptying
**Key features**:
- Extreme whitespace (80%+)
- Digital paper-tactility
- Layers of white (warm white, cool white, off-white)
- Visualizing the tactile

**Prompt DNA**:
```
Kenya Hara "emptiness" design:
- Extreme whitespace (80%+)
- Paper texture and tactility in digital form
- Layers of white (warm white, cool white, off-white)
- Minimal color (if any, very desaturated)
- Design by subtraction not addition
- Zen simplicity
```

**Reference work**: Muji art direction, *Designing Design*
**Search keywords**: kenya hara designing design muji

---

### 19. Irma Boom — book architect
**Philosophy**: the physical poetics of information
**Key features**:
- Non-linear information architecture
- Play with edges and boundaries
- Unexpected color combos (pink+red, orange+brown)
- Digital translation of craft

**Prompt DNA**:
```
Irma Boom book architecture style:
- Non-linear information structure
- Play with edges, margins, boundaries
- Unexpected color combos (pink+red, orange+brown)
- Handcraft translated to digital
- Dense information inviting exploration
- Editorial design, unconventional grid
```

**Reference work**: SHV Think Book (2,136 pages)
**Search keywords**: irma boom shv think book

---

### 20. Neo Shen — Eastern light-and-shadow poetry
**Philosophy**: technology needs human warmth
**Key features**:
- Digital ink-wash diffusion
- Soft halo / light-bloom effects
- Poetic whitespace
- Emotional palette (deep blue, warm gray, soft gold)

**Prompt DNA**:
```
Neo Shen poetic Chinese aesthetic:
- Digital interpretation of ink wash painting
- Soft glow and light diffusion effects
- Poetic negative space
- Emotional palette (deep blues, warm grays, soft gold)
- Calligraphic influences in typography
- Atmospheric depth
```

**Reference work**: Neo Shen digital art series
**Search keywords**: neo shen digital ink wash art

---

## How to use the prompt library

**Combination formula**: `[style prompt DNA] + [scene template (see scene-templates.md)] + [specific content]`

### Core principle: describe mood, not layout

The key to AI image generation: short prompts > long prompts. Three sentences of mood and content beat thirty lines of layout detail.

| Diversity-killing writing | Creativity-igniting writing |
|---|---|
| Specifying color ratios (60% / 25% / 15%) | Describing a mood ("warm like Sunday morning") |
| Hard layout positions ("title centered, image right") | Citing a specific aesthetic ("Pentagram editorial feel") |
| Locking character poses and expressions | Letting AI naturally interpret the style |
| Listing every visual element | Describing what the viewer should feel |

### Good / Bad examples

**Bad — over-constrained (the AI output is empty and flat)**:
```
Professional presentation slide. Dark background, light text.
Title centered at top. Two columns below. Left column: bullet points.
Right column: bar chart. Colors: navy 60%, white 30%, gold 10%.
Font size: title 36pt, body 18pt. Margins: 40px all sides.
```

**Good — mood-driven (output is varied and textured)**:
```
A data visualization that feels like a Bloomberg Businessweek
editorial spread. The key number "28.5%" should dominate the
composition like a headline. Warm cream tones with sharp black
typography. The data tells a story of dramatic channel shift.
```

### Choosing the execution path

Pick from the lookup table's "best path" column:
- **AI gen**: styles with explicit visual elements (06/07/12/13/14/15/16/20) — direct output via Gemini / Midjourney
- **HTML render**: styles depending on precise typography (01/03/04/10/11/17/18) — code controls data and layout
- **Hybrid**: HTML scaffold + AI-generated imagery / background (02/05/08/09/19)

### Quality control

1. ❌ Don't write "in the style of Pentagram" → ✅ describe the actual design features
2. Text in AI generation often comes out wrong → replace text after generating
3. Aspect ratio drifts easily → specify it explicitly
4. Generate 3–5 variants first, pick the best, then refine

**Default aesthetic exclusions** (the user can override per their brand):
- ❌ cyber-neon / dark blue background (#0D1117)
- ❌ personal signature / watermark on cover images

---

**Version**: v2.1
**Updated**: 2026-02-13
**Applies to**: web / PPT / PDF / infographics / covers / illustrations / app — all visual design
**Pairs with image-to-slides**: PPT scenarios can reference styles here directly and execute via the image-to-slides skill.
