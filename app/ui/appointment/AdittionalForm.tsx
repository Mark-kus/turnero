import React from "react";

const AdittionalForm = () => {
  return (
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
      <div className="mt-20 flex gap-4">
        <button className="btn btn-outline btn-primary btn-h-10 btn-round mt-6 w-full shrink border-none bg-white text-xs font-medium">
          Go back
        </button>
        <button className="btn btn-primary btn-h-10 btn-round mt-6 w-full shrink text-xs font-medium">
          Continue
        </button>
      </div>
    </form>
  );
};

export default AdittionalForm;
