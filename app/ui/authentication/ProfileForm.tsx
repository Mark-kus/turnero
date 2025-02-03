"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import defaultProfile from "@/public/default/profile.svg";

import { useFormState } from "react-dom";

import { updateProfile } from "@/app/lib/actions/accounts";
import { Account } from "@/app/types";

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

export const ProfileForm = async ({ account }: { account: Account }) => {
  const [state, action] = useFormState(updateProfile, undefined);
  const [selectedImage, setSelectedImage] = useState(
    account.avatarUrl ?? defaultProfile,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const handleFileChange = (event: FileChangeEvent) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form action={action}>
      <div className="mb-10 flex items-center gap-4">
        <div className="relative inline-block">
          <div className="flex h-[80px] w-[80px] overflow-hidden rounded-full">
            <Image
              width={100}
              height={100}
              className="object-cover"
              src={selectedImage}
              alt="Foto de perfíl del usuario"
            />
          </div>
          <button
            type="button"
            onClick={handleFileUpload}
            className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-white bg-opacity-70 text-sm font-medium text-black opacity-0 transition-opacity duration-300 hover:opacity-100"
          >
            Editar
          </button>
          <input
            type="file"
            accept="image/jpeg, image/png"
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
          <input
            className="input-unbordered"
            placeholder="First Name"
            defaultValue={account.firstName}
          />
          {state?.errors?.first_name && (
            <span className="text-sm text-red-500">
              {state.errors.first_name[0]}
            </span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input
            className="input-unbordered"
            placeholder="Last Name"
            defaultValue={account.lastName}
          />
          {state?.errors?.last_name && (
            <span className="text-sm text-red-500">
              {state.errors.last_name[0]}
            </span>
          )}
        </label>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Fecha de Nacimiento</span>
          <input
            className="input-unbordered"
            placeholder="Fecha de Nacimiento"
            defaultValue={account.birthdate.toISOString().split("T")[0]}
          />
        </label>
        {state?.errors?.birthdate && (
          <span className="text-sm text-red-500">
            {state.errors.birthdate[0]}
          </span>
        )}
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Email</span>
          <input
            className="input-unbordered"
            placeholder="Email"
            defaultValue={account.email}
          />
          {state?.errors?.email && (
            <span className="text-sm text-red-500">
              {state.errors.email[0]}
            </span>
          )}
        </label>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Localidad</span>
          <input
            className="input-unbordered"
            placeholder="Localidad"
            defaultValue={account.city}
          />
          {state?.errors?.city && (
            <span className="text-sm text-red-500">{state.errors.city[0]}</span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Dirección</span>
          <input
            className="input-unbordered"
            placeholder="Dirección"
            defaultValue={account.address}
          />
          {state?.errors?.address && (
            <span className="text-sm text-red-500">
              {state.errors.address[0]}
            </span>
          )}
        </label>
      </div>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Número de teléfono</span>
        <input
          className="input-unbordered"
          placeholder="Número de teléfono"
          defaultValue={account.phone}
        />
        {state?.errors?.phone && (
          <span className="text-sm text-red-500">{state.errors.phone[0]}</span>
        )}
      </label>
      <button className="btn btn-outline btn-primary btn-h-10 btn-round mt-4 w-full border-none bg-primary-content bg-opacity-40">
        Cambiar contraseña
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-h-10 btn-round mt-4 w-full"
      >
        Editar datos
      </button>
    </form>
  );
};
