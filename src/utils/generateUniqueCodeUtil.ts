export function generateUniqueCode(): number {
  const min = Math.pow(10, 5);
  const max = Math.pow(10, 6) - 1;
  const code = Math.floor(Math.random() * (max - min + 1)) + min;

  return code;
}