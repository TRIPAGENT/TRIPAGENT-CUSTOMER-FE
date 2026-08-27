// Shape produced by tools/extract_enquire_page.py from enquire.html.

export interface EnquireField {
  id: string | null;
  tag: "input" | "select" | "textarea";
  type: string | null;
  name: string | null;
  labelHtml: string | null;
  placeholder: string | null;
  required: boolean;
  options: string[] | null;
}

export interface EnquirePageData {
  seo: { title: string | null; description: string | null };
  aside: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    incl: string[];
  };
  form: {
    heading: string | null;
    muted: string | null;
    fields: EnquireField[];
    trust: string | null;
    submitLabel: string | null;
    emailPrompt: string | null;
    emailCta: { label: string | null; href: string };
  };
  thanksHeadingHtml: string | null;
}
