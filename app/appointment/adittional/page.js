import React from "react";

const Adittional = () => {
  return (
    <main className="m-10 flex justify-center">
      <section className="hero max-h-2xl max-w-xl bg-neutral">
        <div className="hero-content">
          <div className="m-4 max-w-md">
            <h1 className="text-2xl leading-3">
              Family member&apos;s personal information
            </h1>
            <p className="pt-4 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <form>
              <label className="form-control mt-4 w-full">
                <span className="my-2 text-xs opacity-50">Name</span>
                <input
                  className="input-minimal"
                  placeholder="Enter family's member name"
                />
              </label>
              <label className="form-control mt-4 w-full">
                <span className="my-2 text-xs opacity-50">Surname</span>
                <input
                  className="input-minimal"
                  placeholder="Enter family's member surname"
                />
              </label>
              <label className="form-control mt-6 w-full">
                <span className="my-2 text-xs opacity-50">ID</span>
                <input
                  className="input-minimal"
                  placeholder="Enter family's member ID"
                />
              </label>
              <label className="form-control mt-6 w-full">
                <span className="my-2 text-xs opacity-50">Age</span>
                <input
                  className="input-minimal"
                  placeholder="Enter family's member age"
                />
              </label>
              <div className="mt-32 flex gap-4">
                <button className="btn-round btn-h-10 btn btn-outline btn-primary mt-6 w-full shrink border-none bg-white text-xs font-medium">
                  Go back
                </button>
                <button className="btn-round btn-h-10 btn btn-primary mt-6 w-full shrink text-xs font-medium">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Adittional;
