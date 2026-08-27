// Shape produced by tools/extract_how_it_works_page.py from how-it-works.html.
import type { PhoneData } from "./iphone-mock";

export interface HowItWorksPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaLabel: string | null;
    ctaHref: string;
    jumpLabel: string | null;
    jumpHref: string;
    inset: { image: string | null; kicker: string | null; caption: string | null };
  };
  model: { eyebrow: string | null; note: string | null; statementHtml: string | null; lede: string | null };
  steps: { eyebrow: string | null; heading: string | null; items: { nn: string | null; heading: string | null; body: string | null }[] };
  journey: {
    eyebrow: string | null;
    liveLabel: string | null;
    headingHtml: string | null;
    ledes: (string | null)[];
    ctaLabel: string | null;
    ctaHref: string;
    phone: PhoneData;
  };
  pq: string | null;
  rescue: { eyebrow: string | null; headingHtml: string | null; ledes: (string | null)[]; phone: PhoneData };
  sig: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  cta: { heading: string | null; buttons: { label: string | null; href: string }[] };
}
