import { useEffect, useRef, useState } from "react";
import enquireData from "../data/enquire.generated.json";
import type { EnquirePageData } from "../types/enquire";
import { useScrollReveal } from "../lib/useScrollReveal";
import { useNavVariant } from "../lib/navVariant";
import styles from "./enquire-page.module.css";

const data = enquireData as unknown as EnquirePageData;

// The real enquire.html form submits leads live via TA_API.post('site-lead',
// ...) to the Supabase backend, and #ta-intent is populated by a separate
// js/intent.js quick-open flow. Per the shell-only-defer-logic decision,
// this ports the aside copy and form markup faithfully but does not wire
// submission to the real backend (money/lead-wiring needs Amit's named OK,
// per CLAUDE.md) — submitting shows a deferred note pointing at the
// existing "Email your advisor" mailto CTA, which is a real, working link.
export default function EnquirePage() {
  useNavVariant("solid");
  const [notLive, setNotLive] = useState(false);
  const thanksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  useScrollReveal([]);

  useEffect(() => {
    if (!notLive) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    try {
      thanksRef.current?.focus({ preventScroll: true });
    } catch {
      // no-op
    }
  }, [notLive]);

  const { aside, form } = data;

  return (
    <>
      <section id="ta-intent" aria-label="Open a trip you've already decided on" />

      <section>
        <div className={`wrap ${styles.enqWrap}`}>
          <div className={`${styles.enqAside} reveal`}>
            <div className="eyebrow">{aside.eyebrow}</div>
            <div className="rule" />
            <h1
              style={{ fontFamily: "var(--logo)", fontWeight: 500, fontSize: "clamp(38px,5vw,72px)", lineHeight: 1.04 }}
              dangerouslySetInnerHTML={{ __html: aside.headingHtml ?? "" }}
            />
            <p className="lede" style={{ marginTop: 20 }}>
              {aside.lede}
            </p>
            <ul className="incl" style={{ marginTop: 28 }}>
              {aside.incl.map((line, i) => (
                <li key={i}>
                  <span className="ck">✦</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal d2">
            <div className={`${styles.form}${notLive ? ` ${styles.sent}` : ""}`} id="enquireForm">
              <div className={styles.formBody}>
                <h3 style={{ fontSize: 26, marginBottom: 4 }}>{form.heading}</h3>
                <p className="muted" style={{ fontSize: 14, marginBottom: 22 }}>
                  {form.muted}
                </p>
                <form
                  id="leadForm"
                  noValidate
                  onSubmit={(e) => {
                    e.preventDefault();
                    setNotLive(true);
                  }}
                >
                  {form.fields.map((f) => (
                    <div className="field" key={f.id}>
                      <label htmlFor={f.id ?? undefined} dangerouslySetInnerHTML={{ __html: f.labelHtml ?? "" }} />
                      {f.tag === "select" ? (
                        <select id={f.id ?? undefined} name={f.name ?? undefined}>
                          {f.options?.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      ) : f.tag === "textarea" ? (
                        <textarea id={f.id ?? undefined} name={f.name ?? undefined} rows={3} placeholder={f.placeholder ?? undefined} />
                      ) : (
                        <input
                          id={f.id ?? undefined}
                          type={f.type ?? "text"}
                          name={f.name ?? undefined}
                          required={f.required}
                          placeholder={f.placeholder ?? undefined}
                        />
                      )}
                    </div>
                  ))}
                  <div className={styles.trust} style={{ margin: "2px 0 14px" }}>
                    {form.trust}
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ width: "100%", justifyContent: "center" }}>
                    {form.submitLabel}
                  </button>
                </form>
                <div style={{ textAlign: "center", marginTop: 20, paddingTop: 18, borderTop: "1px solid var(--line-soft)" }}>
                  <p className="muted" style={{ fontSize: 13, marginBottom: 12 }}>
                    {form.emailPrompt}
                  </p>
                  <a className="btn btn-ghost" href={form.emailCta.href} style={{ width: "100%", justifyContent: "center" }}>
                    {form.emailCta.label}
                  </a>
                </div>
              </div>
              <div className={`${styles.thanks}${notLive ? ` ${styles.show}` : ""}`} role="status" aria-live="polite" tabIndex={-1} ref={thanksRef}>
                <svg width={54} height={54} viewBox="0 0 420 420" fill="none" style={{ margin: "0 auto 18px" }}>
                  <g stroke="#785C12" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M140,150 L280,150" />
                    <path d="M210,150 L210,212" />
                    <path d="M140,300 L210,212 L280,300" />
                    <path d="M174,256 L246,256" />
                  </g>
                </svg>
                <h3 style={{ fontSize: 30 }}>Not quite live yet.</h3>
                <p className="lede" style={{ margin: "12px auto 8px", maxWidth: "40ch" }}>
                  Enquiry submission is on its way. For now, please write to your advisor directly and they'll pick it up right away.
                </p>
                <a className="btn btn-gold" href={form.emailCta.href}>
                  {form.emailCta.label}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
