import {EmailTemplateProps} from "@/shared/types/common";

export default function EmailChangeTemplate({firstName, tokenizedUrl}: EmailTemplateProps) {
  return (
    <div>
      <h1>Cambio de email, {firstName}!</h1>
      <a href={tokenizedUrl}>Verificar</a>
    </div>
  );
}
