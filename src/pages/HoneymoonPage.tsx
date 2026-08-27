import collectionData from "../data/collection-pages.generated.json";
import type { CollectionPageData } from "../types/collection-page";
import CollectionPageLayout from "./CollectionPageLayout";

const data = (collectionData as unknown as Record<string, CollectionPageData>)["honeymoon"];

export default function HoneymoonPage() {
  return <CollectionPageLayout data={data} />;
}
