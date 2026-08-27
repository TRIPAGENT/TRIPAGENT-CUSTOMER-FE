// Shape produced by tools/extract_destination_pages.py from the 18 full
// destination-<country>.html pages. Unlike every prior template group,
// these are genuinely bespoke per country (12 distinct section signatures,
// 7 hero shapes, and each file carries its own unique <style> block) — so
// each page is modeled as an ORDERED LIST of typed blocks from a shared
// library, rather than one fixed section sequence. See the extraction
// script's module docstring for the full rationale.

export interface DestLink {
  label: string | null;
  href: string;
}

export interface HeroBackLink extends DestLink {
  class: string | null;
  outsideCopy: boolean;
}

export interface DestCard {
  iconSvg?: string | null;
  title: string | null;
  text: string | null;
}

export interface DestGuideItem {
  name: string | null;
  area: string | null;
  description: string | null;
}

export interface DestGuideTier {
  label: string | null;
  items: DestGuideItem[];
}

export interface DestGuidePanel {
  key: string | null;
  tiers: DestGuideTier[];
}

export interface HeroBlock {
  type: "hero";
  headerClass: string;
  copyClass: string | null;
  ruleClass: string;
  image: string | null;
  imagePosition: string | null;
  backLink: HeroBackLink | null;
  eyebrow: string | null;
  name: string | null;
  lede: string | null;
  ctaPrimary: DestLink | null;
  ctaSecondary: DestLink | null;
  corner: { kind: "meta"; key: string | null; value: string | null } | { kind: "coords"; text: string | null } | null;
}

export interface TheCitiesBlock {
  type: "theCities";
  country: string;
  cities: { slug: string; name: string }[];
}

export interface IntroEditorialBlock {
  type: "introEditorial";
  eyebrow: string | null;
  note: string | null;
  statement: string | null;
  lede: string | null;
}

export interface IntroPullQuoteBlock {
  type: "introPullQuote";
  eyebrow: string | null;
  quoteHtml: string | null;
  lede: string | null;
}

export interface MiniPullQuoteBlock {
  type: "miniPullQuote";
  textHtml: string | null;
}

export interface SignatureBandBlock {
  type: "signatureBand";
  image: string | null;
  by: string | null;
  pull: string | null;
}

export interface TwoCellPairBlock {
  type: "twoCellPair";
  cells: { image: string | null; key: string | null; text: string | null }[];
}

export interface GettingThereIdxBlock {
  type: "gettingThereIdx";
  eyebrow: string | null;
  heading: string | null;
  lede: string | null;
  listClassName: string;
  items: { number: string | null; html: string | null }[];
}

export interface LinesBlock {
  type: "gettingThereLines" | "visaLines";
  eyebrow: string | null;
  heading: string | null;
  lede: string | null;
  points: string[];
  image: string | null;
}

export interface GuideBlock {
  type: "guide";
  eyebrow: string | null;
  headingHtml: string | null;
  lede: string | null;
  anchorId: string | null;
  panels: DestGuidePanel[];
}

export interface WhenToGoBlock {
  type: "whenToGo";
  eyebrow: string | null;
  text: string | null;
}

export interface PlanEssentialsBlock {
  type: "planEssentials";
  eyebrow: string | null;
  heading: string | null;
  lede: string | null;
  links: DestLink[];
}

export interface ClosingCtaBlock {
  type: "closingCta";
  image: string | null;
  eyebrow: string | null;
  heading: string | null;
  lede: string | null;
  ctaPrimary: DestLink | null;
  ctaSecondary: DestLink | null;
}

export interface StatementBlock {
  type: "statementBlock";
  eyebrow: string | null;
  headingHtml: string | null;
  bodyParagraphs: string[];
  image: string | null;
}

export type DestBlock =
  | HeroBlock
  | TheCitiesBlock
  | IntroEditorialBlock
  | IntroPullQuoteBlock
  | MiniPullQuoteBlock
  | SignatureBandBlock
  | TwoCellPairBlock
  | GettingThereIdxBlock
  | LinesBlock
  | GuideBlock
  | WhenToGoBlock
  | PlanEssentialsBlock
  | ClosingCtaBlock
  | StatementBlock;

export interface DestinationData {
  slug: string;
  fullSlug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  rawStyle: string | null;
  blocks: DestBlock[];
}
