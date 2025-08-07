import "server-only";

import {SignJWT, jwtVerify, JWTPayload} from "jose";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

import {SessionData, SessionPayload, Role} from "@/shared/types/auth";
import {SessionAdapter} from "@/auth/contracts/session.port";

export class JoseSessionAdapter implements SessionAdapter {
  private key = new TextEncoder().encode(process.env.SECRET!);

  async encrypt(payload: SessionPayload): Promise<string> {
    return new SignJWT(payload as unknown as JWTPayload)
      .setProtectedHeader({alg: "HS256"})
      .setIssuedAt()
      .setExpirationTime("1 day")
      .sign(this.key);
  }

  async decrypt(token?: string): Promise<JWTPayload | null> {
    if (!token) return null;
    try {
      const {payload} = await jwtVerify(token, this.key);

      return payload;
    } catch {
      return null;
    }
  }

  async createSession(data: SessionData): Promise<void> {
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    const token = await this.encrypt({...data, expiresAt});

    cookies().set("session", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });
    redirect("/appointment");
  }

  async verifySession(): Promise<SessionData> {
    const token = cookies().get("session")?.value;
    const payload = await this.decrypt(token);

    if (!payload?.accountId) redirect("/login");

    return {
      accountId: payload.accountId as string,
      role: payload.role as Role,
      avatarUrl: payload.avatarUrl as string,
    };
  }

  async updateSession(): Promise<void> {
    const token = cookies().get("session")?.value;
    const payload = await this.decrypt(token);

    if (!payload) return;

    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    cookies().set("session", token!, {
      httpOnly: true,
      secure: true,
      expires,
      sameSite: "lax",
      path: "/",
    });
  }

  deleteSession(): void {
    cookies().delete("session");
  }
}
