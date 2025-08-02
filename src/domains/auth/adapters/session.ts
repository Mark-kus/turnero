import "server-only";

import type {Role, SessionData, SessionPayload} from "@/shared/types";

import {JWTPayload, jwtVerify, SignJWT} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

const key = new TextEncoder().encode(process.env.SECRET);

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload as unknown as JWTPayload)
    .setProtectedHeader({alg: "HS256"})
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string = "") {
  try {
    const {payload} = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    return payload;
  } catch (_error) {
    return null;
  }
}

export async function createSession({accountId, role, avatarUrl}: SessionData) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60);
  const session = await encrypt({accountId, role, avatarUrl, expiresAt});

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
  redirect("/appointment");
}

export async function verifySession(): Promise<SessionData> {
  const cookie = cookies().get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.accountId) {
    redirect("/login");
  }

  return {
    accountId: session.accountId as string,
    role: session.role as Role,
    avatarUrl: session.avatarUrl as string,
  };
}

export async function updateSession() {
  const session = cookies().get("session")?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  cookies().set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  cookies().delete("session");
}
