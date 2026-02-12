import { Loader } from "lucide-react";

interface ILoadingLayoutProps {
  isLoading: boolean;
}

export function LoadingLayout({ isLoading }: ILoadingLayoutProps) {
  if (!isLoading) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-[1px] animate-pulse">
      <Loader className="w-12 h-12 animate-spin text-gray-400" />
    </div>
  );
}
