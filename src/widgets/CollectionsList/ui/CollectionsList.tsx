import { ICollection } from "@/entities/collection";
import { CollectionCard } from "../../../entities/collection/ui/CollectionCard";

interface ICollectionListProps {
  collections: ICollection[];
}

export function CollectionsList({ collections }: ICollectionListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center py-12">
      {collections.slice(0, 4).map((item) => (
        <li key={item.id}>
          <CollectionCard slug={item.slug} imageSrc={item.image} title={item.name} />
        </li>
      ))}
    </ul>
  );
}
