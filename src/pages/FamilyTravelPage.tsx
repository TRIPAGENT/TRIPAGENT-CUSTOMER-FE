import collectionData from "../data/collection-pages.generated.json";
import type { CollectionPageData } from "../types/collection-page";
import CollectionPageLayout from "./CollectionPageLayout";

const data = (collectionData as unknown as Record<string, CollectionPageData>)["family-travel"];

export default function FamilyTravelPage() {
  return <CollectionPageLayout data={data} />;
}
