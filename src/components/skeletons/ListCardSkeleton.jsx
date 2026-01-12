import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ListCardSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
            {/* Left side: content */}
            <div className="flex items-start gap-4 flex-1">
              <Skeleton className="w-12 h-12 rounded-lg shrink-0" />
              <div className="space-y-3 w-full">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-5 w-20 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full max-w-md" />
                  <div className="flex gap-4">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: actions */}
            <div className="flex sm:flex-col gap-2 shrink-0">
              <Skeleton className="h-9 w-24 rounded-md" />
              <Skeleton className="h-9 w-24 rounded-md" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCardSkeleton;
