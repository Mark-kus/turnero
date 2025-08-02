import React from "react";
import Link from "next/link";
import {cookies} from "next/headers";

import LoginForm from "@/auth/components/LoginForm";
import {COOKIES} from "@/shared/constants";

const Login = () => {
  const accountEmail = cookies().get(COOKIES.ACCOUNT_EMAIL)?.value;

  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Log In</h1>
      <LoginForm accountEmail={accountEmail} />
      <div className="divider my-8" />
      <Link className="link-hover link text-primary text-xs" href="/register">
        No account yet? Sign Up
      </Link>
    </article>
  );
};

export default Login;
