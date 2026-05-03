# Design Context: starting from existing context

**This is the most important "one thing" in this skill.**

Good hi-fi design always grows from existing design context. **Drawing hi-fi from nothing is a last resort and will produce generic output.** So at the start of every design task, ask: is there anything to reference?

## What is Design Context

In priority order, high to low:

### 1. The user's design system / UI kit
The component library, color tokens, typography rules, and icon system the user's product already has. **The perfect case.**

### 2. The user's codebase
If the user provides a code repo, real component implementations live inside. Read those component files:
- `theme.ts` / `colors.ts` / `tokens.css` / `_variables.scss`
- Concrete components (Button.tsx, Card.tsx)
- Layout scaffold (App.tsx, MainLayout.tsx)
- Global stylesheets

**Read the code and copy exact values**: hex codes, spacing scale, font stack, border radius. Do not redraw from memory.

### 3. The user's published product
If the user has a live product but didn't provide code, use Playwright or have the user supply screenshots.

```bash
# Screenshot a public URL with Playwright
npx playwright screenshot https://example.com screenshot.png --viewport-size=1920,1080
```

This shows you the real visual vocabulary.

### 4. Brand guidelines / Logo / existing material
The user might have: logo files, brand-color rules, marketing collateral, slide templates. These are all context.

### 5. Competitor reference
The user says "like XX". Have them supply a URL or screenshot. **Do not** work from a vague impression in your training data.

### 6. Known design systems (fallback)
If none of the above exists, use a recognized design system as a base:
- Apple HIG
- Material Design 3
- Radix Colors (color)
- shadcn/ui (components)
- Tailwind default palette

Tell the user explicitly which one you're using; let them know it's a starting point, not the final.

## How to obtain context

### Step 1: Ask the user

Mandatory questions at task kickoff (from `workflow.md`):

```markdown
1. Do you have a design system / UI kit / component library? Where?
2. Brand guidelines, color / typography rules?
3. Can you give me screenshots or a URL of the existing product?
4. Codebase I can read?
```

### Step 2: When the user says "no", help them find it

Don't just give up. Try:

```markdown
Let me look for clues:
- Do your previous projects have related design?
- What color / typography does your company's marketing site use?
- Your product's logo — what style? Can you send one?
- Any product you admire as a reference?
```

### Step 3: Read every piece of context you can find

If the user gave a codebase path, read:
1. **List the file structure first**: find style / theme / component-related files
2. **Read theme/token files**: lift specific hex / px values
3. **Read 2–3 representative components**: see the visual vocabulary (hover state, shadow, border, padding pattern)
4. **Read the global stylesheet**: base reset, font loading
5. **If there are Figma links / screenshots**: look at the image, but **trust the code more**

**Important**: **don't** glance and then work from impression. You haven't really lifted context until you have 30+ concrete values.

### Step 4: Vocalize the system you'll use

After reading context, tell the user the system you'll use:

```markdown
Based on your codebase and product screenshots, the design system I distilled:

**Color**
- Primary: #C27558 (from tokens.css)
- Background: #FDF9F0
- Text: #1A1A1A
- Muted: #6B6B6B

**Typography**
- Display: Instrument Serif (from global.css's @font-face)
- Body: Geist Sans
- Mono: JetBrains Mono

**Spacing** (from your scale system)
- 4, 8, 12, 16, 24, 32, 48, 64

**Shadow patterns**
- `0 1px 2px rgba(0,0,0,0.04)` (subtle card)
- `0 10px 40px rgba(0,0,0,0.1)` (elevated modal)

**Border-radius**
- Small components 4px, cards 12px, buttons 8px

**Component vocabulary**
- Button: filled primary, outlined secondary, ghost tertiary; all 8px corner
- Card: white background, subtle shadow, no border

I'll start with this system. Confirm it's right?
```

Wait for the user to confirm before moving.

## When you have to design without context (fallback)

**Strong warning**: output quality will drop noticeably in this case. Tell the user.

```markdown
You don't have design context, so I can only work from generic intuition.
The output will be "looks OK but lacks uniqueness".
Want to continue, or supply some reference material first?
```

If the user insists, decide in this order:

### 1. Pick one aesthetic direction
Don't deliver a generic result. Choose a clear direction:
- brutally minimal
- editorial / magazine
- brutalist / raw
- organic / natural
- luxury / refined
- playful / toy
- retro-futuristic
- soft / pastel

Tell the user which one you picked.

### 2. Pick a known design system as the skeleton
- Use Radix Colors for palette (https://www.radix-ui.com/colors)
- Use shadcn/ui for component vocabulary (https://ui.shadcn.com)
- Use Tailwind spacing scale (multiples of 4)

### 3. Pick a character-rich font pair

Don't use Inter / Roboto. Suggested pairs (free from Google Fonts):
- Instrument Serif + Geist Sans
- Cormorant Garamond + Inter Tight
- Bricolage Grotesque + Söhne (paid)
- Fraunces + Work Sans (note: Fraunces has been overused by AI)
- JetBrains Mono + Geist Sans (technical feel)

### 4. Every key decision has reasoning

Don't choose silently. Write it in HTML comments:

```html
<!--
Design decisions:
- Primary color: warm terracotta (oklch 0.65 0.18 25) — fits the "editorial" direction
- Display: Instrument Serif for humanist, literary feel
- Body: Geist Sans for clean contrast
- No gradients — committed to minimal, no AI slop
- Spacing: 8px base, golden-ratio friendly (8/13/21/34)
-->
```

## Import strategy (when the user supplies a codebase)

If the user says "import this codebase as reference":

### Small (< 50 files)
Read them all; internalize the context.

### Medium (50–500 files)
Focus on:
- `src/components/` or `components/`
- All styles / tokens / theme-related files
- 2–3 representative full-page components (Home.tsx, Dashboard.tsx)

### Large (> 500 files)
Have the user point to the focus:
- "I'm building the settings page" → read existing settings-related files
- "I'm building a new feature" → read the overall shell + the closest reference
- Don't aim for completeness; aim for accuracy.

## Working with Figma / design files

If the user gives a Figma link:

- **Don't** expect to "convert Figma to HTML" directly — that needs a separate tool
- Figma links are usually not publicly accessible
- Ask the user to: export as **screenshots** and tell you specific color / spacing values

If only Figma screenshots are provided, tell the user:
- I can see the visuals but can't extract precise values
- Tell me the key numbers (hex, px), or export as code (Figma supports it)

## A final reminder

**The ceiling on a project's design quality is set by the quality of the context you receive.**

10 minutes of context-gathering is more valuable than 1 hour of drawing hi-fi from nothing.

**When you face a no-context situation, prioritize asking the user, not pushing through.**
