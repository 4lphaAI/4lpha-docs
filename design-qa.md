# 4lpha Docs QA — 2026-09-05

final result: passed

Scope: standalone English HTML docs inspired by HawkFi's GitBook layout, with original 4lpha content and the supplied repository logo. This is not a pixel-for-pixel content clone or production deployment.

## Visual inspection

Viewed the HawkFi reference and 4lpha desktop screenshots together in the same browser-tool output at the default desktop viewport. Both use a fixed top bar, a grouped left navigation, dark reading surface, prominent article title, muted lead, accent links and bordered tables. Intentional adaptations: exact 4lpha logo, green 4lpha accent, numbered navigation, a right-hand article TOC and capability/status disclosures instead of HawkFi marketing copy. No source illustration or logo was approximated.

Inspected typography, table spacing, sidebar density, copy wrapping, borders, color contrast and original logo quality. The embedded PNG was compared byte-for-byte to `web/public/design/logo-mark.png`: identical. System sans-serif is intentionally used to preserve a self-contained offline HTML artifact.

Mobile checked at 390 × 844 on the Lending boundaries article in light theme. Browser DOM measured inner width 390, document/body width 375 (scrollbar excluded), with no horizontal body overflow. Text and callout wrapped cleanly. Menu opens, navigation selects the lending article and closes the drawer. Viewport override reset afterward.

## Functional checks

- Grouped sidebar navigation renders article titles and active states. Route sweep reached Lending boundaries before tool time limit; the remaining Controls, Risks, Status and FAQ routes were verified in a separate batch.
- Search `vBNB` returns Lending boundaries; selecting the result opens it.
- No-result search presents a useful empty state.
- Copy page reports `Copied`.
- Dark/light switching updates the control and rendered theme; dark restored for delivery.
- Deep link `#start/1` survives reload with the correct article.
- Mobile menu reports expanded `true`, then `false` after selection.
- JavaScript syntax compilation passes. No console errors in the final browser log check.
- Fixed skip-link routing so it focuses the current article without changing its route. Hidden mobile navigation also uses visibility hiding to prevent offscreen keyboard navigation.
- Full-text extraction inserts block-boundary spaces for readable search excerpts.

Preview: `http://127.0.0.1:4318/`, loopback only. Browser tab left on Start with 4lpha. Single HTML file contains all required assets and scripts. Print styles are implemented but print output was not visually checked. No separate exhaustive assistive-technology audit or automated frontend test suite was added for this static docs task.

## Repository checks (not a green baseline)

Required root commands were executed against the already-modified shared worktree. This task changed no root execution code, test, configuration or package files.

```text
npm test
tests 3721
pass 3701
fail 19
cancelled 0
skipped 1
duration_ms 38583.8175

npm run typecheck
FAILED — 159 TypeScript diagnostic lines
```

Failure output is retained in `tests.log` and `typecheck.log`. Root failures are in the existing billing/production/deployment work, including missing billing exports and worker authority expectations. Representative output:

```text
scripts/billing-build-collector.ts(3,3): error TS2305: Module '"../src/billing/collectorCompiler.js"' has no exported member 'billingCollectorBuildManifest'.
src/billing/awsBillingAdapter.ts(29,3): error TS2305: Module '"./custody.js"' has no exported member 'BillingAccountKeyV1'.
✖ money worker shells acquire the role lock before constructing external dependencies
✖ real billing worker cannot resume from a paused store read after replacement acquires
✖ Venus reader already past connect cannot start its sequential RPC batch after replacement
```

Docs UI QA passing does not supersede the root failures or any money-path audit verdict.

## Repository relocation

Moved to D:\4lpha-docs at the user's request. All six source files were SHA256-verified before removing the old copy. Updated preview instructions and made execution-repository source references explicit. Execution test logs remain historical; no execution code was changed by relocation.

## Readability and animation revision — 2026-09-05

final result: passed

- Compared the user-provided off-center screenshot with the new centered layout. At 1920px, the article measured 840px wide, x=572.5 to 1412.5 (center 992.5, within 32.5px of viewport center); the rails balance the remaining space. Desktop body font measured 18px. Also inspected the LP player at 1440px.
- At 390px mobile, body/document widths both measured 375px (scrollbar excluded): no page overflow. Body font measured 17px. The charts scroll inside their own region and include a swipe hint; text and player controls wrap.
- All five reused animation families rendered through the gallery; nine selector buttons exist. Selecting Read the guide navigates to the matching article. LP has two mounted SVG explainers.
- Pause verified by comparing the chart polyline points between separate tool calls: unchanged. Play controls and accessible scene buttons retained.
- Gallery TOC deep link #start/3 works. Final browser error log returned an empty list.
- Both inline scripts compiled. Logo bytes still match the canonical source exactly. No external script tags; execution/docs-site remains absent.
- Build succeeded using the locally installed toolchains, with no downloads. New HTML size: 310052 bytes.
- No backend changes; previous execution test/typecheck logs are historical and were not rerun for this independent frontend revision. No full assistive-technology or print audit claimed.

## Marketplace typography and wordmark — 2026-09-05
Embedded the exact marketplace Inter Tight variable font and IBM Plex Mono 400/500/600 files. Replaced the header icon and typed name with the original brand-logo.png wordmark, verified byte-for-byte. Browser checks confirm Inter Tight loads, desktop logo is 150 × 48 and mobile is 112 × 40, with no horizontal page overflow. Standalone rebuild passed (2,389,400 bytes). No execution code changed; backend checks were not rerun for this visual-only update.
## 2026-09-05 — codex — HawkFi Roboto
**Did:** Verified live HawkFi computed styles and inline font-face definitions: Roboto (body 400, h1 700, h2 600). Replaced Inter Tight with the exact GitBook-hosted Roboto Latin font in explainer-src/reading.css and rebuilt index.html. Retained readable 18px desktop / 17px mobile text.
**Open:** None. Build passed; browser confirmed Roboto loaded and no page overflow at 1440px and 390px.
**Watch:** This supersedes the previous Inter Tight choice. Font is embedded; no CDN needed at runtime. Original 4lpha wordmark preserved.

Source: https://hawkfi.gitbook.io/whitepaper
Font: https://static-2c.gitbook.com/~gitbook/static/fonts/roboto/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBHMdazQ.woff2
