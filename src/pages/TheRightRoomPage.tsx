import deepGuidesData from "../data/deep-guides.generated.json";
import type { DeepGuidePageData } from "../types/deep-guide";
import DeepGuideLayout from "./DeepGuideLayout";
import styles from "./the-right-room-page.module.css";

const data = (deepGuidesData as unknown as Record<string, DeepGuidePageData>)["the-right-room"];

export default function TheRightRoomPage() {
  return <DeepGuideLayout data={data} styles={styles} />;
}
