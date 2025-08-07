"use client";

import {useState} from "react";
import {usePathname, useSearchParams, useRouter} from "next/navigation";

import {createFamilyMember} from "@/patient/actions/create-family-member.action";

const FamilyMemberForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    identificationNumber: "",
    age: "",
  });
  const [errors, setErrors] = useState<{
    name: string[];
    surname: string[];
    identificationNumber: string[];
    age: string[];
  }>({
    name: [],
    surname: [],
    identificationNumber: [],
    age: [],
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const {replace} = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await createFamilyMember({
      name: formData.name,
      surname: formData.surname,
      identificationNumber: formData.identificationNumber,
      age: Number(formData.age),
    });

    if (!result) return;
    if (result.errors) {
      setErrors({
        name: result.errors?.name || [],
        surname: result.errors?.surname || [],
        identificationNumber: result.errors?.identificationNumber || [],
        age: result.errors?.age || [],
      });

      return;
    }
    if (result.success?.data) {
      const newQueryParams = new URLSearchParams(searchParams.toString());

      newQueryParams.set("familyMember", result.success.data.familyMemberId.toString());

      replace(`${pathname}?${newQueryParams.toString()}`, {scroll: false});
      document.querySelector("#family-member-form")?.classList.add("hidden");
      document.querySelector("#confirmation-panel")?.classList.remove("hidden");
    }
  };

  const handleClose = () => {
    document.querySelector("#family-member-form")?.classList.add("hidden");
    document.querySelector("#confirmation-panel")?.classList.remove("hidden");
  };

  return (
    <main className="m-10 flex justify-center">
      <section className="hero bg-neutral">
        <div className="hero-content">
          <div className="m-10 max-w-md">
            <h1 className="text-2xl leading-3">Family member&apos;s personal information</h1>
            <p className="pt-4 text-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <form onSubmit={handleSubmit}>
              <label className="form-control mt-4 w-full">
                <span className="my-2 text-xs opacity-50">Name</span>
                <input
                  className="input-minimal"
                  name="name"
                  placeholder="Enter family's member name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors?.name && (
                  <span className="text-error-content text-sm">{errors.name[0]}</span>
                )}
              </label>
              <label className="form-control mt-4 w-full">
                <span className="my-2 text-xs opacity-50">Surname</span>
                <input
                  className="input-minimal"
                  name="surname"
                  placeholder="Enter family's member surname"
                  value={formData.surname}
                  onChange={handleChange}
                />
                {errors?.surname && (
                  <span className="text-error-content text-sm">{errors.surname[0]}</span>
                )}
              </label>
              <label className="form-control mt-6 w-full">
                <span className="my-2 text-xs opacity-50">ID</span>
                <input
                  className="input-minimal"
                  name="identificationNumber"
                  placeholder="Enter family's member ID"
                  value={formData.identificationNumber}
                  onChange={handleChange}
                />
                {errors?.identificationNumber && (
                  <span className="text-error-content text-sm">
                    {errors.identificationNumber[0]}
                  </span>
                )}
              </label>
              <label className="form-control mt-6 w-full">
                <span className="my-2 text-xs opacity-50">Age</span>
                <input
                  className="input-minimal"
                  name="age"
                  placeholder="Enter family's member age"
                  value={formData.age}
                  onChange={handleChange}
                />
                {errors?.age && <span className="text-error-content text-sm">{errors.age[0]}</span>}
              </label>
              <div className="mt-20 flex gap-4">
                <button
                  className="btn btn-outline btn-primary btn-h-10 btn-round mt-6 w-full shrink border-none bg-white text-xs font-medium"
                  type="button"
                  onClick={handleClose}
                >
                  Go back
                </button>
                <button
                  className="btn btn-primary btn-h-10 btn-round mt-6 w-full shrink text-xs font-medium"
                  type="submit"
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

export default FamilyMemberForm;
