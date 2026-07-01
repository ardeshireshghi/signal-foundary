# design-sync notes — @signalfoundry/ui

Repo-specific gotchas and re-sync guidance for syncing the SignalFoundry design
system to Claude Design.

## Setup / build

- The DS lives in `packages/signal-ui` (`@signalfoundry/ui`), extracted from the
  Next.js app so it has a real library `dist/`. The app itself is NOT syncable
  (Next.js client components, routing, app data).
- Build before converting: `npm --prefix packages/signal-ui install` then
  `npm --prefix packages/signal-ui run build` → produces
  `dist/index.es.js`, `dist/index.d.ts`, `dist/styles.css`. (`buildCmd` in
  config runs the build step; run `install` first on a fresh clone.)
- `dist/` is gitignored — always rebuild before running the converter.

## Converter / validate commands (this env)

```sh
# stage scripts (re-copy on every run; instant)
cp -r <skill-base>/package-*.mjs <skill-base>/resync.mjs <skill-base>/lib <skill-base>/storybook .ds-sync/
(cd .ds-sync && npm i esbuild ts-morph @types/react)
node .ds-sync/package-build.mjs --config .design-sync/config.json \
  --node-modules packages/signal-ui/node_modules \
  --entry ./packages/signal-ui/dist/index.es.js --out ./ds-bundle
DS_CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome \
  node .ds-sync/package-validate.mjs ./ds-bundle
```

- **Render check browser:** this environment ships chromium at
  `/opt/pw-browsers/chromium-<build>/chrome-linux/chrome`. Install `playwright`
  into `.ds-sync/` with `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` and pass the binary
  via `DS_CHROMIUM_PATH` (validate reads that env for `executablePath`).
- `--node-modules` points at the package's own `node_modules`; `--entry` is the
  built ESM entry (the package doesn't self-install into its own node_modules).

## Previews

- **The preview canvas renders on a WHITE background**, but the DS is designed
  for a dark canvas (text uses `text-fg`, near-white). Every authored preview in
  `.design-sync/previews/*.tsx` therefore wraps its component in a
  `<div className="bg-bg p-6">` so it renders correctly. Keep this when editing.
- All 10 components have authored previews; render check is 10/10 clean.

## Known render warns

- None currently (all previews render ≥5KB and vary).

## Re-sync risks

- `cssEntry` is package-relative (`dist/styles.css`); the converter resolves it
  against the package dir. A repo-root path fails with "not found — skipped"
  (the CSS is still auto-copied, but fix the path to be sure).
- Tokens are compiled by the Tailwind v4 CLI scanning `packages/signal-ui/src`
  via `@source` in `styles.css`. If a new component uses a utility not present in
  any existing component, rebuild the CSS so it's generated.
- System fonts only — no brand fonts ship. If brand fonts are added later, wire
  `cfg.extraFonts` and resolve any `[FONT_MISSING]`.

## Upload status — ACTION REQUIRED

- The upload to claude.ai/design could not run in the web (claude.ai/code)
  session: `DesignSync` needs design-system authorization and `/design-login`
  requires an interactive terminal.
- To finish: run `/design-sync` from a local interactive Claude Code (where
  `/design-login` works), OR use Claude Design's "Send to Claude Code Web" to
  seed auth/project into the workspace. Everything else (package, config,
  conventions, previews) is committed and reproducible — the re-sync is one
  command per the skill.
- No project has been created yet, so `.design-sync/config.json` has no
  `projectId`. The first authorized run will create the project and pin it.
