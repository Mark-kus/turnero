"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Log In</h1>
      <label className="form-control w-full">
        <span className="mb-1 text-sm">Email</span>
        <input className="input-unbordered" placeholder="Placeholder" />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Password</span>
        <div className="relative">
          <input
            className="input-unbordered"
            placeholder="Placeholder"
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
                src={"/eye/closed.svg"}
                className="opacity-50"
                alt="Can't view password icon"
              />
            )}
          </button>
        </div>
        <div className="label">
          <span className="label-text-alt opacity-80">
            It must be a combination of minimum 8 letters, number, and symbols.
          </span>
        </div>
      </label>
      <div className="my-2 flex justify-between">
        <label className="label cursor-pointer flex-row-reverse justify-end p-0">
          <span className="label-text ml-2 text-xs">Remember me</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-xs rounded-sm border-2 "
          />
        </label>
        <Link href={"/password/forgot"} className="link-hover link text-xs">
          Forgot Password?
        </Link>
      </div>
      <button className="btn-h-10 btn-round btn btn-primary mb-10 mt-2 w-full">
        Log In
      </button>
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
      <div className="divider my-8"></div>
      <Link href="/register" className="link-hover link text-xs text-primary">
        No account yet? Sign Up
      </Link>
    </article>
  );
};

export default Login;
