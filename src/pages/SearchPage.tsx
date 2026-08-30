import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import searchData from "../data/search.generated.json";
import type { SearchPageData } from "../types/search";
import { useNavVariant } from "../lib/navVariant";
import { toRoute } from "../lib/toRoute";
import { KIND_LABEL, RESULT_GROUPS, loadSearchIndex, matches, type SearchEntry } from "../lib/searchIndex";

const data = searchData as unknown as SearchPageData;

// Ported from js/site.js's RESULTS PAGE section (search.html) — same data
// file (data/search-index.json, symlinked into app/public/data/), same
// scoring (src/lib/searchIndex.ts), same grouping. The header ".ta-hd-q"
// autocomplete, the empty-query "Popular cities" grid, interpret()'s
// contextual shortcuts, and the "+Trip" quick-add button are NOT ported —
// deferred, per the approved plan. Results update live as you type (the
// source only did this for the header autocomplete, not this page — a
// strict improvement, not a fidelity gap).
function citySlug(e: SearchEntry): string | null {
  if (e.u.indexOf("city-") === 0) return e.u.slice(5).replace(".html", "").replace(/[#?].*$/, "");
  return null;
}

function truncate(d: string, max: number): string {
  return d.length > max ? d.slice(0, max - 2).replace(/\s+\S*$/, "") + "…" : d;
}

function ResultRow({ entry }: { entry: SearchEntry }) {
  const slug = citySlug(entry);
  return (
    <div className="sp-row">
      <Link className="sp-row-main" to={toRoute(entry.u)}>
        {slug ? (
          <span className="sp-th" style={{ backgroundImage: `url('/_vercel/image?url=%2Fimg%2Fcities%2F${slug}.jpg&w=96&q=70')` }} />
        ) : (
          <span className="sp-th sp-th-ph">{(entry.t || "?").charAt(0)}</span>
        )}
        <span className="sp-row-tw">
          <span className="sp-row-top">
            <span className="sp-row-t">{entry.t}</span>
            <span className="sp-row-k">
              {KIND_LABEL[entry.k] || entry.k}
              {entry.city && <> <em>{entry.city}</em></>}
            </span>
          </span>
          {entry.d && <span className="sp-row-d">{truncate(entry.d, 128)}</span>}
        </span>
      </Link>
    </div>
  );
}

export default function SearchPage() {
  useNavVariant("solid");
  const [query, setQuery] = useState(() => {
    try {
      return new URLSearchParams(window.location.search).get("q") || "";
    } catch {
      return "";
    }
  });
  const [index, setIndex] = useState<SearchEntry[] | null>(null);

  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useEffect(() => {
    let cancelled = false;
    loadSearchIndex().then((idx) => {
      if (!cancelled) setIndex(idx);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const q = query.trim();
  const results = useMemo(() => (index && q ? matches(index, q) : []), [index, q]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Keeps the results page shareable/bookmarkable, same as the source's
    // /search.html?q=... — results themselves already update live as you type.
    const url = new URL(window.location.href);
    if (q) url.searchParams.set("q", q);
    else url.searchParams.delete("q");
    window.history.replaceState(null, "", url.pathname + url.search);
  }

  return (
    <section className="band" style={{ padding: "clamp(40px,6vw,72px) 0" }}>
      <div className="wrap">
        <form className="sp-form" role="search" autoComplete="off" onSubmit={handleSubmit}>
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <circle cx={11} cy={11} r={7} />
            <line x1={20.5} y1={20.5} x2={16.5} y2={16.5} />
          </svg>
          <input
            type="search"
            name="q"
            id="spInput"
            className="sp-input"
            placeholder={data.placeholder ?? undefined}
            aria-label="Search"
            autoComplete="off"
            spellCheck={false}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="sp-go" aria-label="Search">
            {data.goLabel}
          </button>
        </form>
        <div className="sp-head">
          <h1 id="spTitle">{q ? `Results for “${q}”` : data.heading}</h1>
          <p id="spCount" className="sp-count">
            {q && index ? `${results.length} ${results.length === 1 ? "result" : "results"}` : ""}
          </p>
        </div>
        <div id="searchResults" className="sp-results">
          {!q
            ? null
            : !index
            ? null
            : results.length === 0
            ? (
                <div className="sp-empty">
                  <p>Nothing in the library matched “{q}”.</p>
                  <p>
                    Your advisor can still find it —{" "}
                    <Link to={`/enquire?about=${encodeURIComponent(q)}`}>tell them what you have in mind →</Link>
                  </p>
                </div>
              )
            : RESULT_GROUPS.map((g) => {
                const items = results.filter((e) => (g.kinds as string[]).includes(e.k));
                if (!items.length) return null;
                return (
                  <section className="sp-group" key={g.label}>
                    <h2 className="sp-group-h">
                      {g.label} <span>{items.length}</span>
                    </h2>
                    <div className="sp-rows">
                      {items.map((e, i) => (
                        <ResultRow entry={e} key={e.u + i} />
                      ))}
                    </div>
                  </section>
                );
              })}
        </div>
      </div>
    </section>
  );
}
