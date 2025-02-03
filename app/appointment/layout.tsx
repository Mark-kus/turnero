import React from "react";
import Navbar from "@/app/ui/navigation/Navbar";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default UserLayout;
