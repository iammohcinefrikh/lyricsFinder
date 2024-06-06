// function to generate a unique code
export function generateUniqueCode(): number {
  // define the minimum and maximum values for the code
  const min = Math.pow(10, 5);
  const max = Math.pow(10, 6) - 1;
  // generate a random number between min and max
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  // return the generated code
  return code;
}