import { Link } from "react-router-dom";
import { useAuth } from "../../lib/auth";
import { useNavVariantValue } from "../../lib/navVariant";

// Extracted verbatim (same markup/classes) from index.html's <nav class="nav"
// data-nav> so css/site.css applies with zero changes — see main.tsx for how
// that stylesheet is imported. The mobile nav-toggle's open/close behavior
// currently lives in js/shell.js on the static site; this component doesn't
// reimplement it yet (nothing in Phase 1 exercises it — the placeholder
// pages don't need a working mobile menu to prove routing/auth/layout).
export function Header() {
  const { signedIn } = useAuth();
  const navVariant = useNavVariantValue();

  return (
    <nav className={`nav${navVariant ? " " + navVariant : ""}`} data-nav>
      <Link className="brand" to="/">
        <svg className="mk" width="26" height="26" viewBox="0 0 420 420" fill="none">
          <g strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
            <path d="M140,150 L280,150" />
            <path d="M210,150 L210,212" />
            <path d="M140,300 L210,212 L280,300" />
            <path d="M174,256 L246,256" />
          </g>
        </svg>
        TripAgent
      </Link>
      <div className="nav-links">
        <Link to="/destinations">Destinations</Link>
        <Link to="/journeys">Journeys</Link>
        <Link to="/services">What we handle</Link>
        <Link to="/journal">The Journal</Link>
        <Link to="/membership">Membership</Link>
        <Link to="/trip">Build a trip</Link>
        <Link className="btn btn-gold nav-cta" to="/invitation">
          By invitation
        </Link>
        <Link className="ta-acct" to={signedIn ? "/portal" : "#"}>
          {signedIn ? (
            <>
              <span className="ta-acct-dot" />
              My year
            </>
          ) : (
            "Sign in"
          )}
        </Link>
      </div>
      <button type="button" className="nav-toggle" aria-label="Menu">
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
