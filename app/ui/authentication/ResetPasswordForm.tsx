import React from "react";

const ResetPasswordForm = () => {
  return (
    <form>
      <label className="form-control">
        <span className="mb-1 text-left text-sm">
          Ingresar nueva contraseña
        </span>
        <input
          className="input-unbordered mb-4"
          placeholder="Ingresar contraseña"
        />
      </label>
      <label className="form-control">
        <span className="mb-1 text-left text-sm">Repetir nueva contraseña</span>
        <input className="input-unbordered" placeholder="Repetir contraseña" />
      </label>
      <button className="btn btn-primary btn-h-10 btn-round mt-10 w-full">
        Confirmar cambio de contraseña
      </button>
    </form>
  );
};

export default ResetPasswordForm;
