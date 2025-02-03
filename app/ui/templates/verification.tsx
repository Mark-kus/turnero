import React from "react";

export const VerifyEmailTemplate: React.FC<
  Readonly<{
    firstName: string;
    verificationLink: string;
  }>
> = ({ firstName, verificationLink }) => (
  <div>
    <h1>Confirma, {firstName}!</h1>
    <p>
      Hola {firstName}, por favor haz click en el siguiente enlace para
      confirmar tu correo electrónico.
    </p>
    <a href={verificationLink}>Verificar</a>
  </div>
);

export const ChangeEmailTemplate: React.FC<
  Readonly<{
    firstName: string;
    verificationLink: string;
  }>
> = ({ firstName, verificationLink }) => (
  <div>
    <h1>Cambio de email, {firstName}!</h1>
    <a href={verificationLink}>Verificar</a>
  </div>
);

export const ChangePasswordTemplate: React.FC<
  Readonly<{
    firstName: string;
    passwordChangeLink: string;
  }>
> = ({ firstName, passwordChangeLink }) => (
  <div>
    <h1>Cambio de contraseña, {firstName}!</h1>
    <a href={passwordChangeLink}>Cambiar</a>
  </div>
);
