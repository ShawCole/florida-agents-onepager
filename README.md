# Florida Insurance Agent Universe — Ark Data one-pager

Client-facing sales sheet for the FL licensed-insurance-agent dataset.

- **Audience:** prospective buyers (IMOs/FMOs, carriers, insurtechs, BD/RIA recruiters)
- **Dataset:** 250,707 FL-resident licensed agents · 3.14M license records · 4.96M carrier appointments
- **Files described:** Agent Profile (83 cols), License Detail (14 cols), Carrier Appointments (11 cols) — NPN-joined

Single static HTML page, Chart.js charts, Inter + Fraunces type. Deployed via Netlify.

## Stack
- `index.html` — markup, styling, chart code
- `data.js` — embedded dataset (regenerated from `data.json` when underlying data changes)
- `data.json` — canonical source of chart data

## Regenerate stats
Run `data_extraction.py` (see `data_extraction.log`) against the three FL CSVs in the source data directory.
