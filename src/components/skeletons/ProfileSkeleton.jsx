import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "@/components/shared/container/Container";

const ProfileSkeleton = () => {
  return (
    <Container>
      <div className="max-w-5xl mx-auto mt-8 space-y-6">
        {/* ProfileHero Skeleton */}
        <div className="relative h-[280px] md:h-80 rounded-3xl overflow-hidden bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
          {/* Cover Image Skeleton */}
          <Skeleton className="absolute inset-0 w-full h-full" />

          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-4">
            {/* Avatar Skeleton */}
            <Skeleton className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-900" />

            {/* Name & Role Skeleton */}
            <div className="text-center space-y-2">
              <Skeleton className="h-8 w-48 mx-auto" />
              <Skeleton className="h-5 w-24 mx-auto" />
            </div>
          </div>
        </div>

        {/* ProfileStats Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-12" />
                </div>
                <Skeleton className="w-10 h-10 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-4 flex flex-col lg:flex-row items-stretch gap-6">
            {/* ProfileAccountVerification Skeleton */}
            <div className="w-full lg:w-1/4 h-full">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6 h-full">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <Skeleton className="h-32 w-full rounded-xl" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>
            </div>

            {/* ProfileImpact Skeleton */}
            <div className="w-full lg:w-3/4">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
                <div className="space-y-2 mb-6">
                  <Skeleton className="h-7 w-40" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-24 w-full rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProfileSkeleton;
