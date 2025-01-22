import React from "react";
import Image from "next/image";

import google from "@public/provider/google.svg";
import apple from "@public/provider/apple.svg";

const OAuthButtons = () => {
  return (
    <div className="flex gap-4">
      <button className="btn btn-outline btn-primary btn-wide btn-h-10 btn-round border-2">
        <Image width={24} height={24} src={google} alt="Google brand icon" />
        Log in with Google
      </button>
      <button className="btn btn-outline btn-primary btn-wide btn-h-10 btn-round border-2">
        <Image width={24} height={24} src={apple} alt="Apple brand icon" />
        Log in with Apple
      </button>
    </div>
  );
};

export default OAuthButtons;
