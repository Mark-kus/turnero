export const getColorByConfirmation = (confirmation) => {
  switch (confirmation) {
    case "Approved":
      return "#009951";
    case "Denied":
      return "#DC3412";
    case "Waiting":
      return "#CE9700";
  }
};

export const translateDay = (day, reverse) => {
  const daysOfWeek = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  if (reverse) return daysOfWeek.indexOf(day);
  return daysOfWeek[day];
};
