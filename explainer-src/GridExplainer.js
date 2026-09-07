import React from "react";

const BUY = "var(--cat-lp)";
const SELL = "var(--warn)";
const T = { ladder: 0, sides: 1700, fall: 2700, buy1: 3600, buy2: 4900, buy3: 6200, turn: 6900, sell1: 8400, sell2: 9700, sell3: 11000, rearm: 12200 };
const TOTAL = 14600;
const SCENES = [
  [T.ladder, "Your budget becomes a ladder", "The capital you delegate is split into price levels above and below the market. Nothing outside it is ever touched."],
  [T.sides, "Buys sit below, sells sit above", "Each level is a narrow resting position on PancakeSwap v3 — USDT waiting to buy below the price, BNB waiting to sell above it."],
  [T.buy1, "The price falls into the first buy", "BNB trades down to $608. That level converts your USDT into BNB and the agent settles it on-chain."],
  [T.buy2, "It keeps falling — $600 and $592 fill too", "Each level is bought on its own, and the three of them together never spend more than the budget you delegated."],
  [T.turn, "Every fill arms a sell one level up", "$616, $624 and $632 are now armed against the three levels you own. The ladder is always two-sided."],
  [T.sell1, "The price turns and $616 fills", "The first round trip closes. The spread, minus swap fees and gas, is realized profit."],
  [T.sell2, "$624 and $632 fill on the way up", "Three round trips out of one swing. A price that keeps moving sideways is what the agent feeds on."],
  [T.rearm, "The ladder re-arms, and it repeats", "Buys go back below the price, sells back above, and the agent waits for the next swing — day and night, without you."]
];
const LEVELS = [{ p: 632, side: "sell" }, { p: 624, side: "sell" }, { p: 616, side: "sell" }, { p: 608, side: "buy" }, { p: 600, side: "buy" }, { p: 592, side: "buy" }];
const FILLED = { 608: T.buy1, 600: T.buy2, 592: T.buy3, 616: T.sell1, 624: T.sell2, 632: T.sell3 };
const ARMED = { 616: T.buy1 + 300, 624: T.buy2 + 300, 632: T.buy3 + 300 };
const FILLS = [
  [T.buy1, 608, "buy", "Bought 0.42 BNB at $608.00", "level 3 · fee $0.18"],
  [T.buy2, 600, "buy", "Bought 0.42 BNB at $600.00", "level 2 · fee $0.18"],
  [T.buy3, 592, "buy", "Bought 0.43 BNB at $592.00", "level 1 · fee $0.18"],
  [T.sell1, 616, "sell", "Sold 0.42 BNB at $616.00", "round trip · +$5.82"],
  [T.sell2, 624, "sell", "Sold 0.42 BNB at $624.00", "round trip · +$5.82"],
  [T.sell3, 632, "sell", "Sold 0.43 BNB at $632.00", "round trip · +$5.82"]
];
const VW = 700, VH = 300, X0 = 66, X1 = 540, N = 150, SAMPLE = 96, PLO = 584, PHI = 640, MID = 612;
const y = p => 270 - ((p - PLO) / (PHI - PLO)) * 248;
const xAt = i => X0 + i * (X1 - X0) / (N - 1);
const KEYS = [0, T.fall, T.buy1, T.buy2, T.buy3, T.turn, T.sell1, T.sell2, T.sell3, TOTAL];
const VALS = [613.4, 613.2, 607.2, 599.2, 591.2, 592.4, 616.6, 624.6, 632.8, 634.4];
const ease = u => u * u * (3 - 2 * u);
const priceAt = ms => {
  const t = Math.max(0, Math.min(TOTAL, ms));
  let v = VALS[VALS.length - 1];
  for (let i = 1; i < KEYS.length; i++) if (t <= KEYS[i]) { v = VALS[i - 1] + (VALS[i] - VALS[i - 1]) * ease((t - KEYS[i - 1]) / (KEYS[i] - KEYS[i - 1])); break; }
  return v + Math.sin(t / 1000 * 4.4) * 0.34 + Math.sin(t / 1000 * 1.7) * 0.62 + Math.sin(t / 1000 * 9.3) * 0.16;
};
const markerX = (now, at) => xAt(N - 1 - (now - at) / SAMPLE);

function GridExplainer({ pair = "BNB / USDT", protocol = "PancakeSwap v3", budget = "500 USDT" }) {
  const [e, setE] = React.useState(0);
  const [playing, setPlaying] = React.useState(() => !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const state = React.useRef({ e: 0, last: 0, playing });
  state.current.playing = playing;
  React.useEffect(() => {
    let raf;
    const loop = ts => { const s = state.current; const dt = s.last ? Math.min(64, ts - s.last) : 16; s.last = ts; if (s.playing && !document.hidden) s.e = (s.e + dt) % TOTAL; setE(s.e); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const sceneIdx = SCENES.reduce((a, s, i) => e >= s[0] ? i : a, 0);
  const scene = SCENES[sceneIdx];
  const jump = i => { state.current.e = SCENES[i][0] + 1; setE(state.current.e); };
  const points = Array.from({ length: N }, (_, i) => `${xAt(i).toFixed(1)},${y(priceAt(e - (N - 1 - i) * SAMPLE)).toFixed(1)}`).join(" ");
  const price = priceAt(e), headY = y(price);
  const trips = [T.sell1, T.sell2, T.sell3].filter(t => e >= t).length;
  const feed = FILLS.filter(f => e >= f[0]).slice(-4);
  const flash = FILLS.find(f => e >= f[0] && e < f[0] + 700);
  return <section style={{ border: "1px solid var(--border-card)", borderRadius: "var(--radius-md)", background: "var(--surface-card)", overflow: "hidden" }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, padding: "16px 20px", borderBottom: "1px solid var(--line-1)" }}>
      <span style={{ font: "var(--type-card-title)" }}>How this agent works</span>
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}><span style={{ font: "var(--type-mono-xs)", color: "var(--text-subtle)" }}>{pair} · {protocol}</span><button onClick={() => setPlaying(p => !p)} style={{ font: "var(--type-mono-xs)", color: "var(--text-muted)", background: "none", border: "1px solid var(--line-2)", borderRadius: 999, padding: "3px 10px", cursor: "pointer" }}>{playing ? "Pause" : "Play"}</button></div>
    </div>
    <div style={{ padding: "8px 12px 0", overflowX: "auto" }}><svg viewBox={`0 0 ${VW} ${VH}`} style={{ display: "block", width: "100%", minWidth: 700, height: "auto" }}>
      <rect x={X0} y={y(PHI)} width={X1 - X0 + 8} height={y(MID) - y(PHI)} fill="var(--warn-tint)" style={{ opacity: e > T.sides ? 1 : 0 }} /><rect x={X0} y={y(MID)} width={X1 - X0 + 8} height={y(PLO) - y(MID)} fill="var(--cat-lp-tint)" style={{ opacity: e > T.sides ? 1 : 0 }} />
      <text x={X0 + 6} y={y(632) - 12} style={{ font: "var(--type-mono-xs)", fill: SELL, opacity: e > T.sides ? 1 : 0 }}>SELLS</text><text x={X0 + 6} y={y(592) + 22} style={{ font: "var(--type-mono-xs)", fill: BUY, opacity: e > T.sides ? 1 : 0 }}>BUYS</text>
      {LEVELS.map((lv, i) => { const filled = e >= (FILLED[lv.p] ?? Infinity), armed = !filled && e >= (ARMED[lv.p] ?? Infinity), c = lv.side === "buy" ? BUY : SELL; return <g key={lv.p} style={{ opacity: e > 120 + i * 90 ? 1 : 0 }}><line x1={X0} y1={y(lv.p)} x2={X1 + 8} y2={y(lv.p)} stroke={c} strokeWidth={filled ? 2.6 : armed ? 2.2 : 1.6} strokeLinecap="round" strokeDasharray={filled ? undefined : armed ? "10 5" : "6 6"} opacity={filled || armed ? 1 : .55} /><text x={X1 + 18} y={y(lv.p) + 4} style={{ font: "var(--type-mono-xs)", fill: c }}>${lv.p}{filled ? " FILLED" : armed ? " ARMED" : ""}</text></g>; })}
      <polyline points={points} fill="none" stroke="var(--ink-1)" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" />
      {FILLS.map(f => { const x = markerX(e, f[0]); if (e < f[0] || x < X0) return null; const c = f[2] === "buy" ? BUY : SELL; return <g key={f[0]}><circle cx={x} cy={y(f[1])} r="5.5" fill={c} stroke="var(--surface-card)" strokeWidth="2" /><text x={x} y={f[2] === "buy" ? y(f[1]) + 20 : y(f[1]) - 12} textAnchor="middle" style={{ font: "var(--type-mono-xs)", fill: c }}>{f[2] === "buy" ? "BUY" : "SELL"}</text></g>; })}
      {flash ? <circle cx={X1} cy={headY} r={9 + (e - flash[0]) / 700 * 24} fill="none" stroke={flash[2] === "buy" ? BUY : SELL} strokeWidth="1.5" opacity={1 - (e - flash[0]) / 700} /> : null}<circle cx={X1} cy={headY} r="4.5" fill="var(--ink-1)" /><circle cx={X1} cy={headY} r="11" fill="none" stroke="var(--line-3)" />
      {e >= T.sell1 ? <g><line x1={X0 + 22} y1={y(608)} x2={X0 + 22} y2={y(616)} stroke="var(--profit)" strokeWidth="2" /><text x={X0 + 30} y={(y(608) + y(616)) / 2 + 4} style={{ font: "var(--type-mono-xs)", fill: "var(--profit)" }}>+$5.82 a round trip</text></g> : null}
    </svg></div>
    <div style={{ display: "flex", gap: 8, padding: "4px 20px 0", flexWrap: "wrap" }}>{feed.map(f => <span key={f[0]} style={{ display: "inline-flex", gap: 8, alignItems: "baseline", font: "var(--type-mono-xs)", padding: "5px 10px", borderRadius: "var(--radius-sm)", border: `1px solid ${f[2] === "buy" ? "var(--cat-lp-tint)" : "var(--warn-tint)"}`, background: f[2] === "buy" ? "var(--cat-lp-tint)" : "var(--warn-tint)", color: "var(--ink-1)" }}>{f[3]} <span style={{ color: "var(--text-subtle)" }}>{f[4]}</span></span>)}</div>
    <div style={{ padding: 20, display: "grid", gap: 6 }}><span style={{ font: "var(--type-mono-xs)", color: "var(--text-subtle)" }}>STEP {sceneIdx + 1} / {SCENES.length}</span><span style={{ font: "var(--type-card-title)" }}>{scene[1]}</span><p style={{ font: "var(--type-body-md)", color: "var(--text-muted)", maxWidth: "70ch", textWrap: "pretty" }}>{scene[2]}</p></div>
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${SCENES.length},1fr)`, gap: 6, padding: "0 20px 20px" }}>{SCENES.map((s, i) => <button key={s[0]} onClick={() => jump(i)} title={s[1]} aria-label={s[1]} aria-pressed={i === sceneIdx} style={{ height: 3, borderRadius: 999, border: "none", padding: 0, cursor: "pointer", background: i === sceneIdx ? "var(--brand)" : "var(--line-2)" }} />)}</div>
    <div style={{ borderTop: "1px solid var(--line-1)", padding: "14px 20px", display: "flex", gap: 24, flexWrap: "wrap", font: "var(--type-mono-xs)", color: "var(--text-subtle)" }}><span>LADDER {budget}</span><span>SPACING $8</span><span>ROUND TRIPS <span style={{ color: "var(--ink-1)" }}>{trips}</span></span><span>REALIZED <span style={{ color: "var(--profit)" }}>+${(trips * 5.82).toFixed(2)}</span></span><span>SKIPS TRADES BELOW ITS FEE FLOOR</span></div>
  </section>;
}

export { GridExplainer };
