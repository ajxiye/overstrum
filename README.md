# overstrum.

A static five-fret rhythm-game record archive for Clone Hero, Guitar Hero and YARG.

## Preview locally

Run `python -m http.server 8000` from the repository root and open `http://localhost:8000/`.

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/(root)`. Each engine/category route has a real folder `index.html`, and project links support the `/overstrum/` base path.

## Submissions

The submission form saves pending entries in the current browser's local storage. This is intentionally local-only: GitHub Pages does not provide a shared database or server endpoint. For public submissions across visitors, connect a backend or form service. Pending submissions are never counted as verified points.

## Data

Edit `data/charts.json` to curate the shared list. The included records are demonstration entries, not actual verified achievements. The player rankings and community profiles are calculated from victor credits.

## Logo assets

The existing `assets/logo-black.png` and `assets/logo-white.png` files are preserved. Engine placeholder SVGs remain in `assets/img/engines/`; replace them when final logos are ready.
