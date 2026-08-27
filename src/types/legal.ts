// Shape produced by tools/extract_legal_pages.py from terms.html,
// privacy.html and refund.html — discovered to be byte-identical in
// structure despite being 3 separate "standalone" pages.

export type LegalNode =
  | { kind: "heading"; html: string | null }
  | { kind: "paragraph"; html: string | null }
  | { kind: "list"; items: string[] }
  | { kind: "raw"; html: string | null };

export interface LegalData {
  slug: string;
  seo: { title: string | null; description: string | null };
  hero: { eyebrow: string | null; heading: string | null; standfirst: string | null; updated: string | null };
  nodes: LegalNode[];
  note: string | null;
}
