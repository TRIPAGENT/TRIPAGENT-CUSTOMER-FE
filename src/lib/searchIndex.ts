// Ported from js/site.js's "SITE SEARCH" IIFE (score/matches/norm/subseq) —
// same algorithm, same weights, same data file. That IIFE also drives a
// header autocomplete dropdown and an interpret() contextual-shortcuts layer
// which are NOT ported here (deferred, per the approved plan) — this module
// is only the matching engine + the shared index fetch/cache.

export type SearchEntryKind =
  | "City"
  | "Destination"
  | "Hotel"
  | "Restaurant"
  | "Sight"
  | "Bar"
  | "Guide"
  | "Visa guide"
  | "Journal"
  | "Page";

export interface SearchEntry {
  t: string;
  u: string;
  k: SearchEntryKind;
  d?: string;
  city?: string;
  kw?: string;
}

const KW_WEIGHT: Record<string, number> = {
  City: 1.4,
  Destination: 1.22,
  Hotel: 1.2,
  Restaurant: 1.12,
  Sight: 1.1,
  Bar: 1.05,
  Guide: 1,
  "Visa guide": 0.95,
  Journal: 0.9,
  Page: 0.85,
};

function norm(s: string | null | undefined): string {
  return String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function subseq(q: string, t: string): boolean {
  let i = 0;
  for (let j = 0; j < t.length && i < q.length; j++) {
    if (t.charCodeAt(j) === q.charCodeAt(i)) i++;
  }
  return i === q.length;
}

// first-letters, then word-starts, substring, fuzzy; city-aware — identical
// scoring shape to the source so result ordering matches the live site.
function score(q: string, e: SearchEntry): number {
  const t = norm(e.t);
  let base = 0;
  if (t === q) base = 1000;
  else if (t.indexOf(q) === 0) base = 680 - Math.min(t.length, 40);
  else {
    const w = t.split(/[^a-z0-9]+/);
    for (let i = 0; i < w.length; i++) {
      if (w[i] && w[i].indexOf(q) === 0) {
        base = 540 - i * 12 - Math.min(t.length, 30);
        break;
      }
    }
    if (!base) {
      const si = t.indexOf(q);
      if (si > -1) {
        const boundary = si === 0 || /[^a-z0-9]/.test(t.charAt(si - 1));
        base = boundary ? 330 - si : q.length >= 5 ? 150 - si : 0;
      } else if (q.length >= 5 && subseq(q, t)) base = 130 - Math.min(t.length, 40);
    }
  }
  if (e.city) {
    const c = norm(e.city);
    let cs = 0;
    if (c === q) cs = 720;
    else if (c.indexOf(q) === 0) cs = 560 - Math.min(c.length, 20);
    else {
      const cw = c.split(/[^a-z0-9]+/);
      for (let j = 0; j < cw.length; j++) {
        if (cw[j] && cw[j].indexOf(q) === 0) {
          cs = 470;
          break;
        }
      }
    }
    if (cs > base) base = cs;
  }
  if (!base) {
    const k = norm((e.kw || "") + " " + (e.d || ""));
    const ki = k.indexOf(q);
    if (ki > -1 && (ki === 0 || /[^a-z0-9]/.test(k.charAt(ki - 1)))) base = 90 - Math.min(ki, 55);
  }
  if (!base && q.indexOf(" ") > -1) {
    const toks = q.split(/\s+/).filter((x) => x.length > 1);
    const hay = t + " " + norm((e.kw || "") + " " + (e.city || ""));
    if (toks.length && toks.every((tk) => hay.indexOf(tk) > -1)) base = 210;
  }
  return base ? base * (KW_WEIGHT[e.k] ?? 0.85) : 0;
}

export function matches(index: SearchEntry[], qraw: string, limit = 300): SearchEntry[] {
  const q = norm((qraw || "").trim());
  if (!q) return [];
  const scored: [number, SearchEntry][] = [];
  for (const e of index) {
    const s = score(q, e);
    if (s > 0) scored.push([s, e]);
  }
  scored.sort((a, b) => b[0] - a[0]);
  return scored.slice(0, limit).map((x) => x[1]);
}

export const RESULT_GROUPS: { label: string; kinds: SearchEntryKind[] }[] = [
  { label: "Destinations", kinds: ["City", "Destination"] },
  { label: "Stays", kinds: ["Hotel"] },
  { label: "Tables & bars", kinds: ["Restaurant", "Bar"] },
  { label: "To see", kinds: ["Sight"] },
  { label: "Reading & guides", kinds: ["Guide", "Visa guide", "Journal", "Page"] },
];

export const KIND_LABEL: Record<SearchEntryKind, string> = {
  City: "Destination",
  Destination: "Destination",
  Hotel: "Hotel",
  Restaurant: "Restaurant",
  Bar: "Bar",
  Sight: "To see",
  Guide: "Guide",
  "Visa guide": "Visa",
  Journal: "Journal",
  Page: "Page",
};

// Same file the live static site already ships to every visitor
// (tools/ta_deploy.py's runtime allowlist) — symlinked into
// app/public/data/search-index.json so it's fetched, not bundled.
let cached: Promise<SearchEntry[]> | null = null;

export function loadSearchIndex(): Promise<SearchEntry[]> {
  if (!cached) {
    cached = fetch("/data/search-index.json")
      .then((r) => r.json())
      .catch(() => []);
  }
  return cached;
}
