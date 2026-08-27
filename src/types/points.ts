// Shape produced by tools/extract_points_page.py from points.html.

export interface PointsPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    metaK: string | null;
    metaT: string | null;
  };
  howItWorks: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    steps: { n: string | null; heading: string | null; body: string | null }[];
  };
  worked: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    splitPtsWidth: string;
    splitCardWidth: string;
    keyPts: string | null;
    keyCard: string | null;
    tag: string | null;
    route: string | null;
    fare: string | null;
    rows: { label: string | null; value: string | null; total: boolean }[];
    note: string | null;
  };
  whatWorks: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    tiles: { heading: string | null; body: string | null }[];
    note: string | null;
  };
  transparency: { eyebrow: string | null; headingHtml: string | null; columns: (string | null)[][] };
  faq: {
    eyebrow: string | null;
    heading: string | null;
    items: { summary: string | null; bodyHtml: string | null; open: boolean }[];
  };
  cta: { headingHtml: string | null; lede: string | null; image: string | null; buttons: { label: string | null; href: string }[] };
}
