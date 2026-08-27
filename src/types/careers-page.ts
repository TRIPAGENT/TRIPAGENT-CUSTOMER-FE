// Shape produced by tools/extract_careers_page.py from careers.html.

export interface CareersPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    cta: { label: string | null; href: string };
  };
  model: { eyebrow: string | null; heading: string | null; ledes: (string | null)[]; image: string | null };
  hire: {
    eyebrow: string | null;
    heading: string | null;
    feats: { label: string | null; heading: string | null; body: string | null }[];
  };
  role: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  ai: { eyebrow: string | null; heading: string | null; lede: string | null; image: string | null };
  steps: { items: { n: string | null; heading: string | null; body: string | null }[] };
  why: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  close: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
