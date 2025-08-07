import {randomUUID} from "crypto";

import {CreateAccountDto} from "@/auth/dtos/create-account.dto";
import {Hasher} from "@/auth/contracts/hash.port";
import {EmailSender} from "@/auth/contracts/email.port";
import {AccountRepository} from "@/auth/contracts/account.repository";

export class SignupUseCase {
  constructor(
    private repository: AccountRepository,
    private hasher: Hasher,
    private mailer: EmailSender,
  ) {}

  async execute(dto: CreateAccountDto) {
    const isAvailable = await this.repository.isEmailAvailable(dto.email);

    if (!isAvailable) throw new Error("Email already exists.");

    const hashedPassword = await this.hasher.hash(dto.password);
    const token = randomUUID();
    const tokenExpiry = new Date(Date.now() + 1000 * 60 * 60 * 24);

    await this.repository.create({
      ...dto,
      hashedPassword,
      token,
      tokenExpiry,
    });

    const tokenizedUrl = `${process.env.PROJECT_URL}/api/verify-email?token=${token}`;
    const emailData = {
      firstName: dto.firstName,
      tokenizedUrl,
    };

    await this.mailer.sendEmailVerification(dto.email, emailData);
  }
}
