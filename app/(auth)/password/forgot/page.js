import React from "react";

const ForgotPassword = () => {
  return (
    <article>
      <h1 className="text-4xl font-bold">Forgotten your password?</h1>
      <p className="mb-8 mt-2">
        There is nothing to worry about, we&apos;ll send you a message to help
        you reset your password.
      </p>
      <label className="form-control">
        <span className="mb-1 text-left">Email Address</span>
        <input
          placeholder="Enter personal or work email address"
          className="input-unbordered"
        />
      </label>
      <button className="btn-h-10 btn-round btn btn-primary mt-4 w-full">
        Send Reset Link
      </button>
    </article>
  );
};

export default ForgotPassword;
