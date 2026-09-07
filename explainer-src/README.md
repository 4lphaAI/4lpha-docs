# Reused marketplace animations

Source: the five original components in D:/4lpha-execution/web/components/explainers, mapped to the nine cards by web/components/screens/AgentDetailScreen.tsx and web/lib/design-data.ts. These are independent local copies; runtime imports do not reach the execution repository.

Grid Keeper / Ladder BNB → Grid; Range Pilot → Range; Aegis LP → Compound; Sigma / Vector / Degen / Atlas → Trade; Health Guard → Lending.

Preserved: SVG geometry, price paths, timed scenes, chart transitions and player structure. Docs-only changes: qualified illustrative copy, sample-data disclosure, actual pause (including price paths), reduced-motion default, larger accessible step buttons, responsive overflow and docs theme tokens.

Run npm install and npm run build when changing these sources. A checked-in, embedded production bundle already exists inside index.html, so opening the HTML or running npm run preview needs no install. build.mjs also accepts optional existing esbuild and React toolchain roots for local offline builds.

React / ReactDOM 19.2.8 and Scheduler notices are retained in THIRD-PARTY-NOTICES.txt. reading.css owns the new centered layout and readable typography.