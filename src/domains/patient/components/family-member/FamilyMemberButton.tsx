"use client";

import React from "react";

const FamilyMemberButton = ({disabled}: {disabled: boolean}) => {
  const handleOpen = () => {
    document.querySelector("#confirmation-panel")?.classList.add("hidden");
    document.querySelector("#family-member-form")?.classList.remove("hidden");
  };

  return (
    <button
      className="btn-base-300 btn btn-round border-base-300 text-opacity-60 hover:bg-base-300 mt-2 h-8 min-h-8 border-2 hover:text-black"
      disabled={disabled}
      onClick={handleOpen}
    >
      The appointment is for a family member
    </button>
  );
};

export default FamilyMemberButton;
