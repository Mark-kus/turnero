import React from "react";

const AppointmentForm = () => {
  return (
    <section className="hero max-h-2xl max-w-xl bg-neutral">
      <div className="hero-content">
        <div className="m-4 max-w-md">
          <h1 className="text-2xl leading-3">Pick your appointment</h1>
          <p className="py-4 text-xs">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo.
          </p>
          <div className="h-36 rounded-lg border-2 border-base-300 bg-gray-200"></div>
          <form>
            <label className="form-control mt-6 w-full">
              <span className="my-2 text-xs opacity-50">Specialty</span>
              <input
                className="input-minimal"
                placeholder="Placeholder/Input text"
              />
            </label>
            <label className="form-control mt-4 w-full">
              <span className="my-2 text-xs opacity-50">
                Doctor&apos;s name
              </span>
              <input
                className="input-minimal"
                placeholder="Placeholder/Input text"
              />
            </label>
            <label className="form-control mt-4 w-full">
              <span className="my-2 text-xs opacity-50">Health insurance</span>
              <input
                className="input-minimal"
                placeholder="Placeholder/Input text"
              />
            </label>
            <button className="btn-round btn-h-10 btn btn-primary mt-6 w-full text-xs font-medium">
              Label
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AppointmentForm;
