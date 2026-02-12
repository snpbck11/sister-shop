import { cn } from "@/shared/lib/cn";
import Image from "next/image";
import { TableCell } from "../TableCell";

interface IImageCellProps {
  src: string;
  alt: string;
  className?: string;
}
export function ImageCell({ src, alt, className }: IImageCellProps) {
  return (
    <TableCell>
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        className={cn("rounded object-cover min-w-25 min-h-25", className)}
      />
    </TableCell>
  );
}
