import {cookies} from "next/headers";
import Link from "next/link";

import {COOKIES} from "@/shared/constants";

const VerifyEmail = () => {
  const accountEmail = cookies().get(COOKIES.ACCOUNT_EMAIL);
  const emailAddress = accountEmail?.value
    ? `${accountEmail.value.substring(0, 2)}${"*".repeat(8)}${accountEmail.value.substring(accountEmail.value.indexOf("@"))}`
    : null;

  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Sign Up</h1>
      <div className="hero">
        <div className="hero-content max-w-2xl flex-col bg-gray-200 p-10 text-justify">
          <h2 className="text-3xl">Enviamos un mail a tu casilla de correo</h2>
          <p className="py-6">
            Para continuar usando la plataforma, necesitamos que valides tu cuenta desde el mail que
            te enviamos a {emailAddress ? <strong>{emailAddress}</strong> : "tu casilla de correo"}
          </p>
          <div className="flex gap-4">
            <Link
              className="btn btn-primary btn-h-10 btn-round ml-4 w-72 border-none font-medium"
              href="/login"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default VerifyEmail;
