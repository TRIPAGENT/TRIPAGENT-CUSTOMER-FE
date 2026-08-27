import collectionData from "../data/collection-pages.generated.json";
import type { CollectionPageData } from "../types/collection-page";
import CollectionPageLayout from "./CollectionPageLayout";

const data = (collectionData as unknown as Record<string, CollectionPageData>)["milestone-trips"];

export default function MilestoneTripsPage() {
  return <CollectionPageLayout data={data} />;
}
