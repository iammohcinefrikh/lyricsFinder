// import the jsonwebtoken module
import jwt from "jsonwebtoken";
// import the request, response, and nextfunction types from express
import { Request, Response, NextFunction } from "express";
// import the handleresponse function from the handleresponsehelper module
import { handleResponse } from "../helpers/handleResponseHelper";

// define the userpayload interface
interface UserPayload {
  email: string;
}

// extend the request interface from express to include a user property
declare module "express" {
  interface Request {
    user?: UserPayload;
  }
}

// function to verify a jwt token
const verifyToken = (request: Request, response: Response, next: NextFunction) => {
  // get the jwt token from the authorization header
  const jwtToken = request.headers["authorization"];

  // if there is no jwt token, return an error response
  if (!jwtToken) {
    return handleResponse(response, 401, "error", "Unauthorized", "Token not found.");
  }

  // get the jwt secret from the environment variables
  const jwtSecret = process.env.JWT_SECRET;

  // if there is no jwt secret, throw an error
  if (!jwtSecret) {
    throw new Error("JWT_SECRET is not defined.");
  }

  // verify the jwt token
  jwt.verify(jwtToken, jwtSecret, (error, decoded) => {
    // if there is an error, return an error response
    if (error) {
      return handleResponse(response, 401, "error", "Unauthorized", "Access is denied.");
    }

    // if the jwt token is verified, set the user property on the request object
    request.user = decoded as UserPayload;
    // call the next middleware function
    next();
  });
};

// export the verifytoken function
export { verifyToken };