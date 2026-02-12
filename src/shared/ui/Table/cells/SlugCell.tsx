import { TableCell } from "../TableCell";

interface ISlugCellProps {
  slug: string;
}

export function SlugCell({ slug }: ISlugCellProps) {
  return (
    <TableCell className="text-gray-600 dark:text-gray-400">
      <code className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{slug}</code>
    </TableCell>
  );
}
