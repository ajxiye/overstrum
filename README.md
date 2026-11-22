# overstrum.

A static five-fret rhythm-game record archive for Clone Hero, Guitar Hero and YARG.

## Preview locally

Run `python -m http.server 8000` from the repository root and open `http://localhost:8000/`.

## GitHub Pages

In **Settings → Pages**, select **Deploy from a branch**, branch `main`, folder `/(root)`. Each engine/category route has a real folder `index.html`. Every page uses directory-relative links and assets, so the site works from the `/overstrum/` project subpath without a root-absolute `<base>` URL.

## Submissions

The submission form saves pending entries in the current browser's local storage. This is intentionally local-only: GitHub Pages does not provide a shared database or server endpoint. For public submissions across visitors, connect a backend or form service. Pending submissions are never counted as verified points.

## Data

Edit `data/charts.json` to curate the shared list. The included records are demonstration entries, not actual verified achievements. The app also bundles these sample records in `assets/js/app.js`, so the interface renders immediately even when the optional JSON refresh cannot load. The player rankings and community profiles are calculated from victor credits.

## Logo assets

The original `assets/logo-black.png` and `assets/logo-white.png` files are preserved; the dark header uses `assets/logo-white.png`, which contains the original wordmark and five-colour fret bar. The repository currently contains only the explicitly named `*-placeholder.svg` files in `assets/img/engines/`, not authentic game-engine logo artwork. Those files are preserved unchanged rather than replaced with invented logos.
