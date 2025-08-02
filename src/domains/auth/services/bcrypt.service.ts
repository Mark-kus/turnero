import bcrypt from "bcrypt";

import {HashService} from "../ports/hash.port";

export class BcryptService implements HashService {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
