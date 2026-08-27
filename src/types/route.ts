// Shape produced by tools/extract_route_pages.py from the real
// route-<origin>-<destination>.html (flight-route) and hub-<airport>.html
// (connecting-hub) files. Both "kinds" share one verified-identical 10
// -section structure — only the #carriers/#lounges anchor id and the text
// content differ — so one schema covers both, tagged by `kind`.

export interface RouteLink {
  label: string | null;
  href: string;
}

export interface RouteFact {
  label: string | null;
  value: string | null;
  text: string | null;
}

export interface RouteListItem {
  name: string | null;
  tag: string | null;
  text: string | null;
}

export interface RouteStep {
  n: string | null;
  title: string | null;
  text: string | null;
}

export interface RouteData {
  slug: string;
  kind: "route" | "hub";
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: {
    image: string | null;
    imagePosition: string | null;
    backLink: RouteLink | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    ctaPrimary: RouteLink;
    ctaSecondary: RouteLink;
    cornerLabel: { key: string | null; value: string | null };
  };
  facts: RouteFact[];
  intro: { eyebrow: string | null; note: string | null; statement: string | null; lede: string | null };
  list: {
    anchorId: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: RouteListItem[];
  };
  connection: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    points: string[];
    image: { src: string | null; alt: string | null };
  };
  signature: { image: string | null; by: string | null; pull: string | null };
  traps: { eyebrow: string | null; heading: string | null; items: string[] };
  secure: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cta: RouteLink;
    steps: RouteStep[];
  };
  whenToBook: { eyebrow: string | null; text: string | null };
  closing: {
    image: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    ctaPrimary: RouteLink | null;
    ctaSecondary: RouteLink | null;
  };
}
