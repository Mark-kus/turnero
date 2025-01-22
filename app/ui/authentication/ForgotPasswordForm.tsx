import React from "react";

const ForgotPasswordForm = () => {
  return (
    <form>
      <label className="form-control">
        <span className="mb-1 text-left">Email Address</span>
        <input
          placeholder="Enter personal or work email address"
          className="input-unbordered"
        />
      </label>
      <button className="btn btn-primary btn-h-10 btn-round mt-4 w-full">
        Send Reset Link
      </button>
    </form>
  );
};

export default ForgotPasswordForm;
