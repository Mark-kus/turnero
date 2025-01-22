import React from "react";
import Navbar from "../ui/Navbar";

const UserLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;
