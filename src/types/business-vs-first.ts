// Shape produced by tools/extract_business_vs_first_page.py from business-vs-first.html.

export interface VRowSection {
  eyebrow: string | null;
  heading: string | null;
  ledes: (string | null)[];
  image: string | null;
  imageAlt: string | null;
  flipped: boolean;
}

export interface BusinessVsFirstPageData {
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
  compare: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cols: { tag: string | null; heading: string | null; items: (string | null)[] }[];
  };
  decide: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: { bodyHtml: string | null }[];
    id: string;
  };
  firstWins: VRowSection;
  signature: { by: string | null; pullHtml: string | null; image: string | null };
  businessWins: VRowSection;
  ask: { eyebrow: string | null; text: string | null };
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
