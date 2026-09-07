# Docs handoff

## 2026-09-07 — codex — Homepage title
**Did:** Changed the Start-here article title in `index.html` from “Start with 4lpha” to “Start with 4lpha Agent Marketplace”.
**Open:** None.
**Watch:** This is article copy in the checked-in standalone HTML; no explainer rebuild is required.

## 2026-09-07 — codex — External sidebar links and favicon
**Did:** Added `favicon.png`, copied from `D:\4lpha-execution\web\app\icon.png`, and linked it from `index.html`. Replaced the left sidebar footer with the screenshot-aligned EXTERNAL block: Website → `https://4lpha.tech` and X / Twitter → `https://x.com/4lpha_agent`, with external arrows and responsive sidebar styling. Updated README to document the adjacent favicon asset.
**Open:** Discord is deliberately absent: no Discord URL was supplied, so no destination was guessed.
**Watch:** This is a direct `index.html` docs-shell edit, not an explainer-source edit; no bundle rebuild is required. No commit or deploy.

## 2026-09-07 — codex — Grid/Trading product documentation refresh
**Did:** Updated `index.html` directly (the self-contained docs artifact). Rewrote “How 4lpha works” as product-level guidance with no data-plane/execution-plane architecture discussion; added `4lpha.tech` and `x.com/4lpha_agent` links. Expanded Trading agents with the verified 2026-09-07 Sigma reference universe: 69 symbol/catalogue/BNB-contract rows, source disclosure (4lpha curated Allowlist, bStocks, Coins and Meme catalogues), model limits (69 for Blue Chip/Sigma; 25 for Mid-Cap/Degen), and the hire-time pin caveat. Rewrote Grid agents for the current paired shift grid: PancakeSwap V3 range conversion/full-cross settlement, per-fee tick spacings, signed geometry, 30% total deployment (15%/rung) and 70% owner-wallet buffer/non-segregation disclosure.
**Open:** No explainer source was changed, so no bundle rebuild was required. The docs repo has no local build dependencies installed; `index.html` remains the checked-in self-contained artifact.
**Watch:** Static validation passed: the eligible-token section contains exactly 69 rows; the affected Trading and How-it-works articles contain no “data plane” or “execution plane” terms; Grid contains the 30%/70% explanation; two each of the web and X links are present. No deploy or commit.

## 2026-09-05 — codex — HawkFi Roboto
**Did:** Verified live HawkFi computed styles and inline font-face definitions: Roboto (body 400, h1 700, h2 600). Replaced Inter Tight with the exact GitBook-hosted Roboto Latin font in explainer-src/reading.css and rebuilt index.html. Retained readable 18px desktop / 17px mobile text.
**Open:** None. Build passed; browser confirmed Roboto loaded and no page overflow at 1440px and 390px.
**Watch:** This supersedes the previous Inter Tight choice. Font is embedded; no CDN needed at runtime. Original 4lpha wordmark preserved.


## 2026-09-05 — codex — marketplace font and logo
**Did:** Embedded original Inter Tight and IBM Plex Mono fonts in explainer-src/reading.css and rebuilt index.html. Header now uses the exact full marketplace brand-logo.png, without a duplicate typed name. Updated README provenance.
**Open:** None for this request. Build and desktop/mobile browser checks passed.
**Watch:** Keep font assets embedded for offline use; header uses the same cover crop as the marketplace.



## 2026-09-05 — codex
**Did:** Centered the docs at wide viewports, increased typography and spacing, and ported the five original marketplace animations into a nine-agent homepage selector and corresponding articles. HTML remains self-contained; source copies, build.mjs, package.json and third-party notices live here. Exact logo preserved.
**Open:** No requested UI work remains. Preview: http://127.0.0.1:4318/. Read design-qa.md for browser validation. Nothing committed or deployed.
**Watch:** Maintain this repository independently of execution. Simulation numbers are illustrative, not live metrics; some original marketing copy was corrected for accuracy. Run npm run build after editing explainer-src (npm install first if development dependencies are absent). Historical execution logs are not current docs checks.
