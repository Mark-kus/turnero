import React from "react";
import Link from "next/link";
import Image from "next/image";

import defaultProfile from "@/public/default/profile.svg";
import NavLinks from "@/app/ui/navigation/NavLinks";
import { verifySession } from "@/app/lib/session";
import SignoutButton from "@/app/ui/navigation/SignoutButton";

export default async function Navbar() {
  const { role, avatarUrl } = await verifySession();

  if (role === "establishment") {
    return <StablishmentNavbar avatarUrl={avatarUrl} />;
  }

  if (role === "professional") {
    return <ProfessionalNavbar avatarUrl={avatarUrl} />;
  }

  return <UserNavbar avatarUrl={avatarUrl} />;
}

function StablishmentNavbar({ avatarUrl }: { avatarUrl: string | undefined }) {
  return <div>You are admin</div>;
}

function ProfessionalNavbar({ avatarUrl }: { avatarUrl: string | undefined }) {
  return <div>You are professional</div>;
}

function UserNavbar({ avatarUrl }: { avatarUrl: string | undefined }) {
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <Link href="/appointment" className="btn btn-ghost text-xl">
          Turnero
        </Link>
      </div>
      <div className="flex items-center gap-6">
        <NavLinks />
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={avatarUrl ?? defaultProfile}
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content rounded-box bg-base-100 z-1 mt-3 w-52 p-2 shadow-sm"
          >
            <li>
              <Link href={"/profile"}>Profile</Link>
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
