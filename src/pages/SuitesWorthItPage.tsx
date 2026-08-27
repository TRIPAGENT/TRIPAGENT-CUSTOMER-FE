import deepGuidesData from "../data/deep-guides.generated.json";
import type { DeepGuidePageData } from "../types/deep-guide";
import DeepGuideLayout from "./DeepGuideLayout";
import styles from "./suites-worth-it-page.module.css";

const data = (deepGuidesData as unknown as Record<string, DeepGuidePageData>)["suites-worth-it"];

export default function SuitesWorthItPage() {
  return <DeepGuideLayout data={data} styles={styles} />;
}
