import { Link } from "react-router-dom";

// Extracted verbatim from index.html's <footer class="footer"> — same
// content, same classes. "REPLACE_NUMBER" and the placeholder legal address
// are copied as-is from the live site (see GAPS.md items A1/A2); not fixed
// here, since this is a structural port, not a content pass.
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div>
          <div className="brand">
            <svg className="mk" width="24" height="24" viewBox="0 0 420 420" fill="none">
              <g strokeWidth={26} strokeLinecap="round" strokeLinejoin="round">
                <path d="M140,150 L280,150" />
                <path d="M210,150 L210,212" />
                <path d="M140,300 L210,212 L280,300" />
                <path d="M174,256 L246,256" />
              </g>
            </svg>{" "}
            TripAgent
          </div>
          <div className="tagline">Until you are home.</div>
          <p style={{ fontSize: 13, maxWidth: "30ch" }}>
            A private travel maison by Tripsure. Flights, hotels and visas — handled, completely.
          </p>
        </div>
        <div>
          <p className="fcol">Explore</p>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/how-we-work">Your advisor</Link>
          <Link to="/when-to-go">When to go</Link>
          <Link to="/services">What we handle</Link>
          <Link to="/destinations">Destinations</Link>
          <Link to="/cities">Cities</Link>
          <Link to="/journeys">Journeys</Link>
          <Link to="/membership">Membership</Link>
          <Link to="/portal">Member portal</Link>
          <Link to="/protection">Protection</Link>
          <Link to="/about">About</Link>
          <Link to="/journal">Journal</Link>
          <Link to="/help">Help</Link>
        </div>
        <div>
          <p className="fcol">Services</p>
          <Link to="/flights">Flights</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/visas">Visas</Link>
          <Link to="/visa-guides">Visa guides</Link>
          <Link to="/flight-guides">Flight guides</Link>
          <Link to="/stay-guides">Stay guides</Link>
          <Link to="/points">Points &amp; payments</Link>
          <Link to="/offers">Offers</Link>
        </div>
        <div>
          <p className="fcol">Get started</p>
          <Link to="/invitation">By invitation</Link>
          <a href="https://wa.me/REPLACE_NUMBER">Speak with your advisor</a>
          <a href="mailto:maison@tripsure.com">maison@tripsure.com</a>
          <Link to="/trip">Build a trip</Link>
          <Link to="/enquire">Plan a trip</Link>
          <Link to="/careers">Careers</Link>
        </div>
        <div>
          <p className="fcol">Legal</p>
          <Link to="/terms">Terms</Link>
          <Link to="/privacy">Privacy</Link>
          <Link to="/refund">Refund of fees</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="legal">
          <span>© 2026 TripAgent · Tripsure · 44 Kingfisher Towers, Bangalore 560 001</span>
          <span>We stay.</span>
        </div>
      </div>
    </footer>
  );
}
