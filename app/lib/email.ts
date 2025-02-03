import { TemplateType } from "../types";

export async function sendVerifyEmail(
  to: string[],
  template: TemplateType,
  templateData: any,
): Promise<any> {
  const response = await fetch(`${process.env.PROJECT_URL}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, template, templateData }),
  });

  return await response.json();
}
