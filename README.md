# Life at Aviera booklet

A 9-page visual tour of Aviera, Bangsar South. Each page is 1080 × 1350 px (4:5).

- `index.html`: all nine pages. Open it in a browser; pages scale to fit the screen, phones included.
- `styles.css`: colour and type tokens plus the shared page parts (eyebrow, title, photo, figure, stats, inset frame).
- `scale.js`: fits each fixed-size page to its frame on screen.
- `export.mjs`: renders every page to a PNG at full size in `exports/`.
- `images/`: the artist's impressions and lifestyle photos from the sales kit.

## Export PNGs

```bash
npm install
```

```bash
npx playwright install chromium
```

```bash
npm run export
```
