export const generateNumbersArray = (length = 10) => {
  return Array.from({length}).map((_, index) => index + 1);
};
