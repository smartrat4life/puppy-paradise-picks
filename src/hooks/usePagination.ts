
import { useState, useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
}

export const usePagination = <T>({ items, itemsPerPage }: UsePaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = useMemo(() => {
    // Show all items from start up to current page * itemsPerPage
    const endIndex = currentPage * itemsPerPage;
    return items.slice(0, endIndex);
  }, [items, currentPage, itemsPerPage]);

  const hasMoreItems = useMemo(() => {
    return currentPage * itemsPerPage < items.length;
  }, [items.length, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(items.length / itemsPerPage);
  }, [items.length, itemsPerPage]);

  const loadMore = () => {
    if (hasMoreItems) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const reset = () => {
    setCurrentPage(1);
  };

  return {
    paginatedItems,
    hasMoreItems,
    totalPages,
    currentPage,
    loadMore,
    reset,
    totalItems: items.length,
    showingItems: paginatedItems.length,
  };
};
