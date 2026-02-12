import {
  ICollection,
  ICollectionWithCount,
  TCollectionUdpatebleFields,
} from "@/entities/collection";
import { ApiResponse } from "@/shared/api/http/types";
import {
  DeleteButton,
  EditableDescriptionCell,
  EditableField,
  ImageCell,
  SlugCell,
  TableCell,
  TableRow,
} from "@/shared/ui";

interface ICollectionsTableRowProps {
  collection: ICollection & { _count: { products: number } };
  updateField: <K extends TCollectionUdpatebleFields>(
    id: number,
    next: ICollection[K],
    key: K,
  ) => Promise<ApiResponse<ICollectionWithCount>>;
  onDelete: () => void;
}

export function CollectionsTableRow({
  collection,
  onDelete,
  updateField,
}: ICollectionsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <EditableField
          value={collection.name}
          onSave={(nextValue) => updateField(collection.id, nextValue, "name")}
        />
      </TableCell>
      <ImageCell src={collection.image} alt={collection.name} />
      <SlugCell slug={collection.slug} />
      <EditableDescriptionCell
        value={collection.description}
        onSave={(nextValue) => updateField(collection.id, nextValue, "description")}
      />
      <TableCell className="text-center">{collection._count.products}</TableCell>
      <TableCell>
        <DeleteButton onClick={onDelete} />
      </TableCell>
    </TableRow>
  );
}
