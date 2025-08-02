import {randomUUID} from "crypto";

import {CreateAccountDTO} from "@/auth/dtos/create-account.dto";
import {HashService} from "@/auth/ports/hash.port";
import {EmailSender} from "@/auth/ports/email.port";
import {AccountRepository} from "@/auth/ports/account.repository";

export class CreateAccountUseCase {
  constructor(
    private repository: AccountRepository,
    private hasher: HashService,
    private mailer: EmailSender,
  ) {}

  async execute(dto: CreateAccountDTO) {
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

    await this.mailer.sendVerificationEmail(dto.email, emailData);
  }
}
