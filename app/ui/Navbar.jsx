import React from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="navbar bg-base-300 px-8">
      <div className="flex-1">
        <Link href="/appointment" className="btn btn-ghost text-xl">
          Turnero
        </Link>
      </div>
      <div className="flex-none gap-6">
        <Link
          className="link-hover link text-sm font-medium text-primary"
          href="/appointment/booked"
        >
          View appointments
        </Link>
        <Link
          className="link-hover link text-sm font-medium text-primary"
          href="/appointment"
        >
          Book appointments
        </Link>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="avatar btn btn-circle btn-ghost"
          >
            <div className="w-10 rounded-full">
              <Image
                alt="Tailwind CSS Navbar component"
                src={"/google.svg"}
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
              <Link href={"/login"}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
