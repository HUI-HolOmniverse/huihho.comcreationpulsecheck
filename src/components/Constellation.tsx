import { useMemo, useState } from "react";
import { CLUSTERS, CONSTELLATION_EDGES, EXCLUDED_REPOS, REPOS, type Repo, type ClusterId } from "../data";
import { Badge, Chip, Reveal } from "./ui";

const TONE_HEX: Record<string, string> = {
  teal: "#3ec9a7",
  ice: "#8fc1e3",
  amber: "#e5a83b",
  coral: "#e06a52",
  mute: "#9fb0c8",
};

const HULLS: Record<ClusterId, { x: number; y: number; w: number; h: number }> = {
  MATER: { x: 62, y: 66, w: 330, h: 196 },
  META: { x: 500, y: 58, w: 372, h: 372 },
  ARCHE: { x: 68, y: 282, w: 322, h: 268 },
  MESO: { x: 402, y: 284, w: 178, h: 228 },
  SUBSTRATE: { x: 296, y: 518, w: 392, h: 80 },
};

const STATUS_TONE: Record<Repo["status"], string> = {
  "IN-SCOPE": "#3ec9a7",
  "NEEDS-VERIFY": "#e5a83b",
  "CONFLICT-RISK": "#e06a52",
};

const QCORE = { x: 452, y: 200 };

export default function Constellation() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = REPOS.find((r) => r.id === selectedId) ?? null;

  const stars = useMemo(() => {
    const arr: { x: number; y: number; r: number; d: number }[] = [];
    let s = 7;
    const rnd = () => {
      s = (s * 16807) % 2147483647;
      return (s % 1000) / 1000;
    };
    for (let i = 0; i < 72; i++) {
      arr.push({ x: rnd() * 960, y: rnd() * 620, r: 0.6 + rnd() * 1.1, d: rnd() * 5 });
    }
    return arr;
  }, []);

  const byId = useMemo(() => Object.fromEntries(REPOS.map((r) => [r.id, r])), []);

  return (
    <Reveal>
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* ---------- map ---------- */}
        <div className="corners relative overflow-hidden border border-line bg-ink-900/70">
          <div className="flex items-center justify-between border-b border-line/70 px-4 py-2.5">
            <span className="font-mono text-[10px] tracking-[0.24em] text-faint uppercase">
              fig. A — inferred topology · 15 repos · 5 clusters
            </span>
            <span className="font-mono text-[10px] tracking-[0.18em] text-amber uppercase">
              click a node to inspect
            </span>
          </div>
          <svg
            viewBox="0 0 960 620"
            className="block w-full"
            role="img"
            aria-label="Inferred repository constellation of the HUI-HolOmniverse organization"
            onClick={() => setSelectedId(null)}
          >
            {/* starfield */}
            {stars.map((st, i) => (
              <circle
                key={i}
                cx={st.x}
                cy={st.y}
                r={st.r}
                fill="#8fc1e3"
                className="anim-twinkle"
                style={{ animationDelay: `${st.d}s` }}
              />
            ))}

            {/* cluster hulls */}
            {(Object.keys(HULLS) as ClusterId[]).map((cid) => {
              const h = HULLS[cid];
              const c = CLUSTERS[cid];
              const hex = TONE_HEX[c.tone];
              return (
                <g key={cid}>
                  <rect
                    x={h.x}
                    y={h.y}
                    width={h.w}
                    height={h.h}
                    fill={hex}
                    fillOpacity={0.03}
                    stroke={hex}
                    strokeOpacity={0.28}
                    strokeDasharray="4 7"
                  />
                  <text
                    x={h.x + 10}
                    y={h.y + 18}
                    fill={hex}
                    fillOpacity={0.75}
                    fontSize={11}
                    fontFamily="IBM Plex Mono, monospace"
                    letterSpacing={3}
                  >
                    {c.label}
                  </text>
                </g>
              );
            })}

            {/* edges */}
            {CONSTELLATION_EDGES.map((e, i) => {
              const a = byId[e.from];
              const b = byId[e.to];
              const conflict = e.kind === "conflict";
              return (
                <line
                  key={i}
                  x1={a.x}
                  y1={a.y}
                  x2={b.x}
                  y2={b.y}
                  stroke={conflict ? "#e06a52" : "#4a6390"}
                  strokeOpacity={conflict ? 0.75 : 0.4}
                  strokeWidth={conflict ? 1.4 : 1}
                  strokeDasharray={conflict ? "6 5" : "2.5 7"}
                  className={conflict ? "" : "anim-dash"}
                />
              );
            })}

            {/* QCORE disputed links */}
            {[byId["mater-core"], byId["meta-core"]].map((r) => (
              <line
                key={`qc-${r.id}`}
                x1={r.x}
                y1={r.y}
                x2={QCORE.x}
                y2={QCORE.y}
                stroke="#e06a52"
                strokeOpacity={0.5}
                strokeWidth={1}
                strokeDasharray="2 5"
              />
            ))}

            {/* QCORE node */}
            <g transform={`translate(${QCORE.x} ${QCORE.y})`} className="anim-float" style={{ animationDelay: "1.2s" }}>
              <rect x={-9} y={-9} width={18} height={18} transform="rotate(45)" fill="#0e1626" stroke="#e06a52" strokeWidth={1.5} />
              <text x={0} y={-18} textAnchor="middle" fill="#e06a52" fontSize={10.5} fontFamily="IBM Plex Mono, monospace" letterSpacing={1.5}>
                QCORE · UNPLACED
              </text>
            </g>

            {/* repo nodes */}
            {REPOS.map((r, idx) => {
              const hex = STATUS_TONE[r.status];
              const isSel = selectedId === r.id;
              return (
                <g
                  key={r.id}
                  transform={`translate(${r.x} ${r.y})`}
                  className="anim-float cursor-pointer"
                  style={{ animationDelay: `${(idx % 6) * 0.9}s` }}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    setSelectedId(r.id);
                  }}
                >
                  {isSel && <circle r={18} fill="none" stroke="#e9eef6" strokeDasharray="3 4" strokeWidth={1.2} />}
                  <circle r={13} fill={hex} fillOpacity={0.08} stroke={hex} strokeOpacity={0.4} />
                  <circle r={6} fill="#121c2e" stroke={hex} strokeWidth={1.6} className="transition-all duration-200" />
                  {r.status === "CONFLICT-RISK" && <circle r={2.2} fill={hex} />}
                  <text
                    y={30}
                    textAnchor="middle"
                    fill={isSel ? "#e9eef6" : "#9fb0c8"}
                    fontSize={10}
                    fontFamily="IBM Plex Mono, monospace"
                  >
                    {r.name.replace("HUI-", "").replace("huihho-", "").replace("hui-", "")}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* legend */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/70 px-4 py-3">
            {(
              [
                ["IN-SCOPE", "#3ec9a7"],
                ["NEEDS-VERIFY", "#e5a83b"],
                ["CONFLICT-RISK", "#e06a52"],
              ] as const
            ).map(([label, hex]) => (
              <span key={label} className="flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-mute uppercase">
                <span className="h-2.5 w-2.5 rounded-full border" style={{ borderColor: hex, background: `${hex}22` }} />
                {label}
              </span>
            ))}
            <span className="ml-auto flex items-center gap-2 font-mono text-[10px] tracking-[0.14em] text-faint uppercase">
              <span className="inline-block h-0 w-6 border-t border-dashed" style={{ borderColor: "#e06a52" }} />
              conflict / disputed
            </span>
          </div>
        </div>

        {/* ---------- inspector ---------- */}
        <div className="flex flex-col gap-4">
          <div className="corners border border-line bg-ink-900/80 p-5">
            <p className="font-mono text-[10px] tracking-[0.24em] text-faint uppercase">node inspector</p>
            {selected ? (
              <div key={selected.id} className="anim-ticker mt-3">
                <h3 className="font-display text-lg leading-tight font-bold text-paper">{selected.name}</h3>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <Chip tone={CLUSTERS[selected.cluster].tone === "mute" ? "paper" : CLUSTERS[selected.cluster].tone}>
                    {CLUSTERS[selected.cluster].label}
                  </Chip>
                  <Badge tone={selected.status === "IN-SCOPE" ? "teal" : selected.status === "NEEDS-VERIFY" ? "amber" : "coral"}>
                    {selected.status}
                  </Badge>
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-mute">{selected.role}</p>
                <p className="mt-2.5 border-l-2 border-amber/60 pl-3 text-[12px] leading-relaxed text-amber/90">
                  {selected.note}
                </p>
                <div className="mt-4">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">inferred capabilities</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {selected.caps.map((c) => (
                      <Chip key={c} tone="ice">{c}</Chip>
                    ))}
                  </div>
                </div>
                <p className="mt-4 border-t border-line/70 pt-3 font-mono text-[10px] tracking-[0.12em] text-faint">
                  grid ({selected.x}, {selected.y}) · evidence: naming only
                </p>
              </div>
            ) : (
              <div className="mt-3">
                <h3 className="font-display text-lg font-bold text-paper">Constellation overview</h3>
                <ul className="mt-3 space-y-2.5 text-[13px] text-mute">
                  <li className="flex justify-between gap-3">
                    <span>Repositories enumerated</span>
                    <span className="font-mono text-paper">15</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Clusters</span>
                    <span className="font-mono text-paper">5</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Conflict-risk nodes</span>
                    <span className="font-mono text-coral">4</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Excluded by directive</span>
                    <span className="font-mono text-amber">{EXCLUDED_REPOS.length}</span>
                  </li>
                  <li className="flex justify-between gap-3">
                    <span>Remote bytes read</span>
                    <span className="font-mono text-coral">0</span>
                  </li>
                </ul>
                <p className="mt-4 text-[12px] leading-relaxed text-faint">
                  Topology is inferred from the directive's enumeration order and naming gravity.
                  Select any node for its reconstruction card.
                </p>
              </div>
            )}
          </div>

          <div className="corners border border-line bg-ink-900/60 p-5">
            <p className="font-mono text-[10px] tracking-[0.24em] text-faint uppercase">excluded · access not attempted</p>
            <ul className="mt-3 space-y-2.5">
              {EXCLUDED_REPOS.map((r) => (
                <li key={r.name} className="flex items-start justify-between gap-3 text-[12px]">
                  <span className="font-mono text-paper">{r.name}</span>
                  <Badge tone="coral">SCOPED-OUT</Badge>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-faint">{EXCLUDED_REPOS[0].reason}</p>
          </div>
        </div>
      </div>

      {/* cluster summary strip */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {(Object.keys(CLUSTERS) as ClusterId[]).map((cid, i) => {
          const c = CLUSTERS[cid];
          const count = REPOS.filter((r) => r.cluster === cid).length;
          return (
            <Reveal key={cid} delay={i * 60}>
              <div className="corners group h-full border border-line bg-ink-850/70 p-4 transition-colors duration-300 hover:border-ink-600">
                <div className="flex items-center justify-between">
                  <span className="font-display text-sm font-bold tracking-[0.14em]" style={{ color: TONE_HEX[c.tone] }}>
                    {c.label}
                  </span>
                  <span className="font-mono text-[11px] text-faint">×{count}</span>
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-mute">{c.blurb}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Reveal>
  );
}
