# Verification: output verification flow

Some design-agent native environments (like Claude.ai Artifacts) have a built-in `fork_verifier_agent` that spawns a subagent to take iframe screenshots and check the output. Most agent environments (Claude Code, Codex, Cursor, Trae, etc.) don't have that built-in — drive Playwright manually and you'll cover the same verification scenarios.

## Verification checklist

After every HTML output, walk through this checklist:

### 1. Browser render check (mandatory)

Most basic: **does the HTML open?** On macOS:

```bash
open -a "Google Chrome" "/path/to/your/design.html"
```

Or use Playwright to screenshot (next section).

### 2. Console-error check

The most common HTML issue is JS errors causing a white screen. Run a Playwright pass:

```bash
python ~/.skills/vinex22-design/scripts/verify.py path/to/design.html
```

This script:
1. Opens the HTML in headless chromium
2. Saves screenshots to the project directory
3. Captures console errors
4. Reports status

Details in `scripts/verify.py`.

### 3. Multi-viewport check

For responsive designs, capture multiple viewports:

```bash
python verify.py design.html --viewports 1920x1080,1440x900,768x1024,375x667
```

### 4. Interaction check

Tweaks, animations, button switches — static screenshots can't see them. **Recommended: have the user open the browser and click through it themselves**, or record with Playwright:

```python
page.video.record('interaction.mp4')
```

### 5. Slide-deck per-page check

For deck HTMLs, screenshot every slide:

```bash
python verify.py deck.html --slides 10  # screenshot first 10 slides
```

Generates `deck-slide-01.png`, `deck-slide-02.png`, … so you can scan them quickly.

## Playwright setup

First-time setup:

```bash
# If not yet installed
npm install -g playwright
npx playwright install chromium

# Or the Python version
pip install playwright
playwright install chromium
```

If the user already has Playwright installed globally, just use it.

## Screenshot best practices

### Full-page screenshot

```python
page.screenshot(path='full.png', full_page=True)
```

### Viewport screenshot

```python
page.screenshot(path='viewport.png')  # default: visible area only
```

### Specific element screenshot

```python
element = page.query_selector('.hero-section')
element.screenshot(path='hero.png')
```

### Hi-DPI screenshot

```python
page = browser.new_page(device_scale_factor=2)  # retina
```

### Wait for animation to settle before screenshotting

```python
page.wait_for_timeout(2000)  # let the animation settle for 2s
page.screenshot(...)
```

## Sending screenshots to the user

### Open the local screenshot directly

```bash
open screenshot.png
```

The user views it in their own Preview / Figma / VSCode / browser.

### Upload and share a link

For remote collaboration (Slack / Lark / WeChat), have the user use their own image-host tool or MCP:

```bash
python ~/Documents/tools/upload_image.py screenshot.png
```

Returns a permanent ImgBB link that can be pasted anywhere.

## When verification fails

### Page is blank

The console almost certainly has an error. Check:

1. The React + Babel script tag's integrity hash (see `react-setup.md`)
2. Whether `const styles = {…}` collisions are happening
3. Cross-file components not exported to `window`
4. JSX syntax errors (babel.min.js doesn't report — switch to the non-minified babel.js)

### Animation stutters

- Record a Performance trace in Chrome DevTools
- Look for layout thrashing (frequent reflow)
- Prefer `transform` and `opacity` for animation (GPU-accelerated)

### Wrong fonts

- Check that the `@font-face` URL is reachable
- Check the fallback font
- Slow CJK/heavy fonts: show fallback first, swap once loaded

### Layout offset

- Check that `box-sizing: border-box` is globally applied
- Check that `*  margin: 0; padding: 0` reset is in place
- Open Chrome DevTools gridlines to see the actual layout

## Verification = the designer's second pair of eyes

**Always go through it yourself.** AI-written code commonly has:

- Looks right but interactions have bugs
- Static screenshot looks fine but layout breaks on scroll
- Wide screen looks great but narrow screen breaks
- Forgot to test dark mode
- Some components don't react after a Tweak switch

**The last 1 minute of verification can save 1 hour of rework.**

## Common verification commands

```bash
# Basic: open + screenshot + capture errors
python verify.py design.html

# Multi-viewport
python verify.py design.html --viewports 1920x1080,375x667

# Multi-slide
python verify.py deck.html --slides 10

# Output to a specific directory
python verify.py design.html --output ./screenshots/

# headless=false, opens a real browser for you to watch
python verify.py design.html --show
```
