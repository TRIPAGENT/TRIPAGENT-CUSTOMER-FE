import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import searchData from "../data/search.generated.json";
import type { SearchPageData } from "../types/search";
import { useNavVariant } from "../lib/navVariant";
import styles from "./search-page.module.css";

const data = searchData as unknown as SearchPageData;

// #spShortcuts / #searchResults / #spCount are populated on the static
// site by search logic embedded in js/site.js, not a static template — no
// content to port. Per the shell-only-defer-logic decision, the form UI is
// real and typeable, but submission is deferred rather than live.
export default function SearchPage() {
  useNavVariant("solid");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  return (
    <section className="band" style={{ padding: "clamp(40px,6vw,72px) 0" }}>
      <div className="wrap">
        <form
          className="sp-form"
          role="search"
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
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
          />
          <button type="submit" className="sp-go" aria-label="Search">
            {data.goLabel}
          </button>
        </form>
        <div className="sp-head">
          <h1 id="spTitle">{data.heading}</h1>
        </div>
        {submitted && (
          <p className={styles.spNotlive}>
            Search is on its way. Meanwhile, browse <Link to="/destinations">Destinations</Link>, <Link to="/cities">Cities</Link>, or{" "}
            <Link to="/enquire">tell your advisor</Link> what you're looking for.
          </p>
        )}
      </div>
    </section>
  );
}
