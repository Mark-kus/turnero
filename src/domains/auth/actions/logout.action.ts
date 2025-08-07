"use server";

import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";

export async function logout() {
  const sessionAdapter = new JoseSessionAdapter();

  sessionAdapter.deleteSession();
}
