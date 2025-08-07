"use client";

import React, {useState} from "react";
import Image from "next/image";
import {useFormState, useFormStatus} from "react-dom";

import eyeClosed from "@/public/eye/closed.svg";
import eyeOpened from "@/public/eye/opened.svg";
import {signup} from "@/auth/actions/signup.action";

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
            required
            className="input-unbordered validator"
            maxLength={30}
            minLength={3}
            name="firstName"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            placeholder="First Name"
            title="Only letters"
            type="input"
          />
          <p className="validator-hint">Must be 3 to 30 characters long</p>
          {state?.errors?.firstName && (
            <span className="text-error-content text-sm">{state.errors.firstName[0]}</span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input
            required
            className="input-unbordered validator"
            maxLength={30}
            minLength={3}
            name="lastName"
            pattern="[A-Za-z][A-Za-z0-9\-]*"
            placeholder="Last Name"
            title="Only letters"
            type="input"
          />
          <p className="validator-hint">Must be 3 to 30 characters long</p>
          {state?.errors?.lastName && (
            <span className="text-error-content text-sm">{state.errors.lastName[0]}</span>
          )}
        </label>
      </div>
      <label className="form-control mt-4 w-full">
        <span className="mb-1 text-sm">Email</span>
        <input
          required
          className="input-unbordered validator"
          name="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          placeholder="mail@site.com"
          type="email"
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
            required
            autoComplete="off"
            className="input-unbordered validator"
            minLength={7}
            name="password"
            placeholder="Password"
            title="Must be more than 7 characters, including numbers, letters and symbols"
            type={showPassword ? "text" : "password"}
          />
          <button
            className="absolute inset-y-0 right-0 px-4 py-2"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <Image
                alt="Can view password icon"
                className="mr-[1px] cursor-pointer opacity-50"
                height={22}
                src={eyeOpened}
                width={22}
              />
            ) : (
              <Image
                alt="Can't view password icon"
                className="cursor-pointer opacity-50"
                height={24}
                src={eyeClosed}
                width={24}
              />
            )}
          </button>
        </div>
        {state?.errors?.password ? (
          <div className="text-error-content text-sm">
            <p>Password must:</p>
            <ul>
              {state.errors.password.map((error) => (
                <li key={error}>- {error}</li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="validator-hint">
            <p>Must be more than 7 characters, including</p>
            <p>At least one number</p>
            <p>At least one letter</p>
            <p>At least one symbol</p>
          </div>
        )}
      </label>
      <Button />
      {state?.errors?.submit && (
        <span className="text-error-content text-sm">{state.errors.submit[0]}</span>
      )}
    </form>
  );
};

function Button() {
  const {pending} = useFormStatus();

  return (
    <button
      className={`btn btn-primary btn-h-10 btn-round mt-4 mb-10 w-full ${pending ? "btn-disabled" : ""}`}
      disabled={pending}
      type="submit"
    >
      {pending ? "Submitting..." : "Sign up"}
    </button>
  );
}

export default RegisterForm;
