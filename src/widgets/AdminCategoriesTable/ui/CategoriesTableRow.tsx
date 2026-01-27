import { ICategoryWithCount, TUdpatebleFields } from "@/entities/category";
import { DeleteButton, TableCell, TableRow } from "@/shared/ui";
import { EditableField } from "@/shared/ui/EditableField";

interface ICategoriesTableRow {
  category: ICategoryWithCount;
  updateField: (id: number, next: string, key: TUdpatebleFields) => Promise<void>;
  onDelete: () => void;
}

export function CategoriesTableRow({ category, onDelete, updateField }: ICategoriesTableRow) {
  return (
    <TableRow className="border-b border-gray-200 dark:border-gray-700 last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
      <TableCell>
        <EditableField
          value={category.name}
          onSave={(nextValue) => updateField(category.id, nextValue, "name")}
        />
      </TableCell>
      <TableCell className="text-gray-600 dark:text-gray-400">
        <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          {category.slug}
        </code>
      </TableCell>
      <TableCell className="text-gray-600 dark:text-gray-400 max-w-md min-w-50 p-0">
        <EditableField
          value={category.description}
          onSave={(nextValue) => updateField(category.id, nextValue, "description")}
        />
      </TableCell>
      <TableCell className="text-center">{category._count.products}</TableCell>
      <TableCell>
        <DeleteButton onClick={onDelete} />
      </TableCell>
    </TableRow>
  );
}
