import { CollectionsTable } from "@/features/manage-collections";
import { getCollections } from "@/shared/server/db";

export default async function AdminCollectionsPage() {
  const collections = await getCollections();

  return <CollectionsTable initialCollections={collections} />;
}
