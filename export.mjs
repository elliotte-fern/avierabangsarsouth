// Renders every booklet page to a 1080x1350 PNG in ./exports.
// Usage: node export.mjs   (needs Playwright with Chromium installed)
import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(dir, 'exports');
await mkdir(out, { recursive: true });

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1400 }, deviceScaleFactor: 1 });
await page.goto(pathToFileURL(path.join(dir, 'index.html')).href, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
// Render pages at native size: drop the on-screen scaling.
await page.addStyleTag({ content: '.page-frame{width:1080px!important}.page-frame>.page{transform:none!important}' });

const frames = await page.locator('.page-frame').all();
for (const [i, frame] of frames.entries()) {
  const id = await frame.getAttribute('id');
  const file = path.join(out, `${String(i + 1).padStart(2, '0')}-${id}.png`);
  await frame.locator('.page').screenshot({ path: file });
  console.log('wrote', path.relative(dir, file));
}
await browser.close();
