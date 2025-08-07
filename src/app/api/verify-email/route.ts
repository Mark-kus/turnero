import {NextResponse} from "next/server";
import {redirect} from "next/navigation";

import {SEARCH_PARAMS} from "@/shared/constants";
import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";

const repository = new VercelAccountRepository();

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const token = searchParams.get(SEARCH_PARAMS.TOKEN);

  if (!token) {
    return NextResponse.json({error: "Token is required"}, {status: 400});
  }

  try {
    const account = await repository.findOneByToken(token);

    void repository.updateToken(token, null, null);

    if (account.token_expiry < new Date()) {
      return NextResponse.json({error: "Token has expired"}, {status: 400});
    }

    if (account.enabled) {
      return NextResponse.json({error: "Email is already enabled"}, {status: 400});
    }

    void repository.updateEnabled(account.account_id, true);
  } catch {
    return NextResponse.json({error: "Invalid token"}, {status: 400});
  }

  redirect("/login?emailVerified=true");
}
