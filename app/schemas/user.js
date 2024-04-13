import { z } from "zod";

export const UserLogin = z.object({
  username: z.string().email(),
  password: z.string(),
});
