import {EmailTemplateProps} from "@/shared/types/common";

export interface EmailSender {
  sendEmailVerification(email: string, data: EmailTemplateProps): Promise<void>;
  sendChangeEmail(email: string, data: EmailTemplateProps): Promise<void>;
  sendChangePassword(email: string, data: EmailTemplateProps): Promise<void>;
}
