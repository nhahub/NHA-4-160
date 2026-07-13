// src/hooks/usePagination.js
// src/hooks/usePagination.js
import { useMemo, useState } from "react";

export function usePagination(items = [], pageSize = 3) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const goToPage = (nextPage) => {
    setPage(Math.min(Math.max(1, nextPage), totalPages));
  };

  const nextPage = () => goToPage(page + 1);
  const prevPage = () => goToPage(page - 1);

  return {
    page,
    totalPages,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  };
}