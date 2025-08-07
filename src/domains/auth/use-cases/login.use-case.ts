import {LoginDto} from "@/auth/dtos/login.dto";
import {AccountRepository} from "@/auth/contracts/account.repository";
import {Hasher} from "@/auth/contracts/hash.port";
import {SessionData} from "@/shared/types/auth";

export class LoginUseCase {
  constructor(
    private repository: AccountRepository,
    private hasher: Hasher,
  ) {}

  async execute(dto: LoginDto): Promise<SessionData> {
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
