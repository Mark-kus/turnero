import {EmailTemplateProps} from "@/shared/types";

export async function sendEmail(
  to: string[],
  template: string,
  templateData: EmailTemplateProps,
): Promise<any> {
  const response = await fetch(`${process.env.PROJECT_URL}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({to, template, templateData}),
  });

  return await response.json();
}
