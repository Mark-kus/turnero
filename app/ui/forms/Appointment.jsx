"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const AppointmentForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = ({ target: { name, value } }) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(name, value);
    } else {
      params.delete(name);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form>
      <label className="form-control mt-6 w-full">
        <span className="my-2 text-xs opacity-50">Specialty</span>
        <input
          name="specialty"
          defaultValue={searchParams.get("specialty")?.toString()}
          onChange={handleChange}
          className="input-minimal"
          placeholder="Placeholder/Input text"
        />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="my-2 text-xs opacity-50">Doctor&apos;s name</span>
        <input
          name="name"
          defaultValue={searchParams.get("name")?.toString()}
          onChange={handleChange}
          className="input-minimal"
          placeholder="Placeholder/Input text"
        />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="my-2 text-xs opacity-50">Health insurance</span>
        <input
          name="insurance"
          defaultValue={searchParams.get("insurance")?.toString()}
          onChange={handleChange}
          className="input-minimal"
          placeholder="Placeholder/Input text"
        />
      </label>
      <button className="btn-round btn-h-10 btn btn-primary mt-6 w-full text-xs font-medium">
        Label
      </button>
    </form>
  );
};

export default AppointmentForm;
