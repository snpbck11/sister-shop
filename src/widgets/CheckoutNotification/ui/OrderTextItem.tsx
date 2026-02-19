interface IOrderTextItemProps {
  title: string;
  children: string;
}

export function OrderTextItem({ title, children }: IOrderTextItemProps) {
  return (
    <div>
      <p className="text-sm opacity-80">{title}</p>
      <span>{children}</span>
    </div>
  );
}
