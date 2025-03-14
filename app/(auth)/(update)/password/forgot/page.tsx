import ForgotPasswordForm from "@/app/ui/authentication/ForgotPasswordForm";
import React from "react";

const ForgotPassword = () => {
  return (
    <article>
      <h1 className="text-4xl font-bold">Forgotten your password?</h1>
      <p className="mt-2 mb-8">
        There is nothing to worry about, we&apos;ll send you a message to help
        you reset your password.
      </p>
      <ForgotPasswordForm />
    </article>
  );
};

export default ForgotPassword;
