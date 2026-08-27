// Shape produced by tools/extract_when_to_go_page.py from when-to-go.html.
// bestTime.regions is transcribed from an inline <script>'s literal array
// (not server-rendered HTML) — see the extractor's docstring.

export interface WhenToGoPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    ctaLabel: string | null;
    ctaHref: string;
    jumpLabel: string | null;
    jumpHref: string;
  };
  intro: { eyebrow: string | null; note: string | null; statement: string | null; ledeHtml: string | null };
  months: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    cards: { href: string; image: string | null; no: string | null; name: string | null; body: string | null }[];
  };
  bestTime: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    legend: (string | null)[];
    months: string[];
    regions: { name: string; rows: { name: string; slug: string; code: string }[] }[];
  };
  season: { eyebrow: string | null; heading: string | null; cols: { kicker: string | null; heading: string | null; body: string | null }[] };
  calendar: { eyebrow: string | null; heading: string | null; lede: string | null; items: { tag: string | null; body: string | null }[] };
  sig: { by: string | null; pull: string | null; image: string | null };
  quiet: { eyebrow: string | null; text: string | null };
  cta: { eyebrow: string | null; heading: string | null; lede: string | null; buttons: { label: string | null; href: string }[]; image: string | null };
}
