// Shape produced by tools/extract_health_index_page.py from health.html —
// the Health & Longevity hub, distinct from the health-*.html entity
// template (types/health.ts, HealthPage.tsx) it links out to.

export interface HealthCard {
  iconSvg: string | null;
  sub: string | null;
  name: string | null;
  body: string | null;
  href: string | null;
}

export interface HealthIndexPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    crumbLabel: string | null;
    crumbHref: string;
    hereLabel: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    kicker: string | null;
    iconSvg: string | null;
  };
  disclaimer: { iconSvg: string | null; text: string | null };
  stats: { value: string | null; label: string | null }[];
  longevity: {
    eyebrowIconSvg: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cards: HealthCard[];
  };
  preventive: {
    eyebrowIconSvg: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    chips: { label: string | null; href: string | null }[];
  };
  explorer: {
    eyebrowIconSvg: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    buttons: { id: string | null; iconSvg: string | null; label: string | null }[];
    panels: {
      id: string | null;
      heading: string | null;
      dek: string | null;
      indexLabel: string | null;
      rows: { name: string | null; location: string | null; href: string | null }[];
    }[];
  };
  destinations: {
    eyebrowIconSvg: string | null;
    eyebrow: string | null;
    heading: string | null;
    cards: HealthCard[];
  };
  steps: {
    eyebrowIconSvg: string | null;
    eyebrow: string | null;
    heading: string | null;
    items: { iconSvg: string | null; heading: string | null; body: string | null }[];
  };
  concierge: {
    eyebrow: string | null;
    heading: string | null;
    body: string | null;
    confIconSvg: string | null;
    confText: string | null;
    ctaLabel: string | null;
    ctaHref: string;
  };
}
