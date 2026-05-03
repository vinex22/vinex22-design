#!/usr/bin/env node
/**
 * export_deck_pptx.mjs — export a multi-file slide deck as an editable PPTX
 *
 * Usage:
 *   node export_deck_pptx.mjs --slides <dir> --out <file.pptx>
 *
 * Behavior:
 *   - Calls scripts/html2pptx.js to translate each HTML DOM element into a native PowerPoint object
 *   - Text becomes real text frames — double-click to edit in PPT
 *   - body size 960pt × 540pt (LAYOUT_WIDE, 13.333″ × 7.5″)
 *
 * ⚠️ HTML must satisfy 4 hard constraints (see references/editable-pptx.md):
 *   1. Text must be wrapped in <p>/<h1>-<h6> (div cannot contain bare text)
 *   2. No CSS gradients
 *   3. <p>/<h*> cannot have background/border/shadow (put it on outer div)
 *   4. div cannot use background-image (use <img>)
 *
 * Visual-driven HTML almost never passes — you must follow the constraints from line 1 of HTML.
 * For visual-freedom-priority scenarios (animation, web components, CSS gradients, complex SVG)
 * use export_deck_pdf.mjs / export_deck_stage_pdf.mjs to export PDF instead.
 *
 * Dependencies: npm install playwright pptxgenjs sharp
 *
 * Files are sorted by filename (01-xxx.html → 02-xxx.html → ...).
 */

import pptxgen from 'pptxgenjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseArgs() {
  const args = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i += 2) {
    const k = a[i].replace(/^--/, '');
    args[k] = a[i + 1];
  }
  if (!args.slides || !args.out) {
    console.error('Usage: node export_deck_pptx.mjs --slides <dir> --out <file.pptx>');
    console.error('');
    console.error('⚠️ HTML must satisfy 4 hard constraints (see references/editable-pptx.md).');
    console.error('   For visual-freedom-priority scenarios, export PDF via export_deck_pdf.mjs instead.');
    process.exit(1);
  }
  return args;
}

async function main() {
  const { slides, out } = parseArgs();
  const slidesDir = path.resolve(slides);
  const outFile = path.resolve(out);

  const files = (await fs.readdir(slidesDir))
    .filter(f => f.endsWith('.html'))
    .sort();
  if (!files.length) {
    console.error(`No .html files found in ${slidesDir}`);
    process.exit(1);
  }

  console.log(`Converting ${files.length} slides via html2pptx...`);

  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  let html2pptx;
  try {
    html2pptx = require(path.join(__dirname, 'html2pptx.js'));
  } catch (e) {
    console.error(`✗ Failed to load html2pptx.js: ${e.message}`);
    console.error(`  If dependencies are missing, run: npm install playwright pptxgenjs sharp`);
    process.exit(1);
  }

  const pres = new pptxgen();
  pres.layout = 'LAYOUT_WIDE';  // 13.333 × 7.5 inch, matching HTML body 960 × 540 pt

  const errors = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const fullPath = path.join(slidesDir, f);
    try {
      await html2pptx(fullPath, pres);
      console.log(`  [${i + 1}/${files.length}] ${f} ✓`);
    } catch (e) {
      console.error(`  [${i + 1}/${files.length}] ${f} ✗  ${e.message}`);
      errors.push({ file: f, error: e.message });
    }
  }

  if (errors.length) {
    console.error(`\n⚠️ ${errors.length} slides failed to convert. Most common cause: HTML doesn't meet the 4 hard constraints.`);
    console.error(`  See references/editable-pptx.md "Common error cheat sheet".`);
    if (errors.length === files.length) {
      console.error(`✗ All failed, PPTX will not be generated.`);
      process.exit(1);
    }
  }

  await pres.writeFile({ fileName: outFile });
  console.log(`\n✓ Wrote ${outFile}  (${files.length - errors.length}/${files.length} slides, editable PPTX)`);
}

main().catch(e => { console.error(e); process.exit(1); });
