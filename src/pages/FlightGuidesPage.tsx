import flightGuidesData from "../data/flight-guides.generated.json";
import type { GuidesHubPageData } from "../types/guides-hub";
import GuidesHubLayout from "./GuidesHubLayout";
import styles from "./flight-guides-page.module.css";

const data = flightGuidesData as unknown as GuidesHubPageData;

export default function FlightGuidesPage() {
  return <GuidesHubLayout data={data} styles={styles} />;
}
