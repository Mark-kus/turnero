import React from "react";

export const ProfileFormSkeleton = () => {
  return (
    <section>
      <div className="mb-10 flex items-center gap-4">
        <div className="relative inline-block">
          <div className="flex h-[80px] w-[80px] animate-pulse overflow-hidden rounded-full bg-gray-300"></div>
        </div>
        <div className="h-10 w-32 animate-pulse bg-gray-300"></div>
      </div>
      <div className="mb-4 flex w-full gap-4">
        <div className="form-control w-full">
          <div className="mb-1 h-4 w-24 animate-pulse bg-gray-300"></div>
          <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
        </div>
        <div className="form-control w-full">
          <div className="mb-1 h-4 w-24 animate-pulse bg-gray-300"></div>
          <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <div className="form-control w-full">
          <div className="mb-1 h-4 w-32 animate-pulse bg-gray-300"></div>
          <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
        </div>
        <div className="form-control w-full">
          <div className="mb-1 h-4 w-24 animate-pulse bg-gray-300"></div>
          <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
        </div>
      </div>
      <div className="mb-4 flex gap-4">
        <div className="form-control w-full">
          <div className="mb-1 h-4 w-24 animate-pulse bg-gray-300"></div>
          <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
        </div>
        <div className="form-control w-full">
          <div className="mb-1 h-4 w-24 animate-pulse bg-gray-300"></div>
          <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
        </div>
      </div>
      <div className="form-control mb-4 w-full">
        <div className="mb-1 h-4 w-32 animate-pulse bg-gray-300"></div>
        <div className="h-10 w-full animate-pulse bg-gray-300 md:min-w-48"></div>
      </div>
      <div className="btn-primary btn-h-10 btn-round mt-4 w-full animate-pulse border-none bg-gray-300"></div>
      <div className="btn-primary btn-h-10 btn-round mt-4 w-full animate-pulse bg-gray-300"></div>
    </section>
  );
};
