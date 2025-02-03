"use client";

import React, { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { startPasswordChange } from "@/app/lib/actions/accounts";

const ForgotPasswordForm = () => {
  const [state, action] = useFormState(startPasswordChange, undefined);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const cookieMatch = document.cookie.match(/userEmail=([^;]+)/);
    const email = cookieMatch ? cookieMatch[1].replace(/%40/g, "@") : "";
    setEmail(email);
  }, []);

  return (
    <form action={action}>
      <label className="form-control">
        <span className="mb-1 text-left">Email Address</span>
        <input
          name="email"
          placeholder="Enter personal or work email address"
          className="input-unbordered"
          defaultValue={email}
        />
        {state?.errors?.email && (
          <span className="text-sm text-red-500">{state.errors.email[0]}</span>
        )}
      </label>
      <LoginButton />
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
