import React from "react";
import Link from "next/link";
import RegisterForm from "@/app/ui/authentication/RegisterForm";
import OAuthButtons from "@/app/ui/authentication/OAuthButtons";

const Register = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Sign Up</h1>
      <RegisterForm />
      <OAuthButtons />
      <div className="divider my-8"></div>
      <Link href="/login" className="link-hover link text-xs text-primary">
        Already have an account?
      </Link>
    </article>
  );
};

export default Register;
