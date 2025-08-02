"use client";

import React, {useState} from "react";

import {logout} from "@/auth/actions/logout.action";

const SignoutButton = () => {
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logout();
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button disabled={loading} onClick={handleSignOut}>
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
};

export default SignoutButton;
