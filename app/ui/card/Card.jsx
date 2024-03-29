import React from "react";

const Card = ({ className, rightSlot, leftSlot }) => {
  return (
    <div className={`card card-side rounded-none ${className}`}>
      {leftSlot}
      {rightSlot}
    </div>
  );
};

export default Card;
