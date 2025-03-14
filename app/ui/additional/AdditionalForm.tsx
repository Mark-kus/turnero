"use client";

import React, { useState } from "react";
import { createAdditional } from "@/app/lib/actions/additionals";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

const AdditionalForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    identification_number: "",
    age: "",
  });
  const [errors, setErrors] = useState<{
    name: string[];
    surname: string[];
    identification_number: string[];
    age: string[];
  }>({
    name: [],
    surname: [],
    identification_number: [],
    age: [],
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createAdditional(formData);
    if (!result) return;
    if (result.success?.data) {
      const newQueryParams = new URLSearchParams(searchParams.toString());
      newQueryParams.set("additional_id", result.success.data);

      replace(`${pathname}?${newQueryParams.toString()}`, { scroll: false });
      document.querySelector("#additional-form")?.classList.add("hidden");
      document.querySelector("#confirmation-panel")?.classList.remove("hidden");
    }
    if (result.errors) {
      setErrors({
        name: result.errors?.name || [],
        surname: result.errors?.surname || [],
        identification_number: result.errors?.identification_number || [],
        age: result.errors?.age || [],
      });
    }
  };

  const handleClose = () => {
    document.querySelector("#additional-form")?.classList.add("hidden");
    document.querySelector("#confirmation-panel")?.classList.remove("hidden");
  };

  return (
    <main className="m-10 flex justify-center">
      <section className="hero bg-neutral">
        <div className="hero-content">
          <div className="m-10 max-w-md">
            <h1 className="text-2xl leading-3">
              Family member&apos;s personal information
            </h1>
            <p className="pt-4 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <form onSubmit={handleSubmit}>
              <label className="form-control mt-4 w-full">
                <span className="my-2 text-xs opacity-50">Name</span>
                <input
                  name="name"
                  className="input-minimal"
                  placeholder="Enter family's member name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors?.name && (
                  <span className="text-sm text-error-content">{errors.name[0]}</span>
                )}
              </label>
              <label className="form-control mt-4 w-full">
                <span className="my-2 text-xs opacity-50">Surname</span>
                <input
                  name="surname"
                  className="input-minimal"
                  placeholder="Enter family's member surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
                {errors?.surname && (
                  <span className="text-sm text-error-content">
                    {errors.surname[0]}
                  </span>
                )}
              </label>
              <label className="form-control mt-6 w-full">
                <span className="my-2 text-xs opacity-50">ID</span>
                <input
                  name="identification_number"
                  className="input-minimal"
                  placeholder="Enter family's member ID"
                  value={formData.identification_number}
                  onChange={handleChange}
                />
                {errors?.identification_number && (
                  <span className="text-sm text-error-content">
                    {errors.identification_number[0]}
                  </span>
                )}
              </label>
              <label className="form-control mt-6 w-full">
                <span className="my-2 text-xs opacity-50">Age</span>
                <input
                  name="age"
                  className="input-minimal"
                  placeholder="Enter family's member age"
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors?.age && (
                  <span className="text-sm text-error-content">{errors.age[0]}</span>
                )}
              </label>
              <div className="mt-20 flex gap-4">
                <button
                  onClick={handleClose}
                  type="button"
                  className="btn btn-outline btn-primary btn-h-10 btn-round mt-6 w-full shrink border-none bg-white text-xs font-medium"
                >
                  Go back
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-h-10 btn-round mt-6 w-full shrink text-xs font-medium"
                >
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

export default AdditionalForm;
