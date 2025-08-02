import {NextResponse} from "next/server";
import {sql} from "@vercel/postgres";

import {SEARCH_PARAMS} from "@/shared/constants";

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const token = searchParams.get(SEARCH_PARAMS.TOKEN);
  const email = searchParams.get(SEARCH_PARAMS.EMAIL);

  if (!token) {
    return NextResponse.json({error: "Token is required"}, {status: 400});
  }

  if (!email) {
    return NextResponse.json({error: "Email is required"}, {status: 400});
  }

  // Find the account with the token
  const data = await sql`
        SELECT * FROM accounts WHERE token = ${token}
        `;
  const account = data.rows[0];

  if (!account) {
    return NextResponse.json({error: "Invalid token"}, {status: 400});
  }

  if (account.token_expiry < new Date()) {
    await sql`
        UPDATE accounts SET token = NULL, token_expiry = NULL WHERE account_id = ${account.account_id}
        `;

    return NextResponse.json({error: "Token has expired"}, {status: 400});
  }

  // Update the account's email
  await sql`
        UPDATE accounts SET email = ${email}, token = NULL, token_expiry = NULL WHERE account_id = ${account.account_id}
        `;

  return NextResponse.json({message: "Email updated successfully"});
}
