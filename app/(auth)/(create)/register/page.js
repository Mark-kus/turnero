"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Sign Up</h1>
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
                src={"/eye/opened.svg"}
                alt="Can view password icon"
              />
            ) : (
              <Image
                width={24}
                height={24}
                className="opacity-50"
                src={"/eye/closed.svg"}
                alt="Can't view password icon"
              />
            )}
          </button>
        </div>
      </label>
      <button className="btn-round btn-h-10 btn btn-primary mb-10 mt-4 w-full">
        Button Text
      </button>
      <div className="flex gap-4">
        <button className="btn-round btn-h-10 btn btn-outline btn-primary btn-wide border-2">
          <Image
            width={24}
            height={24}
            src={"/google.svg"}
            alt="Google brand icon"
          />
          Log in with Google
        </button>
        <button className="btn-round btn-h-10 btn btn-outline btn-primary btn-wide border-2">
          <Image
            width={24}
            height={24}
            src={"/apple.svg"}
            alt="Apple brand icon"
          />
          Log in with Apple
        </button>
      </div>
      <div className="divider my-8"></div>
      <Link href="/login" className="link-hover link text-xs text-primary">
        Already have an account?
      </Link>
    </article>
  );
};

export default Register;
