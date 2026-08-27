// Shape produced by tools/extract_cabin_guide_page.py from cabin-guide.html.

export interface CabinGuidePageData {
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
  glossary: {
    eyebrow: string | null;
    heading: string | null;
    id: string;
    cards: { term: string | null; heading: string | null; bodyHtml: string | null }[];
  };
  vrow: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
    imageAlt: string | null;
  };
  signature: { by: string | null; pullHtml: string | null; image: string | null };
  traps: { eyebrow: string | null; heading: string | null; items: { bodyHtml: string | null }[] };
  ask: { eyebrow: string | null; text: string | null };
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
