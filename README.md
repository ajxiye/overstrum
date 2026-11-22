# overstrum.

A static five-fret rhythm-game leaderboard for Clone Hero, Guitar Hero, and YARG.

## Preview locally

Run `python -m http.server 8000` in the repository root and open `http://localhost:8000/`.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/(root)`. Folder-based `index.html` routes are used for every engine and achievement view. On the standard GitHub Pages project domain, links use the `/overstrum/` prefix.

## Data

Edit `data/charts.json`. The player leaderboard is calculated from victor and pioneer data. `data/players.json` is a snapshot for future data-source integrations. Included records are fictitious demo data, not verified scores.

## Logo replacement

Replace the labelled SVG placeholders in `assets/img/brand/` and `assets/img/engines/`. Dimensions are 512×160. Existing `assets/logo-black.png` and `assets/logo-white.png` are preserved.
