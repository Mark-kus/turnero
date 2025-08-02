import React from "react";
import {Resend} from "resend";

import {
  VerifyEmailTemplate,
  ChangePasswordTemplate,
  ChangeEmailTemplate,
} from "@/auth/components/templates/verification";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {to, template, templateData} = await request.json();

    if (to === undefined || template === undefined || templateData === undefined) {
      return Response.json({error: "Missing parameters"}, {status: 500});
    }

    const options = {
      from: "Turnero <noreply@resend.dev>",
      to,
      subject: "Hello world",
      react: null as React.ReactElement | null,
    };

    switch (template) {
      case "verifyEmail":
        options.react = VerifyEmailTemplate(templateData) as React.ReactElement;
        break;
      case "changePassword":
        options.react = ChangePasswordTemplate(templateData) as React.ReactElement;
        break;
      case "changeEmail":
        options.react = ChangeEmailTemplate(templateData) as React.ReactElement;
        break;
      default:
        return Response.json({error: "Invalid template"}, {status: 400});
    }

    const {data, error} = await resend.emails.send(options);

    if (error) {
      return Response.json({error}, {status: 500});
    }

    return Response.json({data});
  } catch (error) {
    return Response.json({error}, {status: 500});
  }
}
