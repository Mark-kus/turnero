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
        <span className="mb-1 text-left text-sm">
          Ingresar nueva contraseña
        </span>
        <input
          name="password"
          className="input-unbordered mb-4"
          placeholder="Ingresar contraseña"
        />
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
      <label className="form-control">
        <span className="mb-1 text-left text-sm">Repetir nueva contraseña</span>
        <input
          name="password_confirmation"
          className="input-unbordered"
          placeholder="Repetir contraseña"
        />
        {state?.errors?.password_confirmation && (
          <span className="text-sm text-red-500">
            {state.errors.password_confirmation[0]}
          </span>
        )}
      </label>
      <LoginButton />
      {state?.errors?.submit && (
        <span className="text-sm text-red-500">{state.errors.submit[0]}</span>
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
