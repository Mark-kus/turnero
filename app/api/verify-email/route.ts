import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  // Find the user with the token
  const data = await sql`
    SELECT * FROM accounts WHERE token = ${token}
    `;
  const user = data.rows[0];

  if (!user) {
    return NextResponse.json({ error: "Invalid token" }, { status: 400 });
  }

  if (user.token_expiry < new Date()) {
    sql`
    UPDATE accounts SET token = NULL, token_expiry = NULL WHERE account_id = ${user.account_id}
    `;
    return NextResponse.json({ error: "Token has expired" }, { status: 400 });
  }

  if (user.enabled) {
    sql`
    UPDATE accounts SET token = NULL, token_expiry = NULL WHERE account_id = ${user.account_id}
    `;
    return NextResponse.json(
      { error: "Email is already enabled" },
      { status: 400 },
    );
  }

  // Mark the user as enabled
  await sql`
    UPDATE accounts SET enabled = true, token = NULL, token_expiry = NULL WHERE account_id = ${user.account_id}
    `;

  return NextResponse.json({ message: "Email enabled successfully" });
}
