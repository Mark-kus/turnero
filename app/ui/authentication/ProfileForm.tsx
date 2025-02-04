"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import defaultProfile from "@/public/default/profile.svg";

import { useFormState } from "react-dom";

import { startPasswordChange, updateProfile } from "@/app/lib/actions/accounts";
import { Account } from "@/app/types";

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & { files: FileList };
}

export const ProfileForm = ({ account }: { account: Account }) => {
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

  const isDisabled = !account.accountId;

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
            disabled={isDisabled}
          >
            Editar
          </button>
          <input
            name="avatar"
            type="file"
            accept="image/jpeg, image/png"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: "none" }}
            disabled={isDisabled}
          />
        </div>
        <h1 className="text-4xl font-bold">Perfil</h1>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">First Name</span>
          <input
            name="first_name"
            className="input-unbordered"
            placeholder="First Name"
            defaultValue={account.firstName}
            disabled={isDisabled}
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
            name="last_name"
            className="input-unbordered"
            placeholder="Last Name"
            defaultValue={account.lastName}
            disabled={isDisabled}
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
            name="birthdate"
            className="input-unbordered"
            placeholder="Fecha de Nacimiento"
            defaultValue={
              account.birthdate
                ? account.birthdate.toISOString().split("T")[0]
                : ""
            }
            disabled={isDisabled}
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
            name="email"
            className="input-unbordered"
            placeholder="Email"
            defaultValue={account.email}
            disabled={isDisabled}
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
            name="city"
            className="input-unbordered"
            placeholder="Localidad"
            defaultValue={account.city}
            disabled={isDisabled}
          />
          {state?.errors?.city && (
            <span className="text-sm text-red-500">{state.errors.city[0]}</span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Dirección</span>
          <input
            name="address"
            className="input-unbordered"
            placeholder="Dirección"
            defaultValue={account.address}
            disabled={isDisabled}
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
          name="phone"
          className="input-unbordered"
          placeholder="Número de teléfono"
          defaultValue={account.phone}
          disabled={isDisabled}
        />
        {state?.errors?.phone && (
          <span className="text-sm text-red-500">{state.errors.phone[0]}</span>
        )}
      </label>
      <button
        onClick={async () => {
          const formData = new FormData();
          await startPasswordChange(undefined, formData);
        }}
        type="button"
        className="btn btn-outline btn-primary btn-h-10 btn-round mt-4 w-full border-none bg-primary-content bg-opacity-40"
        disabled={isDisabled}
      >
        Cambiar contraseña
      </button>
      <button
        type="submit"
        className="btn btn-primary btn-h-10 btn-round mt-4 w-full"
        disabled={isDisabled}
      >
        Editar datos
      </button>
      {state?.errors?.submit && (
        <span className="text-sm text-red-500">{state.errors.submit[0]}</span>
      )}
    </form>
  );
};
