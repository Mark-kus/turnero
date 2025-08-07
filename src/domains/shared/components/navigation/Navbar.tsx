import React from "react";
import Link from "next/link";
import Image from "next/image";

import defaultProfile from "@/public/default/profile.svg";
import NavLinks from "@/shared/components/navigation/NavLinks";
import SignoutButton from "@/shared/components/navigation/SignoutButton";
import {JoseSessionAdapter} from "@/auth/adapters/jose-session.adapter";

export default async function Navbar() {
  const sessionAdapter = new JoseSessionAdapter();
  const {role, avatarUrl} = await sessionAdapter.verifySession();

  if (!role) {
    return <div />;
  }

  if (role === "provider") {
    return <StablishmentNavbar />;
  }

  if (role === "professional") {
    return <ProfessionalNavbar />;
  }

  return <PatientNavbar avatarUrl={avatarUrl} />;
}

function StablishmentNavbar() {
  return <div>You are admin</div>;
}

function ProfessionalNavbar() {
  return <div>You are professional</div>;
}

function PatientNavbar({avatarUrl}: {avatarUrl: string | null}) {
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" href="/appointment">
          Turnero
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <NavLinks />
        <div className="dropdown dropdown-end">
          <div className="avatar btn btn-circle btn-ghost" role="button" tabIndex={0}>
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                height={40}
                src={avatarUrl ?? defaultProfile}
                width={40}
              />
            </div>
          </div>
          <ul className="menu dropdown-content rounded-box bg-base-100 z-1 mt-3 w-52 p-2 shadow-sm">
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <SignoutButton />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
