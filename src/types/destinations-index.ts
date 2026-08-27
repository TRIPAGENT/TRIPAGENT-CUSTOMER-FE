// Shape produced by tools/extract_destinations_index_page.py from destinations.html.

export interface DestinationsIndexPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    count: { n: string | null; k: string | null };
  };
  map: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    foot: string | null;
    pins: { lon: number; lat: number; name: string; slug: string }[];
    totalCities: number;
  };
  intro: { eyebrow: string | null; note: string | null; statementHtml: string | null; lede: string | null };
  groupsIntro: { eyebrow: string | null; heading: string | null };
  regions: {
    label: string;
    groups: {
      country: string;
      size: "solo" | "big" | "normal";
      cities: { slug: string; name: string }[];
    }[];
  }[];
  beyond: { eyebrow: string | null; heading: string | null; lede: string | null; image: string | null };
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
