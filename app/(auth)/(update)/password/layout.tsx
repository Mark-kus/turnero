import React from "react";

const PasswordResetLayout = ({ children }) => {
  return (
    <section className="flex h-screen w-screen items-center justify-center bg-neutral">
      <main className="max-w-screen-sm border-2 border-base-300 bg-white p-16 text-center">
        {children}
      </main>
    </section>
  );
};

export default PasswordResetLayout;
