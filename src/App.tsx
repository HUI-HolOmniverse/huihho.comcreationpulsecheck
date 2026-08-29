import { useState } from "react";
import Masthead from "./components/Masthead";
import Constellation from "./components/Constellation";
import { SectionB, SectionC, SectionD } from "./components/SectionsBCD";
import { SectionE, SectionF, SectionG } from "./components/SectionsEFG";
import { SectionH, SectionI, SectionJ } from "./components/SectionsHIJ";
import { SectionShell } from "./components/ui";
import { useScrollSpy } from "./hooks";
import { NAV } from "./data";

export default function App() {
  const [masked, setMasked] = useState(false);
  const active = useScrollSpy(NAV.map((n) => n.id));

  return (
    <div className="min-h-screen">
      <Masthead masked={masked} onToggleMasked={() => setMasked((m) => !m)} />

      {/* mobile section bar */}
      <nav
        aria-label="Sections (mobile)"
        className="sticky top-0 z-40 flex gap-1.5 overflow-x-auto border-b border-line/70 bg-ink-950/90 px-4 py-2.5 backdrop-blur-sm lg:hidden"
      >
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#sec-${n.id}`}
            className={`shrink-0 border px-2.5 py-1 font-mono text-[10.5px] tracking-[0.12em] uppercase transition-colors ${
              active === n.id
                ? "border-teal/60 bg-teal/15 text-teal"
                : "border-line bg-ink-850/70 text-mute"
            }`}
          >
            {n.id}
          </a>
        ))}
      </nav>

      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-[190px_minmax(0,1fr)] lg:gap-10 lg:px-8">
        {/* rail nav */}
        <aside className="hidden lg:block">
          <nav aria-label="Sections" className="sticky top-8 py-14">
            <p className="mb-4 font-mono text-[10px] tracking-[0.26em] text-faint uppercase">artifact index</p>
            <ol className="space-y-1 border-l border-line/70">
              {NAV.map((n) => {
                const on = active === n.id;
                return (
                  <li key={n.id}>
                    <a
                      href={`#sec-${n.id}`}
                      className={`group -ml-px flex items-baseline gap-2.5 border-l-2 py-1.5 pl-4 transition-all duration-200 ${
                        on
                          ? "border-teal text-paper"
                          : "border-transparent text-mute hover:border-ink-600 hover:text-paper"
                      }`}
                    >
                      <span
                        className={`font-mono text-[11px] font-semibold ${on ? "text-teal" : "text-faint group-hover:text-mute"}`}
                      >
                        {n.id}
                      </span>
                      <span className="font-body text-[12.5px] leading-snug">{n.label}</span>
                    </a>
                  </li>
                );
              })}
            </ol>
            <div className="mt-8 border border-line/70 bg-ink-900/60 p-3.5">
              <p className="font-mono text-[9.5px] leading-relaxed tracking-[0.12em] text-faint uppercase">
                observed ≠ authorized
                <br />
                implemented ≠ accepted
                <br />
                accepted ≠ deployed
              </p>
            </div>
          </nav>
        </aside>

        {/* main column */}
        <main className="px-5 md:px-8 lg:px-0">
          <SectionShell
            id="A"
            index="A"
            kicker="the constellation, as inferred"
            title="Repository Map"
            intro="Fifteen repositories across five clusters, reconstructed from the directive's enumeration. Edges are naming-gravity integrations; coral dashes mark the two contested seams. Nothing here was read from source — the map is the hypothesis, not the territory."
          >
            <Constellation />
          </SectionShell>

          <SectionB masked={masked} />
          <SectionC masked={masked} />
          <SectionD />
          <SectionE />
          <SectionF />
          <SectionG />
          <SectionH />
          <SectionI />
          <SectionJ />

          {/* footer */}
          <footer className="border-t border-line/70 py-14">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-paper uppercase md:text-2xl">
                  Observed <span className="text-coral">≠</span> Authorized
                  <span className="mx-3 text-ink-600">·</span>
                  Implemented <span className="text-coral">≠</span> Accepted
                </p>
                <p className="font-display mt-1 text-xl font-bold tracking-tight text-paper uppercase md:text-2xl">
                  Accepted <span className="text-coral">≠</span> Deployed
                </p>
              </div>
              <div className="font-mono text-[10.5px] leading-relaxed tracking-[0.14em] text-faint uppercase">
                <p>artifact · QWEN_HUI_REPOSITORY_CONSTELLATION_V0_1</p>
                <p>mode · READ_FIRST / SYNTHESIZE_BEFORE_WRITE</p>
                <p className="text-teal">next · T0 ground truth — read, then write</p>
              </div>
            </div>
            <p className="mt-8 border-t border-line/50 pt-4 font-mono text-[10px] tracking-[0.18em] text-faint/80 uppercase">
              end of artifact — 0 bytes fetched · 15 repos mapped · 2 PRs frozen · 6 conflicts docketed · 14
              questions open
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}
