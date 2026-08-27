import { useEffect } from "react";
import { Link } from "react-router-dom";
import citiesData from "../data/cities-index.generated.json";
import type { CitiesIndexPageData } from "../types/cities-index";
import { useScrollReveal } from "../lib/useScrollReveal";
import { toRoute } from "../lib/toRoute";
import styles from "./cities-index-page.module.css";

const data = citiesData as unknown as CitiesIndexPageData;

export default function CitiesIndexPage() {
  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  const { hero, groups, cta } = data;

  return (
    <>
      <section className="band" style={{ paddingTop: 0, paddingBottom: "clamp(60px,8vh,110px)" }}>
        <div className="wrap">
          <div className={`${styles.ciHero} reveal`}>
            <div className="k">{hero.k}</div>
            <h1>{hero.heading}</h1>
            <p>{hero.lede}</p>
          </div>

          {groups.map((g, i) => (
            <div className={`${styles.cigroup} reveal`} key={i}>
              <div className={styles.cigl}>
                <span className="eyebrow">{g.label}</span>
                <span className={styles.ciline} />
              </div>
              <div className={styles.cigrid}>
                {g.cities.map((c, j) => (
                  <Link className="ci" to={toRoute(c.href)} key={j}>
                    <div className="cipic">
                      <span style={{ backgroundImage: `url('${c.image}')` }} />
                    </div>
                    <div className={styles.cin}>{c.name}</div>
                    <div className={styles.cic}>{c.country}</div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="band center">
        <div className="wrap">
          <div className="eyebrow reveal">{cta.eyebrow}</div>
          <div className="rule center reveal d1" />
          <h2 className="reveal d1" style={{ fontSize: "clamp(30px,4vw,54px)" }}>
            {cta.heading}
          </h2>
          <p className="lede reveal d2" style={{ margin: "20px auto 0", maxWidth: "52ch" }}>
            {cta.lede}
          </p>
          <div className="btn-row center reveal d2" style={{ marginTop: 28 }}>
            {cta.buttons.map((b, i) => (
              <Link className={i === 0 ? "btn btn-gold" : "btn btn-ghost"} to={toRoute(b.href)} key={i}>
                {b.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
