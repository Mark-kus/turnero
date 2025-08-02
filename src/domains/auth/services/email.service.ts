import {EmailSender} from "../ports/email.port";

import {sendEmail} from "@/shared/services/email.client";
import {EmailTemplateProps} from "@/shared/types";

export class EmailService implements EmailSender {
  async sendVerificationEmail(email: string, data: EmailTemplateProps): Promise<void> {
    const {error} = await sendEmail([email], "verifyEmail", data);

    if (error) throw new Error("Failed to send email.");
  }

  async sendChangeEmail(email: string, data: EmailTemplateProps): Promise<void> {
    const {error} = await sendEmail([email], "changeEmail", data);

    if (error) throw new Error("Failed to send email.");
  }

  async sendChangePassword(email: string, data: EmailTemplateProps): Promise<void> {
    const {error} = await sendEmail([email], "changePassword", data);

    if (error) throw new Error("Failed to send email.");
  }
}
