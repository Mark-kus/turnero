import React from "react";

export const VerifyEmailTemplate: React.FC<
  Readonly<{
    firstName: string;
  }>
> = ({ firstName }) => (
  <div>
    <h1>Confirma, {firstName}!</h1>
  </div>
);

export const ChangePasswordTemplate: React.FC<
  Readonly<{
    firstName: string;
  }>
> = ({ firstName }) => (
  <div>
    <h1>Cambio de contraseña, {firstName}!</h1>
  </div>
);
