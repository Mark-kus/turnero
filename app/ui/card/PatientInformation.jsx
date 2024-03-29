import React from "react";

const PatientInformation = ({ person }) => {
  return (
    <div>
      <p className="font-medium">
        {person.name}, {person.age}
      </p>
      <ul>
        <li className="text-sm">ID: {person.idNumber}</li>
        <li className="text-sm">
          Health insurance: {person.insurance ?? "None"}
        </li>
        <li className="text-sm">Phone number: {person.phone}</li>
        <li className="text-sm">Contact email: {person.email}</li>
      </ul>
    </div>
  );
};

export default PatientInformation;
