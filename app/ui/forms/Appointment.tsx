"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const AppointmentForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const onSubmit = (event) => {
    event.preventDefault();
    const elements = Array.from(event.target.elements);
    const filters = elements.map(({ name, value }) => [name, value]);
    const newQueryParams = filters
      .filter(([_, value]) => value)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    replace(`${pathname}?${newQueryParams}`);
  };

  return (
    <form onSubmit={onSubmit}>
      <label className="form-control mt-6 w-full">
        <span className="my-2 text-xs opacity-50">Specialty</span>
        <input
          name="specialty"
          defaultValue={searchParams.get("specialty")?.toString()}
          className="input-minimal"
          placeholder="Placeholder/Input text"
        />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="my-2 text-xs opacity-50">Doctor&apos;s name</span>
        <input
          name="name"
          defaultValue={searchParams.get("name")?.toString()}
          className="input-minimal"
          placeholder="Placeholder/Input text"
        />
      </label>
      <label className="form-control mt-4 w-full">
        <span className="my-2 text-xs opacity-50">Health insurance</span>
        <input
          name="insurance"
          defaultValue={searchParams.get("insurance")?.toString()}
          className="input-minimal"
          placeholder="Placeholder/Input text"
        />
      </label>
      <button
        type="submit"
        className="btn btn-primary btn-h-10 btn-round mt-6 w-full text-xs font-medium"
      >
        Label
      </button>
    </form>
  );
};

export default AppointmentForm;
