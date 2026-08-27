import { useEffect } from "react";

// css/site.css ships `.reveal`/`.reveal-clip` at opacity:0 until a `.in`
// class is added; on the static site js/site.js does that via an
// IntersectionObserver as the visitor scrolls. Ported pages don't load that
// script, so without this every `.reveal` element stays invisible forever.
// This is the minimal equivalent (observe + add `.in`, no stagger
// choreography) — a page-agnostic hook so every future ported page gets it
// by calling it once, not just CityPage.
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal:not(.in), .reveal-clip:not(.in)");
    if (targets.length === 0) return;

    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14 }
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
