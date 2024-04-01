"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";

const ProfileForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <form>
      <div className="mb-10 flex items-center gap-4">
        <div className="relative inline-block">
          <div className="flex h-[80px] w-[80px] overflow-hidden rounded-full">
            <Image
              width={100}
              height={100}
              className="object-cover"
              src={selectedImage ? selectedImage : "/google.svg"}
              alt="Foto de perfíl del usuario"
            />
          </div>
          <button
            type="button"
            onClick={handleFileUpload}
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black bg-opacity-60 text-sm font-medium text-black opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            Editar
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <h1 className="text-4xl font-bold">Perfil</h1>
      </div>
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
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Fecha de Nacimiento</span>
          <input className="input-unbordered" placeholder="Placeholder" />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Email</span>
          <input className="input-unbordered" placeholder="Placeholder" />
        </label>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Localidad</span>
          <input className="input-unbordered" placeholder="Placeholder" />
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Dirección</span>
          <input className="input-unbordered" placeholder="Placeholder" />
        </label>
      </div>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Número de teléfono</span>
        <input className="input-unbordered" placeholder="Placeholder" />
      </label>
      <button className="btn-h-10 btn-round btn btn-outline btn-primary mt-4 w-full border-none bg-primary-content bg-opacity-40">
        Cambiar contraseña
      </button>
      <button className="btn-h-10 btn-round btn btn-primary mt-4 w-full">
        Editar datos
      </button>
    </form>
  );
};

export default ProfileForm;
