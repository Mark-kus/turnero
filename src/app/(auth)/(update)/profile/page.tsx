import React from "react";

import {ProfileForm} from "@/auth/components/ProfileForm";
import {SqlAccountRepository} from "@/auth/adapters/sql-account.adapter";
import {verifySession} from "@/auth/adapters/session";
import {toAccountDTO} from "@/auth/dtos/account.dto";

const repository = new SqlAccountRepository();

const Profile = async () => {
  const {accountId} = await verifySession();
  const raw_account = await repository.findOneById(accountId);

  const account = toAccountDTO(raw_account);

  return (
    <article className="m-auto">
      <ProfileForm account={account} />
    </article>
  );
};

export default Profile;
