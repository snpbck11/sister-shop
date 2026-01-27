import { Pencil } from "lucide-react";
import { IconButton } from "./IconButton";

interface IEditButtonProps {
  onClick: () => void;
}

export function EditButton({ onClick }: IEditButtonProps) {
  return <IconButton onClick={onClick} icon={Pencil} />;
}
