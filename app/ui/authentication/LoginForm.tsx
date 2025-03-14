"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";

import eyeClosed from "@public/eye/closed.svg";
import eyeOpened from "@public/eye/opened.svg";
import { login } from "@/app/lib/actions/accounts";

const LoginForm = () => {
  const [state, action] = useFormState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const cookieMatch = document.cookie.match(/userEmail=([^;]+)/);
    const email = cookieMatch ? cookieMatch[1].replace(/%40/g, "@") : "";
    setUserEmail(email);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  console.log(state);
  return (
    <form action={action} className="min-w-sm">
      <label className="form-control w-full">
        <span className="mb-1 text-sm">Email</span>
        <input
          className="input-unbordered validator"
          type="email"
          required
          placeholder="mail@site.com"
          defaultValue={userEmail}
          name="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
        <div className="validator-hint">Enter valid email address</div>
        {state?.errors?.email && (
          <div className="validator-error">{state.errors.email[0]}</div>
        )}
      </label>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Password</span>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="input-unbordered validator"
            required
            placeholder="Password"
            minLength={7}
            title="Must be more than 7 characters, including numbers, letters and symbols"
            name="password"
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
        <p className="validator-hint">
          Must be more than 7 characters, including
          <br />
          At least one number
          <br />
          At least one letter
          <br />
          At least one symbol
        </p>
      </label>
      <div className="my-2 flex justify-between">
        <label className="label cursor-pointer flex-row-reverse justify-end p-0">
          <span className="label-text ml-2 text-xs">Remember me</span>
          <input
            name="remember_me"
            type="checkbox"
            defaultChecked
            className="checkbox checkbox-xs rounded-xs border-2"
          />
        </label>
        <Link href={"/password/forgot"} className="link-hover link text-xs">
          Forgot Password?
        </Link>
      </div>
      <LoginButton />
      {state?.errors?.submit && (
        <div
          className="alert alert-error mb-10 flex h-10"
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
          <p className="text-sm">{state.errors.submit[0]}</p>
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
      className={`btn btn-primary btn-h-10 btn-round mt-2 mb-10 w-full ${pending ? "btn-disabled" : ""}`}
    >
      Log In
    </button>
  );
}

export default LoginForm;
