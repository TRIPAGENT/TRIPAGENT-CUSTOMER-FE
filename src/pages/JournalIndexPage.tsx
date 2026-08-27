import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import journalIndexData from "../data/journal-index-page.generated.json";
import type { JournalIndexPageData, JournalLink } from "../types/journal-index-page";
import { useScrollReveal } from "../lib/useScrollReveal";
import { toRoute } from "../lib/toRoute";
import styles from "./journal-index-page.module.css";

const data = journalIndexData as unknown as JournalIndexPageData;

function LinkCol({ kicker, lead, links }: { kicker: string; lead: { label: string | null; href: string }; links: JournalLink[] }) {
  return (
    <div className={`${styles.jlibCol} reveal`}>
      <p className={styles.jlibK}>{kicker}</p>
      <Link className="lead" to={toRoute(lead.href)}>
        {lead.label}
      </Link>
      <div className={kicker === "By the season" ? styles.jlibMonths : kicker === "By the mood" ? styles.jlibMoods : undefined}>
        {links.map((l, i) => (
          <Link to={toRoute(l.href)} key={i}>
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

// #jmag's category tabs are a plain client-side show/hide filter over
// already-rendered .jcard elements (journal.html's own trailing inline
// <script>) — real local state, no backend, ported with useState.
export default function JournalIndexPage() {
  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  const { magazine, library } = data;
  const [cat, setCat] = useState("all");

  return (
    <main>
      <section id="jmag" className="band" style={{ paddingTop: 0, paddingBottom: 0 }}>
        <div className="wrap">
          <div className={`${styles.jmagHead} reveal`}>
            <div className="jk">{magazine.kicker}</div>
            <h1>{magazine.heading}</h1>
            <p>{magazine.lede}</p>
            <div className={`${styles.jmagTabs} reveal d1`}>
              {magazine.tabs.map((t, i) => (
                <button key={i} type="button" data-cat={t.cat ?? undefined} aria-pressed={t.cat === cat} onClick={() => setCat(t.cat ?? "all")}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>
          <Link className={`${styles.jmagFeat} reveal d1`} to={toRoute(magazine.featured.href)}>
            <div className="pic">
              <span style={{ backgroundImage: `url('${magazine.featured.image}')` }} />
            </div>
            <div>
              <div className="jk">{magazine.featured.kicker}</div>
              <h2>{magazine.featured.heading}</h2>
              <p>{magazine.featured.body}</p>
              <div className={styles.jmeta}>{magazine.featured.meta}</div>
            </div>
          </Link>
          <div className={styles.jmagGrid}>
            {magazine.cards.map((c, i) => (
              <Link className="jcard reveal" data-cat={c.cat ?? undefined} to={toRoute(c.href)} hidden={cat !== "all" && c.cat !== cat} key={i}>
                <div className="pic">
                  <span style={{ backgroundImage: `url('${c.image}')` }} />
                </div>
                <div className="jk">{c.kicker}</div>
                <h3>{c.heading}</h3>
                <div className={styles.jmeta}>{c.meta}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="jlib" className="band">
        <div className="wrap">
          <div className={`${styles.jlibHead} reveal`}>
            <div className="jk">{library.kicker}</div>
            <h2>{library.heading}</h2>
            <p>{library.lede}</p>
          </div>
          <div className={styles.jlibCols}>
            <LinkCol kicker="By the season" lead={{ label: library.season.leadLabel, href: library.season.leadHref }} links={library.season.links} />
            <LinkCol kicker="By the mood" lead={{ label: library.mood.leadLabel, href: library.mood.leadHref }} links={library.mood.links} />
            <LinkCol kicker="The practical guides" lead={{ label: library.guides.leadLabel, href: library.guides.leadHref }} links={library.guides.links} />
          </div>
        </div>
      </section>
    </main>
  );
}
