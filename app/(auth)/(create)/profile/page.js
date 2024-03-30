import ProfileForm from "@/app/ui/forms/Profile";
import React from "react";

const Profile = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Perfil</h1>
      <ProfileForm />
    </article>
  );
};

export default Profile;
