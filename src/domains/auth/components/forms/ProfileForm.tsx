"use client";

import React, {useRef, useState} from "react";
import Image from "next/image";
import {useFormState} from "react-dom";

import defaultProfile from "@/public/default/profile.svg";
import {requestPasswordReset} from "@/auth/actions/request-password-reset.action";
import {AccountDto} from "@/auth/dtos/account.dto";
import {updateProfile} from "@/auth/actions/update-profile.action";

interface FileChangeEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {files: FileList};
}

export const ProfileForm = ({account}: {account: AccountDto}) => {
  const [state, action] = useFormState(updateProfile, undefined);
  const [selectedImage, setSelectedImage] = useState(account.avatarUrl ?? defaultProfile);
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
              priority
              alt="Foto de perfíl del usuario"
              className="object-cover"
              height={100}
              src={selectedImage}
              width={100}
            />
          </div>
          <button
            className="bg-opacity-70 absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-white text-sm font-medium text-black opacity-0 transition-opacity duration-300 hover:opacity-100"
            disabled={isDisabled}
            type="button"
            onClick={handleFileUpload}
          >
            Editar
          </button>
          <input
            ref={fileInputRef}
            accept="image/jpeg, image/png"
            disabled={isDisabled}
            name="avatar"
            style={{display: "none"}}
            type="file"
            onChange={handleFileChange}
          />
        </div>
        {state?.errors?.avatar && (
          <span className="text-sm text-red-500">{state.errors.avatar[0]}</span>
        )}
        <h1 className="text-4xl font-bold">Perfil</h1>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">First Name</span>
          <input
            className="input-unbordered"
            defaultValue={account.firstName}
            disabled={isDisabled}
            name="firstName"
            placeholder="First Name"
          />
          {state?.errors?.firstName && (
            <span className="text-sm text-red-500">{state.errors.firstName[0]}</span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Last Name</span>
          <input
            className="input-unbordered"
            defaultValue={account.lastName}
            disabled={isDisabled}
            name="lastName"
            placeholder="Last Name"
          />
          {state?.errors?.lastName && (
            <span className="text-sm text-red-500">{state.errors.lastName[0]}</span>
          )}
        </label>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Fecha de Nacimiento</span>
          <input
            required
            className="input-unbordered validator"
            defaultValue={
              account.birthdate ? new Date(account.birthdate).toISOString().split("T")[0] : ""
            }
            disabled={isDisabled}
            max={new Date().toISOString().split("T")[0]}
            min={new Date("1900-01-01").toISOString().split("T")[0]}
            name="birthdate"
            placeholder="Pick a date"
            type="date"
          />
        </label>
        {state?.errors?.birthdate && (
          <span className="text-sm text-red-500">{state.errors.birthdate[0]}</span>
        )}
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Email</span>
          <input
            className="input-unbordered"
            defaultValue={account.email}
            disabled={isDisabled}
            name="email"
            placeholder="Email"
          />
          {state?.errors?.email && (
            <span className="text-sm text-red-500">{state.errors.email[0]}</span>
          )}
        </label>
      </div>
      <div className="mb-4 flex gap-4">
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Localidad</span>
          <input
            className="input-unbordered"
            defaultValue={account.city ?? ""}
            disabled={isDisabled}
            name="city"
            placeholder="Localidad"
          />
          {state?.errors?.city && (
            <span className="text-sm text-red-500">{state.errors.city[0]}</span>
          )}
        </label>
        <label className="form-control w-full">
          <span className="mb-1 text-sm">Dirección</span>
          <input
            className="input-unbordered"
            defaultValue={account.address ?? ""}
            disabled={isDisabled}
            name="address"
            placeholder="Dirección"
          />
          {state?.errors?.address && (
            <span className="text-sm text-red-500">{state.errors.address[0]}</span>
          )}
        </label>
      </div>
      <label className="form-control mb-4 w-full">
        <span className="mb-1 text-sm">Número de teléfono</span>
        <input
          className="input-unbordered"
          defaultValue={account.phone ?? ""}
          disabled={isDisabled}
          name="phone"
          placeholder="Número de teléfono"
        />
        {state?.errors?.phone && (
          <span className="text-sm text-red-500">{state.errors.phone[0]}</span>
        )}
      </label>
      <button
        className="btn btn-outline btn-primary btn-h-10 btn-round bg-primary-content bg-opacity-40 mt-4 w-full border-none"
        disabled={isDisabled}
        type="button"
        onClick={async () => {
          const formData = new FormData();

          await requestPasswordReset(undefined, formData);
        }}
      >
        Cambiar contraseña
      </button>
      <button
        className="btn btn-primary btn-h-10 btn-round mt-4 w-full"
        disabled={isDisabled}
        type="submit"
      >
        Editar datos
      </button>
      {state?.errors?.submit && (
        <span className="text-sm text-red-500">{state.errors.submit[0]}</span>
      )}
    </form>
  );
};
