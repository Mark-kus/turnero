import React from "react";
import {cookies} from "next/headers";

import ForgotPasswordForm from "@/auth/components/forms/ForgotPasswordForm";
import {COOKIES} from "@/shared/constants";

const ForgotPassword = () => {
  const accountEmail = cookies().get(COOKIES.ACCOUNT_EMAIL)?.value;

  return (
    <article>
      <h1 className="text-4xl font-bold">Forgotten your password?</h1>
      <p className="mt-2 mb-8">
        There is nothing to worry about, we&apos;ll send you a message to help you reset your
        password.
      </p>
      <ForgotPasswordForm accountEmail={accountEmail} />
    </article>
  );
};

export default ForgotPassword;
