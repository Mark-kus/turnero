import {PutBlobResult} from "@vercel/blob";

import {UpdateProfileDTO} from "@/auth/dtos/update-profile.dto";
import {AccountRepository} from "@/auth/ports/account.repository";
import {EmailSender} from "@/auth/ports/email.port";
import {TOKEN} from "@/shared/constants";

export class UpdateProfileUseCase {
  constructor(
    private repository: AccountRepository,
    private mailer: EmailSender,
  ) {}

  async execute(dto: UpdateProfileDTO) {
    const account = await this.repository.findOneById(dto.accountId);

    void this.repository.updateDetails(
      dto.accountId,
      dto.firstName,
      dto.lastName,
      dto.birthdate,
      dto.city,
      dto.address,
      dto.phone,
    );

    // If avatar is provided, upload it, update the account and delete the old one
    if (dto.avatar) {
      const filename = crypto.randomUUID();
      const response = await fetch(
        `${process.env.PROJECT_URL}/api/avatar/upload?filename=${filename}`,
        {
          method: "POST",
          body: dto.avatar,
        },
      );
      const newBlob = (await response.json()) as PutBlobResult;

      if (account.avatar_url) {
        fetch(
          `${process.env.PROJECT_URL}/api/avatar/upload?filename=${account.avatar_url.split("/").pop()}`,
          {method: "DELETE"},
        );
      }

      void this.repository.updateAvatar(dto.accountId, newBlob.url);
    }

    // If email has changed, send verification email
    if (account.email !== dto.email) {
      const isEmailAvailable = await this.repository.isEmailAvailable(dto.email, dto.accountId);

      if (!isEmailAvailable) throw new Error("Email already exists.");

      const token = TOKEN.getToken();
      const tokenExpiry = TOKEN.getExpiryFromNow();

      const tokenizedUrl = `${process.env.PROJECT_URL}/api/verify-email?token=${token}`;
      const emailData = {
        firstName: dto.firstName,
        tokenizedUrl,
      };

      void this.mailer.sendChangeEmail(dto.email, emailData);

      void this.repository.updateToken(dto.accountId, token, tokenExpiry);
      void this.repository.updateEmail(dto.accountId, dto.email);
    }
  }
}
