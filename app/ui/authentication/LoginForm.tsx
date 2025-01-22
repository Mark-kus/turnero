"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { authenticate } from "@/app/lib/actions/accounts";

import eyeClosed from "@public/eye/closed.svg";
import eyeOpened from "@public/eye/opened.svg";

const LoginForm = () => {
  const [errorMessage, dispatch] = useFormState(authenticate, null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action={dispatch}>
      <label className="form-control w-full">
        <span className="mb-1 text-sm">Email</span>
        <input
          name="username"
          className="input-unbordered"
          placeholder="Placeholder"
        />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Password</span>
        <div className="relative">
          <input
            name="password"
            className="input-unbordered"
            placeholder="Placeholder"
            autoComplete="off"
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
                src={eyeClosed}
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
            name="rememberMe"
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-xs rounded-sm border-2 "
          />
        </label>
        <Link href={"/password/forgot"} className="link-hover link text-xs">
          Forgot Password?
        </Link>
      </div>
      <LoginButton />
      {errorMessage && (
        <div
          className="alert alert-error mb-10 flex h-8"
          aria-live="polite"
          aria-atomic="true"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
    </form>
  );
};

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className={`btn-h-10 btn-round btn btn-primary mb-10 mt-2 w-full ${pending ? "btn-disabled" : ""}`}
    >
      Log In
    </button>
  );
}

export default LoginForm;
