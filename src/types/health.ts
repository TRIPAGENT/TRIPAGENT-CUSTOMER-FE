// Shape produced by tools/extract_health_pages.py from the real
// health-{hospital,destination,specialty,guide,longevity,pathway}-*.html
// files. Keep in sync with that script's output — see
// app/src/data/health.generated.json.
//
// Unlike CityData, there is no single shared body shape: each category has
// its own consistent section layout (verified empirically), built from a
// shared library of block shapes (index rows, card grids, day-steps,
// data-rows, chip groups, plain lists) — see HealthPage.tsx's block
// sub-components.

export interface HealthLink {
  label: string | null;
  href: string | null;
}

export interface HealthIndexRow {
  name: string | null;
  region: string | null;
}

export interface HealthCard {
  iconSvg: string | null;
  title: string | null;
  text: string | null;
}

export interface HealthDayStep {
  n: string | null;
  title: string | null;
  text: string | null;
}

export interface HealthDataRow {
  iconSvg: string | null;
  label: string | null;
  value: string | null;
}

export interface HealthOgRow {
  label: string | null;
  value: string | null;
}

interface Shared {
  slug: string;
  fullSlug: string;
  seo: { title: string | null; description: string | null; ogImage: string | null };
  hero: { iconSvg: string | null; eyebrowHtml: string | null; name: string | null; lede: string | null };
  disclaimer: string | null;
  concierge: {
    heading: string | null;
    shareText: string | null;
    confidenceNote: string | null;
    cta: HealthLink;
  };
}

export interface HospitalData extends Shared {
  category: "hospital";
  hospital: {
    bestFor: {
      eyebrow: string | null;
      heading: string | null;
      accrChips: string[];
      leadParagraph: string | null;
      destinationChips: HealthLink[];
    };
    centresOfExcellence: { iconSvg: string | null; eyebrow: string | null; heading: string | null; cards: HealthCard[] };
    signatureProgrammes: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      items: string[];
      techHeader: string | null;
      techChips: string[];
    };
    patientJourney: { iconSvg: string | null; eyebrow: string | null; heading: string | null; steps: HealthDayStep[] };
    inDetail: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      rows: HealthDataRow[];
      stayingHeader: string | null;
      stayingNote: string | null;
      sourceLinks: HealthLink[];
    };
  };
}

export interface DestinationData extends Shared {
  category: "destination";
  destination: {
    bestFor: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      specialtyChips: HealthLink[];
      accrText: string | null;
      leadParagraph: string | null;
    };
    experience: { iconSvg: string | null; eyebrow: string | null; heading: string | null; text: string | null };
    flagshipHospitals: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      primary: HealthIndexRow[];
      moreHeader: string | null;
      more: HealthIndexRow[];
    };
    forIndianPatients: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      rows: HealthDataRow[];
      onGround: HealthOgRow | null;
      recovery: HealthOgRow | null;
    };
    aroundTreatment: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      text: string | null;
      cityChips: HealthLink[];
    } | null;
  };
}

export interface SpecialtyData extends Shared {
  category: "specialty";
  specialty: {
    whereWorldLeads: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      primary: HealthIndexRow[];
      indiaHeader: string | null;
      indiaRows: HealthIndexRow[];
    };
    subSpecialties: { iconSvg: string | null; eyebrow: string | null; heading: string | null; cards: HealthCard[] };
    signatureTreatments: { iconSvg: string | null; eyebrow: string | null; heading: string | null; cards: HealthCard[] };
    journey: { iconSvg: string | null; eyebrow: string | null; heading: string | null; lede: string | null; steps: HealthDayStep[] };
    whatToWeigh: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      weighList: string[];
      costHeader: string | null;
      costList: string[];
      questionsHeader: string | null;
      questionsList: string[];
    };
    bestDestinations: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      chips: HealthLink[];
      leadParagraph: string | null;
      note: string | null;
    };
  };
}

export interface GuideData extends Shared {
  category: "guide";
  guide: {
    inShort: { iconSvg: string | null; eyebrow: string | null; items: string[] };
    detail: { iconSvg: string | null; eyebrow: string | null; rows: HealthOgRow[] };
  };
}

export interface LongevityData extends Shared {
  category: "longevity";
  longevity: {
    programmes: { iconSvg: string | null; eyebrow: string | null; heading: string | null; cards: HealthCard[] };
    stay: { iconSvg: string | null; eyebrow: string | null; heading: string | null; items: string[] };
    whatIsMeasured: { iconSvg: string | null; eyebrow: string | null; heading: string | null; chips: string[] };
    inDetail: {
      iconSvg: string | null;
      eyebrow: string | null;
      heading: string | null;
      rows: HealthDataRow[];
      settingHeader: string | null;
      settingNote: string | null;
    };
  };
}

export interface PathwayData extends Shared {
  category: "pathway";
  pathway: {
    whereToBegin: {
      iconSvg: string | null;
      eyebrow: string | null;
      lede: string | null;
      steps: HealthDayStep[];
      note: string | null;
    };
    linkedTo: { iconSvg: string | null; eyebrow: string | null; chips: HealthLink[] };
  };
}

export type HealthData =
  | HospitalData
  | DestinationData
  | SpecialtyData
  | GuideData
  | LongevityData
  | PathwayData;
