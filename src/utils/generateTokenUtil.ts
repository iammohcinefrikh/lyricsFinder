// import the jsonwebtoken module
import jwt from "jsonwebtoken";

// function to generate a jwt token
export function generateToken(userEmail: string, jwtSecret: string ): string {
  // sign a new jwt token with the user's email and secret
  const jwtToken = jwt.sign({ email: userEmail }, jwtSecret, { expiresIn: "1h" });

  // return the generated jwt token
  return jwtToken;
}