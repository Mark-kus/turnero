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
