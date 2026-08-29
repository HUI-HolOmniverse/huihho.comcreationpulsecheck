import { ARCH_PRINCIPLES, PRS, RECON_PROTOCOL, REUSABLES, STRATA, SYNTHESIS_PATH } from "../data";
import { Badge, Chip, IconArrow, IconFreeze, Reveal, SectionShell, Stamp } from "./ui";

const KIND_TONE: Record<string, "teal" | "ice" | "amber" | "paper"> = {
  MODULE: "teal",
  CONTRACT: "ice",
  SERVICE: "amber",
  UI: "paper",
};

/* ================= E. REUSABLE COMPONENT INVENTORY ================= */
export function SectionE() {
  return (
    <SectionShell
      id="E"
      index="E"
      kicker="extract once, compose everywhere"
      title="Reusable Component Inventory"
      intro="Eleven extraction candidates. Every item flows one way: out of its origin repo, through huihho-public-commons, into its consumers. Tranche T1 ships the first four."
    >
      <div className="divide-y divide-line/60 border border-line bg-ink-900/60">
        {REUSABLES.map((r, i) => (
          <Reveal key={r.name} delay={Math.min(i * 30, 240)}>
            <div className="row-hi grid gap-x-6 gap-y-2 px-4 py-4 md:grid-cols-[230px_1fr] md:px-5">
              <div className="flex items-center gap-3 md:block">
                <span className="font-display text-[15px] font-semibold text-paper">{r.name}</span>
                <span className="flex gap-2 md:mt-1.5">
                  <Badge tone={KIND_TONE[r.kind]}>{r.kind}</Badge>
                  <span className="font-mono text-[10.5px] leading-5 text-faint">size {r.size}</span>
                </span>
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 font-mono text-[11.5px]">
                  <Chip tone="ice">{r.from}</Chip>
                  <IconArrow className="text-teal" />
                  {r.to.map((t) => (
                    <Chip key={t} tone="mute">{t}</Chip>
                  ))}
                </div>
                <p className="mt-2 text-[12.5px] leading-relaxed text-mute">{r.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ================= F. PR #103 <-> #104 RECONCILIATION ================= */
export function SectionF() {
  return (
    <SectionShell
      id="F"
      index="F"
      kicker="two pull requests, zero retrieved hunks"
      title="#103 ↔ #104 Reconciliation"
      intro="Neither diff could be retrieved in this environment, so this section ships the reconciliation protocol and the minimum synthesis path instead of invented hunk claims. Both PRs stay open, frozen, and equal before the protocol."
    >
      <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        {PRS.map((pr, i) => (
          <Reveal key={pr.label} delay={i * 90} className={i === 1 ? "md:order-3" : ""}>
            <article className="corners h-full border border-line bg-ink-900/70 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-lg font-bold text-paper">{pr.label}</h3>
                <Badge tone={pr.origin === "QWEN" ? "teal" : "ice"}>{pr.origin}</Badge>
              </div>
              <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">commit sha</p>
              <p className="mt-1 font-mono text-[12px] break-all text-ice">{pr.sha}</p>
              <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3.5">
                <span className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">diff status</span>
                <Badge tone="coral">UNRETRIEVABLE HERE</Badge>
              </div>
              <p className="mt-3 text-[12px] leading-relaxed text-mute">
                {pr.origin === "QWEN"
                  ? "This agent's own PR. It receives no self-preference: same protocol, same freeze."
                  : "External PR. Assessed only through the bucketing protocol — never by reputation."}
              </p>
            </article>
          </Reveal>
        ))}
        <Reveal delay={140} className="md:order-2">
          <div className="flex h-full min-h-[120px] items-center justify-center border border-dashed border-coral/50 bg-coral/5 px-6 py-4 md:w-[190px]">
            <div className="text-center">
              <IconFreeze className="mx-auto h-6 w-6 text-coral" />
              <p className="font-display mt-2 text-sm font-bold tracking-[0.14em] text-coral uppercase">
                hunk-level compare
              </p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-faint uppercase">not possible in env</p>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="corners h-full border border-line bg-ink-900/60 p-5">
            <h3 className="font-mono text-[11px] tracking-[0.24em] text-teal uppercase">F.1 — reconciliation protocol</h3>
            <ol className="mt-4 space-y-3.5">
              {RECON_PROTOCOL.map((s, i) => (
                <li key={i} className="flex gap-3.5">
                  <span className="font-display text-sm font-bold text-teal">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[13px] leading-relaxed text-mute">{s}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
        <Reveal delay={90}>
          <div className="corners h-full border border-line bg-ink-900/60 p-5">
            <h3 className="font-mono text-[11px] tracking-[0.24em] text-amber uppercase">F.2 — minimum synthesis path</h3>
            <ul className="mt-4 space-y-3.5">
              {SYNTHESIS_PATH.map((s, i) => (
                <li key={i} className="flex gap-3.5">
                  <IconArrow className="mt-1 text-amber" />
                  <span className="text-[13px] leading-relaxed text-mute">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between gap-4 border-t border-line/70 pt-4">
              <p className="font-mono text-[10.5px] tracking-[0.14em] text-faint uppercase">verdict · both PRs</p>
              <Stamp text="DO NOT MERGE" />
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

/* ================= G. CANDIDATE TARGET ARCHITECTURE ================= */
export function SectionG() {
  return (
    <SectionShell
      id="G"
      index="G"
      kicker="the constellation, settled"
      title="Candidate Target Architecture"
      intro="Seven strata, one direction of weight: experience sits on engagement, engagement on instruments, everything resting on a single trust gate, a single ledger, and a QCORE treaty instead of a third core."
    >
      <div className="relative pl-8 md:pl-12">
        <div aria-hidden className="rail-flow absolute top-2 bottom-2 left-[9px] w-[2px] md:left-[17px]" />
        <div className="space-y-3.5">
          {STRATA.map((s, i) => (
            <Reveal key={s.code} delay={Math.min(i * 60, 300)}>
              <div className="corners group relative border border-line bg-ink-900/70 p-4 transition-all duration-300 hover:border-teal/40 hover:bg-ink-850/80 md:p-5">
                <span
                  aria-hidden
                  className="absolute top-1/2 -left-[27px] h-3 w-3 -translate-y-1/2 border border-teal bg-ink-950 transition-colors duration-300 group-hover:bg-teal md:-left-[35px]"
                />
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-[12px] font-semibold tracking-[0.2em] text-teal">{s.code}</span>
                  <h3 className="font-display text-lg font-bold tracking-tight text-paper uppercase">{s.name}</h3>
                  <span className="ml-auto hidden font-mono text-[10.5px] tracking-[0.12em] text-faint uppercase md:block">
                    {s.note}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {s.chips.map((c) => (
                    <Chip key={c} tone={i >= 4 ? "teal" : i >= 2 ? "ice" : "paper"}>
                      {c}
                    </Chip>
                  ))}
                </div>
                <p className="mt-2 text-[11.5px] text-faint md:hidden">{s.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-3 md:grid-cols-2">
        {ARCH_PRINCIPLES.map((p, i) => (
          <Reveal key={p.title} delay={(i % 2) * 80}>
            <div
              className="h-full border-l-2 bg-ink-900/50 p-4 transition-colors duration-300 hover:bg-ink-850/70"
              style={{ borderColor: ["#3ec9a7", "#8fc1e3", "#e06a52", "#e5a83b"][i] }}
            >
              <p className="font-mono text-[10px] tracking-[0.22em] text-faint uppercase">
                principle {String(i + 1).padStart(2, "0")}
              </p>
              <h4 className="font-display mt-1 text-[15px] font-bold text-paper">{p.title}</h4>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-mute">{p.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
