import {JWTPayload} from "jose";

import {SessionData, SessionPayload} from "@/shared/types/auth";

export interface SessionAdapter {
  encrypt(payload: SessionPayload): Promise<string>;
  decrypt(token?: string): Promise<JWTPayload | null>;
  createSession(data: SessionData): Promise<void>;
  verifySession(): Promise<SessionData>;
  updateSession(): Promise<void>;
  deleteSession(): void;
}
