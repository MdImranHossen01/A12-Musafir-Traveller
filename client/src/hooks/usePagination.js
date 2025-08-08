// src/hooks/usePagination.js
import { useState } from 'react';

export const usePagination = (initialPage = 1, initialSize = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialSize);

  const nextPage = () => setCurrentPage(prev => prev + 1);
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const goToPage = (page) => setCurrentPage(Math.max(1, page));
  const changePageSize = (size) => {
    setPageSize(size);
    setCurrentPage(1); // Reset to first page when size changes
  };

  return {
    currentPage,
    pageSize,
    nextPage,
    prevPage,
    goToPage,
    changePageSize,
    offset: (currentPage - 1) * pageSize
  };
};