// Shape produced by tools/extract_about_page.py from about.html.

export interface AboutPageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  pullQuote: { quoteHtml: string | null; cite: string | null };
  belief: {
    eyebrow: string | null;
    headingHtml: string | null;
    ledes: (string | null)[];
    image: string | null;
    imageAlt: string | null;
  };
  lineage: {
    eyebrow: string | null;
    headingHtml: string | null;
    ledes: (string | null)[];
    items: (string | null)[];
    image: string | null;
    imageAlt: string | null;
  };
  pq: string | null;
  stats: {
    eyebrow: string | null;
    heading: string | null;
    image: string | null;
    items: { value: string | null; label: string | null }[];
  };
  partners: { eyebrow: string | null; heading: string | null; lede: string | null; items: (string | null)[] };
  people: {
    eyebrow: string | null;
    heading: string | null;
    ledeHtml: string | null;
    lede2Html: string | null;
    feats: { label: string | null; heading: string | null; body: string | null }[];
  };
  values: { headingHtml: string | null; lede: string | null; image: string | null };
  cta: { headingHtml: string | null; lede: string | null; buttons: { label: string | null; href: string }[] };
}
