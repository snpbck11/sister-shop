interface IErorrProps {
  error?: string;
}

export function ErrorMessage({ error }: IErorrProps) {
  if (!error) return null;

  return (
    <div className="mt-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
      <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
    </div>
  );
}
