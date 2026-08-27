// Shape produced by tools/extract_compare_page.py from compare.html.

export interface ComparePageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; headingHtml: string | null; lede: string | null };
  cityOptions: { value: string; label: string | null }[];
  placeholders: { c0: string | null; c1: string | null; c2: string | null };
  ctx: {
    label: string | null;
    monthLabel: string | null;
    whoLabel: string | null;
    monthOptions: { value: string; label: string | null }[];
    whoOptions: { value: string; label: string | null }[];
  };
}
