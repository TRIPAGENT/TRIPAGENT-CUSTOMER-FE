// Shape produced by tools/extract_cities_page.py from cities.html.

export interface CitiesIndexPageData {
  seo: { title: string | null; description: string | null };
  hero: { k: string | null; heading: string | null; lede: string | null };
  groups: {
    label: string | null;
    cities: { name: string | null; country: string | null; image: string | null; href: string }[];
  }[];
  cta: {
    eyebrow: string | null;
    heading: string | null;
    lede: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
