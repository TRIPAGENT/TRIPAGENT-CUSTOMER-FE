// Shape produced by tools/extract_offers_page.py from offers.html.

export interface OffersPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    metaK: string | null;
    metaT: string | null;
  };
  intro: string | null;
  features: {
    id: string | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
    imageAlt: string | null;
    imageFirst: boolean;
  }[];
  value: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  cta: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
