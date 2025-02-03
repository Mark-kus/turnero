import React, { Suspense } from "react";

import { ProfileForm } from "@/app/ui/authentication/ProfileForm";
import { ProfileFormSkeleton } from "@/app/ui/skeletons/ProfileFormSkeleton";
import { fetchAccount } from "@/app/lib/data";

const SuspendedProfile = async () => {
  const account = await fetchAccount();
  return <ProfileForm account={account} />;
};

const Profile = () => {
  return (
    <article className="m-auto">
      <Suspense fallback={<ProfileFormSkeleton />}>
        <SuspendedProfile />
      </Suspense>
    </article>
  );
};

export default Profile;
