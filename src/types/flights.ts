// Shape produced by tools/extract_flights_page.py from flights.html.

export interface FlightsPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string; kind: "square" | "text" }[];
  };
  pullq: { quoteHtml: string | null; lede: string | null };
  idx: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    rows: { no: string | null; heading: string | null; body: string | null }[];
  };
  feat: {
    leadNum: string | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  signature: { eyebrow: string | null; lineHtml: string | null; sub: string | null; image: string | null };
  examples: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    tiles: { label: string | null; heading: string | null; body: string | null }[];
  };
  howItWorks: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cta: { label: string | null; href: string } | null;
    steps: { n: string | null; heading: string | null; body: string | null }[];
  };
  faq: {
    eyebrow: string | null;
    heading: string | null;
    items: { summary: string | null; bodyHtml: string | null }[];
  };
  cta: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
