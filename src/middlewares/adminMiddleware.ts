import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// define the validation rules for user registration
export const validateAdminRegistration = [
    
  // the user's first name must not be empty and must be a string
  body("userFirstName")
  .isString().withMessage('First name must be a string')
  .notEmpty().withMessage('First name is required'),
  // the user's last name must not be empty and must be a string
  body("userLastName")
  .isString().withMessage('Last name must be a string')
  .notEmpty().withMessage('Last name is required'),
  // the user's email must not be empty and must be a valid email
  body("userEmail").notEmpty().isEmail(),
  // the user's password must not be empty and must be a string
  body("userPassword").notEmpty().isString(),
];

// define the validation rules for user login
export const validateAdminLogin = [
    // the user's email must not be empty and must be a valid email
    body("userEmail").notEmpty().isEmail(),
    // the user's password must not be empty and must be a string
    body("userPassword").notEmpty().isString(),
];

// define the middleware for handling validation errors
export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
    // get the validation result
    console.log("entred")
    const errors = validationResult(request);
    
    // if there are validation errors, return a 422 Unprocessable Content error with the validation errors
    if (!errors.isEmpty()) {
      return response.status(422).json({
        "statusCode": 422,
        "error": "Unprocessable Content",
        "errorMessage": errors.array()
      });
    }
  
    // if there are no validation errors, proceed to the next middleware
    next();
};