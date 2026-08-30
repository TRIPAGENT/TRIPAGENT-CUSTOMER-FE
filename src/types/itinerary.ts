// Shape produced by tools/extract_itinerary_pages.py (output:
// app/src/data/itinerary-teasers.generated.json) from the real
// route-<theme-name>.html itinerary-teaser files (the short 70-line
// template — distinct from the route-<origin>-<destination> city-pair
// guides in route.ts / Phase 4).

export interface ItineraryLink {
  label: string | null;
  href: string;
}

export interface ItineraryMetaItem {
  label: string | null;
  value: string | null;
}

export interface ItineraryLeg {
  n: string | null;
  nights: string | null;
  city: string | null;
  text: string | null;
  guideLink: ItineraryLink | null;
}

export interface ItineraryData {
  slug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: {
    eyebrow: string | null;
    name: string | null;
    lede: string | null;
    meta: ItineraryMetaItem[];
  };
  legs: ItineraryLeg[];
  note: string | null;
  cta: ItineraryLink;
}
