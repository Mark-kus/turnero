import React from "react";
import Link from "next/link";
import LoginForm from "@/app/ui/authentication/LoginForm";
import OAuthButtons from "@/app/ui/authentication/OAuthButtons";

const Login = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Log In</h1>
      <LoginForm />
      <OAuthButtons />
      <div className="divider my-8"></div>
      <Link href="/register" className="link-hover link text-xs text-primary">
        No account yet? Sign Up
      </Link>
    </article>
  );
};

export default Login;
