import React from "react";

const PasswordResetLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className="bg-neutral flex h-screen w-screen items-center justify-center">
      <main className="border-base-300 max-w-(--breakpoint-sm) border-2 bg-white p-16 text-center">
        {children}
      </main>
    </section>
  );
};

export default PasswordResetLayout;
