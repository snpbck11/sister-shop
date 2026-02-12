import { IProductWithRelations, TProductUpdatebleFields } from "@/entities/product";
import { ApiResponse } from "@/shared/api/http/types";
import {
  DeleteButton,
  EditableDescriptionCell,
  EditableField,
  IconButton,
  ImageCell,
  SlugCell,
  TableCell,
  TableRow,
} from "@/shared/ui";
import { ExternalLink } from "lucide-react";

interface IProductsTableRowProps {
  product: IProductWithRelations;
  onDelete: () => void;
  updateField: (
    id: number,
    key: TProductUpdatebleFields,
    next: string,
  ) => Promise<ApiResponse<IProductWithRelations>>;
  onClick: () => void;
}

export function ProductsTableRow({
  product,
  onDelete,
  updateField,
  onClick,
}: IProductsTableRowProps) {
  return (
    <TableRow>
      <TableCell>
        <IconButton onClick={onClick} icon={ExternalLink} />
      </TableCell>
      <TableCell>
        <EditableField
          value={product.title}
          onSave={(nextValue) => updateField(product.id, "title", nextValue)}
        />
      </TableCell>
      <TableCell>{product.type.name}</TableCell>
      <ImageCell src={product.image} alt={product.title} />
      <ImageCell src={product.hoverImage} alt={product.title} />
      <EditableDescriptionCell
        value={product.description || "-"}
        onSave={(nextValue) => updateField(product.id, "description", nextValue)}
      />
      <SlugCell slug={product.slug} />
      <TableCell>{product.category.name}</TableCell>
      <TableCell>
        <ul className="space-y-1">
          {product.collections.map((c) => (
            <li key={c.id} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
              {c.name}
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell>
        <ul>
          {product.sizes.map((size) => (
            <li key={size.id} className="text-sm flex gap-1">
              <p className="font-medium">{size.name}</p>
              {size.description && <span className="text-admin-"> ({size.description})</span>}
              <span>{size.price} ₽</span>
            </li>
          ))}
        </ul>
      </TableCell>
      <TableCell align="right">
        <div className="flex justify-end gap-2">
          <DeleteButton onClick={onDelete} />
        </div>
      </TableCell>
    </TableRow>
  );
}
