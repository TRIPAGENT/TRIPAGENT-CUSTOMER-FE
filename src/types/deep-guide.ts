// Shape produced by tools/extract_deep_guide_pages.py from suites-worth-it.html,
// the-right-room.html, hotel-programmes.html.

export interface DeepGuidePageData {
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
  };
  intro: { eyebrow: string | null; note: string | null; statement: string | null; lede: string | null };
  idx: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: { bodyHtml: string | null }[];
  };
  signature: { by: string | null; pullHtml: string | null; image: string | null };
  vrow: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  line: { eyebrow: string | null; text: string | null };
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
