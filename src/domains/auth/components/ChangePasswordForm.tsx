"use client";

import {useSearchParams} from "next/navigation";
import {useFormState, useFormStatus} from "react-dom";

import {SEARCH_PARAMS} from "@/shared/constants";
import {changePassword} from "@/auth/actions/change-password.action";

const ChangePasswordForm = () => {
  const [state, action] = useFormState(changePassword, undefined);

  const token = useSearchParams().get(SEARCH_PARAMS.TOKEN)?.toString();

  return (
    <form action={action}>
      <input name="token" type="hidden" value={token} />

      <label className="form-control">
        <span className="mb-1 block text-left text-sm">Ingresar nueva contraseña</span>
        <input
          required
          autoComplete="off"
          className="input-unbordered validator"
          minLength={7}
          name="password"
          placeholder="Password"
          title="Must be more than 7 characters, including numbers, letters and symbols"
          type="password"
        />
        {state?.errors?.password && (
          <div className="text-error-content text-sm">
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
        <span className="mb-1 block text-left text-sm">Repetir nueva contraseña</span>
        <input
          required
          autoComplete="off"
          className="input-unbordered validator"
          minLength={7}
          name="passwordConfirmation"
          placeholder="Confirm Password"
          title="Must be more than 7 characters, including numbers, letters and symbols"
          type="password"
        />
        {state?.errors?.passwordConfirmation && (
          <span className="text-error-content text-sm">{state.errors.passwordConfirmation[0]}</span>
        )}
      </label>
      <Button />
      {state?.errors?.submit && (
        <span className="text-error-content text-sm">{state.errors.submit[0]}</span>
      )}
      {state?.errors?.token && (
        <span className="text-error-content text-sm">{state.errors.token[0]}</span>
      )}
    </form>
  );
};

function Button() {
  const {pending} = useFormStatus();

  return (
    <button
      aria-disabled={pending}
      className={`btn btn-primary btn-h-10 btn-round mt-10 w-full ${pending ? "btn-disabled" : ""}`}
      type="submit"
    >
      Confirmar cambio de contraseña
    </button>
  );
}

export default ChangePasswordForm;
