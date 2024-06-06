// import necessary modules
import { Response } from "express";

// define the function to handle responses
export const handleResponse = (response: Response, statusCode: number, responseType: string, responseBody: string, messageBody: string) => {
  // set the status code and send the response as a json object
  response.status(statusCode).json({
    // include the status code in the response
    statusCode: statusCode,
    // include the response type and body in the response
    [responseType]: responseBody,
    // include the message body in the response
    message: messageBody
  });
}