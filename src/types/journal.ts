// Shape produced by tools/extract_journal_pages.py from the 20 real
// journal-<slug>.html article pages. Unlike every prior template group,
// the body is genuine editorial prose — modeled as an ORDERED ARRAY OF
// TYPED NODES rather than fixed fields, since heading/paragraph/blockquote/
// list order varies per article. See the extraction script's docstring.

export interface JournalLink {
  label: string | null;
  href: string;
}

export type JournalNode =
  | { kind: "paragraph"; html: string | null }
  | { kind: "leadPara"; html: string | null }
  | { kind: "heading"; html: string | null }
  | { kind: "blockquote"; html: string | null }
  | { kind: "list"; className: string; items: string[] }
  | { kind: "rule" }
  | { kind: "raw"; html: string | null };

export interface JournalData {
  slug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: {
    image: string | null;
    imagePosition: string | null;
    backLink: JournalLink | null;
    kicker: string | null;
    headingHtml: string | null;
    lede: string | null;
    meta: string[];
  };
  prose: { standfirst: string | null; nodes: JournalNode[] };
  miniQuote: string | null;
  closing: {
    image: string | null;
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    ctaPrimary: JournalLink | null;
    ctaSecondary: JournalLink | null;
  };
}
