import { useEffect } from "react";
import { Link } from "react-router-dom";
import newData from "../data/new.generated.json";
import type { NewPageData } from "../types/new";
import { useScrollReveal } from "../lib/useScrollReveal";
import { toRoute } from "../lib/toRoute";
import styles from "./new-page.module.css";

const data = newData as unknown as NewPageData;

export default function NewPage() {
  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  const { hero, sections } = data;

  return (
    <>
      <header className={styles.nnHero}>
        <div className="wrap">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: hero.headingHtml ?? "" }} />
          <p>{hero.lede}</p>
        </div>
      </header>
      <main>
        {sections.map((sec, i) => (
          <section className={styles.nnSec} key={i}>
            <div className="wrap">
              <div className={styles.nnHead}>
                <h2>{sec.heading}</h2>
                <span className="sub">{sec.sub}</span>
              </div>
              <div className={styles.nnGrid}>
                {sec.items.map((it, j) => (
                  <div className={styles.nnItem} key={j}>
                    <div className={styles.nt}>
                      <h3>{it.title}</h3>
                      <span className={styles.yr}>{it.year}</span>
                    </div>
                    <div className={styles.wh}>{it.where}</div>
                    <p>{it.body}</p>
                    {it.link && <Link className={styles.gl} to={toRoute(it.link.href)}>{it.link.label}</Link>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
