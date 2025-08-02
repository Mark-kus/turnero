import ChangePasswordForm from "@/auth/components/ChangePasswordForm";

const ChangePassword = () => {
  return (
    <article>
      <h1 className="text-4xl font-bold">Cambiar contraseña</h1>
      <p className="mt-2 mb-6">
        Ingresá tu nueva contraseña. Debe ser distinta a la contraseña anterior. Una vez que
        confirmado, podrás ingresar a la plataforma con la contraseña nueva.
      </p>
      <ChangePasswordForm />
    </article>
  );
};

export default ChangePassword;
