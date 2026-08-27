import deepGuidesData from "../data/deep-guides.generated.json";
import type { DeepGuidePageData } from "../types/deep-guide";
import DeepGuideLayout from "./DeepGuideLayout";
import styles from "./hotel-programmes-page.module.css";

const data = (deepGuidesData as unknown as Record<string, DeepGuidePageData>)["hotel-programmes"];

export default function HotelProgrammesPage() {
  return <DeepGuideLayout data={data} styles={styles} />;
}
