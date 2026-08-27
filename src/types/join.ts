// Shape produced by tools/extract_join_page.py from join.html.

export interface JoinPageData {
  seo: { title: string | null; description: string | null };
  aside: {
    eyebrow: string | null;
    headingHtml: string | null;
    ledeParas: string[];
    freeBadge: string | null;
  };
  card: {
    heading: string | null;
    muted: string | null;
    steps: { n: string | null; html: string | null }[];
    cta: { label: string | null; href: string };
    foot: string | null;
  };
}
