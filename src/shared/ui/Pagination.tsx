import { cn } from "../lib/cn";

interface IPaginationProps {
  page: number;
  pages: number;
  onChange: (page: number) => void;
  className?: string;
}

export function Pagination({ page, pages, onChange, className }: IPaginationProps) {
  if (pages <= 1) return null;

  const canPrev = page > 1;
  const canNext = page < pages;

  const getPages = () => {
    const delta = 1;
    const out: (number | "...")[] = [];

    if (pages <= 7) {
      for (let i = 1; i <= pages; i++) out.push(i);
      return out;
    }

    const left = Math.max(2, page - delta);
    const right = Math.min(pages - 1, page + delta);

    out.push(1);

    if (left > 2) out.push("...");

    for (let i = left; i <= right; i++) out.push(i);

    if (right < pages - 1) out.push("...");

    out.push(pages);

    return out;
  };

  const items = getPages();

  return (
    <div
      className={cn(
        "border-t border-admin-border bg-admin-background px-3 py-2 flex items-center justify-between gap-3",
        className,
      )}>
      <div className="text-sm opacity-70 whitespace-nowrap">
        Страница {page} из {pages}
      </div>

      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() => onChange(page - 1)}
          className={cn(
            "px-3 h-9 rounded-md border border-admin-border text-sm cursor-pointer",
            !canPrev && "opacity-50 cursor-default",
          )}>
          Назад
        </button>

        {items.map((p, idx) =>
          p === "..." ? (
            <span key={idx} className="px-2 text-sm opacity-60">
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className={cn(
                "min-w-9 h-9 px-3 rounded-md border border-admin-border text-sm cursor-pointer",
                p === page && "bg-gray-900 text-white dark:bg-white dark:text-gray-900",
              )}>
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          disabled={!canNext}
          onClick={() => onChange(page + 1)}
          className={cn(
            "px-3 h-9 rounded-md border border-admin-border text-sm cursor-pointer",
            !canNext && "opacity-50 cursor-default",
          )}>
          Вперёд
        </button>
      </div>
    </div>
  );
}
