import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const validateUserRegistration = [
  body("userFirstName").notEmpty().isString(),
  body("userLastName").notEmpty().isString(),
  body("userEmail").notEmpty().isEmail(),
  body("userPassword").notEmpty().isString(),
  body("isSubscribed").notEmpty().isBoolean()
];
  
export const validateUserLogin = [
  body("userEmail").notEmpty().isEmail(),
  body("userPassword").notEmpty().isString(),
];
  
export const validateUserPasswordResetRequest = [
  body("userEmail").notEmpty().isEmail(),
];

export const validateUserPasswordReset = [
  body("userCode").notEmpty().isNumeric().isLength({ min: 6, max: 6 }),
  body("userEmail").notEmpty().isEmail()
];
  
export const handleValidationErrors = (request: Request, response: Response, next: NextFunction) => {
  const errors = validationResult(request);
  
  if (!errors.isEmpty()) {
    return response.status(422).json({
      "statusCode": 422,
      "error": "Unprocessable Content",
      "errorMessage": errors.array()
    });
  }

  next();
};