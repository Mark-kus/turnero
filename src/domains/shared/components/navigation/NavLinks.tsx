"use client";

import {usePathname} from "next/navigation";
import Link from "next/link";

const links = [
  {
    name: "Book appointments",
    href: "/appointment",
  },
  {
    name: "View appointments",
    href: "/appointment/booked",
  },
];

const NavLinks = () => {
  const pathname = usePathname();

  return links.map((link, i) => (
    <Link
      key={i}
      className={`link-hover link text-primary text-sm font-medium ${pathname === link.href ? "underline" : ""} `}
      href={link.href}
    >
      {link.name}
    </Link>
  ));
};

export default NavLinks;
