import {sql} from "@vercel/postgres";

import {AccountRepository} from "@/auth/contracts/account.repository";
import {AccountCreateData} from "@/auth/dtos/create-account.dto";
import {AccountEntity, AccountEntityWithToken} from "@/auth/dtos/account.entity";

export class VercelAccountRepository implements AccountRepository {
  async isEmailAvailable(email: string, ignoreAccountId: string = "-1"): Promise<boolean> {
    const res = await sql`
      SELECT COUNT(*) FROM accounts WHERE email = ${email} AND account_id != ${ignoreAccountId} LIMIT 1
    `;

    return Number(res.rows[0].count) === 0;
  }

  async findOneById(id: string): Promise<AccountEntity> {
    const res = await sql`
      SELECT * FROM accounts WHERE account_id = ${id}
    `;

    if (res.rows.length === 0) throw new Error("Account not found");

    return res.rows[0] as AccountEntity;
  }

  async findOneByEmail(email: string): Promise<AccountEntity> {
    const res = await sql`
      SELECT * FROM accounts WHERE email = ${email} LIMIT 1
    `;

    if (res.rows.length === 0) throw new Error("Account not found");

    return res.rows[0] as AccountEntity;
  }

  async findOneByToken(token: string): Promise<AccountEntityWithToken> {
    const res = await sql`
      SELECT * FROM accounts WHERE token = ${token} LIMIT 1
    `;

    if (res.rows.length === 0) throw new Error("Account not found");

    return res.rows[0] as AccountEntityWithToken;
  }

  async create({
    firstName,
    lastName,
    email,
    hashedPassword,
    token,
    tokenExpiry,
  }: AccountCreateData): Promise<void> {
    await sql`
      INSERT INTO accounts (first_name, last_name, email, hashed_password, token, token_expiry)
      VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${hashedPassword},
        ${token},
        ${tokenExpiry.toISOString()}
      )
    `;
  }

  async updateDetails(
    accountId: string,
    firstName: string,
    lastName: string,
    birthdate: string | null,
    city: string | null,
    address: string | null,
    phone: string | null,
  ): Promise<void> {
    await sql`
      UPDATE accounts
      SET first_name = ${firstName}, last_name = ${lastName}, birthdate = ${birthdate}, city = ${city}, address = ${address}, phone = ${phone}
      WHERE account_id = ${accountId}
    `;
  }

  async updatePassword(accountId: string, hashedPassword: string): Promise<void> {
    await sql`
      UPDATE accounts
      SET hashed_password = ${hashedPassword}
      WHERE account_id = ${accountId}
    `;
  }

  async updateToken(
    accountId: string,
    token: string | null,
    tokenExpiry: Date | null,
  ): Promise<void> {
    await sql`
      UPDATE accounts
      SET token = ${token}, token_expiry = ${tokenExpiry ? tokenExpiry?.toISOString() : null}
      WHERE account_id = ${accountId}
    `;
  }

  async updateEmail(accountId: string, email: string): Promise<void> {
    await sql`
      UPDATE accounts
      SET email = ${email}
      WHERE account_id = ${accountId}
    `;
  }

  async updateAvatar(accountId: string, avatarUrl: string | null): Promise<void> {
    await sql`
      UPDATE accounts
      SET avatar_url = ${avatarUrl}
      WHERE account_id = ${accountId}
    `;
  }

  async updateEnabled(accountId: string, enabled: boolean): Promise<void> {
    await sql`
      UPDATE accounts
      SET enabled = ${enabled}
      WHERE account_id = ${accountId}
    `;
  }
}
