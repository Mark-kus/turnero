"use client";
import React, { useState } from "react";
import Image from "next/image";

import eyeClosed from "@/public/eye/closed.svg";
import eyeOpened from "@/public/eye/opened.svg";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form>
      <div className="flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">First Name</span>
          <input placeholder="Placeholder" className="input-unbordered" />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input placeholder="Placeholder" className="input-unbordered" />
        </label>
      </div>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Email</span>
        <input placeholder="Placeholder" className="input-unbordered" />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Password</span>

        <div className="relative">
          <input
            placeholder="Placeholder"
            className="input-unbordered"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 px-4 py-2"
          >
            {showPassword ? (
              <Image
                width={22}
                height={22}
                className="mr-[1px] opacity-50"
                src={eyeOpened}
                alt="Can view password icon"
              />
            ) : (
              <Image
                width={24}
                height={24}
                className="opacity-50"
                src={eyeClosed}
                alt="Can't view password icon"
              />
            )}
          </button>
        </div>
      </label>
      <button className="btn-round btn-h-10 btn btn-primary mb-10 mt-4 w-full">
        Registrarme
      </button>
    </form>
  );
};

export default RegisterForm;
