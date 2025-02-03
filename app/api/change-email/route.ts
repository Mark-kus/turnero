import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  if (!token) {
    return NextResponse.json({ error: "Token is required" }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
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
    await sql`
        UPDATE accounts SET token = NULL, token_expiry = NULL WHERE account_id = ${user.account_id}
        `;
    return NextResponse.json({ error: "Token has expired" }, { status: 400 });
  }

  // Update the user's email
  await sql`
        UPDATE accounts SET email = ${email}, token = NULL, token_expiry = NULL WHERE account_id = ${user.account_id}
        `;

  return NextResponse.json({ message: "Email updated successfully" });
}
