import { useEffect } from "react";
import { Link } from "react-router-dom";
import conciergeData from "../data/concierge-page.generated.json";
import type { ConciergePageData } from "../types/concierge-page";
import { useNavVariant } from "../lib/navVariant";
import styles from "./concierge-page.module.css";

const data = conciergeData as unknown as ConciergePageData;

// concierge.html's #concierge-chat-root is self-mounted at runtime by a
// separate React app (concierge-chat/) — Aanya, a real AI concierge with
// tool-calling and a live draft-then-confirm booking flow against a
// backend. Deferred per CLAUDE.md; this is a static placeholder that keeps
// the CONVERT path alive (routes to /enquire), same pattern as TripPage.
export default function ConciergePage() {
  useNavVariant("solid");

  useEffect(() => {
    if (data.seo.title) document.title = data.seo.title;
  }, []);

  return (
    <div className={styles.ccWrap}>
      <div className={styles.ccPanel}>
        <div className="eyebrow">The Concierge</div>
        <h1>Aanya is on her way.</h1>
        <p>Our AI concierge isn't quite live yet. In the meantime, tell your advisor what you're dreaming of and they'll help you decide where and when — flights, hotels and visas, all of it.</p>
        <Link className="btn btn-gold" to="/enquire">
          Talk to your advisor
        </Link>
      </div>
    </div>
  );
}
