import { useEffect, useMemo, useRef, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function useClock(): string {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(t);
  }, []);
  return now.toISOString().slice(11, 19);
}

const GLYPHS = "█▓▒░<>/\\[]{}=+*^?#·";

export function useScramble(target: string, speed = 28): string {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState(reduced ? target : "");
  useEffect(() => {
    if (reduced) {
      setOut(target);
      return;
    }
    let frame = 0;
    const total = Math.max(14, target.length + 6);
    const t = window.setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / total) * target.length);
      let s = "";
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        if (ch === " " || i < settled) s += ch;
        else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(s);
      if (settled >= target.length) window.clearInterval(t);
    }, speed);
    return () => window.clearInterval(t);
  }, [target, speed, reduced]);
  return out;
}

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function useScrollSpy(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const list = useMemo(() => ids.join(","), [ids]);
  useEffect(() => {
    const targets = list.split(",").map((i) => document.getElementById(`sec-${i}`)).filter(Boolean) as HTMLElement[];
    if (targets.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id.replace("sec-", ""));
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: 0 },
    );
    targets.forEach((t) => obs.observe(t));
    return () => obs.disconnect();
  }, [list]);
  return active;
}
