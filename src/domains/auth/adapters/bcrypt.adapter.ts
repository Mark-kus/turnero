import bcrypt from "bcrypt";

import {Hasher} from "@/auth/contracts/hash.port";

export class BcryptHasher implements Hasher {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
