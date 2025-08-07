"use client";

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useState} from "react";

import {FormElement} from "@/shared/types/common";
import {ProfessionalFiltersSchema} from "@/professional/schemas/professionals-filters.schema";

const AppointmentSearchForm = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const onSubmit = (event: React.FormEvent<FormElement>) => {
    event.preventDefault();
    const {specialty, name, insurance} = event.currentTarget.elements;
    const filters = [
      ["specialty", specialty.value],
      ["name", name.value],
      ["insurance", insurance.value],
    ];

    const validation = ProfessionalFiltersSchema.safeParse({
      specialty: specialty.value,
      name: name.value,
      insurance: insurance.value,
    });

    if (!validation.success) return setErrors(validation.error.flatten().fieldErrors || {});

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
          className="input-minimal"
          defaultValue={searchParams.get("specialty")?.toString()}
          name="specialty"
          placeholder="Placeholder/Input text"
        />
        {errors.specialty && (
          <span className="block text-xs text-red-500">{errors.specialty[0]}</span>
        )}
      </label>
      <label className="form-control mt-4 w-full">
        <span className="my-2 text-xs opacity-50">Doctor&apos;s name</span>
        <input
          className="input-minimal"
          defaultValue={searchParams.get("name")?.toString()}
          name="name"
          placeholder="Placeholder/Input text"
        />
        {errors.name && <span className="block text-xs text-red-500">{errors.name[0]}</span>}
      </label>
      <label className="form-control mt-4 w-full">
        <span className="my-2 text-xs opacity-50">Health insurance</span>
        <input
          className="input-minimal"
          defaultValue={searchParams.get("insurance")?.toString()}
          name="insurance"
          placeholder="Placeholder/Input text"
        />
        {errors.insurance && (
          <span className="block text-xs text-red-500">{errors.insurance[0]}</span>
        )}
      </label>
      <button
        className="btn btn-primary btn-h-10 btn-round mt-6 w-full text-xs font-medium"
        type="submit"
      >
        Label
      </button>
    </form>
  );
};

export default AppointmentSearchForm;
