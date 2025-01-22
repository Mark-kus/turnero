import React from "react";
import Card from "../card/Card";
import CardSquaredImage from "../card/CardSquaredImage";

const SpecialistsListSkeleton = () => {
  return (
    <section className="flex w-full flex-col gap-4 overflow-y-auto">
      {Array.from({ length: 3 }).map((_, index) => (
        <Card
          key={index}
          className={"bg-base-200 animate-pulse"}
          leftSlot={<CardSquaredImage />}
          rightSlot={
            <div className="m-4 flex w-full flex-col">
              <div>
                <p className="font-medium bg-gray-300 h-6 w-3/4 rounded"></p>
                <ul>
                  <li className="text-sm bg-gray-300 h-4 w-1/2 rounded mt-2"></li>
                  <li className="text-sm bg-gray-300 h-4 w-1/3 rounded mt-2"></li>
                  <li className="text-sm bg-gray-300 h-4 w-1/4 rounded mt-2"></li>
                  <li className="text-sm bg-gray-300 h-4 w-1/5 rounded mt-2"></li>
                </ul>
              </div>
              <div className="btn-h-10 btn-round btn mt-2 w-full border-none bg-gray-300 h-10 rounded"></div>
            </div>
          }
        />
      ))}
    </section>
  );
};

export default SpecialistsListSkeleton;
