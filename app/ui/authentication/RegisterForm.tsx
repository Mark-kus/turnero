"use client";

import React, { useState } from "react";
import Image from "next/image";

import eyeClosed from "@/public/eye/closed.svg";
import eyeOpened from "@/public/eye/opened.svg";
import { signup } from "@/app/lib/actions/accounts";
import { useFormState, useFormStatus } from "react-dom";

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [state, action] = useFormState(signup, undefined);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form action={action}>
      <div className="flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">First Name</span>
          <input
            name="first_name"
            placeholder="Placeholder"
            className="input-unbordered"
          />
          {state?.errors?.first_name && (
            <span className="text-sm text-red-500">
              {state.errors.first_name[0]}
            </span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input
            name="last_name"
            placeholder="Placeholder"
            className="input-unbordered"
          />
          {state?.errors?.last_name && (
            <span className="text-sm text-red-500">
              {state.errors.last_name[0]}
            </span>
          )}
        </label>
      </div>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Email</span>
        <input
          name="email"
          placeholder="Placeholder"
          className="input-unbordered"
        />
        {state?.errors?.email && (
          <span className="text-sm text-red-500">{state.errors.email[0]}</span>
        )}
      </label>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Password</span>
        <div className="relative">
          <input
            name="password"
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
        {state?.errors?.password && (
          <div className="text-sm text-red-500">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        )}
      </label>
      <SignupButton />
      {state?.errors?.submit && (
        <span className="text-sm text-red-500">{state.errors.submit[0]}</span>
      )}
    </form>
  );
};

function SignupButton() {
  const { pending } = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      type="submit"
      className={`btn btn-primary btn-h-10 btn-round mb-10 mt-4 w-full ${pending ? "btn-disabled" : ""}`}
    >
      {pending ? "Submitting..." : "Sign up"}
    </button>
  );
}

export default RegisterForm;
