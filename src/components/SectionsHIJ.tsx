import { useState } from "react";
import { FREEZE_LIST, QUESTIONS, STAGES, TRANCHES } from "../data";
import { Badge, IconFreeze, Reveal, SectionShell, Stamp } from "./ui";

/* ================= H. MINIMUM NEXT IMPLEMENTATION TRANCHE ================= */
export function SectionH() {
  const [stages, setStages] = useState<number[]>(TRANCHES.map(() => 0));
  const total = stages.reduce((a, b) => a + b, 0);
  const max = TRANCHES.length * STAGES.length;

  const advance = (i: number) =>
    setStages((s) => s.map((v, idx) => (idx === i ? Math.min(v + 1, STAGES.length) : v)));
  const reset = (i: number) => setStages((s) => s.map((v, idx) => (idx === i ? 0 : v)));

  return (
    <SectionShell
      id="H"
      index="H"
      kicker="the smallest honest next step"
      title="Minimum Next Implementation Tranche"
      intro={
        <>
          Four tranches, each gated by the full epistemic pipeline —{" "}
          <span className="font-mono text-[11px] text-teal">OBSERVED → AUTHORIZED → ACCEPTED → DEPLOYED</span>.
          Nothing deploys that was not first observed and authorized. Advance stages below to model readiness.
        </>
      }
    >
      <Reveal>
        <div className="corners mb-6 border border-line bg-ink-900/70 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[11px] tracking-[0.22em] text-faint uppercase">
              tranche readiness · {total}/{max} gates passed
            </span>
            <span className="font-mono text-[12px] text-teal tabular-nums">
              {Math.round((total / max) * 100)}%
            </span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden bg-ink-700/60">
            <div
              className="h-full bg-teal/80 transition-all duration-500 ease-out"
              style={{ width: `${(total / max) * 100}%` }}
            />
          </div>
          <p className="mt-3 text-[12px] text-mute">
            At delivery of this artifact the true state is{" "}
            <span className="font-mono text-amber">T0 · stage 0</span>: not one gate has been passed, because
            observation has not yet occurred. The bar above models intent, not fact.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-4 md:grid-cols-2">
        {TRANCHES.map((t, i) => {
          const stage = stages[i];
          const done = stage >= STAGES.length;
          return (
            <Reveal key={t.code} delay={(i % 2) * 80}>
              <article
                className={`corners h-full border bg-ink-900/70 p-5 transition-colors duration-300 ${
                  done ? "border-teal/50" : "border-line hover:border-ink-600"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold text-teal">{t.code}</span>
                    <h3 className="font-display text-lg font-bold text-paper">{t.title}</h3>
                  </div>
                  {done ? (
                    <Badge tone="teal">GATES PASSED</Badge>
                  ) : stage > 0 ? (
                    <Badge tone="amber">AT {STAGES[stage - 1]}</Badge>
                  ) : (
                    <Badge tone="paper">QUEUED</Badge>
                  )}
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-mute">{t.objective}</p>

                <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-faint uppercase">exit criteria</p>
                <ul className="mt-2 space-y-1.5">
                  {t.exits.map((e) => (
                    <li key={e} className="flex gap-2.5 text-[12.5px] leading-relaxed text-mute">
                      <span className="mt-[5px] h-1.5 w-1.5 shrink-0 border border-teal/70" aria-hidden />
                      {e}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 grid grid-cols-4 gap-1.5">
                  {STAGES.map((s, si) => {
                    const passed = si < stage;
                    const current = si === stage && !done;
                    return (
                      <div
                        key={s}
                        className={`border px-1 py-1.5 text-center font-mono text-[8.5px] tracking-[0.08em] uppercase transition-all duration-300 ${
                          passed
                            ? "border-teal/60 bg-teal/15 text-teal"
                            : current
                              ? "anim-pulse-amber border-amber/60 bg-amber/10 text-amber"
                              : "border-line bg-ink-850/60 text-faint"
                        }`}
                      >
                        {s}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex gap-2.5">
                  <button
                    onClick={() => advance(i)}
                    disabled={done}
                    className="flex-1 border border-teal/50 bg-teal/10 px-3 py-2 font-display text-[12px] font-semibold tracking-[0.16em] text-teal uppercase transition-all duration-200 hover:bg-teal/20 disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {done ? "Pipeline complete" : "Advance gate"}
                  </button>
                  <button
                    onClick={() => reset(i)}
                    className="border border-line bg-ink-850/60 px-3 py-2 font-mono text-[11px] tracking-[0.14em] text-mute uppercase transition-colors duration-200 hover:border-ink-600 hover:text-paper"
                  >
                    reset
                  </button>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

/* ================= I. UNRESOLVED QUESTIONS ================= */
export function SectionI() {
  const tagTone = { BLOCKING: "coral", CLARIFYING: "amber", "SCOPED-OUT": "paper" } as const;
  return (
    <SectionShell
      id="I"
      index="I"
      kicker="what the reconstruction cannot answer alone"
      title="Unresolved Questions"
      intro="Six questions block synthesis outright — they are the price of leaving T0. Scoped-out items are recorded for completeness; per directive, they were never approached."
    >
      <div className="grid gap-3 md:grid-cols-2">
        {QUESTIONS.map((q, i) => (
          <Reveal key={q.ref} delay={Math.min((i % 2) * 70 + Math.floor(i / 2) * 40, 300)}>
            <div
              className={`row-hi flex h-full gap-4 border border-line bg-ink-900/60 p-4 ${
                q.tag === "SCOPED-OUT" ? "opacity-70" : ""
              }`}
            >
              <span className="font-mono text-[11.5px] font-semibold tracking-[0.1em] text-faint">{q.ref}</span>
              <div className="min-w-0">
                <div className="mb-1.5">
                  <Badge tone={tagTone[q.tag]}>
                    {q.tag === "BLOCKING" ? "BLOCKING · T0" : q.tag}
                  </Badge>
                </div>
                <p className="text-[13px] leading-relaxed text-mute">
                  {q.q}
                  {q.tag === "SCOPED-OUT" && (
                    <span className="mt-1 block font-mono text-[10.5px] tracking-[0.14em] text-coral uppercase">
                      access not attempted — per directive
                    </span>
                  )}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

/* ================= J. DO-NOT-MERGE LIST ================= */
export function SectionJ() {
  return (
    <SectionShell
      id="J"
      index="J"
      kicker="the freeze is the deliverable"
      title="Do-Not-Merge List"
      intro="Nothing below may merge until its freeze condition clears. The list is deliberately boring: that is the point."
    >
      <div className="relative border border-coral/45 bg-ink-900/70">
        <div className="pointer-events-none absolute top-5 right-5 hidden sm:block">
          <Stamp text="MERGE FROZEN" />
        </div>
        <div className="divide-y divide-line/60">
          {FREEZE_LIST.map((f, i) => (
            <Reveal key={f.item} delay={Math.min(i * 50, 250)}>
              <div className="row-hi flex items-start gap-4 px-5 py-4">
                <IconFreeze className="mt-0.5 h-5 w-5 text-coral" />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="font-display text-[15px] font-bold text-paper">{f.item}</h3>
                    {f.mono && <span className="font-mono text-[10.5px] break-all text-faint">{f.mono}</span>}
                  </div>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-mute">{f.reason}</p>
                </div>
                <Badge tone="coral" className="ml-auto mt-0.5 shrink-0">
                  FROZEN
                </Badge>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="border-t border-coral/30 bg-coral/5 px-5 py-3.5">
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.1em] text-coral/90 uppercase">
            freeze lifts only per tranche gates: T0 observation → authorization → acceptance. No exceptions,
            no fast paths.
          </p>
        </div>
      </div>
    </SectionShell>
  );
}
