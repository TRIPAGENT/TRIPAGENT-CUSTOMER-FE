// Shared shape produced by tools/extract_flight_guides_page.py and
// tools/extract_stay_guides_page.py from flight-guides.html / stay-guides.html.

export interface GuidesHubPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    back: { label: string | null; href: string };
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string; kind: "square" | "text" }[];
  };
  pullq: { quoteHtml: string | null; lede: string | null };
  routeGuides: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cards: { route: string | null; heading: string | null; body: string | null; image: string | null; href: string }[];
  };
  productGuides: {
    eyebrow: string | null;
    heading: string | null;
    cards: { eyebrow: string | null; heading: string | null; body: string | null; image: string | null; href: string }[];
  };
  cta: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
