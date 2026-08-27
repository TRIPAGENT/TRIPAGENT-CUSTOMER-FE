// Shape produced by tools/extract_journal_index_page.py from journal.html —
// the Journal hub, distinct from the journal-*.html article template
// (Phase 9) it links out to.

export interface JournalLink {
  label: string | null;
  href: string;
}

export interface JournalIndexPageData {
  seo: { title: string | null; description: string | null };
  magazine: {
    kicker: string | null;
    heading: string | null;
    lede: string | null;
    tabs: { cat: string | null; label: string | null }[];
    featured: { href: string; image: string | null; kicker: string | null; heading: string | null; body: string | null; meta: string | null };
    cards: { cat: string | null; href: string; image: string | null; kicker: string | null; heading: string | null; meta: string | null }[];
  };
  library: {
    kicker: string | null;
    heading: string | null;
    lede: string | null;
    season: { leadLabel: string | null; leadHref: string; links: JournalLink[] };
    mood: { leadLabel: string | null; leadHref: string; links: JournalLink[] };
    guides: { leadLabel: string | null; leadHref: string; links: JournalLink[] };
  };
}
