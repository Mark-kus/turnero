import {UpdateProfileDto} from "@/auth/dtos/update-profile.dto";
import {AccountRepository} from "@/auth/contracts/account.repository";
import {EmailSender} from "@/auth/contracts/email.port";
import {TOKEN} from "@/shared/constants";
import {BlobUploader} from "@/auth/contracts/blob-upload.port";

export class UpdateProfileUseCase {
  constructor(
    private repository: AccountRepository,
    private mailer: EmailSender,
    private blobUploader: BlobUploader,
  ) {}

  async execute(dto: UpdateProfileDto) {
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
      const blobUrl = await this.blobUploader.upload(dto.avatar, filename);

      // Borrar anterior si existe
      if (account.avatar_url) {
        const oldFilename = account.avatar_url.split("/").pop();

        if (oldFilename) await this.blobUploader.delete(oldFilename);
      }

      void this.repository.updateAvatar(dto.accountId, blobUrl);
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
