// import the crypto module
import crypto from "crypto";

// function to hash a password
export function hashPassword(password: string): string {
  // generate a random salt
  const salt = crypto.randomBytes(16).toString("hex");
  // generate a hash from the provided password and salt
  const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");
  
  // return the salt and hash joined by a "$"
  return [salt, hash].join("$");
}