import {LoginDTO} from "@/auth/dtos/login.dto";
import {AccountRepository} from "@/auth/ports/account.repository";
import {HashService} from "@/auth/ports/hash.port";
import {SessionData} from "@/shared/types";

export class LoginUseCase {
  constructor(
    private repository: AccountRepository,
    private hasher: HashService,
  ) {}

  async execute(dto: LoginDTO): Promise<SessionData> {
    const account = await this.repository.findOneByEmail(dto.email);

    const isValid = await this.hasher.compare(dto.password, account.hashed_password);

    if (!isValid) throw new Error("Credentials are invalid.");

    if (!account.enabled) throw new Error("Account is not verified.");

    return {
      accountId: account.account_id,
      role: account.role,
      avatarUrl: account.avatar_url,
    };
  }
}
