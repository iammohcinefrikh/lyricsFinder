// import necessary modules
import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

// define the validation rules for user registration
export const validateUserRegistration = [
  // the user's first name must not be empty and must be a string
  body("userFirstName").notEmpty().isString(),
  // the user's last name must not be empty and must be a string
  body("userLastName").notEmpty().isString(),
  // the user's email must not be empty and must be a valid email
  body("userEmail").notEmpty().isEmail(),
  // the user's password must not be empty and must be a string
  body("userPassword").notEmpty().isString(),
  // the user's subscription status must not be empty and must be a boolean
  body("isSubscribed").notEmpty().isBoolean()
];
  
// define the validation rules for user login
export const validateUserLogin = [
  // the user's email must not be empty and must be a valid email
  body("userEmail").notEmpty().isEmail(),
  // the user's password must not be empty and must be a string
  body("userPassword").notEmpty().isString(),
];

// define the validation rules for password reset
export const validateSongData = [
  // Validate the genre field: must not be empty, must be a string, and between 3 and 50 characters
  body('genre').notEmpty().isString().trim().isLength({ min: 3, max: 50 }),
  // Validate the title field: must not be empty, must be a string, and between 3 and 100 characters
  body('title').notEmpty().isString().trim().isLength({ min: 3, max: 100 }),
  // Validate the recordedDate field: must not be empty
  body('recordedDate').notEmpty(),
  // Validate the lyrics field: must not be empty, must be a string, and between 10 and 5000 characters
  body('lyrics').notEmpty().isString().trim().isLength({ min: 10, max: 5000 })
];


// define the middleware for handling validation errors
export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
  // get the validation result
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