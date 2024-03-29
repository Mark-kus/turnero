import React from "react";

const ResetPassword = () => {
  return (
    <article>
      <h1 className="text-4xl font-bold">Cambiar contraseña</h1>
      <p className="mb-6 mt-2">
        Ingresá tu nueva contraseña. Debe ser distinta a la contraseña anterior.
        Una vez que confirmado, podrás ingresar a la plataforma con la
        contraseña nueva.
      </p>
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
      <button className="btn-h-10 btn-round btn btn-primary mt-10 w-full">
        Confirmar cambio de contraseña
      </button>
    </article>
  );
};

export default ResetPassword;
