import { EmailTemplateProps } from "@/app/types";

export async function sendVerifyEmail(
  to: string[],
  templateData: EmailTemplateProps,
): Promise<any> {
  const response = await fetch(`${process.env.PROJECT_URL}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, template: "verifyEmail", templateData }),
  });

  return await response.json();
}

export async function sendChangeEmail(
  to: string[],
  templateData: EmailTemplateProps,
): Promise<any> {
  const response = await fetch(`${process.env.PROJECT_URL}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, template: "changeEmail", templateData }),
  });

  return await response.json();
}

export async function sendChangePassword(
  to: string[],
  templateData: EmailTemplateProps,
): Promise<any> {
  const response = await fetch(`${process.env.PROJECT_URL}/api/send-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ to, template: "changePassword", templateData }),
  });

  return await response.json();
}
