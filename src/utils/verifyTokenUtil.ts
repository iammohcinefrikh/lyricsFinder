import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface UserPayload {
  email: string;
}

declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}

const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  const jwtToken = request.headers["authorization"];

  if (!jwtToken) {
    return response.status(401).json({
      statusCode: 401,
      error: "Unauthorized",
      message: "Token not found."
    });
  }

  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined.");
  }

  jwt.verify(jwtToken, jwtSecret, (error, decoded) => {
    if (error) {
      return response.status(401).json({
        statusCode: 401,
        error: "Unauthorized",
        message: "Access is denied."
      });
    }

    request.user = decoded as UserPayload;
    next();
  });
};

export { verifyToken };