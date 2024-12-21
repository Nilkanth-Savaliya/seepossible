import { useMemo } from 'react'

interface UsePaginationProps {
  total: number
  currentPage: number
  pageSize: number
  maxPageButtons?: number
}

export const usePagination = ({
  total,
  currentPage,
  pageSize,
  maxPageButtons = 5,
}: UsePaginationProps) => {
  const totalPages = Math.ceil(total / pageSize)

  const { startPage, endPage, pageNumbers } = useMemo(() => {
    let startPage = Math.max(currentPage - Math.floor(maxPageButtons / 2), 1)
    const endPage = Math.min(startPage + maxPageButtons - 1, totalPages)

    if (endPage === totalPages) {
      startPage = Math.max(totalPages - maxPageButtons + 1, 1)
    }

    const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    )

    return { startPage, endPage, pageNumbers }
  }, [currentPage, maxPageButtons, totalPages])

  const isPreviousDisabled = currentPage === 1
  const isNextDisabled = currentPage === totalPages

  return {
    totalPages,
    startPage,
    endPage,
    pageNumbers,
    isPreviousDisabled,
    isNextDisabled,
  }
}
