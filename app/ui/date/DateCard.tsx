import React from "react";

const DateCard = ({ date }) => {
  return (
    <li className="my-4">
      <button className="btn-round btn btn-outline btn-primary w-full border-none bg-white bg-opacity-40 font-medium">
        {date}
      </button>
    </li>
  );
};

export default DateCard;
