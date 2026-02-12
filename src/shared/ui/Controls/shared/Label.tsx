interface ILabelProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
}

export function Label({ label, htmlFor, required }: ILabelProps) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
  );
}
