// Shape produced by tools/extract_how_we_work_page.py from how-we-work.html.
import type { PhoneData } from "./iphone-mock";

export interface HowWeWorkPageData {
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
  why: { eyebrow: string | null; note: string | null; statementHtml: string | null; lede: string | null };
  lifecycle: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: { nn: string | null; phase: string | null; heading: string | null; body: string | null; did: (string | null)[] }[];
  };
  whatsapp: {
    eyebrow: string | null;
    headingHtml: string | null;
    ledes: (string | null)[];
    ctaLabel: string | null;
    ctaHref: string;
    phone: PhoneData;
  };
  pq: string | null;
  save: { eyebrow: string | null; headingHtml: string | null; ledes: (string | null)[]; phone: PhoneData };
  principles: { eyebrow: string | null; heading: string | null; items: { heading: string | null; body: string | null }[] };
  sig: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  cta: { heading: string | null; lede: string | null; buttons: { label: string | null; href: string }[] };
}
