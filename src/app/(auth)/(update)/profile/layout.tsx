import Image from "next/image";
import React from "react";
import defaultImage from "@public/default/image.svg";

import Navbar from "@/shared/components/navigation/Navbar";

const ProfileLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="h-vh-nav flex w-2/5 items-center justify-center bg-gray-200">
          <Image alt="Default Image" height={20} src={defaultImage} width={20} />
        </div>
        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
