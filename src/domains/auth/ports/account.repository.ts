import {AccountCreateData} from "@/auth/dtos/create-account.dto";
import {AccountEntity, AccountEntityWithToken} from "@/auth/entities/account.entity";

export interface AccountRepository {
  isEmailAvailable(email: string, ignoreAccountId?: string): Promise<boolean>;
  findOneByEmail(email: string): Promise<AccountEntity>;
  findOneById(id: string): Promise<AccountEntity>;
  findOneByToken(token: string): Promise<AccountEntityWithToken>;
  create(data: AccountCreateData): Promise<void>;
  updateDetails(
    accountId: string,
    firstName: string,
    lastName: string,
    birthdate: string | null,
    city: string | null,
    address: string | null,
    phone: string | null,
  ): Promise<void>;
  updatePassword(accountId: string, hashedPassword: string): Promise<void>;
  updateEmail(accountId: string, email: string): Promise<void>;
  updateToken(accountId: string, token: string | null, tokenExpiry: Date | null): Promise<void>;
  updateAvatar(accountId: string, avatarUrl: string | null): Promise<void>;
}
