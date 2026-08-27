import { useEffect } from "react";
import { Link } from "react-router-dom";
import whatsonData from "../data/whatson.generated.json";
import type { WhatsOnPageData } from "../types/whatson";
import { useScrollReveal } from "../lib/useScrollReveal";
import { toRoute } from "../lib/toRoute";
import styles from "./whatson-page.module.css";

const data = whatsonData as unknown as WhatsOnPageData;

export default function WhatsOnPage() {
  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  const { hero, monthLinks, months } = data;

  return (
    <>
      <header className={styles.woHero}>
        <div className="wrap">
          <div className="eyebrow">{hero.eyebrow}</div>
          <h1 dangerouslySetInnerHTML={{ __html: hero.headingHtml ?? "" }} />
          <p>{hero.lede}</p>
        </div>
      </header>
      <div className={styles.woNav}>
        <div className="wrap">
          {monthLinks.map((m) => (
            <a className={styles.woMlink} href={`#${m.id}`} key={m.id}>
              {m.label}
            </a>
          ))}
        </div>
      </div>
      <main>
        {months.map((m, i) => (
          <section className={styles.woMonth} id={m.id ?? undefined} key={m.id ?? i}>
            <div className="wrap">
              <div className={styles.woMh}>
                <h2>{m.name}</h2>
                <div className="ln" />
                <span className="ct">{m.count}</span>
              </div>
              <div className={styles.woGrid}>
                {m.events.map((ev, j) => (
                  <Link className={styles.woEv} to={toRoute(ev.href)} key={j}>
                    <div className={styles.en}>{ev.name}</div>
                    <div className={styles.ec}>{ev.meta}</div>
                    <p className={styles.eo}>{ev.body}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
