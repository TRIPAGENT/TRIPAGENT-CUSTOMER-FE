// Shape produced by tools/extract_contact_page.py from contact.html.

export interface ContactData {
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; headingHtml: string | null; lede: string | null; image: string | null; caption: string | null };
  rows: { label: string | null; valueText: string | null; valueHref: string; note: string | null }[];
  detail: { heading: string | null; bodyHtml: string | null }[];
  noteHtml: string | null;
}
