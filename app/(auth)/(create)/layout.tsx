import Image from "next/image";
import React from "react";

import defaultImage from "@public/default/image.svg";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <div className="flex h-screen w-2/5 items-center justify-center bg-gray-200">
        <Image src={defaultImage} alt="Default Image" width={20} height={20} />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
