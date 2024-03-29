const getColorByConfirmation = (confirmation) => {
  switch (confirmation) {
    case "Approved":
      return "#009951";
    case "Denied":
      return "#DC3412";
    case "Waiting":
      return "#CE9700";
  }
};

export default getColorByConfirmation;
