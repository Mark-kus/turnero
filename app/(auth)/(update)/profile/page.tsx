import React from "react";

import { ProfileForm } from "@/app/ui/authentication/ProfileForm";
import { fetchAccount } from "@/app/lib/data";

const Profile = async () => {
  const account = await fetchAccount();
  return (
    <article className="m-auto">
      <ProfileForm account={account} />
    </article>
  );
};

export default Profile;
