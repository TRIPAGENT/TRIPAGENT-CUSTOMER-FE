// Shape produced by tools/extract_portal_page.py from portal.html.
// #my-year and #portal-member (auth-gated, signed-in-only widgets) are
// intentionally not represented here — see the extractor's docstring.

export interface PortalPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaLabel: string | null;
    ctaHref: string;
    textLabel: string | null;
    textHref: string;
  };
  intro: { eyebrow: string | null; note: string | null; statementHtml: string | null; lede: string | null };
  what: { eyebrow: string | null; heading: string | null; items: { nn: string | null; heading: string | null; body: string | null }[] };
  begins: { eyebrow: string | null; heading: string | null; lede: string | null; ctaLabel: string | null; ctaHref: string; image: string | null };
  sig: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null };
  remembers: { eyebrow: string | null; heading: string | null; lede: string | null; items: (string | null)[]; image: string | null };
  uses: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    ctaLabel: string | null;
    ctaHref: string;
    steps: { n: string | null; heading: string | null; body: string | null }[];
  };
  inbuild: { tag: string | null; heading: string | null; lede: string | null; ctaLabel: string | null; ctaHref: string };
  faq: { eyebrow: string | null; heading: string | null; items: { question: string | null; answerHtml: string | null }[] };
  cta: { headingHtml: string | null; buttons: { label: string | null; href: string }[] };
}
