// Shape produced by tools/extract_exotic_page.py from exotic.html + data/exotic.json.

export interface ExoticSpot {
  id: string;
  name: string;
  region: string;
  category: string;
  tagline: string | null;
  why: string | null;
  getting_there: string | null;
  season: string | null;
  india: string | null;
  handle: string | null;
  stay: string | null;
  access_flag: string;
}

export interface ExoticPageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; heading: string | null; lede: string | null };
  groups: { category: string; spots: ExoticSpot[] }[];
  note: string | null;
}
