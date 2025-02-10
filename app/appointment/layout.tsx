import React from "react";
import Navbar from "@/app/ui/navigation/Navbar";
import ConfirmedModal from "../ui/modals/ConfirmedModal";

const UserLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <ConfirmedModal />
    </>
  );
};

export default UserLayout;
