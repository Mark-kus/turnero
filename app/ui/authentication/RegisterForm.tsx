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
            type="input"
            className="input-unbordered validator"
            required
            placeholder="First Name"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength={3}
            maxLength={30}
            title="Only letters"
            name="first_name"
          />
          <p className="validator-hint">Must be 3 to 30 characters long</p>
          {state?.errors?.first_name && (
            <span className="text-sm text-error-content">
              {state.errors.first_name[0]}
            </span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input
            type="input"
            className="input-unbordered validator"
            required
            placeholder="Last Name"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            minLength={3}
            maxLength={30}
            title="Only letters"
            name="last_name"
          />
          <p className="validator-hint">Must be 3 to 30 characters long</p>
          {state?.errors?.last_name && (
            <span className="text-sm text-error-content">
              {state.errors.last_name[0]}
            </span>
          )}
        </label>
      </div>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Email</span>
        <input
          className="input-unbordered validator"
          type="email"
          required
          placeholder="mail@site.com"
          name="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
        />
        <div className="validator-hint">Enter valid email address</div>
        {state?.errors?.email && (
          <span className="fieldset-label text-error-content">{state.errors.email[0]}</span>
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
                className="opacity-50"
                src={eyeClosed}
                alt="Can't view password icon"
              />
            )}
          </button>
        </div>
        {state?.errors?.password ? (
          <div className="text-sm text-error-content">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="validator-hint">
            Must be more than 7 characters, including
            <br />
            At least one number
            <br />
            At least one letter
            <br />
            At least one symbol
          </p>
        )}
      </label>
      <SignupButton />
      {state?.errors?.submit && (
        <span className="text-sm text-error-content">{state.errors.submit[0]}</span>
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
      className={`btn btn-primary btn-h-10 btn-round mt-4 mb-10 w-full ${pending ? "btn-disabled" : ""}`}
    >
      {pending ? "Submitting..." : "Sign up"}
    </button>
  );
}

export default RegisterForm;
