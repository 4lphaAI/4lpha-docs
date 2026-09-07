# 4lpha documentation

Open `index.html` directly, or run `node preview.mjs` from D:\4lpha-docs and visit `http://127.0.0.1:4318`.

The delivered page is standalone: CSS, article content, JavaScript and the exact bytes of `web/public/design/brand-logo.png` are embedded; `favicon.png` sits beside it and is copied from `D:\4lpha-execution\web\app\icon.png`. It needs no package installation, account, API or build step. It is separate from the marketplace and execution applications.

English only. Fourteen articles, grouped navigation, deep links, local full-text search (Ctrl/Cmd K), page copying, dark/light themes, mobile navigation and print styles. Default theme is dark, following the supplied HawkFi GitBook reference. 4lpha branding and article content are written for 4lpha; HawkFi text and logo are not reused.

## Editorial basis

Snapshot date: 2026-09-07. Read implementation references at the bottom of each article. Sources include `CLAUDE.md`, `ROADMAP.md`, `FINDINGS.md`, applicable phase/audit documents and the current source files. Where prose was stale (notably trading LLM routing, market-hour gating and browser custody), current code and recorded findings take precedence.

Do not copy sample commercial or performance figures from `web/lib/design-data.ts`. Do not conflate historical operator mainnet transactions, offline implementation and browser availability. In particular:

- Venus repay/supply have historical mainnet evidence; lending is deferred in the browser MVP.
- Native vBNB supply is blocked; it is not a general lending optimizer.
- New marketplace LP audit is DO NOT SHIP as recorded September 5.
- Primary/fallback trading model choices follow the current 0G catalogue.
- Session pause, position exit and on-chain revoke are distinct actions.
- No private environment files were read for these docs and no current deployment flag is asserted.

Refresh the snapshot and affected article references when code or audit status changes. Historical transaction links are copied from `FINDINGS.md`; no live transaction was performed or revalidated for this documentation task.

`tests.log` and `typecheck.log` record repository checks, not docs-site dependencies. Existing root failures are reported in `design-qa.md`; no backend changes were made by this task. The preview server exposes only the HTML entry point and binds to loopback.

## Repository boundary

This documentation belongs to D:\4lpha-docs. Execution code and all source references in the articles belong to D:\4lpha-execution. The HTML contains the logo bytes and imports no execution code. The saved root test/typecheck logs are historical checks from the execution repository, not commands or dependencies of this docs repository.

## Readability and animated explainers update

The reading column is now centered within a 1480px layout, with an 840px maximum article width. Desktop body text is 18px, tables 16px, lead text 21px and navigation 15px; mobile body text is 17px. Original 4lpha logo bytes are unchanged.

The homepage includes a nine-agent animation selector. The Trading, Grid, LP and Lending articles embed the corresponding original marketplace explainers (LP includes both Range and Compound). Illustrative values are explicitly labeled. Charts preserve legible labels with horizontal scrolling on small screens. Playback can be paused and starts paused when reduced motion is requested.

The HTML remains self-contained. Build sources are in explainer-src; npm run build rebuilds the embedded animation script and reading styles after development dependencies are installed. npm run preview starts the loopback server. No backend file was changed and no transaction was submitted.
