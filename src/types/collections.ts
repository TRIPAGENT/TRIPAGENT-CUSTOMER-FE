// Shape produced by tools/extract_collections_page.py from collections.html.

export interface CollectionsPageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; heading: string | null; lede: string | null };
  sections: { eyebrow: string | null; links: { label: string | null; href: string }[] }[];
}
