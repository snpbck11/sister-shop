import { cn } from "@/shared/lib/cn";
import { EditableField } from "../../EditableField";
import { TableCell } from "../TableCell";

interface EditableTextCellProps<T> {
  value: string;
  onSave: (nextValue: string) => Promise<T>;
}

export function EditableDescriptionCell<T>({ value, onSave }: EditableTextCellProps<T>) {
  return (
    <TableCell>
      <div className={cn("text-gray-600 dark:text-gray-400 max-w-80 min-w-50 p-0")}>
        <EditableField value={value} onSave={onSave} />
      </div>
    </TableCell>
  );
}
