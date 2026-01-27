import { Radio } from "@/shared/ui";

interface IOrderFormRadio {
  name: string;
  value: string;
  label: string;
  description?: string;
}

export function OrderFormRadio({ name, value, label, description, ...rest }: IOrderFormRadio) {
  return (
    <Radio
      {...rest}
      containerClassName="p-3 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
      name={name}
      value={value}
      label={label}
      description={description}
    />
  );
}
