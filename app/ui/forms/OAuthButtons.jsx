import React from "react";
import Image from "next/image";

const OAuthButtons = () => {
  return (
    <div className="flex gap-4">
      <button className="btn-h-10 btn-round btn btn-outline btn-primary btn-wide border-2">
        <Image
          width={24}
          height={24}
          src={"/google.svg"}
          alt="Google brand icon"
        />
        Log in with Google
      </button>
      <button className="btn-h-10 btn-round btn btn-outline btn-primary btn-wide border-2">
        <Image
          width={24}
          height={24}
          src={"/apple.svg"}
          alt="Apple brand icon"
        />
        Log in with Apple
      </button>
    </div>
  );
};

export default OAuthButtons;
