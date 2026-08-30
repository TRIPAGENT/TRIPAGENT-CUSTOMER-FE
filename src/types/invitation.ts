// Shape produced by tools/extract_invitation_page.py from invitation.html.

export interface InvitationRequestField {
  id: string | null;
  type: string | null;
  labelHtml: string | null;
  placeholder: string | null;
}

export interface InvitationCaptureField {
  id: string | null;
  name: string | null;
  type: string | null;
  required: boolean;
  labelHtml: string | null;
  placeholder: string | null;
  sub: string | null;
}

export interface InvitationPageData {
  seo: { title: string | null; description: string | null };
  step1: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    keyLabel: string | null;
    openLabel: string | null;
    requestPromptText: string | null;
    requestLinkLabel: string | null;
    scarcity: string | null;
    requestForm: {
      introText: string | null;
      fields: InvitationRequestField[];
      submitLabel: string | null;
    };
    requestThanks: string | null;
  };
  step2: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    continueLabel: string | null;
  };
  step3: {
    eyebrow: string | null;
    headingHtml: string | null;
    fields: InvitationCaptureField[];
    submitLabel: string | null;
  };
  step4: {
    eyebrow: string | null;
    headingHtml: string | null;
    lede: string | null;
    stubTag: string | null;
    chargeLineTemplate: string | null;
    chargeNote: string | null;
    enterLabel: string | null;
    laterLabel: string | null;
  };
  step5: {
    eyebrow: string | null;
    defaultHeading: string | null;
    defaultAdvisorLine: string | null;
    waCtaLabel: string | null;
    fallbackCtaLabel: string | null;
    signature: string | null;
  };
}
