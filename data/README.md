# Data notes

- `charts.json` is the source of truth for shared chart records.
- Victor names, first verifier, points, chart MD5 and NPS are displayed from chart records.
- Player rankings and community summaries are calculated from victor credits.
- Browser submissions are stored locally under `overstrum-submissions-v1`, marked pending and not included in approved point totals.
- Sample records are placeholders and are not verified.


## Album artwork

The renderer displays artwork only when a chart entry has an `album_art` path. Copy the chart folder's original `album.png` into `assets/img/covers/<chart-id>/album.png`, then set `album_art` to `assets/img/covers/<chart-id>/album.png` in `data/charts.json`. The app does not generate or substitute cover art. The repository currently contains game icons and logos, but no per-song chart folders or `album.png` files.
