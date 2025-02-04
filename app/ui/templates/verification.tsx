import { EmailTemplateProps } from "@/app/types";
import React from "react";

// https://react.email/docs/getting-started/automatic-setup

export const VerifyEmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  tokenizedUrl,
}) => (
  <div>
    <h1>Confirma, {firstName}!</h1>
    <p>
      Hola {firstName}, por favor haz click en el siguiente enlace para
      confirmar tu correo electrónico.
    </p>
    <a href={tokenizedUrl}>Verificar</a>
  </div>
);

export const ChangeEmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  tokenizedUrl,
}) => (
  <div>
    <h1>Cambio de email, {firstName}!</h1>
    <a href={tokenizedUrl}>Verificar</a>
  </div>
);

export const ChangePasswordTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
  tokenizedUrl,
}) => (
  <div>
    <h1>Cambio de contraseña, {firstName}!</h1>
    <a href={tokenizedUrl}>Cambiar</a>
  </div>
);
