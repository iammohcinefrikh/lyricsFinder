import jwt from "jsonwebtoken";

export function generateToken(userEmail: string, jwtSecret: string ): string {
  const jwtToken = jwt.sign({ email: userEmail }, jwtSecret, { expiresIn: "4h" });

  return jwtToken;
}