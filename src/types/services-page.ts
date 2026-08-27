// Shape produced by tools/extract_services_page.py from services.html.

export interface ServicesPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaGold: { label: string | null; href: string };
    ctaText: { label: string | null; href: string };
  };
  services: {
    id: string | null;
    no: string | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    items: (string | null)[];
    cta: { label: string | null; href: string };
    image: string;
    imageAlt: string | null;
    flip: boolean;
  }[];
  pq: string | null;
  whyOnlyThree: { eyebrow: string | null; headingHtml: string | null; lede: string | null };
  health: {
    tag: string | null;
    headingHtml: string | null;
    body: string | null;
    note: string | null;
    cta: { label: string | null; href: string };
    asideLede: string | null;
  };
  signature: {
    eyebrow: string | null;
    lineHtml: string | null;
    sub: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
