import {ChangePasswordDTO} from "@/auth/dtos/change-password.dto";
import {AccountRepository} from "@/auth/ports/account.repository";
import {HashService} from "@/auth/ports/hash.port";

export class ChangePasswordUseCase {
  constructor(
    private repository: AccountRepository,
    private hasher: HashService,
  ) {}

  async execute(dto: ChangePasswordDTO) {
    const {token, password} = dto;

    const account = await this.repository.findOneByToken(token);

    if (account.token_expiry < new Date()) {
      await this.repository.updateToken(account.account_id, null, null);
      throw new Error("Token expired.");
    }

    const hashedPassword = await this.hasher.hash(password);

    await this.repository.updatePassword(account.account_id, hashedPassword);
  }
}
