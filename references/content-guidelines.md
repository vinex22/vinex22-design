# Content Guidelines: anti-AI-slop, content rules, scale rules

The most common pitfall in AI-driven design. This is a "what NOT to do" list, more important than a "what to do" list — AI slop is the default, and if you don't actively avoid it, it happens.

## Full AI-slop blacklist

### Visual traps

**❌ Aggressive gradient backgrounds**
- Purple → pink → blue full-screen gradient (the signature flavor of AI-generated webpages)
- Rainbow gradient in any direction
- Mesh gradient covering the background
- ✅ If you must use a gradient: subtle, single hue, intentionally placed (e.g., button hover)

**❌ Rounded card + left-border accent color**
```css
/* The signature look of an AI card */
.card {
  border-radius: 12px;
  border-left: 4px solid #3b82f6;
  padding: 16px;
}
```
This style floods AI-generated dashboards. Want emphasis? Use a more design-aware approach: background-color contrast, weight / size contrast, plain dividers, or simply no card at all.

**❌ Emoji decoration**
Unless the brand itself uses emoji (Notion, Slack), don't put emoji in the UI. **Especially do not** use:
- 🚀 ⚡️ ✨ 🎯 💡 in front of headings
- ✅ in feature lists
- → as a CTA-button affix (a standalone arrow is OK; an emoji arrow is not)

No icon? Use a real icon library (Lucide / Heroicons / Phosphor), or a placeholder.

**❌ SVG for imagery**
Don't try to draw with SVG: people, scenes, devices, objects, abstract art. AI-drawn SVG imagery instantly reads as AI — childish and cheap. **A gray rectangle + a "1200×800 illustration" text label beats a clumsy SVG hero illustration 100×.**

The only legitimate uses of SVG:
- Real icons (16×16 to 32×32 range)
- Geometric decorative shapes
- Data-viz charts

**❌ Excessive iconography**
Not every heading / feature / section needs an icon. Icon overuse makes UI look toy-like. Less is more.

**❌ "Data slop"**
Decorative fabricated stats:
- "10,000+ happy customers" (you don't actually know)
- "99.9% uptime" (don't write it without real data)
- Decorative "metric cards" made of icon + number + word
- Mock tables tarted up with dressy fake data

If you don't have real data, leave a placeholder or ask the user.

**❌ "Quote slop"**
Fabricated user testimonials and famous quotes used as decoration. Leave a placeholder; ask the user for real quotes.

### Typography traps

**❌ Avoid these overused fonts**:
- Inter (the AI-generated webpage default)
- Roboto
- Arial / Helvetica
- Pure system font stack
- Fraunces (AI discovered this and overused it)
- Space Grotesk (recent AI favorite)

**✅ Use a character-rich display + body pair.** Direction inspiration:
- Serif display + sans body (editorial feel)
- Mono display + sans body (technical feel)
- Heavy display + light body (contrast)
- Variable font for hero weight animation

Font sources:
- Cold gems on Google Fonts (Instrument Serif, Cormorant, Bricolage Grotesque, JetBrains Mono)
- Open-source font sites (Fraunces sibling fonts, Adobe Fonts)
- Don't invent font names from thin air

### Color traps

**❌ Inventing colors out of nothing**
Don't design an entire palette from scratch in unfamiliar territory. It usually doesn't harmonize.

**✅ Strategy**:
1. Has brand color → use it; fill missing tokens via oklch interpolation
2. No brand color but has reference → eyedrop colors from reference product screenshots
3. Fully from zero → pick a known color system (Radix Colors / Tailwind default palette / Anthropic brand); don't tune your own

**Defining color in oklch** is the modern approach:
```css
:root {
  --primary: oklch(0.65 0.18 25);      /* warm terracotta */
  --primary-light: oklch(0.85 0.08 25); /* same hue, lighter */
  --primary-dark: oklch(0.45 0.20 25);  /* same hue, darker */
}
```
oklch keeps the hue stable when you adjust lightness — better than hsl.

**❌ Slapping inverted colors as "dark mode"**
It is not simply inverting colors. A good dark mode needs re-tuned saturation, contrast, and accent colors. If you don't want to do dark mode properly, don't.

### Layout traps

**❌ Bento grid overuse**
Every AI-generated landing page wants to do bento. Unless your information structure genuinely fits bento, use another layout.

**❌ Big hero + 3-column features + testimonials + CTA**
This landing-page template has been used to death. If you want to innovate, actually innovate.

**❌ Card grid where every card looks identical**
Asymmetric, different-sized cards, some with images and some text-only, some spanning columns — that's what a real designer's work looks like.

## Content rules

### 1. Don't add filler content

Every element must earn its place. Whitespace is a design problem solved by **composition** (contrast, rhythm, breathing room), **not** by stuffing in content.

**How to spot filler**:
- If you remove this content, does the design get worse? If not, remove it.
- What real problem does this element solve? If "to make the page less empty", delete it.
- Does this stat / quote / feature have real data backing it? If not, don't fabricate.

"One thousand no's for every yes."

### 2. Ask before adding material

Think a section / page / feature would make it better? Ask the user first. Don't unilaterally add it.

Why:
- The user knows their audience better than you
- Adding content has a cost; the user may not want it
- Unilateral additions violate the "junior designer reporting to manager" relationship

### 3. Create a system up front

After exploring the design context, **state out loud the system you'll use**, and let the user confirm:

```markdown
My design system:
- Color: #1A1A1A primary + #F0EEE6 background + #D97757 accent (from your brand)
- Typography: Instrument Serif for display + Geist Sans for body
- Rhythm: section titles use full-bleed colored backgrounds + white text; regular sections use white background
- Imagery: hero uses a full-bleed photo; feature sections use placeholders pending your input
- At most 2 background colors to avoid clutter

Confirm this direction and I'll start.
```

Wait for confirmation before moving. This check-in avoids "halfway through and the direction is wrong".

## Scale rules

### Slides (1920×1080)

- Body min **24px**, ideal 28–36px
- Heading 60–120px
- Section title 80–160px
- Hero headline can use 180–240px
- Never use < 24px text on slides

### Print documents

- Body min **10pt** (≈13.3px), ideal 11–12pt
- Heading 18–36pt
- Caption 8–9pt

### Web and mobile

- Body min **14px** (16px friendlier for older readers)
- Mobile body **16px** (avoid iOS auto-zoom)
- Hit target (clickable element) min **44×44px**
- Line height 1.5–1.7 (1.7–1.8 for CJK)

### Contrast

- Body vs background **at least 4.5:1** (WCAG AA)
- Large text vs background **at least 3:1**
- Use Chrome DevTools' accessibility tool to check

## CSS power tools

**Advanced CSS features** are a designer's friend — use boldly:

### Typography

```css
/* Lets headings wrap naturally; no orphan word on the last line */
h1, h2, h3 { text-wrap: balance; }

/* Body text wrapping; avoids widows and orphans */
p { text-wrap: pretty; }

/* CJK typography power: punctuation kerning, line-start/end control */
p {
  text-spacing-trim: space-all;
  hanging-punctuation: first;
}
```

### Layout

```css
/* CSS Grid + named areas = readability through the roof */
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 240px 1fr;
  grid-template-rows: auto 1fr auto;
}

/* Subgrid aligns children inside cards */
.card { display: grid; grid-template-rows: subgrid; }
```

### Visual effects

```css
/* Designed scrollbars */
* { scrollbar-width: thin; scrollbar-color: #666 transparent; }

/* Glass-morphism (use sparingly) */
.glass {
  backdrop-filter: blur(20px) saturate(150%);
  background: color-mix(in oklch, white 70%, transparent);
}

/* View transitions API for silky page transitions */
@view-transition { navigation: auto; }
```

### Interaction

```css
/* :has() makes conditional styling easy */
.card:has(img) { padding-top: 0; } /* cards with images get no top padding */

/* Container queries make components actually responsive */
@container (min-width: 500px) { ... }

/* New color-mix function */
.button:hover {
  background: color-mix(in oklch, var(--primary) 85%, black);
}
```

## Decision quick-ref: when you hesitate

- Want to add a gradient? → probably don't
- Want to add an emoji? → don't
- Want to add a rounded card + left-border accent? → don't, use another approach
- Want to draw a hero illustration in SVG? → don't, use a placeholder
- Want to add a decorative quote? → ask the user for a real one first
- Want to add a row of icon features? → ask if icons are even needed; probably not
- Reach for Inter? → swap for something with more character
- Reach for purple gradient? → swap for a justified palette

**When you feel "adding this would look better" — that's usually the AI-slop signal**. Build the simplest version first; only add more on user request.
