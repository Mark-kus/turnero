import React from "react";
import Image from "next/image";

import defaultImage from "@public/default/image.svg";

const ProfessionalsListSkeleton = () => {
  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className={"card card-side animate-pulse rounded-none bg-base-200"}
        >
          <div className="bg-gray-100 p-2">
            <div className="flex h-full w-40 items-center justify-center rounded-lg border-2 border-base-300 bg-base-200">
              <figure>
                <Image
                  src={defaultImage}
                  alt="Profile image"
                  width={20}
                  height={20}
                />
              </figure>
            </div>
          </div>
          <div className="m-4 flex w-full flex-col">
            <div>
              <p className="h-6 w-2/4 rounded-sm bg-gray-300"></p>
              <ul>
                <li className="mt-2 h-4 w-1/4 rounded-sm bg-gray-300"></li>
                <li className="mt-2 h-4 w-1/3 rounded-sm bg-gray-300"></li>
                <li className="mt-2 h-4 w-1/4 rounded-sm bg-gray-300"></li>
                <li className="mt-2 h-4 w-1/5 rounded-sm bg-gray-300"></li>
              </ul>
            </div>
            <div className="mt-2 h-10 w-full rounded-sm border-none bg-white bg-opacity-40 font-medium text-primary"></div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProfessionalsListSkeleton;
