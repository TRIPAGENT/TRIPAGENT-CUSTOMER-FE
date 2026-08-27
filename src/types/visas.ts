// Shape produced by tools/extract_visas_page.py from visas.html.

export interface VisasPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string; kind: "square" | "text" }[];
  };
  pullq: { quoteHtml: string | null; lede: string | null };
  idx: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    rows: { no: string | null; heading: string | null; body: string | null }[];
  };
  feat: {
    leadNum: string | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    items: (string | null)[];
    image: string | null;
  };
  pullq2: string | null;
  startEarly: {
    image: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    items: (string | null)[];
  };
  vtable: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    headers: (string | null)[];
    rows: {
      dest: string | null;
      visaType: string | null;
      processing: string | null;
      biometrics: string | null;
      biometricsYes: boolean;
      note: string | null;
    }[];
    note: string | null;
  };
  signature: { eyebrow: string | null; lineHtml: string | null; sub: string | null; image: string | null };
  howItWorks: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cta: { label: string | null; href: string } | null;
    steps: { n: string | null; heading: string | null; body: string | null }[];
  };
  faq: {
    eyebrow: string | null;
    heading: string | null;
    items: { summary: string | null; bodyHtml: string | null }[];
  };
  cta: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
