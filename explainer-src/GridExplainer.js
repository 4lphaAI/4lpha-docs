// Adapted from D:/4lpha-execution/web/components/explainers/GridExplainer.tsx; original geometry retained, docs copy and playback corrected.
import React from "react";

const SCENES = [{
  t: 0,
  title: "Your budget becomes a ladder",
  body: "This example shows capital arranged across buy and sell ranges. Actual active levels depend on the mode, signed settings and available funds."
}, {
  t: 1500,
  title: "Buys sit below, sells sit above",
  body: "Each level is a narrow resting position on PancakeSwap v3 — USDT waiting to buy below the price, BNB waiting to sell above it."
}, {
  t: 3100,
  title: "Price drops into a buy level",
  body: "BNB trades down to $608. That level converts your USDT into BNB and the agent settles it."
}, {
  t: 4900,
  title: "A sell is armed one level up",
  body: "After a qualifying fill, the next permitted range can be prepared. Active ranges depend on the mode and available capital."
}, {
  t: 6400,
  title: "Price comes back, the sell fills",
  body: "The BNB is sold at $616. The resulting cycle can be positive or negative after costs."
}, {
  t: 8200,
  title: "The buy re-arms, and it repeats",
  body: "A completed round trip can realize a gain or a loss after costs. A price that keeps moving sideways is what the agent feeds on."
}];
const TOTAL = 10000;
const LEVELS = [{
  p: 640,
  side: "sell"
}, {
  p: 632,
  side: "sell"
}, {
  p: 624,
  side: "sell"
}, {
  p: 608,
  side: "buy"
}, {
  p: 600,
  side: "buy"
}, {
  p: 592,
  side: "buy"
}];
const FILLS = [{
  t: 4200,
  tone: "buy",
  text: "Bought 0.42 BNB at $608.00",
  sub: "grid level 3 · fee $0.18"
}, {
  t: 7500,
  tone: "sell",
  text: "Sold 0.42 BNB at $616.00",
  sub: "round trip closed · +$5.82"
}];
const X0 = 66,
  X1 = 560,
  N = 170,
  VW = 700,
  VH = 292;
const y = p => 262 - (p - 588) * (222 / 60);
const BUY = "var(--cat-lp)",
  SELL = "var(--warn)";
function GridExplainer({
  pair = "BNB / USDT",
  protocol = "PancakeSwap v3",
  budget = "500 USDT"
}) {
  const [e, setE] = React.useState(0);
  const [playing, setPlaying] = React.useState(() => !matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [pts, setPts] = React.useState(() => new Array(N).fill(y(616)));
  const st = React.useRef({
    e: 0,
    cur: y(616),
    last: 0,
    playing: !matchMedia('(prefers-reduced-motion: reduce)').matches,
    seed: 0
  });
  st.current.playing = playing;
  React.useEffect(() => {
    let raf;
    const loop = ts => {
      const s = st.current;
      const dt = s.last ? Math.min(64, ts - s.last) : 16;
      s.last = ts;
      if (!s.playing || document.hidden) { raf = requestAnimationFrame(loop); return; }
      if (s.playing) s.e = (s.e + dt) % TOTAL;
      const ev = s.e;
      const target = ev < 3100 ? 616 : ev < 4900 ? 607.4 : ev < 6400 ? 610 : ev < 8400 ? 616.6 : 616;
      s.seed += dt / 1000;
      const jitter = Math.sin(s.seed * 2.1) * 1.6 + Math.sin(s.seed * 6.7) * 0.9 + Math.sin(s.seed * 17.3) * 0.4;
      s.cur += (y(target + jitter) - s.cur) * 0.12;
      setPts(prev => {
        const nx = prev.slice(1);
        nx.push(s.cur);
        return nx;
      });
      setE(ev);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  const sceneIdx = SCENES.reduce((acc, s, i) => e >= s.t ? i : acc, 0);
  const scene = SCENES[sceneIdx];
  const jump = i => {
    st.current.e = SCENES[i].t + 1;
    setE(SCENES[i].t + 1);
  };
  const state = lv => {
    if (lv.p === 608) return e < 4200 ? "armed" : e < 8400 ? "filled" : "armed";
    if (lv.p === 616) return e < 5100 ? "hidden" : e < 7500 ? "armed" : e < 8400 ? "filled" : "hidden";
    return "armed";
  };
  const rows = [...LEVELS, {
    p: 616,
    side: "sell",
    derived: true
  }];
  const path = pts.map((py, i) => `${(X0 + i * (X1 - X0) / (N - 1)).toFixed(1)},${py.toFixed(1)}`).join(" ");
  const headY = pts[pts.length - 1];
  const pulse = FILLS.find(f => e >= f.t && e < f.t + 650);
  const feed = FILLS.filter(f => e >= f.t);
  return /*#__PURE__*/React.createElement("section", {
    style: {
      border: "1px solid var(--border-card)",
      borderRadius: "var(--radius-md)",
      background: "var(--surface-card)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 12,
      padding: "16px 20px",
      borderBottom: "1px solid var(--line-1)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-card-title)"
    }
  }, "How this agent works"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-xs)",
      color: "var(--text-subtle)"
    }
  }, pair, " \xB7 ", protocol), /*#__PURE__*/React.createElement("button", {
    onClick: () => setPlaying(p => !p),
    style: {
      font: "var(--type-mono-xs)",
      color: "var(--text-muted)",
      background: "none",
      border: "1px solid var(--line-2)",
      borderRadius: 999,
      padding: "3px 10px",
      cursor: "pointer"
    }
  }, playing ? "Pause" : "Play"))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "8px 12px 0"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${VW} ${VH}`,
    style: {
      display: "block",
      width: "100%",
      height: "auto"
    }
  }, /*#__PURE__*/React.createElement("text", {
    x: X0 - 6,
    y: y(616) - 84,
    textAnchor: "end",
    style: {
      font: "var(--type-mono-xs)",
      fill: "var(--warn)"
    }
  }, "SELLS"), /*#__PURE__*/React.createElement("text", {
    x: X0 - 6,
    y: y(616) + 96,
    textAnchor: "end",
    style: {
      font: "var(--type-mono-xs)",
      fill: "var(--cat-lp)"
    }
  }, "BUYS"), rows.map((lv, i) => {
    const s = state(lv);
    if (s === "hidden") return null;
    const born = lv.derived ? 0 : 120 + i * 90;
    const on = e > born;
    const c = lv.side === "buy" ? BUY : SELL;
    return /*#__PURE__*/React.createElement("g", {
      key: lv.p,
      style: {
        opacity: on ? s === "filled" ? 0.34 : 1 : 0,
        transition: "opacity .5s ease"
      }
    }, /*#__PURE__*/React.createElement("line", {
      x1: X0,
      y1: y(lv.p),
      x2: X1,
      y2: y(lv.p),
      stroke: c,
      strokeWidth: "2.5",
      strokeLinecap: "round",
      style: {
        transition: "stroke-dasharray .3s ease"
      },
      strokeDasharray: s === "filled" ? "3 6" : undefined
    }), /*#__PURE__*/React.createElement("text", {
      x: X1 + 12,
      y: y(lv.p) + 4,
      style: {
        font: "var(--type-mono-xs)",
        fill: s === "filled" ? "var(--text-subtle)" : c
      }
    }, "$", lv.p, " ", s === "filled" ? "FILLED" : lv.side === "buy" ? "BUY" : "SELL"));
  }), /*#__PURE__*/React.createElement("polyline", {
    points: path,
    fill: "none",
    stroke: "var(--brand)",
    strokeWidth: "1.8",
    strokeLinejoin: "round"
  }), pulse && /*#__PURE__*/React.createElement("circle", {
    cx: X1,
    cy: y(pulse.tone === "buy" ? 608 : 616),
    r: 10 + (e - pulse.t) / 650 * 26,
    fill: "none",
    stroke: pulse.tone === "buy" ? BUY : SELL,
    strokeWidth: "1.5",
    opacity: 1 - (e - pulse.t) / 650
  }), /*#__PURE__*/React.createElement("circle", {
    cx: X1,
    cy: headY,
    r: "4.5",
    fill: "var(--brand)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: X1,
    cy: headY,
    r: "11",
    fill: "none",
    stroke: "var(--brand-line)"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: "4px 20px 0",
      flexWrap: "wrap"
    }
  }, feed.map(f => /*#__PURE__*/React.createElement("span", {
    key: f.t,
    style: {
      display: "inline-flex",
      gap: 8,
      alignItems: "baseline",
      font: "var(--type-mono-xs)",
      padding: "5px 10px",
      borderRadius: "var(--radius-sm)",
      border: `1px solid ${f.tone === "buy" ? "var(--cat-lp-tint)" : "var(--warn-tint)"}`,
      background: f.tone === "buy" ? "var(--cat-lp-tint)" : "var(--warn-tint)",
      color: "var(--ink-1)"
    }
  }, f.text, /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-subtle)"
    }
  }, f.sub)))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-mono-xs)",
      color: "var(--text-subtle)"
    }
  }, "STEP ", sceneIdx + 1, " / ", SCENES.length), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "var(--type-card-title)"
    }
  }, scene.title), /*#__PURE__*/React.createElement("p", {
    style: {
      font: "var(--type-body-md)",
      color: "var(--text-muted)",
      maxWidth: "70ch",
      textWrap: "pretty"
    }
  }, scene.body)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${SCENES.length},1fr)`,
      gap: 6,
      padding: "0 20px 20px"
    }
  }, SCENES.map((s, i) => /*#__PURE__*/React.createElement("button", {
    key: s.t,
    onClick: () => jump(i),
    "aria-label": "Step " + (i + 1) + ": " + s.title,
    "aria-pressed": i === sceneIdx,
    title: s.title,
    style: {
      height: 12,
      borderRadius: 999,
      border: "none",
      padding: 0,
      cursor: "pointer",
      background: i === sceneIdx ? "var(--brand)" : "var(--line-2)",
      transition: "background .3s ease"
    }
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--line-1)",
      padding: "14px 20px",
      display: "flex",
      gap: 24,
      flexWrap: "wrap",
      font: "var(--type-mono-xs)",
      color: "var(--text-subtle)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "LADDER ", budget), /*#__PURE__*/React.createElement("span", null, "SPACING $8"), /*#__PURE__*/React.createElement("span", null, "SKIPS TRADES BELOW ITS FEE FLOOR")));
}

export { GridExplainer };
