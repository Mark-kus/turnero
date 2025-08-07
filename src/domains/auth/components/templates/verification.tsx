import {EmailTemplateProps} from "@/shared/types";

export default function VerificationTemplate({firstName, tokenizedUrl}: EmailTemplateProps) {
  return (
    <div>
      <h1>Confirma, {firstName}!</h1>
      <p>
        Hola {firstName}, por favor haz click en el siguiente enlace para confirmar tu correo
        electrónico.
      </p>
      <a href={tokenizedUrl}>Verificar</a>
    </div>
  );
}
