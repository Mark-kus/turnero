import React from "react";

const SpecialistInformation = ({ person }) => {
  return (
    <div>
      <p className="font-medium">
        {person.name}, {person.age}
      </p>
      <ul>
        <li className="text-sm">
          Health insurance: {person.insurance ?? "None"}
        </li>
        <li className="text-sm">
          Specialties: {person.specialties.join(", ")}
        </li>
        <li className="text-sm">Location: {person.location}</li>
        <li className="text-sm">Available: {person.available.join(", ")}</li>
      </ul>
    </div>
  );
};

export default SpecialistInformation;
