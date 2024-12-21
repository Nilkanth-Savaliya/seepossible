import { usePagination } from "@/hooks/usePagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

interface PaginationProps {
  current_page: number;
  total: number;
  pageSize: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  current_page,
  total,
  pageSize,
  handlePageChange,
}: PaginationProps) {
  const { pageNumbers, isPreviousDisabled, isNextDisabled } = usePagination({
    total,
    currentPage: current_page,
    pageSize,
  });

  const handlePrevious = () => {
    if (!isPreviousDisabled) handlePageChange(current_page - 1);
  };

  const handleNext = () => {
    if (!isNextDisabled) handlePageChange(current_page + 1);
  };

  const handlePageNumber = (pageNumber: number) => {
    handlePageChange(pageNumber);
  };

  return (
    <div className="flex justify-center">
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="hidden cursor-pointer sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <span
                onClick={handlePrevious}
                className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-white focus:z-20 focus:outline-offset-0 ${
                  isPreviousDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </span>
              {pageNumbers.map((pageNumber) => (
                <span
                  key={pageNumber}
                  onClick={() => handlePageNumber(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-medium ring-1 ring-inset ring-gray-300 hover:bg-gray-100 hover:text-primary focus:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    pageNumber === current_page
                      ? "z-10 bg-primary text-white"
                      : "text-gray-700"
                  }`}
                >
                  {pageNumber}
                </span>
              ))}
              <span
                onClick={handleNext}
                className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-white focus:z-20 focus:outline-offset-0 ${
                  isNextDisabled ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </span>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
