import stayGuidesData from "../data/stay-guides.generated.json";
import type { GuidesHubPageData } from "../types/guides-hub";
import GuidesHubLayout from "./GuidesHubLayout";
import styles from "./stay-guides-page.module.css";

const data = stayGuidesData as unknown as GuidesHubPageData;

export default function StayGuidesPage() {
  return <GuidesHubLayout data={data} styles={styles} />;
}
