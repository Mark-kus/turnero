import ChangePasswordForm from "@/app/ui/authentication/ChangePasswordForm";
import React from "react";

const ChangePassword = () => {
  return (
    <article>
      <h1 className="text-4xl font-bold">Cambiar contraseña</h1>
      <p className="mb-6 mt-2">
        Ingresá tu nueva contraseña. Debe ser distinta a la contraseña anterior.
        Una vez que confirmado, podrás ingresar a la plataforma con la
        contraseña nueva.
      </p>
      <ChangePasswordForm />
    </article>
  );
};

export default ChangePassword;
