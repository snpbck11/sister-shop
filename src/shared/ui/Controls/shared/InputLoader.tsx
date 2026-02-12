import { Loader } from "lucide-react";

export function InputLoader() {
  return (
    <div className="absolute right-2 top-1/2 -translate-y-1/2">
      <Loader className="w-4 h-4 animate-spin text-gray-400" />
    </div>
  );
}
