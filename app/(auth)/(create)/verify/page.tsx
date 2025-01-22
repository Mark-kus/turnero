import Link from "next/link";

const Verify = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Sign Up</h1>
      <div className="hero">
        <div className="hero-content max-w-2xl flex-col bg-gray-200 p-10 text-justify">
          <h2 className="text-3xl">Enviamos un mail a tu casilla de correo</h2>
          <p className="py-6">
            Para continuar usando la plataforma, necesitamos que valides tu
            cuenta desde el mail que te enviamos a tu casilla de correo:
            a*********t@gmail.com.
          </p>
          <div className="flex gap-4">
            <Link
              href={"/login"}
              className="btn btn-h-10 btn-round w-72 border-none bg-primary-content bg-opacity-40 text-primary"
            >
              Volver
            </Link>
            <Link
              href={"/"}
              className="btn btn-primary btn-h-10 btn-round ml-4 w-72 border-none font-medium"
            >
              Ir a mi correo
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Verify;
