// Shape produced by tools/extract_membership_page.py from membership.html.

export interface MembershipPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaGold: { label: string | null; href: string };
    ctaText: { label: string | null; href: string };
  };
  price: {
    tier: string | null;
    amountHtml: string | null;
    free: string | null;
    items: (string | null)[];
    cta: { label: string | null; href: string };
    note: string | null;
  };
  value: {
    eyebrow: string | null;
    note: string | null;
    statement: string | null;
    lede: string | null;
    stats: { value: string | null; label: string | null }[];
  };
  signature: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  compare: {
    alone: { eyebrow: string | null; headingHtml: string | null; items: (string | null)[] };
    tripagent: { eyebrow: string | null; headingHtml: string | null; items: (string | null)[] };
  };
  pq: string | null;
  faq: {
    eyebrow: string | null;
    heading: string | null;
    items: { question: string | null; answerHtml: string | null; open: boolean }[];
  };
  cta: {
    heading: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
