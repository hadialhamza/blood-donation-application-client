import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const DashboardPagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalFiltered,
  itemsPerPage,
  itemName = "items",
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <p className="text-sm font-bold text-zinc-500 dark:text-zinc-500 tabular-nums">
        Showing{" "}
        <span className="text-zinc-900 dark:text-zinc-300">
          {(currentPage - 1) * itemsPerPage + 1}
        </span>{" "}
        to{" "}
        <span className="text-zinc-900 dark:text-zinc-300">
          {Math.min(currentPage * itemsPerPage, totalFiltered)}
        </span>{" "}
        of{" "}
        <span className="text-red-600 dark:text-red-500 font-black">
          {totalFiltered}
        </span>{" "}
        {itemName}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="h-10 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 gap-2 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          Previous
        </Button>

        <div className="flex items-center gap-1.5 px-2 py-1 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "ghost"}
                size="sm"
                className={`w-9 h-9 rounded-xl font-black transition-all duration-300 ${
                  currentPage === pageNum
                    ? "bg-brand-gradient text-white shadow-md shadow-red-500/20 scale-110"
                    : "text-zinc-500 hover:text-red-600 hover:bg-white dark:hover:bg-zinc-900"
                }`}
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="h-10 px-4 rounded-xl border-zinc-200 dark:border-zinc-800 gap-2 font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
        >
          Next
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DashboardPagination;
