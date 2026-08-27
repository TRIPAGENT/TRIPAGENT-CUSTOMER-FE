import { useEffect } from "react";
import { Link } from "react-router-dom";
import collectionsData from "../data/collections.generated.json";
import type { CollectionsPageData } from "../types/collections";
import { useScrollReveal } from "../lib/useScrollReveal";
import { toRoute } from "../lib/toRoute";
import styles from "./collections-page.module.css";

const data = collectionsData as unknown as CollectionsPageData;

export default function CollectionsPage() {
  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  const { hero, sections } = data;

  return (
    <>
      <header className={styles.brHero}>
        <div className="wrap">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1>{hero.heading}</h1>
          <p>{hero.lede}</p>
        </div>
      </header>
      <main>
        <div className={styles.brHub}>
          {sections.map((sec, i) => (
            <div className={styles.brSec} key={i}>
              <div className="eyebrow">{sec.eyebrow}</div>
              <div className="rule" />
              <div className={styles.brLinks}>
                {sec.links.map((l, j) => (
                  <Link className={styles.brLink} to={toRoute(l.href)} key={j}>
                    {l.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
