import React from "react";

import {ProfileForm} from "@/auth/components/forms/ProfileForm";
import {VercelAccountRepository} from "@/auth/adapters/vercel-account.adapter";
import {toAccountDto} from "@/auth/dtos/account.dto";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";

const session = new JoseSessionAdapter();
const repository = new VercelAccountRepository();

const Profile = async () => {
  const {accountId} = await session.verifySession();
  const raw_account = await repository.findOneById(accountId);

  const account = toAccountDto(raw_account);

  return (
    <article className="m-auto">
      <ProfileForm account={account} />
    </article>
  );
};

export default Profile;
