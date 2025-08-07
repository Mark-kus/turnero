import React from "react";

import Navbar from "@/shared/components/navigation/Navbar";
import ConfirmedModal from "@/shared/components/modals/ConfirmedModal";

const AppointmentLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      {children}
      <ConfirmedModal />
    </>
  );
};

export default AppointmentLayout;
