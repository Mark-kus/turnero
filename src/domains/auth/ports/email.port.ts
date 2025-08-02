import {EmailTemplateProps} from "@/shared/types";

export interface EmailSender {
  sendVerificationEmail(email: string, data: EmailTemplateProps): Promise<void>;
  sendChangeEmail(email: string, data: EmailTemplateProps): Promise<void>;
  sendChangePassword(email: string, data: EmailTemplateProps): Promise<void>;
}
