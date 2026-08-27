// Shape produced by tools/extract_itineraries_page.py from itineraries.html.

export interface ItinerariesPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    metaK: string | null;
    metaT: string | null;
  };
  journeys: {
    eyebrow: string | null;
    headingHtml: string | null;
    mood: string | null;
    handles: { label: string | null; html: string | null }[];
    noteLabel: string | null;
    noteQuote: string | null;
    fromHtml: string | null;
    image: string | null;
    imageFirst: boolean;
    bone: boolean;
  }[];
  quote: string | null;
  reassurance: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  cta: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
