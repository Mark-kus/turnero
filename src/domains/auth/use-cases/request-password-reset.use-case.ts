import {RequestPasswordResetDTO} from "@/auth/dtos/request-reset-password.dto";
import {AccountRepository} from "@/auth/ports/account.repository";
import {EmailSender} from "@/auth/ports/email.port";
import {TOKEN} from "@/shared/constants";

export class RequestPasswordResetUseCase {
  constructor(
    private repository: AccountRepository,
    private mailer: EmailSender,
  ) {}

  async execute(dto: RequestPasswordResetDTO) {
    const {email, sessionAccountId} = dto;

    const account = email
      ? await this.repository.findOneByEmail(email)
      : sessionAccountId
        ? await this.repository.findOneById(`${sessionAccountId}`)
        : null;

    if (!account) throw new Error("Account not found.");

    // Check if a password reset request is already in progress
    // If is not, continue creating a new one
    if (account.token_expiry && account.token_expiry > new Date()) {
      throw new Error(
        "A password reset request is already in progress. Please wait for it to expire.",
      );
    }

    const token = TOKEN.getToken();
    const expiry = TOKEN.getExpiryFromNow();

    await this.repository.updateToken(account.account_id, token, expiry);

    const tokenizedUrl = `${process.env.PROJECT_URL}/password/change?token=${token}`;

    await this.mailer.sendChangePassword(account.email, {
      firstName: account.first_name,
      tokenizedUrl,
    });
  }
}
