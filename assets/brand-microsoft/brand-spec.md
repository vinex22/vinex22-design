# Microsoft / Fluent 2 Brand Spec
> Captured on: 2026-05-03  
> Scope: Microsoft corporate recognition + Fluent 2 design language references  
> Asset completeness: partial official reference set  
> Important usage note: Microsoft states that its logos, icons, designs, trade dress, fonts, and other brand features are proprietary brand assets. The downloaded logo files here are for internal design reference and should not be used in external work unless the use is allowed by Microsoft's published guidelines or an express license.

## Core Assets

### Microsoft Logo
- Primary mark: `assets/brand-microsoft/microsoft-logo.svg`
- Source: Fluent 2 official website sign-in asset, `https://fluent2websitecdn.azureedge.net/cdn/microsoft-logo.ffN6LNcJ.svg`
- Format: SVG, 20 x 20 viewBox, four Microsoft squares.
- Color values from file: `#F25022`, `#80BA01`, `#FFB902`, `#02A4EF`.
- Usage guidance: use only as a real image asset, never redraw, stretch, recolor, animate, combine with other marks, or use as an app/product icon.
- Legal guidance: `assets/brand-microsoft/microsoft-logo-third-party-usage-guidance.pdf`.

### Fluent 2 Logo
- Dark version: `assets/brand-microsoft/fluent2-logo-dark.svg`
- Light version: `assets/brand-microsoft/fluent2-logo-light.svg`
- Social/metadata image: `assets/brand-microsoft/fluent2-logo-metadata.png`
- Source: Fluent 2 official website, `https://fluent2.microsoft.design/`.

### Design Language Reference Images
- Web React component atmosphere: `assets/brand-microsoft/fluent2-web-react-background.webp`
- Fluent card component reference: `assets/brand-microsoft/fluent2-component-card.png`
- Archived source page: `assets/brand-microsoft/fluent2-homepage.html`
- Archived Hong Kong Microsoft landing response: `assets/brand-microsoft/microsoft-hk-homepage.html`

## Official Sources Studied

- Microsoft Hong Kong: `https://www.microsoft.com/en-hk/`
- Microsoft Trademark and Brand Guidelines: `https://www.microsoft.com/en-us/legal/intellectualproperty/trademarks`
- Microsoft logo third-party usage guidance PDF: `https://cdn-dynmedia-1.microsoft.com/is/content/microsoftcorp/microsoft/mscle/documents/legal/intellectualproperty/trademarks/Microsoft_logo_third_party_usage_guidance_.pdf`
- Fluent 2: `https://fluent2.microsoft.design/`
- Fluent 2 design start page: `https://fluent2.microsoft.design/get-started/design`
- Fluent 2 design principles: `https://fluent2.microsoft.design/design-principles`
- Fluent 2 color: `https://fluent2.microsoft.design/color`
- Fluent 2 typography: `https://fluent2.microsoft.design/typography`
- Fluent 2 iconography: `https://fluent2.microsoft.design/iconography`
- Fluent 2 shapes: `https://fluent2.microsoft.design/shapes`
- Fluent 2 motion: `https://fluent2.microsoft.design/motion`
- Microsoft Design: `https://microsoft.design/`
- Microsoft Inclusive Design: `https://inclusive.microsoft.design/`
- Fluent UI System Icons repo: `https://github.com/microsoft/fluentui-system-icons`

## Design Language Summary

### Principles
- Natural on every platform: adapt to the device and platform; reuse native platform patterns where they help people feel oriented.
- Built for focus: reduce visual clutter and keep people centered on the task.
- One for all, all for one: consider different abilities and perspectives early; design for inclusion as a default, not a retrofit.
- Unmistakably Microsoft: use signature experiences across color, sound, illustration, icons, and interaction to create recognition.

### Color
- Fluent 2 uses three palette roles: neutral, shared, and brand.
- Neutral colors ground surfaces, text, and layout hierarchy.
- Shared colors are used sparingly for accents, reusable component recognition, and semantic states.
- Semantic colors must communicate real feedback, status, or urgency; do not use them as decoration.
- Brand colors anchor people in a specific product experience, especially for Microsoft 365 apps, but overuse can dilute hierarchy.
- Interaction states generally darken from rest to hover to selected; focus uses a thicker container stroke rather than only changing color.
- Use Fluent tokens where possible instead of ad-hoc hex values.

### Typography
- Primary type direction: Segoe UI for web Fluent experiences.
- Fluent also defaults to native platform fonts where that creates a familiar, accessible platform experience.
- Web type ramp highlights: Caption 2 `10/14`, Caption 1 `12/16`, Body 1 `14/20`, Subtitle 2 `16/22`, Subtitle 1 `20/26`, Title 3 `24/32`, Title 2 `28/36`, Title 1 `32/40`, Large Title `40/52`, Display `68/92`.
- Use sentence case. Avoid all caps for attention.
- Favor baseline alignment and left alignment for LTR body content.
- Standard text should meet at least 4.5:1 contrast; large text should meet at least 3:1.

### Shape And Stroke
- Fluent components use rectangle, circle, pill, and beak as the basic forms.
- Default rectangular component radius is usually 4 px.
- Radius tokens: none `0`, small `2`, medium `4`, large `8`, x-large `12`, circle `50%`.
- Avoid rounded corners when components touch screen edges or would create awkward gaps between adjacent elements.
- Stroke tokens: thin `1`, thick `2`, thicker `3-4`, thickest `4-6` depending on platform/context.

### Iconography
- Fluent system icons are familiar, friendly, modern, and open-source under MIT in the `microsoft/fluentui-system-icons` repository.
- System icons are for UI concepts and actions; product launch icons identify Microsoft apps and should not replace the Microsoft logo.
- System icons have regular and filled themes; filled is useful for selected states or small moments needing more weight.
- Use literal metaphor naming: for example, shield means shield, not abstract security.
- Modifiers should sit bottom-right and remain simple.
- If system icons use color, keep it to one solid color and preserve contrast.
- Never recolor product launch icons.

### Motion
- Fluent motion should be functional, natural, consistent, and appealing.
- Use motion to clarify next steps, indicate UI changes, reinforce hierarchy, or celebrate completion.
- Motion should feel quick and natural; larger elements and longer distances can take slightly longer.
- Use linear easing only where constant speed is meaningful, such as rotations.
- Top-level navigation should usually use a quick fade rather than large sliding movement.
- Choreography should direct attention; stagger lists when it helps focus, but keep offsets short.
- Support reduced/no-motion settings; avoid flashes, sudden jarring movement, and unnecessary motion outside the focused element.

## Practical Design Rules For This Skill

- Use `assets/brand-microsoft/microsoft-logo.svg` as an `<img>` only when the task is allowed to show Microsoft branding.
- For UI prototypes in a Microsoft/Fluent direction, use Segoe UI first, then native platform fallbacks.
- Build with calm hierarchy: neutral surfaces, restrained borders, purposeful accent color, and component-level density.
- Prefer Fluent-style components, tokens, and icon semantics over decorative cards or generic tech gradients.
- Use Microsoft color squares only when the Microsoft logo itself is shown; do not spread those four colors as arbitrary decoration.
- For product-specific Microsoft work, create a narrower product spec first, because Microsoft 365, Azure, Surface, Xbox, Windows, and Copilot each have different product signals.

## Restricted Zones

- Do not imply Microsoft endorsement, affiliation, sponsorship, or approval.
- Do not alter, animate, distort, recolor, or combine Microsoft logos or product icons.
- Do not use Microsoft brand assets as the name, icon, or dominant identity of another app/product.
- Do not use product launch icons in place of the Microsoft corporate logo.
- Do not treat semantic colors as decoration.
- Do not use all caps as a visual attention device.

## Gestalt Keywords

- Familiar
- Productive
- Calm
- Accessible
- Cohesive
- Human