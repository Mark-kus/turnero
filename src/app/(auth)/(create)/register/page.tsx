import React from "react";
import Link from "next/link";

import RegisterForm from "@/auth/components/forms/RegisterForm";

const Register = () => {
  return (
    <article className="m-auto">
      <h1 className="mb-10 text-4xl font-bold">Sign Up</h1>
      <RegisterForm />
      <div className="divider my-8" />
      <Link className="link-hover link text-primary text-xs" href="/login">
        Already have an account?
      </Link>
    </article>
  );
};

export default Register;
