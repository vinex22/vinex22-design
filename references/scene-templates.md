# Scene template library: organized by output type

> Use together with "prompt DNA" in design-styles.md.
> Formula: `[style prompt DNA] + [scene template] + [specific content description]`

---

## 1. Article cover / WeChat / blog header image

**Specs**:
- Cover: 2.35:1 (900×383px or 1200×510px)
- Body illustration: 16:9 (1200×675px) or 4:3 (1200×900px)

**Key design factors**:
- Visual impact first (viewers scan quickly in feeds)
- Minimal or no text (titles will overlay it)
- Moderate color saturation (white reading environment)
- Avoid over-detail (must remain recognizable as a thumbnail)

**Recommended styles**: 01 Pentagram / 11 Build / 12 Sagmeister / 18 Kenya Hara / 07 Field.io

**Scene prompt template**:
```
[insert style DNA here]
- Article cover image for blog / newsletter
- Landscape format, 2.35:1 aspect ratio
- Bold visual impact, minimal or no text
- Moderate color saturation for white reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point
```

---

## 2. Body illustration / concept image

**Specs**:
- 16:9 (1200×675px) most generic
- 1:1 (800×800px) for emphasis
- 4:3 (1200×900px) for information-dense

**Key design factors**:
- Serves the article's argument; not decoration
- Forms a visual rhythm with surrounding context
- Conveys one concept cleanly
- Prefer AI generation; HTML screenshots only for precise data tables

**Recommended styles**: choose based on article tone; common picks include 01 / 04 / 10 / 17 / 18

**Scene prompt template**:
```
[insert style DNA here]
- Article illustration, concept visualization
- [16:9 / 1:1 / 4:3] aspect ratio
- Single clear concept: [describe core concept]
- Serve the argument, not decoration
- [Light/Dark] background to match article tone
```

---

## 3. Infographic / data visualization

**Specs**:
- Vertical long-image: 1080×1920px (mobile reading)
- Horizontal: 1920×1080px (article-embedded)
- Square: 1080×1080px (social media)

**Key design factors**:
- Clear hierarchy (title → key data → details)
- Accurate data; no fabrication
- Visual flow lines (the reader's path)
- Use icons / charts to aid comprehension

**Recommended styles**: 04 Fathom / 10 Müller-Brockmann / 02 Stamen / 17 Takram

**Scene prompt template**:
```
[insert style DNA here]
- Infographic / data visualization
- [Vertical 1080x1920 / Horizontal 1920x1080 / Square 1080x1080]
- Clear information hierarchy: title → key data → details
- Visual flow guiding reader's eye path
- Icons and charts for comprehension
- Data-accurate, no decorative distortion
```

---

## 4. PPT / Keynote presentation

**Specs**:
- Standard: 16:9 (1920×1080px)
- Wide: 16:10 (1920×1200px)

**Key design factors**:
- One core message per slide (no piling)
- Clear type hierarchy (title 40pt+ / body 24pt+ / caption 16pt+)
- Plenty of whitespace (clearer when projected)
- Image-to-text ratio at least 60:40
- Consistent visual system (color, font, spacing)

**Recommended styles**: 01 Pentagram / 10 Müller-Brockmann / 11 Build / 18 Kenya Hara / 04 Fathom

**Scene prompt template**:
```
[insert style DNA here]
- Presentation slide design, 16:9
- One core message per slide
- Clear type hierarchy (title 40pt+, body 24pt+)
- Generous whitespace for projection clarity
- Consistent visual system throughout
- [Light/Dark] theme
```

---

## 5. PDF whitepaper / technical report

**Specs**:
- A4 portrait (210×297mm / 595×842pt)
- Letter portrait (216×279mm / 612×792pt)

**Key design factors**:
- Long-form reading optimization (66-char line width, 1.5–1.8 line height)
- Clear chapter-navigation system
- Unified header / footer / page-number design
- Elegant coexistence of charts and body
- Citations / footnotes system
- Refined cover page

**Recommended styles**: 10 Müller-Brockmann / 04 Fathom / 03 Information Architects / 17 Takram / 19 Irma Boom

**Scene prompt template**:
```
[insert style DNA here]
- PDF document / white paper design
- A4 portrait format (210×297mm)
- Long-form reading optimized (66 char line width, 1.5 line height)
- Clear chapter navigation system
- Elegant header/footer/page number design
- Charts integrated with body text
- Professional cover page
```

---

## 6. Landing page / product website

**Specs**:
- Desktop: 1440px design width (responsive down to 320px)
- First viewport height: 100vh

**Key design factors**:
- Communicate core value within 5 seconds of first viewport
- Clear CTA (call-to-action button)
- Scroll narrative structure (problem → solution → proof → action)
- Mobile responsive
- Loading speed

**Recommended styles**: 05 Locomotive / 01 Pentagram / 11 Build / 08 Resn / 06 Active Theory

**Scene prompt template**:
```
[insert style DNA here]
- Landing page / product website
- Desktop 1440px width, responsive
- Hero section 100vh, core value in 5 seconds
- Clear CTA button design
- Scroll narrative: problem → solution → proof → action
- Modern web aesthetic
```

---

## 7. App UI / prototype interface

**Specs**:
- iOS: 390×844pt (iPhone 15)
- Android: 360×800dp
- Tablet: 1024×1366pt (iPad Pro)

**Key design factors**:
- Touch-friendly (min 44×44pt tap target)
- Consistency with the system's design language
- Standard treatment of status bar / nav bar / tab bar
- Moderate information density (mobile shouldn't be overly dense)

**Recommended styles**: 17 Takram / 11 Build / 03 Information Architects / 01 Pentagram

**Scene prompt template**:
```
[insert style DNA here]
- Mobile app UI design
- iOS [390×844pt] / Android [360×800dp]
- Touch-friendly (44pt minimum tap targets)
- Consistent design system
- Standard status bar / navigation / tab bar
- Moderate information density
```

---

## 8. Social-media supporting image

**Specs**:
- Vertical: 3:4 (1080×1440px) ideal
- Square: 1:1 (1080×1080px)
- The cover image determines click-through rate

**Key design factors**:
- Visual attractiveness first (competing in a waterfall feed)
- A small amount of text is OK (under 20% of the canvas)
- Vivid but tasteful colors
- Lifestyle / texture / atmosphere feel

**Recommended styles**: 12 Sagmeister / 11 Build / 20 Neo Shen / 09 Experimental Jetset

**Scene prompt template**:
```
[insert style DNA here]
- Social media post image
- Vertical 3:4 (1080×1440px)
- Eye-catching in a waterfall feed
- Minimal text overlay (under 20% of area)
- Vivid but tasteful colors
- Lifestyle / texture / atmosphere feel
```

---

## Combination example

**Scenario**: Blog cover for an AI coding tool, professional yet warm

**Step 1**: pick a style → 17 Takram (professional + warm)
**Step 2**: take Takram's prompt DNA + the blog-cover template

```
Takram Japanese speculative design:
- Elegant concept prototypes and diagrams
- Soft tech aesthetic (rounded corners, gentle shadows)
- Charts and diagrams as art pieces
- Modest sophistication
- Neutral natural colors (beige, soft gray, muted green)
- Design as philosophical inquiry

Article cover image for blog
- Landscape format, 2.35:1 aspect ratio (1200×510px)
- Bold visual impact, minimal text
- Moderate color saturation for white reading environment
- Must remain recognizable as thumbnail
- Clean composition with clear focal point

Content: An AI coding assistant tool, showing the concept of human-AI collaboration
in software development, warm and professional atmosphere
```

---

**Version**: v1.0
