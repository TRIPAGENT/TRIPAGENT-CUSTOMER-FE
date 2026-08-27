// Shared shape for the WhatsApp-style iPhone mockup used on how-it-works.html
// and how-we-work.html (2 instances each). Produced by each page's own
// extract_*_page.py via a shared extract_phone() helper.

export type PhoneMessage =
  | { type: "out"; text: string; faded: boolean }
  | { type: "in"; whoKind: "ai" | "human"; whoLabel: string; whoAvatar: string | null; text: string }
  | { type: "optcard"; heading: string | null; rows: { label: string | null; value: string | null }[] };

export interface PhoneData {
  time: string | null;
  headerName: string | null;
  headerStatus: string | null;
  messages: PhoneMessage[];
}
