import ProfileContainer from './container';
import React, { Suspense } from 'react';
import { Skeleton } from '../(components)/ui/skeleton';
import { SkeletonCard } from '../(components)/layouts/Header';


export default function Page() {
  return (
    <>
      <ProfileContainer />
    </>
  );


  //   <Suspense fallback={<SkeletonLoadingGrid />}>
  //   <Profile />
  // </Suspense>
  // Skeleton loading component with grid layout

}

export function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-2 pl-0">
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
      <div className="p-2 pl-0">
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
      <div className="p-2 pl-0">
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-full mt-2" />
      </div>
    </div>
  );
}
