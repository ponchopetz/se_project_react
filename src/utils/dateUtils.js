export const getCurrentDate = (options = { month: "long", day: "numeric" }) => {
  return new Date().toLocaleString("default", options);
};

// getCurrentDate(); // "January 15"
// getCurrentDate({ weekday: "long", month: "long", day: "numeric" }); // "Monday, January 15"
