// import the crypto module
import crypto from "crypto";

// function to verify a password
export function verifyPassword(password: string, original: string): boolean {
  // split the original password into salt and hash
  const [salt, originalHash] = original.split("$");
  // generate a hash from the provided password and salt
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

  // return true if the generated hash matches the original hash
  return hash === originalHash;
}