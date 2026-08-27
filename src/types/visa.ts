// Shape produced by tools/extract_visa_pages.py from the 12 real
// visa-<country>.html files. All 12 share one exact structure. The
// check-mark symbol before each cp-lines point (✦ default, ✓ positive,
// ✕ warn) varies per item independent of the list's own class, so it's
// captured per item rather than derived from the list.

export interface VisaLink {
  label: string | null;
  href: string;
}

export interface VisaPoint {
  symbol: string | null;
  html: string | null;
}

export interface VisaLines {
  warn: boolean;
  points: VisaPoint[];
}

export interface VisaFact {
  label: string | null;
  value: string | null;
  sub: string | null;
}

export interface VisaData {
  slug: string;
  fullSlug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: {
    image: string | null;
    imagePosition: string | null;
    backLink: VisaLink | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    ctaPrimary: VisaLink | null;
    ctaSecondary: VisaLink | null;
  };
  facts: VisaFact[];
  what: { eyebrow: string | null; heading: string | null; lede: string | null; extraParagraph: string | null }[];
  docs: { eyebrow: string | null; heading: string | null; lists: VisaLines[]; hedge: string | null };
  process: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    steps: { n: string | null; heading: string | null; text: string | null }[];
    hedge: string | null;
  };
  pitfalls: { eyebrow: string | null; heading: string | null; lede: string | null; list: VisaLines }[];
  signature: { image: string | null; eyebrow: string | null; lineHtml: string | null; sub: string | null };
  how: {
    anchorId: string | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    list: VisaLines;
    ctaPrimary: VisaLink | null;
    ctaSecondary: VisaLink | null;
    image: string | null;
  };
  faq: { eyebrow: string | null; heading: string | null; items: { question: string | null; answer: string | null }[] };
  closing: { eyebrow: string | null; headingHtml: string | null; lede: string | null; ctaPrimary: VisaLink | null; ctaSecondary: VisaLink | null };
}
