# BuildDay

## Local API and phone access

Run `Start-BuildDay.ps1` in PowerShell (or `node server.cjs` from this folder). Open the printed Phone URL on the same trusted Wi-Fi and enter the printed pairing code. Use the local URL on your computer too. The computer must stay awake and running. This is plain HTTP for a trusted local network; do not forward this port to the internet.

The shared workspace is saved in `.local-data/workspace.json`. The pairing code is in `.local-data/pairing-code.txt`. These files are excluded from Git. Devices refresh every five seconds. Conflicting saves are rejected; export unsynced changes before reloading. Restarting the server requires pairing again.

To transfer existing hosted-site tasks, export a backup from the hosted app, then import it through Settings in the local app. Import replaces the shared workspace. The hosted website and local app have separate storage.

The local API serves `POST /api/pair`, `GET /api/state`, and revision-checked `PUT /api/state`. State endpoints require the bearer token returned by pairing. Run `node test-server.cjs` for API checks.

A buildless personal task manager made with HTML, CSS, and vanilla JavaScript.

## Run locally

Serve the `dist` folder with any static HTTP server, for example `python -m http.server 4187 --directory dist`, then open http://localhost:4187.

## Files

- `dist/index.html`: semantic application shell
- `dist/style.css`: responsive dark theme
- `dist/app.js`: task schedules, local storage, project milestones, journal, leads, import/export

Data is local to the browser and origin. Export a backup before switching devices or clearing browser data. Reminders are in-app while the page is open. There is no account or cloud sync. Dates use the device timezone. Project completion uses weighted milestones; active days come from building sessions or completed project tasks. The 12 projects are planning templates and start at zero progress.

Recurring tasks keep separate dated completions. The Today screen includes uncompleted earlier occurrences; editing a recurring schedule changes its occurrence dates. Google Fonts is optional; system fonts work offline.

