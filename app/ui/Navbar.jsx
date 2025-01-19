import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut } from "@/auth";

import defaultProfile from "@/public/default/profile.svg";
import NavLinks from "./NavLinks";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <Link href="/appointment" className="btn btn-ghost text-xl">
          Turnero
        </Link>
      </div>
      <div className="flex-none gap-6">
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
                src={defaultProfile}
                width={40}
                height={40}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
          >
            <li>
              <Link href={"/profile"}>Profile</Link>
            </li>
            <li>
              <form
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <button>Sign out</button>
              </form>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
