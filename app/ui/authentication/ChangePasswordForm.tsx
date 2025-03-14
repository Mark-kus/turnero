"use client";

import { changePassword } from "@/app/lib/actions/accounts";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

const ChangePasswordForm = () => {
  const [state, action] = useFormState(changePassword, undefined);

  const searchParams = useSearchParams();
  const token = searchParams.get("token")?.toString();

  return (
    <form action={action}>
      <input type="hidden" name="token" value={token} />

      <label className="form-control">
        <span className="mb-1 block text-left text-sm">
          Ingresar nueva contraseña
        </span>
        <input
          type="password"
          className="input-unbordered validator"
          required
          placeholder="Password"
          minLength={7}
          title="Must be more than 7 characters, including numbers, letters and symbols"
          name="password"
        />
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
          <p className="fieldset-label my-2 text-left">
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
      <label className="form-control">
        <span className="mb-1 block text-left text-sm">
          Repetir nueva contraseña
        </span>
        <input
          type="password"
          className="input-unbordered validator"
          required
          placeholder="Confirm Password"
          minLength={7}
          title="Must be more than 7 characters, including numbers, letters and symbols"
          name="password_confirmation"
        />
        {state?.errors?.password_confirmation && (
          <span className="text-error-content text-sm">
            {state.errors.password_confirmation[0]}
          </span>
        )}
      </label>
      <LoginButton />
      {state?.errors?.submit && (
        <span className="text-error-content text-sm">
          {state.errors.submit[0]}
        </span>
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
      className={`btn btn-primary btn-h-10 btn-round mt-10 w-full ${pending ? "btn-disabled" : ""}`}
    >
      Confirmar cambio de contraseña
    </button>
  );
}

export default ChangePasswordForm;
