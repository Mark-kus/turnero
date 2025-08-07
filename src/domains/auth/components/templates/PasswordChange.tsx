import {EmailTemplateProps} from "@/shared/types/common";

export default function PasswordChangeTemplate({firstName, tokenizedUrl}: EmailTemplateProps) {
  return (
    <div>
      <h1>Cambio de contraseña, {firstName}!</h1>
      <a href={tokenizedUrl}>Cambiar</a>
    </div>
  );
}
