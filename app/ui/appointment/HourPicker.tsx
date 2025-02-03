import React from "react";

const HourPicker = () => {
  return (
    <section className="flex w-full flex-col items-start rounded-md bg-neutral p-8">
      <h2 className="mb-4 text-3xl leading-none">Seleccione un horario</h2>
      <div className="max-h-2xl w-full overflow-y-auto">
        <div className="w-full">
          <h4 className="mb-2 mt-2">Morning</h4>
          <ul className="columns-3 space-y-4">
            {fakeHours.morning.map((hour, index) => {
              const [hours, minutes] = hour.time.toString().match(/.{2}/g);
              return (
                <li className="w-full">
                  <button
                    className="btn btn-outline btn-primary btn-round h-20 w-full border-none bg-white bg-opacity-40 font-medium"
                    disabled={hour.taken}
                  >
                    {hours}:{minutes}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full">
          <h4 className="mb-2 mt-6">Afternoon</h4>
          <ul className="columns-3 space-y-4">
            {fakeHours.afternoon.map((hour, index) => {
              const [hours, minutes] = hour.time.toString().match(/.{2}/g);
              return (
                <li className="w-full">
                  <button
                    className="btn btn-outline btn-primary btn-round h-20 w-full border-none bg-white bg-opacity-40 font-medium"
                    disabled={hour.taken}
                  >
                    {hours}:{minutes}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default HourPicker;
