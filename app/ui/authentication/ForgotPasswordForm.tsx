"use client";

import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { startPasswordChange } from "@/app/lib/actions/accounts";

const ForgotPasswordForm = () => {
  const [state, action] = useFormState(startPasswordChange, undefined);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const cookieMatch = document.cookie.match(/userEmail=([^;]+)/);
    const userEmail = cookieMatch ? cookieMatch[1].replace(/%40/g, "@") : "";
    setUserEmail(userEmail);
  }, []);

  return (
    <form action={action}>
      <label className="form-control w-full">
        <span className="mb-1 block text-left">Email Address</span>
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
          <span className="alert-error">{state.errors.email[0]}</span>
        )}
      </label>
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
      className={`btn btn-primary btn-h-10 btn-round mt-4 w-full ${pending ? "btn-disabled" : ""}`}
    >
      Send Reset Link
    </button>
  );
}

export default ForgotPasswordForm;
