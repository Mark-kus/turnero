"use client";

import {useFormState, useFormStatus} from "react-dom";

import {forgotPassword} from "@/auth/actions/forgot-password.action";

const ForgotPasswordForm = ({accountEmail}: {accountEmail: string | undefined}) => {
  const [state, action] = useFormState(forgotPassword, undefined);

  return (
    <form action={action}>
      <label className="form-control w-full">
        <span className="mb-1 block text-left">Email Address</span>
        <input
          required
          className="input-unbordered validator"
          defaultValue={accountEmail}
          name="email"
          pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
          placeholder="mail@site.com"
          type="email"
        />
        <div className="validator-hint">Enter valid email address</div>
        {state?.errors?.email && <span className="alert-error">{state.errors.email[0]}</span>}
      </label>
      <Button />
      {state?.errors?.submit && (
        <div
          aria-atomic="true"
          aria-live="polite"
          className="alert alert-error mt-4 mb-10 flex h-10"
          role="alert"
        >
          <svg
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          <p className="text-sm">{state.errors.submit[0]}</p>
        </div>
      )}
    </form>
  );
};

function Button() {
  const {pending} = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className={`btn btn-primary btn-h-10 btn-round mt-4 w-full ${pending ? "btn-disabled" : ""}`}
      type="submit"
    >
      Send Reset Link
    </button>
  );
}

export default ForgotPasswordForm;
