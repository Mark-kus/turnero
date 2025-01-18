const Verify = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Sign Up</h1>
      <div className="hero">
        <div className="hero-content flex-col max-w-2xl bg-gray-200 p-10 text-justify">
          <h2 className="text-3xl">
            Enviamos un mail a tu casilla de correo
          </h2>
          <p className="py-6">
            Para continuar usando la plataforma, necesitamos que valides tu
            cuenta desde el mail que te enviamos a tu casilla de correo:
            a*********t@gmail.com.
          </p>
          <div className="flex gap-4">
            <button className="btn-h-10 btn-round btn w-72 border-none bg-primary-content bg-opacity-40 text-primary">
              Volver
            </button>
            <button className="btn-h-10 btn-round btn btn-primary ml-4 w-72 border-none font-medium">
              Ir a mi correo
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Verify;
