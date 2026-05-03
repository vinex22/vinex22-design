# Tweaks: live design-variation parameters

Tweaks is a core capability of this skill — letting the user switch variations / adjust parameters live without editing code.

**Cross-agent adaptation**: some design-agent native environments (like Claude.ai Artifacts) rely on the host's postMessage to write tweak values back into the source for persistence. This skill uses a **pure-frontend localStorage approach** — same effect (state survives reload), but persistence happens in browser localStorage rather than the source file. This works in any agent environment (Claude Code, Codex, Cursor, Trae, etc.).

## When to add Tweaks

- The user explicitly asks for "tunable parameters" / "switch between versions"
- The design has multiple variations to compare
- The user didn't ask, but **adding a few inspirational tweaks would help them see the possibility space**

Default recommendation: **add 2–3 tweaks (color theme / font size / layout variant) to every design** even if not requested — showing the possibility space is part of the design service.

## Implementation (pure-frontend version)

### Basic structure

```jsx
const TWEAK_DEFAULTS = {
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
};

function useTweaks() {
  const [tweaks, setTweaks] = React.useState(() => {
    try {
      const stored = localStorage.getItem('design-tweaks');
      return stored ? { ...TWEAK_DEFAULTS, ...JSON.parse(stored) } : TWEAK_DEFAULTS;
    } catch {
      return TWEAK_DEFAULTS;
    }
  });

  const update = (patch) => {
    const next = { ...tweaks, ...patch };
    setTweaks(next);
    try {
      localStorage.setItem('design-tweaks', JSON.stringify(next));
    } catch {}
  };

  const reset = () => {
    setTweaks(TWEAK_DEFAULTS);
    try {
      localStorage.removeItem('design-tweaks');
    } catch {}
  };

  return { tweaks, update, reset };
}
```

### Tweaks panel UI

Floating panel in the bottom-right. Collapsible:

```jsx
function TweaksPanel() {
  const { tweaks, update, reset } = useTweaks();
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{
      position: 'fixed',
      bottom: 20,
      right: 20,
      zIndex: 9999,
    }}>
      {open ? (
        <div style={{
          background: 'white',
          border: '1px solid #e5e5e5',
          borderRadius: 12,
          padding: 20,
          boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
          width: 280,
          fontFamily: 'system-ui',
          fontSize: 13,
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 16,
          }}>
            <strong>Tweaks</strong>
            <button onClick={() => setOpen(false)} style={{
              border: 'none', background: 'none', cursor: 'pointer', fontSize: 16,
            }}>×</button>
          </div>

          {/* Color */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Primary</div>
            <input
              type="color"
              value={tweaks.primaryColor}
              onChange={e => update({ primaryColor: e.target.value })}
              style={{ width: '100%', height: 32 }}
            />
          </label>

          {/* Font-size slider */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Font size ({tweaks.fontSize}px)</div>
            <input
              type="range"
              min={12} max={24} step={1}
              value={tweaks.fontSize}
              onChange={e => update({ fontSize: +e.target.value })}
              style={{ width: '100%' }}
            />
          </label>

          {/* Density select */}
          <label style={{ display: 'block', marginBottom: 12 }}>
            <div style={{ marginBottom: 4, color: '#666' }}>Density</div>
            <select
              value={tweaks.density}
              onChange={e => update({ density: e.target.value })}
              style={{ width: '100%', padding: 6 }}
            >
              <option value="compact">Compact</option>
              <option value="comfortable">Comfortable</option>
              <option value="spacious">Spacious</option>
            </select>
          </label>

          {/* Dark-mode toggle */}
          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 16,
          }}>
            <input
              type="checkbox"
              checked={tweaks.dark}
              onChange={e => update({ dark: e.target.checked })}
            />
            <span>Dark mode</span>
          </label>

          <button onClick={reset} style={{
            width: '100%',
            padding: '8px 12px',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: 12,
          }}>Reset</button>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            background: '#1A1A1A',
            color: 'white',
            border: 'none',
            borderRadius: 999,
            padding: '10px 16px',
            fontSize: 12,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        >⚙ Tweaks</button>
      )}
    </div>
  );
}
```

### Apply Tweaks

Use Tweaks in the main component:

```jsx
function App() {
  const { tweaks } = useTweaks();

  return (
    <div style={{
      '--primary': tweaks.primaryColor,
      '--font-size': `${tweaks.fontSize}px`,
      background: tweaks.dark ? '#0A0A0A' : '#FAFAFA',
      color: tweaks.dark ? '#FAFAFA' : '#1A1A1A',
    }}>
      {/* your content */}
      <TweaksPanel />
    </div>
  );
}
```

Use the variables in CSS:

```css
button.cta {
  background: var(--primary);
  color: white;
  font-size: var(--font-size);
}
```

## Typical Tweak options

What tweaks to add by design type:

### Generic
- Primary color (color picker)
- Font size (slider 12–24px)
- Font family (select: display vs body)
- Dark mode (toggle)

### Slide deck
- Theme (light / dark / brand)
- Background style (solid / gradient / image)
- Type contrast (more decorative vs more restrained)
- Information density (minimal / standard / dense)

### Product prototype
- Layout variant (layout A / B / C)
- Animation speed (0.5×–2×)
- Data volume (mock data 5 / 20 / 100 rows)
- States (empty / loading / success / error)

### Animation
- Speed (0.5×–2×)
- Loop (once / loop / ping-pong)
- Easing (linear / easeOut / spring)

### Landing page
- Hero style (image / gradient / pattern / solid)
- CTA copy (a few variants)
- Structure (single column / two column / sidebar)

## Tweaks design principles

### 1. Meaningful options, not toy knobs

Each tweak must surface a **real design choice**. Don't add a tweak nobody would actually switch (e.g., a 0–50px border-radius slider — every value in between is ugly).

A good tweak exposes **discrete, considered variations**:
- "Corner style": none / soft / large (three options)
- Not: "Radius": 0–50px slider

### 2. Less is more

A design's Tweaks panel maxes at **5–6 options**. More than that turns it into a "settings page" and loses the quick-exploration spirit.

### 3. Defaults are a finished design

Tweaks are **icing on the cake**. The defaults must themselves be a complete, deliverable design. What the user sees with the panel closed is the final.

### 4. Reasonable grouping

For many options, group:

```
---- Visual ----
Primary | Font size | Dark mode

---- Layout ----
Density | Sidebar position

---- Content ----
Data count | State
```

## Forward compatibility with source-level persistence hosts

If you later upload the design to an environment that supports source-level tweaks (like Claude.ai Artifacts), keep the **EDITMODE marker block**:

```jsx
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primaryColor": "#D97757",
  "fontSize": 16,
  "density": "comfortable",
  "dark": false
}/*EDITMODE-END*/;
```

The marker block is **inert** in the localStorage version (just a comment), but in a source-writeback host it's read for source-level persistence. Adding it is harmless to the current environment and forward-compatible.

## Common issues

**The Tweaks panel covers design content**
→ Make it closeable. Default closed; show a small button; user clicks to expand.

**Settings don't survive after a switch**
→ Already using localStorage. If state doesn't persist after reload, check whether localStorage is available (incognito mode fails — wrap in `try`/`catch`).

**Multiple HTML pages share tweaks**
→ Add the project name to the localStorage key: `design-tweaks-[projectName]`.

**I want tweaks to influence each other**
→ Add logic in `update`:

```jsx
const update = (patch) => {
  let next = { ...tweaks, ...patch };
  // Linkage: when dark mode is on, auto-switch text color
  if (patch.dark === true && !patch.textColor) {
    next.textColor = '#F0EEE6';
  }
  setTweaks(next);
  localStorage.setItem(...);
};
```
