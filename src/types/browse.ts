// Shape produced by tools/extract_browse_pages.py from the real
// browse-<interest>.html files. All 20 share one exact structure and one
// byte-identical <style> block.

export interface BrowseCard {
  href: string;
  image: string | null;
  country: string | null;
  name: string | null;
  description: string | null;
  // 2 or 3 items — domestic Indian cities skip "flight time from India".
  meta: string[];
}

export interface BrowseData {
  slug: string;
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; name: string | null; lede: string | null };
  cards: BrowseCard[];
}
