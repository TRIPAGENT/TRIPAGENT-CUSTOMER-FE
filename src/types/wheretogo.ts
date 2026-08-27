// Shape produced by tools/extract_wheretogo_page.py from where-to-go.html.

export interface WhereToGoOption {
  label: string | null;
  group: string | null;
  value: string | null;
  multi: boolean;
  defaultOn: boolean;
}

export interface WhereToGoPageData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; headingHtml: string | null; lede: string | null };
  questions: { labelHtml: string | null; options: WhereToGoOption[] }[];
  goLabel: string | null;
}
