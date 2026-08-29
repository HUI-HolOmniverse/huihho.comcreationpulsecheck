import { useState, type ReactNode } from "react";
import {
  CAPABILITIES,
  CLUSTERS,
  CONFLICTS,
  MATRIX,
  MATRIX_FOOTNOTE,
  type ClusterId,
  type Layer,
} from "../data";
import { Badge, Chip, IconSwap, Reveal, SectionShell } from "./ui";

const LAYERS: Layer[] = ["CORE", "TRUST", "ECONOMY", "GOVERNANCE", "EXPERIENCE", "PIPELINE"];
const LAYER_TONE: Record<Layer, "teal" | "coral" | "amber" | "ice" | "mute" | "paper"> = {
  CORE: "teal",
  TRUST: "coral",
  ECONOMY: "amber",
  GOVERNANCE: "ice",
  EXPERIENCE: "paper",
  PIPELINE: "mute",
};
const MATURITY_TONE: Record<string, "teal" | "ice" | "amber" | "mute"> = {
  IMPLEMENTED: "teal",
  DESIGNED: "ice",
  PLACEHOLDER: "amber",
  UNKNOWN: "mute",
};

function MaskSpan({ masked, children, className = "" }: { masked: boolean; children: ReactNode; className?: string }) {
  return <span className={`mask-wrap ${masked ? "masked" : ""} ${className}`}>{children}</span>;
}

/* ================= B. CAPABILITY MAP ================= */
export function SectionB({ masked }: { masked: boolean }) {
  const [layer, setLayer] = useState<Layer | "ALL">("ALL");
  const rows = CAPABILITIES.filter((c) => layer === "ALL" || c.layer === layer);

  return (
    <SectionShell
      id="B"
      index="B"
      kicker="capability ↔ repository binding"
      title="Capability Map"
      intro={
        <>
          Twenty-four named capabilities from the directive, bound to their most plausible repository
          hosts by naming gravity. <span className="text-amber">No binding below was read from source</span> —
          confidence scores reflect inference strength only{masked ? " (currently masked)." : "."}
        </>
      }
    >
      <div className="mb-6 flex flex-wrap gap-2">
        {(["ALL", ...LAYERS] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLayer(l)}
            className={`border px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-all duration-200 ${
              layer === l
                ? "border-teal/60 bg-teal/15 text-teal"
                : "border-line bg-ink-850/60 text-mute hover:border-ink-600 hover:text-paper"
            }`}
          >
            {l}
            <span className="ml-1.5 text-faint">
              {l === "ALL" ? CAPABILITIES.length : CAPABILITIES.filter((c) => c.layer === l).length}
            </span>
          </button>
        ))}
      </div>

      <div className="divide-y divide-line/60 border border-line bg-ink-900/60">
        {rows.map((c, i) => (
          <Reveal key={c.name} delay={Math.min(i * 35, 280)}>
            <div className="row-hi grid gap-x-6 gap-y-2 px-4 py-3.5 md:grid-cols-[200px_1fr] md:px-5">
              <div className="flex items-start justify-between gap-3 md:block">
                <span className="font-display text-[15px] font-semibold text-paper">{c.name}</span>
                <div className="md:mt-1.5">
                  <Badge tone={LAYER_TONE[c.layer]}>{c.layer}</Badge>
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
                  <span className="font-mono text-[11.5px] text-ice">{c.owner}</span>
                  <Badge tone={MATURITY_TONE[c.maturity]}>{c.maturity}</Badge>
                  <span className="ml-auto flex min-w-[130px] items-center gap-2">
                    <span className="h-1.5 w-full max-w-[110px] overflow-hidden bg-ink-700/70">
                      <MaskSpan masked={masked} className="block h-full bg-teal/70" >
                        <span className="block h-full bg-teal/80" style={{ width: `${c.conf}%` }} />
                      </MaskSpan>
                    </span>
                    <MaskSpan masked={masked} className="font-mono text-[10.5px] text-faint tabular-nums">
                      {c.conf}%
                    </MaskSpan>
                  </span>
                </div>
                <MaskSpan masked={masked}>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-mute">{c.note}</p>
                </MaskSpan>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <p className="mt-3 font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase">
        confidence = inference strength, not implementation evidence
      </p>
    </SectionShell>
  );
}

/* ================= C. IMPLEMENTED / DESIGNED / PLACEHOLDER MATRIX ================= */
export function SectionC({ masked }: { masked: boolean }) {
  const [cluster, setCluster] = useState<ClusterId | "ALL">("ALL");
  const clusters = Object.keys(CLUSTERS) as ClusterId[];
  const rows = MATRIX.filter((m) => cluster === "ALL" || m.cluster === cluster);

  return (
    <SectionShell
      id="C"
      index="C"
      kicker="state of the artifact"
      title="Implemented / Designed / Placeholder"
      intro={
        <>
          Every cell carries the same epistemic flag:{" "}
          <Badge tone="amber" className="text-[9px]!">INFERRED — NO READ ACCESS</Badge>. The only
          "implemented" entries are naming-implied services, and they say <em>implied</em>.
        </>
      }
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {(["ALL", ...clusters] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCluster(c)}
            className={`border px-3 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-all duration-200 ${
              cluster === c
                ? "border-teal/60 bg-teal/15 text-teal"
                : "border-line bg-ink-850/60 text-mute hover:border-ink-600 hover:text-paper"
            }`}
          >
            {c}
          </button>
        ))}
        <span className="ml-auto hidden items-center font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase sm:flex">
          {rows.length} module rows · 100% cells flagged
        </span>
      </div>

      <Reveal>
        <div className="overflow-x-auto border border-line bg-ink-900/60">
          <table className="w-full min-w-[820px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-ink-850/80">
                {["Module", "Cluster", "Implemented", "Designed", "Placeholder", "Verdict"].map((h) => (
                  <th key={h} className="px-4 py-3 font-mono text-[10.5px] font-medium tracking-[0.2em] text-mute uppercase">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {rows.map((m) => (
                <tr key={m.module} className="row-hi align-top">
                  <td className="px-4 py-3.5">
                    <span className="font-display text-[14px] font-semibold text-paper">{m.module}</span>
                  </td>
                  <td className="px-4 py-3.5">
                    <Chip tone={CLUSTERS[m.cluster].tone === "mute" ? "paper" : CLUSTERS[m.cluster].tone}>
                      {CLUSTERS[m.cluster].label}
                    </Chip>
                  </td>
                  <td className="px-4 py-3.5">
                    <MaskSpan masked={masked} className="space-y-1">
                      {m.implemented.length === 0 ? (
                        <span className="font-mono text-[12px] text-faint">—</span>
                      ) : (
                        m.implemented.map((x) => (
                          <p key={x} className="flex items-start gap-2 text-[12.5px] text-teal">
                            <span aria-hidden>■</span> {x}
                          </p>
                        ))
                      )}
                    </MaskSpan>
                  </td>
                  <td className="px-4 py-3.5">
                    <MaskSpan masked={masked} className="space-y-1">
                      {m.designed.length === 0 ? (
                        <span className="font-mono text-[12px] text-faint">—</span>
                      ) : (
                        m.designed.map((x) => (
                          <p key={x} className="flex items-start gap-2 text-[12.5px] text-ice">
                            <span aria-hidden>□</span> {x}
                          </p>
                        ))
                      )}
                    </MaskSpan>
                  </td>
                  <td className="px-4 py-3.5">
                    <MaskSpan masked={masked} className="space-y-1">
                      {m.placeholder.length === 0 ? (
                        <span className="font-mono text-[12px] text-faint">—</span>
                      ) : (
                        m.placeholder.map((x) => (
                          <p key={x} className="flex items-start gap-2 text-[12.5px] text-amber">
                            <span aria-hidden>◇</span> {x}
                          </p>
                        ))
                      )}
                    </MaskSpan>
                  </td>
                  <td className="max-w-[220px] px-4 py-3.5 text-[12.5px] leading-relaxed text-coral/90">{m.verdict}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>

      <p className="mt-3 max-w-3xl border-l-2 border-amber/50 pl-3 text-[12px] leading-relaxed text-mute">
        <span className="font-mono text-[10px] tracking-[0.18em] text-amber uppercase">footnote · </span>
        {MATRIX_FOOTNOTE}
      </p>
    </SectionShell>
  );
}

/* ================= D. DUPLICATE / CONFLICT MAP ================= */
export function SectionD() {
  return (
    <SectionShell
      id="D"
      index="D"
      kicker="where the constellation argues with itself"
      title="Duplicate / Conflict Map"
      intro="Six inferred fault lines, each paired with the policy that must close it before any merge is even discussable."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {CONFLICTS.map((c, i) => (
          <Reveal key={c.id} delay={(i % 2) * 80}>
            <article className="corners group h-full border border-line bg-ink-900/70 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-600">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] font-semibold tracking-[0.18em] text-faint">{c.id}</span>
                <Badge tone={c.severity === "HIGH" ? "coral" : c.severity === "MED" ? "amber" : "ice"}>
                  {c.severity}
                </Badge>
                <Badge tone="paper">{c.kind}</Badge>
              </div>
              <h3 className="font-display mt-2.5 text-lg font-bold text-paper">{c.title}</h3>
              <div className="mt-3 flex flex-wrap items-center gap-2 font-mono text-[11.5px]">
                <span className="border border-line bg-ink-850 px-2 py-1 text-ice">{c.a}</span>
                <IconSwap className="text-coral" />
                <span className="border border-line bg-ink-850 px-2 py-1 text-ice">{c.b}</span>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-mute">{c.detail}</p>
              <p className="mt-3.5 border-t border-line/70 pt-3 text-[12.5px] leading-relaxed">
                <span className="font-mono text-[10px] tracking-[0.2em] text-teal uppercase">→ policy · </span>
                <span className="text-teal/90">{c.resolution}</span>
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
