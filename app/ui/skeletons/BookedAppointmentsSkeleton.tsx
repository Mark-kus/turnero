import React from "react";

const BookedAppointmentsSkeleton = () => {
  return (
    <div>
      {Array.from(new Array(5)).map((_, index) => (
        <div key={index} style={{ marginBottom: "20px" }}>
          <div className="flex animate-pulse space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 w-3/4 rounded bg-gray-200"></div>
              <div className="space-y-2">
                <div className="h-4 rounded bg-gray-200"></div>
                <div className="h-4 w-5/6 rounded bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookedAppointmentsSkeleton;
