import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container/Container";

const FormSkeleton = () => {
  return (
    <Container>
      <div className="min-h-screen py-8">
        {/* Page Header Skeleton */}
        <div className="mb-8 space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>

        {/* Form Card Skeleton */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 md:p-10 space-y-8 shadow-2xl">
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-px w-full" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-11 w-full rounded-md" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-11 w-full rounded-md" />
                </div>
              </div>
            </div>
          ))}

          <Skeleton className="h-12 w-full rounded-xl" />
        </div>
      </div>
    </Container>
  );
};

export default FormSkeleton;
