"use client";

import React from "react";

const FamilyMemberButton = ({ disabled }: { disabled: boolean }) => {
  const handleOpen = () => {
    document.querySelector("#confirmation-panel")?.classList.add("hidden");
    document.querySelector("#additional-form")?.classList.remove("hidden");
  };

  return (
    <button
      onClick={handleOpen}
      disabled={disabled}
      className="btn-base-300 btn btn-round mt-2 h-8 min-h-8 border-2 border-base-300 text-opacity-60 hover:bg-base-300 hover:text-black"
    >
      The appointment is for a family member
    </button>
  );
};

export default FamilyMemberButton;
