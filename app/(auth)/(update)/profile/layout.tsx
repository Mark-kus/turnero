import Image from "next/image";
import React from "react";

import defaultImage from "@public/default/image.svg";
import Navbar from "@/app/ui/navigation/Navbar";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div className="h-vh-nav flex w-2/5 items-center justify-center bg-gray-200">
          <Image
            src={defaultImage}
            alt="Default Image"
            width={20}
            height={20}
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default ProfileLayout;
