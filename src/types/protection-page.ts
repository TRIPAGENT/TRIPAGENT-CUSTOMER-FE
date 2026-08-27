// Shape produced by tools/extract_protection_page.py from protection.html.

export interface ProtectionPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaGold: { label: string | null; href: string };
    ctaText: { label: string | null; href: string };
  };
  intro: { headingHtml: string | null; lede: string | null };
  promises: {
    eyebrow: string | null;
    heading: string | null;
    items: { n: string | null; heading: string | null; body: string | null }[];
  };
  matters: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  pq: string | null;
  money: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  signature: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  steps: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cta: { label: string | null; href: string };
    items: { n: string | null; heading: string | null; body: string | null }[];
  };
  faq: {
    eyebrow: string | null;
    heading: string | null;
    items: { question: string | null; answerHtml: string | null }[];
  };
  cta: { heading: string | null; buttons: { label: string | null; href: string }[] };
}
