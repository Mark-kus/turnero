"use server";

import {deleteSession} from "@/auth/adapters/session";

export async function logout() {
  deleteSession();
}
