// Shape produced by tools/extract_goin_pages.py from the real
// go-in-<month>.html files. All 12 share one exact structure.

export interface GoInLink {
  label: string | null;
  href: string;
}

export interface GoInData {
  slug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: {
    image: string | null;
    imagePosition: string | null;
    backLink: GoInLink | null;
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    ctaPrimary: GoInLink;
    ctaSecondary: GoInLink;
    cornerLabel: { key: string | null; value: string | null } | null;
  };
  intro: { eyebrow: string | null; note: string | null; statement: string | null; lede: string | null };
  where: {
    eyebrow: string | null;
    heading: string | null;
    anchorId: string | null;
    items: { heading: string | null; text: string | null }[];
  };
  avoid: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    points: string[];
    image: { src: string | null; alt: string | null };
  };
  indianAngle: { eyebrow: string | null; heading: string | null; points: string[] };
  signature: { image: string | null; by: string | null; pull: string | null };
  flightsVisas: { eyebrow: string | null; heading: string | null; points: string[] };
  monthNav: { eyebrow: string | null; links: GoInLink[] };
  closing: {
    image: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    ctaPrimary: GoInLink | null;
    ctaSecondary: GoInLink | null;
  };
}
