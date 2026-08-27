// Shape produced by tools/extract_new_page.py from new.html.

export interface NewPageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; headingHtml: string | null; lede: string | null };
  sections: {
    heading: string | null;
    sub: string | null;
    items: {
      title: string | null;
      year: string | null;
      where: string | null;
      body: string | null;
      link: { label: string | null; href: string } | null;
    }[];
  }[];
}
