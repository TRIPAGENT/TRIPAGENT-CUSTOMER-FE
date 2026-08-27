// Shape produced by tools/extract_city_pages.py from the real city-*.html
// files. Keep this in sync with that script's output — see
// app/src/data/cities.generated.json.

export interface CityLink {
  label: string | null;
  href: string;
}

export interface CityFact {
  label: string | null;
  value: string | null;
  small: string | null;
}

export interface CityGuideItem {
  name: string | null;
  area: string | null;
  credentials: string[];
  description: string | null;
  hidden: boolean;
}

export interface CityGuideTier {
  label: string | null;
  items: CityGuideItem[];
  moreLabel: string | null;
  listNumbered: boolean;
}

export interface CityGuidePanel {
  key: "stay" | "do" | "eat" | "party";
  tiers: CityGuideTier[];
}

export interface CityDay {
  dayNumber: string | null;
  title: string | null;
  slots: { label: string | null; text: string | null }[];
}

export interface CityData {
  slug: string;
  fullSlug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: {
    image: string | null;
    breadcrumbCountry: CityLink | null;
    eyebrow: string | null;
    name: string | null;
    tagline: string | null;
    ctaPrimary: CityLink;
    ctaSecondary: CityLink;
    facts: CityFact[];
  };
  ourTake: { lede: string | null; comeIf: string | null; skipIf: string | null };
  firstLook: {
    heroImage: string | null;
    heroCaption: string | null;
    grid: { image: string | null; caption: string | null }[];
  };
  whenToGo: {
    blurb: string | null;
    bestMonths: string | null;
    months: { code: string | null; tier: string }[];
  };
  guide: {
    verified: string | null;
    headingHtml: string | null;
    lede: string | null;
    note: { label: string | null; text: string } | null;
    panels: CityGuidePanel[];
  };
  signatureExperiences: {
    heading: string | null;
    items: { image: string | null; title: string | null; description: string | null }[];
  };
  plan: {
    heading: string | null;
    lede: string | null;
    days: CityDay[];
    cta: CityLink;
  };
  neighbourhoods: {
    heading: string | null;
    items: { name: string | null; description: string | null }[];
    pairWith: string | null;
  };
  whatsOn: {
    heading: string | null;
    events: { when: string | null; name: string | null; note: string | null }[];
  };
  goodToKnow: {
    heading: string | null;
    onGround: { heading: string | null; rows: CityFact2[]; note: string | null };
    beforeYouGo: { heading: string | null; rows: CityFact2[]; note: string | null };
  };
  collections: {
    headingHtml: string | null;
    lede: string | null;
    items: CityLink[];
    allLink: CityLink | null;
  };
  closing: {
    headingHtml: string | null;
    lede: string | null;
    ctaPrimary: CityLink;
    ctaSecondary: CityLink | null;
  };
}

interface CityFact2 {
  label: string | null;
  value: string | null;
}
