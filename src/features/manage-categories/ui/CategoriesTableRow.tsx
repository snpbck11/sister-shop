import { ICategoryWithCount, TCategoryUdpatebleFields } from "@/entities/category";
import { ApiResponse } from "@/shared/api/http/types";
import {
  DeleteButton,
  EditableDescriptionCell,
  EditableField,
  SlugCell,
  TableCell,
  TableRow,
} from "@/shared/ui";

interface ICategoriesTableRowProps {
  category: ICategoryWithCount;
  updateField: (
    id: number,
    next: string,
    key: TCategoryUdpatebleFields,
  ) => Promise<ApiResponse<ICategoryWithCount>>;
  onDelete: () => void;
}

export function CategoriesTableRow({ category, onDelete, updateField }: ICategoriesTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <EditableField
          value={category.name}
          onSave={(nextValue) => updateField(category.id, nextValue, "name")}
        />
      </TableCell>
      <SlugCell slug={category.slug} />
      <EditableDescriptionCell
        value={category.description}
        onSave={(nextValue) => updateField(category.id, nextValue, "description")}
      />
      <TableCell className="text-center">{category._count.products}</TableCell>
      <TableCell>
        <DeleteButton onClick={onDelete} />
      </TableCell>
    </TableRow>
  );
}
