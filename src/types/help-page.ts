// Shape produced by tools/extract_help_page.py from help.html.

export interface HelpPageData {
  seo: { title: string | null; description: string | null };
  hero: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    toc: { label: string | null; href: string }[];
    image: string | null;
  };
  categories: {
    id: string | null;
    eyebrow: string | null;
    heading: string | null;
    items: { question: string | null; answerHtml: string | null; open: boolean }[];
  }[];
  cta: {
    headingHtml: string | null;
    lede: string | null;
    image: string | null;
    buttons: { label: string | null; href: string }[];
  };
}
