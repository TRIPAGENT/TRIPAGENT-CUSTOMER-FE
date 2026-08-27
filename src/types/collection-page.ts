// Shape produced by tools/extract_collection_pages.py from family-travel.html,
// honeymoon.html, milestone-trips.html.

export interface CollectionPageData {
  slug: string;
  seo: { title: string | null; description: string | null };
  hero: {
    back: { label: string | null; href: string };
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaGold: { label: string | null; href: string };
    ctaText: { label: string | null; href: string };
    metaK: string | null;
    metaT: string | null;
  };
  intro: { eyebrow: string | null; note: string | null; statement: string | null; lede: string | null };
  pullQuote: string | null;
  flights: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: { bodyHtml: string | null }[];
  };
  stays: {
    eyebrow: string | null;
    heading: string | null;
    id: string;
    image: string | null;
    imageAlt: string | null;
    cards: { place: string | null; heading: string | null; body: string | null }[];
  };
  signature: { by: string | null; pullHtml: string | null; image: string | null };
  visa: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
    imageAlt: string | null;
  };
  when: { eyebrow: string | null; text: string | null };
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
