// Shape produced by tools/extract_journeys_page.py from journeys.html.

export interface JourneysPageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; heading: string | null; lede: string | null };
  cards: {
    meta: string | null;
    titleHtml: string | null;
    body: string | null;
    cities: string | null;
    href: string;
  }[];
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
