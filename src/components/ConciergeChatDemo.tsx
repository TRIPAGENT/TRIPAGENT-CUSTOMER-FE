import { useEffect, useRef, useState } from "react";
import type { ChatMessage, ScenarioChip } from "../types/homepage";
import styles from "./ConciergeChatDemo.module.css";

// Ported from index.html's own "Interactive concierge demo" <script> 1:1 —
// same typing-indicator timing (380ms beat before a "me" bubble, a
// length-scaled typing wait before an ai/human reply, autoplay via
// IntersectionObserver at .35 once the phone scrolls into view, reduced-
// motion skips every delay). A `runId` guard (matching the source's `id`
// closure var) drops stale timers from a scenario the visitor has since
// switched away from.
type Bubble = ChatMessage | { who: "typing" };

const DEFAULT_SCENARIO = "maldives";

export default function ConciergeChatDemo({
  chips,
  scenarios,
  tryLabel,
}: {
  chips: ScenarioChip[];
  scenarios: Record<string, ChatMessage[]>;
  tryLabel: string | null;
}) {
  const initialKey = chips.find((c) => c.active)?.key ?? chips[0]?.key ?? DEFAULT_SCENARIO;
  const [activeKey, setActiveKey] = useState(initialKey);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const runIdRef = useRef(0);
  const autoplayedRef = useRef(false);

  function play(key: string) {
    const id = ++runIdRef.current;
    setBubbles([]);
    const seq = scenarios[key] ?? scenarios[DEFAULT_SCENARIO] ?? [];
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let i = 0;

    function next() {
      if (id !== runIdRef.current || i >= seq.length) return;
      const m = seq[i++];
      if (reduce) {
        setBubbles((prev) => [...prev, m]);
        next();
        return;
      }
      if (m.who === "me") {
        setTimeout(() => {
          if (id !== runIdRef.current) return;
          setBubbles((prev) => [...prev, m]);
          setTimeout(next, 540);
        }, 380);
      } else {
        setBubbles((prev) => [...prev, { who: "typing" }]);
        const wait = 950 + Math.min(m.t.length * 8, 1000);
        setTimeout(() => {
          if (id !== runIdRef.current) return;
          setBubbles((prev) => [...prev.slice(0, -1), m]);
          setTimeout(next, 520);
        }, wait);
      }
    }
    next();
  }

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [bubbles]);

  useEffect(() => {
    const phone = phoneRef.current;
    if (!phone || typeof IntersectionObserver === "undefined") {
      if (!autoplayedRef.current) {
        autoplayedRef.current = true;
        play(initialKey);
      }
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !autoplayedRef.current) {
            autoplayedRef.current = true;
            play(initialKey);
            io.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(phone);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleChipClick(key: string) {
    setActiveKey(key);
    play(key);
  }

  return (
    <>
      <div className="iphone ta-chat" ref={phoneRef}>
        <div className="island" />
        <div className="screen">
          <div className="statusbar">
            <span>9:41</span>
            <span>● ● ● &nbsp;5G&nbsp; ▮</span>
          </div>
          <div className="app">
            <div className="wa-top">
              <div className="wa-av">T</div>
              <div className="wa-id">
                <div className="nm">
                  TripAgent <span className="tick">✓</span>
                </div>
                <div className="st">online</div>
              </div>
            </div>
            <div className="wa-body" ref={bodyRef}>
              {bubbles.map((b, i) => {
                if (b.who === "typing") {
                  return (
                    <div className="bub in typing" key={i}>
                      <span />
                      <span />
                      <span />
                    </div>
                  );
                }
                if (b.who === "me") {
                  return (
                    <div className="bub out" key={i}>
                      {b.t}
                    </div>
                  );
                }
                return (
                  <div className="bub in" key={i}>
                    {b.who === "ai" ? (
                      <div className="who ai">TripAgent · AI</div>
                    ) : (
                      <div className="who human">
                        <span className="av">A</span> Aarav · your advisor
                      </div>
                    )}
                    {b.t}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="homebar" />
        </div>
      </div>

      <div className="reveal d3" style={{ marginTop: 32 }}>
        <div className={styles.demoTryLabel}>{tryLabel}</div>
        <div className={styles.demoChips}>
          {chips.map((chip) => (
            <button
              type="button"
              className={`${styles.demoChip}${chip.key === activeKey ? ` ${styles.active}` : ""}`}
              onClick={() => handleChipClick(chip.key)}
              key={chip.key}
            >
              {chip.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
