import AdittionalForm from "@/app/ui/appointment/AdittionalForm";
import React from "react";

const Adittional = () => {
  return (
    <main className="m-10 flex justify-center">
      <section className="hero max-h-2xl max-w-xl bg-neutral">
        <div className="hero-content">
          <div className="m-10 max-w-md">
            <h1 className="text-2xl leading-3">
              Family member&apos;s personal information
            </h1>
            <p className="pt-4 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <AdittionalForm />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Adittional;
