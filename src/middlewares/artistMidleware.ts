import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from "express";

export const validateArtist = [
  check('artistFirstName')
    .isString().withMessage('First name must be a string')
    .notEmpty().withMessage('First name is required'),
  check('artistLastName')
    .isString().withMessage('Last name must be a string')
    .notEmpty().withMessage('Last name is required'),
  check('artistPicture')
    .isString().withMessage('Artist picture URL must be a string')
    .isURL().withMessage('Artist picture must be a valid URL'),
  check('genre')
    .isString().withMessage('Genre must be a string')
    .notEmpty().withMessage('Genre is required'),
  check('born_date')
    .isISO8601().withMessage('Born date must be a valid date')
    .toDate(),
  check('born_city')
    .isString().withMessage('Born city must be a string')
    .notEmpty().withMessage('Born city is required'),
  check('died_date')
    .optional()
    .isISO8601().withMessage('Died date must be a valid date')
    .toDate(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
