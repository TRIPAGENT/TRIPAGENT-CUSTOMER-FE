import { useEffect } from "react";
import { Link } from "react-router-dom";
import joinData from "../data/join.generated.json";
import type { JoinPageData } from "../types/join";
import { useScrollReveal } from "../lib/useScrollReveal";
import { useNavVariant } from "../lib/navVariant";
import { toRoute } from "../lib/toRoute";
import styles from "./join-page.module.css";

const data = joinData as unknown as JoinPageData;

export default function JoinPage() {
  useNavVariant("solid");

  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  const { aside, card } = data;

  return (
    <section>
      <div className={`wrap ${styles.invWrap}`}>
        <div className={`${styles.invAside} reveal`}>
          <div className="eyebrow">{aside.eyebrow}</div>
          <div className="rule" />
          <h1 style={{ fontSize: "clamp(34px,4.4vw,64px)" }} dangerouslySetInnerHTML={{ __html: aside.headingHtml ?? "" }} />
          {aside.ledeParas.map((p, i) => (
            <p className="lede" style={{ marginTop: i === 0 ? 18 : 16 }} key={i}>
              {p}
            </p>
          ))}
          <div className={styles.freeBadge}>{aside.freeBadge}</div>
        </div>

        <div className={`${styles.invCard} reveal d2`}>
          <h3>{card.heading}</h3>
          <p className="muted" style={{ fontSize: 14, marginBottom: 6 }}>
            {card.muted}
          </p>
          <ol className={styles.invSteps}>
            {card.steps.map((s, i) => (
              <li key={i}>
                <span className="n">{s.n}</span>
                <span className="t" dangerouslySetInnerHTML={{ __html: s.html ?? "" }} />
              </li>
            ))}
          </ol>
          <div className={styles.invCta}>
            <Link className="btn btn-gold" to={toRoute(card.cta.href)}>
              {card.cta.label}
            </Link>
          </div>
          <p className={styles.invFoot}>{card.foot}</p>
        </div>
      </div>
    </section>
  );
}
