import React from "react";

const HourCard = ({ hour }) => {
  const [hours, minutes] = hour.time.toString().match(/.{2}/g);
  return (
    <li className="w-full">
      <button
        className="btn-round btn btn-outline btn-primary h-20 w-full border-none bg-white bg-opacity-40 font-medium"
        disabled={hour.taken}
      >
        {hours}:{minutes}
      </button>
    </li>
  );
};

export default HourCard;
