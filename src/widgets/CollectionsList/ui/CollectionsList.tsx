import { CollectionCard } from "../../../entities/collection/ui/CollectionCard";

interface ICollectionListProps {
  collections: { title: string; imageSrc: string; href: string }[];
}
export function CollectionsList({ collections }: ICollectionListProps) {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center py-12">
      {collections.slice(0, 4).map((item) => (
        <li key={item.title}>
          <CollectionCard href={item.href} imageSrc={item.imageSrc} title={item.title} />
        </li>
      ))}
    </ul>
  );
}
