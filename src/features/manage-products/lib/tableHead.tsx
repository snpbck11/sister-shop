import { Menu } from "lucide-react";
import { ReactNode } from "react";

export const tableHead: { title: ReactNode; className?: string }[] = [
  { title: <Menu /> },
  { title: "Название" },
  { title: "Тип" },
  { title: "Фото" },
  { title: "Фото при наведении", className: "text-center" },
  { title: "Описание", className: "text-left" },
  { title: "Slug" },
  { title: "Категория" },
  { title: "Коллекции" },
  { title: "Размеры" },
  { title: "Действия", className: "text-right" },
];
