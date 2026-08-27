import { useEffect } from "react";
import { Link } from "react-router-dom";
import notFoundData from "../data/notfound.generated.json";
import type { NotFoundData } from "../types/notfound";
import { useScrollReveal } from "../lib/useScrollReveal";
import { useNavVariant } from "../lib/navVariant";
import { toRoute } from "../lib/toRoute";
import styles from "./notfound-page.module.css";

const data = notFoundData as unknown as NotFoundData;

export default function NotFoundPage() {
  useNavVariant("solid");

  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  return (
    <section className={`band center ${styles.nf}`}>
      <div className="wrap">
        <svg className={styles.mk404} width={44} height={44} viewBox="0 0 420 420" fill="none">
          <g stroke="var(--accent-2)" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round">
            <path d="M140,150 L280,150" />
            <path d="M210,150 L210,212" />
            <path d="M140,300 L210,212 L280,300" />
            <path d="M174,256 L246,256" />
          </g>
        </svg>
        <div className="eyebrow">{data.eyebrow}</div>
        <div className="rule center" />
        <h1 dangerouslySetInnerHTML={{ __html: data.headingHtml ?? "" }} />
        <p className={styles.line}>{data.line}</p>
        <div className={styles.links}>
          {data.links.map((l, i) => (
            <Link to={toRoute(l.href)} key={i}>
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
