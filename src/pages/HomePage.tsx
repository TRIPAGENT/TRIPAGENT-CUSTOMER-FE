import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import homepageData from "../data/homepage.generated.json";
import type { HomepageData } from "../types/homepage";
import { useScrollReveal } from "../lib/useScrollReveal";
import { toRoute } from "../lib/toRoute";
import HeroCarousel from "../components/HeroCarousel";
import DestinationPlanner from "../components/DestinationPlanner";
import ConciergeChatDemo from "../components/ConciergeChatDemo";
import styles from "./home-page.module.css";

const data = homepageData as unknown as HomepageData;

// Same real/fallback wa.me pattern as Footer.tsx (VITE_WHATSAPP_NUMBER unset
// today -> /enquire, a real working page, instead of the dead
// wa.me/REPLACE_NUMBER placeholder the source hardcodes here too).
const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER as string | undefined;
const ADVISOR_HREF = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "/enquire";

function titleCase(s: string) {
  return s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function readJSON(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Count-up stat — ported from ta-engage.js's countUp(), one IntersectionObserver
// per number so each animates only once, the moment it scrolls into view.
function StatCountUp({ count, suffix }: { count: string; suffix: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const target = parseInt(count, 10);
  // Rendered up front (same progressive-enhancement fallback as the source's
  // static "3,00,000+" seed text) so the number never sits blank — before
  // the effect runs, and permanently if IntersectionObserver isn't supported.
  const finalText = target.toLocaleString("en-IN") + suffix;

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    let done = false;
    function step(ts: number, t0: number) {
      const p = Math.min((ts - t0) / 1500, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      if (el) el.textContent = Math.round(target * eased).toLocaleString("en-IN") + (p === 1 ? suffix : "");
      if (p < 1) requestAnimationFrame((next) => step(next, t0));
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !done) {
            done = true;
            requestAnimationFrame((t0) => step(t0, t0));
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [count, suffix]);

  return (
    <div className="v stat-num" ref={ref}>
      {finalText}
    </div>
  );
}

export default function HomePage() {
  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);
  useScrollReveal([]);

  const { discover, decide, planner, problem, way, services, stats, shift, howItWorks, trips, membership, signature, who, testimonials, finalCta } = data;

  // ---------------- Discover: "Continue planning" rail ----------------
  // Read-only from localStorage, exactly like index.html's own script —
  // degrades to nothing until something else in the app writes ta_saved /
  // ta_trip (nothing does yet), same as a first-time visitor on the real site.
  const [continueChips, setContinueChips] = useState<string[]>([]);
  useEffect(() => {
    try {
      const chips: string[] = [];
      const seen = new Set<string>();
      const trip = readJSON("ta_trip") as { city?: unknown; slug?: unknown; cities?: unknown } | null;
      if (trip) {
        const tcity = trip.city ?? trip.slug ?? (Array.isArray(trip.cities) ? trip.cities[0] : undefined);
        if (typeof tcity === "string") {
          chips.push(tcity);
          seen.add(tcity);
        }
      }
      const saved = readJSON("ta_saved");
      if (Array.isArray(saved)) {
        for (let i = saved.length - 1; i >= 0 && chips.length < 5; i--) {
          const s = saved[i];
          if (typeof s === "string" && !seen.has(s)) {
            chips.push(s);
            seen.add(s);
          }
        }
      }
      setContinueChips(chips.slice(0, 5));
    } catch {
      // silent — rail simply stays hidden
    }
  }, []);

  // ---------------- Signature moment: the scroll-drawn line ----------------
  const lhTrackRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const track = lhTrackRef.current;
    if (!track) return;
    const nodeEls = Array.from(track.querySelectorAll<HTMLElement>("[data-at]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 820px)").matches;
    track.classList.add("drawn");
    function draw() {
      track!.style.setProperty("--draw-a", "1");
      setTimeout(() => track!.style.setProperty("--draw-b", "1"), reduce ? 0 : 650);
      nodeEls.forEach((n, i) => setTimeout(() => n.classList.add("lit"), reduce ? 0 : 260 + i * 240));
    }
    if (reduce || mobile) {
      draw();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            draw();
            io.disconnect();
          }
        });
      },
      { threshold: 0.5, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

  return (
    <main>
      <HeroCarousel slides={data.hero.slides} />

      {/* DISCOVER — the first interaction */}
      <section className={`band tight ${styles.disc}`} aria-label="Where shall we take you?">
        <div className="wrap">
          <div className={`${styles.discHead} reveal`}>
            <div className="eyebrow">{discover.eyebrow}</div>
            <div className="rule" />
            <h2 dangerouslySetInnerHTML={{ __html: discover.headingHtml ?? "" }} />
            <p className={`${styles.discSub} reveal`}>{discover.sub}</p>
          </div>

          {/* index.html's own search affordance opens a site-wide ⌘K palette
              (js/site.js) that isn't ported into this app — routes to the
              real (if shell-only) /search page instead of a dead trigger. */}
          <Link className={`${styles.discSearch} reveal d1`} to="/search" aria-label="Search a place, a hotel, or a city">
            <svg className={styles.dsIc} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <circle cx="11" cy="11" r="7" />
              <line x1="20.5" y1="20.5" x2="16.5" y2="16.5" />
            </svg>
            <span className={styles.dsLabel} dangerouslySetInnerHTML={{ __html: discover.searchLabelHtml ?? "" }} />
          </Link>

          <div className={`${styles.discPaths} reveal d1`}>
            <Link className={styles.discRec} to={toRoute(discover.recommenderHref)}>
              <span className={styles.drLead}>{discover.recommenderLead}</span>{" "}
              <span dangerouslySetInnerHTML={{ __html: discover.recommenderRestHtml ?? "" }} />
            </Link>
            <Link className={styles.discBrowse} to={toRoute(discover.browseHref)}>
              {discover.browseLabel}
            </Link>
          </div>

          {continueChips.length > 0 && (
            <div className={`${styles.discCont} reveal`}>
              <div className={styles.dcK}>Continue planning</div>
              <div className={styles.dcRail}>
                {continueChips.map((slug) => (
                  <Link className={styles.dcChip} to={`/city-${encodeURIComponent(slug)}`} key={slug}>
                    {titleCase(slug)}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* DECIDE — three more ways to decide */}
      <section className="band tight" style={{ background: "var(--bone)" }}>
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: "52ch" }}>
            <div className="eyebrow">{decide.eyebrow}</div>
            <div className="rule" />
            <h2 style={{ fontSize: "clamp(30px,4vw,54px)" }} dangerouslySetInnerHTML={{ __html: decide.headingHtml ?? "" }} />
            <p className="lede" style={{ marginTop: 16 }}>
              {decide.lede}
            </p>
          </div>
          <div className={`${styles.decGrid} reveal d1`}>
            {decide.cards.map((card, i) => (
              <Link className={styles.decCard} to={toRoute(card.href)} key={i}>
                <div className={styles.dn}>{card.kicker}</div>
                <h3>{card.heading}</h3>
                <p>{card.body}</p>
                <span className={styles.go}>{card.goLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <DestinationPlanner planner={planner} />

      {/* PROBLEM — editorial, asymmetric */}
      <section className="band editorial">
        <div className="wrap ed-grid">
          <div className="ed-meta reveal">
            <div className="eyebrow">{problem.eyebrow}</div>
            <p className="ed-note">{problem.note}</p>
          </div>
          <div className="ed-main reveal d1">
            <h2 className="ed-statement" dangerouslySetInnerHTML={{ __html: problem.statementHtml ?? "" }} />
            <p className="lede" style={{ marginTop: 30 }}>
              {problem.lede}
            </p>
          </div>
        </div>
      </section>

      {/* THE WAY */}
      <section className="band tight" style={{ background: "var(--bone)" }}>
        <div className="wrap grid-2">
          <div className="reveal">
            <div className="ph-portrait" style={{ backgroundImage: `url('${way.portraitImage}')` }} role="img" aria-label="A member at ease abroad, everything looked after" />
          </div>
          <div className="reveal d2">
            <div className="eyebrow">{way.eyebrow}</div>
            <div className="rule" />
            <h2 style={{ fontSize: "clamp(30px,3.6vw,52px)" }} dangerouslySetInnerHTML={{ __html: way.headingHtml ?? "" }} />
            <p className="lede" style={{ marginTop: 18 }}>
              {way.lede}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 2, marginTop: 24 }}>
              {way.features.map((f, i) => (
                <div className="feat" key={i}>
                  <div className="n">{f.kicker}</div>
                  <h3>{f.heading}</h3>
                  <p>{f.body}</p>
                </div>
              ))}
            </div>
            <div className="btn-row" style={{ marginTop: 26 }}>
              <Link className="btn btn-ghost" to={toRoute(way.ctaHref)}>
                {way.ctaLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="band">
        <div className="wrap">
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "24px 40px", marginBottom: 50 }}>
            <div style={{ maxWidth: "34ch" }}>
              <div className="eyebrow">{services.eyebrow}</div>
              <div className="rule" />
              <h2 style={{ maxWidth: "18ch" }} dangerouslySetInnerHTML={{ __html: services.headingHtml ?? "" }} />
              <p className="lede" style={{ marginTop: 18, maxWidth: "42ch" }}>
                {services.lede}
              </p>
            </div>
            <Link className="cta" to={toRoute(services.allHref)} style={{ whiteSpace: "nowrap", paddingBottom: 6 }}>
              {services.allLabel}
            </Link>
          </div>
          <div className="grid-3" style={{ textAlign: "left" }}>
            {services.cards.map((card, i) => (
              <div className={`svc reveal d${i + 1}`} key={i}>
                <div className="pic" style={{ backgroundImage: `url('${card.image}')` }} />
                <div className="n">{card.number}</div>
                <h3>{card.heading}</h3>
                <p>{card.body}</p>
                <Link className="cta" to={toRoute(card.ctaHref)} style={{ margin: "2px 26px 26px", display: "inline-block" }}>
                  {card.ctaLabel}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="band-dark band center" style={{ backgroundImage: `var(--scrim),url('${stats.backgroundImage}')` }}>
        <div className="wrap">
          <div className="eyebrow on-dark reveal">{stats.eyebrow}</div>
          <div className="rule center reveal d1" />
          <h2 className="reveal d1" style={{ maxWidth: "22ch", margin: "0 auto 56px" }} dangerouslySetInnerHTML={{ __html: stats.headingHtml ?? "" }} />
          <div className="stat-grid scale reveal d2">
            {stats.items.map((item, i) =>
              item.isCountUp && item.count ? (
                <div key={i}>
                  <StatCountUp count={item.count} suffix={item.suffix ?? ""} />
                  <div className="k">{item.label}</div>
                </div>
              ) : (
                <div key={i}>
                  <div className="v">{item.staticValue}</div>
                  <div className="k">{item.label}</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* THE SHIFT */}
      <section className="band center">
        <div className="wrap">
          <div className="eyebrow reveal">{shift.eyebrow}</div>
          <div className="rule center reveal d1" />
          <h2 className="reveal d1" style={{ maxWidth: "24ch", margin: "0 auto 16px" }} dangerouslySetInnerHTML={{ __html: shift.headingHtml ?? "" }} />
          <p className="lede reveal d2" style={{ margin: "0 auto 50px" }}>
            {shift.lede}
          </p>
          <div className="stat-grid three reveal d2">
            {shift.items.map((item, i) => (
              <div key={i}>
                <div className="v">{item.value}</div>
                <div className="k">
                  {item.labelHtml}
                  <span className="src">{item.source}</span>
                </div>
              </div>
            ))}
          </div>
          <div className="btn-row center reveal d3" style={{ marginTop: 44 }}>
            <Link className="btn btn-ghost" to={toRoute(shift.ctaHref)}>
              {shift.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (phone mock + live chat demo) */}
      <section className="band tight" style={{ background: "var(--bone)" }}>
        <div className="wrap grid-2">
          <div className="reveal" style={{ display: "flex", justifyContent: "center" }}>
            <ConciergeChatDemo chips={howItWorks.scenarioChips} scenarios={howItWorks.scenarios} tryLabel={howItWorks.tryLabel} />
          </div>
          <div className="reveal d2">
            <div className="eyebrow">
              <span className="demo-live">{howItWorks.liveLabel}</span>
            </div>
            <h2 style={{ fontSize: "clamp(30px,3.6vw,52px)", marginTop: 14 }} dangerouslySetInnerHTML={{ __html: howItWorks.headingHtml ?? "" }} />
            <p className="lede" style={{ marginTop: 14 }}>
              {howItWorks.lede}
            </p>
            <div className="steps" style={{ marginTop: 30 }}>
              {howItWorks.steps.map((s, i) => (
                <div className="step" key={i}>
                  <div className="si">{s.number}</div>
                  <div>
                    <h4>{s.heading}</h4>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRIPS GALLERY */}
      <section className="band tight">
        <div className="wrap">
          <div className="reveal" style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "14px 40px" }}>
            <div>
              <div className="eyebrow">{trips.eyebrow}</div>
              <h2 style={{ marginTop: 14 }}>{trips.heading}</h2>
            </div>
            <Link className="cta" to={toRoute(trips.allHref)} style={{ whiteSpace: "nowrap", paddingBottom: 6 }}>
              {trips.allLabel}
            </Link>
          </div>
          <p className="trips-hint reveal d1">{trips.hint}</p>
        </div>
        <div style={{ paddingLeft: "var(--gutter)" }}>
          <div className="trips-row reveal d2">
            {trips.items.map((t, i) => (
              <div className="trip" style={{ backgroundImage: `url('${t.image}')` }} key={i}>
                <div className="cap">
                  <div className="pl">{t.place}</div>
                  <div className="d">{t.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="band center" id="membership">
        <div className="wrap">
          <div className="eyebrow reveal">{membership.eyebrow}</div>
          <div className="rule center reveal d1" />
          <h2 className="reveal d1" style={{ maxWidth: "16ch", margin: "0 auto 40px" }} dangerouslySetInnerHTML={{ __html: membership.headingHtml ?? "" }} />
          <div className="price-card reveal d2">
            <div className="tier">{membership.tier}</div>
            <div className="amt" style={{ fontFamily: "var(--logo)", fontStyle: "italic", fontWeight: 500 }} dangerouslySetInnerHTML={{ __html: membership.amountHtml ?? "" }} />
            <div className="free">{membership.free}</div>
            <ul className="incl">
              {membership.included.map((item, i) => (
                <li key={i}>
                  <span className="ck">✦</span>
                  <span dangerouslySetInnerHTML={{ __html: item }} />
                </li>
              ))}
            </ul>
            <div className="btn-row center" style={{ marginTop: 34 }}>
              <Link className="btn btn-gold" to={toRoute(membership.ctaPrimary.href)}>
                {membership.ctaPrimary.label}
              </Link>
              <Link className="btn btn-ghost" to={toRoute(membership.ctaSecondary.href)}>
                {membership.ctaSecondary.label}
              </Link>
            </div>
            <p className="muted" style={{ fontSize: 13, marginTop: 16 }}>
              {membership.note}
            </p>
          </div>
        </div>
      </section>

      {/* SIGNATURE MOMENT — the line that doesn't stop */}
      <section className="band line-home">
        <div className="wrap">
          <div className="lh-head">
            <div className="eyebrow reveal">{signature.eyebrow}</div>
            <h2 className="lh-title reveal d1" dangerouslySetInnerHTML={{ __html: signature.titleHtml ?? "" }} />
          </div>
          <div className="lh-track" ref={lhTrackRef}>
            <svg className="lh-svg" viewBox="0 0 1200 240" fill="none" preserveAspectRatio="none" aria-hidden="true">
              <path className="lh-path lh-a" d="M90,60 L500,60" pathLength={1} />
              <path className="lh-path lh-b" d="M500,60 L1080,60" pathLength={1} />
            </svg>
            {signature.nodes.map((node, i) => {
              if (node.kind === "gate") {
                return (
                  <div className="lh-gate" data-at={node.at ?? undefined} style={{ left: node.left ?? undefined }} key={i}>
                    <span className="gline" />
                    <span className="glab">{node.label}</span>
                  </div>
                );
              }
              if (node.kind === "seal") {
                return (
                  <div className={`lh-seal${node.on ? " on" : ""}`} data-at={node.at ?? undefined} style={{ left: node.left ?? undefined }} key={i}>
                    <span className="seal-ring">
                      <svg width="30" height="30" viewBox="0 0 420 420" fill="none">
                        <g strokeWidth={30} strokeLinecap="round" strokeLinejoin="round">
                          <path d="M140,150 L280,150" />
                          <path d="M210,150 L210,212" />
                          <path d="M140,300 L210,212 L280,300" />
                          <path d="M174,256 L246,256" />
                        </g>
                      </svg>
                    </span>
                    <div className="lab">
                      <b>{node.label}</b>
                      <i>{node.sublabel}</i>
                    </div>
                  </div>
                );
              }
              return (
                <div className={`lh-node${node.on ? " on" : ""}`} data-at={node.at ?? undefined} style={{ left: node.left ?? undefined }} key={i}>
                  <span className="dot" />
                  <div className="lab">
                    <b>{node.label}</b>
                    <i>{node.sublabel}</i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="band" style={{ background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: 980 }}>
          <div className="eyebrow reveal">{who.eyebrow}</div>
          <div className="rule reveal d1" />
          <h2 className="quote reveal d1" style={{ margin: 0 }}>
            {who.quote}
          </h2>
          <p className="lede reveal d2" style={{ margin: "28px 0 0", maxWidth: "52ch" }}>
            {who.lede}
          </p>
          <div className="btn-row reveal d3" style={{ marginTop: 30 }}>
            <Link className="btn btn-ghost" to={toRoute(who.ctaHref)}>
              {who.ctaLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — source marks this copy as placeholder pending real
          member quotes before launch (testimonials.placeholder === true in
          homepage.generated.json); same "known placeholder, not a content
          pass" treatment as Footer.tsx's legal address. */}
      <section className="band center">
        <div className="wrap">
          <div className="eyebrow reveal">{testimonials.eyebrow}</div>
          <div className="rule center reveal d1" />
          <h2 className="reveal d1" style={{ margin: "0 auto 50px" }}>
            {testimonials.heading}
          </h2>
          <div className="quote-grid">
            {testimonials.quotes.map((q, i) => (
              <figure className={`tq reveal d${i + 1}`} key={i}>
                <blockquote>{q.quote}</blockquote>
                <figcaption>{q.attribution}</figcaption>
              </figure>
            ))}
          </div>
          <p className="muted reveal d3" style={{ fontSize: 12, marginTop: 34, letterSpacing: "0.04em" }}>
            {testimonials.footnote}
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="band-dark band center" style={{ backgroundImage: "var(--scrim),url('/_vercel/image?url=%2Fimg%2Fsantorini.jpg%3Fv%3D2&w=2048&q=80')" }}>
        <div className="wrap">
          <svg width="50" height="50" viewBox="0 0 420 420" fill="none" className="reveal" style={{ margin: "0 auto 24px" }}>
            <g stroke="#F6F1E6" strokeWidth={22} strokeLinecap="round" strokeLinejoin="round">
              <path d="M140,150 L280,150" />
              <path d="M210,150 L210,212" />
              <path d="M140,300 L210,212 L280,300" />
              <path d="M174,256 L246,256" />
            </g>
          </svg>
          <h2 className="reveal d1" style={{ fontSize: "clamp(34px,5vw,72px)" }} dangerouslySetInnerHTML={{ __html: finalCta.headingHtml ?? "" }} />
          <p className="lede on-dark reveal d2" style={{ margin: "18px auto 30px" }}>
            {finalCta.lede}
          </p>
          <div className="btn-row center reveal d3">
            <Link className="btn btn-gold on-dark" to={toRoute(finalCta.primaryHref)}>
              {finalCta.primaryLabel}
            </Link>
            {WHATSAPP_NUMBER ? (
              <a className="btn btn-ghost on-dark" href={ADVISOR_HREF} target="_blank" rel="noopener noreferrer">
                {finalCta.secondaryLabel}
              </a>
            ) : (
              <Link className="btn btn-ghost on-dark" to={ADVISOR_HREF}>
                {finalCta.secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
