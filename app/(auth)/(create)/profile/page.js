import React from "react";

const Profile = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Perfil</h1>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">First Name</span>
          <input className="input-unbordered" placeholder="Placeholder" />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input className="input-unbordered" placeholder="Placeholder" />
        </label>
      </div>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Email</span>
        <input className="input-unbordered" placeholder="Placeholder" />
      </label>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Localidad</span>
        <input className="input-unbordered" placeholder="Placeholder" />
      </label>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Dirección</span>
        <input className="input-unbordered" placeholder="Placeholder" />
      </label>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Número de teléfono</span>
        <input className="input-unbordered" placeholder="Placeholder" />
      </label>
      <button className="btn-h-10 btn-round btn btn-outline btn-primary w-full border-none bg-primary-content bg-opacity-40">
        Editar datos
      </button>
    </article>
  );
};

export default Profile;
