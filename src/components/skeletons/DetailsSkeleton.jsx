import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const DetailsSkeleton = () => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <Skeleton className="h-10 w-48 mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-xl">
              <Skeleton className="h-2 w-full" />
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>

                <Skeleton className="h-24 w-full rounded-2xl" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Skeleton className="h-24 w-full rounded-xl" />
                  <Skeleton className="h-24 w-full rounded-xl" />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-48 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsSkeleton;
