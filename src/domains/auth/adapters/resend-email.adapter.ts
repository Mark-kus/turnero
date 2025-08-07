import {Resend} from "resend";

// Keep relative paths for Vercel compatibility
import PasswordChangeTemplate from "../components/templates/PasswordChange";
import EmailChangeTemplate from "../components/templates/EmailChange";
import VerificationTemplate from "../components/templates/Verification";

import {EmailSender} from "@/auth/contracts/email.port";

export class ResendEmailSender implements EmailSender {
  private client = new Resend(process.env.RESEND_API_KEY!);

  private async send(to: string, subject: string, reactTemplate: React.ReactElement) {
    const {error} = await this.client.emails.send({
      from: "Turnero <noreply@resend.dev>",
      to,
      subject,
      react: reactTemplate,
    });

    if (error) throw error;
  }

  async sendEmailVerification(to: string, data: any) {
    await this.send(to, "Verificá tu cuenta", VerificationTemplate(data));
  }

  async sendChangeEmail(to: string, data: any) {
    await this.send(to, "Cambiá tu correo electrónico", EmailChangeTemplate(data));
  }

  async sendChangePassword(to: string, data: any) {
    await this.send(to, "Cambiá tu contraseña", PasswordChangeTemplate(data));
  }
}
