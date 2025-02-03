"use client";

import React, { useState } from "react";
import { logout } from "@/app/lib/actions/accounts";

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
    <button onClick={handleSignOut} disabled={loading}>
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
};

export default SignoutButton;
